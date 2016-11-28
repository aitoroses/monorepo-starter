import webpack from 'webpack'
import configDev from './webpack.config.dev'
import configProd from './webpack.config.prod'
import {
    join
} from 'path'

let config = process.env.NODE_ENV === "production"
    ? configProd
    : configDev

const isPlayground = process.env.PLAYGROUND ? true : false

// HMR configuration
const host = process.env.HMR_HOST || "dev-server" // Used for client connection
const port = process.env.HMR_PORT || 8081
const path = process.env.HMR_PATH || ""

const mergeConf = {
    entry: {
        vendor: [
            `webpack-dev-server/client?http://${host}:${port}${path}/sockjs-node`,
            'webpack/hot/only-dev-server',
            'whatwg-fetch',
            'reflect-metadata',
            'babel-polyfill',
            "react",
            "react-router",
            "redux",
            "react-redux",
            "moment"
        ],
        bundle: ['./lib/main.js']
    },

    output: {
        path: '/',
        publicPath: 'lib/',
        chunkFilename: '[id].chunk.[hash].js',
    },

    devServer: {
        host,
        port,
        path,
        hot: true,
        quiet: false,
        noInfo: false,
        publicPath: '/lib/',
        filename: "bundle.js",
        stats: {
            colors: true,
            hash: false,
            timings: false,
            assets: true,
            chunks: true,
            chunkModules: true,
            modules: false,
            children: true
        }
    },

    devtool: 'cheap-module-source-map',

    plugins: [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}

export default {...config, ...mergeConf}
