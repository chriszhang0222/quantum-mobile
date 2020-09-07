<template>
    <div>
        <div class="title-block" style="text-align: center;margin-top: 10px">
            <span>Company Information</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Company Name" required>
                            <el-input type="text" v-model="supplier.vendorname" placeholder="Company Name">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="DBA">
                            <el-input type="text" v-model="supplier.dba" placeholder="DBA"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Fed Tax ID">
                            <el-input type="text" v-model="supplier.federaltaxid" placeholder="Fed Tax ID">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="D-U-N-S Number">
                            <el-input type="text" v-model="supplier.duns" placeholder="D-U-N-S Number">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" >
                    <el-col :span="12">
                        <el-form-item label="OwnerShip">
                            <el-select v-model="supplier.ispublic">
                                <el-option v-for="(item,index) in public_choice" :key="index" :value="item" :label="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Company Type">
                            <el-select v-model="supplier.structurecode">
                                <el-option v-for="(item, index) in structureCode" :key="index"
                                           :value="item" :label="item">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Headquarter Address">
                            <el-input v-model="supplier.address" placehodler="Headerquarter Address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Suite/Unit">
                            <el-input v-model="supplier.address2" placeholder="Suite/Unit">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="City">
                            <el-input v-model="supplier.city" placeholder="City">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="State">
                            <el-select v-model="supplier.state" placeholder="State">
                                <el-option v-for="(item, index) in state_list"
                                           :key="index"
                                           :value="item[0]"
                                           :label="item[1]">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Zip Code">
                            <el-input v-model="supplier.zip" placeholder="Zip Code">

                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Branch Address">
                            <el-input v-model="supplier.branch_address" placehodler="Branch Address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Suite/Unit">
                            <el-input v-model="supplier.branch_address2" placeholder="Suite/Unit">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="City">
                            <el-input v-model="supplier.branch_city" placeholder="City">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="State">
                            <el-select v-model="supplier.branch_state" placeholder="State">
                                <el-option v-for="(item, index) in state_list"
                                           :key="index"
                                           :value="item[0]"
                                           :label="item[1]">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Zip Code">
                            <el-input v-model="supplier.branch_zip" placeholder="Zip Code">

                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Website">
                            <el-input v-model="supplier.website" placeholder="Website">

                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Year Company Established">
                            <el-input v-model="supplier.established" placeholder="YYYY"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Business Category">
                            <el-select v-model="supplier.business_category">
                                <el-option v-for="(item, index) in business_category"
                                           :key="index"
                                           :value="item[0]"
                                           :label="item[1]">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Parent Company Information</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Is there a parent company?">
                            <el-checkbox v-model="supplier.parentcompany"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Parent Company Name" :required="supplier.parentcompany">
                            <el-input v-model="supplier.parentcompanyname" :disabled="!supplier.parentcompany"
                            placeholder="Parent Compant Name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Parent Fed Tax ID" :required="supplier.parentcompany">
                            <el-input v-model="supplier.parentcompanyfedid" :disabled="!supplier.parentcompany"
                            placeholder="Parent Company Fed Tax ID"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span> Company Contact Information</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Name">
                            <el-input placeholder="Name" v-model="supplier.contactname"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Title">
                            <el-input placeholder="Title" v-model="supplier.contacttitle"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Email">
                            <el-input placeholder="Email" v-model="supplier.contactemail"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Phone">
                            <el-input placeholder="Title" v-model="supplier.contactphone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Cell">
                            <el-input placeholder="Cell" v-model="supplier.contactcell"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Fax">
                            <el-input placeholder="Fax" v-model="supplier.contactfax"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="margin-top20">
                    <el-col :span="12">
                        <el-form-item label="Secondary Contact Name">
                            <el-input placeholder="Secondary Contact Name" v-model="supplier.contactname2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Title">
                            <el-input placeholder="Title" v-model="supplier.contacttitle2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Email">
                            <el-input placeholder="Email" v-model="supplier.contactemail2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Phone">
                            <el-input placeholder="Title" v-model="supplier.contactphone2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Cell">
                            <el-input placeholder="Cell" v-model="supplier.contactcell2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Fax">
                            <el-input placeholder="Fax" v-model="supplier.contactfax2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>NAICS Code</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="Primary NAICS Code">
                        <el-select
                                   filterable
                                   remote
                                   :remote-method="getNaics"
                                   @change="primaryNaicsChange"
                                   v-model="primarynaics"
                        >
                            <el-option
                                    :style="{left: windowWidth <= 500 ? 500 + 'px' : 0 + 'px'}"
                                    v-for="(item,index) in naics_list"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>

                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="Secondary NAICS Code">
                        <el-select
                                  v-model="secondarynaics"
                                   filterable
                                   remote
                                   :remote-method="getNaics"
                                   @change="secondNaicsChange">
                            <el-option
                                    v-for="(item,index) in naics_list"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Commodity Code</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row>
                    <el-form-item label="Commodity">
                        <el-select
                                   filterable
                                   remote
                                   :remote-method="getCommodity"
                                   @change="commodityChange"
                                   v-model="commodity"
                        >
                            <el-option
                                    v-for="item in commodity_list"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Company Details</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="Primary Location Name">
                            <el-input v-model="supplier.primarylocation" placeholder="Primary Location Name"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="U.S. Service Areas">
                            <el-select multiple v-model="supplier.geographicservicearea">
                                <el-option v-for="(item, index) in state_list"
                                           :key="index"
                                           :value="item[0]"
                                           :label="item[1]">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="International Service Areas">
                            <el-select multiple v-model="supplier.otherlocation">
                                <el-option v-for="(item, index) in service_area"
                                :key="index"
                                :value="item"
                                :label="item">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="Number of Permanent Employees">
                        <el-select v-model="supplier.employeecount">
                            <el-option v-for="(item, index) in employee_number"
                            :key="index"
                            :label="item[1]"
                            :value="item[0]">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Number of Women Employees">
                            <el-input placeholder="Number of Women Employees"
                                      v-model="supplier.womanemployeecount">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Number of Minority Employees">
                            <el-input placeholder="Number of Minority Employees"
                                      v-model="supplier.minorityemployeecount">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label=" Do you have a Signed Statement of Non-Disclosure or Vendor Services Agreement on file with Demo Company?">
                            <el-checkbox v-model="supplier.has_signed_nda">
                            </el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Top Five Business Customers">
                            <el-input v-model="supplier.topfive"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Keywords pertinent to your product and services">
                            <AutoCompleteInput
                                    style="width: 100%"
                            v-model="supplier.keywords"
                            placeholder="Add Keyword">
                            </AutoCompleteInput>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Products and Services">
                            <el-input placeholder="Describe your business capabilities"
                                      type="textarea"
                                      :autosize="{ minRows: 2, maxRows: 2}"
                                      v-model="supplier.servicedescription"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Does your company track Tier II spend?">
                            <el-checkbox v-model="supplier.track_tier2_spend" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Have you previously done business with Demo Company?">
                            <el-checkbox v-model="supplier.previousbiz" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>References</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="10">
                    <el-col :span="12">
                    <el-form-item>
                        <el-input placeholder="Name" v-model="supplier.referencename1"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-input placeholder="Phone" v-model="supplier.referencephone1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item>
                            <el-input placeholder="Email" v-model="supplier.referenceemail1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-input placeholder="Company" v-model="supplier.referencecompany1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Sustainability/Community Involvement</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <el-input v-model="supplier.socialprogram"
                                      type="textarea"
                                      :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="input-card">
        <el-row>
            <el-col :span="12" align="left">
                <el-button type="success" @click="submitForm">
                    Submit
                </el-button>
            </el-col>
        </el-row>
        </div>
    </div>

