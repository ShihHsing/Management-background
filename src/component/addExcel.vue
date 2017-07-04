<template>
    <div id="addExcel">
        <el-col :span="24">
            <!-- 头部 -->
            <div class="addExcel_top">
                <span>会员导入</span>
                <a 
                    :href="addExcelTemplateUrl" 
                    download="会员模板.xlsx">
                    模板下载
                </a>
            </div>
            <el-form
                label-position="left"
                class="add_excel_form">
                <el-upload
                    ref="upload"
                    class="upload-demo"
                    :action="uploadAddExcel"
                    :on-success="handleSuccess"
                    :before-upload="handleBefore"
                    :multiple="false"
                    name="file_excel">
                    <el-button size="small" type="primary">点击上传</el-button>
                    </br></br>
                    <div slot="tip" class="el-upload__tip">上传文件后缀名必须为.xlsx</div>
                </el-upload>
            </el-form>
        </el-col>

        <!-- 错误提示模板 -->
        <el-dialog title="格式有误信息列表" v-model="error" size="tiny">
            <a
                :href="errorDataListUrl"
                download="错误数据"
                style="color: #fff;">
            <el-button type="danger">
            错误数据下载
            </el-button>
            </a>
            <span slot="footer" class="dialog-footer">
                <el-button @click="error = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style lang="less">
    #addExcel{
        width: 100%;
        height: 100%;
        
        background: #fff;
        .addExcel_top{
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;

            height: 50px;
            
            padding: 0 30px;

            border-bottom: 1px solid #E5E9F2;

            line-height: 50px;
            font-size: 18px;
            color: #8492A6;
            a{
                color: #1D8CE0;
                font-size: 12px;
            }
        }
        .add_excel_form{
            box-sizing: border-box;
            padding: 30px;
            .el-upload__tip{
                color: #C0CCDA;
            }
        }
    }
</style>

<script>
import { addExcelTemplateUrl, uploadAddExcel } from '../assets/axios/api.js'
export default{
    name: 'addExcel',
    data () {
        return {
            addExcelTemplateUrl,
            errorDataListUrl: null, // 错误文件下载链接
            error: false,
            uploadAddExcel // 文件上传
        }
    },
    created: function () {},
    methods: {
        handleSuccess (response) {
            if (response.flag) {
                const flag = response.flag
                switch (flag) {
                case 1000:
                    this.$message({
                        message: '文件导入成功!',
                        type: 'success'
                    })
                    const uploadFiles = this.$refs.upload.uploadFiles
                    if (uploadFiles.length === 2) {
                        uploadFiles.shift()
                    }
                    break
                case 9002:
                    if (response.error_data) {
                        const uploadFiles = this.$refs.upload.uploadFiles
                        if (uploadFiles.length === 2) {
                            uploadFiles.shift()
                        }
                        this.$message.error(`导入数据失败!文件生成中!请下载文件后查看错误并修改!`)
                        this.errorDataListUrl = response.error_data
                        setTimeout(() => {
                            this.error = true
                        }, 800)
                    }
                    break
                default:
                    if (!response.return_code) {
                        this.$message({
                            message: '服务器发生未知错误!请稍后尝试!',
                            type: 'warning'
                        })
                        return false
                    }
                    this.$message({
                        message: response.return_code,
                        type: 'warning'
                    })
                    break
                }
            }
        },
        handleBefore (file) {
            const fileType = Boolean(file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            if (!fileType) {
                this.$message({
                    message: '上传文件后缀名必须为.xlsx!',
                    type: 'warning'
                })
                return false
            }
        }
    }
}
</script>

