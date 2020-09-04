<template>
    <div>
        <div class="wrapper">
            <vHeader :group="group"></vHeader>
            <div class="content-box" style="left: 0px">
                <div class="content">
                        <p>Hello</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vHeader from '../components/Header';
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SESSION_KEY_LOGIN_USER} from "@/utils/Constants";
    import {Tools} from "@/utils/Tools";
    export default {
        name: "SelectCompany",
        components:{vHeader},
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
