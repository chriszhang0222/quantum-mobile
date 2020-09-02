import {apiSyncAuth, apiAsyncAuth} from "@/quantumApi/axiosCommon";

export const getAllRooms = (params, auth) => {
    return apiSyncAuth("post", "chat/rooms/",  params, auth);
}

export const loadChatMessage = (params, auth) => {
    return apiSyncAuth('get', '/chat/updatefromdb', params, auth);
}

export const searchMessage = (params, auth) => {
    return apiSyncAuth('post', '/chat/searchmessages/', params, auth);
}

export const getunreadCount = (params, auth) => {
    return apiSyncAuth('post', '/chat/unread_count/', params, auth);
}
