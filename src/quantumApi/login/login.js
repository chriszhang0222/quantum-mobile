import {apiAsync, apiAsyncAuth, apiSync} from "@/quantumApi/axiosCommon";
import store from '@/store/index'

export const getAPIToken = () => {
    return apiSync("post", "api/token/", {});
}

export const loginAPI = (params, callback) => {
    return apiAsync("post", "accounts/api/mobile_login/", params, callback);
}

export const testAPI = (token) => {
    return apiAsyncAuth("get",
        "accounts/test/",
        {},
        ()=>{console.log(token)},
        token);
}
