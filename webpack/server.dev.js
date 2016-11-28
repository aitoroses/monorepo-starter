import webpack from 'webpack'
import express from 'express'
import compression from 'compression'
import httpProxy from 'http-proxy'

import WebpackDevServer from 'webpack-dev-server'

import config from './webpack.config.server'

////////////////////////////
// Configure a web server //
////////////////////////////

// Create a Proxy instance
const proxy = httpProxy.createProxyServer({
  ws: true,
  target: 'http://0.0.0.0:8081' // Target Webpack
})

// Create an Http server
let server = express()

// Add GZIP middleware
server.use(compression())

// Proxy to webpack dev-server
server.use((req,res) => proxy.web(req, res))

// Start listening
server.listen(8080, () => {
    console.log("Server is listening on port 8080")
})

// Error handler
server.on('error', e => console.error(e))

//////////////////////////////
// Configure WebPack server //
//////////////////////////////


let webpackDevServer = new WebpackDevServer(webpack(config), config.devServer)

// Start listening
webpackDevServer.listen(8081)
