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
        <div class="chatroom-container" v-show="!chatRoom.showMembers">
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

</style>
