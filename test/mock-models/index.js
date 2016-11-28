var models = require('./models')

module.exports = models.reduce(function(acc, k) {
	acc[k] = require('./' + k)
	return acc
}, {})
