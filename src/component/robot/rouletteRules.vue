<template>
    <div id="rouletteRules">
        <el-col :span="24" style="height: 100%; width: 100%;">
            <!-- 头部 -->
            <div class="rouletteRules_top">
                <span>幸运大转盘</span>
            </div>
            
            <div class="rouletteRules_form_wrap">
                <div class="rouletteRules_form_body sx_basis_scroll sx_scroll_style">
                    
                    <el-form
                        :model="rouletteRulesValues"
                        :rules="rouletteRulesRules"
                        ref="rouletteRulesValues"
                        label-position="left"
                        label-width="120px"
                        class="rouletteRules_form">

                        <el-form-item label="活动规则:" prop="roulette_content">
                            <el-input placeholder="请输入活动规则" type="textarea" v-model="rouletteRulesValues.roulette_content"></el-input>
                            <p style="text-align: right;width: 500px;color: #999;font-size: 12px;height: 20px;" v-bind:class="{ fontError: isError }">{{ fontNum }}/70</p>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('rouletteRulesValues')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </div>
</template>

<style lang="less">
    #rouletteRules{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .rouletteRules_top{
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
        .rouletteRules_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .rouletteRules_form_body{
                width: 100%;
                height: 100%;
                .rouletteRules_form{
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
import { handleRouLette, getRouLetteByShopId } from '../../assets/axios/api.js'
export default {
    name: 'rouletteRules',
    data () {
        return {
            rouletteRulesValues: {
                roulette_content: '' // 活动规则
            },
            rouletteRulesRules: {
                roulette_content: [
                    { required: true, min: 1, max: 1000, message: '请输入活动规则,70字以内', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        fontNum: function () {
            return this.rouletteRulesValues.roulette_content.length
        },
        isError: function () {
            if (this.fontNum > 70 || this.fontNum === 0) {
                return true
            }
            return false
        }
    },
    created: function () {
        this.getRouLetteByShopId()
    },
    methods: {
        // 提交活动规则
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    this.$message({
                        message: '请完善活动规则',
                        type: 'warning'
                    })
                    return false
                }
                this.handleRouLette()
            })
        },

        // 请求
        handleRouLette () {
            this.$axios.post(handleRouLette, {
                roulette_content: this.rouletteRulesValues.roulette_content
            })
            .then(msg => {
                const data = msg.data

                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }
                this.$message({
                    message: data.return_code,
                    type: 'success'
                })
                // 调用获取接口
                this.getRouLetteByShopId()
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 获取活动规则
        getRouLetteByShopId () {
            this.$axios.post(getRouLetteByShopId)
            .then(msg => {
                const data = msg.data

                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }
                this.rouletteRulesValues.roulette_content = data.roulette_content || '欢迎使用幸运大转盘，祝您购物愉快！\n购物满100元即可参加此活动！\n门店拥有最终解释权！'
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
