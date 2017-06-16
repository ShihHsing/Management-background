<template>
    <div id="modificationMerchandise">
        <div class="modificationMerchandise_top">
            <el-col :span="8">
                <el-steps :active="active" finish-status="success">
                    <el-step title="步骤 1">
                    </el-step>
                    <el-step title="步骤 2">
                    </el-step>
                    <el-step title="步骤 3">
                    </el-step>
                    <el-step title="步骤 4">
                    </el-step>
                </el-steps>
            </el-col>
        </div>
        <div class="modificationMerchandise_form_wrap">
            <div class="modificationMerchandise_form_body">
                <el-row type="flex" class="steps_wrap" justify="center">
                    <el-col :span="14" class="steps">
                        <el-carousel 
                            indicator-position="none"
                            :autoplay="false"
                            ref="elCarousel"
                            arrow="never"
                            style="height: 100%;">
                            <!-- 第二页 -->
                            <el-carousel-item id="none-align-items">
                                <div class="sx_basis_scroll sx_scroll_style" style="height: 100%;">
                                    <el-form :model="two" :rules="twoRules" ref="two" label-position="left" label-width="100px">
                                        <el-card class="box-card">
                                            <el-form-item label="商品标题" prop="commodityTitle">
                                                <el-input type="textarea" v-model="two.commodityTitle" placeholder="请输入商品标题">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="商品简介" prop="commodityIntroduction">
                                                <el-input type="textarea" v-model="two.commodityIntroduction" placeholder="请输入商品简介">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="商品款号" prop="commodityNumber">
                                                <el-input type="textarea" v-model="two.commodityNumber" placeholder="请输入商品款号">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="商品条码" prop="commodityBarcode">
                                                <el-input type="textarea" v-model="two.commodityBarcode" placeholder="请输入全球统一条形码">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="商品价格" prop="price">
                                                <el-input v-model="two.price" placeholder="请输入商品价格">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="易企秀" prop="shop_show">
                                                <el-input placeholder="请输入易企秀链接" v-model="two.shop_show">
                                                </el-input>
                                            </el-form-item>
                                            <div v-for="(item,index) in two.privateProperty">
                                                <el-form-item :label="item.argument_value" required>
                                                    <el-select placeholder="请选择" v-model="two.privatePropertyList[index].attributeValue"
                                                    v-on:change="getPrivatePropertyList();">
                                                        <el-option v-for="childItem in item.child_list" :label="childItem.argument_value"
                                                        :value="childItem.id">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </div>
                                            <el-form-item>
                                                <el-button type="primary" @click="flag1 && submitForm('two')">
                                                    下一步
                                                </el-button>
                                            </el-form-item>
                                        </el-card>
                                    </el-form>
                                </div>
                            </el-carousel-item>
                            <!-- 第二页 End -->
                            <!-- 第三页 -->
                            <el-carousel-item>
                                <div class="sx_basis_scroll sx_scroll_style" style="height: 100%;">
                                    <el-form :model="three" ref="three" label-position="left" label-width="100px">
                                        <el-card class="box-card">
                                            <el-form-item label="商品列表图" required>
                                                <el-upload class="upload-demo" :action="uploadAddNewerGoodsInfo" :on-remove="removeThreeImage"
                                                list-type="picture" :on-success="handleSuccess1" :on-error="uploadError"
                                                :multiple="false" :file-list="three.thumb_image_file_list" name="thumb_image"
                                                ref="thumb_image">
                                                    <el-button size="small" type="primary">
                                                        点击上传
                                                    </el-button>
                                                    <div class="el-upload__tip" slot="tip">
                                                        请上传图片大小为370*400像素尺寸jpg/png文件,且不超过500kb,列表图在商品库存、商家推荐及订单列表中显示
                                                    </div>
                                                </el-upload>
                                            </el-form-item>
                                            <el-form-item label="商品音频">
                                                <el-upload class="upload-demo" :action="uploadAddNewerGoodsInfo" :on-success="handleSuccess2"
                                                :on-error="uploadError" :multiple="false" :file-list="three.audio_file_list"
                                                name="audio" ref="audio">
                                                    <el-button size="small" type="primary">
                                                        点击上传
                                                    </el-button>
                                                    <div class="el-upload__tip" slot="tip">
                                                        请上传小于1MB,且格式为MP3音乐
                                                    </div>
                                                </el-upload>
                                            </el-form-item>
                                            <el-form-item label="商品视频">
                                                <el-upload class="upload-demo" :action="uploadAddNewerGoodsInfo" :on-success="handleSuccess3"
                                                :on-error="uploadError" :multiple="false" :file-list="three.video_file_list"
                                                name="video" ref="video">
                                                    <el-button size="small" type="primary">
                                                        点击上传
                                                    </el-button>
                                                    <div class="el-upload__tip" slot="tip">
                                                        请上传小于4MB,且格式为MP4的视频
                                                    </div>
                                                </el-upload>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="flag2 && submitForm('three')">
                                                    下一步
                                                </el-button>
                                            </el-form-item>
                                        </el-card>
                                    </el-form>
                                </div>
                            </el-carousel-item>
                            <!-- 第三页 End -->
                            <!-- 第四页 -->
                            <el-carousel-item>
                                <div class="sx_basis_scroll sx_scroll_style" style="height: 100%;">
                                    <el-form :model="four" ref="four" label-position="left" label-width="100px">
                                        <el-card class="box-card">
                                            <el-form-item label="颜色分类" required>
                                                <el-checkbox-group v-model="four.checkedCities" @change="handleCheckedCitiesChange">
                                                    <el-checkbox v-for="city in four.cities" :label="city">
                                                        {{city}}
                                                    </el-checkbox>
                                                </el-checkbox-group>
                                                <div style="color: #666">
                                                    请选择需要修改或添加的颜色以及图片,若无需修改请勿操作!原有颜色以及商品颜色图片
                                                    <el-button type="text" @click="four.dialogVisible = true">
                                                        点击查看
                                                    </el-button>
                                                </div>
                                            </el-form-item>
                                            <el-form-item label="尺码" required>
                                                <el-checkbox-group v-model="four.checkedSize" @change="handleCheckedCitiesChangeSize">
                                                    <el-checkbox v-for="city in four.size_list" :label="city">
                                                        {{city}}
                                                    </el-checkbox>
                                                </el-checkbox-group>
                                                <div style="color: #666">
                                                    若您需要的尺码不在此分类请移步至
                                                    <router-link to="/goodsPrivateSize">
                                                        商品私有尺码
                                                    </router-link>
                                                    添加
                                                </div>
                                            </el-form-item>
                                            <el-form-item label="商品图片" required>
                                                <div v-for="(city,index) in four.checkedCities">
                                                    <el-upload class="upload-demo" :action="uploadAddNewerGoodsInfo" :thumbnail-mode="true"
                                                    :multiple="false" :on-success="colorAndImgSuccess" :on-error="uploadError"
                                                    name="normal_image" :data="{'imgColor': four.checkedCities[index]}" ref="normal_image"
                                                    list-type="picture">
                                                        <el-button size="small" type="primary">
                                                            请上传
                                                            <em>
                                                                {{ four.checkedCities[index] }}
                                                            </em>
                                                            商品的商品图片
                                                        </el-button>
                                                        <div class="el-upload__tip" style="color:#555;" slot="tip">
                                                            请上传
                                                            <b style="color:#20A0FF;">
                                                                {{ four.checkedCities[index] }}
                                                            </b>
                                                            商品的商品图片,并只能上传jpg/png文件，且不超过500kb
                                                        </div>
                                                    </el-upload>
                                                </div>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="flag3 && submitForm('four')">
                                                    下一步
                                                </el-button>
                                            </el-form-item>
                                        </el-card>
                                    </el-form>
                                </div>
                            </el-carousel-item>
                            <!-- 第四页 End -->
                            <el-carousel-item>
                                <div class="sx_basis_scroll sx_scroll_style" style="height: 100%;">
                                    <el-form :model="four" ref="four" label-width="47%">
                                        <el-card class="box-card">
                                            <div class="sx_basis_scroll sx_scroll_style_lucency">
                                                <!-- <vue-html5-editor :content="description" @change="updateData"></vue-html5-editor> -->
                                                <quill-editor ref="myTextEditor" v-model="description" :options="editorOption"
                                                @showImageUI="imageHandler" @change="updateData">
                                                </quill-editor>
                                            </div>
                                            <input type="file" name="file" id="fileinput" @change="customimgupload($event)"
                                            style="display: none;">
                                            <div style="color: #666;width: 100%;text-align: center;margin-bottom: 35px;">
                                                商品详情图片大小不能超过1M,否则会导致添加商品失败
                                            </div>
                                            <el-form-item>
                                                <el-button type="primary" @click="flag4 && submitForm('End')">
                                                    下一步
                                                </el-button>
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
        <!-- 颜色以及图片[旧] -->
        <el-dialog title="操作说明" v-model="four.dialogVisible" size="tiny">
            <span>
                1.原有颜色以及商品颜色图片
            </span>
            </br>
            <span>
                2.若要修过或者新增请关闭操作说明,在修改页面选择颜色后上传
            </span>
            </br>
            <span>
                3.若不需要某一颜色图片,请点击删除!
            </span>
            </br>
            <span>
                4.若无需修改请勿操作!
            </span>
            </br>
            <el-table :data="goods_detail.image_url" border stripe style="width: 100%">
                <el-table-column prop="color_name" label="颜色">
                </el-table-column>
                <el-table-column label="图片">
                    <template scope="scope">
                        <img width="100%" height="auto" :src="scope.row.image_url" alt="商品颜色图">
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" type="danger" @click.native.prevent="removerColor(scope.row.color_name,scope.$index);">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="four.dialogVisible = false">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style lang="less">
    #modificationMerchandise{
        width: 100%;
        height: 100%;
        
        background: #fff;

        overflow: hidden;
        .modificationMerchandise_top{
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
        .modificationMerchandise_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 253px;
            .modificationMerchandise_form_body{
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
// 脚本文件
export default {
    name: 'modificationMerchandise',
    data () {
        return {
            editorOption: {},
            flag1: true, // 富文本对象
            flag2: true, // 控制点击事件防止多次触发
            flag3: true,
            flag4: true,
            active: 0,
            uploadAddNewerGoodsInfo: API.uploadAddNewerGoodsInfo,
            shopID: '', // 初始化获取商品ID
            goods_detail: [], // 服务器获取商品详情
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
                thumb_image: false, // 商品列表图
                thumb_image_file_list: [], // 服务器获取地址
                thumb_image_url: '', // 商品列表图地址
                thumb_imageList: [], // 商品列表图数据
                audio: false, // 音频
                audio_file_list: [], // 服务器获取地址
                audio_url: '', // 商品音频地址
                audioList: [],  // 商品音频数据
                video: false, // 视频
                video_file_list: [], // 服务器获取地址
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
                sizeList: [], // 服务端获取尺寸源数据
                dialogVisible: false // 消息提示控件
            },
            userColorHistoricalRecord: [], // 用户操作颜色历史记录
            description: '', // 旧商品详情
            newDescription: '', // 新商品详情
            oneRules: { // 第一页验证规则
                commodityBrand: [{
                    required: true,
                    message: '请选择商品品牌',
                    trigger: 'change'
                }],
                commodityClassification: [{
                    required: true,
                    message: '请选择商品分类',
                    trigger: 'change'
                }]
            },
            twoRules: { // 第二页验证规则
                commodityTitle: [{
                    required: true,
                    message: '请输入商品标题',
                    trigger: 'change'
                }],
                commodityIntroduction: [{
                    required: true,
                    message: '请输入商品简介',
                    trigger: 'change'
                }],
                commodityNumber: [{
                    required: true,
                    message: '请输入商品款号',
                    trigger: 'change'
                }],
                commodityBarcode: [{
                    required: true,
                    message: '请输入商品条码',
                    trigger: 'change'
                }],
                price: [{
                    required: true,
                    message: '请输入商品价格',
                    trigger: 'change'
                }]
            },
            elCarousel: ''
        }
    },

    created: function () {
        // 获取商品ID
        this.shopID = this.$route.query.shopID
        // 获取商品详情
        this.getGoodsDetail()
    },

    methods: {
        /* -------------------------- 移除列表图 ---------------------- */
        removeThreeImage () {
            this.three.thumb_image_url = ''
        },
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
        // 获取商品详细信息
        getGoodsDetail () {
            if (this.shopID !== '') {
                // statement
                this.$axios.post(API.modifyNewerGoodsInfo, {
                    'goods_id': this.$route.query.shopID,
                    'request_flag': 'goods_detail'
                })
                .then((msg) => {
                    if (msg.data.flag >> 0 === 1000) {
                        if (msg.data.goods_detail !== '' || msg.data.goods_detail !== 'null') {
                            var goods_detail = msg.data.goods_detail
                            this.goods_detail = goods_detail
                            // statement
                            // 商品品牌
                            this.one.commodityBrand = goods_detail.product_id
                            // 商品分类
                            this.one.commodityClassification = goods_detail.category_id
                            // 商品标题
                            this.two.commodityTitle = goods_detail.title
                            // 商品简介
                            this.two.commodityIntroduction = goods_detail.sub_title
                            // 商品款号
                            this.two.commodityNumber = goods_detail.model
                            // 商品条码
                            this.two.commodityBarcode = goods_detail.code
                            // 商品价格
                            this.two.price = goods_detail.price
                            // 易企秀
                            this.two.shop_show = goods_detail.show_url
                            // 商品列表图
                            if (goods_detail.thumb_image !== '无') {
                                this.three.thumb_image_file_list = [{
                                    name: '商品列表图.jpg(若修改请删除后重新添加!)',
                                    url: goods_detail.thumb_image
                                }]
                            }
                            this.three.thumb_image_url = goods_detail.thumb_image
                            // 商品音频
                            if (goods_detail.audio !== '无') {
                                this.three.audio_file_list = [{
                                    name: '商品音频.mp3(若修改请删除后重新添加!)',
                                    url: goods_detail.audio
                                }]
                                this.three.audio_url = goods_detail.audio
                            }
                            // 商品视频
                            if (goods_detail.video !== '无') {
                                this.three.video_file_list = [{
                                    name: '商品视频.mp4(若修改请删除后重新添加!)',
                                    url: goods_detail.video
                                }]
                                this.three.video_url = goods_detail.video
                            }

                            // 尺码
                            if (goods_detail.sub_args.length !== 0) {
                                for (var i = 0; i < goods_detail.sub_args.length; i++) {
                                    if (goods_detail.sub_args[i].argument_name === '尺寸') {
                                        this.four.checkedSize.push(goods_detail.sub_args[i].argument_value)
                                    }
                                }
                            } else {
                                console.log(`获取尺码字段与预期不符!`)
                            }
                            // 图文详情数据
                            this.description = goods_detail.description
                            this.newDescription = this.description
                            /* ======== 初始化获取商品品牌和商品分类 ======== */
                            this.getCommodityBrandAndCommodityClassification()
                            /* ============================================== */
                        } else {
                            this.consoleNews('服务器发生未知错误,请刷新后重试!')
                        }
                    } else {
                        this.$message.error(msg.data.return_code)
                    }
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
            } else {
                this.$message.error('获取商品详细信息失败!请稍后重试!')
            }
        },

        // 删除颜色图片
        removerColor (color, index) {
            this.four.cities.push(color)
            this.goods_detail.image_url.splice(index, 1)
        },

        // 下一步&提交数据
        submitForm (formName) {
            switch (formName) {
            case 'two':
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.twoReg()) {
                            /* === 移除绑定事件 多次连续点击产生Bug === */
                            this.flag1 = false
                            /* ======================================== */
                            // 获取商品尺寸
                            this.getColorClassification('color_list')
                        } else {
                            this.$message.error('请完善商品属性')
                        }
                    }
                })
                break
            case 'three':
                if (this.three.thumb_image_url !== '') {
                    /* === 移除绑定事件 多次连续点击产生Bug === */
                    this.flag2 = false
                    /* ======================================== */
                    this.active ++
                    this.$refs.elCarousel.next()
                    this.four.dialogVisible = true
                } else {
                    this.consoleWarning(`请完善商品缩略图`)
                }
                break
            case 'four':
                var count = 0
                for (let i = 0; i < this.four.colorAndImg.length; i++) {
                    if (this.four.colorAndImg[i].imgUrl !== '') {
                        count++
                    }
                }
                if (this.four.checkedSize.length > 0) {
                    if (this.four.checkedCities.length > 0) {
                        if (count === this.four.colorAndImg.length) {
                            /* === 移除绑定事件 多次连续点击产生Bug === */
                            this.flag3 = false
                            /* ======================================== */
                            this.active ++
                            this.$refs.elCarousel.next()
                        } else {
                            this.$message.error('请完善商品图片信息')
                        }
                    } else if (this.four.checkedCities.length === 0 && count === this.four.colorAndImg.length) {
                        /* === 移除绑定事件 多次连续点击产生Bug === */
                        this.flag3 = false
                        /* ======================================== */
                        this.active ++
                        this.$refs.elCarousel.next()
                    }
                } else {
                    this.$message.error('请完善商品尺寸信息')
                }
                break
            default:
                if (this.newDescription !== '') {
                    /* === 移除绑定事件 多次连续点击产生Bug === */
                    this.flag4 = false
                    /* ======================================== */
                    this.postAddShopData()
                } else {
                    this.$message.error('请完善商品详情')
                }
                break
            }
        },

        resetForm (formName) {
            this.$refs[formName].resetFields()
            if (formName === 'three') {
                this.$refs.thumb_image.clearFiles()
                this.$refs.audio.clearFiles()
                this.$refs.video.clearFiles()
            }
        },

        // 商品列表图
        handleSuccess1 (response, file, fileList) {
            if (response.flag >> 0 === 1000) {
                // statement
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
            } else {
                this.three.thumb_image = true
                this.$refs.thumb_image.clearFiles()
                const uploadFiles = this.$refs.thumb_image.uploadFiles
                if (uploadFiles.length === 2) {
                    uploadFiles.shift()
                }
                this.$message.error(response.return_code)
            }
        },

        // 商品音频
        handleSuccess2 (response, file, fileList) {
            if (response.flag >> 0 === 1000) {
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
            } else {
                this.three.audio = true
                this.$refs.audio.clearFiles()
                const uploadFiles = this.$refs.audio.uploadFiles
                if (uploadFiles.length === 2) {
                    uploadFiles.shift()
                }
                this.$message.error(response.return_code)
            }
        },

        // 商品视频
        handleSuccess3 (response, file, fileList) {
            if (response.flag >> 0 === 1000) {
                // statement
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
            } else {
                this.three.video = true
                this.$refs.video.clearFiles()
                const uploadFiles = this.$refs.video.uploadFiles
                if (uploadFiles.length === 2) {
                    uploadFiles.shift()
                }
                this.$message.error(response.return_code)
            }
        },

        // 获取商品品牌和商品分类
        getCommodityBrandAndCommodityClassification () {
            var _this = this
            this.$axios.post(API.addNewerGoodsInfo, {
                request_flag: 'product_list'
            })
            .then((msg) => {
                // 商品品牌列表
                var product_list = msg.data.product_list
                _this.one.commodityBrandList = product_list
                // 商品分类列表
                var category_list = msg.data.category_list
                _this.one.commodityClassificationList = category_list
                /* 根据商品品牌和商品分类获取属性 */
                this.getShopStyle()
                /* ============================= */
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 根据商品品牌和商品分类获取属性
        getShopStyle () {
            var _this = this
            this.$axios.post(API.addNewerGoodsInfo, {
                request_flag: 'arguments_list',
                product_id: this.one.commodityBrand,
                category_id: this.one.commodityClassification
            })
            .then((msg) => {
                console.log(msg.data)
                if (msg.data.flag >> 0 === 1000) {
                    /* =================== 获取商品属性 ======================== */
                    if (msg.data.category_arguments_list.category_argument_list) {
                        _this.two.privateProperty = msg.data.category_arguments_list.category_argument_list
                    } else {
                        console.log(`category_argument_list字段不存在`)
                    }
                    /* ======================================================== */

                    /* ====== 接收服务器信息 向原有数据模型动态添加新模型 ===== */
                    if (this.two.privateProperty !== 0) {
                        for (let i = 0; i < this.two.privateProperty.length; i++) {
                            // 接收服务器信息 向原有数据模型动态添加新模型
                            var newAttribute = {
                                attribute: this.two.privateProperty[i].argument_value,
                                attributeValue: ''
                            }
                            this.two.privatePropertyList.push(newAttribute)
                        }
                    } else {
                        console.log(`privateProperty字段为空,请检查!`)
                    }
                    /* ======================================================= */

                    /* ==================== 分类属性选择 ===================== */
                    if (this.goods_detail.sub_args.length !== 0 && this.two.privatePropertyList.length !== 0) {
                        for (let i = 0; i < this.goods_detail.sub_args.length; i++) {
                            for (let ii = 0; ii < this.two.privatePropertyList.length; ii++) {
                                if (this.goods_detail.sub_args[i].argument_name === this.two.privatePropertyList[ii].attribute) {
                                    this.two.privatePropertyList[ii].attributeValue = this.goods_detail.sub_args[i].argument_id
                                }
                            }
                        }
                    } else {
                        console.log(`goods_detail.sub_args字段与this.privatePropertyList字段与预期不符!`)
                    }
                    /* ======================================================= */
                } else {
                    console.log(msg.data.return_code)
                }
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },
        // 填充商品分类属性
        // 属性检验规则 第二步骤
        twoReg () {
            // 计数检查数据模型是否有空值存在
            var countReg = true
            if (this.two.privatePropertyList.length !== 0) {
                for (var i = 0, length1 = this.two.privatePropertyList.length; i < length1; i++) {
                    if (this.two.privatePropertyList[i].attributeValue === '') {
                        countReg = false
                    }
                }
                return countReg
            } else {
                console.log(`two.privatePropertyList数据模型为空,与预期不符!`)
                return false
            }
        },

        // 颜色选择 单选
        handleCheckedCitiesChange (value) {
            var checkedCount = value.length
            console.log(value, checkedCount, '颜色单选')
            console.log(value, this.four.cities)
            // 记录用户每次颜色选择的操作
            this.userColorModelHistoricalRecord()
            // 根据用户选择颜色 动态生成颜色、图片对应关系
            this.createColorAndImg()
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
                product_id: this.one.commodityBrand,
                category_id: this.one.commodityClassification,
                request_flag: request_flag
            })
            .then((msg) => {
                if (msg.data.flag >> 0 === 1000) {
                    if (request_flag === 'color_list') {
                        const arr1 = []
                        const arr2 = []
                        /* ================== 颜色列表 ======================*/
                        const categoryColorList = msg.data.category_color_list
                        if (categoryColorList.length !== 0) {
                            for (let i = 0, length1 = categoryColorList.length; i < length1; i++) {
                                arr1.push(categoryColorList[i].argument_value)
                            }
                        } else {
                            console.log(`category_color_list字段与预期不符!`)
                        }
                        /* ================================================ */

                        /* =============== 商品颜色对应图片关系绑定 =============== */
                        if (this.goods_detail.image_url.length !== 0) {
                            for (let i = 0, length1 = this.goods_detail.image_url.length; i < length1; i++) {
                                arr2.push(this.goods_detail.image_url[i].color_name)
                            }
                        } else {
                            console.log(`this.goods_detail.image_url与预期不符`)
                        }
                        /* ======================================================== */

                        /* -------- arr1中去除arr2中所包含的元素 -------- */
                        for (let i = arr1.length - 1; i >= 0; i--) {
                            for (let ii = arr2.length - 1; ii >= 0; ii--) {
                                if (arr2[ii] === arr1[i]) {
                                    arr1.splice(i, 1)
                                }
                            }
                        }
                        /* ---------------------------------------------- */
                        this.four.cities = arr1
                        this.four.colorList = msg.data.category_color_list

                        /* ============== 获取尺寸 ============== */
                        this.getColorClassification('size_list')
                        /* ====================================== */
                    } else if (request_flag === 'size_list') {
                        if (msg.data.category_size_list.length !== 0) {
                            for (var i = 0; i < msg.data.category_size_list.length; i++) {
                                this.four.size_list.push(msg.data.category_size_list[i].argument_value)
                            }
                            this.four.sizeList = msg.data.category_size_list
                            /* ===== 进入下一步骤 ===== */
                            this.active ++
                            this.$refs.elCarousel.next()
                            /* ======================= */
                        } else {
                            console.log(`category_size_list字段与预期不符!`)
                        }
                    }
                } else {
                    this.consoleWarning(msg.data.return_code)
                }
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 服务器获取颜色分类 渲染至页面 [修改]
        postGoodsDetailColorUrl () {
            var count = 0
            for (var i = 0; i < this.goods_detail.sub_args.length; i++) {
                if (this.goods_detail.sub_args[i].argument_name === '颜色') {
                    this.four.checkedCities.push(this.goods_detail.sub_args[i].argument_value)
                    count++
                    // 记录用户每次颜色选择的操作
                    this.userColorModelHistoricalRecord()
                    // 根据用户选择颜色 动态生成颜色、图片对应关系
                    this.createColorAndImg()
                }
            }

            // 生成列表图
            for (let i = 0; i < this.goods_detail.image_url.length; i++) {
                this.four.PHPColorAndUrl.push([{
                    name: this.goods_detail.image_url[i].color_name + '.jpg',
                    url: this.goods_detail.image_url[i].image_url
                }])
            }
        },
        // 动态生成颜色图片对应关系数据模型
        createColorAndImg () {
            // 初始化数据模型 可能要做DeBug处理 若用户上传图片又改动选择颜色 图片对应关系也会被初始化
            if (this.four.colorAndImg.length >> 0 === 0) {
                for (var j = 0; j < this.four.checkedCities.length; j++) {
                    const colorImg = {
                        color: this.four.checkedCities[j],
                        imgUrl: ''
                    }
                    this.four.colorAndImg.push(colorImg)
                }
            } else {
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
                    for (let i = 0; i < this.four.colorAndImg.length; i++) {
                        if (this.four.colorAndImg[i].color === userOperationColor[0]) {
                            this.four.colorAndImg.splice(i, 1)
                        }
                    }
                }
                console.log(userOperationColor[0], '去重结果', this.userColorHistoricalRecord[0].length, '前一步用户选择', this.userColorHistoricalRecord[1].length, '当前用户选择', userOperation >> 0 === 1 ? '添加' : '删除', '用户操作')
            }

            console.log(this.four.colorAndImg, '数据模型')
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

        // /////////////////////////////////////////
        // 维护用户颜色选择                      //
        // 记录每一次颜色的变化                  //
        // 每次抽取[length-1] 与现有数据模型比较 //
        // 增加或者删除 重新生成数据模型         //
        // /////////////////////////////////////////
        userColorModelHistoricalRecord () {
            if (this.userColorHistoricalRecord.length >= 2) {
                this.userColorHistoricalRecord.splice(0, 1)
                this.userColorHistoricalRecord.push(this.four.checkedCities)
            } else {
                this.userColorHistoricalRecord.push(this.four.checkedCities)
            }
        },

        // 商品颜色图片
        colorAndImgSuccess (response, file, fileList) {
            if (response.flag >> 0 === 1000) {
                // statement
                var imgColor = response.imgColor
                for (var i = 0; i < this.four.colorAndImg.length; i++) {
                    if (this.four.colorAndImg[i].color === imgColor) {
                        this.four.colorAndImg[i].imgUrl = response.file_url
                    }
                }
                this.$message({
                    message: response.return_code,
                    type: 'success'
                })
            } else {
                this.$message.error(response.return_code)
            }
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
            argument.push({ product_id: this.one.commodityBrand })
            argument.push({ shop_show: this.two.shop_show })
            argument.push({ category_id: this.one.commodityClassification })
            argument.push({ title: this.two.commodityTitle })
            argument.push({ 'sub-title': this.two.commodityIntroduction })
            argument.push({ model: this.two.commodityNumber })
            argument.push({ code: this.two.commodityBarcode })
            argument.push({ price: this.two.price })
            argument.push({ thumb_image: this.three.thumb_image_url })
            argument.push({ audio: this.three.audio_url })
            argument.push({ video: this.three.video_url })
            argument.push({ description: this.newDescription })
            // 生成商品颜色图片数组
            var imgsUrl = []
            for (var i = 0; i < this.goods_detail.image_url.length; i++) {
                imgsUrl.push(this.goods_detail.image_url[i].image_url)
            }
            if (this.four.colorAndImg.length !== 0) {
                for (let i = 0; i < this.four.colorAndImg.length; i++) {
                    imgsUrl.push(this.four.colorAndImg[i].imgUrl)
                }
            }
            argument.push({ imgsUrl: imgsUrl })

            var colorAndImg = this.four.colorAndImg.concat()
            for (let i = 0; i < this.goods_detail.image_url.length; i++) {
                colorAndImg.push({
                    color: this.goods_detail.image_url[i].color_arg_id,
                    imgUrl: this.goods_detail.image_url[i].image_url
                })
            }
            if (colorAndImg.length !== 0) {
                for (let i = 0; i < colorAndImg.length; i++) {
                    for (let ii = 0; ii < this.four.colorList.length; ii++) {
                        if (this.four.colorList[ii].argument_value === colorAndImg[i].color) {
                            colorAndImg[i].color = this.four.colorList[ii].id
                        }
                    }
                }
            }
            argument.push({ imgAndColor: colorAndImg })

            // 属性数组
            var sub_args = []

            for (let i = 0, length1 = colorAndImg.length; i < length1; i++) {
                sub_args.push(colorAndImg[i].color)
            }
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

            // 数组去重
            sub_args = this.unique(sub_args)

            argument.push({ 'sub-args': sub_args })

            return argument
        },

        // 数组去重
        unique (arr) {
            var result = []
            var hash = {}
            for (var i = 0, elem; (elem = arr[i]) != null; i++) {
                if (!hash[elem]) {
                    result.push(elem)
                    hash[elem] = true
                }
            }
            return result
        },
        // 提交数据
        postAddShopData () {
            this.$axios.post(API.modifyNewerGoodsInfo, {
                arguments: this.buildAddShopData(),
                request_flag: 'modify',
                goods_id: this.goods_detail.id
            })
            .then((msg) => {
                if (msg.data.flag >> 0 === 1000) {
                    this.$message({
                        message: msg.return_code,
                        type: 'success'
                    })
                    setTimeout(() => {
                        this.$router.push({ path: 'listOfGoods' })
                    }, 2000)
                } else {
                    this.$message.error(msg.data.return_code)
                }
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
