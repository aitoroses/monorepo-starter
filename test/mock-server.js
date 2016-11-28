require('babel-core/register')
require('babel-polyfill')
var Nocker = require('nocker')
var services = require('./mock-services')

function registerService(name) {
  Nocker.register(services[name])
}
Object.keys(services).forEach(registerService)

// Start server
Nocker.start({delay: 200, port: 7003, auth: false}, function() {
  console.log('Server is listening on port ' + this.port + '\n')
})
