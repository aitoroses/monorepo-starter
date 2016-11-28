var path = require('path')
var NEDB = require('nedb')

var promises = []

function reducer(db, k) {
    db[k] = new NEDB({ filename: path.resolve('test/mock-db/' + k + '.db')})
    promises.push(new Promise(function(resolve) {
        db[k].loadDatabase(resolve)
    }))
    return db
}

var db = require('../mock-models/models').reduce(reducer, {})
var ready = Promise.all(promises)

module.exports = {
  db,
  ready
}