</template>

<script>
    import {Tools} from "@/utils/Tools";
    import {state_list} from "@/utils/Constants";
    import {Toast} from "@/utils/Toast";
    import {supplierNaics, supplierCommodity} from "@/quantumApi/supplier/supplier";
    import AutoCompleteInput from "@/components/AutoCompleteInput";

    export default {
        name: "SupplierSubmitForm",
        components: {AutoCompleteInput},
        props: {
            supplier_data: {
                required: false,
                type: Object
            }
        },
        computed:{
            supplier(){
                return this.supplier_data;
            }
        },
        data(){
            return {
                windowWidth: window.innerWidth,
                public_choice: ['Private', 'Public'],
                structureCode: [
                    'Corporation',
                   'S-Corporation',
                    'C-Corporation',
                    'Partnership',
                    'Sole Proprietorship',
                    'Limited Liability Company',
                    'Government',
                    'Non Profit',
                    'Joint Venture',
                    'Other'
                ],
                state_list: state_list,
                business_category: [
                    [1, 'Manufacturer'],
                    [2, 'Distributor/Re-seller'],
                    [3, 'Other']
                ],
                show_parent: false,
                naics_list: [],
                commodity_list: [],
                primarynaics: '',
                secondarynaics: '',
                commodity: '',
                service_area: [
                    'East Asia and The Pacific',
                    'South Asia',
                    'Africa',
                    'North America',
                    'South America',
                    'Europe',
                    'Middle East',
                    'Russia and Eurasia'
                ],
                employee_number: [
                    ["50", "0-50"],
                    ["100", "51-100"],
                    ["150", "101-150"],
                    ["200", "151-200"],
                    ["250", "201-250"],
                    ["500", "251-500"],
                    ["750", "501-750"],
                    ["1000", "751-1000"],
                    ["1500", "1001-1500"],
                    ["2000", "More than 1500"]
                ]
            }
        },
        methods: {
            getCommodity(query){
              let vm = this;
              if(query !== ''){
                  supplierCommodity({'term': query})
                  .then((res) => {
                      if(res.status === 200){
                          vm.commodity_list = res.data;
                      }
                  })
              }
            },
            commodityChange(val){
                val = val.split("-");
                this.supplier.commodity = val[0].trim();
                this.supplier.commoditydescription = val[1].trim();
            },
            getNaics(query){
                let vm = this;
                if(query !== ''){
                    supplierNaics({'term': query})
                    .then((res) => {
                        if(res.status === 200) {
                            vm.naics_list = res.data;
                        }
                    });
                }
            },
            primaryNaicsChange(val){
                val = val.split("-");
                this.supplier.primarynaicscode = val[0].trim();
                this.supplier.primarynaicsdescription = val[1].trim();
            },
            secondNaicsChange(val){
                val = val.split("-");
                this.supplier.secondarynaicscode = val[0].trim();
                this.supplier.secondarynaicsdescription = val[1].trim();
            },
            submitForm(){
            }
        }
    }
</script>

<style>
    .input-card{
        padding: 10px;
        background-color: white;
        border-bottom: 2px solid #373a43;;
    }
    .el-form-item {
        margin-bottom: 5px;
    }
    .el-form-item__label{
        line-height: 20px;
    }
    .el-select{
        width: 100%;
    }
    .tags-input {
        padding: 10px 10px;
        width: 100%;
    }
    .el-form-item__label{
        text-align: left !important;
    }

</style>
