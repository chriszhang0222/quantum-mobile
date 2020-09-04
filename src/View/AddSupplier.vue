<template>
    <div class="wrapper">
        <vHeader :show-chat="false"></vHeader>
        <div class="content-box" style="left: 0px">
            <div class="content">
                <span>Add Supplier</span>
            </div>
        </div>
    </div>
</template>

<script>
    import vHeader from '../components/Header';
    export default {
        name: "AddSupplier",
        components:{vHeader},
    }
</script>

<style scoped>

</style>
