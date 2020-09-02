<template>
    <div>
        <div class="discussion-message-block"
             v-bind:class="{'discussion-unread' : chatRoom.unreadCount > 0}">
            <div class="discussion-message-taskname">
                <span class="pull-left discussion-room-name">{{ chatRoom.name }}</span>
                <span class="pull-right margin-left10" @click="dialogFormVisible = true"><font-awesome-icon icon="edit" /></span>
                <span class="discussion-prettytime pull-right" v-show="chatRoom.unreadCount > 0">{{ chatRoom.unreadCount }} new</span>
            </div>
            <div v-on:click="$emit('openroom', chatRoom)">
                <div v-show="chatRoom.message.body">
                    <el-row class="margin-top10">
                        <el-col :span="6" :lg="{span:2}">
                            <img :src="imgSrc.src" class="user_picture img-rounded pull-left">
                        </el-col>
                        <el-col :span="18" :lg="{span:22}">
                            <el-row>
                                <span class="pull-left"> From: {{chatRoom.message.from}} </span>
                                <span class="discussion-prettytime pull-right" v-html="setPrettyTime(chatRoom.message.timestamp)"></span>
                            </el-row>
                            <el-row>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row v-show="chatRoom.message.body">
                        <el-col :offset="6" :lg="{offset:2, span:22}" :span="18">
                            <span class="pull-left discussion-short-chat-message">{{ chatRoom.message.body }}</span>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="chatRoom.message.body === null || chatRoom.message.body === undefined">
                    <el-row v-show="chatRoom.message.body === null || chatRoom.message.body === undefined" class="margin-top20">
                        <el-col :offset="6" :lg="{offset:2, span:22}" :span="18">
                            <span class="pull-left discussion-short-chat-message">There are no messages.</span>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <el-dialog title="Edit Room Name" :visible.sync="dialogFormVisible">
            <el-form :model="chatRoom">
                <el-form-item label="Room Name">
                    <el-input v-model="chatRoom.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="editRoom">Confirm</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment';
    import {editRoomName } from "@/quantumApi/chat/chat";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {SESSION_KEY_LOGIN_USER, AUTH_TOKEN, CHATROOM, NEW_CHAT_MESSAGE} from "@/utils/Constants";
    export default {
        name: "Roomblock",
        props: {
            index:{
                type: Number
            },
        },
        computed:{
            chatRoom(){
                return this.$store.state.chatRooms[this.index];
            }
        },
        data(){
            return{
                dialogFormVisible: false,
                count: 1,
                imgSrc: {
                    src: require('../assets/img/user.png'),
                }
            }
        },
        methods: {
            setPrettyTime: function (date) {
                return moment.utc(date, "YYYY-MM-DD hh:mm:ss").fromNow();
            },
            updateRoomCount(){
                let count = this.chatRoom.unreadCount;
                this.chatRoom = Object.assign({}, this.chatRoom, {'unreadCount': count+2});
            },
            editRoom(){
                let auth = SessionStorage.get(AUTH_TOKEN);
                let params = {
                    'room_id': this.chatRoom.room_id,
                    'name': this.chatRoom.name
                }
                editRoomName(params, auth, (res) => {
                    if(res.data.success) {
                        this.$store.commit('updatechatRooms', this.chatRoom);
                    }
                });
                this.dialogFormVisible = false;
            }
        }
    }
</script>

<style scoped>
    .discussion-message-block {
        padding: 0 8px;
        border-bottom: 1px solid #dddddd;
        /*border-top: 2px solid #dddddd;*/
        background-color: #ffffff;
        cursor: pointer;
    }

    .discussion-message-block-unread {
        background-color: #eeeeee;
    }
    .discussion-unread {
        background-color: #e3eef7;
    }

    .discussion-message-taskname {
        font-size: 14px;
        font-weight: bold;
        padding: 2px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .discussion-room-name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #222E4C;
        margin-top: 2px;
        font-size: 16px;
    }
    .discussion-short-chat-message {
        font-size: 14px;
        color: #606D8C;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        overflow: hidden;
    }
    .discussion-prettytime{
        font-size: 12px;
    }

    span{
        font-weight: bold;
    }

</style>
