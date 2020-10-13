import {apiSyncAuth, apiAsyncAuth} from "@/quantumApi/axiosCommon";

export const invoiceList = (params, auth) => {
    return apiSyncAuth('post', 'contract-management/invoice_list_mobile/', params, auth);
}

export const invoiceDetail = (params, auth) => {
    return apiSyncAuth('get', 'contract-management/invoice_detail_mobile/', params, auth);
}
