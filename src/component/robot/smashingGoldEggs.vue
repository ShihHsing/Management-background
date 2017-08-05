<template>
    <div id="smashingGoldEggs">
        <el-col :span="24" style="height: 100%; width: 100%;">
            <!-- 头部 -->
            <div class="smashingGoldEggs_top">
                <span>砸金蛋优惠券</span>
            </div>
            
            <div class="smashingGoldEggs_form_wrap">
                <div class="smashingGoldEggs_form_body sx_basis_scroll sx_scroll_style">
                    
                    <el-form
                        :model="smashingGoldEggsValues"
                        :rules="smashingGoldEggsRules"
                        ref="smashingGoldEggsValues"
                        label-position="left"
                        label-width="120px"
                        class="smashingGoldEggs_form">
        
                        <el-form-item label="券名称:" prop="name">
                            <el-input style="width: 217px;" placeholder="请输券名称" v-model="smashingGoldEggsValues.name"></el-input>
                        </el-form-item>

                        <el-form-item label="券金额:" prop="money" required>
                            <el-input style="width: 217px;" placeholder="请输券金额" v-model.number="smashingGoldEggsValues.money"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="使用条件:" prop="rules">
                            <el-input placeholder="请输入使用条件" type="textarea" v-model="smashingGoldEggsValues.rules"></el-input>
                            <p style="text-align: right;width: 500px;color: #999;font-size: 12px;height: 20px;" v-bind:class="{ fontError: isError }">{{ fontNum }}/150</p>
                        </el-form-item>
                        
                        <el-form-item label="活动时间" style="width: 500px;" required>
                            <el-col :span="11">
                                <el-form-item prop="start_date">
                                    <el-date-picker type="date" placeholder="选择开始日期" v-model="smashingGoldEggsValues.start_date" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col style="text-align: center;" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="end_date">
                                    <el-date-picker type="date" placeholder="选择结束日期" v-model="smashingGoldEggsValues.end_date" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('smashingGoldEggsValues')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </div>
</template>

<style lang="less">
    #smashingGoldEggs{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .smashingGoldEggs_top{
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;

            height: 50px;
            
            padding: 0 30px;

            border-bottom: 1px solid #E5E9F2;

            line-height: 50px;
            font-size: 18px;
            color: #8492A6;
            .OI{
                color: #1D8CE0;
                font-size: 12px;
            }
        }
        .smashingGoldEggs_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .smashingGoldEggs_form_body{
                width: 100%;
                height: 100%;
                .smashingGoldEggs_form{
                    box-sizing: border-box;
                    padding: 30px;

                    label{
                        color: #8492A6;
                    }
                    .el-tag{
                        margin-right: 15px!important;
                    }
                }
                textarea{
                    width: 500px;
                    height: 100px;
                }
                .fontError{
                    color: red!important;
                }
            }
        }
    }
</style>

<script>
import { addCouponInfo } from '../../assets/axios/api.js'
export default {
    name: 'smashingGoldEggs',
    data () {
        var checkMoney = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('金额不能为空'))
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入纯数字'))
                } else {
                    callback()
                }
            }, 1000)
        }
        return {
            smashingGoldEggsValues: {
                name: '', // 券名称
                money: null, // 金额
                rules: '', // 使用条件
                start_date: null, // 开始时间
                end_date: null // 结束时间
            },
            smashingGoldEggsRules: {
                name: [
                    { required: true, message: '请输券名称', trigger: 'change' }
                ],
                money: [
                    { validator: checkMoney, trigger: 'change' }
                ],
                rules: [
                    { required: true, min: 1, max: 150, message: '请输入使用条件,150字以内', trigger: 'change' }
                ],
                start_date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                end_date: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        fontNum: function () {
            return this.smashingGoldEggsValues.rules.length
        },
        isError: function () {
            if (this.fontNum > 150) {
                return true
            }
            return false
        }
    },
    created: function () {},
    methods: {

        // 提交活动规则
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    this.$message({
                        message: '请完善必填信息',
                        type: 'warning'
                    })
                    return false
                }
                this.addCouponInfo()
            })
        },

        // 请求
        addCouponInfo () {
            this.$axios.post(addCouponInfo, {
                name: this.smashingGoldEggsValues.name,
                money: this.smashingGoldEggsValues.money,
                rules: this.smashingGoldEggsValues.rules,
                start_date: this.smashingGoldEggsValues.start_date,
                end_date: this.smashingGoldEggsValues.end_date
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
                this.resetForm('smashingGoldEggsValues')
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 清空表单
        resetForm (formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>
