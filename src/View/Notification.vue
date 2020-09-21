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
                                :page-size="20"
                                :page-count="5"
                                layout="prev, pager, next"
                                :total="total_data">
                        </el-pagination>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="search_text" placeholder="Search"></el-input>
                </el-col>
                <el-table border :data="total_data" v-loading="loading">
                    <el-table-column
                    label="Alert Time"
                    prop="time"
                    sortable
                    fixed>
                    </el-table-column>
                    <el-table-column
                    label="Alert Description"
                    prop="description"
                    >
                    </el-table-column>
                    <el-table-column
                    label="From"
                    prop="from">
                    </el-table-column>
                    <el-table-column
                    label="Read">
                        <template slot-scope="scope">
                            <template v-if="scope.row.read">
                                <el-radio v-model="scope.row.read" disabled>
                                </el-radio>
                            </template>
                            <template v-else>
                                <el-radio v-model="scope.row.read" @change="readNotification(scope.row)"></el-radio>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Notification",
        data(){
            return {
                total_data: 0,
                unread_data: 0,
                loading: false,
                currentPage: 1,
                search_text: '',
                table_data: []
            }
        },
        methods: {
            handleCurrentPageChange(){

            },
            readNotification(row){

            }
        }
    }
</script>

<style scoped>

</style>
