const ejs = require('ejs');
const ReactSSR = require('react-dom/server');
const serialize = require('serialize-javascript');
const bootstrapper = require('react-async-bootstrapper');
const helmet = require('react-helmet').default;

// 拿到所以stores的json格式数据
const getStoreState = (stores) => {
    return Object.keys(stores).reduce((result, storeName) => {
        result[storeName] = stores[storeName].toJson();
        return result;
    }, {});
};

module.exports = (bundle, template, req, res) => {
    return new Promise((resolve, reject) => {
        if (!bundle) return reject();
        const serverBundle = bundle.default;
        const routerContext = {};
        const stores = bundle.createStoreMap();
        const app = serverBundle(stores, routerContext, req.url);

        // 异步执行 bootstrap 方法
        bootstrapper(app).then(() => {
            // 判断是否是重定向 /list
            if (routerContext.url) {
                res.status(302).setHeader('Location', routerContext.url);
                res.end();
                return;
            }
            const state = getStoreState(stores);
            const content = ReactSSR.renderToString(app);
            const initHelmet = helmet.renderStatic();
            // 使用ejs引擎去渲染
            const html = ejs.render(template, {
                appString: content,
                initialState: serialize(state),
                title: initHelmet.title.toString(),
                meta: initHelmet.meta.toString(),
                link: initHelmet.link.toString(),
                style: initHelmet.style.toString(),
            });
            res.send(html);
            resolve();
        }).catch(reject);
    });
};
