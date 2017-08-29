<template>
    <div id="shopFaqList">
        <el-col :span="24" style="height: 100%; width: 100%;">
            <!-- 头部 -->
            <div class="shopFaqList_top">
                <span>问题列表</span>
            </div>
        </el-col>
    </div>
</template>

<style lang="less">
    #shopFaqList{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .shopFaqList_top{
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
        .shopFaqList_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .shopFaqList_form_body{
                width: 100%;
                height: 100%;
                .shopFaqList_form{
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
// import { addShopFaqInfo } from '../../assets/axios/api.js'
export default {
    name: 'shopFaqList',
    data () {
        return {}
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

                this.$axios.post(addShopFaqInfo, {
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
