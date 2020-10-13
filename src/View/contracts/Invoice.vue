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
                    <el-tag style="width: 100%;font-size: 20px">Invoices</el-tag>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-pagination
                                v-if="!loading"
                                :current-page.sync="currentPage"
                                @current-change="handleCurrentPageChange"
                                small
                                background
                                :page-size="20"
                                :page-count="5"
                                layout="prev, pager, next"
                                :total="total">
                        </el-pagination>
                    </el-col>
                </el-row>
                <el-row>
                    <el-table border :data="invoice_list" v-loading="loading">
                        <el-table-column
                                label="Supplier"
                                sortable
                                prop="supplier_name"
                                fixed>
                            <template slot-scope="scope">
                                <span @click="showDetail(scope.row)">{{ scope.row.supplier_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="Purchase Order"
                            prop="purchase_order"
                            />
                        <el-table-column
                                label="Amount"
                                sortable
                                prop="amount"
                               />
                        <el-table-column
                                sortable
                                label="Balance"
                                prop="balance"
                        />
                        <el-table-column
                            sortable
                            label="Invoiced"
                            prop="invoiced">
                        </el-table-column>
                        <el-table-column label="Payment Date">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 'Approved'">{{scope.row.date}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="Action" fixed="right">
                            <template slot-scope="scope">
                                <div v-if="scope.row.status === 'Pending Approval'">
                                    <el-button type="success" size="mini">Approve</el-button>
                                    <el-button type="warning" size="mini">Reject</el-button>
                                </div>
                                <div v-else-if="scope.row.status === 'Approved'">
                                    <el-button type="success" size="mini" disabled>Approved</el-button>
                                </div>
                                <div v-else-if="scope.row.status === 'Rejected'">
                                    <el-button type="warning" size="mini" disabled>Rejected</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-row>
                <el-dialog title="Invoice Detail" :visible.sync="showinvoiceDetail"
                           :append-to-body="true"
                           width="100%">
                    <el-row>
                        <template v-if="invoice_detail.status === 'Approved'">
                            <el-alert
                                    style="width: 100%"
                                    type="success">Invoice has been approved</el-alert>
                        </template>
                        <template v-else-if="invoice_detail.status === 'Rejected'">
                            <el-alert
                                    style="width: 100%" type="error">Invoice has been rejected</el-alert>
                        </template>
                    </el-row>
                    <el-form>
                    <el-row>
                        <el-col :span="24">
                             <el-form-item label="Supplier Name">
                                <span>{{ this.invoice_detail.supplier_name}}</span>
                             </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="Purchase Order">
                            <span>{{ this.invoice_detail.purchase_order_info.purchase_order_number}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="Purchase Order Balance">
                                <span>${{ this.invoice_detail.purchase_order_info.balance}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="Invoice Status">
                                    <span>{{ this.invoice_detail.status }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="Rate">
                                    <span>{{ this.invoice_detail.rate}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="Quantity">
                                    <span>{{ this.invoice_detail.quantity}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="Contract Owner">
                                    <span>{{ this.invoice_detail.contract_owner}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="Bill To">
                                    <span>{{ this.invoice_detail.bill_to}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>
                </el-dialog>
            </el-card>
        </el-main>
    </div>
</template>

<script>
    import {invoiceList, invoiceDetail} from "@/quantumApi/contract/contract";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {AUTH_TOKEN} from "@/utils/Constants";

    export default {
        name: "Invoice",
        created(){
          this.auth = SessionStorage.get(AUTH_TOKEN);
        },
        mounted(){
            this.getInvoiceList();
        },
        data(){
            return{
                showinvoiceDetail: false,
                invoice_detail: {
                    purchase_order_info: {

                    }
                },
                auth: '',
                loading: true,
                status: [
                    'ALL',
                    'Pending',
                    'Approved',
                    'Rejected'
                ],
                form: {
                    status: null,
                    po: null
                },
                invoice_list: [],
                total: 0,
                currentPage: 1,
            }
        },
        methods: {
            async handleCurrentPageChange(val){
                this.currentPage = val;
                let params = {
                    status: this.form.status,
                    po: this.form.po,
                    start: (this.currentPage-1)*10,
                }
                let resp = await invoiceList(params, this.auth);
                if(resp.status === 200){
                    this.loading = false;
                    let data = resp.data;
                    this.invoice_list = data.data;
                    this.total = data.count;
                }
            },
            formatNumber(obj, attr){
                if(obj === undefined){
                    return 0;
                }
                obj = obj[attr]
                if (isNaN(obj) || obj === null || obj === undefined || obj === '') {
                    return 0;
                }
                return ("" + obj).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
            },
            showDetail(row){
              let id = row.id;
              let params = {id: id}
              invoiceDetail(params, this.auth)
                .then((res) => {
                    if(res.status === 200){
                        let data = res.data;
                        if(data.success){
                            this.invoice_detail = data.data;
                            this.showinvoiceDetail = true;
                        }
                    }
                })
            },
            async getInvoiceList(){
                let params = {
                    status: this.form.status,
                    po: this.form.po,
                    start: (this.currentPage-1)*10,
                }
                let resp = await invoiceList(params, this.auth);
                if(resp.status === 200){
                    this.loading = false;
                    let data = resp.data;
                    this.invoice_list = data.data;
                    this.total = data.count;
                }
            }
        }
    }
</script>

<style scoped>

</style>
