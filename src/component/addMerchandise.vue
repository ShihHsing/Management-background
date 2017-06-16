<template>
    <div id="addMerchandise">
        <div class="addMerchandise_top">
            <el-col :span="8">
                <el-steps :active="active" finish-status="success">
                    <el-step title="步骤 1"></el-step>
                    <el-step title="步骤 2"></el-step>
                    <el-step title="步骤 3"></el-step>
                    <el-step title="步骤 4"></el-step>
                    <el-step title="步骤 5"></el-step>
                </el-steps>
            </el-col>
        </div>
        <div class="addMerchandise_form_wrap">
            <div class="addMerchandise_form_body">
                <el-row type="flex" class="steps_wrap" justify="center">
                    <el-col :span="14" class="steps">
                        <el-carousel
                            indicator-position="none"
                            :autoplay="false"
                            ref="elCarousel"
                            arrow="never"
                            style="height: 100%;">
                            <!-- 第一页 -->
                            <el-carousel-item>
                                <div class="sx_basis_scroll sx_scroll_style">
                                    <el-form
                                        :model="one"
                                        :rules="oneRules"
                                        ref="one"
                                        label-position="left"
                                        label-width="100px">
                                        <el-card class="box-card">
                                            <el-form-item label="商品品牌" prop="commodityBrand">
                                                <el-select v-model="one.commodityBrand" placeholder="请选择商品品牌">
                                                    <el-option v-for="item in one.commodityBrandList" :label="item.product_name" :value="item.id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="商品分类" prop="commodityClassification">
                                                <el-select v-model="one.commodityClassification" placeholder="请选择商品分类">
                                                    <el-option v-for="item in one.commodityClassificationList" :label="item.category_name" :value="item.id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="flag1 && submitForm('one')">下一步</el-button>
                                            </el-form-item>
                                        </el-card>
                                    </el-form>
                                    
                                </div>
                            </el-carousel-item>
                            <!-- 第一页 End -->

                            <!-- 第二页 -->
                            <el-carousel-item id="none-align-items">
                                <!-- 由于 align-items: center; 影响无法展示全部内容 不再设置父元素高度-->
                                <div class="sx_basis_scroll sx_scroll_style" style="height: 100%;">
                                    <el-form
                                        :model="two"
                                        :rules="twoRules"
                                        ref="two"
                                        label-position="left"
                                        label-width="100px">
                                        <el-card class="box-card">
                                            <el-form-item label="商品标题" prop="commodityTitle">
                                                <el-input type="textarea" v-model="two.commodityTitle" placeholder="请输入商品标题"></el-input>
                                            </el-form-item>

                                            <el-form-item label="商品简介" prop="commodityIntroduction">
                                                <el-input type="textarea" v-model="two.commodityIntroduction" placeholder="请输入商品简介"></el-input>
                                            </el-form-item>

                                            <el-form-item label="商品款号" prop="commodityNumber">
                                                <el-input type="textarea" v-model="two.commodityNumber" placeholder="请输入商品款号"></el-input>
                                            </el-form-item>

                                            <el-form-item label="商品条码" prop="commodityBarcode">
                                                <el-input type="textarea" v-model="two.commodityBarcode" placeholder="请输入全球统一条形码"></el-input>
                                            </el-form-item>

                                            <el-form-item label="商品价格" prop="price">
                                                <el-input v-model="two.price" placeholder="请输入商品价格"></el-input>
                                            </el-form-item>

                                            <el-form-item label="易企秀" prop="shop_show">
                                                <el-input placeholder="请输入易企秀链接" v-model="two.shop_show"></el-input>
                                            </el-form-item>

                                            <div v-for="(item,index) in privateProperty" v-if="privateProperty">
                                                <el-form-item :label="item.argument_value" required>
                                                    <el-select placeholder="请选择" v-model="two.privatePropertyList[index].attributeValue" v-on:change="getPrivatePropertyList();">
                                                        <el-option v-for="childItem in item.child_list" :label="childItem.argument_value" :value="childItem.id"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </div >

                                            <el-form-item>
                                                <el-button type="primary" @click="flag2 && submitForm('two')">下一步</el-button>
                                            </el-form-item>
                                        </el-card>
                                    </el-form>
                                </div>
                            </el-carousel-item>
                            <!-- 第二页 End -->

                            <!-- 第三页 -->
                            <el-carousel-item>
                                <div class="sx_basis_scroll sx_scroll_style" style="height: 100%;">
                                    <el-form
                                        :model="three"
                                        ref="three"
                                        label-position="left"
                                        label-width="100px">
                                        <el-card class="box-card">
                                            <el-form-item label="商品列表图" required>
                                            <el-upload
                                                class="upload-demo"
                                                :action="uploadAddNewerGoodsInfo"
                                                list-type="picture"
                                                :on-success="handleSuccess1"
                                                :on-error="uploadError"
                                                :on-remove="uploadRemove"
                                                :multiple="false"
                                                name="thumb_image"
                                                ref="thumb_image">
                                                <el-button size="small" type="primary">点击上传</el-button>
                                                <div class="el-upload__tip" slot="tip">请上传图片大小为370*400像素尺寸jpg/png文件,且不超过500kb,列表图在商品库存、商家推荐及订单列表中显示</div>
                                                </el-upload>
                                            </el-form-item>

                                            <el-form-item label="商品音频">
                                                <el-upload
                                                    class="upload-demo"
                                                    :action="uploadAddNewerGoodsInfo"
                                                    :on-success="handleSuccess2"
                                                    :on-error="uploadError"
                                                    :multiple="false"
                                                    name="audio"
                                                    ref="audio">
                                                    <el-button size="small" type="primary">点击上传</el-button>
                                                    <div class="el-upload__tip" slot="tip">请上传小于1MB,且格式为MP3音乐</div>
                                                </el-upload>
                                            </el-form-item>

                                            <el-form-item label="商品视频">
                                                <el-upload
                                                    class="upload-demo"
                                                    :action="uploadAddNewerGoodsInfo"
                                                    :on-success="handleSuccess3"
                                                    :on-error="uploadError"
                                                    :multiple="false"
                                                    name="video"
                                                    ref="video">
                                                    <el-button size="small" type="primary">点击上传</el-button>
                                                    <div class="el-upload__tip" slot="tip">请上传小于4MB,且格式为MP4的视频</div>
                                                </el-upload>
                                            </el-form-item>

                                            <el-form-item>
                                                <el-button type="primary" @click="flag3 && submitForm('three')">下一步</el-button>
                                            </el-form-item>
                                        </el-card>
                                    </el-form>
                                </div>
                            </el-carousel-item>
                            <!-- 第三页 End -->

                            <!-- 第四页 -->
                            <el-carousel-item>
                                <!-- 由于 align-items: center; 影响无法展示全部内容 不再设置父元素高度-->
                                <div class="sx_basis_scroll sx_scroll_style" style="height: 100%;">
                                    <el-form
                                        :model="four"
                                        ref="four"
                                        label-position="left"
                                        label-width="100px">
                                        <el-card class="box-card">
                                            <el-form-item label="颜色分类" required>
                                                <el-checkbox-group v-model="four.checkedCities" @change="handleCheckedCitiesChange">
                                                    <el-checkbox v-for="city in four.cities" :label="city">{{city}}</el-checkbox>
                                                </el-checkbox-group>
                                                <div style="color: #666">若您需要的颜色不在此分类请移步至<router-link to="/goodsPrivateColor">商品私有颜色</router-link>添加</div>
                                            </el-form-item>

                                            <el-form-item label="尺码" required>
                                                <el-checkbox :indeterminate="four.isIndeterminateSize" v-model="four.checkAllSize" @change="handleCheckAllChangeSize">全选</el-checkbox>
                                                <el-checkbox-group v-model="four.checkedSize" @change="handleCheckedCitiesChangeSize">
                                                    <el-checkbox v-for="city in four.size_list" :label="city">{{city}}</el-checkbox>
                                                </el-checkbox-group>
                                                <div style="color: #666">若您需要的尺码不在此分类请移步至<router-link to="/goodsPrivateSize">商品私有颜色</router-link>添加</div>
                                            </el-form-item>

                                            <el-form-item label="商品图片" required>
                                                <div v-for="(city,index) in four.checkedCities">
                                                    <!-- action冒号问题 -->
                                                    <el-upload
                                                        class="upload-demo"
                                                        :action="uploadAddNewerGoodsInfo"
                                                        :thumbnail-mode="true"
                                                        :multiple="false"
                                                        :on-success="colorAndImgSuccess"
                                                        :on-error="uploadError"
                                                        name="normal_image"
                                                        :data="{'imgColor': four.checkedCities[index]}"
                                                        ref="normal_image"
                                                        list-type="picture">
                                                        <el-button size="small" type="primary">请上传<em>{{ four.checkedCities[index] }}</em>商品的商品图片</el-button>
                                                        <div class="el-upload__tip" style="color:#555;" slot="tip">请上传<b style="color:#20A0FF;">{{ four.checkedCities[index] }}</b>商品的商品图片,并只能上传jpg/png文件，且不超过500kb</div>
                                                    </el-upload>
                                                </div>
                                            </el-form-item>

                                            <el-form-item>
                                                <el-button type="primary" @click="flag4 && submitForm('four')">下一步</el-button>
                                            </el-form-item>
                                        </el-card>
                                    </el-form>
                                </div>
                            </el-carousel-item>
                            <!-- 第四页 End -->
                            <el-carousel-item>
                                <!-- 由于 align-items: center; 影响无法展示全部内容 不再设置父元素高度-->
                                <div class="sx_basis_scroll sx_scroll_style" style="height: 100%;">
                                    <el-form
                                        :model="four"
                                        ref="four"
                                        label-width="47%">
                                        <el-card class="box-card">
                                            <!-- <div class="sx_basis_scroll sx_scroll_style_lucency"> -->
                                                <quill-editor
                                                ref="myTextEditor"
                                                v-model="description"
                                                :options="editorOption"
                                                @change="updateData"
                                                @showImageUI="imageHandler">
                                                </quill-editor>
                                            <!-- </div> -->
                                            <input type="file" name="file" id="fileinput" @change="customimgupload($event)" style="display: none;">
                                            <div style="color: #666;width: 100%;text-align: center;margin: 25px 0;">
                                            商品详情图片大小不能超过1M,否则会导致添加商品失败</div>
                                            <el-form-item>
                                                <el-button type="primary" @click="flag5 && submitForm('End')">下一步</el-button>
                                            </el-form-item>
                                        </el-card>
                                    </el-form>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #addMerchandise{
        width: 100%;
        height: 100%;
        
        background: #fff;

        overflow: hidden;
        .addMerchandise_top{
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;

            height: 133px;
            width: 100%;
            
            padding: 0 30px;

            border-bottom: 1px solid #E5E9F2;
        }
        label{
            color: #8492A6;
        }
        .addMerchandise_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 253px;
            .addMerchandise_form_body{
                width: 100%;
                height: 100%;
                .steps_wrap{
                    height: 100%;
                    width: 100%;

                    margin-top: 60px;
                    .steps{
                        .el-carousel__container{
                            height: 100%;
                        }
                        label{
                            color: #8492A6;
                        }
                        .quill-editor{
                            min-height: 220px;
                        }
                    }
                }
            }
        }
    }
