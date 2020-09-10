<template>
    <div>
        <supplier-submit-form
                :supplier_data="supplier"
                :auth="this.auth"
        >

        </supplier-submit-form>
    </div>
</template>

<script>
    import SupplierSubmitForm from "@/components/SupplierSubmitForm";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SEARCH_FORM_PRAMS, SUPPLIER_ID} from "@/utils/Constants";
    import {supplierEdit} from "@/quantumApi/supplier/supplier";
    import {Toast} from "@/utils/Toast";

    export default {
        name: "SupplierProfile",
        components: {SupplierSubmitForm},
        computed:{
            supplier_id(){
                return this.$route.params.id
            }
        },
        created(){
            this.auth = SessionStorage.get(AUTH_TOKEN);
            supplierEdit({'supplier_id': this.supplier_id}, this.auth)
            .then((res) => {
                if(res.status === 200){
                    this.supplier = res.data;
                    this.supplier.geographicservicearea = this.supplier.geographicservicearea.split('|')
                    this.supplier.otherlocation = this.supplier.otherlocation.split('|')
                    let keywords = [];
                    this.supplier.keywords.split(',').forEach((item, index) => {
                        keywords.push({
                            key: '',
                            value: item
                        })
                    });
                    this.supplier.keywords = keywords;
                    this.$set(this.supplier, 'certtypes', this.supplier.certtypes.split(','))

                }
            })
        },
        data(){
            return {
                supplier: {},
                auth: '',
            }
        }
    }
</script>

<style scoped>

</style>
