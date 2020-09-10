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

export const supplierEdit = (params, auth) => {
    return apiSyncAuth('get', "/supplier/edit_mobile/", params, auth);
}

export const supplierEditPost = (params, auth) => {
    return apiSyncAuth('post', "/supplier/edit_mobile/", params, auth);
}

export const isSmallBusiness = (params) => {
    return apiSyncAuth('get', "/supplier/is_small_business/", params);
}
