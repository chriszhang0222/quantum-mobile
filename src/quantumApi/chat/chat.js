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

export const createRoom = (params, auth) => {
    return apiSyncAuth('post', '/chat/create_new_chat_group/', params, auth);
}

export const addUserInRoom = (params, auth) => {
    return apiSyncAuth('post', '/chat/add_new_members/', params, auth);
}

export const getNotification = (params, auth) => {
    return apiSyncAuth('post', '/chat/alerts_mobile/', params, auth)
}

export const readNotification = (params, auth) => {
    return apiSyncAuth('post', '/chat/read_alerts_mobile/', params, auth);
}

export const alertUnread = (params, auth) => {
    return apiSyncAuth('post', '/chat/alert_unread_mobile/', params, auth);
}
