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
            <el-row>
                <span class="demonstration"><strong>Total Supplier Count: {{ total_data }}</strong></span>
            </el-row>
            <el-row>
                <el-col :span="12" align="left">
                    <div class="block">
                        <el-pagination
                                v-if="!loading"
                                :current-page.sync="currentPage"
                                @current-change="handleCurrentPageChange"
                                small
                                background
                                :page-size="20"
                                :page-count="5"
                                layout="prev, pager, next"
                                :total="total_data">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
            <el-row class="margin-bottom10">
                <el-col :span="12">
                    <el-input v-model="search_text" placeholder="Search" @change="searchSupplier"></el-input>
                </el-col>
            </el-row>
            <template v-if="show_table" class="margin-top10">
                <el-table border :data="table_data" v-loading="loading"
                          :row-class-name="tableRowClassName">
                    <template v-if="type.line">
                        <el-table-column
                        label="Supplier"
                        sortable
                        fixed>
                            <template  slot-scope="scope">
                                <span style="color: #3a8ee6" @click="showDetail(scope.row)">{{ scope.row.vendorname}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="Vendor#" prop="vendor">
                        </el-table-column>
                        <template v-if="reportParam.report_type === 'supplier'">
                            <el-table-column label="Primary Naics Code" prop="naics"></el-table-column>
                            <el-table-column label="Primary Diversity Category" prop="naics_desc"></el-table-column>
                        </template>
                        <template v-for="month in this.additional_columns">
                            <el-table-column :label="month" :key="month" :prop="month"></el-table-column>
                        </template>
                        <el-table-column label="Total" prop="total" sortable fixed="right"></el-table-column>
                    </template>
                </el-table>
            </template>
        </el-card>
        <el-dialog :title="supplier_detail.vendorname" :visible.sync="show_supplier_detail" width="100%" :append-to-body="true">
            <SupplierDetailInReport
            :supplier_detail="supplier_detail"
            :certificates_detail="certificates_detail"></SupplierDetailInReport>
        </el-dialog>
    </div>
</template>

<script>
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, REPORT_FORM, REPORT_TYPE_DICT} from "@/utils/Constants";
    import {Tools} from "@/utils/Tools";
    import {reportSetup, getReportData} from "@/quantumApi/report/report";
    import SupplierDetailInReport from "@/components/SupplierDetailInReport";
    import {supplierDetail} from "@/quantumApi/supplier/supplier";

    export default {
        name: "ReportDetail",
        components: {SupplierDetailInReport},
        data(){
            return{
                show_supplier_detail: false,
                supplier_detail: {},
                certificates_detail: [],
                auth: '',
                reportParam: {

                },
                loading: false,
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
                currentPage: 1,
                total_data: 0,
                search_text: ''
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
            async showDetail(row){
                let params = {
                    'supplier_id': row.id
                }
                let resp = await supplierDetail(params, this.auth);
                if(resp.status === 200){
                    let data = resp.data;
                    this.supplier_detail = data.data.supplier;
                    this.certificates_detail = data.data.certificates;
                    this.show_supplier_detail = true;
                }
            },
            tableRowClassName({row, rowIndex}){
                if(rowIndex % 2 === 1){
                    return 'even-row'
                }
            },
            async searchSupplier(){
                this.reportParam['search'] = this.search_text;
                let auth = this.auth;
                this.loading = true;
                let supplier_data = await getReportData(this.reportParam, this.table_url, auth);
                if(supplier_data.status === 200){
                    let resp = supplier_data.data;
                    this.total_data = resp.recordsTotal;
                    this.table_data = resp.data;
                    this.loading = false;
                }
            },
            async handleCurrentPageChange(val){
                let auth = this.auth;
                this.loading = true;
                let start = (val-1) * 20;
                let length = 20;
                this.currentPage = val;
                this.reportParam['start'] = start;
                this.reportParam['length'] = length;
                let supplier_data = await getReportData(this.reportParam, this.table_url, auth);
                if(supplier_data.status === 200){
                    let resp = supplier_data.data;
                    this.total_data = resp.recordsTotal;
                    this.table_data = resp.data;
                    this.loading = false;
                }

            },
            async reportSetup(){
                let auth = this.auth;
                let data = await reportSetup(this.reportParam, this.auth);
                if(data.status === 200){
                    let res = data.data;
                    this.type.line = res.line_chart_type;
                    this.type.pie = res.pie_chart_type;
                    this.type.spend = res.spend_chart_type;
                    if(res.months){
                        this.additional_columns = res.months;
                    }
                    this.table_url = res.report_url.substring(1, res.report_url.length);
                    this.show_table = true;
                    this.loading = true;
                    this.reportParam['start'] = this.currentPage - 1;
                    this.reportParam['length'] = 20;
                    let supplier_data = await getReportData(this.reportParam, this.table_url, auth);
                    if(supplier_data.status === 200){
                        let resp = supplier_data.data;
                        this.total_data = resp.recordsTotal;
                        this.table_data = resp.data;
                        this.loading = false;
                    }

                }
            }
        }
    }
</script>

<style>
    .el-table .even-row {
        background: #f6f6f7;
    }

</style>
