import {apiAsync, apiAsyncAuth, apiSync, apiSyncAuth} from "@/quantumApi/axiosCommon";
export const quantumTotal = (callBack, token) => {
    return apiAsyncAuth("post", 'api/dashboard_supplier_mobile/', {}, callBack, token)
}
