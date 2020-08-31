<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <div @click="backtochat">
                        <font-awesome-icon icon="undo-alt" size="xs"/> Back
                    </div>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="chatroom-header" v-bind:class="{'new-message-received': chatRoom.newMessageReceived}">
            <span class="header-name"> {{ chatRoom.name }}</span>
        </div>
        <div class="message-container" v-show="!chatRoom.showMembers">
            <div class="discussion-tool-bar clearfix">
                <div class="search-discussion">
                    <img class="discussion-input-field-icon search-icon" :src="img.search">
                    <div>
                        <input type="text"
                               class="form-control discussion-search-input"
                               placeholder="Search this ChatRoom"
                               v-model="chatRoom.searchText"
                               v-on:change="searchInputChange(chatRoom, true)"
                        />
                        <img :src="img.clear" v-show="chatRoom.searchText.length > 0"
                             class="discussion-input-field-icon clear-icon"
                             v-on:click="clearSearchText(chatRoom)">

                    </div>
                </div>
                <div class="position-relative margin-top-3px pull-right">
                    <i class="el-icon-user" v-on:click="toShowMemberPage(chatRoom)"></i>
                    <div class="room-member-count">{{ chatRoom.members.length }}</div>
                </div>
            </div>
            <div class="chat-room-panel">
                <div class="discussion-message-view">
                    <div class="discussion-scroll-div"
                         v-on:scroll="whenScroll(chatRoom)">
                        <div v-if="chatRoom.messageLoaded">
                            <div class="chat-load-more onhighlight" v-if="chatRoom.oldMessageCount > 0">Loading more ...</div>

                        </div>
                    </div>
                </div>
                <div class="discussion-chatbox">
                    <div class="quantum-chatbox">
                        <form>
                            <div class="position-relative">
                                <div id="input-box"
                                        contenteditable="true"
                                     ref="userInput"
                                     tabindex="0"
                                     @keydown="handleKey($event, chatRoom)"
                                     class="editor form-control chatboxinput padding-2"
                                     v-bind:class="{'cursor-text': !chatRoom.disabled}"
                                     placeholder="Enter message..."
                                    >
                                </div>
                                <button id="discussion-send-chat-button" class="message-send"
                                        v-on:click="prepareAndSendNewMessage(chatRoom)">
                                    Send
                                </button>
                                <div class="discussion-add-file" v-on:click="openFileModal(chatRoom)">
                                    <font-awesome-icon icon="file-word"></font-awesome-icon>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {SessionStorage} from "@/utils/SessionStorage";
    import {SESSION_KEY_LOGIN_USER, AUTH_TOKEN, CHATROOM} from "@/utils/Constants";
    export default {
        name: "ChatRoom",
        created(){
          this.auth = SessionStorage.get(AUTH_TOKEN);
          this.chatRoom = SessionStorage.getJson(CHATROOM);
        },
        mounted(){
            let box = document.getElementById('input-box');

            setTimeout(() => {
                box.focus()
            }, 0)
        },
        data(){
            return {
                auth:'',
                chatRoom: {
                },
                img: {search: require('../assets/img/search.png'),
                    clear: require('../assets/img/clear.png')
                }
            }
        },
        methods:{
            handleKey(){

            },
            prepareAndSendNewMessage(chatRoom){

            },
            openFileModal(chatRoom){

            },
            clearSearchText(chatRoom){
                this.$set(chatRoom, 'searchText' , '');
                this.$set(chatRoom, 'searchResult', {
                    ROWS: 20,
                    ROWS_PER_TIME: 5,
                    remainCounts: 0,
                    totalCounts: 0,
                    shownMessages: null,
                    unShownMessages: null
                })
            },
            backtochat(){
                SessionStorage.pop(CHATROOM);
              this.$router.back();
            },
            searchInputChange(){

            },
            toShowMemberPage(chatRoom){
                this.$set(chatRoom, 'showMembers', true);
            },
            whenScroll(chatRoom){

            },

        }
    }
</script>

<style scoped>
    .chatroom-header{
        padding: 0;
        margin: 0;
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;
        font-weight: normal;
        border-bottom: 1px solid #7ebbe7;
        background: #7ebbe7;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        height: 40px;
        display: block;
    }
    .header-name{
        font-weight: bold !important;
        top: 5px;
        position: relative;
    }
    .chatroom-header.new-message-received{
        background-color: #5dc282 !important;
        border-bottom: 1px solid #5dc282;
    }
    .discussion-tool-bar {
        height: 35px;
        padding: 2px 5px;
        border-bottom: 1px solid #cccccc;
    }
    .search-discussion {
        position: relative;
        display: inline-block;
        width: 80%;
        margin-left: -10%;
    }

    .discussion-tool-bar i {
        padding: 5px 20px 5px 5px;
    }

    .discussion-input-field-icon {
        position: absolute;
        display: inline-block;
        width: 12px;
        top: 12px;
    }

    .discussion-input-field-icon.search-icon {
        left: 14px;
    }
    .discussion-input-field-icon.clear-icon {
        cursor: pointer;
        right: 30px;
    }
    .discussion-search-input {
        padding: 0 30px;
        border-radius: 100px;
        border: none;
        color: #222E4C;
        background-color: #dedede;
        font-size: 12px;
        height: 35px;
        line-height: normal;
        width: 70%;
        float: left;
    }
    .room-member-count {
        position: relative;
        left: 5px;
        top: -10px;
        font-size: 10px;
    }

    .discussion-message-view {
        position: relative;
        width: 100%;
        height: -webkit-calc(100% - 50px);
        height: -moz-calc(100% - 50px);
        height: calc(100% - 50px);
    }
    .discussion-scroll-div {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .discussion-add-file {
        position: absolute;
        cursor: pointer;
        height: 50px;
        width: 50px;
        top: 18px;
        right: 35px;
        border: none;
        color: #4A90E2;
        background-color: transparent;
    }
    .chat-load-more {
        background-color: rgba(255, 255, 255, 0.4);
        color: black;
        text-align: center;
        cursor: pointer;
    }
    .discussion-chatbox {
        background-color: #ffffff;
    }

    .quantum-chatbox .chatboxinput {
        height: 30px;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 16px 50px 16px 10px;
        border-radius: 10px;
        border-color: #DDDDDD;
        line-height: normal;
        width: 85%;
    }

    .message-container{
        display: block;
        flex: 1;
        flex-basis: auto;
        overflow: auto;
        box-sizing: border-box;
        background-color: #ffffff;
        height: auto;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .message-send{
        position: absolute;
        top: 20px;
        right: 10px;
        border: none;
        color: #4A90E2;
        background-color: transparent;
    }
    [contenteditable=true]:empty:before {
        content: attr(placeholder);
        display: block;
        color: #999999;
        padding: 5px 15px;
        float: left;

    }
    .position-relative{
        position: relative;
    }

</style>
