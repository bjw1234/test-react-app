const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HTMLPlugin = require('html-webpack-plugin');

let isDev = process.env.NODE_ENV === 'development';

let config = webpackMerge(baseConfig, {
    mode: 'development',
    entry: {
        app: path.join(__dirname, '../index.js')
    },
    output: {
        filename: '[name]-[hash].js',
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../template.html')
        }),
        new HTMLPlugin({
            template: '!!ejs-compiled-loader!' + path.join(__dirname, '../server.template.ejs'),
            filename: 'server.ejs'
        })
    ]
});

// 开发模式
if (isDev) {
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../index.js')
        ]
    };
    config.devServer = {
        host: '0.0.0.0',
        port: 8000,
        contentBase: path.join(__dirname, '../dist'),
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        },
        hot: true,
        overlay: {
            errors: true
        },
        proxy: {
            '/api': 'http://localhost:3000'
        },
    };
    // 插件
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = config;
