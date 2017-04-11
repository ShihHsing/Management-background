<template>
  <div id="listOfGoods">
    <el-row style="margin-bottom: 15px;">
      <el-col :span="22" :offset="1">
        <el-row>
          <el-form label-width="90px" ref="searchShopList" :model="searchShopList" :rules="rules">
            <el-col :lg="5" :md="6" :sm="24">
              <el-form-item label="商品品牌" prop="commodityBrand">
                <el-select v-model="searchShopList.commodityBrand" clearable placeholder="请选择商品品牌">
                  <el-option v-for="item in commodityBrandList" :label="item.product_name" :value="item.id"></el-option>
                  <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="5" :md="6" :sm="24">
              <el-form-item label="商品分类" prop="commodityClassification">
                <el-select v-model="searchShopList.commodityClassification" clearable placeholder="请选择商品分类">
                  <el-option v-for="item in commodityClassificationList" :label="item.category_name" :value="item.id"></el-option>
                  <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="5" :md="6" :sm="24">
              <el-form-item label="商品款号:" prop="model">
                <el-input v-model.number="searchShopList.model" style="float: right;" placeholder="请输入商品款号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="3" :md="6" :sm="24" >
              <el-button type="primary" @click="onSubmit" style="float: right;">立即搜索</el-button>
            </el-col>
          </el-form>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">

       	<el-table
          :data="shopDateList"
          border
          stripe
          style="width: 100%"
          v-loading="loading"
          element-loading-text="加载中...">
         <!--  <el-table-column
            prop="model"
            label="商品款号"
            width="180"
            fixed="left">
          </el-table-column> -->
          <el-table-column
            prop="id"
            label="ID"
            width="180"
            fixed="left">
          </el-table-column>
          <el-table-column
            label="商品缩略图"
            width="300">
            <template scope="scope">
              <img width="100%" height="auto" :src="scope.row.thumb_image" alt="商品缩略图">
            </template>
          </el-table-column>
          <el-table-column
            prop="product_name"
            label="商品品牌">
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="商品分类">
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品标题"
            width="180">
          </el-table-column>
          <el-table-column
            prop="price"
            label="商品价格"
            width="100">
          </el-table-column>
          <el-table-column
            label="操作">
            <el-table-column
              fixed="right"
              label="信息修改"
              width="180">
              <template scope="scope" >
                <template v-if="shop_id == scope.row.shop_id">
                  <router-link size="small" class="el-button el-button--warning el-button--small" type="warning" :to="{path: 'modificationMerchandise', query: {shopID: scope.row.id}}">编辑</router-link>

                  <el-button @click="dialogVisible[scope.$index].model = true" size="small" type="danger">删除</el-button>

                  <el-dialog title="提示" v-model="dialogVisible[scope.$index].model" size="tiny">
                    <span>您确定要删除这件商品吗?</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible[scope.$index].model = false">取 消</el-button>
                      <el-button type="primary" @click="deleteTestGoodsInfo(scope.row.id,scope.$index)">确 定</el-button>
                    </span>
                  </el-dialog>
                </template>

                <template v-else>
                  <el-row type="flex" justify="center">
                    <span>此商品为公共商品,您没有操作的权利</span>
                  </el-row>
                </template>

              </template>


            </el-table-column>
            <el-table-column
              fixed="right"
              label="商品设置"
              width="180">
              <template scope="scope">
                <template v-if="shop_id != 1">
                  <template v-for="(item,index) in scope.row.switch_list">
                    <el-form>
                      <el-form-item :label="item.switch_name">
                        <!-- <span>{{ index }}</span> -->
                        <el-switch v-model="goodsSetSwitchModel[scope.$index][index].model" @change="goodsSetSwitch(goodsSetSwitchModel[scope.$index][index].goods_id,item.id,goodsSetSwitchModel[scope.$index][index].model)">
                        </el-switch>
                      </el-form-item>
                    </el-form>
                  </template>
                  <!-- 这是一个Debug的办法 为了配合商品属性开关动态效果的失效 -->
                  <el-switch
                    v-model="value1"
                    style="display:none;">
                  </el-switch>
                </template>
                <template v-else>
                  <el-row type="flex" justify="center">
                    <span>此商品为公共商品</span>
                  </el-row>
                </template>
              </template>
            </el-table-column>

            <el-table-column
              fixed="right"
              label="添加3D模型"
              width="120">
              <template scope="scope">
                <router-link :to="{path: 'add3DModel', query: {code: scope.row.code, id: scope.row.id, shop_id: scope.row.shop_id, color: scope.row.image_url}}" replace>
                  <el-button type="info" size="small">添加</el-button>
                </router-link>
              </template>
            </el-table-column>

          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    </br>
    </br>
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current_page"
          :page-size="page_size"
          layout="prev, pager, next, jumper"
          :total="page_size*total_pages"
          style="float: right;padding: 0;">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 样式文件
