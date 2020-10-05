<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-user-solid"></i>Profile
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-main class="container">
                <el-card>
                    <div class="navbar-inner">
                        <h2><span style="font-weight: bold">User Information</span></h2>
                    </div>
                    <el-form>
                        <el-row>
                            <el-form-item label="Full Name">
                                <el-input v-model="profileForm.fullname"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="Title">
                                <el-input v-model="profileForm.title"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="Email">
                                <el-input v-model="profileForm.email"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="Address">
                                <el-input v-model="profileForm.address"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="City">
                                <el-input v-model="profileForm.city"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="State">
                                <el-input v-model="profileForm.state"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="Zip Code">
                                <el-input v-model="profileForm.zip_code"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-col :span="24" align="right">
                                <el-button type="success">Submit</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div class="navbar-inner margin-top10">
                        <h2><span style="font-weight: bold">Reset Password</span></h2>
                    </div>
                    <el-form>
                        <el-row>
                            <el-form-item label="Password">
                                <el-input type="password" v-model="passwordForm.password"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="Confirm Password">
                                <el-input type="password" v-model="passwordForm.confirm"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-col span="24" align="right">
                                <el-button type="success">Submit</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-main>
        </div>
    </div>
</template>

<script>
    import {SESSION_KEY_LOGIN_USER} from "@/utils/Constants";
    import {SessionStorage} from "@/utils/SessionStorage";

    export default {
        name: "PersonalProfile",
        created(){
            let user = SessionStorage.getJson(SESSION_KEY_LOGIN_USER);
            this.profileForm.fullname = user.username;
            this.profileForm.email = user.email
        },
        data(){
            return {
                passwordForm: {
                    password: '',
                    confirm: ''
                },
                profileForm: {
                    fullname: '',
                    title: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    zip_code: ''
                }
            }
        }
    }
</script>

<style>
    .navbar-inner {
        padding-right: 15px;
        padding-left: 15px;
        border: none;
        border-bottom: 1px solid #d1d2d5;
        -webkit-border-radius: 4px 4px 0 0;
        -moz-border-radius: 4px 4px 0 0;
        border-radius: 4px 4px 0 0;
        -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 1);
        -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 1);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 1);
    }

</style>
