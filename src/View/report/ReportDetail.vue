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
                <el-table border :data="table_data">
                    <template v-if="type.line">
                        <el-table-column
                        label="Supplier">
                        </el-table-column>
                        <el-table-column label="Vendor#">
                        </el-table-column>
                        <template v-if="reportParam.report_type === 'supplier'">
                            <el-table-column label="Primary Naics Code"></el-table-column>
                            <el-table-column label="Primary Diversity Category"></el-table-column>
                        </template>
                        <template v-for="month in this.additional_columns">
                            <el-table-column :label="month" :key="month"></el-table-column>
                        </template>
                    </template>
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
                additional_columns: [],
                type:{
                    line: false,
                    pie: false,
                    spend: false
                },
                table_url: null,
                table_data: [],
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
                if(data.status === 200){
                    let res = data.data;
                    this.type.line = res.line_chart_type;
                    this.type.pie = res.pie_chart_type;
                    this.type.spend = res.spend_chart_type;
                    if(res.months){
                        this.additional_columns = res.months;
                    }
                    this.table_url = res.report_url;
                    this.show_table = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>
