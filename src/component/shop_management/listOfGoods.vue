<template>
    <div id="listOfGoods">
        <el-row style="margin-bottom: 15px;">
            <el-col :span="24">
                <el-form ref="searchShopList" :model="searchShopList" :rules="rules" label-position="left" label-width="75px">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="6">
                            <el-form-item label="商品品牌:" prop="commodityBrand">
                                <el-select v-model="searchShopList.commodityBrand" clearable placeholder="请选择商品品牌">
                                    <el-option v-for="item in commodityBrandList" :label="item.product_name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="商品分类:" prop="commodityClassification">
                                <el-select v-model="searchShopList.commodityClassification" clearable placeholder="请选择商品分类">
                                    <el-option v-for="item in commodityClassificationList" :label="item.category_name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="商品款号:" prop="model">
                                <el-input v-model="searchShopList.model" style="width: 217px;" placeholder="请输入商品款号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="primary" @click="onSubmit" style="float: right;">
                                    <template v-if="searchShopList.commodityBrand === '' && searchShopList.commodityClassification === '' && searchShopList.model === ''">查看全部</template>
                                    <template v-else>立即搜索</template>
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        <div class="listOfGoods_body_wrap">
            <div class="listOfGoods_body">
                <div class="table_body sx_basis_scroll sx_scroll_style" id="table">
                    <el-table
                        :data="shopDateList"
                        border
                        stripe
                        :height="tableHeight"
                        v-loading="loading"
                        element-loading-text="加载中...">
                        <el-table-column
                            prop="model"
                            label="商品款号"
                            width="100">
                            </el-table-column>
                        <el-table-column
                        label="商品缩略图">
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
                                width="80">
                                <template scope="scope" >
                                    <template v-if="shop_id == scope.row.shop_id">
                                        <router-link size="small" class="el-button el-button--warning el-button--small" type="warning" :to="{path: 'modificationMerchandise', query: {shopID: scope.row.id}}"><i class="el-icon-edit"></i></router-link>
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
                                label="商品设置"
                                width="180">
                                <template scope="scope">
                                    <template v-if="shop_id == scope.row.shop_id">
                                        <el-form>
                                            <el-form-item label="上架">
                                                <el-switch 
                                                    v-model="scope.row.is_on"
                                                    @change="goodsSetSwitch(scope.row.id, 'is_on', scope.row.is_on)">
                                                </el-switch>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                    <el-form>
                                        <el-form-item label="热销">
                                            <el-switch 
                                                v-model="scope.row.switch_list.is_hot"
                                                @change="goodsSetSwitch(scope.row.id, 'is_hot', scope.row.switch_list.is_hot)">
                                            </el-switch>
                                        </el-form-item>
                                    </el-form>
                                    <el-form>
                                        <el-form-item label="新品">
                                            <el-switch 
                                                v-model="scope.row.switch_list.is_new"
                                                @change="goodsSetSwitch(scope.row.id, 'is_new', scope.row.switch_list.is_new)">
                                            </el-switch>
                                        </el-form-item>
                                    </el-form>
                                    <el-form>
                                        <el-form-item label="精品">
                                            <el-switch 
                                                v-model="scope.row.switch_list.is_boutique"
                                                @change="goodsSetSwitch(scope.row.id, 'is_boutique', scope.row.switch_list.is_boutique)">
                                            </el-switch>
                                        </el-form-item>
                                    </el-form>
                                    <!-- <template v-for="(item,index) in scope.row.switch_list">
                                        <template v-if="scope.row.shop_id == 1">
                                            <el-form v-if="scope.row.switch_list[index].switch_name != '上架'">
                                                <el-form-item :label="item.switch_name">
                                                    <el-switch 
                                                        v-model="goodsSetSwitchModel[scope.$index][index].model"
                                                        @change="goodsSetSwitch(goodsSetSwitchModel[scope.$index][index].goods_id,item.id,goodsSetSwitchModel[scope.$index][index].model)">
                                                    </el-switch>
                                                </el-form-item>
                                            </el-form>
                                        </template>
                                        <template v-else>
                                            <el-form>
                                                <el-form-item :label="item.switch_name">
                                                    <el-switch 
                                                        v-model="goodsSetSwitchModel[scope.$index][index].model"
                                                        @change="goodsSetSwitch(goodsSetSwitchModel[scope.$index][index].goods_id,item.id,goodsSetSwitchModel[scope.$index][index].model)">
                                                    </el-switch>
                                                </el-form-item>
                                            </el-form>
                                        </template>
                                    </template> -->
                                    <!-- 这是一个Debug的办法 为了配合商品属性开关动态效果的失效 -->
                                    <el-switch
                                        v-model="value1"
                                        style="display:none;">
                                    </el-switch>
                                </template>
                            </el-table-column>

                            <el-table-column
                                fixed="right"
                                label="添加3D模型"
                                width="100">
                                <template scope="scope">
                                    <template v-if="shop_id == 1">
                                        <router-link :to="{path: 'add3DModel', query: {model: scope.row.model, id: scope.row.id, shop_id: scope.row.shop_id, color: scope.row.image_url}}" replace>
                                            <el-button type="info" size="small">添加</el-button>
                                        </router-link>
                                    </template>
                                    <template v-else>
                                        <el-row type="flex" justify="center">
                                            <span>3D模型由公司本部上传,如有需求请联系客服</span>
                                        </el-row>
                                    </template>
                                </template>
                            </el-table-column>

                            <template v-if="shop_id != 1">
                                <el-table-column
                                    label="月销设置"
                                    width="120">
                                    <template scope="scope">
                                        {{ scope.row.sale_count }}件&nbsp;&nbsp;&nbsp;
                                        <el-button
                                            type="primary" 
                                            size="small" 
                                            @click="handleSaleCount(scope.row.id, scope.row.sale_count)">编辑</el-button>
                                    </template>
                                </el-table-column>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="current_page"
                        :page-size="page_size"
                        layout="prev, pager, next, jumper"
                        :total="page_size*total_pages"
                        style="float: right;padding: 0;">
                    </el-pagination>
                </div>
            </div>
        </div></br></br></br>
        <el-dialog title="月销量" v-model="dialogSaleCount" size="tiny">
            <el-input-number v-model="sale_count" :min="0"></el-input-number>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="postSaleCount()">设置</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style lang="less">
    #listOfGoods{
        box-sizing: border-box;

        width: 100%;
        height: 100%;
        
        padding: 30px;
        background: #fff;

        overflow: hidden;
        label{
            color: #8492A6;
        }
        .listOfGoods_body_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;

            padding-bottom: 73px;
            .listOfGoods_body{
                display: flex;
                flex-direction: column;

                width: 100%;
                height: 100%;
                .table_body{
                    width: 100%;
                    flex: 1;
                }
                .pagination{
                    width: 100%;
                    height: 30px;

                    margin-top: 30px;
                }
            }
        }
    }
    .el-dialog__wrapper{
        z-index: 999999 !important;
    }
