require('reflect-metadata')
require('babel-polyfill')
var chai = require('chai')
chai.use(require('chai-enzyme')())
chai.use(require('sinon-chai'))

var context = require.context('../test', true, /.*-test\.(js|jsx|ts|tsx)$/)
context.keys().forEach(context)
