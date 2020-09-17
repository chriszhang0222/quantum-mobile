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
                         ref="reportForm"
                :rules="rules">
                    <el-row class="margin-top10">
                            <div class="subtitle">
                                <span>Report Type</span>
                            </div>
                            <el-form-item prop="report_type">
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
                    <el-row class="margin-top10" v-if="showDivision">
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
                            <el-form-item prop="startDate">
                                <el-date-picker style="width: 100%"
                                        v-model="reportForm.startDate"
                                        type="date"
                                        placeholder="Start Date">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="{span:24}" :lg="{span:12}">
                            <div class="subtitle">
                                <span>End Date</span>
                            </div>
                            <el-form-item prop="endDate">
                                <el-date-picker
                                        style="width: 100%"
                                        v-model="reportForm.endDate"
                                        type="date"
                                        placeholder="End Date">
                                </el-date-picker>
                            </el-form-item>
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
    import {reportType, reportInputs, reportCategory, REPORT_FORM} from "@/utils/Constants";
    import {Toast} from "@/utils/Toast";
    import {SessionStorage} from "@/utils/SessionStorage";

    export default {
        name: "Report",
        mounted(){
            this.report_type = reportType;
        },
        computed:{
            showDivision(){
                return this.reportInputs.division.has(this.reportForm.report_type);
            }
        },
        data(){
            return{
                reportCategory: reportCategory,
                reportInputs: reportInputs,
                reportForm: {
                    report_type: 'supplier',
                    division: '',
                    startDate: new Date(2020, 0, 1),
                    endDate: new Date()
                },
                rules:{
                    report_type: [{required: true, message: 'Please Select Report Type', trigger: 'blur'}],
                    startDate: [{required: true, message: 'Please Input StartDate', trigger: 'blur'}],
                    endDate: [{required: true, message: 'Please Input EndDate', trigger: 'blur'}]
                },
                report_type: [],
                divisions: [],
                loading: false

            }
        },
        methods:{
            submit(){
                if(!this.validateForm()){
                    return;
                }
                SessionStorage.setJSON(REPORT_FORM, this.reportForm);
                this.$router.push('/report_detail');
            },
            validateForm(){
                let validate = true;
                this.$refs.reportForm.validate(valid => {
                    if(!valid){
                        validate = false;
                        this.$message.error('Please Check Error')
                    }
                });
                return validate;
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