</style>

<script>
import * as API from '../../assets/axios/api.js'
export default {
    name: 'listOfGoods',
    data () {
        return {
            tableHeight: null,
            loading: true, // 加载数据蒙层
            value1: false, // 这是一个debug方案 为了配合商品属性开关动态效果的失效
            dialogVisible: [], // 删除二次确认页面
            goodsSetSwitchModel: [], // 商品设置数据模型
            saleCountModel: [], // 月销数量模型
            dialogSaleCount: false, // 月销量设置弹出层
            sale_id: null, // 设置月销商品ID
            sale_count: null, // 设置月销量数量
            current_page: 0, // 当前页
            total_pages: 0, // 总页数
            page_size: 0, // 每页条数
            searchShopList: {
                commodityBrand: '', // 商品品牌
                commodityClassification: '', // 商品分类
                model: '' // 商品款号
            },
            commodityBrandList: [], // 服务端商品品牌
            commodityClassificationList: [], // 服务端商品分类
            rules: { // 验证规则
                commodityBrand: [
                    { message: '请选择商品品牌', trigger: 'change' }
                ],
                commodityClassification: [
                    { message: '请选择商品分类', trigger: 'change' }
                ],
                model: [
                    { message: '请输入商品款号', trigger: 'change' }
                ]
            },
            shopDateList: [], // 服务端数据
            shop_id: this.$store.state.user.userData.emp.shop_id // shop_id 控制显示内容 1号为公有门店 其与为私有门店
        }
    },

    created: function () {
        this.getCommodityBrandAndCommodityClassification() // 初始化获取商品品牌和商品分类
        this.getInitData() // 获取初始化数据
        this.$nextTick(function () { // 获取表格高度
            this.tableHeight = document.getElementById('table').offsetHeight
        })
    },

    methods: {
        // 获取商品品牌和商品分类
        getCommodityBrandAndCommodityClassification () {
            this.$axios.post(API.getNewerProductList)
            .then((msg) => {
                const data = msg.data

                if (data.flag >> 0 !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }

                // 商品品牌列表
                this.commodityBrandList = data.product_list
                // 商品分类列表
                this.commodityClassificationList = data.category_list
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 搜索商品
        onSubmit () {
            // if (this.searchShopList.commodityBrand === '' && this.searchShopList.commodityClassification === '' && this.searchShopList.model === '') {
            //     this.$message.error('请完善搜索信息,至少需要一个搜索条件')
            //     return false
            // }

            this.searchShopData()
        },

        // 根据用户输入条件搜索数据
        // TODO
        //  还需传入页数
        handleSizeChange (val) {
        },

        handleCurrentChange (val) {
            this.currentPage = val
            this.searchShopData(val)
        },

        searchShopData (val) {
            this.loading = true
            this.$axios.post(API.listNewerGoodsInfo, {
                'product_id': this.searchShopList.commodityBrand,
                'category_id': this.searchShopList.commodityClassification,
                'model': this.searchShopList.model,
                'current_page': val || ''
            })
            .then((msg) => {
                const data = msg.data

                if (data.flag >> 0 !== 1000) {
                    this.$message.error(data.return_code)
                    this.total_pages = 0
                    this.current_page = 0
                    this.shopDateList = []
                    this.loading = false
                    return false
                }

                this.shopDateList = data.goods_list

                // 转换开关布尔值
                // 若不存在 则设置false为默认值
                for (var i = this.shopDateList.length - 1; i >= 0; i--) {
                    if (this.shopDateList[i].is_on) {
                        this.shopDateList[i].is_on = !!Number(this.shopDateList[i].is_on)
                    } else {
                        this.shopDateList[i].is_on = false
                    }
                    if (this.shopDateList[i].switch_list) {
                        if (this.shopDateList[i].switch_list.is_boutique) {
                            this.shopDateList[i].switch_list.is_boutique = !!Number(this.shopDateList[i].switch_list.is_boutique)
                        } else {
                            this.shopDateList[i].switch_list.is_boutique = false
                        }
                        if (this.shopDateList[i].switch_list.is_hot) {
                            this.shopDateList[i].switch_list.is_hot = !!Number(this.shopDateList[i].switch_list.is_hot)
                        } else {
                            this.shopDateList[i].switch_list.is_hot = false
                        }
                        if (this.shopDateList[i].switch_list.is_new) {
                            this.shopDateList[i].switch_list.is_new = !!Number(this.shopDateList[i].switch_list.is_new)
                        } else {
                            this.shopDateList[i].switch_list.is_new = false
                        }
                    } else {
                        this.shopDateList[i].switch_list = {
                            is_boutique: false,
                            is_hot: false,
                            is_new: false
                        }
                    }
                }

                // 构建二次确认数据模型
                this.dialogVisible = []
                for (let i = 0; i < this.shopDateList.length; i++) {
                    this.dialogVisible.push({
                        model: false
                    })
                }

                // 设置当前页和总页数
                this.total_pages = (data.total_pages) >> 0
                this.current_page = (data.current_page) >> 0

                // 商品设置开关
                // this.goodsSetSwitchModel = []
                // for (let i = 0; i < this.shopDateList.length; i++) {
                //     var model = []
                //     for (let ii = 0; ii < this.shopDateList[i].switch_list.length; ii++) {
                //         model.push({
                //             'model': !!(this.shopDateList[i].switch_list[ii].switch >> 0),
                //             'goods_id': this.shopDateList[i].id
                //         })
                //     }
                //     this.goodsSetSwitchModel[i] = model
                // }

                this.loading = false
            })
            .catch(error => {
                this.loading = false
                this.$message.error('服务器异常')
            })
        },

        // 初始化数据渲染页面
        getInitData () {
            // 服务器获取数据
            this.getShopData()
        },
        // 服务器获取数据
        getShopData () {
            this.$axios.post(API.listNewerGoodsInfo, {
                'current_page': ''
            })
            .then((msg) => {
                const data = msg.data

                // 初始化
                this.shopDateList = []
                if (data.flag >> 0 !== 1000) {
                    this.$message.error(data.return_code)
                    this.loading = false
                    return false
                }

                this.shopDateList = data.goods_list

                // 转换开关布尔值
                // 若不存在 则设置false为默认值
                for (var i = this.shopDateList.length - 1; i >= 0; i--) {
                    if (this.shopDateList[i].is_on) {
                        this.shopDateList[i].is_on = !!Number(this.shopDateList[i].is_on)
                    } else {
                        this.shopDateList[i].is_on = false
                    }
                    if (this.shopDateList[i].switch_list) {
                        if (this.shopDateList[i].switch_list.is_boutique) {
                            this.shopDateList[i].switch_list.is_boutique = !!Number(this.shopDateList[i].switch_list.is_boutique)
                        } else {
                            this.shopDateList[i].switch_list.is_boutique = false
                        }
                        if (this.shopDateList[i].switch_list.is_hot) {
                            this.shopDateList[i].switch_list.is_hot = !!Number(this.shopDateList[i].switch_list.is_hot)
                        } else {
                            this.shopDateList[i].switch_list.is_hot = false
                        }
                        if (this.shopDateList[i].switch_list.is_new) {
                            this.shopDateList[i].switch_list.is_new = !!Number(this.shopDateList[i].switch_list.is_new)
                        } else {
                            this.shopDateList[i].switch_list.is_new = false
                        }
                    } else {
                        this.shopDateList[i].switch_list = {
                            is_boutique: false,
                            is_hot: false,
                            is_new: false
                        }
                    }
                }
                // 构建二次确认数据模型
                this.dialogVisible = []
                for (var i = 0; i < this.shopDateList.length; i++) {
                    this.dialogVisible.push({
                        model: false
                    })
                }

                // 设置当前页和总页数
                this.total_pages = (data.total_pages) >> 0
                this.current_page = (data.current_page) >> 0
                this.page_size = (data.page_size) >> 0

                // 商品设置开关
                // this.goodsSetSwitchModel = []
                // for (let i = 0; i < this.shopDateList.length; i++) {
                //     var model = []
                //     for (let ii = 0; ii < this.shopDateList[i].switch_list.length; ii++) {
                //         model.push({
                //             'model': !!(this.shopDateList[i].switch_list[ii].switch >> 0),
                //             'goods_id': this.shopDateList[i].id
                //         })
                //     }
                //     this.goodsSetSwitchModel[i] = model
                // }

                // 设置月销模型
                this.saleCount = []
                for (let i = 0; i < this.shopDateList.length; i++) {
                    var count = {
                        count: 0,
                        status: true
                    }
                    this.saleCount[i] = count
                }
                this.loading = false
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 商品设置开关
        goodsSetSwitch (goods_id, switch_name, switch_value) {
            // Debug 处理
            this.value1 = !this.value1
            this.$axios.post(API.switchHandleUrl, {
                'goods_id': goods_id,
                'switch_name': switch_name,
                'switch_value': Number(switch_value)
            })
            .then(msg => {
                const data = msg.data

                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }

                this.$message({
                    message: data.return_code,
                    type: 'success'
                })
                // 重新加载数据
                this.searchShopData(this.current_page)
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 设置月销量
        handleSaleCount (id, sale_count) {
            this.sale_count = sale_count
            this.sale_id = id
            this.dialogSaleCount = true
        },

        // 提交月销量
        postSaleCount () {
            this.$axios.post(API.handleSaleCount, {
                'goods_id': this.sale_id,
                'sale_count': this.sale_count
            })
            .then(msg => {
                const data = msg.data

                if (data.flag >> 0 !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }
                this.dialogSaleCount = false
                this.searchShopData(this.current_page)
                this.$message({
                    message: data.return_code,
                    type: 'success'
                })
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }

        // 商品设置置顶&取消
        // toGoTop (scope) {
        //   var popular = scope.row.popular === 1 ? 0 : 1
        //   // scope.row
        //   // 当前点击数据的所有值
        //   this.$axios.post(API.popularHandleUrl, {
        //     'goods_id': scope.row.id,
        //     'popular': popular
        //   })
        //   .then((msg) => {
        //     console.log(msg.data)
        //     if (msg.data.flag >> 0 === 1000) {
        //       // statement
        //       this.consoleSuccess(`${msg.data.return_code}`)
        //       this.getShopData()
        //     } else {
        //       this.consoleError(`${msg.data.return_code}`)
        //     }
        //   })
        //   .catch(error => {
        //     this.consoleError(`服务器${error.response}`)
        //   })
        // },

        // // 商品设置推荐&取消
        // toGoRecommend (scope) {
        //   var special_power = scope.row.special_power === 1 ? 0 : 1
        //   // scope.row
        //   // 当前点击数据的所有值
        //   this.$axios.post(API.specialPowerHandleUrl, {
        //     'goods_id': scope.row.id,
        //     'special_power': special_power
        //   })
        //   .then((msg) => {
        //     console.log(msg.data)
        //     if (msg.data.flag >> 0 === 1000) {
        //       // statement
        //       this.consoleSuccess(`${msg.data.return_code}`)
        //       this.getShopData()
        //     } else {
        //       this.consoleError(`${msg.data.return_code}`)
        //     }
        //   })
        //   .catch(error => {
        //     this.consoleError(`服务器${error.response}`)
        //   })
        // },

        // deleteRow (index, rows) {
        //   rows.splice(index, 1)
        // },

        // // 删除
        // deleteNewerGoodsInfo (id, index) {
        //   console.log(index)
        //   this.$axios.post(API.deleteNewerGoodsInfoUrl, {
        //     'goods_id': id
        //   })
        //   .then((msg) => {
        //     console.log(msg.data)
        //     if (msg.data.flag >> 0 === 1000) {
        //       // statement
        //       this.dialogVisible[index].model = false
        //       this.consoleSuccess(`${msg.data.return_code}`)
        //       this.getShopData()
        //     } else {
        //       this.consoleError(`${msg.data.return_code}`)
        //     }
        //   })
        //   .catch(error => {
        //     this.consoleError(`服务器${error.response}`)
        //   })
        // },
    }
}
</script>
