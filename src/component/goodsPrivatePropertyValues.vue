<template>
  <div id="goodsPrivatePropertyValues">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="11">
        <el-carousel 
          height="700px" 
          indicator-position="none"
          arrow="never"
          :autoplay="false"
          ref="elCarousel">
          <!-- 第一页 -->
          <el-carousel-item>
            <el-form 
              :model="goodsPrivatePropertyValues" 
              :rules="goodsPrivatePropertyValuesRules" 
              ref="goodsPrivatePropertyValues"  
              label-position="top">
              <el-form-item label="商品品牌" prop="commodityBrand">
                <el-select v-model="goodsPrivatePropertyValues.commodityBrand" placeholder="请选择商品品牌" v-on:change="getCommodityClassificationProperties();">
                  <el-option v-for="item in goodsPrivatePropertyValues.commodityBrandList" :label="item.product_name" :value="item.id"></el-option>
                  <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item label="商品分类" prop="commodityClassification">
                <el-select v-model="goodsPrivatePropertyValues.commodityClassification" placeholder="请选择商品分类" v-on:change="getCommodityClassificationProperties();">
                  <el-option v-for="item in goodsPrivatePropertyValues.commodityClassificationList" :label="item.category_name" :value="item.id"></el-option>
                  <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
              </el-form-item>
             <el-form-item label="商品分类属性" prop="commodityClassificationProperties">
                <el-select v-model="goodsPrivatePropertyValues.commodityClassificationProperties" placeholder="请选择商品分类">
                  <el-option v-for="item in goodsPrivatePropertyValues.commodityClassificationPropertiesList" :label="item.argument_value" :value="item.id"></el-option>
                  <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
              </el-form-item>

              <el-form-item label="商品分类属性属性值" prop="goodsPrivatePropertyValuesText">
                <el-tag
                  v-for="tag in goodsPrivatePropertyValues.dynamicTags"
                  :closable="true"
                  :close-transition="false"
                  @close="handleClose(tag)"
                  type="primary"
                >
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
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('goodsPrivatePropertyValues')">提交</el-button>
                <el-button @click="resetForm('goodsPrivatePropertyValues')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-carousel-item>
          <!-- 第一页 End -->
        </el-carousel>
      </el-col>
    </el-row>

    <!-- 提示用户页面操作须知 -->
    <el-dialog title="操作说明" v-model="dialogVisible" size="tiny">
      <span>1.仅针对自有品牌除本平台提供商品属性以外的自有商品属性的添加。</span></br>
      <span>2.您只能完善您自有商品属性的属性值。</span></br>
      <span>3.若需要添加商品分类属性请移步至<router-link to="/goodsPrivateProperty">商品私有属性</router-link>添加后完善属性值。</span></br>
      <span>4.请注意文明用语!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import '../assets/style/goodsPrivatePropertyValues.less'
