var fs = require('fs')
var path = require('path')
var toml = require('toml')

module.exports = [{
  method: 'GET',
  path: '/wk-services/ConfigurationServices/conf/:confKey', /* ?config=<user> */
  reply: function(params, query, body) {
    var result = fs.readFileSync(path.resolve(__dirname, '../fixtures/configuration',params.confKey + '.toml'), "utf-8")
    this.res.set({'Content-Type': 'text/toml'})
    setTimeout(function() {
      this.res.end(result)
    }.bind(this), 800)
  },
  options: {
    requiresAuth: false
  },
},{
    method: 'GET',
    path: '/wk-services/ConfigurationServices/conf/toml/:confKey', /* ?config=<user> */
    reply: function(params, query, body) {
      var result = toml.parse(fs.readFileSync(path.resolve(__dirname, '../fixtures/configuration',params.confKey + '.toml'), "utf-8"))
      this.res.json(result)
    },
    options: {
      requiresAuth: false
    }
}]
