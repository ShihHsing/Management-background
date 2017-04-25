<template>
  <div id="modificationMerchandise">
    <el-row type="flex" class="steps" justify="end">
      <el-col :span="20">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
          <el-step title="步骤 4"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="11">
        <el-carousel 
          indicator-position="none"
          arrow="never"
          :autoplay="false"
          ref="elCarousel">
          <!-- 第一页 -->
          <!-- 第一页 End -->

          <!-- 第二页 -->
          <el-carousel-item id="none-align-items">
          <!-- 由于 align-items: center; 影响无法展示全部内容 不再设置父元素高度-->
            <el-form 
              :model="two" 
              :rules="twoRules" 
              ref="two"
              label-width="100px">
              <el-card class="box-card">
                <el-form-item label="商品标题" prop="commodityTitle">
                  <el-input type="textarea" v-model="two.commodityTitle" placeholder="请输入商品标题"></el-input>
                </el-form-item>

                <el-form-item label="商品简介" prop="commodityIntroduction">
                  <el-input type="textarea" v-model="two.commodityIntroduction" placeholder="请输入商品简介"></el-input>
                </el-form-item>
                
                <el-form-item label="商品款号" prop="commodityNumber">
                  <el-input type="textarea" v-model="two.commodityNumber" placeholder="请输入商品款号"></el-input>
                </el-form-item>
        
                <el-form-item label="商品条码" prop="commodityBarcode">
                  <el-input type="textarea" v-model="two.commodityBarcode" placeholder="请输入全球统一条形码"></el-input>
                </el-form-item>

                <el-form-item label="商品价格" prop="price">
                  <el-input v-model="two.price" placeholder="请输入商品价格"></el-input>
                </el-form-item>
                
                <el-form-item label="易企秀" prop="shop_show">
                  <el-input placeholder="请输入易企秀链接" v-model="two.shop_show">
                    
                  </el-input>
                </el-form-item>

                <div v-for="(item,index) in two.privateProperty">
                  <el-form-item :label="item.argument_value">
                    <el-select placeholder="请选择" v-model="two.privatePropertyList[index].attributeValue" v-on:change="getPrivatePropertyList();">
                      <el-option v-for="childItem in item.child_list" :label="childItem.argument_value" :value="childItem.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div >
      
                <el-form-item>
                  <el-button type="primary" @click="submitForm('two')">下一步</el-button>
                </el-form-item>
              </el-card>
            </el-form>
          </el-carousel-item>
          <!-- 第二页 End -->

          <!-- 第三页 -->
          <el-carousel-item>
            <el-form 
              :model="three"
              ref="three">
              <el-card class="box-card">
                <el-form-item label="商品列表图"></br>
                  <el-upload
                    class="upload-demo"
                    :action="uploadAddNewerGoodsInfo"
                    list-type="picture"
                    :on-success="handleSuccess1"
                    :on-error="uploadError"
                    :multiple="false"
                    :file-list="three.thumb_image_file_list"
                    name="thumb_image"
                    ref="thumb_image">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">请上传图片大小为370*400像素尺寸jpg/png文件,且不超过500kb,列表图在商品库存、商家推荐及订单列表中显示</div>
                  </el-upload>
                </el-form-item>

                <el-form-item label="商品音频"></br>
                  <el-upload
                    class="upload-demo"
                    :action="uploadAddNewerGoodsInfo"
                    list-type="picture"
                    :on-success="handleSuccess2"
                    :on-error="uploadError"
                    :multiple="false"
                    :file-list="three.audio_file_list"
                    name="audio"
                    ref="audio">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">请上传小于1MB,且格式为MP3音乐</div>
                  </el-upload>
                </el-form-item>

                <el-form-item label="商品视频"></br>
                  <el-upload
                    class="upload-demo"
                    :action="uploadAddNewerGoodsInfo"
                    list-type="picture"
                    :on-success="handleSuccess3"
                    :on-error="uploadError"
                    :multiple="false"
                    :file-list="three.video_file_list"
                    name="video"
                    ref="video">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">请上传小于4MB,且格式为MP4的视频</div>
                  </el-upload>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('three')">下一步</el-button>
                </el-form-item>
              </el-card>
            </el-form>
          </el-carousel-item>
          <!-- 第三页 End -->

          <!-- 第四页 -->
          <el-carousel-item>
            <!-- 由于 align-items: center; 影响无法展示全部内容 不再设置父元素高度-->
            <el-form 
              :model="four"
              ref="four"
              label-width="100px">
              <el-card class="box-card">
                <el-form-item label="颜色分类">
                  <el-checkbox-group v-model="four.checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in four.cities" :label="city">{{city}}</el-checkbox>
                  </el-checkbox-group>
                  <div style="color: #666">请选择需要修改或添加的颜色以及图片,若无需修改请勿操作!原有颜色以及商品颜色图片<el-button type="text" @click="four.dialogVisible = true">点击查看</el-button></div>
                </el-form-item>


                <el-form-item label="尺码">
                  <el-checkbox-group v-model="four.checkedSize" @change="handleCheckedCitiesChangeSize">
                    <el-checkbox v-for="city in four.size_list" :label="city">{{city}}</el-checkbox>
                  </el-checkbox-group>
                  <div style="color: #666">若您需要的尺码不在此分类请移步至<router-link to="/goodsPrivateSize">商品私有尺码</router-link>添加</div>
                </el-form-item>

                <el-form-item label="商品图片">
                  <div v-for="(city,index) in four.checkedCities">
                  <!-- action冒号问题 -->
                   <el-upload
                      class="upload-demo"
                      :action="uploadAddNewerGoodsInfo"
                      :thumbnail-mode="true"
                      :multiple="false"
                      :on-success="colorAndImgSuccess"
                      :on-error="uploadError"
                      name="normal_image"
                      :data="{'imgColor': four.checkedCities[index]}"
                      ref="normal_image"
                      list-type="picture">
                      <el-button size="small" type="primary">请上传<em>{{ four.checkedCities[index] }}</em>商品的商品图片</el-button>
                      <div class="el-upload__tip" style="color:#555;" slot="tip">请上传<b style="color:#20A0FF;">{{ four.checkedCities[index] }}</b>商品的商品图片,并只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </div>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('four')">下一步</el-button>
                </el-form-item>
              </el-card>
            </el-form>
          </el-carousel-item>
          <!-- 第四页 End -->
          <el-carousel-item>
            <!-- 由于 align-items: center; 影响无法展示全部内容 不再设置父元素高度-->
            <el-form 
              :model="four"
              ref="four"
              label-width="47%">
              <el-card class="box-card">
                <vue-html5-editor :content="description" :height="500" @change="updateData"></vue-html5-editor>
                <div style="color: #666;width: 100%;text-align: center;margin-bottom: 35px;">商品详情图片大小不能超过1M,否则会导致添加商品失败</div>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('End')">下一步</el-button>
                </el-form-item>
              </el-card>
            </el-form>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <!-- 颜色以及图片[旧] -->
    <el-dialog title="操作说明" v-model="four.dialogVisible" size="tiny">
      <span>1.原有颜色以及商品颜色图片</span></br>
      <span>2.若要修过或者新增请关闭操作说明,在修改页面选择颜色后上传</span></br>
      <span>3.若不需要某一颜色图片,请点击删除!</span></br>
      <span>4.若无需修改请勿操作!</span></br>
      <el-table
        :data="goods_detail.image_url"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="color_name"
          label="颜色">
        </el-table-column>
        <el-table-column
          label="图片">
          <template scope="scope">
            <img width="100%" height="auto" :src="scope.row.image_url" alt="商品颜色图">
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button size="small" type="danger" @click.native.prevent="removerColor(scope.row.color_name,scope.$index);">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="four.dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="four.dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '../assets/axios/api.js'
// 样式文件
import '../assets/style/modificationMerchandise.less'
// 脚本文件
export default {
  name: 'modificationMerchandise',
  data () {
    return {
      active: 0,
      uploadAddNewerGoodsInfo: API.uploadAddNewerGoodsInfo,
      // 初始化获取商品ID
      shopID: '',
      // 服务器获取商品详情
      goods_detail: [],
      // ////
      //  //
      // ////
      one: {
        // 商品品牌
        commodityBrand: '',
        commodityBrandList: [],
        // 商品分类
        commodityClassification: '',
        commodityClassificationList: []
      },
      two: {
        // 商品标题
        commodityTitle: '',
        // 商品简介
        commodityIntroduction: '',
        // 商品款号
        commodityNumber: '',
        // 商品条码
        commodityBarcode: '',
        // 商品价格
        price: '',
        // 易企秀
        shop_show: '',
        // 私有属性 服务器端获取数据
        privateProperty: [],
        // 生成新的数据结构
        privatePropertyList: []
      },
      three: {
        // 商品列表图
        thumb_image: false,
        // 服务器获取地址
        thumb_image_file_list: [],
        // 商品列表图地址
        thumb_image_url: '',
        // 商品列表图数据
        thumb_imageList: [],
        // 音频
        audio: false,
        // 服务器获取地址
        audio_file_list: [],
        // 商品音频地址
        audio_url: '',
        // 商品音频数据
        audioList: [],
        // 视频
        video: false,
        // 服务器获取地址
        video_file_list: [],
        // 商品视频地址
        video_url: '',
        // 商品视频数据
        videoList: []
      },
      four: {
        // 用于实现颜色全选效果
        checkAll: false,
        isIndeterminate: false,
        // 服务端获取颜色数组
        cities: [],
        // 服务端保存颜色数据
        colorList: [],
        // 用户选择的颜色
        checkedCities: [],
        // 动态生成颜色图片对应关系数据模型
        colorAndImg: [],
        // 用于尺码颜色全选效果
        checkAllSize: false,
        isIndeterminateSize: false,
        // 用户选择的尺码
        checkedSize: [],
        // 服务端获取尺寸数组
        size_list: [],
        // 服务端获取尺寸源数据
        sizeList: [],
        // 消息提示控件
        dialogVisible: false
      },
      // 用户操作颜色历史记录
      userColorHistoricalRecord: [],
      // 旧商品详情
      description: '',
      // 新商品详情
      newDescription: '',
      // 第一页验证规则
      oneRules: {
        commodityBrand: [
          { required: true, message: '请选择商品品牌', trigger: 'change' }
        ],
        commodityClassification: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ]
      },
      // 第二页验证规则
      twoRules: {
        commodityTitle: [
          { required: true, message: '请输入商品标题', trigger: 'change' }
        ],
        commodityIntroduction: [
          { required: true, message: '请输入商品简介', trigger: 'change' }
        ],
        commodityNumber: [
          { required: true, message: '请输入商品款号', trigger: 'change' }
        ],
        commodityBarcode: [
          { required: true, message: '请输入商品条码', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'change' }
        ]
        // shop_show: [
        //   { required: true, message: '请输入易企秀链接', trigger: 'change' }
        // ]
      },
      elCarousel: ''
    }
  },

  created: function () {
    // 获取商品ID
    this.shopID = this.$route.query.shopID
    // 获取商品详情
    this.getGoodsDetail()
  },

  methods: {
    // 富文本数据更新
    // 如果用户操则会更新数据
    // 第一次进入初始化 为上传准确性
    // 最终上传以 newDescription 数据为准
    updateData (data) {
      this.newDescription = data
    },
    // 获取商品详细信息
    getGoodsDetail () {
      if (this.shopID !== '') {
        // statement
        this.$axios.post(API.modifyNewerGoodsInfo, {
          'goods_id': this.$route.query.shopID,
          'request_flag': 'goods_detail'
        })
        .then((msg) => {
          if (msg.data.flag >> 0 === 1000) {
            console.log(msg.data)
            if (msg.data.goods_detail !== '' || msg.data.goods_detail !== 'null') {
              // statement
              var goods_detail = msg.data.goods_detail
              this.goods_detail = goods_detail
              // statement
              // 商品品牌
              this.one.commodityBrand = goods_detail.product_id
              // 商品分类
              this.one.commodityClassification = goods_detail.category_id
              // 商品标题
              this.two.commodityTitle = goods_detail.title
              // 商品简介
              this.two.commodityIntroduction = goods_detail.sub_title
              // 商品款号
              this.two.commodityNumber = goods_detail.model
              // 商品条码
              this.two.commodityBarcode = goods_detail.code
              // 商品价格
              this.two.price = goods_detail.price
              // 易企秀
              this.two.shop_show = goods_detail.show_url
              // 商品列表图
              if (goods_detail.thumb_image !== '无') {
                this.three.thumb_image_file_list = [{
                  name: '商品列表图.jpg(若修改请删除后重新添加!)',
                  url: goods_detail.thumb_image
                }]
              }
              this.three.thumb_image_url = goods_detail.thumb_image
              // 商品音频
              if (goods_detail.audio !== '无') {
                this.three.audio_file_list = [{
                  name: '商品音频.mp3(若修改请删除后重新添加!)',
                  url: goods_detail.audio
                }]
                this.three.audio_url = goods_detail.audio
              }
              // 商品视频
              if (goods_detail.video !== '无') {
                this.three.video_file_list = [{
                  name: '商品视频.mp4(若修改请删除后重新添加!)',
                  url: goods_detail.video
                }]
                this.three.video_url = goods_detail.video
              }

              // 尺码
              for (var i = 0; i < goods_detail.sub_args.length; i++) {
                if (goods_detail.sub_args[i].argument_name === '尺寸') {
                  this.four.checkedSize.push(goods_detail.sub_args[i].argument_value)
                }
              }

              // 图文详情数据
              this.description = goods_detail.description
              this.newDescription = this.description
              // 初始化获取商品品牌和商品分类
              this.getCommodityBrandAndCommodityClassification()
            } else {
              this.consoleNews('服务器发生未知错误,请刷新后重试!')
            }
          } else {
            // statement
            this.consoleError(msg.data.return_code)
          }
        })
        .catch(error => {
          this.consoleError(`服务器1${error.response}`)
        })
      } else {
        this.consoleError('获取商品详细信息失败!请稍后重试!')
      }
    },

    // 删除颜色图片
    removerColor (color, index) {
      console.log(color, index)
      // Array.prototype.remove = function (dx) {
      //   if (isNaN(dx) || dx > this.length) {
      //     return false
      //   }
      //   for (var i = 0, n = 0; i < this.length; i++) {
      //     if (this[i] !== this[dx]) {
      //       this[n++] = this[i]
      //     }
      //   }
      //   this.length -= 1
      // }
      this.four.cities.push(color)
      this.goods_detail.image_url.splice(index, 1)
    },

    // 下一步&提交数据
    submitForm (formName) {
      if (formName === 'three') {
        // if(!this.media()){
        //   this.consoleError('请完善必填信息');
        //   return false;
        // } else {
        this.active ++
        this.$refs.elCarousel.next()
        this.four.dialogVisible = true
        // }
      } else if (formName === 'four') {
        // var count = 0;
        // for (var i = 0; i < this.four.colorAndImg.length; i++) {
        //   if(this.four.colorAndImg[i].imgUrl !=''){
        //     count ++;
        //   }
        // }
        // if (this.four.checkedCities.length >= 0 && this.four.checkedSize.length > 0 && count == this.four.colorAndImg.length) {
          // statement
        this.active ++
        this.$refs.elCarousel.next()
        // } else {
        //   this.consoleError('请完善必填信息');
        //   return false;
        // }
      } else if (formName === 'End') {
        // statement
        // if (this.newDescription != '') {
          // statement
          // /////////////
          // 最终提交 //
          // ////////////
        this.postAddShopData()
        // } else {
        //   this.consoleError('请完善必填信息');
        //   return false;
        // }
      } else {
        // this.$refs[formName].validate((valid) => {
        //   console.log(2)
        //   if (valid) {
        if (formName === 'one') {
          // statement
          // 根据商品品牌和商品分类获取属性
          this.getShopStyle()
          // 获取颜色和尺寸
          this.getSizeColor()
        } else if (formName === 'two') {
          // /////////////
          // statement //
          // ////////////
          // console.log(this.twoReg())
          // if(!this.twoReg()){
          //   this.consoleError('请完善必填信息');
          //   return false;
          // }
        }
        this.active ++
        this.$refs.elCarousel.next()
      }
        //   else {
        //     this.consoleError('请完善必填信息');
        //   }
        // });
      // }
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
      if (formName === 'three') {
        // statement
        this.$refs.thumb_image.clearFiles()
        this.$refs.audio.clearFiles()
        this.$refs.video.clearFiles()
      }
    },

    // 商品列表图
    handleSuccess1 (response, file, fileList) {
      console.log(response)
      if (response.flag >> 0 === 1000) {
        // statement
        // false数据不存在 true数据上传成功
        this.three.thumb_image = false
        this.three.thumb_imageList = response
        this.three.thumb_image_url = response.file_url
        this.consoleSuccess(response.return_code)
      } else {
        this.three.thumb_image = true
        this.$refs.thumb_image.clearFiles()
        this.consoleError(response.return_code)
      }
    },

    // 商品音频
    handleSuccess2 (response, file, fileList) {
      console.log(response)
      if (response.flag >> 0 === 1000) {
        // statement
        // false数据不存在 true数据上传成功
        this.three.audio = false
        this.three.audioList = response
        this.three.audio_url = response.file_url
        this.consoleSuccess(response.return_code)
      } else {
        this.three.audio = true
        this.$refs.audio.clearFiles()
        this.consoleError(response.return_code)
      }
    },

    // 商品视频
    handleSuccess3 (response, file, fileList) {
      console.log(response)
      if (response.flag >> 0 === 1000) {
        // statement
        // false数据不存在 true数据上传成功
        this.three.video = false
        this.three.videoList = response
        this.three.video_url = response.file_url
        this.consoleSuccess(response.return_code)
      } else {
        this.three.video = true
        this.$refs.video.clearFiles()
        this.consoleError(response.return_code)
      }
    },

    // 获取商品品牌和商品分类
    getCommodityBrandAndCommodityClassification () {
      var _this = this
      this.$axios.post(API.addNewerGoodsInfo, {
        request_flag: 'product_list'
      })
      .then((msg) => {
        console.log(msg.data, '获取商品品牌和商品分类')
        // 商品品牌列表
        var product_list = msg.data.product_list
        _this.one.commodityBrandList = product_list
        // 商品分类列表
        var category_list = msg.data.category_list
        _this.one.commodityClassificationList = category_list

        // 根据商品品牌和商品分类获取属性
        this.getShopStyle()
        // 获取颜色和尺寸
        this.getSizeColor()
      })
      .catch(error => {
        this.consoleError(`服务器2${error.response}`)
      })
    },

    // 根据商品品牌和商品分类获取属性
    getShopStyle () {
      var _this = this
      this.$axios.post(API.addNewerGoodsInfo, {
        request_flag: 'arguments_list',
        product_id: this.one.commodityBrand,
        category_id: this.one.commodityClassification
      })
      .then((msg) => {
        console.log(msg.data)
        if (msg.data.flag >> 0 === 1000) {
          // statement
          // 获取数据信息 渲染页面
          _this.two.privateProperty = msg.data.category_arguments_list.category_argument_list

          for (let i = 0; i < this.two.privateProperty.length; i++) {
            // 接收服务器信息 向原有数据模型动态添加新模型
            var newAttribute = {
              attribute: this.two.privateProperty[i].argument_value,
              attributeValue: ''
            }
            this.two.privatePropertyList.push(newAttribute)
          }
          console.log(this.two)

          // 分类属性选择
          for (let i = 0; i < this.goods_detail.sub_args.length; i++) {
            for (let ii = 0; ii < this.two.privatePropertyList.length; ii++) {
              if (this.goods_detail.sub_args[i].argument_name === this.two.privatePropertyList[ii].attribute) {
                // statement
                this.two.privatePropertyList[ii].attributeValue = this.goods_detail.sub_args[i].argument_id
              }
            }
          }
        } else {
          console.log(msg.data.return_code)
        }
      })
      .catch(error => {
        this.consoleError(`服务器3${error.response}`)
      })
    },
    // 填充商品分类属性
    // 属性检验规则 第二步骤
    twoReg () {
      // 计数检查数据模型是否有空值存在
      var countReg = true
      for (let i = 0, length1 = this.two.privatePropertyList.length; i < length1; i++) {
        if (this.two.privatePropertyList[i].attributeValue === '') {
          countReg = false
        }
      }
      return countReg
    },

    // 媒体检验规则 第三步
    media () {
      console.log(this.three.thumb_image_url, this.three.audio_url, this.three.video_url)
      if (this.three.thumb_image_url !== '' && this.three.audio_url !== '' && this.three.video_url !== '') {
        // statement
        return true
      } else {
        return false
      }
    },

    // 颜色选择 单选
    handleCheckedCitiesChange (value) {
      var checkedCount = value.length
      console.log(value, checkedCount, '颜色单选')
      // this.four.checkAll = checkedCount === this.four.cities.length
      // this.four.isIndeterminate = checkedCount > 0 && checkedCount < this.four.cities.length
      console.log(value, this.four.cities)
      // 记录用户每次颜色选择的操作
      this.userColorModelHistoricalRecord()
      // 根据用户选择颜色 动态生成颜色、图片对应关系
      this.createColorAndImg()
    },

    // 尺码选择 全选
    handleCheckAllChangeSize (event) {
      this.four.checkedSize = event.target.checked ? this.four.size_list : []
      this.four.isIndeterminateSize = false
    },

    // 尺码选择 单选
    handleCheckedCitiesChangeSize (value) {
      var checkedCount = value.length
      this.four.checkAllSize = checkedCount === this.four.size_list.length
      this.four.isIndeterminateSize = checkedCount > 0 && checkedCount < this.four.size_list.length
    },

    // 服务器获取颜色分类
    getColorClassification (request_flag) {
      this.$axios.post(API.addNewerGoodsInfo, {
        product_id: this.one.commodityBrand,
        category_id: this.one.commodityClassification,
        request_flag: request_flag
      })
      .then((msg) => {
        if (msg.data.flag >> 0 === 1000) {
          // statement
          if (request_flag === 'color_list') {
            // statement
            console.log(msg.data, '颜色分类')
            // for (var i = 0; i < msg.data.category_color_list.length; i++) {
            //   for(var ii = 0, length1 = this.goods_detail.image_url.length; ii < length1; ii++){
            //     if(this.goods_detail.image_url[ii].color_name != msg.data.category_color_list[i].argument_value){
            //         this.four.cities.push(msg.data.category_color_list[i].argument_value);
            //     }
            //   }
            // }
            // for(var i = 0, length1 = msg.data.category_color_list.length; i < length1; i++){
            //   // msg.data.category_color_list[i].argument_value
            //   for(var ii = 0, length2 = this.goods_detail.image_url.length; ii < length2; ii++){
            //     // this.goods_detail.image_url[ii].color_name
            //     if (this.goods_detail.image_url[ii].color_name != msg.data.category_color_list[i].argument_value) {
            //       this.four.cities.push(msg.data.category_color_list[i].argument_value);
            //     }
            //   }
            // }

            var arr1 = []
            var arr2 = []

            for (let i = 0, length1 = msg.data.category_color_list.length; i < length1; i++) {
              arr1.push(msg.data.category_color_list[i].argument_value)
            }

            for (let i = 0, length1 = this.goods_detail.image_url.length; i < length1; i++) {
              arr2.push(this.goods_detail.image_url[i].color_name)
            }

            // -------- arr1中去除arr2中所包含的元素 --------
            for (let i = arr1.length - 1; i >= 0; i--) {
              for (let ii = arr2.length - 1; ii >= 0; ii--) {
                if (arr2[ii] === arr1[i]) {
                  arr1.splice(i, 1)
                }
              }
            }
            // -----------------------------------------
            this.four.cities = arr1
            this.four.colorList = msg.data.category_color_list
          } else if (request_flag === 'size_list') {
            // statement
            console.log(msg.data, '尺码分类')
            for (var i = 0; i < msg.data.category_size_list.length; i++) {
              this.four.size_list.push(msg.data.category_size_list[i].argument_value)
            }
            this.four.sizeList = msg.data.category_size_list
          }
        } else {
          this.consoleWarning(msg.data.return_code)
        }
      })
      .catch(error => {
        this.consoleError(`服务器4${error.response}`)
        console.debug(request_flag)
      })
    },

    // 服务器获取颜色分类 渲染至页面 [修改]
    postGoodsDetailColorUrl () {
      // 添加服务端获取的颜色和图片
      // for (var i = 0; i < this.goods_detail.sub_args.length; i++) {
      //   if (this.goods_detail.sub_args[i].argument_name == "颜色") {
      //     console.log(this.goods_detail.sub_args[i].argument_name)
      //     if (this.four.checkedCities.length > 0) {
      //       // statement
      //       console.log(1)
      //       for (var ii = 0; ii < this.four.checkedCities.length; ii++) {
      //         if (this.four.checkedCities[ii] != this.goods_detail.sub_args[i].argument_value) {
      //           // statement
      //           this.four.checkedCities.push(this.goods_detail.sub_args[i].argument_value);
      //           setTimeout( () => {
      //             // 记录用户每次颜色选择的操作
      //             this.userColorModelHistoricalRecord();
      //             // 根据用户选择颜色 动态生成颜色、图片对应关系
      //             this.createColorAndImg();
      //           },2000)
      //           // for (var iii = 0; iii < this.goods_detail.image_url.length; iii++) {
      //           //   if (this.goods_detail.image_url[iii].color_name == this.goods_detail.sub_args[i].argument_value) {
      //           //       this.four.PHPColorAndUrl.push([{
      //           //         color: this.goods_detail.sub_args[i].argument_value,
      //           //         url: this.goods_detail.image_url[iii].image_url
      //           //       }])
      //           //   }
      //           // }
      //         }
      //       }
      //     }
      //   }
      // }

      var count = 0
      for (var i = 0; i < this.goods_detail.sub_args.length; i++) {
        if (this.goods_detail.sub_args[i].argument_name === '颜色') {
          console.log(this.goods_detail.sub_args[i].argument_value, count)
          this.four.checkedCities.push(this.goods_detail.sub_args[i].argument_value)
          count++
          // 记录用户每次颜色选择的操作
          this.userColorModelHistoricalRecord()
          // 根据用户选择颜色 动态生成颜色、图片对应关系
          this.createColorAndImg()
        }
      }

      // 生成列表图
      for (let i = 0; i < this.goods_detail.image_url.length; i++) {
        this.four.PHPColorAndUrl.push([{
          name: this.goods_detail.image_url[i].color_name + '.jpg',
          url: this.goods_detail.image_url[i].image_url
        }])
      }
    },
    // 动态生成颜色图片对应关系数据模型
    createColorAndImg () {
      // 初始化数据模型 可能要做DeBug处理 若用户上传图片又改动选择颜色 图片对应关系也会被初始化
      if (this.four.colorAndImg.length >> 0 === 0) {
        // statement
        for (var j = 0; j < this.four.checkedCities.length; j++) {
          const colorImg = {
            color: this.four.checkedCities[j],
            imgUrl: ''
          }
          this.four.colorAndImg.push(colorImg)
        }
      } else {
        // 判断用户是添加还是删除
        // 0代表删除 1代表添加
        var userOperation = (this.userColorHistoricalRecord[1].length) > (this.userColorHistoricalRecord[0].length) ? 1 : 0
        var userOperationColor = this.removeDuplicate()
        if (userOperation >> 0 === 1) {
          // statement
          console.log('执行添加')
          const colorImg = {
            color: userOperationColor[0],
            imgUrl: ''
          }
          this.four.colorAndImg.push(colorImg)
        } else if (userOperation >> 0 === 0) {
          // statement
          console.log('执行删除')
          for (let i = 0; i < this.four.colorAndImg.length; i++) {
            console.log(this.four.colorAndImg[i].color, userOperationColor[0], '寻找删除数组下标')
            if (this.four.colorAndImg[i].color === userOperationColor[0]) {
              this.four.colorAndImg.splice(i, 1)
            }
          }
        }
        console.log(userOperationColor[0], '去重结果', this.userColorHistoricalRecord[0].length, '前一步用户选择', this.userColorHistoricalRecord[1].length, '当前用户选择', userOperation >> 0 === 1 ? '添加' : '删除', '用户操作')
      }

      console.log(this.four.colorAndImg, '数据模型')
    },

    // 两数组比较去重
    removeDuplicate () {
      // /////////////////////////////
      // 克隆数据模型中数据 在操作 //
      // /////////////////////////////
      var arr1 = this.userColorHistoricalRecord[0].concat()
      var arr2 = this.userColorHistoricalRecord[1].concat()
      var arr3 = ''
      console.log(arr1, arr2, '传入的两个数组')
      for (var i = 0; i < arr1.length;) {
        for (var ii = 0; ii < arr2.length;) {
          if (arr1[i] === arr2[ii]) {
            // statement
            arr1.splice(i, 1)
            arr2.splice(ii, 1)
            continue
          }
          ii++
        }
        i++
      }
      arr3 = arr1.concat(arr2)
      return arr3
    },

    // /////////////////////////////////////////
    // 维护用户颜色选择                      //
    // 记录每一次颜色的变化                  //
    // 每次抽取[length-1] 与现有数据模型比较 //
    // 增加或者删除 重新生成数据模型         //
    // /////////////////////////////////////////
    userColorModelHistoricalRecord () {
      if (this.userColorHistoricalRecord.length >= 2) {
        // statement
        this.userColorHistoricalRecord.splice(0, 1)
        this.userColorHistoricalRecord.push(this.four.checkedCities)
        console.log(this.four.checkedCities, this.userColorHistoricalRecord, '历史记录')
      } else {
        this.userColorHistoricalRecord.push(this.four.checkedCities)
        console.log(this.four.checkedCities, this.userColorHistoricalRecord, '历史记录')
      }
    },

    // 商品颜色图片
    colorAndImgSuccess (response, file, fileList) {
      if (response.flag >> 0 === 1000) {
        console.log(response, file)
        // statement
        var imgColor = response.imgColor
        for (var i = 0; i < this.four.colorAndImg.length; i++) {
          if (this.four.colorAndImg[i].color === imgColor) {
            this.four.colorAndImg[i].imgUrl = response.file_url
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

    // 获取颜色和尺寸
    getSizeColor () {
      this.getColorClassification('color_list')
      this.getColorClassification('size_list')
    },

    getPrivatePropertyList () {
      console.log(this.two.privatePropertyList)
    },

    // 组建最终提交数据
    buildAddShopData () {
      var argument = []
      argument.push({ product_id: this.one.commodityBrand })
      argument.push({ shop_show: this.two.shop_show })
      argument.push({ category_id: this.one.commodityClassification })
      argument.push({ title: this.two.commodityTitle })
      argument.push({ 'sub-title': this.two.commodityIntroduction })
      argument.push({ model: this.two.commodityNumber })
      argument.push({ code: this.two.commodityBarcode })
      argument.push({ price: this.two.price })
      argument.push({ thumb_image: this.three.thumb_image_url })
      argument.push({ audio: this.three.audio_url })
      argument.push({ video: this.three.video_url })
      argument.push({ description: this.newDescription })
      // 生成商品颜色图片数组
      var imgsUrl = []
      for (var i = 0; i < this.goods_detail.image_url.length; i++) {
        imgsUrl.push(this.goods_detail.image_url[i].image_url)
      }
      if (this.four.colorAndImg.length !== 0) {
        // statement
        for (let i = 0; i < this.four.colorAndImg.length; i++) {
          imgsUrl.push(this.four.colorAndImg[i].imgUrl)
        }
      }
      argument.push({ imgsUrl: imgsUrl })

      // this.goods_detail.image_url

      var colorAndImg = this.four.colorAndImg.concat()
      for (let i = 0; i < this.goods_detail.image_url.length; i++) {
        colorAndImg.push({
          color: this.goods_detail.image_url[i].color_arg_id,
          imgUrl: this.goods_detail.image_url[i].image_url
        })
      }
      if (colorAndImg.length !== 0) {
        // statement
        for (let i = 0; i < colorAndImg.length; i++) {
          for (let ii = 0; ii < this.four.colorList.length; ii++) {
            if (this.four.colorList[ii].argument_value === colorAndImg[i].color) {
              // statement
              colorAndImg[i].color = this.four.colorList[ii].id
            }
          }
        }
      }
      argument.push({ imgAndColor: colorAndImg })

      // 属性数组
      var sub_args = []

      for (let i = 0, length1 = colorAndImg.length; i < length1; i++) {
        sub_args.push(colorAndImg[i].color)
      }
      for (let i = 0; i < this.four.checkedCities.length; i++) {
        for (let ii = 0; ii < this.four.colorList.length; ii++) {
          if (this.four.colorList[ii].argument_value === this.four.checkedCities[i]) {
            sub_args.push(this.four.colorList[ii].id)
          }
        }
      }
      for (let i = 0; i < this.four.checkedSize.length; i++) {
        for (let ii = 0; ii < this.four.sizeList.length; ii++) {
          if (this.four.sizeList[ii].argument_value === this.four.checkedSize[i]) {
            // statement
            sub_args.push(this.four.sizeList[ii].id)
          }
        }
      }
      for (let i = 0; i < this.two.privatePropertyList.length; i++) {
        sub_args.push(this.two.privatePropertyList[i].attributeValue)
      }

      // 数组去重
      sub_args = this.unique(sub_args)

      argument.push({ 'sub-args': sub_args })

      console.log(argument)
      return argument
    },

    // 数组去重
    unique (arr) {
      var result = []
      var hash = {}
      for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
          result.push(elem)
          hash[elem] = true
        }
      }
      return result
    },
    // 提交数据
    postAddShopData () {
      // this.buildAddShopData()
      this.$axios.post(API.modifyNewerGoodsInfo, {
        arguments: this.buildAddShopData(),
        request_flag: 'modify',
        goods_id: this.goods_detail.id
      })
      .then((msg) => {
        console.log(msg.data)
        if (msg.data.flag >> 0 === 1000) {
          // statement
          this.consoleSuccess(msg.data.return_code)
          setTimeout(() => {
            this.$router.push({ path: 'listOfGoods' })
          }, 2000)
        } else {
          // statement
          this.consoleError(msg.data.return_code)
        }
      })
      .catch(error => {
        this.consoleError(`服务器6${error.response}`)
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