export default {
  name: 'goodsPrivatePropertyValues',
  data () {
    return {
      // http => http 内外网切换
      http: 'http://a001.aybc.so/',
      // 唯一接口
      onlyUrl: 'Shop/addTestGoodsInfo',
      // 获取商品属性分类
      getCommodityClassificationPropertiesUrl: 'Shop/addTestCategoryArguments',
      // 消息提示控件
      dialogVisible: true,
      goodsPrivatePropertyValues: {
        // 商品品牌
        commodityBrand: '',
        commodityBrandList : [],
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
      // 验证规则
      goodsPrivatePropertyValuesRules: {
        commodityBrand: [
          { required: true, message: '请选择商品品牌', trigger: 'change' }
        ],
        commodityClassification: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        commodityClassificationProperties: [
          { required: true, message:'请选择商品私有属性', trigger: 'change' }
        ]
      }
    }
  },
  
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // success
          if (this.goodsPrivatePropertyValues.dynamicTags.length > 0) {
            // statement
            this.$http.post(this.http+this.getCommodityClassificationPropertiesUrl,{
              product_id: this.goodsPrivatePropertyValues.commodityBrand,
              category_id: this.goodsPrivatePropertyValues.commodityClassification,
              parent_id: this.goodsPrivatePropertyValues.commodityClassificationProperties,
              argument: this.goodsPrivatePropertyValues.dynamicTags
            },{
              emulateJSON: true
            })
            .then( (msg) => {
              if(msg.body.flag == '1000'){
                this.consoleSuccess(msg.body.return_code);
                console.log(msg.body);
                setTimeout(() => {
                  this.resetForm('goodsPrivatePropertyValues');
                  this.goodsPrivatePropertyValues.dynamicTags = [];
                  this.goodsPrivatePropertyValues.commodityClassificationPropertiesList = [];
                },1200)
              } else {
                // statement
                this.consoleError(msg.body.return_code);
              }
            }, (response) => {
              this.consoleError(response.body.return_code);
              console.log(response);
            })
          } else {
            this.consoleWarning('请完善商品分类属性属性值!')
          }
        } else {
          this.consoleError('请完善必填信息');
          return false;
        }
      });
    },

    // 获取商品分类属性
    getCommodityClassificationProperties() {
      var _this = this;
      if ( this.goodsPrivatePropertyValues.commodityBrand != '' && this.goodsPrivatePropertyValues.commodityClassification != '' ) {
        // statement
        this.$http.post(this.http+this.getCommodityClassificationPropertiesUrl,{
          product_id: this.goodsPrivatePropertyValues.commodityBrand,
          category_id: this.goodsPrivatePropertyValues.commodityClassification,
          request_flag: 'parent_list'
        },{
          emulateJSON: true
        })
        .then( (msg) => {
          console.log(msg.body)
          this.consoleNews('获取商品属性分类属性中,请稍等!')
          if (msg.body.flag == '1000') {
            // statement
            this.consoleSuccess('获取商品属性分类属性成功!')
            _this.goodsPrivatePropertyValues.commodityClassificationPropertiesList = msg.body.parent_argument_list;
            console.log(this.goodsPrivatePropertyValues.commodityClassificationPropertiesList)
          } else {
            this.consoleWarning(msg.body.return_code)
          }
        }, (response) => {
          console.log(response)
        })
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 获取商品品牌和商品分类
    getCommodityBrandAndCommodityClassification() {
      var _this = this;
      this.$http.post(this.http+this.onlyUrl,{
        request_flag: 'product_list'
      },{
        emulateJSON: true
      })
      .then( (msg) => {
        console.log(msg.body)
        // 商品品牌列表
        var product_list = msg.body.product_list;
        _this.goodsPrivatePropertyValues.commodityBrandList = product_list;
        // 商品分类列表
        var category_list = msg.body.category_list;
        _this.goodsPrivatePropertyValues.commodityClassificationList = category_list;
      }, (response) => {
        console.log('Error')
      })
    },

    handleClose(tag) {
      this.goodsPrivatePropertyValues.dynamicTags.splice(this.goodsPrivatePropertyValues.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.goodsPrivatePropertyValues.inputVisible = true;
    },

    handleInputConfirm() {
      let inputValue = this.goodsPrivatePropertyValues.inputValue;
      if (inputValue) {
        this.goodsPrivatePropertyValues.dynamicTags.push(inputValue);
      }
      this.goodsPrivatePropertyValues.inputVisible = false;
      this.goodsPrivatePropertyValues.inputValue = '';
    },

    consoleSuccess(success) {
      this.$notify({
        title: '成功',
        message: success,
        type: 'success'
      });
    },

    consoleWarning(warning) {
      this.$notify({
        title: '警告',
        message: warning,
        type: 'warning'
      });
    },

    consoleNews(news) {
      this.$notify.info({
        title: '消息',
        message: news
      });
    },

    consoleError(error) {
      this.$notify.error({
        title: '错误',
        message: error
      });
    }
  },

  created: function() {
    // 初始化获取商品品牌和商品分类
    this.getCommodityBrandAndCommodityClassification();
  },
}
</script>
