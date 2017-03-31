<template>
  <div id="privateBrandStores">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 22px;">设置自由品牌</span>
            <el-button style="float: right;" type="text" @click="dialogVisible = true">操作说明</el-button>
          </div>
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
        </el-card>
      </el-col>
    </el-row>

    <!-- 提示用户页面操作须知 -->
    <el-dialog title="操作说明" v-model="dialogVisible" size="tiny">
      <span>待定!</span>
      <span slot="footer" class="dialog-footer">
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
        this.consoleError(`${error.data.return_code}`);
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
