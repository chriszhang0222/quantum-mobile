<template>
    <div>
            <el-row :gutter="20">
                <el-col :span="12" :xs="{span:24}">
                    <el-card>
                        <el-row class="margin-top20">
                            <div class="section-content bg-purple-light">
                                <font-awesome-icon icon="users" size="lg"/> Total Supplier Count: <span>{{ quantum_total.total|formatNumber}}</span>
                            </div>
                        </el-row>
                        <el-row class="margin-top10">
                            <div class="section-content bg-purple-light">
                                <font-awesome-icon icon="certificate" size="lg"/> Number of Diverse Suppliers: <span>{{quantum_total.diverse|formatNumber}}</span>
                            </div>
                        </el-row>
                        <el-row class="margin-top10">
                            <div class="section-content bg-purple-light">
                                <font-awesome-icon icon="certificate" size="lg"/> Active Diverse Suppliers: <span>{{quantum_total.active|formatNumber}}</span>
                            </div>
                        </el-row>
                    </el-card>
                </el-col>

                <el-col :span="12" :xs="{span:24}">
                    <el-card>
                        <el-row>
                            <div id="home_historgam" v-loading="historgam_loading"></div>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
        <el-row :gutter="10" class="margin-top10">
            <el-col :span="8" :xs="{span:24}">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>Supplier Certificate Metrics</span>
                    </div>
                    <el-table
                            border
                            :data="tableData"
                            style="width: 100%"
                            height="100">
                        <el-table-column
                                prop="description"
                                label="Description">
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="Count">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="8" :xs="{span:24}">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>Diversity Counts Metrics</span>
                    </div>
                    <el-table
                            border
                            :data="diversityData"
                            style="width: 100%"
                            height="100">
                        <el-table-column
                                prop="desc"
                                label="">
                        </el-table-column>
                        <el-table-column
                                prop="active"
                                label="Active">
                        </el-table-column>
                        <el-table-column
                                prop="approved"
                                label="Approved">
                        </el-table-column>
                        <el-table-column
                                prop="rejected"
                                label="Rejected">
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="Count">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="8" :xs="{span: 24}">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>Supplier Count By Ethnicity</span>
                    </div>
                    <el-table
                            border
                            :data="ethnicityData"
                            style="width: 100%"
                            height="100">
                        <el-table-column
                                prop="desc"
                                label="Description">
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="Count">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SESSION_KEY_LOGIN_USER, SUPPLIER_TOTAL} from "@/utils/Constants";
    import {Tools} from "@/utils/Tools";
    import {drawColumn} from "@/quantumApi/chart/chartApi";
    import {homePageHistoram} from "@/quantumApi/chart/chartQuantumApi";
    import {quantumTotal, certificateMatrix } from "@/quantumApi/dashboard/dashboardApi";

    export default {
        name: "Dashboard",
        created(){
            this.auth = SessionStorage.get(AUTH_TOKEN);
            let supplier_total = SessionStorage.getJson(SUPPLIER_TOTAL);
            if(Tools.isNotEmpty(supplier_total)){
                this.quantum_total.total = supplier_total.total;
                this.quantum_total.diverse = supplier_total.diverse;
                this.quantum_total.active = supplier_total.active;
            }else{
                quantumTotal((res) => {
                    let resp = res.data;
                    if(resp.success){
                        let supplier = resp.supplier_data;
                        this.quantum_total.total = supplier.total;
                        this.quantum_total.active = supplier.active;
                        this.quantum_total.diverse = supplier.diverse;
                        SessionStorage.setJSON(SUPPLIER_TOTAL, supplier);
                    }
                }, this.auth)
            }
            homePageHistoram(this.auth);
        },
        mounted(){
            certificateMatrix((res) => {
                let resp = res.data;
                if(resp.success){
                    this.tableData = resp.data;
                }
            }, this.auth)
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
        data(){
            return{
                auth: '',
                user:{},
                home_historgam_data: [],
                historgam_loading: true,
                quantum_total: {
                    'total': 0,
                    'diverse': 0,
                    'active': 0
                },
                tableData: [{"description": "Suppliers registered in the past 30 days", "count": 80}],
                diversityData: [
                    {"desc": "8A",
                        "active": 10,
                        "approved": 20,
                        "rejected": 0,
                        "registered":30,
                        "count": 128
                    }
                ],
                ethnicityData: [
                    {
                        "desc": "African American",
                        "count": 1794
                    }
                ]
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
    span{
        font-weight: bold;
    }
</style>
