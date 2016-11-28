export var tokenGen = require('nocker/util/JWTokenGenerator')
export const WORKFLOW_CONTEXT_TOKEN = '599d2963-8c3e-4cd6-b16d-10f74a18fd12;;0O4an41yrMktGvP59ZNu2/cQ3zetDqc1OL76dZQhLkRn31obkoW+f3r6Q1CA2joOKrKDLxTHo/nmsvYglQwZqT/MwZFN3xJMeo/+HtvQMhFccSlWpOL+N1Di/WFoZeamdqr+MJDewvpeqQIZhiSKlqJjG4dN6Zmcqu8Y3ZcSPF8TuFnQcHVrlic6Qv9tTW29O6NjyyfNgNJx350305WGQXDDhpSP+feePpy9zFmO40dRN3j6LU+1+tebJc+lJZO1'

import {
    db
} from './mock-db'

import EventEmitter from 'events'
export const socketChannel = new EventEmitter

export function handleError(res, err) {
  if (err) {
    res.status(500)
    res.end(JSON.stringify(err))
    return false
  } else {
    return true
  }
}

export function generateToken(user, customPayload, accessLevel, expirationMins) {
  if (!accessLevel) accessLevel = 1
  if (!expirationMins) expirationMins = 60

  var payload = {
    workflowContext: WORKFLOW_CONTEXT_TOKEN,
    accessLevel: accessLevel,
    locale: 'en',
  }

  if (customPayload) {
    payload = Object.assign({}, payload, customPayload)
  }
  return tokenGen(user, payload, expirationMins)
}

export function createTask(outcome, payload) {
  if (!payload) {
    payload = '<?xml version=\"1.0\" encoding=\"UTF-16\"?>\n<payload xmlns=\"http://xmlns.oracle.com/bpel/workflow/task\"><disclaimer>0</disclaimer><VariablesBusinessObject xmlns=\"http://xmlns.oracle.com/bpm/bpmobject/Model/Runtime/VariablesBusinessObject\" xmlns:ns0=\"http://xmlns.oracle.com/bpm/bpmobject/Model/Runtime/VariablesBusinessObject\"><ns0:stringVar1></ns0:stringVar1><ns0:stringVar2>7001</ns0:stringVar2><ns0:stringVar3></ns0:stringVar3><ns0:stringVar4></ns0:stringVar4><ns0:stringVar5></ns0:stringVar5>\n</VariablesBusinessObject><requestId></requestId><currentStepId></currentStepId><requestDescription></requestDescription><textAttribute1/><textAttribute2/><textAttribute3/><textAttribute4/><textAttribute5/><numberAttribute1></numberAttribute1><numberAttribute2></numberAttribute2><numberAttribute3></numberAttribute3><userAction/><userComment/></payload>'
  }

  return {
    title: `${outcome[0].toUpperCase() + outcome.slice(1).toLowerCase()} - Task: ${Math.floor(Math.random() * 1000)}`,
    payload: payload,
    systemAttributes: {
      taskId: uuid(),
      outcome: null,
      state: 'ASSIGNED'
    },
  }
}

export function uuid() {
  'use strict'
  let i
  let random
  let uuid = ''

  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }

    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
      .toString(16)
  }

  return uuid
}

export function taskFilter(jwt, filter, task) {
    if (Object.keys(filter).length == 0) return true

    let ret = true

    // Creators ?
    if (filter.assignmentFilter && filter.assignmentFilter.toUpperCase() == "MY_GROUP") {
        let isUserInGroup = task.systemAttributes.assignees.filter(a => a.id == jwt.sub).length > 0
        if (!isUserInGroup) return false
    } else if (filter.assignmentFilter && filter.assignmentFilter.toUpperCase() == "CREATOR") {
        let isFromCreator = task.creator == jwt.sub
        if (!isFromCreator) return false
    } else {
        // NOT Creator and not My GROUP
        return false
    }

    // by keyword
    let reg = new RegExp(filter.keyword)
    if (filter.keyword && !reg.test(JSON.stringify(task).toLowerCase())) return false

    // view clauses
    let isValidByClause = filter.clauses && filter.clauses.reduce((acc, clause) => {
        let columnVal = task[clause.column] || task.systemAttributes[clause.column]

        let ret = true

        if (clause.operator == "EQ") {

            if (typeof columnVal == "string") {
                ret = (columnVal == clause.value)
            }

        } else if (clause.operator == "CONTAINS") {

            if (typeof columnVal == "string") {
                ret = columnVal.match(clause.value).length > 0
            }

        }

        // Clause join
        if (clause.join == "AND") {
            return acc && ret
        } else {
            return acc || ret
        }
    }, true)

    if (isValidByClause == undefined) isValidByClause = true

    return ret && (isValidByClause)
}

export function generateTokenForUser(user, cb) {
    db.User.findOne({
        'userData.uid': user
    }).exec((err, doc) => {
        if (err || !doc) {
            cb(err || Error("No User"))
        } else {
            let token = generateToken(doc.userData.uid, {
                profile: {
                    displayName: doc.userData.displayName
                }
            })

            token = (new Buffer(token, 'UTF-8')).toString('base64')

            cb(null, token)
        }
    })
}
