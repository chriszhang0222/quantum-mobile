<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-comment"></i> Chat
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="chatroom-container">
            <div class="discussion-filter">
                <el-row class="margin-top10">
                    <el-col>
                <AutoCompleteInput
                            class="team-task-discussion private-chat-user-input"
                            placeholder="Search for users"
                            :existing-tags="existing_tags"
                            :typeahead-url="typeahead_url"
                            :user-id="userId"
                            typeahead-style="dropdown"
                            :typeahead-hide-discard="true"
                            :typeahead-max-results=5
                            :limit="5"
                            :hide-input-on-limit="true"
                            @tag-added="onTagAdded"
                            v-bind:wrapper-class="'tags-input-wrapper-custom'"
                            :typeahead="true">
                </AutoCompleteInput>
                <img class="add-discussion-recipient-input"
                     style="margin-right: 5px"
                     :src="imgUrl.src"
                   >
                    </el-col>
                    </el-row>
            </div>
            <div class="chat-room-panel overflow-y-auto">
                <el-row v-for="(chatRoom,index) in testRooms" :key="index">
                    <Roomblock
                            :index="index"
                            :testRoom="chatRoom"
                    ></Roomblock>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import Roomblock from "../components/Roomblock";
    import AutoCompleteInput from "../components/AutoCompleteInput";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {SESSION_KEY_LOGIN_USER, AUTH_TOKEN} from "@/utils/Constants";
    import {getAllRooms} from "@/quantumApi/chat/chat";

    export default {
        name: "Chat",
        components: {Roomblock, AutoCompleteInput},
        data(){
            return{
                auth: null,
                userId: null,
                companyId: null,
                typeahead_url: process.env.VUE_APP_SERVER + 'chat/get_users_in_company/?name=:search&user_id=:userID',
                testRooms:[{
                    room_id: 10,
                    name: 'TestRoom',
                    message: {
                        from: 'Justin Trisdale',
                        timestamp: '1598584947000',
                        body: 'hello'
                    },
                    messages:{},
                    unreadCount: 0
                }],
                existing_tags: [{full_name: ''}],
                imgUrl: {
                    src: require('../assets/img/create.png'),
                },
                pendingMessages: {},
                unSentMessages: [],
                searchText: '',
                room_loaded: false,
                message: 'Init',
                chatRoomWindow: {
                    mainWindowShown: false,
                    minimized: false,
                    activeWindow: null
                },
                serverUrl: "",
                discussionTabs: [{
                    title: 'Chat',
                    type: 'users',
                    unreadCount: 0,
                },
                ],
                currentTab: 'users',
                DISCUSSION_CONTAINER: '.discussion-scroll-div',
                ROOMS_PER_PAGE: 20,
                openedRooms: [],
                roomParameters: {
                    userSearchString: [],
                    roomSearchString: [],
                    at: false,
                    imp: false,
                    hasMoreRooms: true,
                    loading: false,
                    membersForNewGroup: []
                },
                workroomChatRoom: {
                    room_id: null,
                    unreadCount: 0,
                    messages: [],
                    disabled: false
                },
                MESSAGE_PAGINATE_ROWS: 20,
                selected_room: null,
            }
        },
        computed: {
            chatRooms(){
                return this.$store.state.chatRooms
            },
            displayedRooms(){
                return this.$store.state.displayedRooms
            }

        },
        watch: {
            chatRooms:{
                handler(oldValue, newValue){
                }
            }
        },
        created(){
            this.initParams();
            this.getRooms();
        },
        methods: {
            onTagAdded(){

            },
            async getRooms(loadMore, callBack){
                let vm = this;
                if(vm.roomParameters.loading){
                    return;
                }
                if(!loadMore){
                    vm.roomParameters.hasMoreRooms = true;
                    vm.chatRoomMap = {};
                }else if(!vm.roomParameters.hasMoreRooms){
                    return;
                }
                vm.roomParameters.loading = true;
                let filters = [];
                let chatRooms = vm.$store.state.chatRooms;
                let postData = {
                    user_id: this.userId,
                    company_id: this.companyId,
                    discussion_filters: JSON.stringify(filters),
                    room_type: vm.currentTab,
                    rows: vm.ROOMS_PER_PAGE,
                    term: vm.roomParameters.roomSearchString,
                    exclude_room_ids: JSON.stringify(loadMore ? this.getAttrs(chatRooms, 'room_id') : [])
                };
                if(!loadMore){
                    //Todo: chat change
                    // vm.chatRooms = [];
                    vm.$store.commit('setEmptyRoom');
                }
                let response = await getAllRooms(postData, this.auth);
                let resp = response.data;
            },

            initParams(){
                let user = SessionStorage.getJson(SESSION_KEY_LOGIN_USER);
                this.userId = user.user_id;
                this.companyId = user.company_id;
                this.auth = SessionStorage.get(AUTH_TOKEN);
            },
            getAttrs: function(array, field){
                let newArray = [];
                for(let i=0; i<array.length;i++){
                    newArray.push(array[i][field]);
                }
                return newArray;
            },
        }
    }
</script>

<style scoped>
    .overflow-y-auto {
        overflow-y: auto;
    }

    .height-250 {
        height: 250px;
    }
    .chatroom-container{
        display: block;
        flex: 1;
        flex-basis: auto;
        overflow: auto;
        box-sizing: border-box;
        background-color: #ffffff;
        height: 800px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .discussion-filter{
        padding: 2px 0;
        min-height: 60px;
        border-bottom: 1px solid #dddddd;
    }
    .private-chat-user-input {
        font-size: 14px;
        display: inline-block;
        border: none;
        border-radius: 15px;
        background-color: #f1f1f1;
        box-shadow: none;
        cursor: text;
        min-height: 30px;
        width: 80%;
    }
    .tags-input{
        padding: 10px 10px;
    }
    .add-discussion-recipient-input {
        height: 18px;
        cursor: pointer;
        margin-top: 10px;
        float: right;
    }
</style>
