<template>
  <div id="newsList" class="sx_basis_scroll sx_scroll_style">
    <el-row class="newsList_body" type="flex" justify="center">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <template v-if="newsType === '1'">
              <h2 style="float: left">公司新闻</h2>
              <el-button type="info" style="float: right" @click="getListIndustryNews">点击切换行业新闻</el-button>
            </template>
            <template v-else>
              <h2 style="float: left">行业新闻</h2>
              <el-button type="info" style="float: right" @click="getListCompanyDynamic">点击切换公司新闻</el-button>
            </template>
          </div>
          <el-table
            :data="newsList"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="add_time"
              label="新闻日期"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              label="新闻封面图"
              align="center">
              <template scope="scope">
                <img :src="scope.row.image" class="newsImg">
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="新闻名称"
              align="center"
              width="300">
            </el-table-column>
            <el-table-column
              prop="content"
              label="新闻描述"
              align="center"
              width="300">
            </el-table-column>
            <el-table-column
              label="操作"
              width="180"
              align="center">
              <template scope="scope">
                <el-button 
                  type="success" 
                  size="small"
                  @click="modificationNews(scope.row.id)">编辑<i class="el-icon-edit el-icon--right"></i></el-button>
                <el-button 
                  type="danger" 
                  size="small"
                  @click="removeNews(scope.row.id)">删除<i class="el-icon-delete2 el-icon--right"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
          </br>
          </br>
          <el-row type="flex" justify="center">
            <el-col :span="22">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="current_page"
                :page-size="page_size"
                layout="prev, pager, next, jumper"
                :total="page_size*total_pages"
                style="float: right;padding: 0;">
              </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-dialog title="编辑新闻信息" v-model="dialog">
        <el-form 
          :model="ruleForm" 
          :rules="rules" 
          ref="ruleForm"
          label-position="left"
          label-width="100px" 
          class="demo-ruleForm">
          <el-form-item label="分类选择" required>
            <el-select v-model="newsType" placeholder="请选择" disabled>
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
          <el-form-item label="新闻封面图" required>
            <el-upload
              class="avatar-uploader"
              :action="selectModifyNews()"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleError"
              :before-upload="beforeAvatarUpload"
              name="image">
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
            <el-button type="primary" @click="submitForm('ruleForm', ruleForm.id)">立即创建</el-button>
            <el-button @click="resetForm('ruleForm', 800)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import { listCompanyDynamic, listIndustryNews, modifyCompanyDynamic, modifyIndustryNews, removeCompanyDynamic, removeIndustryNews } from '../../assets/axios/api.js'
  export default{
    name: 'newsList',
    data () {
      return {
        newsList: [], // 新闻列表 后台获取
        // 当前页
        current_page: 1,
        // 总页数
        total_pages: 5,
        // 每页条数
        page_size: 5,
        newsType: '1',
        // 修改数据模型
        dialog: false,
        description: '', // 新闻描述
        imgUrl: '', // 图片地址
        ruleForm: {
          title: '', // 新闻名称
          keyword: '', // 关键字
          content: '', // 描述
          newsDescription: '', // 新闻内容
          id: ''
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
          ]
        }
      }
    },
    created: function () {
      /* --- 初始获取 公司新闻 ---- */
      this.getListCompanyDynamic()
      /* -------------------------- */
    },
    methods: {
      /* 获取公司新闻 */
      getListCompanyDynamic () {
        this.newsType = '1'
        this.init()
        this.getNewsList()
      },
      /* 获取行业新闻 */
      getListIndustryNews () {
        this.newsType = '2'
        this.init()
        this.getNewsList()
      },
      /* ---- 初始化 ---- */
      init () {
        this.current_page = 1
        this.total_pages = 1
      },
      /* --- 根据用户选择不同调用不同接口 获取数据 --- */
      selectNews () {
        return this.newsType === '1' ? listCompanyDynamic : listIndustryNews
      },
      /* --------------------------------------------- */
      /* ----------------- 获取数据 ----------------- */
      getNewsList (current_page) {
        const _this = this
        this.$axios.post(this.selectNews(), {
          current_page: current_page
        })
        .then((msg) => {
          const data = msg.data
          switch (data.flag >> 0) {
            case 1000:
              // const newsType = _this.newsType === '1' ? '公司新闻' : '行业新闻'
              // 当前页
              _this.current_page = data.current_page >> 0
              // 总页数
              _this.total_pages = data.total_pages >> 0
              // 数据列表 根据不同选择 解析不同数据
              if (this.newsType === '1') {
                _this.newsList = data.company_dynamic_list
              } else {
                _this.newsList = data.industry_news_list
              }
              // this.consoleSuccess(`${newsType} 获取成功!`)
              break
            default:
              this.consoleWarning(`服务器错误: ${data.return_code}`)
              break
          }
        })
        .catch(error => {
          this.consoleError(error)
        })
      },
      /* ------------------------------------------- */
      handleCurrentChange (val) {
        this.getNewsList(val)
      },

      submitForm (formName, id) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const imgUrl = this.imgUrl
            if (imgUrl) {
              const newsDescription = this.ruleForm.newsDescription
              if (newsDescription || newsDescription === '') {
                /* --- 提交数据 --- */
                this.addNews(id)
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
      /* --- 根据用户选择不同调用不同接口 获取数据 --- */
      selectModifyNews () {
        return this.newsType === '1' ? modifyCompanyDynamic : modifyIndustryNews
      },
      /* --------------------------------------------- */
      /* 获取修改新闻详情 */
      modificationNews (id) {
        this.dialog = true
        this.$axios.post(this.selectModifyNews(), {
          id
        })
        .then((msg) => {
          const data = msg.data
          console.log(data)
          switch (data.flag >> 0) {
            case 1000:
              var Data = null
              if (this.newsType === '1') {
                Data = data.company_dynamic
              } else {
                Data = data.industry_news
              }
              this.ruleForm.title = Data.title
              this.ruleForm.keyword = Data.keyword
              this.ruleForm.content = Data.content
              this.ruleForm.add_time = Data.add_time
              this.imgUrl = Data.image
              this.description = Data.details
              this.ruleForm.id = Data.id
              break
            default:
              this.consoleWarning(`服务器错误: ${data.return_code}`)
              break
          }
        })
        .catch(error => {
          this.consoleError(error)
        })
      },
      /* 修改信息提交 */
      addNews (id) {
        const Data = JSON.parse(JSON.stringify(this.ruleForm))
        Data.details = Data.newsDescription
        Data.image_url = this.imgUrl
        this.$axios.post(this.selectModifyNews(), Data)
        .then((msg) => {
          const data = msg.data
          switch (data.flag) {
            case 1000:
              this.consoleSuccess(`修改成功!`)
              this.dialog = false
              /* --- 清空表单 --- */
              this.resetForm('ruleForm', 500)
              /* ---------------- */
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
          // 重新获取数据
          this.getNewsList(this.current_page)
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
      /* ---- 根据分类调用接口 ---- */
      selectDeleteNews () {
        return this.newsType === '1' ? removeCompanyDynamic : removeIndustryNews
      },
      /* ------------------------- */
      /* 删除新闻 */
      removeNews (id) {
        this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(this.selectDeleteNews(), {
            id
          })
          .then((msg) => {
            const data = msg.data
            switch (data.flag >> 0) {
              case 1000:
                this.consoleSuccess(`新闻删除成功`)
                /* ===== 获取招聘列表 ===== */
                this.getNewsList(1)
                /* ======================== */
                break
              default:
                this.consoleWarning(data.return_code)
                break
            }
          })
          .catch(error => {
            this.consoleError(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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
    },
    components: {}
  }
</script>

<style lang="less">
   #newsList{
    width: 100%;
    height: 100%;
    .newsList_body{
      box-sizing: border-box;
      padding-top: 50px;
      .newsImg{
        padding-top: 5px;
        width: 100%;
      }
    }
  }
</style>