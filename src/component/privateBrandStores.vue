<template>
    <div id="privateBrandStores">
        <el-row type="flex" class="steps" justify="center">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-size: 22px;">
                            添加自有品牌
                        </span>
                        <el-button style="float: right;" type="text" @click="dialogVisible = true">
                            操作说明
                        </el-button>
                    </div>
                    <el-table :data="ownProductList" stripe style="width: 100%">
                        <el-table-column prop="id" label="ID" width="60">
                        </el-table-column>
                        <el-table-column prop="product_name" label="品牌" align="center" header-align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center" header-align="center" width="80">
                            <template scope="scope">
                                <el-button type="text" @click="addNewerOwnProduct(scope.row.id)">
                                    添加
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <!-- 提示用户页面操作须知 -->
        <el-dialog title="操作说明" v-model="dialogVisible" size="tiny">
            <span>
                管理员通过商品管控-添加品牌添加的品牌信息会来到这里
                这里的品牌可以设置为自有品牌
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import '../assets/style/privateBrandStores.less'
import * as API from '../assets/axios/api.js'
export default {
    name: 'privateBrandStores',
    data () {
        return {
            dialogVisible: false,
            ownProductList: [] // 品牌列表
        }
    },
    created: function () {
        this.getOwnProductList()
    },
    methods: {
        // 获取商品列表
        getOwnProductList () {
            this.$axios.post(API.addNewerOwnProduct)
            .then(msg => {
                var data = msg.data
                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }
                this.ownProductList = data.product_list
            })
            .catch(error => {
                this.$message.error(error.response)
            })
        },

        addNewerOwnProduct (id) {
            if (!id) {
                this.$message.error('发生未知错误,门店ID丢失,请稍后重试!')
                return false
            }
            this.$axios.post(API.addNewerOwnProduct, {
                product_id: id
            })
            .then(msg => {
                var data = msg.data
                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    this.getOwnProductList()
                    return false
                }
                this.$message({
                    message: data.return_code,
                    type: 'success'
                })
                // 重新获取商品列表
                this.getOwnProductList()
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
