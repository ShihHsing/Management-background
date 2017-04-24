<template>
  <div id="addNews" class="sx_basis_scroll sx_scroll_style">
    <el-row class="addNews_body" type="flex" justify="center">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">添加新闻</h2>
          </div>
          <el-form 
            :model="ruleForm" 
            :rules="rules" 
            ref="ruleForm" 
            label-width="100px" 
            class="demo-ruleForm">
            <el-form-item label="新闻名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="新闻关键字" prop="keywords">
              <el-input v-model="ruleForm.keywords"></el-input>
            </el-form-item>
            <el-form-item label="新闻描述" prop="description">
              <el-input v-model="ruleForm.description"></el-input>
            </el-form-item>
            <el-form-item label="新闻日期" required>
              <el-col :span="11">
                <el-form-item prop="date">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="新闻封面图">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="新闻内容">
              <div class="sx_basis_scroll sx_scroll_style" style="height: 350px;">
                <vue-html5-editor :content="description" @change="updateData"></vue-html5-editor>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    name: 'addNews',
    data () {
      return {
        description: '', // 新闻描述
        imageUrl: '', // 图片地址
        ruleForm: {
          name: '', // 新闻名称
          keywords: '', // 关键字
          description: '', // 描述
          date: '', // 新闻时间
          newsDescription: '' // 新闻内容
        },
        rules: {
          name: [
            { required: true, message: '请输入新闻标题', trigger: 'blur' },
            { min: 3, max: 80, message: '长度 3 到 80 个字符以内!', trigger: 'change' }
          ],
          keywords: [
            { required: true, message: '请输入新闻关键字', trigger: 'blur' },
            { min: 15, max: 100, message: '长度 15 到 100 个字符以内 并用逗号分隔!', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请输入新闻描述', trigger: 'blur' },
            { min: 20, max: 200, message: '长度 20 到 200 个字符以内!', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择新闻日期', trigger: 'change' }
          ]
        }
      }
    },
    created: function () {},
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const newsDescription = this.ruleForm.newsDescription
            if (newsDescription) {
              this.consoleSuccess(`添加成功`)
              /* --- 清空表单 --- */
              this.resetForm()
              /* ---------------- */
            } else {
              this.consoleWarning(`请完善新闻内容`)
            }
          } else {
            this.consoleWarning(`请完善信息后提交`)
            return false
          }
        })
      },
      /* 清空表单 */
      resetForm (formName) {
        this.$refs[formName].resetFields()
        // 清空富文本
        this.description = null
      },
      /* ---- 富文本 ---- */
      updateData (data) {
        this.ruleForm.newsDescription = data
      },
      /* --------------- */

      /* ---- 图片上传 ---- */
      handleAvatarSuccess (res, file) {
        this.imageUrl = document.URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      /* ----------------------- */
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

<style lang="less">
  #addNews{
    width: 100%;
    height: 100%;
    overflow: auto;
    .addNews_body{
      box-sizing: border-box;
      padding: 50px 0;
    }
  }
</style>