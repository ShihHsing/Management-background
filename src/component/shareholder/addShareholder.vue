<template>
    <div id="addShareholder">
        <el-col :span="24" style="height: 100%; width: 100%;">
            <!-- 头部 -->
            <div class="addShareholder_top">
                <span>股东信息</span>
            </div>
            
            <div class="addShareholder_form_wrap">
                <div class="addShareholder_form_body sx_basis_scroll sx_scroll_style">
                    
                    <el-form
                        :model="addShareholderValues"
                        :rules="addShareholderValuesRules"
                        ref="addShareholderValues"
                        label-position="left"
                        class="addShareholder_form"
                        label-width="120px">
                        
                        <el-form-item label="股东姓名" prop="name">
                            <el-input v-model="addShareholderValues.name" style="width: 217px;" maxlength="15"></el-input>
                        </el-form-item>

                        <el-form-item label="股东电话" prop="phone_number" required>
                            <el-input v-model.number="addShareholderValues.phone_number" style="width: 217px;"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('addShareholderValues')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </div>
</template>

<style lang="less">
    #addShareholder{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .addShareholder_top{
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
        .addShareholder_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .addShareholder_form_body{
                width: 100%;
                height: 100%;
                .addShareholder_form{
                    box-sizing: border-box;
                    padding: 30px;

                    label{
                        color: #8492A6;
                    }
                    .el-tag{
                        margin-right: 15px!important;
                    }
                }
            }
        }
    }
</style>

<script>
import { addShareholderInfo } from '../../assets/axios/api.js'
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
            addShareholderValues: {
                name: '',
                phone_number: ''
            },
            addShareholderValuesRules: { // 验证规则
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
    methods: {
        // 提交颜色
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    this.$message({
                        message: '请完善必填信息',
                        type: 'warning'
                    })
                    return false
                }

                this.$axios.post(addShareholderInfo, {
                    's_name': this.addShareholderValues.name,
                    's_phone_number': this.addShareholderValues.phone_number
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
                    this.addShareholderValues.name = ''
                    this.addShareholderValues.phone_number = ''
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
            })
        }
    }
}
</script>
