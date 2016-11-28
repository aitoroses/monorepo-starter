require('babel-register')

var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var webpackConfig = require('./webpack/webpack.config.base').default

webpackConfig.externals ={
    // required by enzyme
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'cheerio': 'window',
}

webpackConfig.devtool = 'eval-cheap-module-source-map'

webpackConfig.plugins = [
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        __DEV__: JSON.stringify(process.env.NODE_ENV != 'production'),
        API_URL: JSON.stringify(process.env.API_URL)
    })
]

module.exports = function(config) {
    config.set({

        browserNoActivityTimeout: 30000,

        browsers: [process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'],

        singleRun: process.env.CONTINUOUS_INTEGRATION === 'true',

        frameworks: ['mocha', 'sinon-chai'],

        files: [
            'webpack/tests.webpack.js'
        ],

        preprocessors: {
            'webpack/tests.webpack.js': ['webpack', 'sourcemap']
        },

        reporters: ['mocha'],

        webpack: webpackConfig,

        webpackServer: {
            noInfo: true
        }

    })
}
