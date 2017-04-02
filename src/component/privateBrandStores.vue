<template>
  <div id="privateBrandStores">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 22px;">添加自有品牌</span>
            <el-button style="float: right;" type="text" @click="dialogVisible = true">操作说明</el-button>
          </div>
          <el-table
            :data="ownProductList"
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              label="ID"
              width="60">
            </el-table-column>
            <el-table-column
              prop="product_name"
              label="门店名"
              align="center"
              header-align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              header-align="center"
              width="180">
              <template scope="scope">
                <el-button type="primary" @click="addTestOwnProduct(scope.row.id)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
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

      // 品牌列表
      ownProductList: []
    }
  },
  
  created: function() {
    this.getOwnProductList();
  },

  methods: {
    
    // 获取商品列表
    getOwnProductList () {
      this.$axios.post(API.addTestOwnProduct)
      .then( msg => {
        console.log(msg)
        let data = msg.data;
        if (data.flag == '1000') {
          this.ownProductList = data.product_list;
        } else {
          this.consoleError(`${msg.data.return_code}`);
        }
      })
      .catch( error => {
        this.consoleError(`服务器${error.response}`);
      });
    },

    addTestOwnProduct (id) {
      if (id) {
        this.$axios.post(API.addTestOwnProduct,{
          product_id: id
        })
        .then( msg => {
          console.log(msg)
          let data = msg.data;
          if (data.flag == '1000') {
            this.consoleSuccess(`${msg.data.return_code}`);
            this.getOwnProductList();
          } else {
            this.consoleError(`${msg.data.return_code}`);
          }
        })
        .catch( error => {
          this.consoleError(`服务器${error.response}`);
        });
      } else {
        this.consoleError(`发生未知错误,门店ID丢失,请稍后重试!`);
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
