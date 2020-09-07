import {apiSyncAuth, apiAsyncAuth} from "@/quantumApi/axiosCommon";

export const supplierSearch = (params, auth) => {
    return apiSyncAuth("get", "/supplier/search_api/", params, auth);
}

export const supplierDetail = (params, auth) => {
    return apiSyncAuth("post", "/supplier/detail_api/", params, auth);
}

export const supplierNaics = (params) => {
    return apiSyncAuth("get", "/supplier/naicscode/", params)
}

export const supplierCommodity = (params) => {
    return apiSyncAuth("get", "/supplier/commoditycode/", params);
}
