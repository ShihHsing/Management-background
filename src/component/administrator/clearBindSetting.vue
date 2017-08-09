<template>
    <div id="clearBindSetting">
        <el-col :span="24" style="height: 100%; width: 100%;">
            <!-- 头部 -->
            <div class="clearBindSetting_top">
                <span>股东信息</span>
            </div>
            
            <div class="clearBindSetting_form_wrap">
                <div class="clearBindSetting_form_body sx_basis_scroll sx_scroll_style">
                    
                    <el-form
                        label-position="left"
                        class="clearBindSetting_form"
                        label-width="120px">
                        
                        <el-form-item label="机器人ID:">
                            <el-input-number v-model="robot_id" :controls="false" :min="0"></el-input-number>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </div>
</template>

<style lang="less">
    #clearBindSetting{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .clearBindSetting_top{
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
        .clearBindSetting_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .clearBindSetting_form_body{
                width: 100%;
                height: 100%;
                .clearBindSetting_form{
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
import { clearBindSetting } from '../../assets/axios/api.js'
export default {
    name: 'clearBindSetting',
    data () {
        return {
            robot_id: null
        }
    },
    methods: {
        // 提交颜色
        submitForm () {
            if (!this.robot_id) {
                this.$message({
                    message: '请填写机器人id',
                    type: 'warning'
                })
                return false
            }
            var reg = /^[0-9]*$/
            if (!reg.test(this.robot_id)) {
                this.$message({
                    message: '请输入纯数字',
                    type: 'warning'
                })
                return false
            }
            this.$axios.post(clearBindSetting, {
                robot_id: this.robot_id
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
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
