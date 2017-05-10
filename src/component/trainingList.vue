<template>
  <div id="trainingList">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">培训列表</h2>
          </div>
          <el-row>

            <el-form
              ref="form"
              :model="form"
              label-position="left"
              inline>

              <el-row type="flex" justify="space-around">
                <el-form-item label="培训分类:">
                  <el-select
                    v-model="form.training_classify"
                    placeholder="请选择"
                    clearable >
                    <el-option
                      v-for="item in form.training_classify_list"
                      :label="item.classify_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="培训类型:">
                  <el-select
                    v-model="form.training_type"
                    placeholder="请选择"
                    clearable >
                    <el-option label="图文" value="1"></el-option>
                    <el-option label="视频" value="2"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="关键字:">
                  <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="success" @click="searchTraining">立即搜索</el-button>
                </el-form-item>

                <el-form-item>
                  <router-link to="/addTraining"><el-button type="info">新增培训</el-button></router-link>
                </el-form-item>

              </el-row>

            </el-form>

          </el-row>

          <el-table
            :data="training_list"
            stripe
            style="width: 100%">
            <el-table-column
              label="缩略图"
              align="center"
              width="180">
              <template scope="scope">
                <img
                  class="imgList"
                  v-show="scope.row.thumb_image"
                  :src="scope.row.thumb_image"
                  :alt="scope.row.classify_name">
              </template>
            </el-table-column>

            <el-table-column
              label="培训标题"
              align="center"
              prop="title">
            </el-table-column>

            <el-table-column
              label="培训分类"
              align="center"
              prop="classify_name">
            </el-table-column>

            <el-table-column
              label="培训类型"
              align="center">
              <template scope="scope">
              {{ scope.row.type_id == '1' ? '图文' : '视频' }}
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              width="180">
              <template scope="scope">

                <el-row type="flex" justify="space-around">
                  <template v-if="scope.row.recommend == 1">
                    <el-button
                      type="text"
                      @click="handleTrainingRecommend(scope.row.id,'0')"
                      size="mini">
                        取消推荐
                    </el-button>
                  </template>
                  <template v-else>
                    <el-button
                      @click="handleTrainingRecommend(scope.row.id,'1')"
                      size="mini">
                        推荐
                    </el-button>
                  </template>

                  <el-button
                    type="text"
                    icon="edit"
                    @click="getModifyTrainingInfo(scope.row.id)">
                  </el-button>
                  <el-button
                    type="text"
                    icon="delete"
                    @click="removeTraining(scope.row.id, scope.$index, training_list)">
                  </el-button>
                </el-row>

              </template>

            </el-table-column>
          </el-table>
          <el-row
            style="margin-top: 20px;"
            type="flex"
            justify="center">
            <el-col :span="22">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="current_page"
                :page-size="20"
                layout="prev, pager, next, jumper"
                :total="20*total_pages"
                style="float: right;padding: 0;">
              </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- 修改 -->
    <el-dialog title="修改商品" v-model="dialogFormVisible">
      <el-form
        ref="form"
        :model="modify_form"
        label-width="100px"
        style="width: 100%;"
        label-position="left">

        <el-form-item label="培训标题:" prop="training_title">
          <el-input
            v-model="modify_form.training_title"
            placeholder="请输入培训标题"
            disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="培训分类:">
          <el-select v-model="modify_form.training_classify" placeholder="请选择培训分类">
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
              action="http://a001.aybc.so/Shop/addTrainingInfo"
              name="image_url"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="modify_form.thumb_image_url" :src="modify_form.thumb_image_url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="培训类型:">
          <el-radio class="radio" v-model="modify_form.training_type" label="1" disabled>图文</el-radio>
          <el-radio class="radio" v-model="modify_form.training_type" label="2" disabled>视频</el-radio>
        </el-form-item>
        <template v-if="modify_form.training_type == '1'">
          <el-form-item label="图文详情:">
            <el-tooltip class="item" effect="dark" placement="left">
              <div slot="content">图文详情每张图片大小不能超过1MB</br>文字不许超过1000字</br>图片将以等宽不等高的方式展示在使用端</div>
              <!-- <vue-html5-editor :content="modify_form.content" :height="500" @change="updateData"></vue-html5-editor> -->
              <quill-editor
                ref="myTextEditor"
                v-model="modify_form.content"
                :options="editorOption">
              </quill-editor>
            </el-tooltip>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="视频地址:">
            <el-input v-model="modify_form.video_url" placeholder="请输入视频地址"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyTrainingInfo">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import * as API from '../assets/axios/api.js'
  export default{
    name: 'trainingList',
    data () {
      return {
        editorOption: {}, // 富文本对象
        form: {
          // 培训分类:
          training_classify: '',

          // 服务端获取分类
          training_classify_list: [],

          // 培训类型
          training_type: '',

          // 关键字
          keyword: ''
        },

        // 培训列表
        training_list: [],

        // 当前页
        current_page: 1,

        // 总页数
        total_pages: 1,

        // 修改对话框
        dialogFormVisible: false,

        // 修改数据
        modify_form: {
          // 修改信息id
          training_id: '',

          // 培训标题:
          training_title: '',

          // 培训分类:
          training_classify: '',

          // 培训缩略图:
          thumb_image_url: '',

          // 培训类型
          training_type: '1',

          // 富文本展示
          content: '',

          // 视频地址
          video_url: ''
        }
      }
    },
    created () {
      // 获取培训列表
      this.getTrainingList()
      // 获取分类
      this.getTrainingClassifyList()
    },

    methods: {

      // 删除
      removeTraining (id, index, list) {
        const Data = {
          training_id: id >> 0
        }
        this.$confirm('是否确认删除该培训课程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          console.log(Data)
          this.$axios.post(API.removeTraining, Data)
          .then(msg => {
            console.log(msg)
            const data = msg.data
            switch (data.flag) {
              case 1000:
                this.consoleSuccess(`培训信息删除成功`)
                list.splice(index, 1)
                this.searchTraining()
                break
              default:
                this.consoleError(`培训信息删除失败,请重试!`)
                break
            }
          })
          .catch(error => {
            this.consoleError(`服务器${error.response}`)
          })
        })
      },

      // 提交修改数据
      modifyTrainingInfo () {
        if (this.modify_form.training_classify) {
          if (this.modify_form.thumb_image_url) {
            switch (this.modify_form.training_type) {
              case '1':
                // statements_1
                let Data = {
                  training_id: this.modify_form.training_id,
                  training_classify: this.modify_form.training_classify,
                  training_type: this.modify_form.training_type,
                  thumb_image_url: this.modify_form.thumb_image_url,
                  training_value: this.modify_form.content,
                  request_flag: 'modify'
                }
                this.modifyTrainingInfoAxios(Data)
                break
              case '2':
                // statements_1
                Data = {
                  training_id: this.modify_form.training_id,
                  training_classify: this.modify_form.training_classify,
                  training_type: this.modify_form.training_type,
                  thumb_image_url: this.modify_form.thumb_image_url,
                  training_value: this.modify_form.video_url,
                  request_flag: 'modify'
                }
                this.modifyTrainingInfoAxios(Data)
                break
              default:
                // statements_def
                break
            }
          } else {
            this.consoleError(`请上传培训缩略图!`)
          }
        } else {
          this.consoleError(`请选择培训分类!`)
        }
      },

      modifyTrainingInfoAxios (Data) {
        this.$axios.post(API.modifyTrainingInfo, Data)
        .then(msg => {
          console.log(msg)
          const data = msg.data
          switch (data.flag) {
            case 1000:
              this.searchTraining()
              this.consoleSuccess(`培训信息修改成功`)
              this.dialogFormVisible = false
              break
            default:
              this.consoleError(`设置失败,请重试!`)
              break
          }
        })
        .catch(error => {
          this.consoleError(`服务器${error.response}`)
        })
      },

      // 图片上传成功后
      handleAvatarSuccess(res, file) {
        switch (res.flag) {
          case 1000:
            this.modify_form.thumb_image_url = res.file_url
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

      // 修改获取数据
      getModifyTrainingInfo (id) {
        const Data = {
          training_id: id
        }
        this.$axios.post(API.modifyTrainingInfo, Data)
        .then(msg => {
          console.log(msg)
          const data = msg.data
          switch (data.flag) {
            case 1000:
              this.modify_form = {
                // 修改信息id
                training_id: data.training_detail.id,
                // 培训标题:
                training_title: data.training_detail.title,

                // 培训分类:
                training_classify: data.training_detail.classify_id >> 0,

                // 培训缩略图:
                thumb_image_url: data.training_detail.thumb_image,

                // 培训类型
                training_type: data.training_detail.type_id
              }
              switch (data.training_detail.type_id) {
                case '1':
                  this.modify_form.content = data.training_detail.training_value
                  break
                case '2':
                  this.modify_form.video_url = data.training_detail.training_value
                  break
                default:
                  this.modify_form.video_url = ''
                  break
              }

              this.dialogFormVisible = true
              break
            default:
              break
          }
        })
        .catch(error => {
          this.consoleError(`服务器${error.response}`)
        })
      },

      // 置顶设置
      handleTrainingRecommend (training_id, training_recommend) {
        const Data = {
          training_id: training_id,
          training_recommend: training_recommend
        }
        this.$confirm('推荐后会优先置顶显示, 是否确认推荐?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$axios.post(API.handleTrainingRecommend, Data)
          .then(msg => {
            console.log(msg)
            const data = msg.data
            switch (data.flag) {
              case 1000:
                this.consoleSuccess(`设置成功`)
                this.getTrainingList()
                break
              case 9009:
                this.consoleWarning(`推荐课程最多显示10条,请先取消一条推荐课程在尝试!`)
                this.getTrainingList()
                break
              default:
                this.consoleError(`设置失败,请重试!`)
                this.initData()
                break
            }
          })
          .catch(error => {
            this.consoleError(`服务器${error.response}`)
          })
        })
      },

      // 数据初始化
      initData () {
        this.training_list = []
        this.total_pages = 1
        this.current_page = 1
      },

      // 分页
      handleCurrentChange (val) {
        const Data = {
          training_classify: this.form.training_classify,
          training_type: this.form.training_type,
          keyword: this.form.keyword,
          current_page: val
        }
        this.getTrainingList(Data)
      },

      // 搜索
      searchTraining () {
        // const verification = Boolean(this.form.training_classify || this.form.training_type || this.form.keyword);
        const Data = {
          training_classify: this.form.training_classify,
          training_type: this.form.training_type,
          keyword: this.form.keyword,
          current_page: 1
        }
        this.getTrainingList(Data)
      },

      // 获取列表
      getTrainingList (Data) {
        this.$axios.post(API.listTrainingInfo, Data)
        .then(msg => {
          console.log(msg)
          const data = msg.data
          switch (data.flag) {
            case 1000:
              this.training_list = data.training_list
              this.current_page = data.current_page
              this.total_pages = data.pages
              break
            case 9001:
              this.consoleWarning(`请先添加至少一条培训!`)
              this.initData()
              break
            default:
              this.consoleError(`获取培训列表失败,请重试!`)
              this.initData()
              break
          }
        })
        .catch(error => {
          this.consoleError(`服务器${error.response}`)
        })
      },

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
              this.consoleSuccess(`请先添加至少一条培训分类!`)
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
  .imgList{
    width: 100% !important;
  }
</style>
