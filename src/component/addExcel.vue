<template>
  <div id="addExcel">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">会员导入</h2>
            <el-button type="text" style="float: right;">
              <a :href="addExcelTemplateUrl" download="会员模板.xlsx">模板下载</a>
            </el-button>
          </div>

          <el-form 
            label-position="left">
            <el-upload
              ref="upload"
              class="upload-demo"
              :action="uploadAddExcel"
              :on-success="handleSuccess"
              :before-upload="handleBefore"
              :multiple="false"
              name="file_excel">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">上传文件后缀名必须为.xlsx</div>
            </el-upload>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

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
        <el-button type="primary" @click="error = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { addExcelTemplateUrl, uploadAddExcel } from '../assets/axios/api.js'
  export default{
    name: 'addExcel',
    data () {
      return {
        addExcelTemplateUrl,
        // 错误文件下载链接
        errorDataListUrl: null,
        error: false,
        // 文件上传
        uploadAddExcel
      }
    },
    created: function () {},
    methods: {
      handleSuccess (response) {
        if (response.flag) {
          const flag = response.flag
          switch (flag) {
            case 1000:
              this.consoleSuccess(`文件导入成功!`)
              const uploadFiles = this.$refs.upload.uploadFiles
              if (uploadFiles.lenght !== 0) {
                uploadFiles.shift()
              }
              break
            case 9002:
              if (response.error_data) {
                const uploadFiles = this.$refs.upload.uploadFiles
                if (uploadFiles.lenght !== 0) {
                  uploadFiles.shift()
                }
                this.consoleError(`导入数据失败!文件生成中!请下载文件后查看错误并修改!`)
                this.errorDataListUrl = response.error_data
                setTimeout(() => {
                  this.error = true
                }, 800)
              }
              break
            default:
              if (response.ret_msg) {
                this.consoleWarning(response.ret_msg)
              } else {
                this.consoleWarning(`服务器发生未知错误!请稍后尝试!`)
              }
              break
          }
        }
      },
      handleBefore (file) {
        console.log(file)
        const fileType = Boolean(file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        console.log(fileType)
        if (!fileType) {
          this.consoleWarning(`您上传文件为${file.type}类型,但上传文件后缀名必须为或.xlsx!`)
          return false
        }
      },

      consoleSuccess (success) {
        this.$notify({
          title: '成功',
          message: success,
          type: 'success'
        })
      },

      consoleWarning (warning) {
        this.$notify({
          title: '警告',
          message: warning,
          type: 'warning'
        })
      },

      consoleNews (news) {
        this.$notify.info({
          title: '消息',
          message: news
        })
      },

      consoleError (error) {
        this.$notify.error({
          title: '错误',
          message: error
        })
      }
    },
    components: {}
  }
</script>

<style>
  .steps{
    height: auto;
    width: 100%;
    margin-top: 100px;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
