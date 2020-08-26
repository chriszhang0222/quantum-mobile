import {apiAsync, apiAsyncAuth, apiSync, apiSyncAuth} from "@/quantumApi/axiosCommon";
import store from '@/store/index';
export const homePageHistoram = (token) => {
    return apiAsyncAuth("get", 'api/industry_mobile/',
        {},(res)=>{
            console.log(res);
            store.commit('sethomehistoram', res.data);
            console.log(store.state);
        }, token);
}
