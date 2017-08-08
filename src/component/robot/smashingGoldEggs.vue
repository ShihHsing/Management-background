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
        
                        <el-form-item label="券名称:" prop="name" required>
                            <el-input style="width: 217px;" placeholder="请输券名称" v-model="smashingGoldEggsValues.name"></el-input>
                        </el-form-item>

                        <el-form-item label="券金额:" prop="money" required>
                            <el-input-number v-model="smashingGoldEggsValues.money" :min="28"></el-input-number>
                            <p style="width: 500px;color: #999;font-size: 12px;height: 20px;">*优惠券金额最少为28元</p>
                        </el-form-item>
                        
                        <el-form-item label="使用条件:" prop="explain">
                            <el-input placeholder="请输入使用条件" type="textarea" v-model="smashingGoldEggsValues.explain"></el-input>
                            <p style="text-align: right;width: 500px;color: #999;font-size: 12px;height: 20px;" v-bind:class="{ fontError: isError }">{{ fontNum }}/35</p>
                        </el-form-item>
                        
                        <el-form-item label="活动时间" style="width: 500px;" prop="date_time" required>
                            <el-date-picker
                                v-model="smashingGoldEggsValues.date_time"
                                type="daterange"
                                placeholder="选择日期范围">
                            </el-date-picker>
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
            callback()
        }
        var checkName = (rule, value, callback) => {
            var reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
            if (!value) {
                return callback(new Error('请输入券名称'))
            }
            if (!reg.test(value)) {
                return callback(new Error('仅能输入中文、英文、数字不包括下划线等特殊符号'))
            }
            if (value.length > 10) {
                return callback(new Error('名称10位以内'))
            }
            callback()
        }
        var checkDate = (rule, value, callback) => {
            if (!value||!value[0]) {
                return callback(new Error('请选择时间'))
            }
            callback()
        }
        return {
            smashingGoldEggsValues: {
                name: '', // 券名称
                money: null, // 金额
                explain: '', // 使用条件
                date_time: { // 获取时间戳
                    0: '',
                    1: ''
                }
            },
            smashingGoldEggsRules: {
                name: [
                    { validator: checkName, trigger: 'change' }
                ],
                money: [
                    { validator: checkMoney, trigger: 'change' }
                ],
                explain: [
                    { required: true, min: 1, max: 35, message: '请输入使用条件,35字以内', trigger: 'change' }
                ],
                date_time: [
                    { validator: checkDate, trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        fontNum: function () {
            if (!this.smashingGoldEggsValues) return false
            return this.smashingGoldEggsValues.explain.length
        },
        isError: function () {
            if (this.fontNum > 35) {
                return true
            }
            return false
        },
        start_date: function () { // 开始时间
            if (!this.smashingGoldEggsValues) return false
            return this.smashingGoldEggsValues.date_time[0].getTime() / 1000
        },
        end_date: function () { // 结束时间
            if (!this.smashingGoldEggsValues) return false
            if (this.smashingGoldEggsValues.date_time[0].getTime() === this.smashingGoldEggsValues.date_time[1].getTime()) {
                return (this.smashingGoldEggsValues.date_time[1].getTime() / 1000) + 86399
            }
            return this.smashingGoldEggsValues.date_time[1].getTime() / 1000
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
                explain: this.smashingGoldEggsValues.explain,
                send_start_time: this.start_date,
                send_end_time: this.end_date
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
