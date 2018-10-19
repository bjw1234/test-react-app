const path = require('path');

module.exports = {
    mode: 'development',
    // node环境
    target: 'node',
    entry: {
        app: path.join(__dirname, '../server.entry.js')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'server.entry.js',
        // 静态文件
        publicPath: '/public',
        // 模块加载方案
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "eslint-loader",
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ]

            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};