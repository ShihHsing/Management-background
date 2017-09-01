<template>
    <div id="editShopFaqInfo">
        <el-col :span="24" style="height: 100%; width: 100%;">
            <!-- 头部 -->
            <div class="editShopFaqInfo_top">
                <router-link to="/shopFaqList" style="width: 45px;text-align: center;">
                    <el-button type="text">
                        <i class="el-icon-arrow-left"></i>
                    </el-button>
                </router-link>
                <span>修改常见问题</span>
            </div>
            
            <div class="editShopFaqInfo_form_wrap">
                <div class="editShopFaqInfo_form_body sx_basis_scroll sx_scroll_style">
                    
                    <el-form
                        :model="editShopFaqInfoValues"
                        :rules="editShopFaqInfoValuesRules"
                        ref="editShopFaqInfoValues"
                        label-position="left"
                        class="editShopFaqInfo_form"
                        label-width="120px">
                        
                        <el-form-item label="问题:" prop="title">
                            <el-input v-model="editShopFaqInfoValues.title" style="width: 217px;" maxlength="25"></el-input>
                        </el-form-item>

                        <el-form-item label="问题分类:" prop="phone_number" prop="type">
                            <el-select v-model="editShopFaqInfoValues.type" placeholder="请选择问题分类">
                                    <el-option
                                        v-for="item in shopFaqTypeListAll"
                                        :label="item.t_type_name"
                                        :value="item.t_id">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                        
                        <el-form-item label="回答内容:" id="myQuill" required>
                            <quill-editor ref="myTextEditor" v-model="editShopFaqInfoValues.content"
                            :options="editorOption" @showImageUI="imageHandler">
                            </quill-editor>
                        </el-form-item>

                        <input type="file" name="file" id="fileinput" @change="customimgupload($event)"
                        style="display: none;">

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('editShopFaqInfoValues')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </div>
</template>

<style lang="less">
    #editShopFaqInfo{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .editShopFaqInfo_top{
            box-sizing: border-box;
            display: flex;

            height: 50px;
            border-bottom: 1px solid #E5E9F2;
    
            line-height: 50px;
            font-size: 18px;
            color: #8492A6;
            .OI{
                color: #1D8CE0;
                font-size: 12px;
            }
        }
        .editShopFaqInfo_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .editShopFaqInfo_form_body{
                width: 100%;
                height: 100%;
                .editShopFaqInfo_form{
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
import { getShopFaqInfo, editShopFaqInfoById, getShopFaqTypeListAll } from '../../assets/axios/api.js'
import * as API from '../../assets/axios/api.js'
export default {
    name: 'editShopFaqInfo',
    data () {
        return {
            editShopFaqInfoValues: {
                title: '', // 问题标题
                type: '', // 问题类型
                content: '', // 内容
                id: '' // 问答id
            },
            shopFaqTypeListAll: [], // 问题分类
            editorOption: {}, // 富文本对象
            editShopFaqInfoValuesRules: { // 验证规则
                title: [
                    { required: true, message: '请输入问题', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择问题分类', trigger: 'blur' }
                ]
            }
        }
    },
    created: function () {
        // 获取问题分类
        this.getShopFaqTypeListAll()
        // 获取问答详情
        this.getShopFaqInfo(this.$route.query.id)
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
        // 获取问答详情
        getShopFaqInfo (id) {
            if (!id) {
                this.$message({
                    message: '未正确获取问答详情,请返回问答列表刷新后重新获取',
                    type: 'warning'
                })
                return false
            }
            this.$axios.post(getShopFaqInfo, {
                f_id: id
            })
            .then(msg => {
                const data = msg.data

                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    return false
                }

                // 绑定问答详情
                this.editShopFaqInfoValues = {
                    title: data.data.faq_info.f_title,
                    type: data.data.faq_info.f_type,
                    content: (data.data.faq_info.f_content).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'),
                    id: data.data.faq_info.f_id
                }
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },
        // 提交常见问题
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    this.$message({
                        message: '请完善必填信息',
                        type: 'warning'
                    })
                    return false
                }
                if (!this.editShopFaqInfoValues.content) {
                    this.$message({
                        message: '请完善回答详情',
                        type: 'warning'
                    })
                    return false
                }
                this.$axios.post(editShopFaqInfoById, {
                    f_id: this.editShopFaqInfoValues.id,
                    title: this.editShopFaqInfoValues.title,
                    type: this.editShopFaqInfoValues.type,
                    content: this.editShopFaqInfoValues.content
                })
                .then(msg => {
                    const data = msg.data

                    if (data.status !== 1000) {
                        this.$message.error(data.ret_msg)
                        return false
                    }

                    this.$message({
                        message: data.ret_msg,
                        type: 'success'
                    })
                    // 添加成功跳转列表页
                    this.$router.push('shopFaqList')
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
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
        }
    }
}
</script>
