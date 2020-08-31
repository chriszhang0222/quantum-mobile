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
        <div class="chatroom-container">
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
        },
        mounted(){

        },
        data(){
            return {
                auth:''
            }
        },
        methods:{
            backtochat(){
                SessionStorage.pop(CHATROOM);
              this.$router.back();
            },
        }
    }
</script>

<style scoped>

</style>