</style>

<script>
import * as API from '../assets/axios/api.js'
export default {
    name: 'addMerchandise',
    data () {
        return {
            editorOption: {}, // 富文本对象
            flag1: true, // 控制点击事件防止多次触发
            flag2: true,
            flag3: true,
            flag4: true,
            flag5: true,
            active: 0,
            uploadAddNewerGoodsInfo: API.uploadAddNewerGoodsInfo, // 文件上传
            one: {
                commodityBrand: '', // 商品品牌
                commodityBrandList: [],
                commodityClassification: '', // 商品分类
                commodityClassificationList: []
            },
            two: {
                commodityTitle: '', // 商品标题
                commodityIntroduction: '', // 商品简介
                commodityNumber: '', // 商品款号
                commodityBarcode: '', // 商品条码
                price: '', // 商品价格
                shop_show: '', // 易企秀
                privateProperty: [], // 私有属性 服务器端获取数据
                privatePropertyList: [] // 生成新的数据结构
            },
            three: {
                thumb_image: true, // 商品列表图
                thumb_image_url: '', // 商品列表图地址
                thumb_imageList: [], // 商品列表图数据
                audio: true, // 音频
                audio_url: '', // 商品音频地址
                audioList: [], // 商品音频数据
                video: true, // 视频
                video_url: '', // 商品视频地址
                videoList: [] // 商品视频数据
            },
            four: {
                checkAll: false, // 用于实现颜色全选效果
                isIndeterminate: false,
                cities: [], // 服务端获取颜色数组
                colorList: [], // 服务端保存颜色数据
                checkedCities: [], // 用户选择的颜色
                colorAndImg: [], // 动态生成颜色图片对应关系数据模型
                checkAllSize: false, // 用于尺码颜色全选效果
                isIndeterminateSize: false,
                checkedSize: [], // 用户选择的尺码
                size_list: [], // 服务端获取尺寸数组
                sizeList: [] // 服务端获取尺寸源数据
            },
            userColorHistoricalRecord: [], // 用户操作颜色历史记录
            oneRules: { // 第一页验证规则
                commodityBrand: [
                    { required: true, message: '请选择商品品牌', trigger: 'change' }
                ],
                commodityClassification: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ]
            },
            twoRules: { // 第二页验证规则
                commodityTitle: [
                    { required: true, message: '请输入商品标题', trigger: 'change' }
                ],
                commodityIntroduction: [
                    { required: true, message: '请输入商品简介', trigger: 'change' }
                ],
                commodityNumber: [
                    { required: true, message: '请输入商品款号', trigger: 'change' }
                ],
                commodityBarcode: [
                    { required: true, message: '请输入商品条码', trigger: 'change' }
                ],
                price: [
                    { required: true, message: '请输入商品价格', trigger: 'change' }
                ]
            },
            elCarousel: '',
            description: '',
            newDescription: ''
        }
    },

    computed: {
        privateProperty: function () {
            // 检查商品属性是否有空属性存在 存在过滤
            // 若过滤后属性列表为空 则抛出Error
            var arrList = []
            for (var i = this.two.privateProperty.length - 1; i >= 0; i--) {
                if (this.two.privateProperty[i].hasOwnProperty('child_list')) {
                    arrList.push(this.two.privateProperty[i])
                    // ------- 定义新的数据模型绑定数据 -------
                    var newAttribute = {
                        attribute: this.two.privateProperty[i].argument_value,
                        attributeValue: ''
                    }
                    this.two.privatePropertyList.push(newAttribute)
                // ----------------------------------------
                }
            }
            if (arrList.length >> 0 !== 0) {
                return arrList
            }
            return ''
        }
    },

    created: function () {
        // 初始化获取商品品牌和商品分类
        this.getCommodityBrandAndCommodityClassification()
    },

    methods: {
        /* ------------------ 自定义富文本图片上传 ------------------- */
        imageHandler () {
            const fileinput = document.getElementById('fileinput')
            fileinput.click()
        },
        customimgupload () {
            var formData = new FormData()
            formData.append('image', fileinput.files[0])
            if (fileinput.files[0]) {
                API.myAjax({
                    url: API.editorServer,
                    data: formData,
                    success: msg => {
                        var imageUrl = msg
                        var range = this.$refs.myTextEditor.quillEditor.getSelection()
                        var length = range.index
                        this.$refs.myTextEditor.quillEditor.insertEmbed(length, 'image', imageUrl)
                    },
                    fail: error => {
                        console.log(error)
                    }
                })
            }
        },
        /* --------------------------------------------------------- */

        // 富文本数据更新
        // 如果用户操则会更新数据
        // 第一次进入初始化 为上传准确性
        // 最终上传以 newDescription 数据为准
        updateData (data) {
            this.newDescription = data.html
        },

        submitForm (formName) {
            switch (formName) {
            case 'one':
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        /* === 移除绑定事件 多次连续点击产生Bug === */
                        this.flag1 = false
                        /* ======================================== */
                        /* === 根据商品品牌和商品分类获取属性 === */
                        this.getShopStyle()
                        /* ====================================== */
                    }
                })
                break
            case 'two':
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (!this.twoReg()) {
                            this.$message.error('请完善商品属性')
                            return false
                        }

                        /* === 移除绑定事件 多次连续点击产生Bug === */
                        this.flag2 = false
                        /* ======================================== */
                        this.active ++
                        this.$refs.elCarousel.next()
                    }
                })
                break
            case 'three':
                if (this.three.thumb_image_url === '') {
                    this.$message.error('请上传商品缩略图')
                    return false
                }

                /* === 移除绑定事件 多次连续点击产生Bug === */
                this.flag3 = false
                /* ======================================== */
                this.active ++
                this.$refs.elCarousel.next()
                break
            case 'four':
                var count = 0
                for (let i = 0; i < this.four.colorAndImg.length; i++) {
                    if (this.four.colorAndImg[i].imgUrl !== '') {
                        count++
                    }
                }

                if (this.four.checkedCities.length > 0 && this.four.checkedSize.length > 0 && count === this.four.colorAndImg.length) {
                    /* === 移除绑定事件 多次连续点击产生Bug === */
                    this.flag4 = false
                    /* ======================================== */
                    this.active ++
                    this.$refs.elCarousel.next()
                } else {
                    this.$message.error('请完善商品颜色图片与尺寸信息')
                }
                break
            default:
                if (this.newDescription === '') {
                    this.$message.error('请完善商品详情')
                    return false
                }

                /* === 移除绑定事件 多次连续点击产生Bug === */
                this.flag5 = false
                /* ======================================== */
                this.postAddShopData()
                break
            }
        },

        // 商品列表图
        handleSuccess1 (response, file, fileList) {
            if (response.flag >> 0 !== 1000) {
                this.three.thumb_image = true
                this.$refs.thumb_image.clearFiles()
                this.$message.error(response.return_code)
                const uploadFiles = this.$refs.thumb_image.uploadFiles
                if (uploadFiles.length === 2) {
                    uploadFiles.shift()
                }
                return false
            }

            // false数据不存在 true数据上传成功
            this.three.thumb_image = false
            this.three.thumb_imageList = response
            this.three.thumb_image_url = response.file_url
            const uploadFiles = this.$refs.thumb_image.uploadFiles
            if (uploadFiles.length === 2) {
                uploadFiles.shift()
            }
            this.$message({
                message: response.return_code,
                type: 'success'
            })
        },

        // 移除图片
        uploadRemove () {
            this.three.thumb_image_url = ''
        },

        // 商品音频
        handleSuccess2 (response, file, fileList) {
            if (response.flag >> 0 !== 1000) {
                this.three.audio = true
                this.$refs.audio.clearFiles()
                this.$message.error(response.return_code)
                const uploadFiles = this.$refs.audio.uploadFiles
                if (uploadFiles.length === 2) {
                    uploadFiles.shift()
                }
                return false
            }

            // false数据不存在 true数据上传成功
            this.three.audio = false
            this.three.audioList = response
            this.three.audio_url = response.file_url
            const uploadFiles = this.$refs.audio.uploadFiles
            if (uploadFiles.length === 2) {
                uploadFiles.shift()
            }
            this.$message({
                message: response.return_code,
                type: 'success'
            })
        },

        // 商品视频
        handleSuccess3 (response, file, fileList) {
            if (response.flag >> 0 !== 1000) {
                this.three.video = true
                this.$refs.video.clearFiles()
                this.$message.error(response.return_code)
                const uploadFiles = this.$refs.video.uploadFiles
                if (uploadFiles.length === 2) {
                    uploadFiles.shift()
                }
                return false
            }

            // false数据不存在 true数据上传成功
            this.three.video = false
            this.three.videoList = response
            this.three.video_url = response.file_url
            const uploadFiles = this.$refs.video.uploadFiles
            if (uploadFiles.length === 2) {
                uploadFiles.shift()
            }
            this.$message({
                message: response.return_code,
                type: 'success'
            })
        },

        // 获取商品品牌和商品分类
        getCommodityBrandAndCommodityClassification () {
            var _this = this
            this.$axios.post(API.addNewerGoodsInfo, {
                'request_flag': 'product_list'
            })
            .then(msg => {
                if (msg.data.flag >> 0 !== 1000) {
                    this.$message.error(msg.data.return_code)
                    return false
                }

                /* ========= 商品品牌列表 ============= */
                if (msg.data.product_list) {
                    _this.one.commodityBrandList = msg.data.product_list
                }
                /* ==================================== */

                /* ============= 商品分类列表 ============ */
                if (msg.data.category_list) {
                    _this.one.commodityClassificationList = msg.data.category_list
                }
                /* ======================================= */
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 根据商品品牌和商品分类获取属性
        getShopStyle () {
            var _this = this
            this.$axios.post(API.addNewerGoodsInfo, {
                'request_flag': 'arguments_list',
                'product_id': this.one.commodityBrand,
                'category_id': this.one.commodityClassification
            })
            .then((msg) => {
                if (msg.data.flag >> 0 !== 1000) {
                    // 解除按钮锁定
                    this.flag1 = true
                    this.$message.error('商品属性' + msg.data.return_code)
                    return false
                }

                /* =================== 获取商品属性 ======================== */
                if (msg.data.category_arguments_list.category_argument_list) {
                    _this.two.privateProperty = msg.data.category_arguments_list.category_argument_list
                }
                /* ======================================================== */

                /* ======== 获取商品颜色 ======== */
                this.getColorClassification('color_list')
                /* ================================ */
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 属性检验规则 第二步骤
        twoReg () {
            // 计数检查数据模型是否有空值存在
            var countReg = true
            if (this.two.privatePropertyList.length === 0) {
                return false
            }

            for (var i = 0, length1 = this.two.privatePropertyList.length; i < length1; i++) {
                if (this.two.privatePropertyList[i].attributeValue === '') {
                    countReg = false
                }
            }
            return countReg
        },

        // 颜色选择 单选
        handleCheckedCitiesChange (value) {
            var checkedCount = value.length
            this.four.checkAll = checkedCount === this.four.cities.length
            this.four.isIndeterminate = checkedCount > 0 && checkedCount < this.four.cities.length

            /* === 记录用户每次颜色选择的操作 === */
            this.userColorModelHistoricalRecord()
            /* ================================== */

            /* 根据用户选择颜色 动态生成颜色、图片对应关系 */
            this.createColorAndImg()
            /* =========================================== */
        },

        // 尺码选择 全选
        handleCheckAllChangeSize (event) {
            this.four.checkedSize = event.target.checked ? this.four.size_list : []
            this.four.isIndeterminateSize = false
        },

        // 尺码选择 单选
        handleCheckedCitiesChangeSize (value) {
            var checkedCount = value.length
            this.four.checkAllSize = checkedCount === this.four.size_list.length
            this.four.isIndeterminateSize = checkedCount > 0 && checkedCount < this.four.size_list.length
        },

        // 服务器获取颜色分类
        getColorClassification (request_flag) {
            this.$axios.post(API.addNewerGoodsInfo, {
                'product_id': this.one.commodityBrand,
                'category_id': this.one.commodityClassification,
                'request_flag': request_flag
            })
            .then((msg) => {
                if (msg.data.flag >> 0 !== 1000) {
                    if (request_flag === 'color_list') {
                        this.consoleWarning(`颜色分类${msg.data.return_code}`)
                        return false
                    }
                    this.consoleWarning(`尺码分类${msg.data.return_code}`)
                    return false
                }

                if (request_flag === 'color_list') {
                    if (msg.data.category_color_list.length === 0) {
                        return false
                    }
                    for (let i = 0; i < msg.data.category_color_list.length; i++) {
                        this.four.cities.push(msg.data.category_color_list[i].argument_value)
                    }
                    this.four.colorList = msg.data.category_color_list
                    /* ============== 获取尺寸 =============== */
                    this.getColorClassification('size_list')
                    /* ======================================= */
                } else if (request_flag === 'size_list') {
                    if (msg.data.category_size_list.length === 0) {
                        return false
                    }
                    for (let i = 0; i < msg.data.category_size_list.length; i++) {
                        this.four.size_list.push(msg.data.category_size_list[i].argument_value)
                    }
                    this.four.sizeList = msg.data.category_size_list
                    /* ============下一步 ============== */
                    this.active ++
                    this.$refs.elCarousel.next()
                    /* ================================ */
                }
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 服务器获取尺寸分类
        // 动态生成颜色图片对应关系数据模型
        createColorAndImg () {
            // 初始化数据模型 可能要做DeBug处理 若用户上传图片又改动选择颜色 图片对应关系也会被初始化
            if (this.four.colorAndImg.length >> 0 !== 0) {
                // 判断用户是添加还是删除
                // 0代表删除 1代表添加
                var userOperation = (this.userColorHistoricalRecord[1].length) > (this.userColorHistoricalRecord[0].length) ? 1 : 0
                var userOperationColor = this.removeDuplicate()
                if (userOperation >> 0 === 1) {
                    const colorImg = {
                        color: userOperationColor[0],
                        imgUrl: ''
                    }
                    this.four.colorAndImg.push(colorImg)
                } else if (userOperation >> 0 === 0) {
                    for (var i = 0; i < this.four.colorAndImg.length; i++) {
                        if (this.four.colorAndImg[i].color === userOperationColor[0]) {
                            this.four.colorAndImg.splice(i, 1)
                        }
                    }
                }
                return false
            }

            for (let j = 0; j < this.four.checkedCities.length; j++) {
                const colorImg = {
                    color: this.four.checkedCities[j],
                    imgUrl: ''
                }
                this.four.colorAndImg.push(colorImg)
            }
        },

        // 两数组比较去重
        removeDuplicate () {
            // 克隆数据模型中数据 在操作
            var arr1 = this.userColorHistoricalRecord[0].concat()
            var arr2 = this.userColorHistoricalRecord[1].concat()
            var arr3 = ''
            for (var i = 0; i < arr1.length;) {
                for (var ii = 0; ii < arr2.length;) {
                    if (arr1[i] === arr2[ii]) {
                        // statement
                        arr1.splice(i, 1)
                        arr2.splice(ii, 1)
                        continue
                    }
                    ii++
                }
                i++
            }
            arr3 = arr1.concat(arr2)
            return arr3
        },

        // ////////////////////////////////////////
        // 维护用户颜色选择                      //
        // 记录每一次颜色的变化                  //
        // 每次抽取[length-1] 与现有数据模型比较 //
        // 增加或者删除 重新生成数据模型         //
        // ////////////////////////////////////////
        userColorModelHistoricalRecord () {
            if (this.userColorHistoricalRecord.length >= 2) {
                // statement
                this.userColorHistoricalRecord.splice(0, 1)
                this.userColorHistoricalRecord.push(this.four.checkedCities)
                return false
            }

            this.userColorHistoricalRecord.push(this.four.checkedCities)
        },

        // 商品颜色图片
        colorAndImgSuccess (response, file, fileList) {
            if (response.flag >> 0 === 1000) {
                var imgColor = response.imgColor
                for (let i = 0; i < this.four.colorAndImg.length; i++) {
                    if (this.four.colorAndImg[i].color === imgColor) {
                        this.four.colorAndImg[i].imgUrl = response.file_url
                    }
                }
                this.$message({
                    message: response.return_code,
                    type: 'success'
                })
                return false
            }
            this.$message.error(response.return_code)
        },

        // 文件上传失败
        uploadError () {
            this.$message.error('上传文件有误!请重新上传!')
        },

        getPrivatePropertyList () {
            console.log(this.two.privatePropertyList)
        },

        // 组建最终提交数据
        buildAddShopData () {
            var argument = []
            argument.push({ 'product_id': this.one.commodityBrand })
            argument.push({ 'category_id': this.one.commodityClassification })
            argument.push({ 'title': this.two.commodityTitle })
            argument.push({ 'sub-title': this.two.commodityIntroduction })
            argument.push({ 'model': this.two.commodityNumber })
            argument.push({ 'code': this.two.commodityBarcode })
            argument.push({ 'price': this.two.price })
            argument.push({ 'shop_show': this.two.shop_show })
            argument.push({ 'thumb_image': this.three.thumb_image_url })
            argument.push({ 'audio': this.three.audio_url })
            argument.push({ 'video': this.three.video_url })
            argument.push({ 'description': this.newDescription })

            // 生成商品颜色图片数组
            var imgsUrl = []
            for (let i = 0; i < this.four.colorAndImg.length; i++) {
                imgsUrl.push(this.four.colorAndImg[i].imgUrl)
            };
            argument.push({ imgsUrl: imgsUrl })

            var colorAndImg = this.four.colorAndImg.concat()
            for (let i = 0; i < colorAndImg.length; i++) {
                for (let ii = 0; ii < this.four.colorList.length; ii++) {
                    if (this.four.colorList[ii].argument_value === colorAndImg[i].color) {
                        colorAndImg[i].color = this.four.colorList[ii].id
                    }
                }
            }
            argument.push({ imgAndColor: colorAndImg })

            // 属性数组
            var sub_args = []
            for (let i = 0; i < this.four.checkedCities.length; i++) {
                for (let ii = 0; ii < this.four.colorList.length; ii++) {
                    if (this.four.colorList[ii].argument_value === this.four.checkedCities[i]) {
                        sub_args.push(this.four.colorList[ii].id)
                    }
                }
            }
            for (let i = 0; i < this.four.checkedSize.length; i++) {
                for (let ii = 0; ii < this.four.sizeList.length; ii++) {
                    if (this.four.sizeList[ii].argument_value === this.four.checkedSize[i]) {
                        sub_args.push(this.four.sizeList[ii].id)
                    }
                }
            }
            for (let i = 0; i < this.two.privatePropertyList.length; i++) {
                sub_args.push(this.two.privatePropertyList[i].attributeValue)
            }
            argument.push({ 'sub-args': sub_args })

            return argument
        },

        // 提交数据
        postAddShopData () {
            this.$axios.post(API.addNewerGoodsInfo, {
                arguments: this.buildAddShopData()
            })
            .then((msg) => {
                if (msg.data.flag >> 0 === 1000) {
                    this.$message({
                        message: msg.data.return_code,
                        type: 'success'
                    })
                    setTimeout(() => {
                        this.$router.push({ path: 'listOfGoods' })
                    }, 2000)
                    return false
                }

                this.$message(msg.data.return_code)
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
