<template>
    <div class="login-wrap">
        <el-row>
            <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:12,offset:6}">
        <el-form class="login-container margin-top100" :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-row>
                <el-col :span="2">
                    <div class="quntLogo-white">
                        <img :src="imgUrl.logo">
                    </div>
                </el-col>
                <el-col :span="22" :xs="{offset:4,span:18}"><h2 class="title">Quantum Login</h2></el-col>
            </el-row>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm.username" placeholder="username">
                    <template slot="prepend"><font-awesome-icon icon="user" size="xs"/></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm.password" placeholder="password">
                    <template slot="prepend"><font-awesome-icon icon="key" size="xs"/></template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" style="width:100%;" v-on:click="submit"
                           :loading="logging">
                    Login
                </el-button>
            </el-form-item>
            <el-row>
                <img :src="imgUrl.src" />
            </el-row>
        </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getAPIToken, loginAPI, test} from "@/quantumApi/login/login";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SESSION_KEY_LOGIN_USER} from "@/utils/Constants";
    import {homePageHistoram} from "@/quantumApi/chart/chartQuantumApi";
    import axios from 'axios';
    export default {
        name: "Login",
        created(){
        },
        mounted(){
        },
        data(){
            return {
                ruleForm: {
                    username: '',
                    password: '',
                },
                imgUrl: {
                    src: require('../assets/img/quantumLogo_small.png'),
                    logo: require('../assets/img/quantumLogo_whiteMark.png')
                },
                rules: {
                    username: [{required: true, message: 'Please input username', trigger: 'blur'}],
                    password: [{required: true, message: 'Please input password', trigger: 'blur'}],
                },
                logging: false,
            }
        },
        methods:{
            submit(){
                this.$refs.ruleForm.validate(
                    valid => {
                        if(valid){
                            this.logging = true;
                            let params = {
                                username: this.ruleForm.username,
                                password: this.ruleForm.password
                            }
                            loginAPI(params, this.loginCallBack);
                        }else{
                            this.$message.error('Username/Password is required');
                        }
                    }
                );

            },
            apiTokenCallback(res){
                console.log(res);
            },
            async loginCallBack(res){
                this.logging = false;
                let resp = res.data;
                if(resp.success){
                    SessionStorage.setJSON(SESSION_KEY_LOGIN_USER, resp.user);
                    SessionStorage.set(AUTH_TOKEN, resp.access);
                    this.$message.success('Login Successfully!!');
                    let user = resp.user;
                    if(user.group === 'company user' || user.group === 'company admin') {
                        this.$router.push('/dashboard');
                    }else if(user.group === 'supplier'){
                        this.$router.push('/select')
                    }else{
                        return ;
                    }
                }else{
                    let message = resp.message;
                    this.$message.error(message);
                }

            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        box-sizing: border-box;
        padding-top: 10%;
        width: 100%;
        height: 100%;
        background-position: center right;
        background-size: 100%;
    }
    .login-container {
        border-radius: 10px;
        margin: 0px auto;
        /*width: 270px;*/
        padding: 30px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        text-align: left;
        box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
    }
    .title {
        margin: 10px auto 30px auto;
        text-align: center;
        color: #505458;
        font-weight: bold;
    }
    .margin-top100{
        margin-top: 100px;
    }
    .quntLogo-white {
        border-radius: 5px;
        float: left;
        display: block;
        height: 50px;
        background: #324157;;
        -webkit-box-shadow: inset 0 0 5px #324157;
        -moz-box-shadow: inset 0 0 5px #324157;
        -o-box-shadow: inset 0 0 5px #324157;
        box-shadow: inset 0 0 5px #324157;
    }

</style>
