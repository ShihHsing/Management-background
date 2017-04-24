<template>
  <div id="addCarouselDrawing">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="20">
        <el-tabs type="border-card" @tab-click="getCarouselDrawingList" v-model="tabCheck">

          <el-tab-pane label="新增轮播图" name="addCarouselDrawing">

            <el-form   
              label-position="left" label-width="120px">
                <el-form-item label="轮播图名称">
                  <el-tooltip class="item" effect="dark" content="请保证轮播图名称唯一" placement="right-start">
                    <el-input
                      placeholder="请输入轮播图名称"
                      v-model="name"
                      :maxlength="20"
                      style="width: 217px;">
                    </el-input>
                  </el-tooltip>
                </el-form-item>
              
              <el-form-item label="上传轮播图:">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadAddCarouselDrawing"
                  name="image_url"
                  :on-success="addCarouselDrawingImg"
                  :on-error="uploadError"
                  :before-upload="beforeAvatarUpload"
                  :show-file-list="false">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="轮播图位置:">
                <el-select v-model="location" placeholder="请选择">
                  <el-option
                    v-for="item in location_type_list"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="轮播图类型:">
                <el-radio-group v-model="carousel_drawing_type">
                  <template v-for="item in carousel_drawing_type_list">
                    <el-radio-button :label="item.id" v-if="!(item.id == 2 && location == 3)">
                      {{ item.name }}
                    </el-radio-button>
                  </template>
                </el-radio-group>
              </el-form-item>

              <template v-if="carousel_drawing_type == 1">
                <el-form-item label="图文详情:">
                  <vue-html5-editor :content="initData" auto-height @change="updateData"></vue-html5-editor>
                </el-form-item>
              </template>

              <template v-else-if="carousel_drawing_type == 2">
                <el-form-item label="商品款号:">
                  <el-tooltip class="item" effect="dark" content="输入的商品款号将与此轮播图关联,下方会展示此款商品的缩略图,请核实!" placement="right-start">
                    <el-input
                      placeholder="请输入"
                      v-model="model"
                      :maxlength="20"
                      icon="search"
                      :on-icon-click="getShopIdThumbImg"
                      style="width: 217px;">
                    </el-input>
                  </el-tooltip>
                </el-form-item>

                <el-form-item label="商品缩略图">

                  <el-row>
                    <el-col :span="8">
                      <el-card :body-style="{ height: '150px'}">
                        <template v-if="model_img != ''">
                          <img :src="model_img" alt="商品缩略图" width="150">
                        </template>
                      </el-card>
                    </el-col>
                  </el-row>

                </el-form-item>
              </template>

              <template v-if="carousel_drawing_type == 3">
                <el-form-item label="视频地址:">
                  <el-tooltip class="item" effect="dark" content="请输入培训视频地址!" placement="right-start">
                    <el-input
                      placeholder="请输入"
                      v-model="carousel_drawing_video_url"
                      style="width: 217px;">
                    </el-input>
                  </el-tooltip>
                </el-form-item>
              </template>
              
              <el-button type="primary" @click="phpPostData">创建轮播图</el-button>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="轮播图列表" name="carouselDrawingList">
            <el-row :gutter="10">
              <el-form   
                label-position="right" label-width="90px">

                <el-col :span="7">
                  <el-form-item label="轮播图类型:">
                    <el-select v-model="search_carousel_drawing_type" clearable  placeholder="请选择">
                      <el-option
                        v-for="item in carousel_drawing_type_list"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="7">
                  <el-form-item label="轮播图位置:">
                    <el-select v-model="search_location" clearable  placeholder="请选择">
                      <el-option
                        v-for="item in location_type_list"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="7">
                  <el-form-item label="关键字:">
                    <el-input
                      placeholder="请输入轮播图名称关键字"
                      v-model="search_name"
                      :maxlength="20">
                    </el-input>
                  </el-form-item>
                </el-col>
                
                <el-col :span="3">
                  <el-row type="flex" justify="end">
                    <el-tooltip class="item" effect="dark" content="立即搜索" placement="top">
                      <el-button type="primary" icon="search" @click="userSearchData(1)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="新增轮播图" placement="top">
                      <el-button type="primary" @click="tabCheck = 'addCarouselDrawing'"><i class="el-icon-upload el-icon--right"></i></el-button>
                    </el-tooltip>
                  </el-row>
                </el-col>
              </el-form>
            </el-row>

            <el-table
              :data="search_get_carousel_drawing_list_data"
              stripe
              style="width: 100%">
              <el-table-column
                fixed
                prop="name"
                label="轮播图名称"
                header-align="center"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="type_name"
                label="轮播图类型"
                header-align="center"
                align="center">
              </el-table-column>
              <el-table-column
                prop="location_name"
                label="轮播图位置"
                header-align="center"
                align="center">
              </el-table-column>
              <el-table-column
                label="操作"
                header-align="center"
                align="center">
                <template scope="scope">
                  <template v-if="scope.row.status == '1'">
                    <el-tooltip class="item" effect="dark" content="点击禁用轮播图" placement="left">
                      <el-button
                        @click.native.prevent="forbiddenOrStartUsing(scope.row.id,scope.row.status)"
                        type="text"
                        size="small"
                        style="color: #bfcbd9;">
                        禁用
                      </el-button>
                    </el-tooltip>
                  </template>
                  <template v-else>
                    <el-tooltip class="item" effect="dark" content="点击启用轮播图" placement="left">
                      <el-button
                        @click.native.prevent="forbiddenOrStartUsing(scope.row.id,scope.row.status)"
                        type="text"
                        size="small">
                        启用
                      </el-button>
                    </el-tooltip>
                  </template>
                  <el-button
                    type="text"
                    size="small"
                    @click.native.prevent="getModificationData(scope.row.id)">
                    编辑
                  </el-button>
                  <el-button
                    @click.native.prevent="deleteCarouseDrawing(scope.$index, scope.row, search_get_carousel_drawing_list_data)"
                    type="text"
                    size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <el-row type="flex" justify="end">
              <el-pagination
                small
                layout="prev, pager, next"
                :total="20*pages"
                :page-size="20"
                :current-page="current_page"
                class="pageination"
                @current-change="handleCurrentChange">
              </el-pagination>
            </el-row>

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog title="修改轮播图" v-model="modification.dialogFormVisible">
      <el-form   
        label-position="left" label-width="120px">
        <el-form-item label="轮播图名称">
          <el-input
            placeholder="请输入轮播图名称"
            v-model="modification.name"
            :maxlength="20"
            disabled
            style="width: 217px;">
          </el-input>
        </el-form-item>
        
        <el-form-item label="上传轮播图:">
          <el-upload
            class="avatar-uploader"
            :action="uploadAddCarouselDrawing"
            name="image_url"
            :on-success="modificationAddCarouselDrawingImg"
            :on-error="uploadError"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false">
            <img v-if="modification.imageUrl" :src="modification.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="轮播图位置:">
          <el-select v-model="modification.location" placeholder="请选择">
            <el-option
              v-for="item in location_type_list"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="轮播图类型:">
          <el-radio-group v-model="modification.carousel_drawing_type">
            <el-button type="primary">{{ modification.carousel_drawing_type_name }}</el-button>
          </el-radio-group>
        </el-form-item>

        <template v-if="modification.carousel_drawing_type == 1">
          <el-form-item label="图文详情:">
            <vue-html5-editor :content="modification.initData" auto-height @change="modificationUpdateData"></vue-html5-editor>
          </el-form-item>
        </template>

        <template v-else-if="modification.carousel_drawing_type == 2">
          <el-form-item label="商品款号:">
            <el-tooltip class="item" effect="dark" content="输入的商品款号将与此轮播图关联,下方会展示此款商品的缩略图,请核实!" placement="right-start">
              <el-input
                placeholder="请输入"
                v-model="modification.model"
                :maxlength="20"
                icon="search"
                :on-icon-click="modificationGetShopIdThumbImg"
                style="width: 217px;">
              </el-input>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="商品缩略图">

            <el-row>
              <el-col :span="8">
                <el-card>
                  <template v-if="modification.model_img != ''">
                    <img :src="modification.model_img" alt="商品缩略图" class="img">
                  </template>
                </el-card>
              </el-col>
            </el-row>

          </el-form-item>
        </template>

        <template v-if="modification.carousel_drawing_type == 3">
          <el-form-item label="视频地址:">
            <el-tooltip class="item" effect="dark" content="请输入培训视频地址!" placement="right-start">
              <el-input
                placeholder="请输入"
                v-model="modification.carousel_drawing_video_url"
                style="width: 217px;">
              </el-input>
            </el-tooltip>
          </el-form-item>
        </template>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modification.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modificationPhpPostData">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
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
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-icon--right {
    margin-left: 0px !important; 
  }
  .pageination{
    margin-top: 15px;
  }
  .img{
    width: 100%;
  }
