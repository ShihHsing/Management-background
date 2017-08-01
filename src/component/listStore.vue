<template>
    <div id="listStore">
        <el-row style="margin-bottom: 15px;">
            <el-col :span="24">
                <el-form :model="getShopList" label-position="top" label-width="75px">
                    <div style="min-width: 800px;">
                        <div class="searchInput">
                            <el-form-item>
                                <el-select v-model="getShopList.province" clearable placeholder="请选择所在省/市" @change="getCity(getShopList.province)">
                                    <el-option
                                        v-for="item in provinceList"
                                        :label="item.area_name"
                                        :value="item.area_no">
                                    </el-option>
                                </el-select>
                                /
                                <template v-if="getShopList.province === '100000'">
                                    
                                </template>
                                <template v-else-if="getShopList.province === '110000'">
                                    
                                </template>
                                <template v-else-if="getShopList.province === '120000'">
                                    
                                </template>
                                <template v-else-if="getShopList.province === '130000'">
                                    
                                </template>
                                <template v-else-if="getShopList.province === '410000'">
                                    
                                </template>
                                <template v-else-if="getShopList.province === '420000'">
                                    
                                </template>
                                <template v-else>
                                    <el-select v-model="getShopList.city" clearable placeholder="请选择所在市" @change="getDistrict(getShopList.city)">
                                        <el-option
                                            v-for="item in cityList"
                                            :label="item.area_name"
                                            :value="item.area_no">
                                        </el-option>
                                    </el-select>
                                    /
                                </template>
                                <el-select v-model="getShopList.district" clearable placeholder="请选择所在区">
                                    <el-option
                                        v-for="item in districtList"
                                        :label="item.area_name"
                                        :value="item.area_no">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="searchInput" style="margin-left: 12px;">
                            <el-form-item>
                                <el-input placeholder="请输入门店名称、老板姓名或老板手机号" style="width: 275px;" v-model="getShopList.condition"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-button type="primary" @click="getStoreList(1)" style="float: right;">立即搜索</el-button>
                        </div>
                    </div>
                </el-form>
            </el-col>
        </el-row>
        <div class="listStore_body_wrap">
            <div class="listStore_body">
                <div class="table_body sx_basis_scroll sx_scroll_style" id="table">
                    <el-table
                        :data="storeList"
                        border
                        stripe
                        :height="tableHeight"
                        v-loading="loading"
                        element-loading-text="加载中...">
                        <el-table-column
                            prop="shop_name"
                            label="门店名称">
                            </el-table-column>
                        <el-table-column
                            label="老板姓名"
                            prop="boss_name">
                        </el-table-column>
                        <el-table-column
                            prop="boss_phone_number"
                            label="老板手机号">
                        </el-table-column>
                        <el-table-column
                            label="门店地址">
                            <template scope="scope">
                                {{ scope.row.province_name + scope.row.city_name + scope.row.district_name }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="shop_address"
                            label="街道地址">
                        </el-table-column>
                        <el-table-column
                            prop="info"
                            label="备注">
                            <template scope="scope">
                                <template v-if="scope.row.info === ''">无</template>
                                <template v-else>
                                    {{ scope.row.info }}
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template scope="scope">
                                <template v-if="">
                                    
                                </template>
                                <template v-els>
                                    <el-button type="text" @click="">停用(门店id{{ scope.row.id }})</el-button>
                                </template>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="current_page"
                        :page-size="page_size"
                        layout="prev, pager, next, jumper"
                        :total="total_count"
                        style="float: right;padding: 0;">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #listStore{
        box-sizing: border-box;

        width: 100%;
        height: 100%;
        
        padding: 30px;
        background: #fff;

        overflow: hidden;
        label{
            color: #8492A6;
        }
        .listStore_body_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;

            padding-bottom: 73px;
            .listStore_body{
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
        .searchInput{
            float: left;
        }
    }
    .el-dialog__wrapper{
        z-index: 999999 !important;
    }
</style>

<script>
import { getShopList } from '../assets/axios/api.js'
export default {
    name: 'listStore',
    data () {
        return {
            tableHeight: null, // 表格高度
            getShopList: {
                province: '', // 省
                city: '', // 市
                district: '', // 区
                condition: '' // 搜索字段
            },
            provinceList: [], // 省 后台数据
            cityList: [], // 市 后台数据
            districtList: [], // 区 后台数据
            storeList: [], // 门店数据列表
            current_page: '', // 当前页
            total_count: '', // 总条数
            page_size: 2 // 每页条数
        }
    },
    computed: {
        city: function () {
            if (this.getShopList.province === '100000' || this.getShopList.province === '110000' || this.getShopList.province === '120000' || this.getShopList.province === '130000' || this.getShopList.province === '410000' || this.getShopList.province === '420000') {
                return this.getShopList.province
            }
        }
    },
    created: function () {
        this.getProvinceList() // 初始化获取省列表
        this.getStoreList() // 初始化获取门店列表
        this.$nextTick(function () { // 获取表格高度
            this.tableHeight = document.getElementById('table').offsetHeight
        })
    },
    methods: {
        // 根据用户输入条件搜索数据
        handleCurrentChange (val) {
            this.current_page = val
            this.getStoreList()
        },
        // 获取门店列表
        getStoreList (current_page) {
            this.loading = true
            this.$axios.post(getShopList, {
                province: this.getShopList.province,
                city: this.getShopList.city || this.getShopList.province,
                district: this.getShopList.district,
                condition: this.getShopList.condition,
                current_page: current_page || this.current_page
            })
            .then(msg => {
                const data = msg.data

                this.loading = false
                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }

                this.storeList = data.shop_list // 门店数据
                this.current_page = data.current_page >> 0 // 当前页
                this.total_count = data.total_count >> 0 // 总条数
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 获取省列表
        getProvinceList () {
            this.$axios.post(getShopList, {
                post_flag: 'province'
            })
            .then(msg => {
                const data = msg.data

                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }

                this.provinceList = data.province_list
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 获取市列表
        getCity (province_id) {
            // 清空市列表
            this.cityList = ''
            // 清空选择中的市
            this.getShopList.city = ''
            // 清空区列表
            this.districtList = ''
            // 清空选择中的区
            this.getShopList.district = ''

            if (!province_id) return false

            this.$axios.post(getShopList, {
                post_flag: 'city',
                province_id
            })
            .then(msg => {
                const data = msg.data

                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }
                if (this.getShopList.province !== '100000' || this.getShopList.province !== '110000' || this.getShopList.province !== '120000' || this.getShopList.province !== '130000' || this.getShopList.province !== '410000' || this.getShopList.province !== '420000') {
                    this.getDistrict(province_id)
                }
                this.cityList = data.city_list
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 获取区
        getDistrict (city_id) {
            // 清空区列表
            this.districtList = ''
            // 清空选择中的区
            this.getShopList.district = ''
            if (!city_id) return false

            this.$axios.post(getShopList, {
                post_flag: 'district',
                city_id
            })
            .then(msg => {
                const data = msg.data

                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }

                this.districtList = data.district_list
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
