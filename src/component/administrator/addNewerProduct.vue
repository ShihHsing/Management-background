<template>
    <div id="addNewerProduct">
        <el-col :span="24" style="height: 100%; width: 100%;">
            <!-- 头部 -->
            <div class="addNewerProduct_top">
                <span>添加品牌</span>
            </div>
            
            <div class="addNewerProduct_form_wrap">
                <div class="addNewerProduct_form_body sx_basis_scroll sx_scroll_style">
                    
                    <el-form
                        label-position="left"
                        class="addNewerProduct_form"
                        label-width="80px">
                        
                        <el-form-item label="品牌:">
                            <el-input v-model="product_name" placeholder="请输入品牌名" style="width: 217px;"></el-input>
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
    #addNewerProduct{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .addNewerProduct_top{
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
        .addNewerProduct_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .addNewerProduct_form_body{
                width: 100%;
                height: 100%;
                .addNewerProduct_form{
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
import { addNewerProduct } from '../../assets/axios/api.js'
export default {
    name: 'addNewerProduct',
    data () {
        return {
            product_name: null
        }
    },
    methods: {
        // 提交颜色
        submitForm () {
            if (!this.product_name) {
                this.$message({
                    message: '请填写需要创建的品牌名',
                    type: 'warning'
                })
                return false
            }
            this.$axios.post(addNewerProduct, {
                product_name: this.product_name
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
                this.product_name = null
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
