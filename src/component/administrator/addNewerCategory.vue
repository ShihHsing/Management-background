<template>
    <div id="addNewerCategory">
        <el-col :span="24" style="height: 100%; width: 100%;">
            <!-- 头部 -->
            <div class="addNewerCategory_top">
                <span>添加分类</span>
            </div>
            
            <div class="addNewerCategory_form_wrap">
                <div class="addNewerCategory_form_body sx_basis_scroll sx_scroll_style">
                    
                    <el-form
                        label-position="left"
                        class="addNewerCategory_form"
                        label-width="80px">
                        
                        <el-form-item label="分类:">
                            <el-input v-model="category_name" placeholder="请输入分类名" style="width: 217px;"></el-input>
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
    #addNewerCategory{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .addNewerCategory_top{
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
        .addNewerCategory_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .addNewerCategory_form_body{
                width: 100%;
                height: 100%;
                .addNewerCategory_form{
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
import { addNewerCategory } from '../../assets/axios/api.js'
export default {
    name: 'addNewerCategory',
    data () {
        return {
            category_name: null
        }
    },
    methods: {
        // 提交颜色
        submitForm () {
            if (!this.category_name) {
                this.$message({
                    message: '请填写需要创建的分类',
                    type: 'warning'
                })
                return false
            }
            this.$axios.post(addNewerCategory, {
                category_name: this.category_name
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
                this.category_name = null
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
