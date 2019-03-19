const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const ReactSSR = require('react-dom/server');
const handleLogin = require('./util/handle-login');
const requestProxy = require('./util/proxy');

const isDev = process.env.NODE_ENV === 'development';

const app = express();

// 将json格式的请求数据转化为req.body上的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 在服务启动时可以往session里设置值
app.use(session({
    maxAge: 10 * 60 * 1000,
    name: 'react-key-tid',
    resave: false,
    saveUninitialized: false,
    secret: 'react cnode express'
}));

// 网站图标
app.use(favicon(path.join(__dirname, '../icon.ico')));

// 登录接口代理
app.use('/api/user', handleLogin);
// 其他接口代理
app.use('/api', requestProxy);


if (!isDev) {
    // 同步读取模板HTML文件
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
    // 具体内容模块
    const serverEntry = require('../dist/server.entry.js').default;
    // 静态文件托管
    app.use('/public', express.static(path.join(__dirname, '../dist')));
    app.get('/', (req, res) => {
        let content = ReactSSR.renderToString(serverEntry);
        res.send(template.replace('<!-- app -->', content));
    });
} else {
    /** 开发环境 */
    const devStatic = require('./util/dev-static');
    devStatic(app);
}

app.listen(3000, () => {
    console.log('app is running at localhost: 3000!');
});
