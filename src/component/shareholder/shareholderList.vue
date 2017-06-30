<template>
    <div id="shareholderList">
        <el-row>
            <el-form ref="searchShareholderList" :model="searchShareholderList" :rules="rules">
                <el-col :span="6">
                    <el-form-item prop="nameORiphoneNumer">
                        <el-input v-model="searchShareholderList.nameORiphoneNumer" style="width: 217px;" placeholder="请输入股东姓名或手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" @click="onSearch">立即搜索</el-button>
                </el-col>
            </el-form>
        </el-row>
            
        <div class="shareholderList_body_wrap">
            <div class="shareholderList_body">
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
                            label="姓名"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="s_phone_number"
                            label="手机号"
                            width="140">
                        </el-table-column>
                        <el-table-column
                            prop="s_integral"
                            label="积分"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            label="兑换"
                            width="100">
                            <template scope="scope">
                                <el-button type="primary" @click="openIntegralForm(scope.row)">兑换</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="s_share_url"
                            label="分享链接">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="current_page"
                        :page-size="page_size"
                        layout="prev, pager, next, jumper"
                        :total="page_size*total_pages"
                        style="float: right;padding: 0;">
                    </el-pagination>
                </div>
            </div>
            <el-dialog title="积分兑换" v-model="dialogTableVisible">
                <el-form :label-position="top">
                    <el-form-item label="请选择兑换积分数量">
                        <!-- TODO: max传进最大积分数 -->
                        <el-input-number v-model="minusIntegral" :min="1" :max="shareholderInfo.s_integral >> 0"></el-input-number>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="exchangeIntegral">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<style lang="less">
    #shareholderList{
        box-sizing: border-box;

        width: 100%;
        height: 100%;
        
        padding: 30px;
        background: #fff;

        overflow: hidden;
        label{
            color: #8492A6;
        }
        .shareholderList_body_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;

            padding-bottom: 73px;
            .shareholderList_body{
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
import { getShareholderList, exchangeIntegral } from '../../assets/axios/api.js'
export default {
    name: 'addShareholder',
    data () {
        return {
            searchShareholderList: {
                nameORiphoneNumer: ''
            },
            loading: true, // 加载数据蒙层
            tableHeight: '', // 表格高度
            dataList: [], // 股东信息列表
            current_page: 0, // 当前页
            total_pages: 0, // 总页数
            page_size: 0, // 每页条数
            dialogTableVisible: false, // 兑换窗口控件
            minusIntegral: 0, // 积分
            shareholderInfo: [], // 待操作股东信息
            rules: { // 验证规则
                nameORiphoneNumer: [
                    { max: 15, message: ' 15 个字符以内', trigger: 'blur' }
                ]
            }
        }
    },
    created: function () {
        // 初始化
        this.getShareholderList()
        this.$nextTick(function () { // 获取表格高度
            this.tableHeight = document.getElementById('table').offsetHeight
        })
    },
    methods: {
        // 获取列表
        getShareholderList (keyword, current_page) {
            this.loading = true
            this.$axios.post(getShareholderList, {
                keyword: keyword || '',
                current_page: current_page || ''

            })
            .then(msg => {
                const data = msg.data

                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    return false
                }

                this.$message({
                    message: data.ret_msg,
                    type: 'success'
                })

                // 绑定数据
                this.dataList = data.data.list
                // 当前页
                this.current_page = data.data.current_page
                // 总页数
                this.total_pages = data.data.sum % 20
                // 关闭loading
                this.loading = false
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },
        // 搜索
        onSearch () {
            if (!this.searchShareholderList.nameORiphoneNumer) {
                this.$message({
                    message: '请完善必填信息',
                    type: 'warning'
                })
                return false
            }
            this.getShareholderList(this.searchShareholderList.nameORiphoneNumer, '')
        },
        // 换页
        handleCurrentChange (val) {
            this.currentPage = val
            this.getShareholderList(this.searchShareholderList.nameORiphoneNumer, val)
        },
        // 打开积分变动组件
        openIntegralForm (shareholderInfo) {
            // 绑定要操作的股东ID
            this.shareholderInfo = shareholderInfo
            // 打开
            this.dialogTableVisible = true
            // 清空积分模型
            this.minusIntegral = 1
        },
        // 积分兑换
        exchangeIntegral () {
            this.$axios.post(exchangeIntegral, {
                s_id: this.shareholderInfo.s_id,
                s_integral: this.minusIntegral
            })
            .then(msg => {
                const data = msg.data

                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    return false
                }

                this.$message({
                    message: data.ret_msg,
                    type: 'success'
                })
                this.getShareholderList(this.keyword, this.current_page)
                this.dialogTableVisible = false
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
