<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-data"></i> Report Page
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    <el-main class="container">
        <div class="">
            <el-card shadow="hover">
                <el-form
                         :model="reportForm"
                         ref="reportForm">
                    <el-row class="margin-top10">
                            <div class="subtitle">
                                <span>Report Type</span>
                            </div>
                            <el-form-item>
                                <el-select v-model="reportForm.report_type" placeholder="Report Type"
                                           @change="reportTypeChange"
                                style="width: 100%">
                                    <el-option
                                            v-for="item in report_type"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                    </el-row>
                    <el-row class="margin-top10">
                        <div class="subtitle">
                            <span>Division</span>
                        </div>
                        <el-form-item>
                            <el-select v-model="reportForm.division" placeholder="Division"
                                       style="width: 100%">
                                <el-option
                                        v-for="item in divisions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row class="margin-top10" :gutter="40">
                        <el-col :xs="{span:24}" :lg="{span:12}">
                            <div class="subtitle">
                                <span>Start Date</span>
                            </div>
                            <el-date-picker style="width: 100%"
                                    v-model="reportForm.startDate"
                                    type="date"
                                    placeholder="Start Date">
                            </el-date-picker>
                        </el-col>
                        <el-col :xs="{span:24}" :lg="{span:12}">
                            <div class="subtitle">
                                <span>End Date</span>
                            </div>
                            <el-date-picker
                                    style="width: 100%"
                                    v-model="reportForm.endDate"
                                    type="date"
                                    placeholder="End Date">
                            </el-date-picker>
                        </el-col>

                    </el-row>
                    <el-row class="margin-top10">
                        <el-button type="success" style="width:100%;" v-on:click="submit"
                                   :loading="loading">
                            <font-awesome-icon icon="grip-horizontal" style="margin-left: 10px"/>Submit
                        </el-button>
                    </el-row>
                </el-form>
            </el-card>
        </div>
    </el-main>
    </div>
</template>

<script>
    import {reportType} from "@/utils/Constants";

    export default {
        name: "Report",
        mounted(){
            this.report_type = reportType;
        },
        data(){
            return{
                reportForm: {
                    report_type: '',
                    division: '',
                    startDate: '',
                    endDate: ''
                },
                rules: [],
                report_type: [],
                divisions: [],
                loading: false

            }
        },
        methods:{
            submit(){

            },
            reportTypeChange(val){
            }
        }
    }
</script>

<style scoped lang="scss">
    .margin-top100{
        margin-top: 60px;
    }
    span{
        font-weight: bold;
    }
    .el-form-item__label{
        font-weight: bold;
    }
    .subtitle{
        margin-bottom: 10px;
        font-weight: bold;
    }

</style>
