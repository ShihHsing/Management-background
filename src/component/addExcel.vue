<template>
  <div id="addExcel">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">会员导入</h2>
          </div>

          <el-form 
            label-position="left">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="http://a001.aybc.so//Shop/addExcel"
              :on-success="handleSuccess"
              :before-upload="handleBefore"
              :multiple="false"
              name="file_excel">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">上传文件后缀名必须为.xls或.xlsx</div>
            </el-upload>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    name: 'addExcel',
    computed: {},
    watch: {},
    data () {
      return {
      }
    },
    created: function () {},
    methods: {
      handleSuccess (response) {
        console.log(response)
        if (response) {
          // this.consoleSuccess(`文件导入成功!`)
          // const uploadFiles = this.$refs.upload.uploadFiles
          // uploadFiles.shift()
        }
      },
      handleBefore (file) {
        console.log(file)
        const fileType = Boolean(file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')
        console.log(fileType)
        if (!fileType) {
          this.consoleWarning(`您上传文件为${file.type}类型,但上传文件后缀名必须为.xls或.xlsx!`)
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
