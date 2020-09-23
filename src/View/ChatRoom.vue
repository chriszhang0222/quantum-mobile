<template>
    <div>
        <div class="chatroom-header" v-bind:class="{'new-message-received': chatRoom.newMessageReceived}">
            <el-button type="primary" icon="el-icon-refresh-left" class="pull-left "
                       style="background-color: #0d62b9"
                       v-bind:class="{'new-message-received': chatRoom.newMessageReceived}"
                       @click="backtochat">Back</el-button>
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
                <div class="discussion-message-view" :style="{height: this.windowHeight - 195 + 'px'}" v-show="!chatRoom.searchResult.shownMessages">
                    <div class="discussion-scroll-div"
                         v-on:scroll="whenScroll(chatRoom)" id="scroll-container">
                        <div v-if="chatRoom.messageLoaded">
                            <div class="chat-load-more onhighlight margin-bottom10" v-if="chatRoom.oldMessageCount > 0">Loading more ...</div>
                            <Messages
                                    v-for="(message, index) in chatRoom.messages"
                                    v-bind:message="message"
                                    v-bind:messages="chatRoom.messages"
                                    v-bind:chatroom="chatRoom"
                                    v-bind:index="index"
                                    v-bind:searchtext="chatRoom.searchText"
                                    v-bind:userid="user.user_id"
                                    v-bind:key="index"
                                    />
                        </div>
                    </div>
                </div>
                <div class="discussion-message-view"  v-show="chatRoom.searchResult.shownMessages">
                    <div align="center" v-if="chatRoom.searchResult.shownMessages && chatRoom.searchResult.shownMessages.length === 0" class="discussion-task-content-holder">-->
                        <div class="discussion-task-content">
                            <div class="paddingtop-10">
                                <p>No Matching Result.</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="chatRoom.searchResult.shownMessages && chatRoom.searchResult.shownMessages.length > 0" >
                        <Messages
                                v-for="(message, index) in chatRoom.searchResult.shownMessages"
                                v-bind:message="message"
                                v-bind:messages="chatRoom.searchResult.shownMessages"
                                v-bind:chatroom="chatRoom"
                                v-bind:index="index"
                                v-bind:searchtext="chatRoom.searchText"
                                v-bind:userid="user.user_id"
                                v-bind:key="index"
                        >
                        </Messages>
                        <div class="paddingleftright-12 margin-bottom30">
                            <span class="discussion-chat-message no-discussion-messages" style="float: left">{{ chatRoom.searchResult.totalCounts }} results in total</span>
                            <span class="discussion-chat-message no-discussion-messages pull-right pointer-cursor" ng-if="chatRoom.searchResult.remainCounts">
                                        <a v-on:click="searchInputChange(chatRoom, false)">show {{ chatRoom.searchResult.remainCounts }} more results</a>
                            </span>
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
                                <el-button id="discussion-send-chat-button" class="message-send"
                                        v-on:click="prepareAndSendNewMessage(chatRoom)">
                                    Send
                                </el-button>
