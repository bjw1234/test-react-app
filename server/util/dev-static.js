/**
 * 开发时的服务端渲染
 * 也到达到热更新的目的
 *
 * 拿到模板HTML文件
 * 拿到具体的网页内容模块
 * 将内容渲染成字符串插入到HTML中返回给客户端
 */
const path = require('path');
const axios = require('axios');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const proxy = require('http-proxy-middleware');

const serverRender = require('./server-render');
const serverConfig = require('../../build/webpack.config.server');

// 获取模板HTML文件
const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/public/server.ejs')
            .then(res => resolve(res.data))
            .catch(reject);
    });
};

const nativeModule = require('module');
const vm = require('vm');

/**
 * 将一个bundle字符串转化为一个可执行的模块
 * @param bundle
 * @param filename
 * @return {{exports: {}}}
 */
const getModuleFromString = (bundle, filename) => {
    const m = {exports: {}};
    const wrapper = nativeModule.wrap(bundle);
    const script = new vm.Script(wrapper, {
        filename: filename,
        displayErrors: true
    });
    const result = script.runInThisContext();
    result.call(m.exports, m.exports, require, m);
    return m;
};

/**
 * 获取网页中需要服务端渲染的js
 * 难点：不能直接使用打包出来的文件，
 * 而需要监听文件的变化，达到热更新的目的
 */
let serverBundle;

const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);
// 利用mfs模块读取内存上的文件
serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(warn => console.warn(warn));

    // 服务端bundle的路径
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );

    // 同步读取出来的bundle是一个字符串，string -> 模块 ？
    const bundle = mfs.readFileSync(bundlePath, 'utf-8');
    // hack
    // const m = new Module();
    // 必须指定文件名
    // m._compile(bundle, 'server.entry.js');
    const m = getModuleFromString(bundle, 'server.entry.js');
    serverBundle = m.exports;
});


module.exports = function(app) {
    // 做静态文件代理
    app.use('/public', proxy({
        target: 'http://localhost:8000'
    }));

    // 当访问任何路径时，都用该路由处理
    app.get('*', (req, res, next) => {
        getTemplate().then(template => {
            return serverRender(serverBundle, template, req, res);
        }).catch(next);
    });
};
