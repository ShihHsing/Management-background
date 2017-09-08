<template>
    <div id="addCarouselDrawing">
        <div class="addCarouselDrawing_body_wrap">
            <!-- <div class="addCarouselDrawing_body"> -->
            <el-tabs type="border-card" @tab-click="getCarouselDrawingList" v-model="tabCheck">
                <el-tab-pane label="新增轮播图" name="addCarouselDrawing" class="sx_basis_scroll sx_scroll_style">
                    <el-form label-position="left" label-width="120px">
                        <el-form-item label="轮播图名称">
                            <el-tooltip class="item" effect="dark" content="请保证轮播图名称唯一" placement="right-start">
                                <el-input placeholder="请输入轮播图名称" v-model="name" :maxlength="20" style="width: 217px;">
                                </el-input>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="上传轮播图:">
                            <el-upload class="avatar-uploader" :action="uploadAddCarouselDrawing"
                            name="image_url" :on-success="addCarouselDrawingImg" :on-error="uploadError"
                            :before-upload="beforeAvatarUpload" :show-file-list="false">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon">
                                </i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="轮播图位置:">
                            <el-select v-model="location" placeholder="请选择">
                                <el-option v-for="item in location_type_list" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="轮播图类型:">
                            <el-radio-group v-model="carousel_drawing_type">
                                <template v-for="item in carousel_drawing_type_list">
                                    <el-radio-button :label="item.id" v-if="!(item.id == 2 && location == 3)">
                                        {{ item.name }}
                                    </el-radio-button>
                                </template>
                            </el-radio-group>
                        </el-form-item>
                        <template v-if="carousel_drawing_type >> 0 === 1">
                            <el-form-item label="图文详情:" id="myQuill">
                                <div class="sx_basis_scroll sx_scroll_style_lucency">
                                    <quill-editor v-if="carousel_drawing_type  >> 0 === 1" ref="myTextEditor"
                                    v-model="initData" :options="editorOption" @change="updateData" @showImageUI="imageHandler">
                                    </quill-editor>
                                </div>
                            </el-form-item>
                            <input type="file" name="file" id="fileinput" @change="customimgupload($event)"
                            style="display: none;">
                        </template>
                        <template v-else-if="carousel_drawing_type >> 0 === 2">
                            <el-form-item label="商品款号:">
                                <el-tooltip class="item" effect="dark" content="输入的商品款号将与此轮播图关联,下方会展示此款商品的缩略图,请核实!"
                                placement="right-start">
                                    <el-input placeholder="请输入" v-model="model" :maxlength="20" icon="search"
                                    :on-icon-click="getShopIdThumbImg" style="width: 217px;">
                                    </el-input>
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="商品缩略图">
                                <el-row>
                                    <el-col :span="8">
                                        <el-card :body-style="{ height: '150px'}">
                                            <template v-if="model_img != ''">
                                                <img :src="model_img" alt="商品缩略图" width="150">
                                            </template>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </template>
                        <template v-if="carousel_drawing_type >> 0 === 3">
                            <el-form-item label="视频地址:">
                                <el-tooltip class="item" effect="dark" content="请输入培训视频地址!" placement="right-start">
                                    <el-input placeholder="请输入" v-model="carousel_drawing_video_url" style="width: 217px;">
                                    </el-input>
                                </el-tooltip>
                            </el-form-item>
                        </template>
                        <el-button type="primary" @click="phpPostData">
                            创建轮播图
                        </el-button>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="轮播图列表" name="carouselDrawingList">
                    <el-form label-position="left" label-width="90px" class="listForm">
                        <el-row type="flex" justify="space-between">
                            <el-col :span="7">
                                <el-form-item label="轮播图类型:">
                                    <el-select v-model="search_carousel_drawing_type" clearable placeholder="请选择">
                                        <el-option v-for="item in carousel_drawing_type_list" :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="轮播图位置:">
                                    <el-select v-model="search_location" clearable placeholder="请选择">
                                        <el-option v-for="item in location_type_list" :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="关键字:">
                                    <el-input placeholder="请输入轮播图名称关键字" v-model="search_name" :maxlength="20"
                                    style="width: 217px;">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-row type="flex" justify="end">
                                    <el-tooltip class="item" effect="dark" content="立即搜索" placement="top">
                                        <el-button type="primary" icon="search" @click="userSearchData(1)">
                                        </el-button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" content="新增轮播图" placement="top">
                                        <el-button type="primary" @click="tabCheck = 'addCarouselDrawing'">
                                            <i class="el-icon-upload el-icon--right">
                                            </i>
                                        </el-button>
                                    </el-tooltip>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div class="listTable" id="table">
                        <el-table :data="search_get_carousel_drawing_list_data" stripe :height="tableHeight">
                            <el-table-column prop="name" label="轮播图名称" header-align="center" align="center"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="type_name" label="轮播图类型" header-align="center"
                            align="center">
                            </el-table-column>
                            <el-table-column prop="location_name" label="轮播图位置" header-align="center"
                            align="center">
                            </el-table-column>
                            <el-table-column label="操作" header-align="center" align="center">
                                <template scope="scope">
                                    <template v-if="scope.row.status == '1'">
                                        <el-tooltip class="item" effect="dark" content="点击禁用轮播图" placement="left">
                                            <el-button @click.native.prevent="forbiddenOrStartUsing(scope.row.id,scope.row.status)"
                                            type="text" size="small" style="color: #bfcbd9;">
                                                禁用
                                            </el-button>
                                        </el-tooltip>
                                    </template>
                                    <template v-else>
                                        <el-tooltip class="item" effect="dark" content="点击启用轮播图" placement="left">
                                            <el-button @click.native.prevent="forbiddenOrStartUsing(scope.row.id,scope.row.status)"
                                            type="text" size="small">
                                                启用
                                            </el-button>
                                        </el-tooltip>
                                    </template>
                                    <el-button type="text" size="small" @click.native.prevent="getModificationData(scope.row.id)">
                                        编辑
                                    </el-button>
                                    <el-button @click.native.prevent="deleteCarouseDrawing(scope.$index, scope.row, search_get_carousel_drawing_list_data)"
                                    type="text" size="small">
                                        移除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="listPage">
                        <el-row type="flex" justify="end">
                            <el-pagination layout="prev, pager, next" :total="20*pages" :page-size="20"
                            :current-page="current_page" class="pageination" @current-change="handleCurrentChange">
                            </el-pagination>
                        </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!-- </div> -->
        </div>
        <el-dialog title="修改轮播图" v-model="modification.dialogFormVisible">
            <el-form label-position="left" label-width="120px">
                <el-form-item label="轮播图名称">
                    <el-input placeholder="请输入轮播图名称" v-model="modification.name" :maxlength="20"
                    disabled style="width: 217px;">
                    </el-input>
                </el-form-item>
                <el-form-item label="上传轮播图:">
                    <el-upload class="avatar-uploader" :action="uploadAddCarouselDrawing"
                    name="image_url" :on-success="modificationAddCarouselDrawingImg" :on-error="uploadError"
                    :before-upload="beforeAvatarUpload" :show-file-list="false">
                        <img v-if="modification.imageUrl" :src="modification.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon">
                        </i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="轮播图位置:">
                    <el-select v-model="modification.location" placeholder="请选择">
                        <el-option v-for="item in location_type_list" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="轮播图类型:">
                    <el-radio-group v-model="modificationCarouselDrawingType">
                        <el-button type="primary">
                            {{ modification.carousel_drawing_type_name }}
                        </el-button>
                    </el-radio-group>
                </el-form-item>
                <template v-if="modificationCarouselDrawingType >> 0 === 1">
                    <el-form-item label="图文详情:" id="modificationMyQuill">
                        <quill-editor v-if="modificationCarouselDrawingType >> 0 === 1" ref="myTextEditor"
                        v-model="modification.initData" :options="editorOption" @showImageUI="imageHandler"
                        @change="modificationUpdateData">
                        </quill-editor>
                    </el-form-item>
                    <input type="file" name="file" id="fileinput" @change="customimgupload($event)"
                    style="display: none;">
                </template>
                <template v-else-if="modificationCarouselDrawingType >> 0 === 2">
                    <el-form-item label="商品款号:">
                        <el-tooltip class="item" effect="dark" content="输入的商品款号将与此轮播图关联,下方会展示此款商品的缩略图,请核实!"
                        placement="right-start">
                            <el-input placeholder="请输入" v-model="modification.model" :maxlength="20"
                            icon="search" :on-icon-click="modificationGetShopIdThumbImg" style="width: 217px;">
                            </el-input>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="商品缩略图">
                        <el-row>
                            <el-col :span="8">
                                <el-card>
                                    <template v-if="modification.model_img != ''">
                                        <img :src="modification.model_img" alt="商品缩略图" class="img">
                                    </template>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </template>
                <template v-if="modificationCarouselDrawingType >> 0 === 3">
                    <el-form-item label="视频地址:">
                        <el-tooltip class="item" effect="dark" content="请输入培训视频地址!" placement="right-start">
                            <el-input placeholder="请输入" v-model="modification.carousel_drawing_video_url"
                            style="width: 217px;">
                            </el-input>
                        </el-tooltip>
                    </el-form-item>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modification.dialogFormVisible = false">
                    取 消
                </el-button>
                <el-button type="primary" @click="modificationPhpPostData">
                    确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="less">
    #addCarouselDrawing{
        box-sizing: border-box;

        width: 100%;
        height: 100%;
        
        // background: #fff;

        overflow: hidden;
        label{
            color: #8492A6;
        }
        .addCarouselDrawing_body_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;

            // padding-bottom: 73px;
            .addCarouselDrawing_body{
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
    .el-tabs{
        display: flex;
        flex-direction: column;

        height: 100%;
        .el-tabs__header{
            height: 42px;
        }
        .el-tabs__content{
            flex: 1;

            overflow: hidden;
            .el-tab-pane{
                height: 100%;

                display: flex;
                flex-direction: column;
                .listForm{
                    width: 100%;
                    height: 58px;
                }
                .listTable{
                    width: 100%;
                    flex: 1;
                }
                .listPage{
                    width: 100%;
                    height: 32px;

                    padding-top: 12px;
                }
            }
        }
    }
    .el-dialog__wrapper{
        z-index: 999999 !important;
    }
</style>

<script>
import * as API from '../assets/axios/api.js'
export default{
    name: 'addCarouselDrawing',
    created: function () {
        this.getLocationTypeList() // 后台获取轮播图位置
        this.getcarouselDrawingTypeList() // 后台获取轮播图类型
    },
    data () {
        return {
            editorOption: {}, // 富文本对象
            tabCheck: 'addCarouselDrawing', // tab页切换 addCarouselDrawing carouselDrawingList
            tableHeight: null, // 列表高度
            name: '', // 轮播图名称
            location_type_list: [], // 轮播图位置列表
            location: '', // 轮播图位置
            carousel_drawing_type_list: [], // 轮播图类型列表
            carousel_drawing_type: '', // 轮播图类型
            carousel_drawing_url: '', // 轮播图地址
            imageUrl: '', // 轮播图实例
            initData: '', // 富文本
            newDetails: '', // 最终提交的富文本
            model: '', // 关联商品款号
            model_img: '', // 商品缩略图
            carousel_drawing_video_url: '', // 视频地址
            search_get_carousel_drawing_list_data: [], // 轮播图列表 后台获取数据列表
            pages: '', // 总页数
            current_page: 1, // 当前页
            search_carousel_drawing_type: '', // 轮播图类型
            search_location: '', // 轮播图位置
            search_name: '', // 轮播图名字
            modification: { // 弹出框 修改页面
                carousel_drawing_id: '',  // 修改商品id
                phpGetmodificationData: [], // 后台获取数据
                dialogFormVisible: false, // 弹出层展示控制
                name: '', // 轮播图名称
                imageUrl: '', // 轮播图实例
                carousel_drawing_url: '', // 轮播图地址
                location: '', // 轮播图位置
                carousel_drawing_type_name: '', // 轮播图类型名称
                initData: '', // 富文本
                newDetails: '', // 最终提交的富文本
                model: '', // 商品款号
                model_img: '', // 商品缩略图
                carousel_drawing_video_url: '' // 视频地址
            },
            modificationCarouselDrawingType: '', // 轮播图类型
            uploadAddCarouselDrawing: API.uploadAddCarouselDrawing // 文件上传
        }
    },
    watch: {
        carousel_drawing_type: function (val) {
            if (document.getElementById('myQuill')) {
                var aEle = document.getElementById('myQuill').getElementsByTagName('*')
                for (let i = 0; i < aEle.length; i++) {
                    /* 当className相等时添加到数组中 */
                    if (aEle[i].className == 'ql-toolbar ql-snow') {
                        aEle[i]
                        var _parentElement = aEle[i].parentNode
                        if (_parentElement) {
                            _parentElement.removeChild(aEle[i])
                        }
                    }
                }
            }
        },
        modificationCarouselDrawingType: function (val) {
            if (document.getElementById('modificationMyQuill')) {
                var aEle = document.getElementById('modificationMyQuill').getElementsByTagName('*')
                for (let i = 0; i < aEle.length; i++) {
                    /* 当className相等时添加到数组中 */
                    if (aEle[i].className == 'ql-toolbar ql-snow') {
                        aEle[i]
                        var _parentElement = aEle[i].parentNode
                        if (_parentElement) {
                            _parentElement.removeChild(aEle[i])
                        }
                    }
                }
            }
        }
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

        // 获取轮播图列表
        getCarouselDrawingList (tab, event) {
            if (tab.label === '轮播图列表') {
                // 初始化获取列表数据
                this.getCarouselDrawingListData()
                this.$nextTick(function () { // 获取表格高度
                    this.tableHeight = document.getElementById('table').offsetHeight
                })
            } else {
                // window.location.reload()
            }
        },

        // 上传轮播图
        addCarouselDrawingImg (response, file) {
            if (response.flag >> 0 !== 1000) {
                this.$message.error(response.return_code)
                return false
            }
            this.$message({
                message: '轮播图上传成功',
                type: 'success'
            })
            this.imageUrl = window.URL.createObjectURL(file.raw)
            this.carousel_drawing_url = response.file_url
        },

        // 检验图片
        beforeAvatarUpload (file) {
            const isLt2M = file.size / 1024 / 1024 < 1
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 1MB')
            }
            return isLt2M
        },

        // 文件上传失败
        uploadError () {
            this.$message.error('上传文件有误!请重新上传!')
        },

        // 富文本每次改变的回调 更新数据
        updateData (data) {
            this.newDetails = data.html
        },

        // 后台获取轮播图位置
        getLocationTypeList () {
            this.$axios.post(API.getCarouselDrawingLocation)
            .then(msg => {
                if (msg.data.flag >> 0 !== 1000) {
                    this.$message.error(msg.data.return_code)
                    return false
                }
                this.$message({
                    message: '获取轮播图位置',
                    type: 'success'
                })
                this.location_type_list = msg.data.location_list
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 后台获取轮播图类型
        getcarouselDrawingTypeList () {
            this.$axios.post(API.getCarouselDrawingType)
            .then(msg => {
                if (msg.data.flag >> 0 !== 1000) {
                    this.$message.error(msg.data.return_code)
                    return false
                }
                this.$message({
                    message: '获取轮播图类型',
                    type: 'success'
                })
                this.carousel_drawing_type_list = msg.data.type_list
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 获取指定商品对应缩略图
        getShopIdThumbImg () {
            this.$axios.post(API.getThumbWithModel, {
                model: this.model
            })
            .then(msg => {
                if (msg.data.flag >> 0 !== 1000) {
                    this.$message.error(msg.data.return_code)
                    return false
                }
                this.model_img = msg.data.thumb_image
                this.$message({
                    message: msg.data.return_code,
                    type: 'success'
                })
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 添加轮播图
        phpPostData () {
            const type = this.carousel_drawing_type >> 0
            if (!this.name) {
                this.$message.error('请输入轮播图名称')
                return false
            }

            if (!this.location) {
                this.$message.error('请选择轮播图位置')
                return false
            }

            if (!this.carousel_drawing_url) {
                this.$message.error('请上传图片')
                return false
            }

            if (!this.carousel_drawing_type) {
                this.$message.error('请选择轮播图类型')
                return false
            }

            switch (type) {
            // 轮播图类型 图文
            case 1:
                if (!this.newDetails) {
                    this.$message.error('请完善图文详情')
                    return false
                }

                this.$axios.post(API.addCarouselDrawing, {
                    'name': this.name,
                    'carousel_drawing_url': this.carousel_drawing_url,
                    'location': this.location,
                    'carousel_drawing_type': this.carousel_drawing_type,
                    'description': this.newDetails
                })
                .then(msg => {
                    if (msg.data.flag >> 0 !== 1000) {
                        this.$message.error(msg.data.return_code)
                        return false
                    }
                    this.$message({
                        message: '创建轮播图',
                        type: 'success'
                    })
                    setTimeout(() => {
                        this.tabCheck = 'carouselDrawingList'
                        // 初始化获取列表数据
                        this.getCarouselDrawingListData()
                    }, 1000)
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
                break

            // 轮播图类型 商品
            case 2:
                if (!this.model) {
                    this.$message.error('请输入需要绑定的商品款号')
                    return false
                }
                this.$axios.post(API.addCarouselDrawing, {
                    'name': this.name,
                    'carousel_drawing_url': this.carousel_drawing_url,
                    'location': this.location,
                    'carousel_drawing_type': this.carousel_drawing_type,
                    'description': this.model
                })
                .then(msg => {
                    if (msg.data.flag >> 0 !== 1000) {
                        this.$message.error(msg.data.return_code)
                        return false
                    }
                    this.$message({
                        message: '创建轮播图',
                        type: 'success'
                    })
                    setTimeout(() => {
                        this.tabCheck = 'carouselDrawingList'
                        // 初始化获取列表数据
                        this.getCarouselDrawingListData()
                    }, 1000)
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
                break

            // 轮播图类型 视频
            case 3:
                if (!this.carousel_drawing_video_url) {
                    this.$message.error('请输入视频地址')
                    return false
                }

                this.$axios.post(API.addCarouselDrawing, {
                    'name': this.name,
                    'carousel_drawing_url': this.carousel_drawing_url,
                    'location': this.location,
                    'carousel_drawing_type': this.carousel_drawing_type,
                    'description': this.carousel_drawing_video_url
                })
                .then(msg => {
                    if (msg.data.flag >> 0 !== 1000) {
                        this.$message.error(msg.data.return_code)
                        return false
                    }
                    this.$message({
                        message: '创建轮播图',
                        type: 'success'
                    })
                    setTimeout(() => {
                        this.tabCheck = 'carouselDrawingList'
                        // 初始化获取列表数据
                        this.getCarouselDrawingListData()
                    }, 1000)
                })
                break
            }
        },

        // 获取数据
        getCarouselDrawingListData (current_page) {
            this.$axios.post(API.listCarouselDrawing, {
                'name': this.search_name,
                'location': this.search_location,
                'carousel_drawing_type': this.search_carousel_drawing_type,
                'current_page': current_page || this.current_page
            })
            .then(msg => {
                if (msg.data.flag >> 0 !== 1000) {
                    this.$message.error(msg.data.return_code)
                    this.search_get_carousel_drawing_list_data = []
                    return false
                }

                this.$message({
                    message: '轮播图获取成功',
                    type: 'success'
                })
                // 列表数据
                this.search_get_carousel_drawing_list_data = msg.data.carousel_drawing_list
                // 总页数
                this.pages = msg.data.pages
                // 当前页
                this.current_page = msg.data.current_page
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 用户点击搜索数据
        userSearchData (current_page) {
            if (!this.search_name || !this.search_location || !this.search_carousel_drawing_type) {
                this.$message.error('至少一条搜索项不为空')
                return false
            }
            this.getCarouselDrawingListData(current_page)
        },

        // 删除
        deleteCarouseDrawing (index, row, rows) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(API.removeCarouselDrawing, {
                    'carousel_drawing_id': row.id
                })
                .then(msg => {
                    if (msg.data.flag >> 0 !== 1000) {
                        this.$message.error(msg.data.return_code)
                        return false
                    }
                    // statement
                    // 获取当前页的总条数
                    // 保护用户删除某一页最后一条后 依旧请求当前页数据 返回空数据
                    // 若当前页--后小于零 则请求第一页
                    const number_of_branches = rows.length
                    if (number_of_branches >> 0 !== 1) {
                        this.getCarouselDrawingListData()
                        return false
                    }

                    let current_page = this.current_page
                    if (--current_page <= 1) {
                        this.getCarouselDrawingListData()
                    } else {
                        this.getCarouselDrawingListData(--current_page)
                    }
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },

        // 分页
        handleCurrentChange (val) {
            this.current_page = val
            this.getCarouselDrawingListData()
        },

        // 修改轮播图获取数据
        getModificationData (id) {
            this.modification.carousel_drawing_id = id
            this.$axios.post(API.modifyCarouselDrawing, {
                carousel_drawing_id: id
            })
            .then(msg => {
                if (msg.data.flag >> 0 !== 1000) {
                    this.$message.error(msg.data.return_code)
                    return false
                }
                // 显示弹出层
                this.modification.dialogFormVisible = true
                // 保存数据到本地
                this.modification.phpGetmodificationData = msg.data.carousel_drawing_detail
                // 绑定数据
                this.modification.name = this.modification.phpGetmodificationData.name
                this.modification.imageUrl = this.modification.phpGetmodificationData.url
                this.modification.location = this.modification.phpGetmodificationData.location
                this.modificationCarouselDrawingType = this.modification.phpGetmodificationData.type
                this.modification.carousel_drawing_type_name = this.modification.phpGetmodificationData.type_name

                switch (this.modificationCarouselDrawingType >> 0) {
                case 1:
                    this.modification.newDetails = this.modification.phpGetmodificationData.value
                    this.modification.initData = this.modification.phpGetmodificationData.value
                    break
                case 2:
                    this.modification.model = this.modification.phpGetmodificationData.value
                    this.modificationGetShopIdThumbImg()
                    break
                default:
                    this.modification.carousel_drawing_video_url = this.modification.phpGetmodificationData.value
                    break
                }
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 修改
        // 上传轮播图
        modificationAddCarouselDrawingImg (response, file) {
            if (response.flag >> 0 !== 1000) {
                this.$message.error(response.return_code)
                return false
            }
            this.$message({
                message: '轮播图上传成功',
                type: 'success'
            })
            this.modification.imageUrl = window.URL.createObjectURL(file.raw)
            this.modification.carousel_drawing_url = response.file_url
        },

        // 富文本每次改变的回调 更新数据
        modificationUpdateData (data) {
            this.modification.newDetails = data.html
        },

        // 获取指定商品对应缩略图
        modificationGetShopIdThumbImg () {
            this.$axios.post(API.getThumbWithModel, {
                model: this.modification.model
            })
            .then(msg => {
                if (msg.data.flag >> 0 !== 1000) {
                    this.$message.error(msg.data.return_code)
                    return false
                }
                this.modification.model_img = msg.data.thumb_image
                this.$message({
                    message: msg.data.return_code,
                    type: 'success'
                })
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 上传修改后的数据请求
        modificationPhpPostData () {
            const type = this.modificationCarouselDrawingType >> 0
            if (!this.modification.name) {
                this.$message.error('请输入轮播图名称')
                return false
            }

            if (!this.modification.location) {
                this.$message.error('请选择轮播图位置')
                return false
            }

            if (!this.modification.imageUrl) {
                this.$message.error('请上传图片')
                return false
            }
            if (!this.modificationCarouselDrawingType) {
                this.$message.error('请选择轮播图类型')
                return false
            }

            switch (type) {
            // 轮播图类型 图文
            case 1:
                if (!this.modification.newDetails) {
                    this.$message.error('请完善图文详情')
                    return false
                }

                this.$axios.post(API.modifyCarouselDrawing, {
                    'request_flag': 'modify',
                    'carousel_drawing_id': this.modification.carousel_drawing_id,
                    'name': this.modification.name,
                    'carousel_drawing_url': this.modification.carousel_drawing_url || this.modification.imageUrl,
                    'location': this.modification.location,
                    'carousel_drawing_type': this.modificationCarouselDrawingType,
                    'description': this.modification.newDetails
                })
                .then(msg => {
                    if (msg.data.flag >> 0 !== 1000) {
                        this.$message.error(msg.data.return_code)
                        return false
                    }
                    this.$message({
                        message: '创建轮播图',
                        type: 'success'
                    })
                    this.modification.dialogFormVisible = false
                    this.getCarouselDrawingListData()
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
                break

            // 轮播图类型 商品
            case 2:
                if (!this.modification.model) {
                    this.$message.error('请输入需要绑定的商品款号')
                    return false
                }

                this.$axios.post(API.modifyCarouselDrawing, {
                    'request_flag': 'modify',
                    'carousel_drawing_id': this.modification.carousel_drawing_id,
                    'name': this.modification.name,
                    'carousel_drawing_url': this.modification.carousel_drawing_url || this.modification.imageUrl,
                    'location': this.modification.location,
                    'carousel_drawing_type': this.modificationCarouselDrawingType,
                    'description': this.modification.model
                })
                .then(msg => {
                    if (msg.data.flag >> 0 !== 1000) {
                        this.$message.error(msg.data.return_code)
                        return false
                    }
                    this.$message({
                        message: '创建轮播图',
                        type: 'success'
                    })
                    this.modification.dialogFormVisible = false
                    this.getCarouselDrawingListData()
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
                break

            // 轮播图类型 视频
            case 3:
                if (!this.modification.carousel_drawing_video_url) {
                    this.$message.error('请输入视频地址')
                    return false
                }
                this.$axios.post(API.modifyCarouselDrawing, {
                    'request_flag': 'modify',
                    'carousel_drawing_id': this.modification.carousel_drawing_id,
                    'name': this.modification.name,
                    'carousel_drawing_url': this.modification.carousel_drawing_url || this.modification.imageUrl,
                    'location': this.modification.location,
                    'carousel_drawing_type': this.modificationCarouselDrawingType,
                    'description': this.modification.carousel_drawing_video_url
                })
                .then(msg => {
                    if (msg.data.flag >> 0 !== 1000) {
                        this.$message.error(msg.data.return_code)
                        return false
                    }
                    this.$message({
                        message: '创建轮播图',
                        type: 'success'
                    })
                    this.modification.dialogFormVisible = false
                    this.getCarouselDrawingListData()
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
                break
            }
        },

        // 轮播图禁用 启用
        forbiddenOrStartUsing (id, status) {
            this.$axios.post(API.handleCarouselDrawing, {
                'carousel_drawing_id': id,
                'carousel_drawing_status': (status.toString() === '1' ? '0' : '1')
            })
            .then(msg => {
                if (msg.data.flag >> 0 !== 1000) {
                    this.$message.error(msg.data.return_code)
                    return false
                }
                this.$message({
                    message: msg.data.return_code,
                    type: 'success'
                })
                this.getCarouselDrawingListData()
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