<!--                                <div class="discussion-add-file" v-on:click="openFileModal(chatRoom)">-->
<!--                                    <font-awesome-icon icon="file-word"></font-awesome-icon>-->
<!--                                </div>-->
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="message-container"  v-show="chatRoom.showMembers">
            <div class="discussion-tool-bar clearfix" style="height: 45px">
                <AutoCompleteInput
                        class="team-task-discussion private-chat-user-input pull-left margin-top5"
                        placeholder="Add User"
                        typeahead-style="dropdown"
                        :typeahead-hide-discard="true"
                        :existing-tags="existing_tags"
                        :user-id="user.user_id"
                        :typeahead-url="typeahead_url"
                        :typeahead-max-results=5
                        :limit=5
                        :hide-input-on-limit=true
                        @tag-added="onTagAdd"
                        @tag-removed="onTagRemoved"
                        v-bind:wrapper-class="'tags-input-wrapper-chat'"
                        :typeahead="true"
                ref="autocomplete">
                </AutoCompleteInput>
                <img class="add-user-in-room"
                     style="margin-right: 5px"
                     :src="img.add"
                     v-show="this.new_users.length > 0"
                     @click="addNewMember"
                >
                <font-awesome-icon class="pull-right" style="margin-top: 10px" icon="comments" size="lg"
                @click="backtochatroom"></font-awesome-icon>
            </div>
            <div class="discussion-message-view" :style="{height: this.windowHeight - 90  + 'px'}">
                <el-row v-for="member in chatRoom.members" :key="member.user_id"
                class="room-member clearfix">
                    <img class="media-object discussion-user-thumb"
                         :src="img.user"
                         data-toggle='tooltip'
                         data-placement='bottom'>
                    <div class="room-member-name">{{ member.full_name }}</div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {SessionStorage} from "@/utils/SessionStorage";
    import {SESSION_KEY_LOGIN_USER, AUTH_TOKEN, CHATROOM, NEW_CHAT_MESSAGE} from "@/utils/Constants";
    import {loadChatMessage, searchMessage, updateMessageStatusApi, addUserInRoom } from "@/quantumApi/chat/chat";
    import Messages from "@/components/Messages";
    import {debounce} from 'throttle-debounce'
    import AutoCompleteInput from "@/components/AutoCompleteInput";
    import {Toast} from "@/utils/Toast";
    export default {
        name: "ChatRoom",
        components: {Messages, AutoCompleteInput},
        created(){
         this.initData();
        },
        computed:{
          webSocket(){
              return this.$store.state.websocket;
          }
        },
        mounted(){
            let vm = this;
            let box = document.getElementById('input-box');
            setTimeout(() => {
                box.focus()
            }, 0);
            let content = document.getElementsByClassName('content')[0];
            let height = content.scrollHeight + 50;
            content.scrollTo({
                'top': height
            });
            this.loadMessages(this.scroll_options, null, (messages) =>{
                vm.readMessages(messages);
            })
            this.windowHeight = window.innerHeight;
            this.$bus.on(NEW_CHAT_MESSAGE, (msg) => {
                vm.newMessageReceive(msg);
            })
        },

        beforeDestroy(){
            this.$bus.off(NEW_CHAT_MESSAGE);
        },
        data(){
            return {
                typeahead_url: process.env.VUE_APP_SERVER + 'chat/get_users_in_company/?name=:search&user_id=:userID',
                new_users: [],
                existing_tags: [{full_name: ''}],
                windowHeight: 0,
                user: {},
                auth:'',
                DISCUSSION_CONTAINER: 'scroll-container',
                chatRoom: {
                },
                img: {search: require('../assets/img/search.png'),
                    clear: require('../assets/img/clear.png'),
                    add: require('../assets/img/create.png'),
                    user: require('../assets/img/user.png')
                },
                scroll_options: {
                    position: 'bottom',
                    container: 'scroll-container'
                },
                pendingMessages: {},
                unSentMessages: []
            }
        },
        methods:{
            addNewMember(){
                let members = this.chatRoom.members;
                let new_member_ids = [];
                for(let member of this.new_users){
                    if(!this.exist_user(member, members)){
                        new_member_ids.push(member.id);
                    }
                }
                this.$refs['autocomplete'].clearTags();
                this.new_users = [];
                if(new_member_ids.length > 0){
                    let postData = {
                        new_member_ids: JSON.stringify(new_member_ids),
                        room_id: this.chatRoom.room_id,
                        user_id: this.user.user_id,
                        company_id: this.user.company_id
                    }
                    addUserInRoom(postData, this.auth)
                    .then((res) => {
                       if(res.status === 200){
                           let data = res.data;
                           if(data.success){
                               this.$set(this.chatRoom, 'members', data.member_list);
                               Toast.success('Add new members to room successfully');
                           }
                       }
                    });

                }
            },
            exist_user(user, users){
              for(let exist of users){
                  if(user.id === exist.id){
                      return true;
                  }
              }
              return false;
            },
            newMessageReceive(msg){
                let message
                let vm = this;
                for(let index = 0; index < msg.length;index++){
                    message = msg[index];
                    this.$set(this.chatRoom, 'messageLoaded', true);
                    this.pushNewMessgaes(message, this.DISCUSSION_CONTAINER, (message) => {
                        if(message.read === undefined || message.read === true){
                            return;
                        }else{
                            vm.readMessages([message]);
                        }
                    });
                    this.updateLatestMessage(message);
                }

            },
            updateLatestMessage(message){
                this.$set(this.chatRoom, 'message', message);
                this.$store.commit('unshiftchatRoom', this.chatRoom);
                this.$store.commit('updatechatRooms', this.chatRoom);
                if(message.from_user_id !== this.user.user_id) {
                    this.$set(this.chatRoom, 'newMessageReceived', true);
                    setTimeout(() => {
                        this.$set(this.chatRoom, 'newMessageReceived', false);
                    }, 4000)
                }

            },
            updatePendingMessage(message, deleteMessage){
                let identifier = message['identifier'];
                let pendingMessage = this.pendingMessages[identifier];
                if(pendingMessage){
                    pendingMessage['id'] = message['id'];
                    pendingMessage['timestamp'] = message['timestamp'];
                    pendingMessage['body'] = message['body'];
                    pendingMessage['discussion_date'] = message['discussion_date'];
                    pendingMessage['discussion_time'] = message['discussion_time'];
                    if(deleteMessage){
                        delete pendingMessage['identifier'];
                    }
                }
            },
            pushNewMessgaes(message, container, callBack){
                if(!message.from_local && this.pendingMessages[message['identifier']]){
                    this.updatePendingMessage(message, true);
                    return;
                }
                callBack(message);
                let currentMessages = this.chatRoom.messages;
                let message_length = currentMessages.length;
                if(message.timestamp != null && message_length > 0 && currentMessages[message_length-1].timestamp >= message.timestamp){
                    return;
                }
                currentMessages.push(message);
                this.$set(this.chatRoom, 'messages', currentMessages);
                if(container && document.getElementById(this.DISCUSSION_CONTAINER)){
                    this.scrollElement({
                        animation: true,
                        container: container,
                        position: 'bottom'
                    })
                }
            },
            readMessages(messages){
                let unreadMessageIds = [];
                for(let i=0;i<messages.length;i++){
                    let message = messages[i];
                    if(!message.read){
                        unreadMessageIds.push(message.id);
                        message.read = true;
                    }
                }
                this.updateMessageStatus(unreadMessageIds)

            },
            async updateMessageStatus(messageIds){
                if(messageIds.length === 0){
                    return;
                }
                let params = {
                    'user_id': this.user.user_id,
                    'messages': JSON.stringify(messageIds),
                    'status': 'read'
                };
                let res = await updateMessageStatusApi(params, this.auth);
                let data = res.data;
                if(data.success){
                    let count = -messageIds.length;
                    let newCount = this.chatRoom.unreadCount + count;
                    this.$set(this.chatRoom, 'unreadCount', newCount);
                    this.$store.commit('updatechatRooms', this.chatRoom);
                    this.$store.commit('updateNotification', count);
                }
            },
            onTagAdd(slug){
                this.new_users.push(slug);
            },
            onTagRemoved(slug){
                let index = null;
                for(let i=0;i<this.new_users.length;i++){
                    if(this.new_users[i] == slug){
                        index = i;
                        break;
                    }
                }
                this.new_users.splice(index, 1);
            },
            initData(){
                this.auth = SessionStorage.get(AUTH_TOKEN);
                this.chatRoom = SessionStorage.getJson(CHATROOM);
                SessionStorage.remove(CHATROOM);
                this.user = SessionStorage.getJson(SESSION_KEY_LOGIN_USER);
            },
            async loadMessages(scrollOpt, messageID,  callback){
                let callBack = callback || function(){};
                let scrollOptions = scrollOpt || {};
                let timestamp = null;
                if(this.chatRoom.oldMessageCount <= 0){
                    return;
                }else if(this.chatRoom.messages.length === 0){
                    timestamp = null;
                }else{
                    timestamp = this.chatRoom.messages[0].timestamp;
                }
                let paramData = {
                    room_id: this.chatRoom.room_id,
                    user_id: this.user.user_id,
                    rows: 20,
                    timestamp: timestamp
                }
                let res = await loadChatMessage(paramData, this.auth);
                let data = res.data;
                let messages = data.messages;
                if(messages.length > 0){
                    let latestMessageID = null;
                    messages.forEach((message, index) => {
                       if(this.chatRoom.messages.length == 0 || message.timestamp < this.chatRoom.messages[0].timestamp){
                           this.chatRoom.messages.unshift(message);
                           if(!latestMessageID){
                               latestMessageID = message.id;
                           }
                       }
                    });
                    this.$set(this.chatRoom, 'messageLoaded', true);
                    this.$set(this.chatRoom, 'oldMessageCount', data.old_message_count);
                    this.$store.commit('updatechatRooms', this.chatRoom);
                    callBack(messages);
                    if(scrollOptions.position === 'element'){
                        scrollOptions.toElement = 'message' + latestMessageID;
                    }
                    if(messageID){
                        scrollOptions.position = 'element';
                        scrollOptions.toElement = '.m' + messageID;
                        scrollOptions.hightlight = '.m' + messageID;
                    }
                   this.scrollElement(scrollOptions);
                }

            },
            scrollElement(options){
                const BUFFER_HEIGHT = 20; //px
                const EXTRA_HEIGHT = 50; //px
                const container = options.container;
                const position = options.position;
                let height, toElement;
                setTimeout(() => {
                    let element = document.getElementById(container);
                    if(position === 'element'){
                        toElement = document.getElementById(options.toElement);
                        height = toElement.scrollHeight + EXTRA_HEIGHT;
                    }else if(position === 'bottom'){
                        height = element.scrollHeight + EXTRA_HEIGHT;
                    }
                    element.scrollTo({'top': height});
                }, 100)
            },
            handleKey(event, chatRoom){
                if(event.keyCode === 13 && !event.shiftKey){
                    this.prepareAndSendNewMessage(chatRoom)
                    event.preventDefault();
                }else if(event.keyCode === 27){
                    let checkbox = this.$refs['userInput'];
                    checkbox.innerText = '';
                    event.preventDefault();
                }
            },
            prepareAndSendNewMessage(chatRoom){
                let checkbox = this.$refs['userInput'];
                const content = checkbox.innerText;
                if(content && content.trim().length > 0){
                    this.$set(chatRoom, 'newMessage', content);
                    this.sendNewMessage(chatRoom);
                }
                checkbox.innerText = '';
            },
            sendNewMessage(chatRoom){
                let timestamp = new Date().getTime();
                let messageToSend = {
                    type: 'chat',
                    room_id: chatRoom.room_id,
                    body: chatRoom.newMessage,
                    user_id: this.user.user_id,
                    company_id: this.user.company_id,
                    identifier: timestamp,
                    sub_domain: this.user.sub_domain,
                    domain_uri: process.env.VUE_APP_SERVER
                }
                let messageToDisplay = this.assembleDisplayMessage(chatRoom);
                messageToDisplay['body'] = chatRoom.displayMessage;
                messageToDisplay['messageToSend'] = messageToSend;
                this.sendMessageToWebSocket(messageToDisplay);
                this.newMessageReceive([messageToDisplay]);
                this.pendingMessages[timestamp] = messageToDisplay;
            },
            assembleDisplayMessage(chatRoom){
                return {
                    room_id: chatRoom.room_id,
                    from_user_id: this.user.user_id,
                    read: true,
                    timestamp: null,
                    from: 'NAME',
                    picture: null,
                    email: null,
                    phone: null,
                    discussion_date: 'Today',
                    discussion_time: null,
                    from_local: true
                }
            },
            sendMessageToWebSocket(message){
              if(this.webSocket !== null && this.webSocket.readyState === 1){
                  this.webSocket.send(JSON.stringify(message.messageToSend));
                  return true;
              }else{
                  if(!message.attempts){
                      message.attempts = 1;
                      this.unSentMessages.push(message);
                  }else{
                      message.attempts = message.attempts + 1;
                  }
                  return false;
              }
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
                this.$router.push('/chat')
            },
            searchInputChange(chatRoom, initial){
                  if(chatRoom.searchText.trim() === ""){
                      chatRoom.searchResult.shownMessages = null;
                  }else{
                      let searchText = chatRoom.searchText.trim();
                      this.loadSearchResults(searchText, initial, chatRoom);
                  }
            },

            loadSearchResults(searchText, initial, chatRoom){
                let searchResult = chatRoom.searchResult;
                let rows = searchResult.ROWS || 20;
                let rows_per_time = searchResult.ROWS_PER_TIME || 5;
                if (initial) {
                    searchResult.shownMessages = [];
                    searchResult.unShownMessages = [];
                }
                let unShownLength = searchResult.unShownMessages.length;
                if(unShownLength >= rows_per_time){
                    this.loadMoreSearchResult(searchResult, rows_per_time, chatRoom);
                }else{
                    let postData = {
                        user_id: this.user.user_id,
                        room_id: chatRoom.room_id,
                        term: searchText,
                        rows: rows,
                        start: initial ? 0 : unShownLength + searchResult.shownMessages.length
                    }
                    searchMessage(postData, this.auth)
                    .then((resp) => {
                        let res = resp.data;
                        searchResult.unShownMessages = searchResult.unShownMessages.concat(res.messages);
                        searchResult.totalCounts = res.total_discussion_count;
                        this.loadMoreSearchResult(searchResult, rows_per_time, chatRoom);
                    })

                }
            },
            loadMoreSearchResult(searchResult, rows, chatRoom){
                let messages = searchResult.unShownMessages.splice(0, rows);
                searchResult.shownMessages = searchResult.shownMessages.concat(messages);
                searchResult.remainCounts = Math.max(0, searchResult.totalCounts - searchResult.shownMessages.length);
                this.$set(chatRoom, 'searchResult', searchResult);
                console.log(chatRoom.searchResult.shownMessages)
            },
            toShowMemberPage(chatRoom){
                this.$set(chatRoom, 'showMembers', true);
            },
            whenScroll(chatRoom){
                let vm = this;
                if(!chatRoom || chatRoom.messages.length === 0){
                    return;
                }
                let selector = this.DISCUSSION_CONTAINER
                let container = document.getElementById(selector);
                if(container.scrollTop === 0){
                    setTimeout(() => {
                        this.loadMessages({
                            container: this.DISCUSSION_CONTAINER,
                            position: 'element'
                        }, null, (messages) => {
                            vm.readMessages(messages);
                        })
                    }, 500)
                }
            },
            debounce_(fn, wait){
                let timer;
                return function () {
                    let self = this,
                        args = arguments;
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        fn.apply(self, args)   // 把参数传进去
                    }, wait);
                }
            },
            backtochatroom(){
                this.$set(this.chatRoom, 'showMembers', false);
                this.$set(this.chatRoom, 'searchText', '');
            }

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
        border-bottom: 1px solid #0d62b9;
        background: #0d62b9;
        height: 40px;
        display: block;
    }
    .header-name{
        font-weight: bold !important;
        top: 5px;
        position: relative;
        left: -40px;
    }
    .new-message-received{
        background-color: #5dc282 !important;
        border-bottom: 1px solid #5dc282;
        border-color: #5dc282;
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
        border: 1px solid #b8b8b8;
        color: #222E4C;
        background-color: #ffffff;
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
        height: 600px;
    }
    .discussion-scroll-div {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
    }
    .discussion-add-file {
        position: absolute;
        cursor: pointer;
        height: 50px;
        width: 50px;
        top: 18px;
        right: 70px;
        border: none;
        color: #4A90E2;
        background-color: transparent;
    }
    .chat-load-more {
        background-color: rgba(255, 255, 255, 0.4);
        color: black;
        text-align: center;
        cursor: pointer;
        font-size: 10px;
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
        text-align: left;
    }

    .message-container{
        display: block;
        flex: 1;
        flex-basis: auto;
        box-sizing: border-box;
        background-color: #ffffff;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .message-send{
        position: absolute;
        top: 15px;
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
    .padding-2 {
        padding: 2px;
    }
    .no-discussion-messages {
        color: #666666;
    }
    .discussion-chat-message {
        font-size: 14px;
        color: #34495E;
        word-wrap: break-word;
        margin: 7px;
        line-height: 18px;
    }
    .margin-top5{
        margin-top: 5px;
    }
    .add-user-in-room {
        height: 18px;
        cursor: pointer;
        margin-top: 10px;
    }
    .room-member {
        padding: 10px;
        border-bottom: 1px solid #cccccc;
        display: flex;
        align-items: center;
    }
    .discussion-user-thumb {
        height: 40px;
        width: 40px;
        border-radius: 6px;
        margin-right: 10px;
        float: left;
    }

</style>
