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
const ejs = require('ejs');
const serialize = require('serialize-javascript');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const ReactSSR = require('react-dom/server');
const proxy = require('http-proxy-middleware');
const bootstrapper = require('react-async-bootstrapper');

const serverConfig = require('../../build/webpack.config.server');

// 获取模板HTML文件
const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/public/server.ejs')
            .then(res => resolve(res.data))
            .catch(reject);
    });
};

/**
 * 获取网页中需要服务端渲染的js
 * 难点：不能直接使用打包出来的文件，而需要监听文件的变化，达到热更新的目的
 */
let serverBundle, createStoreMap;
const Module = module.constructor;

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
    const m = new Module();
    // 必须指定文件名
    m._compile(bundle, 'server.entry.js');
    serverBundle = m.exports.default;
    createStoreMap = m.exports.createStoreMap;
});

// 拿到所以stores的json格式数据
const getStoreState = (stores) => {
    return Object.keys(stores).reduce((result, storeName) => {
        result[storeName] = stores[storeName].toJson();
        return result;
    }, {});
};

module.exports = function(app) {
    // 做静态文件代理
    app.use('/public', proxy({
        target: 'http://localhost:8000'
    }));

    // 当访问任何路径时，都用该路由处理
    app.get('*', (req, res) => {
        getTemplate().then(template => {
            /**修改的内容*/
            const routerContext = {};
            const stores = createStoreMap();
            const app = serverBundle(stores, routerContext, req.url);

            // 异步执行 bootstrap 方法
            bootstrapper(app).then(() => {
                const state = getStoreState(stores);
                let content = ReactSSR.renderToString(app);
                // 判断是否是重定向 /list
                if (routerContext.url) {
                    res.status(302).setHeader('Location', routerContext.url);
                    res.end();
                    return;
                }
                // 使用ejs引擎去渲染
                const html = ejs.render(template, {
                    appString: content,
                    initialState: serialize(state)
                });
                res.send(html);

                /**修改的内容*/
                // res.send(template.replace('<!-- app -->', content));
            });
        });
    });
};
