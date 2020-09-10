<template>
    <div class="wrapper">
        <vHeader :show-chat="false"></vHeader>
        <div class="content-box" style="left: 0px">
            <div class="content">
                <supplier-submit-form
                :supplier_data="supplier"
                :auth="auth">

                </supplier-submit-form>
            </div>
        </div>
    </div>
</template>

<script>
    import vHeader from '../components/Header';
    import SupplierSubmitForm from "@/components/SupplierSubmitForm";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SEARCH_FORM_PRAMS, SUPPLIER_ID} from "@/utils/Constants";
    export default {
        name: "AddSupplier",
        components:{vHeader, SupplierSubmitForm},
        created(){
          this.auth = SessionStorage.get(AUTH_TOKEN);
        },
        data(){
            return {
                supplier: {},
                auth: ''
            }
        }
    }
</script>

<style scoped>

</style>