</style>

<script>
  import * as API from '../assets/axios/api.js'
  export default{
    name: 'addCarouselDrawing',

    created: function () {
      // 后台获取轮播图位置
      this.getLocationTypeList()

      // 后台获取轮播图类型
      this.getcarouselDrawingTypeList()
    },
    data () {
      return {
        // 最终上传数据
        addCarouselDrawing: 'Shop/addCarouselDrawing',

        // 轮播图位置接口
        location_type_api: 'Shop/getCarouselDrawingLocation',

        // 轮播图类型接口
        carousel_drawing_type_api: 'Shop/getCarouselDrawingType',

        // 获取置顶商品的缩略图
        shop_id_thumb_img_api: 'Shop/getThumbWithModel',

        // 搜索数据 列表
        carousel_drawing_list_data_api: 'Shop/listCarouselDrawing',

        // 修改轮播图
        modification_api: 'Shop/modifyCarouselDrawing',

        // 启用禁用
        handleCarouselDrawing: 'Shop/handleCarouselDrawing',

        // 删除轮播图
        removeCarouselDrawing: 'Shop/removeCarouselDrawing',

        // tab页切换 addCarouselDrawing carouselDrawingList
        tabCheck: 'addCarouselDrawing',

        // 轮播图名称
        name: '',

        // 轮播图位置列表
        location_type_list: [],

        // 轮播图位置
        location: '',

        // 轮播图类型列表
        carousel_drawing_type_list: [],

        // 轮播图类型
        carousel_drawing_type: '',

        // 轮播图地址
        carousel_drawing_url: '',

        // 轮播图实例
        imageUrl: '',

        // 富文本
        initData: '',

        // 最终提交的富文本
        newDetails: '',

        // 关联商品款号
        model: '',

        // 商品缩略图
        model_img: '',

        // 视频地址
        carousel_drawing_video_url: '',

        // 轮播图列表
        // 后台获取数据列表
        search_get_carousel_drawing_list_data: [],

        // 总页数
        pages: '',

        // 当前页
        current_page: 1,

        // 轮播图类型
        search_carousel_drawing_type: '',

        // 轮播图位置
        search_location: '',

        // 轮播图名字
        search_name: '',

        // 弹出框 修改页面
        modification: {

          // 修改商品id
          carousel_drawing_id: '',

          // 后台获取数据
          phpGetmodificationData: [],

          // 弹出层展示控制
          dialogFormVisible: false,

          // 轮播图名称
          name: '',

          // 轮播图实例
          imageUrl: '',

          // 轮播图地址
          carousel_drawing_url: '',

          // 轮播图位置
          location: '',

          // 轮播图类型
          carousel_drawing_type: '',

          // 轮播图类型名称
          carousel_drawing_type_name: '',

           // 富文本
          initData: '',

          // 最终提交的富文本
          newDetails: '',

          // 商品款号
          model: '',

          // 商品缩略图
          model_img: '',

          // 视频地址
          carousel_drawing_video_url: ''
        },
        // 文件上传
        uploadAddCarouselDrawing: API.uploadAddCarouselDrawing
      }
    },

    methods: {

      // 获取轮播图列表
      getCarouselDrawingList (tab, event) {
        if (tab.label === '轮播图列表') {
          // statement
          console.log('轮播图列表')
          // 初始化获取列表数据
          this.getCarouselDrawingListData()
        } else {
          window.location.reload()
          console.log('新增轮播图')
        }
      },

      // 上传轮播图
      addCarouselDrawingImg (response, file) {
        console.log(response)
        if (response.flag >> 0 === 1000) {
          // statement
          this.consoleSuccess(`轮播图上传成功${response.return_code}`)
          this.imageUrl = window.URL.createObjectURL(file.raw)
          this.carousel_drawing_url = response.file_url
        } else {
          this.consoleError(response.return_code)
        }
      },

      // 检验图片
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 1
        if (!isLt2M) {
          this.consoleError(`上传图片大小不能超过 1MB!`)
        }
        return isLt2M
      },

       // 文件上传失败
      uploadError () {
        this.consoleError('上传文件有误!请重新上传!')
      },

      // 富文本每次改变的回调 更新数据
      updateData (data) {
        this.newDetails = data
      },

      // 后台获取轮播图位置
      getLocationTypeList () {
        this.$axios.post(this.location_type_api)
        .then(msg => {
          if (msg.data.flag >> 0 === 1000) {
            // statement
            console.log('轮播图位置', msg.data)
            this.consoleSuccess(`获取轮播图位置${msg.data.return_code}`)
            this.location_type_list = msg.data.location_list
          } else {
            this.consoleError(msg.data.return_code)
          }
        }, response => {
          this.consoleError(response.return_code)
        })
      },

      // 后台获取轮播图类型
      getcarouselDrawingTypeList () {
        this.$axios.post(this.carousel_drawing_type_api)
        .then(msg => {
          if (msg.data.flag >> 0 === 1000) {
            // statement
            console.log('轮播图类型', msg.data)
            this.consoleSuccess(`获取轮播图类型${msg.data.return_code}`)
            this.carousel_drawing_type_list = msg.data.type_list
          } else {
            this.consoleError(msg.data.return_code)
          }
        }, response => {
          this.consoleError(response.return_code)
        })
      },

      // 获取指定商品对应缩略图
      getShopIdThumbImg () {
        this.$axios.post(this.shop_id_thumb_img_api, {
          model: this.model
        })
        .then(msg => {
          if (msg.data.flag >> 0 === 1000) {
            // statement
            console.log(msg.data)
            this.model_img = msg.data.thumb_image
            this.consoleSuccess(msg.data.return_code)
          } else {
            this.consoleError(msg.data.return_code)
          }
        }, response => {
          this.consoleError(response.return_code)
        })
      },

      // 添加轮播图
      phpPostData () {
        const type = this.carousel_drawing_type >> 0
        console.log(this.name)
        if (this.name) {
          if (this.location) {
            if (this.carousel_drawing_url) {
              if (this.carousel_drawing_type) {
                switch (type) {
                  // 轮播图类型 图文
                  case 1:
                    if (this.newDetails) {
                      this.$axios.post(API.addCarouselDrawing, {
                        'name': this.name,
                        'carousel_drawing_url': this.carousel_drawing_url,
                        'location': this.location,
                        'carousel_drawing_type': this.carousel_drawing_type,
                        'description': this.newDetails
                      })
                      .then(msg => {
                        if (msg.data.flag >> 0 === 1000) {
                          this.consoleSuccess(`创建轮播图${msg.data.return_code}`)
                          setTimeout(() => {
                            this.tabCheck = 'carouselDrawingList'
                            // 初始化获取列表数据
                            this.getCarouselDrawingListData()
                          }, 1000)
                        } else {
                          this.consoleError(`${msg.data.return_code}`)
                        }
                      }, response => {
                        this.consoleError(`${response.return_code}`)
                      })
                    } else {
                      this.consoleError(`请完善图文详情!`)
                    }
                    break

                  // 轮播图类型 商品
                  case 2:
                    if (this.model) {
                      this.$axios.post(API.addCarouselDrawing, {
                        'name': this.name,
                        'carousel_drawing_url': this.carousel_drawing_url,
                        'location': this.location,
                        'carousel_drawing_type': this.carousel_drawing_type,
                        'description': this.model
                      })
                      .then(msg => {
                        if (msg.data.flag >> 0 === 1000) {
                          this.consoleSuccess(`创建轮播图${msg.data.return_code}`)
                          setTimeout(() => {
                            this.tabCheck = 'carouselDrawingList'
                            // 初始化获取列表数据
                            this.getCarouselDrawingListData()
                          }, 1000)
                        } else {
                          this.consoleError(`${msg.data.return_code}`)
                        }
                      }, response => {
                        this.consoleError(`${response.return_code}`)
                      })
                    } else {
                      this.consoleError(`请输入需要绑定的商品款号!`)
                    }
                    break

                  // 轮播图类型 视频
                  case 3:
                    if (this.carousel_drawing_video_url) {
                      this.$axios.post(API.addCarouselDrawing, {
                        'name': this.name,
                        'carousel_drawing_url': this.carousel_drawing_url,
                        'location': this.location,
                        'carousel_drawing_type': this.carousel_drawing_type,
                        'description': this.carousel_drawing_video_url
                      })
                      .then(msg => {
                        if (msg.data.flag >> 0 === 1000) {
                          this.consoleSuccess(`创建轮播图${msg.data.return_code}`)
                          setTimeout(() => {
                            this.tabCheck = 'carouselDrawingList'
                            // 初始化获取列表数据
                            this.getCarouselDrawingListData()
                          }, 1000)
                        } else {
                          this.consoleError(`${msg.data.return_code}`)
                        }
                      }, response => {
                        this.consoleError(`${response.return_code}`)
                      })
                    } else {
                      this.consoleError(`请输入视频地址!`)
                    }
                    break
                }
              } else {
                this.consoleError(`请选择轮播图类型!`)
              }
            } else {
              this.consoleError(`请上传图片!`)
            }
          } else {
            this.consoleError(`请选择轮播图位置!`)
          }
        } else {
          this.consoleError(`请输入轮播图名称!`)
        }
      },

      // 获取数据
      getCarouselDrawingListData (current_page) {
        this.$axios.post(this.carousel_drawing_list_data_api, {
          'name': this.search_name,
          'location': this.search_location,
          'carousel_drawing_type': this.search_carousel_drawing_type,
          'current_page': current_page || this.current_page
        })
        .then(msg => {
          if (msg.data.flag >> 0 === 1000) {
            console.log(msg.data)
            this.consoleSuccess(`轮播图获取成功${msg.data.return_code}`)

            // 列表数据
            this.search_get_carousel_drawing_list_data = msg.data.carousel_drawing_list

            // 总页数
            this.pages = msg.data.pages

            // 当前页
            this.current_page = msg.data.current_page
          } else {
            this.consoleError(`${msg.data.return_code}`)
            this.search_get_carousel_drawing_list_data = []
          }
        }, response => {
          this.consoleError(`${response.return_code}`)
        })
      },

      // 用户点击搜索数据
      userSearchData (current_page) {
        if (this.search_name || this.search_location || this.search_carousel_drawing_type) {
          this.getCarouselDrawingListData(current_page)
        } else {
          this.consoleError(`至少一条搜索项不为空!`)
        }
      },

      // 删除
      deleteCarouseDrawing (index, row, rows) {
        console.log(row)
        if (window.confirm('确认删除吗?')) {
          this.$axios.post(this.removeCarouselDrawing, {
            'carousel_drawing_id': row.id
          })
          .then(msg => {
            if (msg.data.flag >> 0 === 1000) {
              // statement
              // 获取当前页的总条数
              // 保护用户删除某一页最后一条后 依旧请求当前页数据 返回空数据
              // 若当前页--后小于零 则请求第一页
              const number_of_branches = rows.length
              console.log(number_of_branches)
              if (number_of_branches === 1) {
                let current_page = this.current_page
                if (--current_page <= 1) {
                  this.getCarouselDrawingListData()
                } else {
                  this.getCarouselDrawingListData(--current_page)
                }
              } else {
                this.getCarouselDrawingListData()
              }
            } else {
              this.consoleError(`${msg.data.return_code}`)
            }
          }, response => {
            this.consoleError(`${response.data.return_code}`)
          })
        }
      },

      // 分页
      handleCurrentChange (val) {
        console.log(`当前页${val}`)
        this.current_page = val
        this.getCarouselDrawingListData()
      },

      // 修改轮播图获取数据
      getModificationData (id) {
        console.log(`获取修改id:${id}`)
        this.modification.carousel_drawing_id = id
        this.$axios.post(this.modification_api, {
          carousel_drawing_id: id
        })
        .then(msg => {
          if (msg.data.flag >> 0 === 1000) {
            // statement
            this.consoleSuccess(`修改数据获取${msg.data.return_code}`)

            // 显示弹出层
            this.modification.dialogFormVisible = true

            // 保存数据到本地
            this.modification.phpGetmodificationData = msg.data.carousel_drawing_detail

            // 绑定数据
            this.modification.name = this.modification.phpGetmodificationData.name

            this.modification.imageUrl = this.modification.phpGetmodificationData.url

            this.modification.location = this.modification.phpGetmodificationData.location

            this.modification.carousel_drawing_type = this.modification.phpGetmodificationData.type

            this.modification.carousel_drawing_type_name = this.modification.phpGetmodificationData.type_name
         
            if (this.modification.carousel_drawing_type === 1) {
              this.modification.newDetails = this.modification.phpGetmodificationData.value
              this.modification.initData = this.modification.phpGetmodificationData.value
            } else if (this.modification.carousel_drawing_type === 2) {
              this.modification.model = this.modification.phpGetmodificationData.value
              this.modificationGetShopIdThumbImg()
            } else if (this.modification.carousel_drawing_type === 3) {
              this.modification.carousel_drawing_video_url = this.modification.phpGetmodificationData.value
            }
          } else {
            this.consoleError(`${msg.data.return_code}`)
          }
        }, response => {
          this.consoleError(`${response.return_code}`)
        })
      },

      // 修改
      // 上传轮播图
      modificationAddCarouselDrawingImg (response, file) {
        console.log(response)
        if (response.flag >> 0 === 1000) {
          this.consoleSuccess(`轮播图上传成功${response.return_code}`)
          this.modification.imageUrl = window.URL.createObjectURL(file.raw)
          this.modification.carousel_drawing_url = response.file_url
        } else {
          this.consoleError(response.return_code)
        }
      },

      // 富文本每次改变的回调 更新数据
      modificationUpdateData (data) {
        this.modification.newDetails = data
      },

      // 获取指定商品对应缩略图
      modificationGetShopIdThumbImg () {
        this.$axios.post(this.shop_id_thumb_img_api, {
          model: this.modification.model
        })
        .then(msg => {
          if (msg.data.flag >> 0 === 1000) {
            // statement
            console.log(msg.data)
            this.modification.model_img = msg.data.thumb_image
            this.consoleSuccess(msg.data.return_code)
          } else {
            this.consoleError(msg.data.return_code)
          }
        }, response => {
          this.consoleError(response.return_code)
        })
      },

      // 上传修改后的数据请求
      modificationPhpPostData () {
        const type = this.modification.carousel_drawing_type >> 0
        if (this.modification.name) {
          if (this.modification.location) {
            if (this.modification.carousel_drawing_url || this.modification.imageUrl) {
              if (this.modification.carousel_drawing_type) {
                switch (type) {
                  // 轮播图类型 图文
                  case 1:
                    if (this.modification.newDetails) {
                      this.$axios.post(this.modification_api, {
                        'request_flag': 'modify',
                        'carousel_drawing_id': this.modification.carousel_drawing_id,
                        'name': this.modification.name,
                        'carousel_drawing_url': this.modification.carousel_drawing_url || this.modification.imageUrl,
                        'location': this.modification.location,
                        'carousel_drawing_type': this.modification.carousel_drawing_type,
                        'description': this.modification.newDetails
                      })
                      .then(msg => {
                        if (msg.data.flag >> 0 === 1000) {
                          this.consoleSuccess(`创建轮播图${msg.data.return_code}`)
                          this.modification.dialogFormVisible = false
                          this.getCarouselDrawingListData()
                        } else {
                          this.consoleError(`${msg.data.return_code}`)
                        }
                      }, response => {
                        this.consoleError(`${response.return_code}`)
                      })
                    } else {
                      this.consoleError(`请完善图文详情!`)
                    }
                    break

                  // 轮播图类型 商品
                  case 2:
                    if (this.modification.model) {
                      this.$axios.post(this.modification_api, {
                        'request_flag': 'modify',
                        'carousel_drawing_id': this.modification.carousel_drawing_id,
                        'name': this.modification.name,
                        'carousel_drawing_url': this.modification.carousel_drawing_url || this.modification.imageUrl,
                        'location': this.modification.location,
                        'carousel_drawing_type': this.modification.carousel_drawing_type,
                        'description': this.modification.model
                      })
                      .then(msg => {
                        if (msg.data.flag >> 0 === 1000) {
                          this.consoleSuccess(`创建轮播图${msg.data.return_code}`)
                          this.modification.dialogFormVisible = false
                          this.getCarouselDrawingListData()
                        } else {
                          this.consoleError(`${msg.data.return_code}`)
                        }
                      }, response => {
                        this.consoleError(`${response.return_code}`)
                      })
                    } else {
                      this.consoleError(`请输入需要绑定的商品款号!`)
                    }
                    break

                  // 轮播图类型 视频
                  case 3:
                    if (this.modification.carousel_drawing_video_url) {
                      this.$axios.post(this.modification_api, {
                        'request_flag': 'modify',
                        'carousel_drawing_id': this.modification.carousel_drawing_id,
                        'name': this.modification.name,
                        'carousel_drawing_url': this.modification.carousel_drawing_url || this.modification.imageUrl,
                        'location': this.modification.location,
                        'carousel_drawing_type': this.modification.carousel_drawing_type,
                        'description': this.modification.carousel_drawing_video_url
                      })
                      .then(msg => {
                        if (msg.data.flag >> 0 === 1000) {
                          this.consoleSuccess(`创建轮播图${msg.data.return_code}`)
                          this.modification.dialogFormVisible = false
                          this.getCarouselDrawingListData()
                        } else {
                          this.consoleError(`${msg.data.return_code}`)
                        }
                      }, response => {
                        this.consoleError(`${response.return_code}`)
                      })
                    } else {
                      this.consoleError(`请输入视频地址!`)
                    }
                    break
                }
              } else {
                this.consoleError(`请选择轮播图类型!`)
              }
            } else {
              this.consoleError(`请上传图片!`)
            }
          } else {
            this.consoleError(`请选择轮播图位置!`)
          }
        } else {
          this.consoleError(`请输入轮播图名称!`)
        }
      },

      // 轮播图禁用 启用
      forbiddenOrStartUsing (id, status) {
        console.log(`${id}${status}`)
        this.$axios.post(this.handleCarouselDrawing, {
          'carousel_drawing_id': id,
          'carousel_drawing_status': (status.toString() === '1' ? '0' : '1')
        })
        .then(msg => {
          if (msg.data.flag >> 0 === 1000) {
            // statement
            this.consoleSuccess(`${msg.data.return_code}`)
            this.getCarouselDrawingListData()
          } else {
            this.consoleError(`${msg.data.return_code}`)
          }
        }, response => {
          this.consoleError(`${response.data.return_code}`)
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

<style lang="less">
#addCarouselDrawing{
  .steps{
    height: auto;
    width: 100%;
    margin-top: 100px;
  }
}
</style>