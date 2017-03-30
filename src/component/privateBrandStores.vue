<template>
  <div id="privateBrandStores">
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
              label-position="top">
              <el-form-item label="选择自由品牌" prop="commodityBrand">
                <el-select multiple v-model="testOwnProduct" placeholder="可单选可多选">
                  <el-option v-for="item in testOwnProductList" :label="item.product_name" :value="item.id"></el-option>

                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="postAddTestOwnProduct()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-carousel-item>
          <!-- 第一页 End -->
        </el-carousel>
      </el-col>
    </el-row>

    <!-- 提示用户页面操作须知 -->
    <el-dialog title="操作说明" v-model="dialogVisible" size="tiny">
      <span>1.仅针对自有品牌除本平台提供商品颜色以外的自有商品颜色的添加。</span></br>
      <span>2.您只能操作您自有商品颜色。</span></br>
      <span>3.请注意文明用语!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import '../assets/style/privateBrandStores.less';
import * as API from '../assets/axios/api.js';
export default {
  name: 'privateBrandStores',
  data () {
    return {
      dialogVisible: true,
      testOwnProduct: [],
      testOwnProductList: []
    }
  },
  
  created: function() {
    // 获取所有品牌
    this.getAddTestOwnProduct();
  },

  methods: {
    
    getAddTestOwnProduct() {
    	this.$axios.post(API.addTestOwnProductUrl,{
    		product_id: this.testOwnProduct
    	})
    	.then( msg => {
    		console.log(msg)
        if (msg.data.flag == '1000') {
          // statement
          this.testOwnProductList = msg.data.product_list;
        } else {
          this.consoleError(`${msg.data.return_code}`);
          
        }
    	})
      .catch( error => {
        console.log(error)
        // this.consoleError(`${error.data.return_code}`);
      });
    },

    postAddTestOwnProduct() {
      if (this.testOwnProduct.length > 0 ) {
        // statement
        this.$axios.post(API.addTestOwnProductUrl,{
          product_id: this.testOwnProduct
        })
        .then( msg => {
          console.log(msg)
          if (msg.data.flag == '1000') {
            // statement
            this.consoleSuccess(`${msg.data.return_code}`);
            this.testOwnProduct = [];
          } else {
            this.consoleError(`${msg.data.return_code}`);
          }
        })
        .catch( error => {
          this.consoleError(`${error.data.return_code}`)
        });
      } else {
        this.consoleError('请完善信息后提交!!!')
      }
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


}
</script>
