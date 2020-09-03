import {apiSyncAuth, apiAsyncAuth} from "@/quantumApi/axiosCommon";

export const supplierSearch = (params, auth) => {
    return apiSyncAuth("get", "/supplier/search_api/", params, auth);
}
