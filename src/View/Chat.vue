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
    import {SESSION_KEY_LOGIN_USER} from "@/utils/Constants";

    export default {
        name: "Chat",
        components: {Roomblock, AutoCompleteInput},
        data(){
            return{
                user_Id: '',
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
                userId: '',
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
            this.userId = SessionStorage.getJson(SESSION_KEY_LOGIN_USER).user_id;
        },
        methods: {
            onTagAdded(){

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
