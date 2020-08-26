<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="12" :xs="{span:24}">
                <el-row>
                    <div id="home_historgam" v-loading="historgam_loading"></div>
                </el-row>
            </el-col>
            <el-col :span="12" :xs="{span:24}"><div class="grid-content bg-purple-light">hello</div></el-col>
        </el-row>
    </div>
</template>

<script>
    import {testAPI} from "@/quantumApi/login/login";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SESSION_KEY_LOGIN_USER} from "@/utils/Constants";
    import {Tools} from "@/utils/Tools";
    import {drawColumn} from "@/quantumApi/chart/chartApi";

    export default {
        name: "Dashboard",
        created(){
            this.auth = SessionStorage.get(AUTH_TOKEN);
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

</style>
