<template>
    <div id="shopFaqList">
        <el-row style="margin-bottom: 15px;">
            <el-col :span="24">
                <el-form :model="searchList">
                    <el-input v-model="searchList.keyword" style="width: 217px;" placeholder="问题关键字"></el-input>
                    <el-select v-model="searchList.type" clearable placeholder="问题分类">
                        <el-option
                            v-for="item in shopFaqTypeListAll"
                            :label="item.t_type_name"
                            :value="item.t_id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="submitForm(1)" style="float: right;">
                        <template v-if="searchList.keyword === '' &&searchList.type === ''">
                            查看全部
                        </template>
                        <template v-else>
                            立即搜索
                        </template>
                    </el-button>
                </el-form>
            </el-col>
        </el-row>
        <div class="shopFaqList_body_wrap">
            <div class="shopFaqList_body">
                <div class="table_body sx_basis_scroll sx_scroll_style" id="table">
                    <el-table
                        :data="shopFaqList"
                        border
                        stripe
                        :height="tableHeight"
                        v-loading="loading"
                        element-loading-text="加载中...">
                        <el-table-column
                            prop="f_title"
                            label="问题">
                        </el-table-column>
                        <el-table-column
                            prop="f_type_name"
                            label="分类">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="160">
                            <template scope="scope">
                                <router-link :to="{path: 'editShopFaqInfo', query: {id: scope.row.f_id}}" replace>
                                    <el-button size="small" type="success">修改</el-button>
                                </router-link>
                                <el-button size="small" type="danger" @click="openDel(scope.row.f_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="current_page"
                        :page-size="20"
                        layout="prev, pager, next, jumper"
                        :total="sum"
                        style="float: right;padding: 0;">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
#shopFaqList{
    box-sizing: border-box;

    width: 100%;
    height: 100%;
    
    padding: 30px;
    background: #fff;

    overflow: hidden;
    label{
        color: #8492A6;
    }
    .shopFaqList_body_wrap{
        box-sizing: border-box;

        width: 100%;
        height: 100%;

        padding-bottom: 73px;
        .shopFaqList_body{
            display: flex;
            flex-direction: column;

            width: 100%;
            height: 100%;
            .table_body{
                width: 100%;
                flex: 1;
                .freeze-row{
                    background-color: #FF4949;
                }
            }
            .pagination{
                width: 100%;
                height: 30px;

                margin-top: 30px;
            }
        }
    }
    .searchInput{
        float: left;
    }
}
.el-dialog__wrapper{
    z-index: 999999 !important;
} 
</style>

<script>
import { getShopFaqTypeListAll, getShopFaqList, deleteShopFaqInfoById } from '../../assets/axios/api.js'
export default {
    name: 'shopFaqList',
    data () {
        return {
            loading: false, // 列表loading
            tableHeight: null, // 表格高度
            shopFaqTypeListAll: [], // 问题分类
            searchList: {
                keyword: '', // 关键字
                type: '' // 问题分类
            },
            shopFaqList: [], // 问题列表
            current_page: 1, // 当前页
            sum: 0 // 总条数
        }
    },
    created: function () {
        // 获取问题分类
        this.getShopFaqTypeListAll()
        // 获取列表数据
        this.submitForm()
        this.$nextTick(function () { // 获取表格高度
            this.tableHeight = document.getElementById('table').offsetHeight
        })
    },
    methods: {
        // 获取列表
        submitForm (current_page) {
            this.loading = true
            this.$axios.post(getShopFaqList, {
                keyword: this.searchList.keyword,
                type: this.searchList.type,
                current_page: current_page || this.current_page
            })
            .then(msg => {
                const data = msg.data

                this.loading = false

                if (data.status === 9001) {
                    this.shopFaqList = []
                    return false
                }
                
                if (data.status !== 1000) {
                    this.shopFaqList = []
                    this.$message.error(data.ret_msg)
                    return false
                }

                this.shopFaqList = data.data.faq_list // 门店数据
                // 总条数
                this.sum = parseInt(data.data.sum)
                // 当前页
                this.current_page = parseInt(data.data.current_page)
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },
        // 获取分类列表
        getShopFaqTypeListAll () {
            this.$axios.post(getShopFaqTypeListAll)
            .then(msg => {
                const data = msg.data

                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    return false
                }

                // 列表数据
                this.shopFaqTypeListAll = data.data.type_list
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },
        // 根据用户输入条件搜索数据
        handleCurrentChange (val) {
            this.submitForm(val)
        },
        // 删除分类
        openDel (id) {
            this.$confirm('此操作将永久删除此问答, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 请求删除
                this.deleteShopFaqInfoById(id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        deleteShopFaqInfoById (id) {
            this.$axios.post(deleteShopFaqInfoById, {
                f_id: id
            })
            .then(msg => {
                const data = msg.data

                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    return false
                }

                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                // 重新获取当前页数据
                this.submitForm()
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
