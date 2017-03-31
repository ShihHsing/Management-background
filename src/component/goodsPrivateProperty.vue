<template>
  <div id="goodsPrivateProperty">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 22px;">商品私有属性</span>
            <el-button style="float: right;" type="text" @click="dialogVisible = true">操作说明</el-button>
          </div>
          <el-form 
            :model="goodsPrivateProperty" 
            :rules="goodsPrivatePropertyRules" 
            ref="goodsPrivateProperty"  
            label-position="top">
            <el-form-item label="商品品牌" prop="commodityBrand">
              <el-select v-model="goodsPrivateProperty.commodityBrand" placeholder="请选择商品品牌">
                <el-option v-for="item in goodsPrivateProperty.commodityBrandList" :label="item.product_name" :value="item.id"></el-option>
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="商品分类" prop="commodityClassification">
              <el-select v-model="goodsPrivateProperty.commodityClassification" placeholder="请选择商品分类">
                <el-option v-for="item in goodsPrivateProperty.commodityClassificationList" :label="item.category_name" :value="item.id"></el-option>
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="添加商品私有属性" prop="addGoodsPrivateProperty">
              <el-input style="width: 217px;" v-model="goodsPrivateProperty.addGoodsPrivateProperty" placeholder="请添加商品私有属性"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('goodsPrivateProperty')">提交</el-button>
              <el-button @click="resetForm('goodsPrivateProperty')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <!-- 提示用户页面操作须知 -->
    <el-dialog title="操作说明" v-model="dialogVisible" size="tiny">
      <span>1.仅针对自有品牌除本平台提供商品属性以外的自有商品属性的添加。</span></br>
      <span>2.添加私有属性后请移步至<router-link to="/goodsPrivatePropertyValues">商品私有属性值</router-link>完善属性值选项。</span></br>
      <span>3.请注意文明用语!</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '../assets/axios/api.js';
import '../assets/style/goodsPrivateProperty.less'
export default {
  name: 'goodsPrivateProperty',
  data () {
    return {
      // 消息提示控件
      dialogVisible: true,
      goodsPrivateProperty: {
        // 商品品牌
        commodityBrand: '',
        commodityBrandList : [],
        // 商品分类
        commodityClassification: '',
        commodityClassificationList: [],
        // 添加商品私有属性
        addGoodsPrivateProperty: ''
      },
      // 验证规则
      goodsPrivatePropertyRules: {
        commodityBrand: [
          { required: true, message: '请选择商品品牌', trigger: 'change' }
        ],
        commodityClassification: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        addGoodsPrivateProperty: [
          { required: true, message:'请添加商品私有属性', trigger: 'change' }
        ]
      }
    }
  },
  
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // success
          this.$axios.post(API.addTestCategoryArguments,{
            product_id: this.goodsPrivateProperty.commodityBrand,
            category_id: this.goodsPrivateProperty.commodityClassification,
            // 0代表商品分类属性
            parent_id: 0,
            argument: this.goodsPrivateProperty.addGoodsPrivateProperty
          })
          .then( msg => {
            if (msg.data.flag == '1000') {
              // statement
              this.consoleSuccess(`${msg.data.return_code}`);
              setTimeout(() => {
                console.log('执行')
                this.resetForm('goodsPrivateProperty');
              },1200)
            } else {
              // statement
              this.consoleError(`${msg.data.return_code}`);
            }
            console.log(msg.data);
          })
          .catch( error => {
            this.consoleError(`${error.data.return_code}`)
          });
        } else {
          this.consoleError('请完善必填信息');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

	  // 获取商品品牌和商品分类
    getCommodityBrandAndCommodityClassification() {
      var _this = this;
      this.$axios.post(API.addTestGoodsInfo,{
        request_flag: 'product_list'
      })
      .then( msg => {
        console.log(msg.data)
        if (msg.data.flag == '1000') {
          // statement
          // 商品品牌列表
          var product_list = msg.data.product_list;
          _this.goodsPrivateProperty.commodityBrandList = product_list;
          // 商品分类列表
          var category_list = msg.data.category_list;
          _this.goodsPrivateProperty.commodityClassificationList = category_list;
        } else {
          this.consoleError(`${msg.data.return_code}`);
        }
      })
      .catch( error => {
        this.consoleError(`${error.data.return_code}`);
      });
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
