import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function findRoomsInArray(rooms, target){
    for(let index = 0;index < rooms.length; index++){
        if(rooms[index].room_id === target.room_id){
            return index;
        }
    }
    return -1;
}

export default new Vuex.Store({
    state: {
        home_historgam: [],
        chatRooms: [],
        displayedRooms: [],
        chatRoomMap: {},
        chatNotification: {
            unreadCount: 0
        },
        websocket: null
    },
    mutations: {
        setWebSocket(state, conn){
          state.websocket = conn;
        },
        sethomehistoram(state, data){
            state.home_historgam = data;
        },
        updateNotification(state, count){
            let count_ = state.chatNotification.unreadCount;
            Vue.set(state.chatNotification, 'unreadCount', count_+count);
        },
        concatRoom(state, rooms){
            let allrooms = state.chatRooms.concat(rooms);
            state.chatRooms = allrooms;
        },
        setEmptyRoom(state){
            state.chatRooms = [];
        },
        unshiftdisplayedRoom(state, chatRoom){
            state.displayedRooms.unshift(chatRoom);
        },
        unshiftchatRoom(state, chatRoom){
            let index = findRoomsInArray(state.chatRooms, chatRoom);
            if(index != -1){
                state.chatRooms.splice(index, 1);
            }
            state.chatRooms.unshift(chatRoom);
        },
        displayedRoomsright(state, data){
            let index = data.index;
            let right = data.right;
            let chatRoom = state.displayedRooms[index];
            Vue.set(chatRoom, 'right', right);
            Vue.set(state.displayedRooms, index, chatRoom);
        },
        closechatRoom(state, chatRoom){
            let index = state.displayedRooms.indexOf(chatRoom);
            state.displayedRooms.splice(index, 1);
        },
        updatedisplayedRooms(state, chatRoom){
            let index = findRoomsInArray(state.displayedRooms, chatRoom);
            if(index != -1)
                Vue.set(state.displayedRooms, index, chatRoom);
        },
        updatechatRooms(state, chatRoom){
            let index = findRoomsInArray(state.chatRooms, chatRoom);
            if(index != -1)
                Vue.set(state.chatRooms, index, chatRoom);
        }

    },
    actions: {
    },
    modules: {
    }
})
