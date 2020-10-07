<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-document"></i> Invoices
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-main>
            <el-card>
                <el-form>
                    <el-row>
                        <el-form-item label="Status">
                            <el-select v-model="form.status" style="width: 100%">
                                <el-option
                                        v-for="item in status"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="Purchase Order">
                            <el-select v-model="form.po" style="width: 100%"></el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col :span="24" align="right">
                            <el-button>Submit</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-card class="margin-top20">
                <el-row>
                    <el-tag style="width: 100%">Invoices</el-tag>
                </el-row>
                <el-row>

                </el-row>
            </el-card>
        </el-main>
    </div>
</template>

<script>
    export default {
        name: "Invoice",
        data(){
            return{
                status: [
                    'ALL',
                    'Pending',
                    'Approved',
                    'Rejected'
                ],
                form: {
                    status: '',
                    po: ''
                },
                invoice_list: []
            }
        }
    }
</script>

<style scoped>

</style>