import '../assets/style/listOfGoods.less';
import * as API from '../assets/axios/api.js';
export default {
  name: 'listOfGoods',
  data () {
    var checkmodel = (rule, value, callback) => {
      if (value != '') {
        // statement
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            callback();
          }
        }, 300)
      } else {
        callback();
      }
    };
    return {
      // 加载数据蒙层
      loading: true,
      // 这是一个debug方案 为了配合商品属性开关动态效果的失效
      value1: false,
      // 删除二次确认页面
      dialogVisible: [],
      // 商品设置数据模型
      goodsSetSwitchModel: [],
      // 当前页
      current_page: 0,
      // 总页数
      total_pages: 0,
      // 每页条数
      page_size: 0,
      searchShopList:{
        // 商品品牌
        commodityBrand: '',
        // 商品分类
        commodityClassification: '',
        // 商品款号
        model: '',
      },
      // 服务端商品品牌
      commodityBrandList : [],
      // 服务端商品分类
      commodityClassificationList: [],
      // 验证规则
      rules: {
        commodityBrand: [
          { message: '请选择商品品牌', trigger: 'change' }
        ],
        commodityClassification: [
          { message: '请选择商品分类', trigger: 'change' }
        ],
        model: [
          { validator: checkmodel, trigger: 'change' }
        ]
      },

      // 服务端数据
      shopDateList: [],

      //shop_id 控制显示内容 1号为公有门店 其与为私有门店
      shop_id: this.$store.state.user.userData.emp.shop_id,
    }
  },

  created: function() {
    // 初始化获取商品品牌和商品分类
    this.getCommodityBrandAndCommodityClassification();
    // 获取初始化数据
    this.getInitData();
    console.log(this.$store.state.user.userData.emp.shop_id);
  },

  methods: {
    // 获取商品品牌和商品分类
    getCommodityBrandAndCommodityClassification() {
      var _this = this;
      this.$axios.post(API.addTestGoodsInfo,{
        request_flag: 'product_list'
      })
      .then( (msg) => {
        console.log(msg.data,'获取商品品牌和商品分类');
        if (msg.data.flag == '1000') {
          // statement
          // 商品品牌列表
          var product_list = msg.data.product_list;
          _this.commodityBrandList = product_list;
          // 商品分类列表
          var category_list = msg.data.category_list;
          _this.commodityClassificationList = category_list;
        } else {
          this.consoleError(`${msg.data.return_code}`);
        }
      })
      .catch( error => {
        this.consoleError(`服务器${error.response}`);
      });
    },

    // 搜索商品
    onSubmit() {
      if (this.searchShopList.commodityBrand != '' || this.searchShopList.commodityClassification != '' || this.searchShopList.model != '') {
        // statement
        console.log(this.searchShopList);
        this.searchShopData()
      } else {
        this.consoleError('请完善搜索信息!至少需要一个搜索条件!');
        return false;
      }
    },

    // 根据用户输入条件搜索数据
    // TODO
    //  还需传入页数

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchShopData(val)
      console.log(`当前页: ${val}`);
    },

    searchShopData(val) {
      var _this = this;
      this.$axios.post(API.listTestGoodsInfo,{
        product_id: this.searchShopList.commodityBrand,
        category_id: this.searchShopList.commodityClassification,
        model: this.searchShopList.model,
        current_page: val || ''
      })
      .then( (msg) => {
        console.log(msg.data)
        if (msg.data.flag == '1000') {
          // statement
          this.shopDateList = msg.data.goods_list;
          // 构建二次确认数据模型
          this.dialogVisible = [];
          for (var i = 0; i < this.shopDateList.length; i++) {
            this.dialogVisible.push({
              model: false
            });
          }
          // 设置当前页和总页数
          this.total_pages = (msg.data.total_pages) >> 0;
          this.current_page = (msg.data.current_page) >> 0;
          console.log(this.total_pages,this.current_page);
         // 商品设置开关
          this.goodsSetSwitchModel = [];
          for (var i = 0; i < this.shopDateList.length; i++) {
            var model = [];
            for (var ii = 0; ii < this.shopDateList[i].switch_list.length; ii++) {
              model.push({
                model: !!(this.shopDateList[i].switch_list[ii].switch >> 0),
                goods_id: this.shopDateList[i].id
              });
            }
            this.goodsSetSwitchModel[i] = model;
          }
          // this.consoleSuccess('获取商品信息成功!')
        } else {
          this.consoleError(`${msg.data.return_code}`)
          this.total_pages = 0;
          this.current_page = 0;
          this.shopDateList = [];
        }
      })
      .catch( error => {
        this.consoleError(`服务器${error.response}`);
      });
      console.log(this.shopDateList)
    },

    // 初始化数据渲染页面
    getInitData() {
      // 服务器获取数据
      this.getShopData();
    },
    
    // 服务器获取数据
    getShopData() {
      // var _this = this;
      this.$axios.post(API.listTestGoodsInfo,{
        current_page: ''
      })
      .then( (msg) => {
        console.log(msg.data)
        // 初始化
        this.shopDateList = [];
        if (msg.data.flag == '1000') {

          // statement
          this.shopDateList = msg.data.goods_list;
          // 构建二次确认数据模型
          this.dialogVisible = [];
          for (var i = 0; i < this.shopDateList.length; i++) {
            this.dialogVisible.push({
              model: false
            });
          }
          // 设置当前页和总页数
          this.total_pages = (msg.data.total_pages) >> 0;
          this.current_page = (msg.data.current_page) >> 0;
          this.page_size = (msg.data.page_size) >> 0;
          console.log(this.total_pages,this.current_page);
          // 商品设置开关
          this.goodsSetSwitchModel = [];
          for (var i = 0; i < this.shopDateList.length; i++) {
            var model = [];
            for (var ii = 0; ii < this.shopDateList[i].switch_list.length; ii++) {
              model.push({
                model: !!(this.shopDateList[i].switch_list[ii].switch >> 0),
                goods_id: this.shopDateList[i].id
              });
            }
            this.goodsSetSwitchModel[i] = model;
          }
        } else {
          this.consoleError(`${msg.data.return_code}`)
        }
        this.loading = false;
      })
      .catch( error => {
        this.consoleError(`服务器${error.response}`);
      });
      console.log(this.shopDateList,'根据用户输入条件搜索数据')
    },

    // 商品设置置顶&取消
    toGoTop(scope) {
      var popular = scope.row.popular == 1?0:1;
      // scope.row
      // 当前点击数据的所有值
      this.$axios.post(API.popularHandleUrl,{
        goods_id: scope.row.id,
        popular: popular
      })
      .then( (msg) => {
        console.log(msg.data)
        if (msg.data.flag == '1000') {
          // statement
          this.consoleSuccess(`${msg.data.return_code}`)
          this.getShopData();
        } else {
          this.consoleError(`${msg.data.return_code}`)
        }
      })
      .catch( error => {
        this.consoleError(`服务器${error.response}`);
      });
    },

    // 商品设置推荐&取消
    toGoRecommend(scope) {
      var special_power = scope.row.special_power == 1?0:1;
      // scope.row
      // 当前点击数据的所有值
      this.$axios.post(API.specialPowerHandleUrl,{
        goods_id: scope.row.id,
        special_power: special_power
      })
      .then( (msg) => {
        console.log(msg.data)
        if (msg.data.flag == '1000') {
          // statement
          this.consoleSuccess(`${msg.data.return_code}`)
          this.getShopData();
        } else {
          this.consoleError(`${msg.data.return_code}`)
        }
      })
      .catch( error => {
        this.consoleError(`服务器${error.response}`);
      });
    },

    deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    // 删除
    deleteTestGoodsInfo(id,index) {
      console.log(index)
      this.$axios.post(API.deleteTestGoodsInfoUrl,{
        goods_id: id
      })
      .then( (msg) => {
        console.log(msg.data)
        if (msg.data.flag == '1000') {
          // statement
          this.dialogVisible[index].model = false;
          this.consoleSuccess(`${msg.data.return_code}`);
          this.getShopData();
        } else {
          this.consoleError(`${msg.data.return_code}`)
        }
      })
      .catch( error => {
        this.consoleError(`服务器${error.response}`);
      });
    },

    // 商品设置开关
    goodsSetSwitch(goods_id,switch_id,switch_value) {
      // Debug 处理
      this.value1 = !this.value1
      this.$axios.post(API.switchHandleUrl,{
        goods_id: goods_id,
        switch_id: switch_id,
        switch_value: Number(switch_value) 
      })
      .then( msg => {
        if (msg.data.flag == "1000") {
          // statement
          this.consoleSuccess(`${msg.data.return_code}`);
          this.searchShopData();
        } else {
          this.consoleError(`${msg.data.return_code}`)
        }
      })
      .catch( error => {
        this.consoleError(`服务器${error.response}`);
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
}
</script>
