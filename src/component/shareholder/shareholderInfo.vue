<template>
    <div id="shareholderInfo">
        <div class="shareholderInfo_wrap">
            <!-- 股东信息 -->
            <div class="shareholderInfo">
                <div class="name">
                    <p>{{ this.sharehold.s_name }}</p>
                    <el-button type="text" @click="dialogShareholdVisible = true"><i></i>编辑</el-button>
                </div>
                <div style="width: 150px;height: 2px;background: #8492A6;margin-bottom: 15px;"></div>
                <p>手机号码:{{ this.sharehold.s_phone_number }}</p>
                <p>积分总数</p>
                <p>{{ this.sharehold.s_integral_sum }}</p>
                <ul>
                    <li>
                        <p>可用积分</p>
                        <p>{{ this.sharehold.s_integral }}</p>
                    </li>
                    <li>
                        <div></div>
                    </li>
                    <li>
                        <p>冻结积分</p>
                        <p>{{ this.sharehold.s_freezing_integral }}</p>
                    </li>
                    <li>
                        <div></div>
                    </li>
                    <li>
                        <p>已绑定会员数(人)</p>
                        <p>{{ this.sharehold.member_number }}</p>
                    </li>
                </ul>
                <p>分享链接:{{ this.sharehold.s_share_url }}</p>
            </div>
            <!-- 积分明细 -->
            <div class="shareholderIntegralInfo sx_basis_scroll sx_scroll_style">
                <div style="margin-top: 35px;">
                    <p>积分明细</p>
                    <el-table
                        :data="dataList"
                        border
                        stripe
                        :height="290"
                        v-loading="loading"
                        element-loading-text="加载中..."
                        style="width: 1000px;">
                        <el-table-column
                            prop="c_add_time"
                            label="日期">
                        </el-table-column>
                        <el-table-column
                            label="变更类型">
                            <template scope="scope">
                                <template v-if="scope.row.c_integral_type === '1'">
                                    订单利润分成
                                </template>
                                <template v-else-if="scope.row.c_integral_type === '2'">
                                    积分兑换
                                </template>
                                <template v-else-if="scope.row.c_integral_type === '3'">
                                    提现积分
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="变更积分数">
                            <template scope="scope">
                                <template v-if="scope.row.c_integral_type === '1'">
                                    +{{ scope.row.c_integral_num }}
                                </template>
                                <template v-else>
                                    -{{ scope.row.c_integral_num }}
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="c_surplus_integral"
                            label="变动后剩余积分">
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="current_page"
                            :page-size="page_size"
                            layout="prev, pager, next, jumper"
                            :total="sum"
                            style="float: right;padding: 0;">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog title="股东信息" v-model="dialogShareholdVisible">
            <el-form 
                :label-position="top" 
                :model="sharehold"
                :rules="shareholdRules"
                ref="sharehold">
                <el-form-item label="股东姓名" prop="s_name">
                    <el-input v-model="sharehold.s_name" style="width: 217px;" maxlength="15"></el-input>
                </el-form-item>

                <el-form-item label="股东电话" prop="s_phone_number" required>
                    <el-input v-model.number="sharehold.s_phone_number" style="width: 217px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogShareholdVisible = false">取 消</el-button>
                <el-button type="primary" @click="editShareholderInfoBySid">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="less">
    #shareholderInfo{
        box-sizing: border-box;

        width: 100%;
        height: 100%;
        
        padding: 30px;
        background: #fff;

        overflow: hidden;
        label{
            color: #8492A6;
        }
        .shareholderInfo_wrap{
            display: flex;
            flex-direction: column;

            width: 100%;
            height: 100%;
            .shareholderInfo{
                box-sizing: border-box;
                padding-bottom: 25px;
                color: #8492A6;
                font-size: 12px;

                width: 100%;
                border-bottom: 2px solid #eee;
                .name{
                    width: 100%;
                    height: 50px;
                    margin-bottom: 20px;
                    >p:nth-of-type(1){
                        float: left;

                        min-width: 90px;
                        padding-right: 15px;

                        color: #8492A6;
                        font-size: 38px;
                    }
                    button{
                        float: left;
                        padding-bottom: 20px;
                        span{
                            line-height: 16px;
                            i{
                                float: left;

                                width: 15px;
                                height: 15px;
                                background: url('../../assets/img/shareholder/editor.png')no-repeat center center;
                            }
                        }
                    }
                }
                >p:nth-of-type(1){
                    margin-bottom: 50px;
                }
                >p:nth-of-type(2){
                    margin-bottom: 30px;
                }
                >p:nth-of-type(3){
                    color: #FF4949;
                    font-size: 30px;
                    font-weight: 600;
                    margin-bottom: 50px;
                }
                ul{
                    width: 100%;
                    height: 45px;
                    margin-bottom: 35px;
                    li{
                        list-style: none;
                        float: left;
                        &:nth-child(even){
                            div{
                                height: 30px;
                                width: 1px;

                                background: #8492A6;
                                margin: 0 35px;
                            }
                        }
                        >p:nth-of-type(1){
                            padding-bottom: 5px;
                        }
                        >p:nth-of-type(2){
                            font-size: 15px;
                            color: #FF4949;
                        }
                    }
                }
                >p:nth-of-type(4){
                    margin-bottom: 15px;
                }
            }
            .shareholderIntegralInfo{
                width: 100%;
                flex: 1;
                div{
                    >p:nth-of-type(1){
                        font-size: 12px;
                        color: #8492A6;
                        padding-bottom: 15px;
                    }
                    .pagination{
                        margin-top: 15px;
                        width: 1000px;
                    }
                }
            }
        }
    }
    .el-dialog__wrapper{
        z-index: 999999 !important;
    }
