<template>
  <div id="addTraining">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="16">
         <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">新增培训</h2>
          </div>

          <el-form 
            ref="form" 
            :model="form"
            :rules="rules"
            label-width="100px" 
            style="width: 100%;"
            label-position="left">

            <el-form-item label="培训标题:" prop="training_title">
              <el-tooltip class="item" effect="dark" content="标题唯一,不允许重复" placement="left">
                <el-input v-model="form.training_title" placeholder="请输入培训标题"></el-input>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="培训分类:">
              <el-select v-model="form.training_classify" placeholder="请选择培训分类">
                <el-option 
                  v-for="item in form.training_classify_list" 
                  :label="item.classify_name" 
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="培训缩略图:">
              <el-tooltip class="item" effect="dark" placement="left">
                <div slot="content">图片大小不能超过1MB</br>图片比例4:3为最佳尺寸</div>
                <el-upload
                  class="avatar-uploader"
                  action="https://a001.aybc.so/Shop/addTrainingInfo"
                  name="image_url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.thumb_image_url" :src="form.thumb_image_url" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="培训类型:">
              <el-radio class="radio" v-model="form.training_type" label="1">图文</el-radio>
              <el-radio class="radio" v-model="form.training_type" label="2">视频</el-radio>
            </el-form-item>
            <template v-if="form.training_type == '1'">
              <el-form-item label="图文详情:">
                <el-tooltip class="item" effect="dark" placement="left">
                  <div slot="content">图文详情每张图片大小不能超过1MB</br>文字不许超过1000字</br>图片将以等宽不等高的方式展示在使用端</div>
                  <vue-html5-editor content="若只输入文字请选择字体大小" :height="500" @change="updateData"></vue-html5-editor>
                </el-tooltip>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="视频地址:">
                <el-input v-model="form.video_url" placeholder="请输入视频地址"></el-input>
              </el-form-item>
            </template>

            <el-form-item>
              <el-button 
                type="primary" 
                @click="onSubmit('form')"
                style="float: right;">立即创建</el-button>
            </el-form-item>
          </el-form>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  import * as API from '../assets/axios/api.js'
  export default{
    name: 'addTraining',
    data () {
      return {
        form: {
          // 培训标题:
          training_title: '',

          // 培训分类:
          training_classify: '',

          // 服务端获取分类
          training_classify_list: [],

          // 培训缩略图:
          thumb_image_url: '',

          // 培训类型
          training_type: '1',

          // 图文详情
          newDescription: '',

          // 视频地址
          video_url: ''

        },
        // 验证
        rules: {
          training_title: [
            { required: true, message: '请输入培训标题', trigger: 'blur' },
            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ]
        }
      }
    },

    created () {
      // 获取分类
      this.getTrainingClassifyList()
    },

    methods: {

      // 获取分类
      getTrainingClassifyList () {
        this.$axios.post(API.getTrainingClassifyList)
        .then(msg => {
          console.log(msg)
          const data = msg.data
          switch (data.flag) {
            case 1000:
              this.form.training_classify_list = data.training_classify_list
              break
            case 9001:
              this.consoleSuccess(`暂无培训分类!请先添加!`)
              setTimeout(() => {
                this.$router.push({ path: 'trainingClassifyList' })
              }, 2000)
              break
            default:
              this.consoleError(`获取分类失败,请重试!`)
              break
          }
        })
        .catch(error => {
          this.consoleError(`服务器${error.response}`)
        })
      },

      // 富文本数据更新 第一次进入初始化 为上传准确性
      // 如果用户操则会更新数据 最终上传以 newDescription 数据为准
      updateData (data) {
        this.form.newDescription = data
        console.log(data)
      },

      // 图片上传成功后
      handleAvatarSuccess (res, file) {
        switch (res.flag) {
          case 1000:
            this.form.thumb_image_url = res.file_url
            this.consoleSuccess(`缩略图上传成功!`)
            break
          default:
            this.consoleError(`服务器状态:${res.return_code}`)
            break
        }
      },

      // 图片上传前
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png'
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }
        return isJPG && isLt1M
      },

      // 检验数据
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.training_classify) {
              if (this.form.thumb_image_url) {
                switch (this.form.training_type) {
                  case '1':
                    // statements_1
                    if (this.form.newDescription) {
                      const Data = {
                        'training_title': this.form.training_title,
                        'training_classify': this.form.training_classify,
                        'training_type': this.form.training_type,
                        'thumb_image_url': this.form.thumb_image_url,
                        'training_value': this.form.newDescription
                      }
                      this.postData(Data)
                    } else {
                      this.consoleWarning(`请完善图文详情!`)
                    }
                    break
                  case '2':
                    // statements_def
                    if (this.form.video_url) {
                      const Data = {
                        'training_title': this.form.training_title,
                        'training_classify': this.form.training_classify,
                        'training_type': this.form.training_type,
                        'thumb_image_url': this.form.thumb_image_url,
                        'training_value': this.form.video_url
                      }
                      this.postData(Data)
                    } else {
                      this.consoleWarning(`请输入视频地址!`)
                    }
                    break
                }
              } else {
                this.consoleWarning(`请上传培训缩略图!`)
              }
            } else {
              this.consoleWarning(`请选择培训分类!`)
            }
          } else {
            return false
          }
        })
      },

      // 提交数据
      postData (Data) {
        console.log(Data)
        this.$axios.post(API.addTrainingInfo, Data)
        .then(msg => {
          console.log(msg)
          const data = msg.data
          switch (data.flag) {
            case 1000:
              this.consoleSuccess(`培训内容添加成功!`)
              setTimeout(() => {
                this.$router.push({ path: 'trainingList' })
              }, 2000)
              break
            default:
              this.consoleError(`服务器状态:${res.return_code}`)
              break
          }
        })
        .catch(error => {
          this.consoleError(`服务器${error.response}`)
        })
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
    }
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 133.5px;
    line-height: 133.5px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 133.5px;
    display: block;
  }
</style>
