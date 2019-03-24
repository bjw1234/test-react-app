const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

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
    }
});
