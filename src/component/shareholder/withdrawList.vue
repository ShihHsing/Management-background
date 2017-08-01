<template>
    <div id="withdrawList">
        <el-row>
            <el-form ref="searchWithdrawList" :model="searchWithdrawList" :rules="rules">
                <el-col :span="6">
                    <el-form-item prop="nameORiphoneNumer">
                        <el-input v-model="searchWithdrawList.nameORiphoneNumer" style="width: 90%;" placeholder="请输入股东姓名或手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" @click="onSearch">立即搜索</el-button>
                </el-col>
            </el-form>
        </el-row>
            
        <div class="withdrawList_body_wrap">
            <div class="withdrawList_body">
                <div class="table_body sx_basis_scroll sx_scroll_style" id="table">
                    <el-table
                        :data="dataList"
                        border
                        stripe
                        :height="tableHeight"
                        v-loading="loading"
                        element-loading-text="加载中...">
                        <el-table-column
                            prop="s_name"
                            label="股东姓名">
                        </el-table-column>
                        <el-table-column
                            prop="s_phone_number"
                            label="股东手机号">
                        </el-table-column>
                        <el-table-column
                            prop="w_residue_integral"
                            label="剩余积分">
                        </el-table-column>
                        <el-table-column
                            prop="w_integral"
                            label="提现积分">
                        </el-table-column>
                        <el-table-column
                            prop="w_account_bank"
                            label="收款账号">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="150">
                            <template scope="scope">
                                <template v-if="scope.row.w_status === '0'">
                                    <el-button type="primary" @click="editShareholderWithdrawals(scope.row.w_id)">立即转账</el-button>
                                </template>
                                <template v-else>
                                    <el-button type="primary" disabled>已转账</el-button>
                                </template>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="current_page"
                        :page-size="page_size"
                        layout="prev, pager, next, jumper"
                        :total="total"
                        style="float: right;padding: 0;">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #withdrawList{
        box-sizing: border-box;

        width: 100%;
        height: 100%;
        
        padding: 30px;
        background: #fff;

        overflow: hidden;
        label{
            color: #8492A6;
        }
        .withdrawList_body_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;

            padding-bottom: 58px;
            .withdrawList_body{
                display: flex;
                flex-direction: column;

                width: 100%;
                height: 100%;
                .table_body{
                    width: 100%;
                    flex: 1;
                }
                .pagination{
                    width: 100%;
                    height: 30px;

                    margin-top: 30px;
                }
            }
        }
    }
    .el-dialog__wrapper{
        z-index: 999999 !important;
    }
</style>

<script>
import { getShareholderWithdrawalsList, editShareholderWithdrawals } from '../../assets/axios/api.js'
export default {
    name: 'withdrawList',
    data () {
        return {
            loading: true, // 加载数据蒙层
            tableHeight: '', // 表格高度
            dataList: [], // 股东信息列表
            current_page: 0, // 当前页
            page_size: 20, // 每页条数
            total: 0, // 总条数
            searchWithdrawList: {
                nameORiphoneNumer: ''
            },
            rules: { // 验证规则
                nameORiphoneNumer: [
                    { max: 15, message: ' 15 个字符以内', trigger: 'blur' }
                ]
            }
        }
    },
    created: function () {
        // 初始化
        this.getShareholderWithdrawalsList()
        this.$nextTick(function () { // 获取表格高度
            this.tableHeight = document.getElementById('table').offsetHeight
        })
    },
    methods: {
        getShareholderWithdrawalsList (keyword, current_page) {
            this.loading = true
            this.$axios.post(getShareholderWithdrawalsList, {
                keyword: keyword || '',
                current_page: current_page || ''
            })
            .then(msg => {
                const data = msg.data

                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    this.dataList = []
                    this.total = 0
                    this.current_page = 0
                    // 关闭loading
                    this.loading = false
                    return false
                }

                // 绑定数据
                this.dataList = data.data.list
                // 总条数
                this.total = data.data.sum >> 0
                // 当前页
                this.current_page = data.data.current_page
                // 关闭loading
                this.loading = false
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },
         // 搜索
        onSearch () {
            this.getShareholderWithdrawalsList(this.searchWithdrawList.nameORiphoneNumer, '')
        },
        // 换页
        handleCurrentChange (val) {
            this.currentPage = val
            this.getShareholderWithdrawalsList(this.searchWithdrawList.nameORiphoneNumer, val)
        },
        // 退单
        editShareholderWithdrawals (w_id) {
            this.$confirm('是否已完成打款操作？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(editShareholderWithdrawals, {
                    w_id,
                    status: 1
                })
                .then(msg => {
                    const data = msg.data

                    if (data.status !== 1000) {
                        this.$message.error(data.ret_msg)
                        return false
                    }

                    this.$message({
                        type: 'success',
                        message: data.ret_msg
                    })
                    // 刷新数据
                    this.getShareholderWithdrawalsList(this.searchWithdrawList.nameORiphoneNumer, this.current_page)
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        }
    }
}
</script>
