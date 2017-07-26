<template>
    <div id="orderDivided">
        <el-row>
            <el-form ref="searchOrderDivided" :model="searchOrderDivided" :rules="rules">
                <el-col :span="6">
                    <el-form-item prop="nameORiphoneNumer">
                        <el-input v-model="searchOrderDivided.nameORiphoneNumer" style="width: 90%;" placeholder="请输入订单编号、股东姓名或手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" @click="onSearch">立即搜索</el-button>
                </el-col>
            </el-form>
        </el-row>
            
        <div class="orderDivided_body_wrap">
            <div class="orderDivided_body">
                <div class="table_body sx_basis_scroll sx_scroll_style" id="table">
                    <el-table
                        :data="dataList"
                        border
                        stripe
                        :height="tableHeight"
                        v-loading="loading"
                        element-loading-text="加载中...">
                        <el-table-column
                            prop="so_order_number"
                            label="订单编号">
                        </el-table-column>
                        <el-table-column
                            prop="so_member_phone"
                            label="会员手机号">
                        </el-table-column>
                        <el-table-column
                            prop="s_name"
                            label="绑定股东">
                        </el-table-column>
                        <el-table-column
                            prop="s_phone_number"
                            label="股东手机号">
                        </el-table-column>
                        <el-table-column
                            prop="so_order_profit"
                            label="订单总利润">
                        </el-table-column>
                        <el-table-column
                            prop="so_make_profit"
                            label="股东分红利润">
                        </el-table-column>
                        <el-table-column
                            label="冻结积分">
                            <template scope="scope">
                                <template v-if="scope.row.so_status === '1'">
                                    {{ scope.row.so_make_profit }}
                                </template>
                                <template v-else>
                                    0.00
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="150">
                            <template scope="scope">
                                <template v-if="scope.row.so_status === '0'">
                                    <el-button type="primary" @click="orderFormReturn(scope.row.so_id)">申请退款</el-button>
                                </template>
                                <template v-if="scope.row.so_status === '1'">
                                    <el-button disabled type="primary">已分成</el-button>
                                </template>
                                <template v-if="scope.row.so_status === '2'">
                                    <el-button disabled type="primary">已退货</el-button>
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
    #orderDivided{
        box-sizing: border-box;

        width: 100%;
        height: 100%;
        
        padding: 30px;
        background: #fff;

        overflow: hidden;
        label{
            color: #8492A6;
        }
        .orderDivided_body_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;

            padding-bottom: 58px;
            .orderDivided_body{
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
import { getShareholderOrdersList, orderFormReturn } from '../../assets/axios/api.js'
export default {
    name: 'orderDivided',
    data () {
        return {
            loading: true, // 加载数据蒙层
            tableHeight: '', // 表格高度
            dataList: [], // 股东信息列表
            current_page: 0, // 当前页
            page_size: 20, // 每页条数
            total: 0, // 总条数
            searchOrderDivided: {
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
        this.getShareholderOrdersList()
        this.$nextTick(function () { // 获取表格高度
            this.tableHeight = document.getElementById('table').offsetHeight
        })
    },
    methods: {
        getShareholderOrdersList (keyword, current_page) {
            this.loading = true
            this.$axios.post(getShareholderOrdersList, {
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
            this.getShareholderOrdersList(this.searchOrderDivided.nameORiphoneNumer, '')
        },
        // 换页
        handleCurrentChange (val) {
            this.currentPage = val
            this.getShareholderOrdersList(this.searchOrderDivided.nameORiphoneNumer, val)
        },
        // 退单
        orderFormReturn (so_id) {
            this.$confirm('该订单是否已申请退货？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(orderFormReturn, {
                    so_id
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
                    this.getShareholderOrdersList(this.searchOrderDivided.nameORiphoneNumer, this.current_page)
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
