<template>
    <div>
        <div class="title-block" style="text-align: center">
            <span>Company Information</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="14">
                        <el-form-item label="Company Name" required>
                            <el-input type="text" v-model="supplier.name" placeholder="Company Name">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="DBA">
                            <el-input type="text" v-model="supplier.dba" placeholder="DBA"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {Tools} from "@/utils/Tools";

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

                }
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
