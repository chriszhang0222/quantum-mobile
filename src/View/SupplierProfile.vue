<template>
    <div>
        <supplier-submit-form
                :supplier_data="supplier"
        >

        </supplier-submit-form>
    </div>
</template>

<script>
    import SupplierSubmitForm from "@/components/SupplierSubmitForm";
    export default {
        name: "SupplierProfile",
        components: {SupplierSubmitForm},
        data(){
            return {
                supplier: {}
            }
        }
    }
</script>

<style scoped>

</style>
