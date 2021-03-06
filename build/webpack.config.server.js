const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const config = require('../server/config');

let isDev = process.env.NODE_ENV === 'development';

module.exports = webpackMerge(baseConfig, {
    mode: isDev ? 'development' : 'production',
    // node环境
    target: 'node',
    entry: {
        app: path.join(__dirname, '../server.entry.js')
    },
    externals: Object.keys(require('../package.json').dependencies),
    output: {
        filename: 'server.entry.js',
        // 模块加载方案
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_BASE': `'"${config.baseUrl}"'`
        })
    ]
});
