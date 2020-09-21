<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-bell"></i> Notifications
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card shadow="hover">
            <el-row>
                <span class="demonstration"><strong>Total Notification: {{ total_data }}</strong></span>
            </el-row>
            <el-row class="margin-top20">
                <span class="demonstration"><strong>Unread Notification: {{ unread_data }}</strong></span>
            </el-row>
            <el-row :gutter="20" class="margin-top20">
                <el-col :span="12" align="left">
                    <div class="block">
                        <el-pagination
                                v-if="!loading"
                                :current-page.sync="currentPage"
                                @current-change="handleCurrentPageChange"
                                small
                                background
                                :page-size="10"
                                :page-count="5"
                                layout="prev, pager, next"
                                :total="total_data">
                        </el-pagination>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="search_text" placeholder="Search" @change="searchNotification"></el-input>
                </el-col>
                <el-table border :data="table_data" v-loading="loading">
                    <el-table-column
                    label="Alert Time"
                    prop="time"
                    sortable
                    fixed>
                    </el-table-column>
                    <el-table-column
                    label="Alert Description"
                    prop="desc"
                    >
                    </el-table-column>
                    <el-table-column
                    label="From"
                    prop="from">
                    </el-table-column>
                    <el-table-column
                    label="Read"
                    fixed="right">
                        <template slot-scope="scope">
                           <div v-if="scope.row.read === true || scope.row.read === 'true'">
                               <el-checkbox :value="true" disabled></el-checkbox>
                           </div>
                            <div v-else>
                                <el-checkbox v-model="scope.row.read" @change="readNotification(scope.row)"></el-checkbox>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {getNotification, readNotification} from "@/quantumApi/chat/chat";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN, SESSION_KEY_LOGIN_USER} from "@/utils/Constants";

    export default {
        name: "Notification",
        created(){
          this.auth = SessionStorage.get(AUTH_TOKEN);
          this.user = SessionStorage.getJson(SESSION_KEY_LOGIN_USER);
        },
        mounted(){
            this.getNotifi();
        },
        data(){
            return {
                auth: '',
                user: '',
                total_data: 0,
                unread_data: 0,
                loading: false,
                currentPage: 1,
                search_text: '',
                table_data: []
            }
        },
        methods: {
            async searchNotification(){
                await this.getNotifi(this.search_text);
            },
            async handleCurrentPageChange(val){
                this.page = val;
                await this.getNotifi();
            },
            async readNotification(row){
                let params = {
                    'user_id': this.user.user_id,
                    'supplier':  this.user.supplier.length === 0 ? [] : this.user.supplier.map(s => s.id),
                    'alert_ids': [row.id]
                }
                let resp = await readNotification(params, auth);
                if(resp.status === 200){
                    if(resp.data.success){
                        this.unread_data -= 1;
                        this.$store.commit('updateAlert', -1);
                    }
                }

            },
            async getNotifi(search=''){
              let params = {
                  'user_id': this.user.user_id,
                  'supplier': this.user.supplier.length === 0 ? [] : this.user.supplier.map(s => s.id),
                  'start': this.page
              }
              if(search !== ''){
                  params['search'] = search
              }
              let res = await getNotification(params, this.auth);
              if(res.status === 200){
                  let data = res.data;
                  if(data.data){
                      this.table_data = data.data;
                      this.loading = false;
                      this.total_data = data.count;
                      console.log(this.table_data);
                  }
              }
            }
        }
    }
</script>

<style scoped>

</style>
