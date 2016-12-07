import webpack from 'webpack'
import {
    resolve,
    join
} from 'path'
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import ExtractTextPlugin from 'extract-text-webpack-plugin'

const resolvePath = p => resolve(join('node_modules', p))

const aliases = {
    'glamor': 'glamor/umd/index.min.js',
    'sinon': 'sinon/pkg/sinon.js',
    'moment': 'moment/min/moment.min.js',
    'react-router': 'react-router/umd/ReactRouter.min.js',
    'react-redux': 'react-redux/dist/react-redux.js',
    'react-motion': 'react-motion/build/react-motion.js',
    'joi-browser': 'joi-browser/dist/joi-browser.min.js',
    'ramda': 'ramda/dist/ramda.min.js',
    'handlebars': 'handlebars/dist/handlebars.min.js'
}

let plugins = [
    ...(process.env.ANALYZER ? [new BundleAnalyzerPlugin({
        openAnalyzer: false
    })] : []),
    new CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js'
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        __DEV__: JSON.stringify(process.env.NODE_ENV != 'production'),
        API_URL: JSON.stringify(process.env.API_URL)
    })
]

let config = {

    setAlias(k, v) {
        this.resolve.alias[k] = v
    },

    externals: {},

    node: {
        dns: 'mock',
        net: 'mock'
    },

    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loaders: ['babel?cacheDirectory'],
            exclude: /(node_modules|lib\/webcomponents)/
        }, {
            test: /\.ts(x?)$/,
            loaders: ['babel?cacheDirectory', 'ts-loader'],
            exclude: /node_modules/
        }, {
            test: /node_modules.*\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css'),
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', ['css', 'postcss'])
        }, {
            test: /\.upcss$/,
            loader: ExtractTextPlugin.extract('style', ['css'])
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url?limit=100000'
        }, {
            test: /\.(jpg|gif)$/,
            loader: 'url-loader'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }],
        noParse: [
            resolvePath(aliases.moment),
            resolvePath(aliases.sinon),
            resolvePath(aliases.glamor),
            resolvePath(aliases.ramda),
            resolvePath(aliases.handlebars)
        ]
    },

    resolve: {
        root: [resolve('node_modules'), resolve('src/lib'), resolve('src')],
        extensions: [
            '', '.js', '.jsx',
            '.ts', '.tsx',
            '.css',
            '.woff', '.woff2', '.ttf', '.eot', '.svg'
        ],
        alias: {}
    },

    plugins: plugins,

    ts: {
        compiler: 'typescript'
    },

    postcss() {
        return {
            defaults: [

                // Needed for importing
                require('postcss-import')({
                    onImport: function(files) {
                        files.forEach(this.addDependency)
                    }.bind(this)
                }),
                require('postcss-nested'),
                require('postcss-custom-properties')(),
                require('cssnano')(),
                require('rucksack-css')(),
                require('autoprefixer')({
                    browsers: ['> 5%', 'IE 9', 'IE 11']
                })
            ]
        }
    }
}

// Setup aliases
const includeAlias = k => config.setAlias(k, resolvePath(aliases[k]))
Object.keys(aliases).forEach(includeAlias)
config.setAlias('joi', 'joi-browser')

// Expose config.js file as a module
config.setAlias('config', resolve('lib/config.js'))

export default config
