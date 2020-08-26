<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="12" :xs="{span:24}"><div class="grid-content bg-purple">hello</div></el-col>
            <el-col :span="12" :xs="{span:24}"><div class="grid-content bg-purple-light">hello</div></el-col>
        </el-row>
    </div>
</template>

<script>
    import {testAPI} from "@/quantumApi/login/login";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SESSION_KEY_LOGIN_USER} from "@/utils/Constants";
    export default {
        name: "Dashboard",
        created(){
            this.auth = SessionStorage.get(AUTH_TOKEN);
            console.log(this.auth);
        },
        mounted(){
            testAPI(this.auth);
        },
        data(){
            return{
                auth: ''
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
