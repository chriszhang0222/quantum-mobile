<template>
    <div>
        <div class="divider discussion-prettytime marginbottom10"
             v-if="index == 0 || message.discussion_date != messages[index-1].discussion_date">
            <div class="discussion-date-div">
                <span class="discussion-date-line">{{ message.discussion_time }}  {{ message.discussion_date }}</span>
            </div>
        </div>
        <div v-if="!message.from_user_id">
            <div class="divider discussion-prettytime marginbottom-10" v-html="message.body"></div>
        </div>
        <div class="paddingleftright-12 message"
             v-bind:style="{'text-align': message.from_user_id === userid ? 'right': 'left'}"
             v-bind:class="{'owner-message': message.from_user_id == userid, 'bottom-message': showMessageBottom(messages, index, message)}"
             v-bind:id="'message'+message.id"
             v-if="message.from_user_id">
            <user-detail v-if="message.from_user_id != userid" v-bind:message="message">
            </user-detail>
            <div class="message-content" v-bind:title="message.discussion_time+','+message.discussion_date">
                <div class="position-relative" v-if="!message.deleted">
                    <div class="colfit" v-if="!message.file">
                        <span v-html="highlight(message.body, chatroom.searchText)" class="discussion-chat-message display_block"></span>
                    </div>
                    <div class="colfit" v-if="message.file">
                        <div v-bind:class="'message-file-' + message.file.media_type"
                             src="message.file.file_url">
                        </div>
                        <div class="file-image file-type-icons" v-bind:class="message.file.file_type + '-icon'">
                            <i class="el-icon-folder"></i>
                        </div>
                        <span class="discussion-chat-message">{{ message.file.file_name }}</span>
                        <div class="text-right discussion-chat-message" v-if="message.discussion_time">
                            <i class="fa fa-arrow-circle-down cursor-pointer marginright-10" v-on:click="$emit('downloadfile', message.file)"></i>
                        </div>
                    </div>
                </div>
                <div v-if="message.from_user_id != userid" class="row rowfit message-time">
                <span class="discussion-prettytime">
                    <span>{{ message.from }}</span>
                </span>
                </div>
                <div v-if="message.from_user_id == userid"
                     class="discussion-message-status-detail">
                    <div v-if="message.failed"><i class="fa fa-exclamation-triangle color-r"></i></div>
                    <div v-show="!message.failed && !message.discussion_time">
                        <img v-if="!message.uploadProgress" class="discussion-loading" :src="img"/>
                        <div v-if="message.uploadProgress" class="discussion-progress-bar">
                            <progressbar class="progress-striped active" value="message.uploadProgress" type="info">{{ message.uploadProgress }}%</progressbar>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script>
    import UserDetail from "@/components/UserDetail";
    export default {
        name: "Messages",
        components: {UserDetail},
        props: {
            message: {
                type: Object
            },
            index: {
                type: Number
            },
            searchtext: {
                type: String
            },
            chatroom: {
                type: Object
            },
            userid: {

            },
            messages: {
                type: Array
            }
        },
        data(){
            return {
                img:require('../assets/img/loading.gif')
            }
        },
        methods: {
            showMessageBottom: function(allmessage, index, message){
                if(index === allmessage.length-1 || message.from_user_id != allmessage[index + 1].from_user_id){
                    return true;
                }
                return !this.withinOneMinute(message.timestamp, allmessage[index+1].timestamp);
            },
            withinOneMinute: function(start, end){
                let ONE_MINUTE = 60000;
                let endDate = end ? Date.parse(end) : new Date();
                return (endDate - Date.parse(start) < ONE_MINUTE);
            },
            highlight: function(message, searchText){
                if (!searchText) {
                    return message;
                }
                let words = searchText.trim().split(' ');
                let nonEmptyWords = [];
                for (let i = 0; i < words.length; i++) {
                    if (words[i] != "") {
                        nonEmptyWords.push(words[i]);
                    }
                }
                return message.replace(new RegExp('('+ nonEmptyWords.join('|') +'(?![^<>]*>))', 'gi'), '<span class="highlight_search_string" style="background-color: #FFD441">$1</span>');
            },
            download: function(File){
                let params = {
                    file: File.id
                }
                window.location = "/chat/downloadfile/?" + $.param(params);
            }
        }
    }
</script>

<style scoped>
    .discussion-prettytime {
        color: #606D8C;
        font-size: 11px;
        font-weight: bold;
    }
    .divider {
        width: 100%;
        text-align: center;
    }
    .bottom-message {
        margin-bottom: 20px;
    }
    .message {
        position: relative;
        padding: 0 5px;
        color: black;
        word-wrap: break-word;
    }

    .img-rounded {
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
    }
    .message-content {
        position: relative;
        background-color: #F1F1F1;
        max-width: 77%;
        padding: 10px 20px;
        display: inline-block;
        margin: 0 20px 3px 50px;
        border-radius: 10px;
    }
    .message-content .file-image {
        display: inline-block;
        vertical-align: middle;
    }
    .discussion-message-status-detail {
        font-size: 10px;
        margin-bottom: 5px;
    }
    .discussion-loading {
        width: 10px;
    }
    .owner-message .message-content {
        background-color: #2ECC71;
    }
    .highlight_search_string {
        background-color: #FFD441;
    }
    .discussion-date-div{
        width: 100%;
        text-align: center;
        line-height: 0.1em;
        margin: 20px 0;
    }
    .discussion-date-line {
        padding: 3px 10px;
        background: #FFF;
        color: #34495E;
        font-size: 12px;
        opacity: 0.7;
    }

</style>
