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
                    <el-col :xs="{span: 20}">
                <tags-input
                            class="team-task-discussion private-chat-user-input"
                            placeholder="Search for users"
                            v-bind:existing-tags="existing_tags"
                            typeahead-style="dropdown"
                            :typeahead-hide-discard="true"
                            :typeahead-max-results=5
                            :limit="5"
                            :hide-input-on-limit="true"
                            v-bind:wrapper-class="'tags-input-wrapper-custom'"
                            :typeahead="true">
                </tags-input>
<!--                <img class="add-discussion-recipient-input"-->
<!--                     style="margin-right: 5px"-->
<!--                     src="/static/Images/Discussion/create.png"-->
<!--                   >-->
                    </el-col>
                    </el-row>
            </div>
            <div class="chat-room-panel overflow-y-auto">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Chat",
        components: {},
        data(){
            return{
                existing_tags: [ { key: 'web-development', value: 'Web Development' },
                    { key: 'php', value: 'PHP' },
                    { key: 'javascript', value: 'JavaScript' },]
            }
        },
        mounted(){

        },
        methods: {

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
        width: 100%;
    }
    .tags-input{
        padding: 10px 10px;
    }
</style>
