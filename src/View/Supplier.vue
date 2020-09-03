<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-user-solid"></i>Supplier Detail
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <div>
                <el-row>
                    <div class="page-header" v-if="supplier !== null">
                        <h1 style="font-weight:bold">{{ supplier.name }}
                            <el-button type="success" icon="el-icon-refresh-right" circle
                                       v-on:click="backToSearch"
                            >
                            </el-button>
                        </h1>
                    </div>
                </el-row>
                <el-row>
                    <el-card class="align-left">
                        <el-tabs type="card">
                            <el-tab-pane label="Company Info">
                                <div class="well well-box well-nice well-small no-bg">
                                     <div class="section-content item margin-bottom10">
                                         <el-row>
                                                <div class="border-div no-margin-left margin-right10">
                                                    <div class="border-div-title f14">
                                                        <h5>{{ supplier.name }}</h5>
                                                    </div>
                                                    <el-row class="border-div-main" align="left">
                                                        <el-row class="margin-bottom10">
                                                            <el-col :span="24">
                                                                <strong>Address:</strong>
                                                                {{ supplier.address }} {{supplier.city}} {{supplier.state}}, {{supplier.zip}},{{supplier.country}}
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="margin-bottom10" :gutter="10">
                                                            <el-col :span="12">
                                                                <strong>DBA:</strong>
                                                                {{ supplier.dba }}
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <strong>Ethnicity:</strong>
                                                                {{ supplier.ethnicity }}
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="margin-bottom10">
                                                            <strong>Website:</strong>
                                                            {{supplier.website}}
                                                        </el-row>
                                                        <el-row class="margin-bottom10">
                                                            <el-col :span="12">
                                                                <strong>Contact</strong>
                                                                {{ supplier.contactname }}
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <strong>Title</strong>
                                                                {{supplier.contacttitle}}
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="margin-bottom10">
                                                            <el-col :span="24">
                                                                <strong>Email:</strong>
                                                                {{supplier.contactemail}}
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="margin-bottom10">
                                                            <strong>Phone:</strong>
                                                            {{ supplier.contactphone }}
                                                        </el-row>
                                                        <el-row class="margin-bottom10">
                                                            <el-col :span="24">
                                                                <strong>Cell:</strong>
                                                                {{supplier.contactcell }}
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="margin-bottom10">
                                                            <strong>Fax:</strong>
                                                            {{ supplier.contactfax }}
                                                        </el-row>
                                                    </el-row>
                                                </div>
                                            </el-row>
                                        </div>
                                     <div class="section-content item margin-bottom10">
                                        <el-row>
                                            <div class="border-div no-margin-left margin-right10">
                                                <div class="border-div-title f14">
                                                    <h5>Basic Information</h5>
                                                </div>
                                                <el-row class="border-div-main" align="left">
                                                    <el-row class="margin-bottom10" >
                                                        <el-col :span="12">
                                                            <strong>Federal Tax ID:</strong>
                                                            {{ supplier.federaltaxid}}
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <strong>DUNS Number:</strong>
                                                            {{ supplier.duns }}
                                                        </el-col>
                                                    </el-row>
                                                    <el-row class="margin-bottom10" >
                                                        <el-col :span="12">
                                                            <strong>Company Type:</strong>
                                                            {{ supplier.business_category}}
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <strong>Number of Employees:</strong>
                                                            {{ supplier.employeecount }}
                                                        </el-col>
                                                    </el-row>
                                                    <el-row class="margin-bottom10">
                                                        <el-col :span="24">
                                                        <strong>Keywords:</strong>
                                                        {{supplier.keywords}}
                                                        </el-col>
                                                    </el-row>
                                                    <el-row class="margin-bottom10">
                                                        <strong>Signed Statement of Non-Disclosure or Vendor Services Agreement: </strong>
                                                        {{supplier.has_signed_nda}}
                                                    </el-row>
                                                    <el-row class="margin-bottom10">
                                                        <strong>Does your company track Tier II spend?</strong>
                                                        {{supplier.track_tier2_spend}}
                                                    </el-row>
                                                    <el-row>
                                                        <strong>Descrpition:</strong>
                                                        {{supplier.description}}
                                                    </el-row>
                                                </el-row>
                                            </div>
                                        </el-row>
                                    </div>
                                     <div class="section-content item margin-bottom10">
                                        <el-row>
                                            <div class="border-div no-margin-left margin-right10">
                                                <div class="border-div-title f14">
                                                    <h5>Commodity Codes</h5>
                                                </div>
                                                <el-row class="border-div-main" align="left">
                                                    <el-row class="margin-bottom10">
                                                        <strong>Commodity:</strong>
                                                        {{ supplier.commodity}}
                                                    </el-row>
                                                    <el-row class="margin-bottom10">
                                                        <strong>Description:</strong>
                                                        {{ supplier.commodity_desc}}
                                                    </el-row>
                                                    <el-row class="margin-bottom10">
                                                        <strong>Secondary Commodity:</strong>
                                                        {{ supplier.secondcommodity}}
                                                    </el-row>
                                                    <el-row class="margin-bottom10">
                                                        <strong>Description:</strong>
                                                        {{ supplier.secondcommoditydesc}}
                                                    </el-row>
                                                </el-row>
                                            </div>
                                        </el-row>
                                    </div>
                                     <div class="section-content item margin-bottom10">
                                        <el-row>
                                            <div class="border-div no-margin-left margin-right10">
                                                <div class="border-div-title f14">
                                                    <h5>Secondary Contact</h5>
                                                </div>
                                                <el-row class="border-div-main" align="left">
                                                    <el-row class="margin-bottom10">
                                                      <el-col :span="12">
                                                          <strong>Name:</strong>
                                                          {{ supplier.contactname2}}
                                                      </el-col>
                                                        <el-col :span="12">
                                                            <strong>Title:</strong>
                                                            {{supplier.contacttitle2}}
                                                        </el-col>
                                                    </el-row>
                                                    <el-row class="margin-bottom10">
                                                        <strong>Phone:</strong>
                                                        {{ supplier.contactphone2}}
                                                    </el-row>
                                                    <el-row class="margin-bottom10">
                                                        <strong>Email:</strong>
                                                        {{ supplier.contactemail2}}
                                                    </el-row>
                                                </el-row>
                                            </div>
                                        </el-row>
                                    </div>
                                     <div class="section-content item margin-bottom10">
                                        <el-row>
                                            <div class="border-div no-margin-left margin-right10">
                                                <div class="border-div-title f14">
                                                    <h5>Recend Year Sales</h5>
                                                </div>
                                                <el-row class="border-div-main" align="left">
                                                    <el-row class="margin-bottom10">
                                                        <strong>Year1:</strong>
                                                        ${{supplier.year1sales|formatNumber}}
                                                    </el-row>
                                                    <el-row class="margin-bottom10">
                                                        <strong>Year2:</strong>
                                                        ${{supplier.year2sales|formatNumber}}
                                                    </el-row>
                                                    <el-row class="margin-bottom10">
                                                        <strong>Year3:</strong>
                                                        ${{supplier.year3sales|formatNumber}}
                                                    </el-row>
                                                </el-row>
                                            </div>
                                        </el-row>
                                    </div>
                                 </div>
                            </el-tab-pane>
                            <el-tab-pane label="Diversity Certificates">
                                <div class="section-content item margin-bottom10">
                                    <el-row>
                                        <div class="border-div no-margin-left margin-right10">
                                            <div class="border-div-title f14">
                                                <h5>Diversity Certificates</h5>
                                            </div>
                                            <el-row class="border-div-main" align="left">
                                                <template v-for="(certificate, index) in certificates">
                                                    <div class="alert alert-block alert-success">
                                                        <el-row>
                                                            <font-awesome-icon icon="certificate"/>
                                                            <strong>{{ certificate.agency }}</strong>
                                                        </el-row>
                                                        <el-row class="margin-top10">
                                                            <el-col :span="12">
                                                                <strong>Status:</strong>
                                                                {{ certificate.status}}
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <strong>Type:</strong>
                                                                {{ certificate.divcat}}
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="margin-top10">
                                                            <el-col :span="12">
                                                                <strong>Expiration:</strong>
                                                                {{ certificate.exp_date}}
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <strong>Primary:</strong>
                                                                {{certificate.primary|truetransfer }}
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                </template>
                                            </el-row>
                                        </div>
                                    </el-row>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SEARCH_FORM_PRAMS, SUPPLIER_ID} from "@/utils/Constants";
    import {Tools} from "@/utils/Tools";
    import {supplierDetail} from "@/quantumApi/supplier/supplier";

    export default {
        name: "Supplier",
        created(){
            this.id = SessionStorage.get(SUPPLIER_ID);
            this.auth = SessionStorage.get(AUTH_TOKEN);
            if(Tools.isEmpty(this.id)){
                this.$router.push('/search');
            }

        },
        mounted(){
            this.loadSupplier();
        },
        data(){
            return{
                auth: '',
                id: null,
                supplier:{},
                certificates: []
            }
        },
        methods:{
            backToSearch(){

            },
            async loadSupplier(){
                let resp = await supplierDetail({
                    'supplier_id': this.id,
                }, this.auth);
                if(resp.status === 200){
                    let data = resp.data;
                    this.supplier = data.data.supplier
                    this.certificates = data.data.certificates;
                    console.log(this.certificates)
                }
            }
        }
    }
