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

export const updateMessageStatusApi = (params, auth) => {
    return apiSyncAuth('post', '/chat/updatemessagestatus/', params, auth);
}

export const editRoomName = (params, auth, callback) => {
    return apiAsyncAuth('post', '/chat/editroomname/', params, callback, auth);
}
