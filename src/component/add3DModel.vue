<template>
    <div id="add3DModel">
            <el-col :span="24" style="height: 100%; width: 100%;">
              <!-- 头部 -->
                <div class="add3DModel_top">
                    <span>添加3D模型</span>
                </div>
                <div class="add3DModel_form_wrap">
                <div class="add3DModel_form_body sx_basis_scroll sx_scroll_style">
                <el-form label-position="left" label-width="80px" class="add3DModel_form">
                    <el-form-item label="商品款号:">
                        <el-input placeholder="请输入内容" v-model="code" :disabled="true" style="width: 217px;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品颜色:">
                        <el-input placeholder="请输入内容" v-model="color" :disabled="true" style="width: 217px;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="IOS unity模型:">
                        <el-upload class="upload-demo" :action="uploadHandle3DModel" name="ios_unity_file"
                        :on-success="addIosUnity" :on-error="uploadError">
                            <el-button size="small" type="primary">
                                点击上传
                            </el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="Android unity模型:">
                        <el-upload class="upload-demo" :action="uploadHandle3DModel" name="android_unity_file"
                        :on-success="addAndroidUnity" :on-error="uploadError">
                            <el-button size="small" type="primary">
                                点击上传
                            </el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="添加3D缩略图:">
                        <div v-for="(city,index) in colorImg">
                            <el-upload :action="uploadHandle3DModel" :multiple="false" :on-success="colorAndImgSuccess"
                            :on-error="uploadError" :before-upload="uploadBefore" name="thumbnail"
                            :data="{'imgColor': colorImg[index]}" list-type="picture">
                                <el-button size="small" type="primary">
                                    请上传{{ colorImg[index] }}商品的3D缩略图
                                </el-button>
                                <div slot="tip" class="el-upload__tip" style="color:#555;">
                                    请上传
                                    <b style="color:#20A0FF;">
                                        {{ colorImg[index] }}
                                    </b>
                                    商品的商品图片,并只能上传jpg/png文件，且不超过500kb 200*200
                                </div>
                            </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="phpPostData()">
                            提交
                        </el-button>
                    </el-form-item>
                </el-form>
                </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="less">
    #add3DModel{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .add3DModel_top{
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;

            height: 50px;
            
            padding: 0 30px;

            border-bottom: 1px solid #E5E9F2;

            line-height: 50px;
            font-size: 18px;
            color: #8492A6;
        }
        .add3DModel_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .add3DModel_form_body{
                width: 100%;
                height: 100%;
                .add3DModel_form{
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
import * as API from '../assets/axios/api.js'
export default{
    name: 'add3DModel',
    data () {
        return {
            code: '',
            color: '',
            colorImg: [],
            colorAndImg: [],
            ios: '',
            android: '',
            id: '', // 商品id
            shop_id: '', // 门店id
            file_name: '', // 文件名
            uploadHandle3DModel: API.uploadHandle3DModel // 文件上传接口
        }
    },
    created: function () {
        this.initData()
    },
    methods: {
        initData () {
            this.code = this.$route.query.code // 商品款号
            this.id = this.$route.query.id // 商品id
            this.shop_id = this.$route.query.shop_id // 门店id
            // 商品颜色
            if (this.$route.query.color.length === 0) {
                console.log(`获取this.$route.query.color预期是有值Array 但传入值为空`)
                return false
            }

            for (let i = 0, length1 = this.$route.query.color.length; i < length1; i++) {
                this.color += this.$route.query.color[i].color_name + ' '
                this.colorImg.push(this.$route.query.color[i].color_name)
                var colorImg = {
                    color: this.$route.query.color[i].color_name,
                    imgUrl: '',
                    id: this.$route.query.color[i].color_arg_id
                }
                this.colorAndImg.push(colorImg)
            }
        },

        // 商品颜色图片
        colorAndImgSuccess (response, file, fileList) {
            if (response.flag >> 0 !== 1000) {
                this.$message.error(response.return_code)
                return false
            }

            var imgColor = response.imgColor
            for (let i = 0; i < this.colorAndImg.length; i++) {
                if (this.colorAndImg[i].color === imgColor) {
                    this.colorAndImg[i].imgUrl = response.file_url
                }
            }
            this.$message({
                message: response.return_code,
                type: 'success'
            })
        },

        // 文件上传失败
        uploadError () {
            this.$message.error('上传文件有误!请重新上传!')
        },

        // ios模型上传
        addIosUnity (response, file) {
            if (response.flag >> 0 !== 1000) {
                this.$message.error(response.return_code)
                return false
            }

            this.ios = response.file_url
            this.file_name = file.name
            this.$message({
                message: response.return_code,
                type: 'success'
            })
        },

        // 安卓模型上传
        addAndroidUnity (response) {
            if (response.flag >> 0 !== 1000) {
                this.$message.error(response.return_code)
                return false
            }

            this.android = response.file_url
            this.$message({
                message: response.return_code,
                type: 'success'
            })
        },

        // 提交
        phpPostData () {
            var count = 0
            for (let i = 0, length1 = this.colorAndImg.length; i < length1; i++) {
                if (!this.colorAndImg[i].imgUrl) {
                    count++
                }
            }

            if (!(this.code && this.color)) {
                this.$message.error('商品必要信息缺失!请返回列表重新获取!')
                return false
            }

            if (!this.ios) {
                this.$message.error('请上传ios3D模型!')
                return false
            }

            if (!this.android) {
                this.$message.error('请上传android3D模型!')
                return false
            }

            if (count !== 0) {
                this.$message.error('请完善3D缩略图!还差' + count + '张未上传!')
                return false
            }

            this.$axios.post(API.handle3DModel, {
                arguments: {
                    'code': this.code,
                    'ios_unity_url': this.ios,
                    'android_unity_url': this.android,
                    'colorAndImg': this.colorAndImg,
                    'id': this.id,
                    'shop_id': this.shop_id,
                    'file_name': this.file_name
                }
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
                setTimeout(() => {
                    this.$router.push({ path: 'listOfGoods' })
                }, 2000)
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