</script>

<style scoped>

    .well{
        min-height: 20px;
        padding: 19px;
        margin-bottom: 20px;
        background-color: #f5f5f5;
        border: 1px solid #e3e3e3;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
    }
    .well-nice {
        border-color: #fff;
        box-shadow: 0 1px 2px rgba(0,0,0,.4), inset 0 0 25px -6px rgba(0,0,0,.06);
    }
    .well-box {
        padding: 0;
    }
    .no-bg {
        background: none!important;
    }
    .border-div {
        margin: 20px;
        border: 1px solid grey!important;
        z-index: 0;
        position: relative;
    }
    .f14 {
        font-size: 18px;
        line-height: 2;
    }
    .border-div-title {
        position: absolute;
        left: 20px;
        top: -20px;
        display: inline-block;
        background-color: #fff;
        z-index: 1;
    }
    .border-div-main {
        font-size: 14px;
        line-height: 1.3;
        display: block;
        margin-left: 20px;
        margin-top: 20px;
        margin-right: 20px;
    }
    .align-left{
        text-align: left;
    }


    .alert{
        padding: 8px 35px 8px 14px;
        margin-bottom: 20px;
        text-shadow: 0 1px 0 hsla(0,0%,100%,.5);
        background-color: #fcf8e3;
        border: 1px solid #fbeed5;
        border-radius: 4px;
        font-size: 14px;
    }

    .alert-success {
        color: #468847;
        background-color: #dff0d8;
        border-color: #d6e9c6;
    }

</style>
