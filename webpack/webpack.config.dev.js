import config from './webpack.config.base'

const mergeConf = {
    entry: {
        vendor: [
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
        path: './build',
        filename: 'bundle.js',
        publicPath: "lib/",
        chunkFilename: '[id].chunk.[hash].js',
    },

    devtool: 'cheap-module-source-map'
}

export default {...config, ...mergeConf}
