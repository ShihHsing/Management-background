<template>
    <div id="addStore">
        <el-col :span="24" style="height: 100%; width: 100%;">
            <!-- 头部 -->
            <div class="addStore_top">
                <span>添加门店</span>
            </div>
            
            <div class="addStore_form_wrap">
                <div class="addStore_form_body sx_basis_scroll sx_scroll_style">
                    
                    <el-form
                        :model="addStoreValues"
                        :rules="addStoreValuesRules"
                        ref="addStoreValues"
                        label-position="left"
                        label-width="120px"
                        class="addStore_form">

                        <el-form-item label="门店名称:" prop="name">
                            <el-input placeholder="请输入门店名称" style="width: 217px;" v-model="addStoreValues.name"></el-input>
                        </el-form-item>

                        <el-form-item label="老板姓名:" prop="boss_name">
                            <el-input placeholder="请输入老板姓名" style="width: 217px;" v-model="addStoreValues.boss_name"></el-input>
                        </el-form-item>

                        <el-form-item label="老板手机号:" prop="boss_phone_number" required>
                            <el-input placeholder="请输入老板手机号" style="width: 217px;" v-model.number="addStoreValues.boss_phone_number"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="门店地址:" required>
                            <el-select v-model="addStoreValues.province_id" clearable placeholder="请选择所在省/市" @change="getCity(addStoreValues.province_id)">
                                <el-option
                                    v-for="item in provinceList"
                                    :label="item.area_name"
                                    :value="item.area_no">
                                </el-option>
                            </el-select>
                            /
                            <template v-if="addStoreValues.province_id === '100000'">
                                
                            </template>
                            <template v-else-if="addStoreValues.province_id === '110000'">
                                
                            </template>
                            <template v-else-if="addStoreValues.province_id === '120000'">
                                
                            </template>
                            <template v-else-if="addStoreValues.province_id === '130000'">
                                
                            </template>
                            <template v-else-if="addStoreValues.province_id === '410000'">
                                
                            </template>
                            <template v-else-if="addStoreValues.province_id === '420000'">
                                
                            </template>
                            <template v-else>
                                <el-select v-model="addStoreValues.city_id" clearable placeholder="请选择所在市" @change="getDistrict(addStoreValues.city_id)">
                                    <el-option
                                        v-for="item in cityList"
                                        :label="item.area_name"
                                        :value="item.area_no">
                                    </el-option>
                                </el-select>
                                /
                            </template>
                            <el-select v-model="addStoreValues.district_id" clearable placeholder="请选择所在区">
                                <el-option
                                    v-for="item in districtList"
                                    :label="item.area_name"
                                    :value="item.area_no">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="街道地址:" prop="shop_address" required>
                            <el-input placeholder="请输入街道地址" style="width: 500px;" v-model="addStoreValues.shop_address"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="备注:" prop="info">
                            <el-input placeholder="请输入备注" style="width: 500px;" type="textarea" v-model.number="addStoreValues.info"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('addStoreValues')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </div>
</template>

<style lang="less">
    #addStore{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .addStore_top{
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
        .addStore_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .addStore_form_body{
                width: 100%;
                height: 100%;
                .addStore_form{
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
        }
    }
</style>

<script>
import { addShop } from '../assets/axios/api.js'
export default {
    name: 'addStore',
    data () {
        var checkPhone = (rule, value, callback) => {
            var phoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
            if (!value) {
                return callback(new Error('电话不能为空'))
            }
            setTimeout(() => {
                console.log(value)
                if (isNaN(value)) {
                    return callback(new Error('请输入数字值'))
                }

                if (!phoneReg.test(value)) {
                    return callback(new Error('手机号码格式有误'))
                }

                callback()
            }, 1000)
        }
        return {
            addStoreValues: {
                name: '', // 门店名称
                boss_name: '', // 老板姓名
                boss_phone_number: null, // 老板手机好
                province_id: '', // 省id
                city_id: '', // 市id
                district_id: '', // 区id
                shop_address: '', // 街道地址
                info: '' // 备注
            },
            provinceList: [], // 省 后台数据
            cityList: [], // 市 后台数据
            districtList: [], // 区 后台数据
            addStoreValuesRules: {
                name: [
                    { required: true, message: '请输入门店名称', trigger: 'change' }
                ],
                boss_name: [
                    { required: true, message: '请输入老板姓名', trigger: 'change' }
                ],
                boss_phone_number: [
                    { validator: checkPhone, trigger: 'blur' }
                ],
                shop_address: [
                    { required: true, message: '请输入街道地址', trigger: 'change' }
                ]
            }
        }
    },
    created: function () {
        // 初始化获取省列表
        this.getProvinceList()
    },
    methods: {
        // 提交颜色
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    this.$message({
                        message: '请完善必填信息',
                        type: 'warning'
                    })
                    return false
                }

                if (!this.addStoreValues.province_id) {
                    this.$message({
                        message: '请选择所在省',
                        type: 'warning'
                    })
                    return false
                }

                if (!this.statusCity_id()) {
                    this.$message({
                        message: '请选择所在市',
                        type: 'warning'
                    })
                    return false
                }

                if (!this.addStoreValues.district_id) {
                    this.$message({
                        message: '请选择所在区',
                        type: 'warning'
                    })
                    return false
                }
            })
        },

        // 获取省列表
        getProvinceList () {
            this.$axios.post(addShop, {
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
            this.
            // 清空选择中的市
            this.addStoreValues.city_id = ''
            // 清空区列表
            this.districtList = ''
            // 清空选择中的区
            this.addStoreValues.district_id = ''

            if (!province_id) return false

            this.$axios.post(addShop, {
                post_flag: 'city',
                province_id
            })
            .then(msg => {
                const data = msg.data

                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }
                if (this.addStoreValues.province_id !== '100000' || this.addStoreValues.province_id !== '110000' || this.addStoreValues.province_id !== '120000' || this.addStoreValues.province_id !== '130000' || this.addStoreValues.province_id !== '410000' || this.addStoreValues.province_id !== '420000') {
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
            this.addStoreValues.district_id = ''
            if (!city_id) return false

            this.$axios.post(addShop, {
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
        },

        // 判断市id状态
        statusCity_id () {
            if (this.addStoreValues.city_id) {
                return true
            } else {
                if (this.addStoreValues.province_id !== '100000' || this.addStoreValues.province_id !== '110000' || this.addStoreValues.province_id !== '120000' || this.addStoreValues.province_id !== '130000' || this.addStoreValues.province_id !== '410000' || this.addStoreValues.province_id !== '420000') {
                    return true
                }
                return false
            }
        }
    }
}
</script>
