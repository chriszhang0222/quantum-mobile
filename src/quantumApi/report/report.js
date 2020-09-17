import {apiSyncAuth, apiAsyncAuth} from "@/quantumApi/axiosCommon";

export const reportSetup = (params, auth) => {
    return apiSyncAuth("post", "report/mobile/report_setup/",  params, auth);
}

export const getReportData = (params, url, auth) => {
    return apiSyncAuth("post", url, params, auth);
}
