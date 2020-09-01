<template>
    <div>
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
            <div class="chat-room-panel overflow-y-auto" :style="{height: this.windowHeight - 110 + 'px'}">
                <template v-if="room_loaded">
                    <el-row
                            v-for="(chatRoom,index) in chatRooms" :key="index">
                        <Roomblock
                                :index="index"
                                v-on:openroom="openRoom"
                        ></Roomblock>
                    </el-row>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import Roomblock from "../components/Roomblock";
    import AutoCompleteInput from "../components/AutoCompleteInput";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {SESSION_KEY_LOGIN_USER, AUTH_TOKEN, CHATROOM} from "@/utils/Constants";
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
                windowHeight: window.innerHeight
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
                    vm.$store.commit('setEmptyRoom');
                }
                let resp = await getAllRooms(postData, this.auth);
                let data = resp.data;
                vm.roomParameters.loading = false;
                vm.room_loaded = true;
                let newRooms = data.rooms;
                for(let i=0;i<newRooms.length;i++){
                    let room = newRooms[i];
                    vm.initChatRoom(room);
                }
                vm.roomParameters.hasMoreRooms = data.has_more_rooms;
                vm.$store.commit('concatRoom', newRooms);
                vm.updateRoomMap(data.rooms);
                if(callBack){
                    callBack();
                }
            },
            updateRoomMap: function(rooms){
                let room;
                let vm = this;
                for(let i=0;i<rooms.length;i++){
                    room = rooms[i];
                    room.unreadCount = room.unread_count;
                    vm.chatRoomMap[room.room_id] = room;
                    this.updateWorkroomChatRoomCount(room.room_id, room.unreadCount);
                }
            },
            isRoomActive: function(room_id){
                let vm = this;
                return vm.chatRoomWindow.activeWindow &&
                    room_id == vm.chatRoomWindow.activeWindow.room_id &&
                    ! vm.chatRoomWindow.activeWindow.minimized;
            },
            updateWorkroomChatRoomCount: function(room_id, unreadCount, countDiff){
                let vm = this;
                if(!vm.isRoomActive(room_id)){
                    return;
                }
                if(vm.workroomChatRoom.room_id == room_id){
                    if(unreadCount !== null){
                        vm.workroomChatRoom.unreadCount = unreadCount;
                    }else{
                        vm.workroomChatRoom.unreadCount += countDiff;
                    }
                }
            },
            initChatRoom(chatRoom){
                this.$set(chatRoom, 'loadMessages', false);
                this.$set(chatRoom, 'newMembers', []);
                this.$set(chatRoom, 'messages', []);
                this.$set(chatRoom, 'oldMessageCount', undefined);
                this.$set(chatRoom, 'newMessageReceived', false);
                this.$set(chatRoom, 'minimized', false);
                this.$set(chatRoom, 'searchText', '')
                this.$set(chatRoom, 'searchResult', {
                    ROWS: 20,
                    ROWS_PER_TIME: 5,
                    remainCounts: 0,
                    totalCounts: 0,
                    shownMessages: null,
                    unShownMessages: null
                })
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
            openRoom(chatRoom){
                console.log('open room' + chatRoom.room_id);
                SessionStorage.setJSON(CHATROOM, chatRoom);
                this.$router.push('/chatroom');
            },
        }
    }
</script>

<style>
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
        height: auto;
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
