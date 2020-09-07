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
                            <el-input type="text" v-model="supplier.name" placeholder="Company Name">
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
                            <el-checkbox v-model="show_parent"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Parent Company Name" :required="show_parent">
                            <el-input v-model="supplier.parentcompanyname" :disabled="!show_parent"
                            placeholder="Parent Compant Name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Parent Fed Tax ID" :required="show_parent">
                            <el-input v-model="supplier.parentcompanyfedid" :disabled="!show_parent"
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
                    <el-form-item label="Primary NAICS Code">
                        <el-select style="width: 100%"></el-select>
                    </el-form-item>
                    <el-form-item label="Secondary NAICS Code">
                        <el-select style="width: 100%"></el-select>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
    </div>

</template>

<script>
    import {Tools} from "@/utils/Tools";
    import {state_list} from "@/utils/Constants";

    export default {
        name: "SupplierSubmitForm",
        props: {
            supplier_data: {
                required: false,
                type: Object
            }
        },
        created(){
          if(!Tools.isNotEmpty(this.supplier_data)){
              this.supplier = this.supplier_data
          }else{
              this.supplier = {}
          }
        },
        data(){
            return {
                supplier: {

                },
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
                show_parent: false
            }
        },
        methods: {

        }
    }
</script>

<style>
    .input-card{
        padding: 5px;
        background-color: white;
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

</style>
