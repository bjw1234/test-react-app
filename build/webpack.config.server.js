const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = webpackMerge(baseConfig, {
    mode: 'development',
    // node环境
    target: 'node',
    entry: {
        app: path.join(__dirname, '../server.entry.js')
    },
    output: {
        filename: 'server.entry.js',
        // 模块加载方案
        libraryTarget: 'commonjs2'
    }
});
