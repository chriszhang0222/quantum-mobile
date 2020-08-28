<template>
    <div>
        <div class="discussion-message-block"
             v-bind:class="{'discussion-unread' : testRoom.unreadCount > 0}">
            <div class="discussion-message-taskname">
                <span class="pull-left discussion-room-name">{{ testRoom.name }}</span>
                <span class="pull-right margin-left10"><font-awesome-icon icon="edit" /></span>
                <span class="discussion-prettytime pull-right" v-show="testRoom.unreadCount > 0">{{ testRoom.unreadCount }} new</span>
            </div>
            <div>
                <div v-show="testRoom.message.body">
                    <el-row class="margin-top10">
                        <el-col :span="6" :lg="{span:2}">
                            <img :src="imgSrc.src" class="user_picture img-rounded pull-left">
                        </el-col>
                        <el-col :span="18" :lg="{span:22}">
                            <el-row>
                                <span class="pull-left"> From: {{testRoom.message.from}} </span>
                                <span class="discussion-prettytime pull-right" v-html="setPrettyTime(testRoom.message.timestamp)"></span>
                            </el-row>
                            <el-row>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row v-show="testRoom.message.body">
                        <el-col :offset="6" :lg="{offset:2, span:22}" :span="18">
                            <span class="pull-left discussion-short-chat-message">{{ testRoom.message.body }}</span>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="testRoom.message.body === null || testRoom.message.body === undefined">
                    <el-row v-show="testRoom.message.body === null || testRoom.message.body === undefined">
                        <el-col :offset="6" :lg="{offset:2, span:22}" :span="18">
                            <span class="pull-left discussion-short-chat-message">There are no messages.</span>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: "Roomblock",
        props: {
            index:{
                type: Number
            },
            testRoom: {
                type: Object
            },
        },
        computed:{
            chatRoom(){
                return this.$store.state.chatRooms[this.index];
            }
        },
        data(){
            return{
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
