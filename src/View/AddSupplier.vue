<template>
    <div class="wrapper">
        <vHeader :show-chat="false"></vHeader>
        <div class="content-box" style="left: 0px">
            <div class="content">
                <supplier-submit-form
                :supplier_data="supplier">

                </supplier-submit-form>
            </div>
        </div>
    </div>
</template>

<script>
    import vHeader from '../components/Header';
    import SupplierSubmitForm from "@/components/SupplierSubmitForm";
    export default {
        name: "AddSupplier",
        components:{vHeader, SupplierSubmitForm},
        data(){
            return {
                supplier: {}
            }
        }
    }
</script>

<style scoped>

</style>
