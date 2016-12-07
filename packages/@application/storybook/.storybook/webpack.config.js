const webpackMerge = require('webpack-merge'); // used to merge webpack configs


module.exports = function(storybookBaseConfig, configType) {

    return webpackMerge({
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
        module: {

            loaders: [{
              test: /\.(ts|tsx|js|jsx)$/,
              loaders: [
                'awesome-typescript-loader?useBabel=true&useCache=true',
              ],
              exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
            }]
        }
    }, storybookBaseConfig)

}
