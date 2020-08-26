import QS from 'qs';
import axios from 'axios';
import {SessionStorage} from "@/utils/SessionStorage";
import {AUTH_TOKEN} from "@/utils/Constants";

const baseUrl = process.env.VUE_APP_SERVER;
const auth = SessionStorage.get(AUTH_TOKEN)

let getCookie = function (name, token) {
    var value = '; ' + token
    var parts = value.split('; ' + name + '=')
    if (parts.length === 2) return parts.pop().split(';').shift()
}

let token = document.cookie;
if(auth !== '' && auth !== undefined && auth !== null){
    axios.defaults.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'X-CSRFToken': getCookie('csrftoken', token),
        'Authorization': 'Bearer ' + auth,
    };
}else {
    axios.defaults.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'X-CSRFToken': getCookie('csrftoken', token)
    };
}

axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'X-CSRFToken': getCookie('csrftoken', token)
};


axios.interceptors.request.use(
    config => {

        // config.headers.Authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9';
        if (config.method  === 'post') {
            config.data = QS.stringify(config.data);
        }
        if (config.method === 'get') {
            config.paramsSerializer = function(params) {
                return QS.stringify(params, { arrayFormat: 'repeat' })
            }
        }
        return config;
    },
    error =>{
        return Promise.reject(error);
    }
);

export const apiAsync = (method, url, params, callback) => {
    if(method == 'get') {
        return axios({
            timeout: 8000,
            method: method,
            baseURL: baseUrl,
            url: url,
            params: params,
            traditional: true
        }).then((res) => {
            callback(res);
        });
    }else if(method == 'post'){
        return axios({
            timeout: 8000,
            method: method,
            baseURL: baseUrl,
            url: url,
            data: params,
            traditional: true
        }).then((res) => {
            callback(res);
        });
    }
}

export const apiSync = (method, url, params) => {
    if(method == 'get') {
        return axios({
            timeout: 8000,
            method: method,
            baseURL: baseUrl,
            url: url,
            params: params,
            traditional: true
        });
    }else if(method == 'post'){
        return axios({
            timeout: 8000,
            method: method,
            baseURL: baseUrl,
            url: url,
            data: params,
            traditional: true
        });
    }
}

export const apiAsyncAuth = (method, url, params, callback, auth) => {
    console.log(auth);
    if(method == 'get') {
        return axios({
            headers: {
                'Authorization': 'Bearer ' + auth,
            },
            timeout: 8000,
            method: method,
            baseURL: baseUrl,
            url: url,
            params: params,
            traditional: true
        }).then((res) => {
            callback(res);
        });
    }else if(method == 'post'){
        return axios({
            headers: {
                'Authorization': 'Bearer ' + auth,
            },
            timeout: 8000,
            method: method,
            baseURL: baseUrl,
            url: url,
            data: params,
            traditional: true
        }).then((res) => {
            callback(res);
        });
    }
}

export const apiSyncAuth = (method, url, params, auth) =>{
    if(method == 'get') {
        return axios({
            headers: {
                'Authorization': 'Bearer ' + auth,
            },
            timeout: 8000,
            method: method,
            baseURL: baseUrl,
            url: url,
            params: params,
            traditional: true
        });
    }else if(method == 'post'){
        return axios({
            headers: {
                'Authorization': 'Bearer ' + auth,
            },
            timeout: 8000,
            method: method,
            baseURL: baseUrl,
            url: url,
            data: params,
            traditional: true
        });
    }
}
