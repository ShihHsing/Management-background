<template>
    <div id="goodsPrivateProperty">
        <el-col :span="24">
            <!-- 头部 -->
            <div class="goodsPrivateProperty_top">
                <span>商品私有属性</span>
                <el-button class="OI" type="text" @click="dialogVisible = true">操作说明</el-button>
            </div>
            <el-form
                :model="goodsPrivateProperty"
                :rules="goodsPrivatePropertyRules"
                ref="goodsPrivateProperty"
                label-position="top"
                class="goodsPrivateProperty_form">
                <el-form-item label="商品品牌" prop="commodityBrand">
                    <el-select v-model="goodsPrivateProperty.commodityBrand" placeholder="请选择商品品牌">
                    <el-option v-for="item in goodsPrivateProperty.commodityBrandList" :label="item.product_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品分类" prop="commodityClassification">
                    <el-select v-model="goodsPrivateProperty.commodityClassification" placeholder="请选择商品分类">
                    <el-option v-for="item in goodsPrivateProperty.commodityClassificationList" :label="item.category_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="添加商品私有属性" prop="addGoodsPrivateProperty">
                    <el-input style="width: 217px;" v-model="goodsPrivateProperty.addGoodsPrivateProperty" placeholder="请添加商品私有属性"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('goodsPrivateProperty')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>

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

<style lang="less">
    #goodsPrivateProperty{
        box-sizing: border-box;

        width: 95%;
        height: 80%;
        
        margin: 0 auto;
        margin-top: 86px;

        background: #fff;
        .goodsPrivateProperty_top{
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;

            height: 50px;
            
            padding: 0 30px;

            border-bottom: 1px solid #E5E9F2;

            line-height: 50px;
            font-size: 18px;
            color: #8492A6;
            .OI{
                color: #1D8CE0;
                font-size: 12px;
            }
        }
        .goodsPrivateProperty_form{
            box-sizing: border-box;
            padding: 30px;

            label{
                color: #8492A6;
            }
            .el-tag{
                margin-right: 15px!important;
            }
        }
    }
</style>

<script>
import { addNewerCategoryArguments, addNewerGoodsInfo } from '../assets/axios/api.js'
export default {
    name: 'goodsPrivateProperty',
    data () {
        return {
            dialogVisible: false, // 消息提示控件
            goodsPrivateProperty: {
                commodityBrand: '', // 商品品牌
                commodityBrandList: [],
                commodityClassification: '', // 商品分类
                commodityClassificationList: [],
                addGoodsPrivateProperty: '' // 添加商品私有属性
            },
            goodsPrivatePropertyRules: { // 验证规则
                commodityBrand: [
                    { required: true, message: '请选择商品品牌', trigger: 'change' }
                ],
                commodityClassification: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ],
                addGoodsPrivateProperty: [
                    { required: true, message: '请添加商品私有属性', trigger: 'change' }
                ]
            }
        }
    },
    created: function () {
        // 初始化获取商品品牌和商品分类
        this.getCommodityBrandAndCommodityClassification()
    },
    methods: {
        // 提交属性
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    this.$message.error('请完善必填信息')
                    return false
                }

                this.$axios.post(addNewerCategoryArguments, {
                    'product_id': this.goodsPrivateProperty.commodityBrand,
                    'category_id': this.goodsPrivateProperty.commodityClassification,
                    'parent_id': 0, // 0代表商品分类属性
                    'argument': this.goodsPrivateProperty.addGoodsPrivateProperty
                })
                .then(msg => {
                    const data = msg.data

                    if (data.flag >> 0 !== 1000) {
                        this.$message.error(data.return_code)
                        return false
                    }

                    this.$message({
                        message: data.return_code,
                        type: 'success'
                    })

                    setTimeout(() => {
                        this.resetForm('goodsPrivateProperty')
                    }, 1200)
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
            })
        },

        // 获取商品品牌和商品分类
        getCommodityBrandAndCommodityClassification () {
            this.$axios.post(addNewerGoodsInfo, {
                'request_flag': 'product_list'
            })
            .then(msg => {
                const data = msg.data

                if (data.flag >> 0 !== 1000) {
                    this.$message.error(data.return_code)
                }
                // 商品品牌列表
                var product_list = data.product_list
                this.goodsPrivateProperty.commodityBrandList = product_list
                // 商品分类列表
                var category_list = data.category_list
                this.goodsPrivateProperty.commodityClassificationList = category_list
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
