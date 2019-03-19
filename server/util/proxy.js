/**
 * 用户接口代理
 */
const axios = require('axios');
// {"name":"xxx"} => "name=xxx"
const queryString = require('query-string');
const {baseUrl} = require('../config');

module.exports = function(req, res) {
    const path = req.path;
    const user = req.session.user || {};
    const needAccessToken = req.query.needAccessToken;

    // 未登录的情况
    if (needAccessToken && !user.accessToken) {
        // 需要登录
        res.status(401).send({
            success: false,
            msg: 'need login'
        });
        return;
    }

    const query = Object.assign({}, req.query, {
        accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
    });
    if (query.accessToken) delete query.accessToken;
    // 访问后端接口
    axios(`${baseUrl}/${path}`, {
        method: req.method,
        params: query,
        data: queryString.stringify(Object.assign({}, req.body, {
            accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
        })),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(resp => {
        if (resp.status === 200) {
            res.send(resp.data);
        } else {
            res.status(resp.status).send(resp.data);
        }
    }).catch(err => {
        if (err.response) {
            res.status(500).send(err.response.data);
        } else {
            res.status(500).send({
                success: false,
                msg: 'unknown error'
            });
        }
    });
};
