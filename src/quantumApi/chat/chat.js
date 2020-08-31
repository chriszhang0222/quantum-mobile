import {apiSyncAuth} from "@/quantumApi/axiosCommon";

export const getAllRooms = (params, auth) => {
    return apiSyncAuth("post", "chat/rooms/",  params, auth);
}

export const loadChatMessage = (params, auth) => {
    return apiSyncAuth('get', '/chat/updatefromdb', params, auth);
}
