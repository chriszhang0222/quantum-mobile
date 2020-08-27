import {apiAsync, apiAsyncAuth, apiSync, apiSyncAuth} from "@/quantumApi/axiosCommon";
import store from '@/store/index';
export const homePageHistoram = (token) => {
    return apiAsyncAuth("get", 'api/industry_mobile/',
        {},(res)=>{
            store.commit('sethomehistoram', res.data);
        }, token);
}

export const supplierEthnicity = (callBack, token) => {
    return apiAsyncAuth('get', "home/api/supplier_by_ethnicity/", {},
        callBack, token);
}

export const supplierNaics = (callBack, token) => {
    return apiAsyncAuth('get', "home/api/supplier_by_naics/", {},
        callBack, token);
}

export const supplierLocation = (callBack, token) => {
    return apiAsyncAuth('get', "home/api/supplier_by_location/", {},
        callBack, token);
}

export const supplierStatus = (callBack, token) => {
    return apiAsyncAuth('get', "home/api/supplier_by_status/", {},
        callBack, token);
}
