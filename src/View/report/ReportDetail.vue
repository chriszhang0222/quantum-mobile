<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-data"></i> Report Detail
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card shadow="hover">
            <div class="clearfix" >
                <span style="font-weight: bold; font-size: 18px">{{ report_type_title }}</span>
            </div>
            <template v-if="show_table">
                <el-table border>

                </el-table>
            </template>
        </el-card>
    </div>
</template>

<script>
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, REPORT_FORM, REPORT_TYPE_DICT} from "@/utils/Constants";
    import {Tools} from "@/utils/Tools";
    import {reportSetup} from "@/quantumApi/report/report";

    export default {
        name: "ReportDetail",
        data(){
            return{
                auth: '',
                reportParam: {

                },
                report_type_title: '',
                show_table: false,
            }
        },
        created(){
            if(Tools.isEmpty(SessionStorage.getJson(REPORT_FORM))){
                this.$router.push('/report');
            }
            this.auth = SessionStorage.get(AUTH_TOKEN);
            this.reportParam = SessionStorage.getJson(REPORT_FORM);
            this.report_type_title = REPORT_TYPE_DICT[this.reportParam.report_type];
            this.reportSetup();
        },
        methods:{
            async reportSetup(){
                let data = await reportSetup(this.reportParam, this.auth);
                console.log(data);
            }
        }
    }
</script>

<style scoped>

</style>
