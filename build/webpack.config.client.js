const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

let isDev = process.env.NODE_ENV === 'development';

let config = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, '../index.js')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name]-[hash].js',
        publicPath: '/public/'
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
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../template.html')
        })
    ]
};

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
    };
    // 插件
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}


module.exports = config;