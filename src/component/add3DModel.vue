<template>
  <div id="add3DModel">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="12">
        <el-form   
          label-position="left" label-width="80px">
          <el-form-item label="商品款号:">
            <el-input
              placeholder="请输入内容"
              v-model="code"
              :disabled="true">
            </el-input>
          </el-form-item>

          <el-form-item label="商品颜色:">
            <el-input
              placeholder="请输入内容"
              v-model="color"
              :disabled="true">
            </el-input>
          </el-form-item>
          
          <!-- <el-form-item label="模型名称">
            <el-input
              placeholder="请输入内容"
              v-model="name">
            </el-input>
          </el-form-item> -->
          
          <el-form-item label="IOS unity模型:">
            <el-upload
              class="upload-demo"
              action="http://a001.aybc.so/Shop/handle3DModel"
              name="ios_unity_file"
              :on-success="addIosUnity"
              :on-error="uploadError">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="Android unity模型:">
            <el-upload
              class="upload-demo"
              action="http://a001.aybc.so/Shop/handle3DModel"
              name="android_unity_file"
              :on-success="addAndroidUnity"
              :on-error="uploadError">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
      
          <el-form-item label="添加3D缩略图:">
            <div v-for="(city,index) in colorImg">
              <el-upload
                action="http://a001.aybc.so/Shop/handle3DModel"
                :multiple="false"
                :on-success="colorAndImgSuccess"
                :on-error="uploadError"
                :before-upload="uploadBefore"
                name="thumbnail"
                :data="{'imgColor': colorImg[index]}"
                list-type="picture">
                <el-button size="small" type="primary">请上传{{ colorImg[index] }}商品的3D缩略图</el-button>
                <!-- <div class="el-upload__text">请上传<em>{{ colorImg[index] }}</em>商品的3D缩略图</div> -->
                <div slot="tip" class="el-upload__tip" style="color:#555;">请上传<b style="color:#20A0FF;">{{ colorImg[index] }}</b>商品的商品图片,并只能上传jpg/png文件，且不超过500kb 200*200</div>
              </el-upload>
            </div>
          </el-form-item>
  
          <el-form-item>
            <el-button type="primary" @click="phpPostData()">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as API from '../assets/axios/api.js'
  import '../assets/style/add3DModel.less'
  export default{
    name: 'add3DModel',
    data () {
      return {
        code: '',
        color: '',
        colorImg: [],
        colorAndImg: [],
        ios: '',
        android: '',
        // 商品id
        id: '',
        // 门店id
        shop_id: '',
        // 文件名
        file_name: ''
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },

      initData () {
        // 商品款号
        this.code = this.$route.query.code
        // 商品id
        this.id = this.$route.query.id
        // 门店id
        this.shop_id = this.$route.query.shop_id
        // 商品颜色
        for (var i = 0, length1 = this.$route.query.color.length; i < length1; i++) {
          this.color += this.$route.query.color[i].color_name + ' '
          this.colorImg.push(this.$route.query.color[i].color_name)
          var colorImg = {
            color: this.$route.query.color[i].color_name,
            imgUrl: '',
            id: this.$route.query.color[i].color_arg_id
          }
          this.colorAndImg.push(colorImg)
        }
      },

      // uploadBefore (file) {
      //   if (file.size > 1024 * 1024) {
      //     // statement
      //     this.consoleError('上传文件过大!请重新上传!')
      //     setTimeout(() => {
      //       jQuery('.is-ready').hide()
      //     }, 800)
      //     return false
      //   }
      // },

      // 商品颜色图片
      colorAndImgSuccess (response, file, fileList) {
        if (response.flag === '1000') {
          console.log(response, file)
          // statement
          var imgColor = response.imgColor
          for (var i = 0; i < this.colorAndImg.length; i++) {
            if (this.colorAndImg[i].color === imgColor) {
              this.colorAndImg[i].imgUrl = response.file_url
            }
          }
          this.consoleSuccess(response.return_code)
        } else {
          this.consoleError(response.return_code)
        }
      },

      // 文件上传失败
      uploadError () {
        this.consoleError('上传文件有误!请重新上传!')
      },

      // ios模型上传
      addIosUnity (response, file) {
        if (response.flag === '1000') {
          console.log(response)
          // statement
          this.ios = response.file_url
          this.file_name = file.name
          this.consoleSuccess(response.return_code)
        } else {
          this.consoleError(response.return_code)
        }
      },

       // 安卓模型上传
      addAndroidUnity (response) {
        if (response.flag === '1000') {
          console.log(response)
          // statement
          this.android = response.file_url
          this.consoleSuccess(response.return_code)
        } else {
          this.consoleError(response.return_code)
        }
      },

      // 提交
      phpPostData () {
        var count = 0
        for (var i = 0, length1 = this.colorAndImg.length; i < length1; i++) {
          if (!this.colorAndImg[i].imgUrl) {
            // statement
            count++
          }
        }

        if (this.code && this.color) {
          // statement
          if (this.ios) {
            // statement
            if (this.android) {
              // statement
              if (count === 0) {
                // statement
                this.$axios.post(API.handle3DModel, {
                  arguments: {
                    'code': this.code,
                    'ios_unity_url': this.ios,
                    'android_unity_url': this.android,
                    'colorAndImg': this.colorAndImg,
                    'id': this.id,
                    'shop_id': this.shop_id,
                    'file_name': this.file_name
                  }
                })
                .then(msg => {
                  console.log(msg.data)
                  if (msg.data.flag === '1000') {
                    // statement
                    this.consoleSuccess(msg.data.return_code)
                    setTimeout(() => {
                      this.$router.push({ path: 'listOfGoods' })
                    }, 2000)
                  } else {
                    this.consoleError(msg.data.return_code)
                  }
                }, response => {
                  this.consoleError(response.return_code)
                })
              } else {
                this.consoleError('请完善3D缩略图!还差' + count + '张未上传!')
              }
            } else {
              this.consoleError('请上传android3D模型!')
            }
          } else {
            this.consoleError('请上传ios3D模型!')
          }
        } else {
          this.consoleError('商品必要信息缺失!请返回列表重新获取!')
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

    created: function () {
      this.initData()
    }
  }
</script>
