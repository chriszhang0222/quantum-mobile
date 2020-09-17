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
            <el-table border>

            </el-table>
        </el-card>
    </div>
</template>

<script>
    import {SessionStorage} from "@/utils/SessionStorage";
    import {REPORT_FORM, REPORT_TYPE_DICT} from "@/utils/Constants";
    import {Tools} from "@/utils/Tools";

    export default {
        name: "ReportDetail",
        data(){
            return{
                reportParam: {

                },
                report_type_title: ''
            }
        },
        created(){
            if(Tools.isEmpty(SessionStorage.getJson(REPORT_FORM))){
                this.$router.push('/report');
            }
            this.reportParam = SessionStorage.getJson(REPORT_FORM);
            this.report_type_title = REPORT_TYPE_DICT[this.reportParam.report_type];
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>
