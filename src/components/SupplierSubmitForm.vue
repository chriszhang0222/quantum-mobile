<template>
    <div>
        <div class="title-block" style="text-align: center">
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
                ]
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

</style>
