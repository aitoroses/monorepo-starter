import {
    handleError,
    generateToken,
    createTask,
    taskFilter,
    generateTokenForUser,
    socketChannel
} from '../utils'

import {
    db
} from '../mock-db'

import Process from '../mock-models/Process'

module.exports = [{
        method: 'GET',
        path: '/HumanWorkflow/identity/token',
        /* ?user=<user> */
        reply: function(params, query, body) {
            if (!query.user) {
                this.status(401)
                this.res.end('Bad user.')
                return
            }

            let token = generateToken(query.user, 1, 0.5)
            token = (new Buffer(token, 'UTF-8')).toString('base64')
            this.res.end(token)
        },

        options: {
            requiresAuth: false,
            contentType: 'application/text'
        }
    }, {
        method: 'POST',
        path: '/HumanWorkflow/identity/authenticate',
        reply: function(params, query, body) {

            // Find the user
            if (body.login) {
                generateTokenForUser(body.login, (err, token) => {
                    if (err) {
                        this.res.status(401)
                        this.res.end()
                        return
                    } else {
                        if (body.password != 'welcome1') {
                            this.res.set({
                                Authorization: null
                            })
                            this.res.status(401)
                            this.res.json({
                                message: JSON.stringify(body) + ' are not valid credentials. Ensure contentType is application/json'
                            })
                        } else {
                            this.res.set({
                                Authorization: 'Bearer ' + token
                            })
                            this.res.end()
                        }
                    }
                })
            }
        },

        options: {
            requiresAuth: false
        }
    }, {
        method: 'GET',
        path: '/HumanWorkflow/identity/sso', // ?redirectUrl=/app
        reply: function(params, query, body) {
            // Generate a token
            // Codify it with base64 and set header
            // User was recognized by the SSO as jlondon
            // Find the user
            generateTokenForUser('jlondon', (err, token) => {
                if (err) {
                    this.res.status(401)
                    this.res.end()
                    return
                } else {
                    let html = `
                        <!DOCTYPE html>
                        <html>
                            <head>
                                <meta charset="utf-8">
                                <title></title>
                            </head>
                            <body>
                                <script>
                                    var token = '${token}'
                                    localStorage.setItem('auth.token', token)
                                    window.location.replace('${query.redirectUrl}' || '/workspace')
                                </script>
                            </body>
                        </html>
                    `

                    this.res.set('Content-Type', 'text/html')
                    this.res.end(html)
                }
            })
        },

        options: {
            requiresAuth: false
        }
    }, {
        method: 'POST',
        path: '/HumanWorkflow/TaskQueryService/queryCountTasks',
        reply: function(params, query, body) {
            Process.tasks.find({
                    'systemAttributes.state': 'ASSIGNED'
                })
                .then(results => {
                    let filtered = results.filter((t) => taskFilter(this.req.jwt, body, t))
                    this.res.json(filtered.length)
                })
        }
    },

    {
        method: 'POST',
        path: '/HumanWorkflow/TaskQueryService/queryTasks',
        reply: function(params, query, body) {
            Process.tasks.find({
                    'systemAttributes.state': 'ASSIGNED'
                })
                .then(results => {
                    results.forEach(r => r.payload = null)
                    let filtered = results.filter((t) => taskFilter(this.req.jwt, body, t))
                    this.res.json(filtered)
                })
        }
    }, {
        method: 'POST',
        path: '/HumanWorkflow/TaskQueryService/queryTasks/:startRow/:endRow',
        reply: function(params, query, body) {
            Process.tasks.find({
                    'systemAttributes.state': 'ASSIGNED'
                })
                .then(results => {

                    let filtered = results.filter((t) => taskFilter(this.req.jwt, body, t))
                    filtered.forEach(r => r.payload = null)

                    if (params.startRow == 0 && params.endRow == 0) {
                        filtered = filtered
                    } else {
                        filtered = filtered.filter((t, i) => (i + 1) >= params.startRow && (i + 1) <= params.endRow)
                    }

                    setTimeout(() => {
                        this.res.json(filtered)
                    }, 1200)
                })
        }
    }, {
        method: 'POST',
        path: '/HumanWorkflow/TaskService/updateTask',
        reply: function(params, query, body) {
            (async () => {

                let user = this.req.jwt && this.req.jwt.sub

                // Update the task
                let incomingTask = body
                let dbTask = await Process.tasks.findOne({
                    'systemAttributes.taskId': body.systemAttributes.taskId
                })

                setTimeout(async () => {
                    let result = await Process.updateOutcome(dbTask._id, incomingTask.systemAttributes.outcome, user)
                    setTimeout(() => socketChannel.emit('assignation'), 1000)
                    this.res.json(result)
                }, 2000)

            })()
        }
    }, {
        method: 'GET',
        path: '/HumanWorkflow/TaskQueryService/getTaskDetailsById/:taskId',
        reply: function(params, query, body) {
            Process.tasks.findOne({
                    'systemAttributes.taskId': params.taskId,
                })
                .then(task => {
                    this.res.json(task)
                })
        }
    },

    // Specific Context services
    {
        method: 'GET',
        path: '/HumanWorkflow/context/profile/:appId',
        reply: function(params, query, body) {
            // Process Token to extend it with user profile for that application

            let subject = this.req.jwt.sub

            // find that user
            db.User.findOne({
                'userData.uid': subject
            }).exec((err, doc) => {
                if (err || !doc) {
                    this.res.status(400)
                    this.res.end("There was an error or no user found")
                    return
                }

                var payload = this.req.jwt

                if (!payload.profile) {
                    let ud = doc.userData
                    payload.profile = {
                        // firstName: ud.firstName,
                        // lastName: ud.lastName,
                        displayName: ud.displayName
                    }
                }

                if (!this.req.jwt.apps) {
                    payload.apps = {}
                }

                payload.apps[params.appId] = {
                    ou: doc.ous.map(x => x.id)
                }

                let token = generateToken(subject, payload)
                token = (new Buffer(token, 'UTF-8')).toString('base64')
                this.res.set({
                    Authorization: 'Bearer ' + token
                })
                this.res.end()
            })
        }
    }, {
        method: 'GET',
        path: '/HumanWorkflow/context/assign-ou/:appId', // ?ous=[ou1, ou2]
        reply: function(params, query, body) {
            // Process Token to extend it with user profile for that application

            let subject = this.req.jwt.sub

            // find that user
            db.User.findOne({
                'userData.uid': subject
            }).exec((err, doc) => {
                if (err || !doc) {
                    this.res.status(400)
                    this.res.end()
                    return
                }

                // Prepare new payload
                let payload = this.req.jwt

                let ous2Assign = [].concat(query.ous) || []

                // Check if requested AppId exists
                db.Ou.findOne({
                    $or: ous2Assign.map(ou => ({
                        id: ou
                    }))
                }).exec((err, ous) => {

                    if (err || ous == undefined || ous.length == 0) {
                        this.res.status(400)
                        this.res.end("Error finding ous")
                        return
                    }

                    payload.apps = payload.apps || {}

                    let app = payload.apps[params.appId]
                    app.ou = app.ou || []
                    app.ou = app.ou.concat(ous2Assign)

                    let token = generateToken(subject, payload)
                    token = (new Buffer(token, 'UTF-8')).toString('base64')
                    this.res.set({
                        Authorization: 'Bearer ' + token
                    })

                    this.res.end()
                })
            })
        }
    }, {
        method: 'GET',
        path: '/wk-services/websocket/:channel',
        reply: function(params, query, body) {
            Process.tasks.find({})
                .then(tasks => {

                    let index = Math.floor(Math.random() * tasks.length)

                    this.res.set('Transfer-Encoding', 'chunked')
                    this.res.removeHeader('Content-Length')

                    this.res.set('Content-Type', 'text/html; charset=UTF-8')

                    this.res.writeHead(200)

                    const finishAssignation = () => {
                        this.res.write(JSON.stringify({
                            type: "HW_ASSIGNATION",
                            payload: {
                                taskId: tasks[index].systemAttributes.taskId
                            }
                        }))

                    }

                    socketChannel.once('assignation', finishAssignation)
                })
        }
    }
]