</style>

<script>
import { getShareholderInfoById, editShareholderInfoBySid } from '../../assets/axios/api.js'
export default {
    name: 'shareholderInfo',
    data () {
        var checkPhoneNumber = (rule, value, callback) => {
            console.log(value)
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
            id: this.$route.query.id, // 用户id
            dataList: null, // 用户积分变动明细
            dialogShareholdVisible: false, // 打开修改股东信息控件
            sharehold: {
                s_name: '', // 姓名
                s_phone_number: '', // 手机号
                s_integral_sum: '', // 总积分
                s_integral: '', // 可用积分
                s_freezing_integral: '', // 冻结积分
                member_number: '', // 绑定会员数
                s_share_url: '' // 分享地址
            }, // 用户详情
            page_size: 20, // 每页条数
            sum: null, // 总条数
            current_page: null, // 当前页
            shareholdRules: { // 验证规则
                s_name: [
                    { required: true, message: '请输入股东姓名', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                ],
                s_phone_number: [
                    { validator: checkPhoneNumber, trigger: 'blur' }
                ]
            }
        }
    },
    created: function () {
        this.getShareholderInfoById()
    },
    methods: {
        // 分页
        handleCurrentChange (val) {
            this.getShareholderInfoById(val)
        },
        // 获取股东详情
        getShareholderInfoById (current_page) {
            // 重置表单
            if (this.$refs.sharehold) {
                this.$refs.sharehold.resetFields()
            }

            this.$axios.post(getShareholderInfoById, {
                s_id: this.id,
                current_page
            })
            .then(msg => {
                const data = msg.data

                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    return false
                }

                this.sharehold = {
                    s_name: data.data.s_name, // 姓名
                    s_phone_number: parseInt(data.data.s_phone_number), // 手机号
                    s_integral_sum: data.data.s_integral_sum, // 总积分
                    s_integral: data.data.s_integral, // 可用积分
                    s_freezing_integral: data.data.s_freezing_integral, // 冻结积分
                    member_number: data.data.member_number, // 绑定会员数
                    s_share_url: data.data.s_share_url // 分享地址
                }

                this.current_page = data.data.current_page
                this.sum = data.data.sum

                this.dataList = data.data.integral_log // 积分变动明细
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },
        // 修改股东信息
        editShareholderInfoBySid () {
            this.$refs.sharehold.validate((valid) => {
                if (!valid) {
                    this.$message.error('请完善信息')
                    return false
                }

                this.$axios.post(editShareholderInfoBySid, {
                    s_id: this.id,
                    s_name: this.sharehold.s_name,
                    s_phone_number: this.sharehold.s_phone_number
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
                    this.dialogShareholdVisible = false // 关闭股东信息组件
                    this.getShareholderInfoById()
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
            })
        }
    }
}
</script>
