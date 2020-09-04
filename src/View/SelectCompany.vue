<template>
    <div>
        <div class="wrapper">
            <vHeader :show-chat="false"></vHeader>
            <div class="content-box" style="left: 0px">
                <div class="content">
                        <div class="title-block" style="margin-top: 50px;text-align: left">
                            <span>REGISTERED COMPANIES</span>
                            <router-link to="/add_supplier">
                                <el-button size="mini" style="float: right">Add Supplier</el-button>
                            </router-link>
                        </div>
                        <el-card>
                            <el-row v-for="(supplier,index) in suppliers"
                            :key="supplier.id" class="margin-top20">
                                <router-link :to="'/profile/'+supplier.id" style="color: white">
                                    <el-button
                                            type="success"
                                            effect="dark"
                                    style="font-weight: bold;width: 100%;text-align: left"
                                   >
                                        <template>
                                            {{index+1}}. {{ supplier.name}}</template>
                                    </el-button>
                                </router-link>

                            </el-row>
                        </el-card>
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
    import {Toast} from "@/utils/Toast";
    export default {
        name: "SelectCompany",
        components:{vHeader},
        data(){
          return {
              user: {},
              group: '',
              suppliers: []
          }
        },
        created(){
            this.user = SessionStorage.getJson(SESSION_KEY_LOGIN_USER);
            if(Tools.isEmpty(this.user)){
                this.$router.push('/');
            }
            this.suppliers = this.user.supplier
        },
        methods:{
            toSupplierEdit(id){
                alert(id);
            },
        }
    }
</script>

<style scoped>

</style>
