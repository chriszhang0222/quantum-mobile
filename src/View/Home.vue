<template>
    <div>
        <div class="wrapper">
            <vHeader :show-chat="true"> </vHeader>
            <vSidebar :group="group"></vSidebar>
            <div class="content-box" :class="{'content-collapse':collapse}">
                <div class="content">
                    <transition name="move">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vHeader from "../components/Header.vue";
    import vSidebar from "../components/Sidebar.vue";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {SESSION_KEY_LOGIN_USER, NEW_CHAT_MESSAGE, AUTH_TOKEN} from "@/utils/Constants";
    import {Tools} from "@/utils/Tools";
    import {Toast} from "@/utils/Toast";
    import {getunreadCount} from "@/quantumApi/chat/chat";

    export default {
        name: "Home",
        components:{vHeader, vSidebar},
        data: function(){
            return {
                collapse: false,
                auth: '',
                user: {

                },
                group: '',
            }
        },
        created() {
            this.$bus.on("collapse-content", (msg) => {
                this.collapse = msg;
            });
            this.user = SessionStorage.getJson(SESSION_KEY_LOGIN_USER);
            this.group = this.user.group;
            this.auth = SessionStorage.get(AUTH_TOKEN);
            if(this.user === null || this.user === undefined || Tools.isEmpty(this.user)){
                this.$router.push('/');
            }else{
                let url = process.env.VUE_APP_CHATSERVER;
                let websocketUrl = ''
                if(url.indexOf('https') !== -1){
                    websocketUrl = 'wss:' + url.replace('https:', '')
                }else{
                    websocketUrl = 'ws:' + url.replace('http:', '')
                }
                if(Tools.isNotEmpty(this.user) && Tools.isNotEmpty(this.user.user_id) && Tools.isNotEmpty(this.user.company_id)
                && Tools.isNotEmpty(this.user.sub_domain)){
                    this.connectWebSocket(websocketUrl,1, false);
                }else{
                    Toast.error('No Company Id or User Id!');
                }
                this.updateUnreadCount();

            }
        },
        computed: {
          webSocket(){
              return this.$store.state.websocket
            }
        },
        mounted(){

        },
        beforeDestroy() {
            this.$bus.off("collapse-content", (msg) => {
                this.collapse = msg;
            })
        },
        methods:{
            async updateUnreadCount(){
              let params = {
                  'user_id': this.user.user_id,
                  'company_id': this.user.company_id
              }
              let res = await getunreadCount(params, this.auth);
              let data = res.data;
              if(data.success){
                  let count = data.count;
                  this.$store.commit('updateNotification', count);
              }
            },
            connectWebSocket(url, attempts, closeSocket){
                let user_id = this.user.user_id;
                let company_id = this.user.company_id;
                let sub_domain = this.user.sub_domain;
                let websocket = null;
                if(closeSocket){
                    if(this.webSocket !== null){
                        this.webSocket.close();
                    }
                }
                websocket = new WebSocket(url + '/chat/' + user_id + '/' + company_id + '/' + sub_domain);
                this.$store.commit('setWebSocket', websocket);
                websocket.onmessage = (event) => {
                    let data = JSON.parse(event.data);
                    if(data.type === 'chat'){
                        let messages = data.messages;
                        let count = 0;
                        for(let message of messages){
                            if(!message.read){
                                count += 1;
                            }
                        }
                        this.$store.commit('updateNotification', count);
                        this.$bus.emit(NEW_CHAT_MESSAGE, messages);
                    }
                }
                websocket.onclose = (e)=>{
                    console.log('websocket closed: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                    console.log(e)
                    setTimeout(()=>{
                        this.connectWebSocket(url, attempts+1);
                    }, this.generateInterval(attempts))
                }
                websocket.onerror = function(e){
                    console.log('connection error');
                    console.log(e);
                }
            },
            generateInterval(attempts){
                let MAX_INTERVAL = 60 * 1000; //ms
                let interval = Math.min((Math.pow(2, attempts) - 1) * 1000, MAX_INTERVAL);
                // generate the interval to a random number between 0 and the maxInterval determined from above
                return Math.random() * interval;
            },
        }
    }
</script>

<style scoped>
    .moveL-enter-active,
    .moveL-leave-active {
        transition: all 0.3s linear;
        transform: translateX(0%);
    }
    .moveL-enter,
    .moveL-leave {
        transform: translateX(-100%);
    }
    .moveL-leave-to {
        transform: translateX(-100%);
    }

</style>
