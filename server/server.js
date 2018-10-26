const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const ReactSSR = require('react-dom/server');

const app = express();

// 网站图标
app.use(favicon(path.join(__dirname,'../icon.ico')));

const isDev = process.env.NODE_ENV === 'development';

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
    console.log('app is running at 3000!');
});
