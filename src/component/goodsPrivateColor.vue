<template>
  <div id="goodsPrivateColor">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 22px;">商品私有颜色</span>
            <el-button style="float: right;" type="text" @click="dialogVisible = true">操作说明</el-button>
          </div>
          <el-form 
            :model="goodsPrivatePropertyValues" 
            :rules="goodsPrivatePropertyValuesRules" 
            ref="goodsPrivatePropertyValues"  
            label-position="top">
            <el-form-item label="商品品牌" prop="commodityBrand">
              <el-select 
                v-model="goodsPrivatePropertyValues.commodityBrand" 
                placeholder="请选择商品品牌"
                @change="getParentId">
                <el-option v-for="item in goodsPrivatePropertyValues.commodityBrandList" :label="item.product_name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品分类" prop="commodityClassification">
              <el-select 
                v-model="goodsPrivatePropertyValues.commodityClassification" 
                placeholder="请选择商品分类"
                @change="getParentId">
                <el-option v-for="item in goodsPrivatePropertyValues.commodityClassificationList" :label="item.category_name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商品私有颜色" prop="goodsPrivatePropertyValuesText">
              <el-tag
                v-for="tag in goodsPrivatePropertyValues.dynamicTags"
                :closable="true"
                :close-transition="false"
                @close="handleClose(tag)"
                type="primary">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="goodsPrivatePropertyValues.inputVisible"
                v-model="goodsPrivatePropertyValues.inputValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
                style="width: 217px;">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('goodsPrivatePropertyValues')">提交</el-button>
              <!-- <el-button @click="resetForm('goodsPrivatePropertyValues')">重置</el-button> -->
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <!-- 提示用户页面操作须知 -->
    <el-dialog title="操作说明" v-model="dialogVisible" size="tiny">
      <span>1.仅针对自有品牌除本平台提供商品颜色以外的自有商品颜色的添加。</span></br>
      <span>2.您只能操作您自有商品颜色。</span></br>
      <span>3.请注意文明用语!</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '../assets/axios/api.js'
import '../assets/style/goodsPrivateColor.less'
export default {
  name: 'goodsPrivateColor',
  data () {
    return {
      // 消息提示控件
      dialogVisible: true,
      goodsPrivatePropertyValues: {
        // 商品品牌
        commodityBrand: '',
        commodityBrandList: [],
        // 商品分类
        commodityClassification: '',
        commodityClassificationList: [],
        // 商品私有属性
        commodityClassificationProperties: '',
        commodityClassificationPropertiesList: [],
        // 商品私有属性属性值
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      },
      // 附属性ID 上传颜色前需请求给后端
      parent_id: '',
      // 验证规则
      goodsPrivatePropertyValuesRules: {
        commodityBrand: [
          { required: true, message: '请选择商品品牌', trigger: 'change' }
        ],
        commodityClassification: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ]
      }
    }
  },

  created: function () {
    // 初始化获取商品品牌和商品分类
    this.getCommodityBrandAndCommodityClassification()
  },

  methods: {
    // 获取附属性ID
    getParentId () {
      if (this.goodsPrivatePropertyValues.commodityBrand !== '' && this.goodsPrivatePropertyValues.commodityClassification !== '') {
        var _this = this
        this.$axios.post(API.addNewerCategoryArguments, {
          'product_id': this.goodsPrivatePropertyValues.commodityBrand,
          'category_id': this.goodsPrivatePropertyValues.commodityClassification,
          'request_flag': 'parent_list'
        })
        .then(msg => {
          console.log(msg)
          const data = msg.data
          if (data.flag === 1000) {
            for (var i = data.parent_argument_list.length - 1; i >= 0; i--) {
              if (data.parent_argument_list[i].argument_value === '颜色') {
                _this.parent_id = data.parent_argument_list[i].id
                console.log(`副属性ID:${_this.parent_id}`)
                break
              }
            }
          } else {
            _this.consoleError(`服务器发生未知错误!`)
          }
        })
        .catch(error => {
          _this.consoleError(`服务器${error.response}`)
        })
      }
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // success
          if (this.goodsPrivatePropertyValues.dynamicTags.length > 0) {
            // statement
            this.$axios.post(API.addNewerCategoryArguments, {
              'product_id': this.goodsPrivatePropertyValues.commodityBrand,
              'category_id': this.goodsPrivatePropertyValues.commodityClassification,
              'parent_id': this.parent_id,
              'argument': this.goodsPrivatePropertyValues.dynamicTags
            })
            .then(msg => {
              if (msg.data.flag === 1000) {
                this.consoleSuccess(msg.data.return_code)
                console.log(msg.data)
                setTimeout(() => {
                  this.resetForm('goodsPrivatePropertyValues')
                  this.goodsPrivatePropertyValues.dynamicTags = []
                  this.goodsPrivatePropertyValues.commodityClassificationPropertiesList = []
                }, 1200)
              } else {
                // statement
                this.consoleError(msg.data.return_code)
              }
            })
            .catch(error => {
              this.consoleError(`服务器${error.response}`)
            })
          } else {
            this.consoleWarning('请完善商品分类属性属性值!')
          }
        } else {
          this.consoleError('请完善必填信息')
          return false
        }
      })
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    // 获取商品品牌和商品分类
    getCommodityBrandAndCommodityClassification () {
      var _this = this
      this.$axios.post(API.addNewerGoodsInfo, {
        'request_flag': 'product_list'
      })
      .then(msg => {
        console.log(msg.data)
        if (msg.data.flag === 1000) {
          // statement
          // 商品品牌列表
          var product_list = msg.data.product_list
          _this.goodsPrivatePropertyValues.commodityBrandList = product_list
          // 商品分类列表
          var category_list = msg.data.category_list
          _this.goodsPrivatePropertyValues.commodityClassificationList = category_list
        } else {
          this.consoleError(msg.data.return_code)
        }
      })
      .catch(error => {
        this.consoleError(`服务器${error.response}`)
      })
    },

    handleClose (tag) {
      this.goodsPrivatePropertyValues.dynamicTags.splice(this.goodsPrivatePropertyValues.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.goodsPrivatePropertyValues.inputVisible = true
    },

    handleInputConfirm () {
      const inputValue = this.goodsPrivatePropertyValues.inputValue
      if (inputValue) {
        this.goodsPrivatePropertyValues.dynamicTags.push(inputValue)
      }
      this.goodsPrivatePropertyValues.inputVisible = false
      this.goodsPrivatePropertyValues.inputValue = ''
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
