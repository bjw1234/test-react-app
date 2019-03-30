/**
 * 该模块用于发送请求
 * 客户端、服务端均可使用
 */
import axios from 'axios';

const baseUrl = process.env.API_BASE || '';

const request = axios.create({
    baseURL: baseUrl,
});

const get = (url, params) => new Promise((resolve, reject) => {
    request.get(url, {
        params,
    }).then((resp) => {
        const { data } = resp;
        if (data && data.success) {
            resolve(data);
        } else {
            reject(data);
        }
    }).catch(reject);
});

const post = (url, params, datas) => new Promise((resolve, reject) => {
    request.get(url, { datas }, { params }).then((resp) => {
        const { data } = resp;
        if (data && data.success) {
            resolve(data);
        } else {
            reject(data);
        }
    }).catch(reject);
});


export default {
    get, post,
};

/* 拼接URL
const parseUrl = (url, params) => {
    const str = Object.keys(params).reduce((result, key) => {
        result += `${key}=${params[key]}&`;
        return result;
    }, '');
    return `${baseUrl}/${url}/?${str.substr(0, str.length - 1)}`;
};
*/
