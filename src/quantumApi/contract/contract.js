import {apiSyncAuth, apiAsyncAuth} from "@/quantumApi/axiosCommon";

export const invoiceList = (params, auth) => {
    return apiSyncAuth('post', 'contract-management/invoice_list_mobile/', params, auth);
}
