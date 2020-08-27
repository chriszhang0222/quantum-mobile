import {apiAsync, apiAsyncAuth, apiSync, apiSyncAuth} from "@/quantumApi/axiosCommon";
export const quantumTotal = (callBack, token) => {
    return apiAsyncAuth("post", 'api/dashboard_supplier_mobile/', {}, callBack, token)
}

export const certificateMatrix = (callBack, token) => {
    return apiAsyncAuth("post", "api/certificate_matrix/", {}, callBack, token);
}
