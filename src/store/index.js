import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        home_historgam: [],
        chatRooms: [],
        displayedRooms: [],
        chatRoomMap: {},
        chatNotification: {
            messages: [],
            oldMessageCount: undefined,
            unreadCount: 0
        },
    },
    mutations: {
        sethomehistoram(state, data){
            state.home_historgam = data;
        },

    },
    actions: {
    },
    modules: {
    }
})
