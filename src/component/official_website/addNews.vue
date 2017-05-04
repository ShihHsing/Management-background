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
            label-position="left"
            label-width="100px" 
            class="demo-ruleForm">
            <el-form-item label="分类选择" required>
              <el-select v-model="newsSelect" placeholder="请选择">
                <el-option label="公司新闻" value="1"></el-option>
                <el-option label="行业新闻" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="新闻名称" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="新闻关键字" prop="keyword">
              <el-input v-model="ruleForm.keyword"></el-input>
            </el-form-item>
            <el-form-item label="新闻描述" prop="content">
              <el-input v-model="ruleForm.content"></el-input>
            </el-form-item>
            <el-form-item label="新闻日期" required>
              <el-col :span="11">
                <el-form-item prop="add_time">
                  <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="ruleForm.add_time"
                    style="width: 100%;">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="新闻封面图" required>
              <el-upload
                class="avatar-uploader"
                :action="addCompanyDynamic"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-error="handleError"
                :before-upload="beforeAvatarUpload"
                name="image"
                :data="{'session_id': session_id}">
                <img v-if="imgUrl" :src="imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="新闻内容" required>
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
  import store from '../../assets/store'
  import { addCompanyDynamic, addIndustryNews } from '../../assets/axios/api.js'
  import * as SX from '../../assets/public/sx_func.js'
  export default{
    name: 'addNews',
    data () {
      return {
        session_id: store.state.user.userData.session_id,
        // 图片上传接口
        addCompanyDynamic,
        newsSelect: '1', // 上传分类选择
        description: '', // 新闻描述
        imgUrl: '', // 图片地址
        ruleForm: {
          title: '', // 新闻名称
          keyword: '', // 关键字
          content: '', // 描述
          add_time: '', // 新闻时间
          newsDescription: '' // 新闻内容
        },
        rules: {
          title: [
            { required: true, message: '请输入新闻标题', trigger: 'blur' },
            { min: 3, max: 80, message: '长度 3 到 80 个字符以内!', trigger: 'change' }
          ],
          keyword: [
            { required: true, message: '请输入新闻关键字', trigger: 'blur' },
            { min: 15, max: 100, message: '长度 15 到 100 个字符以内 并用逗号分隔!', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入新闻描述', trigger: 'blur' },
            { min: 20, max: 200, message: '长度 20 到 200 个字符以内!', trigger: 'change' }
          ],
          add_time: [
            { type: 'date', required: true, message: '请选择新闻日期', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const imgUrl = this.imgUrl
            if (imgUrl) {
              const newsDescription = this.ruleForm.newsDescription
              if (newsDescription) {
                /* --- 提交数据 --- */
                this.addNews()
                /* ---------------- */

                /* --- 清空表单 --- */
                this.resetForm('ruleForm', 500)
                /* ---------------- */
              } else {
                this.consoleWarning(`请完善新闻内容`)
              }
            } else {
              this.consoleWarning(`请上传新闻封面图`)
            }
          } else {
            this.consoleWarning(`请完善信息后提交`)
            return false
          }
        })
      },
      /* 判断新闻上传链接 */
      selectNews () {
        return this.newsSelect === '1' ? addCompanyDynamic : addIndustryNews
      },
      /* 提交数据 */
      addNews () {
        const Data = JSON.parse(JSON.stringify(this.ruleForm))
        Data.details = Data.newsDescription
        Data.image_url = this.imgUrl
        Data.add_time = SX.date(this.ruleForm.add_time)
        Data.session_id = this.session_id
        this.$axios.post(this.selectNews(), Data)
        .then((msg) => {
          const data = msg.data
          switch (data.flag) {
            case 1000:
              this.consoleSuccess(`添加成功!`)
              setTimeout(() => {
                /* 跳转 */
                this.$router.push('newsList')
              }, 500)
              break
            default:
              this.consoleWarning(data.return_code)
              break
          }
        })
        .catch(error => {
          this.consoleError(error)
        })
      },
      /* 清空表单 */
      resetForm (formName, time) {
        setTimeout(() => {
          this.$refs[formName].resetFields()
          // 清空富文本
          this.description = null
          // 清空封面图
          this.imgUrl = null
        }, time)
      },
      /* ---- 富文本 ---- */
      updateData (data) {
        this.ruleForm.newsDescription = data
      },
      /* --------------- */

      /* ---- 图片上传 ---- */
      handleAvatarSuccess (res, file) {
        console.log(res, file)
        if (res) {
          switch (res.flag >> 0) {
            case 1000:
              this.consoleSuccess(`新闻封面图上传成功`)
              this.imgUrl = res.file_url
              break
            default:
              this.consoleWarning(`${res.return_code}`)
              break
          }
        }
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!')
        }
        return isJPG && isLt2M
      },
      /* ------- 错误时处理 ------*/
      handleError (err, file, fileList) {
        this.consoleWarning(`文件上传失败! 原因: ${err}`)
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