<template>
    <div>Select</div>
</template>

<script>
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SESSION_KEY_LOGIN_USER} from "@/utils/Constants";
    import {Tools} from "@/utils/Tools";
    export default {
        name: "SelectCompany",
        data(){
          return {
              user: {},
              group: '',
          }
        },
        created(){
            this.user = SessionStorage.getJson(SESSION_KEY_LOGIN_USER);
            if(Tools.isEmpty(this.user)){
                this.$router.push('/');
            }
        },
    }
</script>

<style scoped>

</style>
