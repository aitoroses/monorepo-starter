require('babel-core/register')
var mocker = require('mocker-data-generator')

var util = require('util')
var fs = require('fs')
var path = require('path')

// Models
var models = require('./mock-models')
models.Task = require('./mock-models/Task')

var db = require('./mock-db').db
var ready = require('./mock-db').ready

var Process = require('./mock-models/Process').default

ready.then(function() {
    mocker()
        .schema('Ou', models.Ou, {
            uniqueField: 'id'
        })
        .schema('User', models.User, {
            uniqueField: '_index'
        })

        // Disable this if you will use the process
        // .schema('Task', models.Task, 100)
         
        .build(function(data) {

            Object.keys(data).forEach(function(k) {
                try {
                    if (k == "Task") {
                        Process.tasks.insert(data[k])
                    } else {
                        db[k].insert(data[k])
                    }
                } catch (e) {
                    console.error(e)
                }
            })
        })
})
