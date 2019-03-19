/**
 * NodeJS层处理用户登录
 * 访问后端cnode服务器
 * 存储session
 * 返回数据
 */
const router = require('express').Router();
const axios = require('axios');
const {baseUrl} = require('../config');

router.post('/login', (req, res, next) => {
    console.log('登录接口：' + JSON.stringify(req.body));
    axios.post(`${baseUrl}/accesstoken`, {
        accesstoken: req.body.accessToken
    }).then(resp => {
        // 保存session
        if (resp.status === 200 && resp.data.success) {
            req.session.user = {
                accessToken: req.body.accessToken,
                loginName: resp.data.loginname,
                id: resp.data.id,
                avatarUrl: resp.data.avatar_url
            };
        }
        // 返回给客户端
        res.json({
            success: true,
            data: resp.data
        });
    }).catch(err => {
        if (err.response) { // 业务逻辑错误
            res.json({
                success: false,
                data: err.response.data
            });
        } else {
            next(err);
        }
    });
});

module.exports = router;
