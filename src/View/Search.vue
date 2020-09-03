<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-search"></i>Supplier Search
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-main class="container">
            <el-card shadow="hover">
                <el-form>
                    <el-row :gutter="20">
                        <el-col :span="14">
                            <el-form-item label="Search">
                                <el-input type="text" v-model="searchForm.name" placeholder="">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="Min Revenue">
                                <el-input type="text" v-model="searchForm.revenue" placeholder="">
                                    <template slot="prepend">$</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="State">
                                <el-select v-model="searchForm.state" placeholder="State" multiple
                                style="width: 100%">
                                    <el-option v-for="state in state_list"
                                               :key="state[0]"
                                               :value="state[0]"
                                               :label="state[1]"

                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Rating">
                                <el-select v-model="searchForm.rating" style="width: 100%" placeholder="Rating">
                                    <el-option v-for="rate in rating_list"
                                    :key="rate[0]"
                                    :value="rate[0]"
                                    :label="rate[1]">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-form-item label="Diverse">
                            <el-switch
                                    v-model="searchForm.diverse"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Favorites">
                                <el-switch
                                        v-model="searchForm.favorites"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Assessment">
                                <el-switch
                                        v-model="searchForm.assessment"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Prime">
                                <el-checkbox v-model="searchForm.prime"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="Non Prime">
                                <el-checkbox v-model="searchForm.non_prime"></el-checkbox>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col  :span="24">
                            <el-button
                                    style="float: right"
                                    type="primary" icon="el-icon-search"
                            @click="onSearch"
                                    :loading="loading">Search</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
        </el-main>
        <div>
            <el-card shadow="hover" class="margin-top20">
                <span class="demonstration"><strong>Total Supplier Count: {{ total }}</strong></span>
                <el-row>
                    <el-col :span="12" align="left">
                        <div class="block">
                            <el-pagination
                                    @current-change="handleCurrentChange"
                                    small
                                    background
                                    :page-size="20"
                                    :page-count="5"
                                    layout="prev, pager, next"
                                    :total="this.total">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
                <el-table
                        v-loading="loading"
                        :data="supplier_list"
                        border>
                    <el-table-column
                            prop="internal_number"
                            label="Vendor#"
                    >
                    </el-table-column>
                    <el-table-column

                            label="Supplier Name"
                    >
                        <template slot-scope="scope">
                            <div v-html="scope.row.vendorname"></div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Certificates"
                                     align="center">
                        <template slot-scope="scope" v-if="scope.row.certificate_categories[0].length > 0">
                            <font-awesome-icon icon="certificate" size="lg" style="color: #3a8ee6"
                                               @click="handleClick(scope.$index, scope.row)"/>
                        </template>
                        <template slot-scope="scope" v-else>
                            <font-awesome-icon icon="certificate" size="lg"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="NAICS Code and Description"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.primarynaicscode }}
                            {{scope.row.primarynaicsdescription}}
                        </template>

                    </el-table-column>
                    <el-table-column
                            prop="servicedescription"
                            label="Service and Production">
                        <template slot-scope="scope">
                            {{ scope.row.servicedescription.substring(0,40)}}...
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="Status">

                    </el-table-column>
                    <el-table-column label="Supplier Detail">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="success"
                                    @click="handleDetail(scope.$index, scope.row)">Detail</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-card>

            <el-dialog title="Certificates" :visible.sync="dialogTableVisible"
                       width="100%">
                <el-row v-for="(data,index) in this.cert_data" :key="index" class="margin-bottom10">
                    <div class="alert-info">
                        <div style="padding: 10px">
                            <el-row class="margin-bottom10">
                                <el-col align="left"><font-awesome-icon icon="certificate" size="lg" style="margin-right: 10px"/>
                                    <strong>{{ data.certagency }}</strong>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12" align="left">
                                    <label><strong>Type:</strong> </label>
                                    {{ data.divcat}}
                                </el-col>
                                <el-col :span="12" align="left">
                                    <label><strong>Expiration</strong></label>
                                    {{ data.certexpdate}}
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-row>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {state_list} from "@/utils/Constants";
    import {supplierSearch} from "@/quantumApi/supplier/supplier";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SEARCH_FORM_PRAMS, SUPPLIER_ID} from "@/utils/Constants";
    import {Toast} from "@/utils/Toast";

    export default {
        name: "Search",
        created(){
          this.auth = SessionStorage.get(AUTH_TOKEN);
        },
        mounted(){
          this.getSupplierSearch(this.params);
        },
        data(){
            return {
                loading: true,
                auth: '',
                searchForm: {
                    name: '',
                    revenue: '',
                    state: [],
                    rating: '',
                    diverse: false,
                    favorites: false,
                    assessment: false,
                    prime:true,
                    non_prime:true
                },
                state_list: state_list,
                rating_list: [
                    [0, "ALL"],
                    [1, "1+"],
                    [2, "2+"],
                    [3, "3+"],
                    [4, "4+"],
                    [5, "5"]
                ],
                params: {},
                supplier_list: [],
                total: 0,
                dialogTableVisible: false,
                cert_data: []
            }
        },
        methods:{
            async getSupplierSearch(params){
                let resp = await supplierSearch(params, this.auth);
                console.log(resp.data);
                this.supplier_list = resp.data.suppliers;
                this.total = resp.data.total
                this.loading = false;
            },
            handleCurrentChange(val){
                this.loading = true;
                let start = (val-1) * 20;
                this.params['start'] = start;
                this.getSupplierSearch(this.params);
            },
            handleClick(index, row){
                this.cert_data = row.certificate_categories[0];
                this.dialogTableVisible = true;
            },
            onSearch(){
                console.log(this.searchForm);
                this.params = {
                    'q': this.searchForm.name,
                    'revenue': this.searchForm.revenue,
                    'state': this.searchForm.state,
                    'diverse': this.searchForm.diverse,
                    'favorites': this.searchForm.favorites,
                    'is_self_assessment_taken': this.searchForm.assessment,
                    'prime': this.searchForm.prime,
                    'non_prime': this.searchForm.non_prime
                }
                this.loading = true;
                this.getSupplierSearch(this.params);
            },
            handleDetail(index, row){
                SessionStorage.setJSON(SEARCH_FORM_PRAMS, this.params);
                let id = row.pk;
                SessionStorage.set(SUPPLIER_ID, id);
                this.$router.push('/supplier')
            },
        }
    }
</script>

<style lang="scss">

    .el-form-item__label{
       font-weight: bold;
    }
    .alert-info {
        color: #2b82ad;
        background-color: #d9edf7;
        border-color: #bce8f1;
    }
</style>
