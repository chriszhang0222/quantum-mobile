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

        },
        data(){
            return{
                auth: '',
                id: null,
                supplier:{}
            }
        }
    }
</script>

<style scoped>

</style>
