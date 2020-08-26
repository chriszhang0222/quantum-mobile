import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        home_historgam: []
    },
    mutations: {
        sethomehistoram(state, data){
            state.home_historgam = data;
        }
    },
    actions: {
    },
    modules: {
    }
})
