<template>
    <div id="shareholderList">
        <el-row>
            <el-form ref="searchShareholderList" :model="searchShareholderList" :rules="rules">
                <el-col :span="6">
                    <el-form-item prop="nameORiphoneNumer">
                        <el-input v-model="searchShareholderList.nameORiphoneNumer" style="width: 90%;" placeholder="请输入股东姓名或手机号"></el-input>
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
                            width="65">
                            <template scope="scope">
                                <el-button type="text" @click="openIntegralForm(scope.row)">兑换</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="s_share_url"
                            label="分享链接">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="220">
                            <template scope="scope">
                                <!-- <el-button type="text" @click="getShareholderInfoById(scope.row.s_id)">修改股东信息</el-button> -->
                                <router-link :to="{ path: 'shareholderInfo', query: { id: scope.row.s_id }}">
                                    <el-button type="text" @click="getShareholderInfoById(scope.row.s_id)">查看股东详情</el-button>
                                </router-link>
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
            <el-dialog title="积分兑换" v-model="dialogIntegralVisible">
                <el-form :label-position="top">
                    <el-form-item label="请选择兑换积分数量">
                        <el-input-number v-model="minusIntegral" :min="1" :max="shareholderInfo.s_integral >> 0"></el-input-number>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogIntegralVisible = false">取 消</el-button>
                    <el-button type="primary" @click="exchangeIntegral">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="股东信息" v-model="dialogShareholdVisible">
                <el-form 
                    :label-position="top" 
                    :model="sharehold"
                    :rules="shareholdRules"
                    ref="sharehold">
                    <el-form-item label="股东姓名" prop="name">
                        <el-input v-model="sharehold.name" style="width: 217px;" maxlength="15"></el-input>
                    </el-form-item>

                    <el-form-item label="股东电话" prop="phone_number" required>
                        <el-input v-model.number="sharehold.phone_number" style="width: 217px;"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogShareholdVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editShareholderInfoBySid">确 定</el-button>
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

            padding-bottom: 58px;
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
        var checkPhoneNumber = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入股东手机号码'))
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    return callback(new Error('请输入数字值'))
                }
                var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
                if (!reg.test(value)) {
                    return callback(new Error('手机号码格式不正确'))
                } else {
                    return callback()
                }
            }, 1000)
        }
        return {
            searchShareholderList: {
                nameORiphoneNumer: ''
            },
            loading: true, // 加载数据蒙层
            tableHeight: '', // 表格高度
            dataList: [], // 股东信息列表
            current_page: 0, // 当前页
            page_size: 20, // 每页条数
            total: 0, // 总条数
            dialogIntegralVisible: false, // 兑换窗口控件
            minusIntegral: 0, // 积分
            shareholderInfo: [], // 待操作股东信息
            rules: { // 验证规则
                nameORiphoneNumer: [
                    { max: 15, message: ' 15 个字符以内', trigger: 'blur' }
                ]
            },
            dialogShareholdVisible: false, // 打开修改股东信息控件
            sharehold: {
                id: '',
                name: '',
                phone_number: ''
            },
            shareholdRules: { // 验证规则
                name: [
                    { required: true, message: '请输入股东姓名', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                ],
                phone_number: [
                    { validator: checkPhoneNumber, trigger: 'blur' }
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
            this.dialogIntegralVisible = true
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
                this.dialogIntegralVisible = false
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
