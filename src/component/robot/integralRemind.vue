<template>
    <div id="integralRemind">
        <el-col :span="24" style="height: 100%; width: 100%;">
            <!-- 头部 -->
            <div class="integralRemind_top">
                <span>积分提醒</span>
            </div>
            
            <div class="integralRemind_form_wrap">
                <div class="integralRemind_form_body sx_basis_scroll sx_scroll_style">
                    <p style="padding: 10px 30px 0 30px;color: #C0CCDA;font-size: 12px;line-height: 20px;">用法一:如设置积分数为"600",提醒内容为"亲,您的积分已达到600,可以兑换一条内裤~"当3D购会员积分等于或大于600时我们会帮您在3D购中自动提醒用户</br>
                    用法二:如设置积分数为"500",提醒内容为"亲,您的积分还差一点就到600了,满600可以兑换一条内裤哦~"当3D购会员积分等于或大于500时我们会帮您在3D购中自动提醒用户</br><span style="color: red;">未保存修改数据前,请勿使用删除!会导致您当前修改数据丢失</span></p>
                    <el-form
                        ref="integralRemindValues"
                        label-position="left"
                        class="integralRemind_form"
                        :model="integralRemindValues">

                        <template v-for="(item, index) in integralRemindValues.push_arr">
                            <div style="width: 100%;height: auto;">
                                <el-form-item
                                    style="width: 200px;float: left;">
                                    <el-input-number v-model="item.push_condition" :min="1"></el-input-number>
                                </el-form-item>
                                <el-form-item
                                    style="width: 450px;float: left;padding-left: 10px;padding-right: 10px;"
                                    :key="item.key"
                                    :prop="'push_arr.' + index + '.push_content'"
                                    :rules="{
                                      required: true, max: 100, message: '请输入提醒消息内容,100位以内', trigger: 'change'
                                    }">
                                    <el-input
                                        placeholder="请输入提醒消息内容"
                                        v-model="item.push_content"></el-input>
                                </el-form-item>
                                
                                <template v-if="index !== 0">
                                    <el-button type="text" @click="deleteIntegralRemind(item.id, index)">删除</el-button>
                                </template>
                                <div style="clear: both;"></div>
                            </div>
                        </template>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('integralRemindValues')">保存</el-button>
                            <el-button @click="addIntegralRemind">新增</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </div>
</template>

<style lang="less">
    #integralRemind{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .integralRemind_top{
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
        .integralRemind_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .integralRemind_form_body{
                width: 100%;
                height: 100%;
                .integralRemind_form{
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
import { addPushSetting, getPushSetting, deletePushSetting, editPushSetting } from '../../assets/axios/api.js'
export default {
    name: 'integralRemind',
    data () {
        return {
            integralRemindValues: {
                push_arr: [
                    {
                        push_condition: '',
                        push_content: ''
                    }
                ]
            }
        }
    },
    computed: {},
    created: function () {
        this.getPushSetting()
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
                this.editPushSetting()
            })
        },
        // 添加一行
        addIntegralRemind () {
            if (this.integralRemindValues.push_arr.length >= 10) {
                this.$message({
                    message: '最多添加十条规则',
                    type: 'warning'
                })
                return false
            }
            this.integralRemindValues.push_arr.push({
                push_condition: '',
                push_content: '',
                key: Date.now()
            })
        },
        // 删除一行
        deleteIntegralRemind (id, index) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (id) {
                    this.deletePushSetting(id)
                } else {
                    if (index < 0) return this.integralRemindValues.push_arr
                    this.integralRemindValues.push_arr = this.integralRemindValues.push_arr.slice(0, index).concat(this.integralRemindValues.push_arr.slice(index + 1, this.integralRemindValues.push_arr.length))
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        // 添加积分规则
        addPushSetting () {
            this.$axios.post(addPushSetting, {
                push_arr: this.integralRemindValues.push_arr
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
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 获取积分规则详情
        getPushSetting () {
            this.$axios.post(getPushSetting)
            .then(msg => {
                const data = msg.data
                if (data.status === 9000) {
                    return false
                }
                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    return false
                }
                this.integralRemindValues.push_arr = []

                for (var i = data.data.length - 1; i >= 0; i--) {
                    this.integralRemindValues.push_arr.push({
                        id: data.data[i].p_id,
                        shop_id: data.data[i].p_shop_id,
                        push_condition: data.data[i].p_condition,
                        push_content: data.data[i].p_content
                    })
                }
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 删除积分规则详情
        deletePushSetting (id) {
            this.$axios.post(deletePushSetting, {
                id
            })
            .then(msg => {
                const data = msg.data

                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    return false
                }
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                // 获取积分规则详情
                this.getPushSetting()
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 修改积分规则详情
        editPushSetting () {
            this.$axios.post(editPushSetting, {
                push_arr: this.integralRemindValues.push_arr
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
                this.getPushSetting()
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
