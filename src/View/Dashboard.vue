<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="12" :xs="{span:24}">
                <el-row class="margin-top20">
                    <div class="section-content bg-purple-light">
                        <font-awesome-icon icon="users" size="lg"/> Total Supplier Count: <span>8888</span>
                    </div>
                </el-row>
                <el-row class="margin-top10">
                    <div class="section-content bg-purple-light">
                        <font-awesome-icon icon="certificate" size="lg"/> Number of Diverse Suppliers: <span>2890</span>
                    </div>
                </el-row>
                <el-row class="margin-top10">
                    <div class="section-content bg-purple-light">
                        <font-awesome-icon icon="certificate" size="lg"/> Active Diverse Suppliers: <span>2890</span>
                    </div>
                </el-row>
            </el-col>
            <el-col :span="12" :xs="{span:24}">
                <el-row>
                    <div id="home_historgam" v-loading="historgam_loading"></div>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {testAPI} from "@/quantumApi/login/login";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SESSION_KEY_LOGIN_USER} from "@/utils/Constants";
    import {Tools} from "@/utils/Tools";
    import {drawColumn} from "@/quantumApi/chart/chartApi";
    import {homePageHistoram} from "@/quantumApi/chart/chartQuantumApi";

    export default {
        name: "Dashboard",
        created(){
            this.auth = SessionStorage.get(AUTH_TOKEN);
            homePageHistoram(this.auth);
        },
        computed: {
            industryhistorgamData(){
                return this.$store.state.home_historgam;
            },
        },
        watch: {
            industryhistorgamData: function(val){
                this.home_historgam_data = val;
                drawColumn('home_historgam', this.home_historgam_data, 'Total Count of Supplier by Industry', {
                    xfieldName: 'description',
                    yfieldName: 'count'
                });
                this.historgam_loading = false;
            },
        },
        mounted(){
        },
        data(){
            return{
                auth: '',
                user:{},
                home_historgam_data: [],
                historgam_loading: true
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
.section-content{
    padding: 10px 10px;
    border-top: 1px solid #e5e9f2;
    font-weight: bold;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.30);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.30);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.40), inset 0 0 25px -6px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
}
</style>
