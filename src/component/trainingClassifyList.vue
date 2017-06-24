<template>
    <div id="trainingClassifyList">
        <el-col :span="24" style="height: 100%; width: 100%;">
        <!-- 头部 -->
            <div class="trainingClassifyList_top">
                <span>培训分类列表</span>
                <el-button type="text" style="float: right" @click="addTrain = true">
                    新增分类
                </el-button>
            </div>
            <div class="trainingClassifyList_form_wrap">
                <div class="trainingClassifyList_form_body sx_basis_scroll sx_scroll_style">
                    <div class="trainingClassifyList_form">
                        <el-table :data="training_classify_list" stripe style="width: 100%">
                            <el-table-column prop="id" label="序号" align="center" width="100" sortable>
                            </el-table-column>
                            <el-table-column prop="classify_name" label="分类名称" align="center">
                            </el-table-column>
                            <el-table-column label="操作" align="center" width="100">
                                <template scope="scope">
                                    <el-row type="flex" justify="space-around">
                                        <el-button type="text" icon="edit" @click="modificationTrain(scope.row)">
                                        </el-button>
                                        <el-button type="text" icon="delete" @click="deleteTrain(scope.row.id)">
                                        </el-button>
                                    </el-row>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <el-dialog title="新增分类" style="text-align: center;" v-model="addTrain"
            size="tiny">
                <el-input v-model="classify" placeholder="请输入分类名称">
                </el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addTrain = false">
                        取 消
                    </el-button>
                    <el-button type="primary" @click="addTrainList">
                        确 定
                    </el-button>
                </span>
            </el-dialog>
        </el-col>
    </div>
</template>

<style lang="less">
    #trainingClassifyList{
        width: 100%;
        height: 100%;
        
        background: #fff;

        overflow: hidden;
        .trainingClassifyList_top{
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
        .trainingClassifyList_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .trainingClassifyList_form_body{
                width: 100%;
                height: 100%;
                .trainingClassifyList_form{
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
import { modifyTrainingClassify, removeTrainingClassify, getTrainingClassifyList, addTrainingClassify } from '../assets/axios/api.js'
export default{
    name: 'trainingClassifyList',
    data () {
        return {
            addTrain: false, // 添加分类名称
            classify: '',
            training_classify_list: [], // 获取列表数据 ---> 服务端
            modification_delete_moduleData: {} // 修改 删除 控件数据模型 记录获取列表值 大于十条不允许再添加 list_length: 0,
        }
    },
    computed: {
        list_length: function () {
            return this.training_classify_list.length
        }
    },
    created: function () {
        this.getTrainingClassifyList() // 初始化获取分类列表
    },
    methods: {
        // 修改
        modificationTrain (list) {
            this.$prompt('请输入分类名称', '编辑分类', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: list.classify_name,
                inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9]{0,15}$/,
                inputErrorMessage: '分类名称不包含特殊字符,并名称长度在15字以内!'
            }).then(({ value }) => {
                this.$axios.post(modifyTrainingClassify, {
                    classify: value,
                    classify_id: list.id
                })
                .then(msg => {
                    const data = msg.data

                    switch (data.flag) {
                    case 1000:
                        this.getTrainingClassifyList()
                        this.$message({
                            message: '修改培训分类成功',
                            type: 'success'
                        })
                        break
                    default:
                        this.$message.error('修改分类失败,请重试!')
                        break
                    }
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
            }).catch(() => {})
        },

        // 删除
        deleteTrain (id) {
            this.$confirm('此操作将永久删除该分类下所有培训内容, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                this.$axios.post(removeTrainingClassify, {
                    classify_id: id
                })
                .then(msg => {
                    const data = msg.data

                    switch (data.flag) {
                    case 1000:
                        this.getTrainingClassifyList()
                        this.$message({
                            message: '删除培训分类成功',
                            type: 'success'
                        })
                        break
                    default:
                        this.$message.error(`删除分类失败,请重试!`)
                        break
                    }
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
            })
        },

        // 获取分类列表
        getTrainingClassifyList () {
            this.$axios.post(getTrainingClassifyList)
            .then(msg => {
                const data = msg.data

                switch (data.flag) {
                case 1000:
                    this.training_classify_list = data.training_classify_list
                    break
                case 9001:
                    this.addTrain = true
                    this.$message({
                        message: '暂无培训分类!请添加!',
                        type: 'success'
                    })
                    break
                default:
                    this.$message.error(`获取分类失败,请重试!`)
                    break
                }
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 添加培训分类
        addTrainList () {
            const reg = /^[\u4E00-\u9FA5A-Za-z0-9]{0,15}$/
            if (this.list_length > 10) {
                this.$message({
                    message: '最多添加十条培训分类!',
                    type: 'warning'
                })
                return false
            }
            if (!this.classify) {
                this.$message({
                    message: '数据不能为空',
                    type: 'warning'
                })
                return false
            }
            if (!reg.test(this.classify)) {
                this.$message({
                    message: '分类名称不包含特殊字符,并名称长度在15字以内!',
                    type: 'warning'
                })
                return false
            }
            this.$axios.post(addTrainingClassify, {
                classify: this.classify
            })
            .then(msg => {
                const data = msg.data

                switch (data.flag) {
                case 1000:
                    this.addTrain = false
                    this.classify = ''
                    this.getTrainingClassifyList()
                    this.$message({
                        message: '新增分类成功',
                        type: 'success'
                    })
                    break
                case 9005:
                    this.$message.error('该分类已被使用,请删除培训分类后再试!')
                    break
                default:
                    this.$message.error('新增分类失败,请重试!')
                    break
                }
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
