<template>
    <div id="customerServiceClassification">
        <el-col :span="24" style="height: 100%; width: 100%;display: flex;flex-direction: column;">
            <!-- 头部 -->
            <div class="customerServiceClassification_top">
                <span>快速咨询回答分类</span>
            </div>
            <div class="customerServiceClassification_body">
                <el-form
                    :inline="true"
                    :model="customerServiceClassificationValues"
                    :rules="customerServiceClassificationValuesRules"
                    ref="customerServiceClassificationValues"
                    label-position="left"
                    class="customerServiceClassification_form"
                    label-width="80px">
                    
                    <el-form-item label="分类:" prop="type_name">
                        <el-input v-model="customerServiceClassificationValues.type_name" style="width: 217px;" :maxlength="8" @keyup.enter.native="submitForm('customerServiceClassificationValues')"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('customerServiceClassificationValues')">添加</el-button>
                    </el-form-item>
                </el-form>
                <div style="flex: 1;box-sizing: border-box;padding: 15px 30px;">
                    <div class="customerServiceClassification_body_wrap">
                        <div class="customerServiceClassification_body">
                            <div class="table_body sx_basis_scroll sx_scroll_style" id="table">
                                <el-table
                                    :data="newsUserFapTypeList"
                                    border
                                    stripe
                                    :height="tableHeight"
                                    v-loading="loading"
                                    element-loading-text="加载中..."
                                    v-if="newsUserFapTypeList.length !== 0">

                                    <el-table-column
                                        prop="type_name"
                                        label="分类">
                                    </el-table-column>
                                    <el-table-column
                                        label="设置默认"
                                        width="140">
                                        <template scope="scope">
                                            <el-switch
                                              v-model="scope.row.is_default"
                                              on-color="#13ce66"
                                              off-color="#ff4949"
                                              @change="editDefaultTypeById(scope.row.id, scope.row.is_default)">
                                            </el-switch>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="操作"
                                        width="160">
                                        <template scope="scope">
                                            <el-button size="small" type="success" @click="openEdit(scope.row.id, scope.row.type_name)">修改</el-button>
                                            <el-button size="small" type="danger" @click="openDel(scope.row.id)">删除</el-button>
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
            </div>
        </el-col>
    </div>
</template>

<style lang="less">
    #customerServiceClassification{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .customerServiceClassification_top{
            box-sizing: border-box;
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
        .customerServiceClassification_body{
            display: flex;
            flex-direction: column;
            flex: 1;
            width: 100%;
        }
        .customerServiceClassification_form{
            box-sizing: border-box;
            padding: 30px 30px 0 30px;

            label{
                color: #8492A6;
            }
            .el-tag{
                margin-right: 15px !important;
            }
        }
        .customerServiceClassification_body_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            .customerServiceClassification_body{
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
    }
</style>

<script>
import { addUserFaqTypeInfo, getUserfaqTypeList, editUserFaqTypeInfoById, delUserFaqTypeInfoById, editDefaultTypeById } from '../../assets/axios/api.js'
export default {
    name: 'customerServiceClassification',
    data () {
        return {
            customerServiceClassificationValues: {
                type_name: ''
            },
            customerServiceClassificationValuesRules: {
                type_name: [
                    { required: true, message: '请输入问题分类', trigger: 'change' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ]
            },
            tableHeight: null, // 表格高度
            current_page: 1, // 当前页
            userFapTypeList: [], // 列表数据
            loading: false, // 列表loading
            sum: 0 // 总条数
        }
    },
    computed: {
        newsUserFapTypeList: function () {
            for (var i = this.userFapTypeList.length - 1; i >= 0; i--) {
                this.userFapTypeList[i].is_default = this.userFapTypeList[i].is_default >> 0
            }
            return this.userFapTypeList
        }
    },
    created: function () {
        this.$nextTick(function () { // 获取表格高度
            this.tableHeight = document.getElementById('table').offsetHeight
        })
        this.getUserfaqTypeList() // 获取列表数据
    },
    methods: {
        // 提交颜色
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    this.$message({
                        message: '请输入问题分类',
                        type: 'warning'
                    })
                    return false
                }

                this.$axios.post(addUserFaqTypeInfo, {
                    type_name: this.customerServiceClassificationValues.type_name
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
                    // 重置表单
                    this.resetForm(formName)
                    // 获取分类列表
                    this.getUserfaqTypeList(1)
                })
                .catch(error => {
                    this.$message.error('服务器异常')
                })
            })
        },
        // 重置表单
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        // 获取分类列表
        getUserfaqTypeList (current_page) {
            this.loading = true
            this.$axios.post(getUserfaqTypeList, {
                current_page: current_page || this.current_page
            })
            .then(msg => {
                const data = msg.data

                this.loading = false
                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    return false
                }

                // 列表数据
                this.userFapTypeList = data.data.type_list
                // 总条数
                this.sum = parseInt(data.data.sum)
                // 当前页
                this.current_page = parseInt(data.data.current_page)
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },
        // 根据用户输入条件搜索数据
        handleCurrentChange (val) {
            this.getUserfaqTypeList(val)
        },
        // 修改分类
        openEdit (id, text) {
            this.$prompt('请输入问题分类', '修改分类', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^.{1,20}$/,
                inputErrorMessage: '1到20位',
                inputValue: text
            }).then(({ value }) => {
                // 提交数据
                this.editUserFaqTypeInfoById(id, value)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消修改'
                })
            })
        },
        editUserFaqTypeInfoById (id, typeName) {
            this.$axios.post(editUserFaqTypeInfoById, {
                t_id: id,
                type_name: typeName
            })
            .then(msg => {
                const data = msg.data

                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    return false
                }

                this.$message({
                    type: 'success',
                    message: '修改成功'
                })
                // 重新获取当前页数据
                this.getUserfaqTypeList()
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },
        // 删除分类
        openDel (id) {
            this.$confirm('此操作将永久删除此分类下的所有快速咨询问答, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 请求删除
                this.delUserFaqTypeInfoById(id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        delUserFaqTypeInfoById (id) {
            this.$axios.post(delUserFaqTypeInfoById, {
                t_id: id
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
                this.getUserfaqTypeList()
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },
        // 设置为默认
        editDefaultTypeById (id, is_on) {
            this.$axios.post(editDefaultTypeById, {
                t_id: id,
                is_on: Number(is_on)
            })
            .then(msg => {
                const data = msg.data

                if (data.status !== 1000) {
                    this.$message.error(data.ret_msg)
                    return false
                }

                this.$message({
                    type: 'success',
                    message: '设置成功'
                })
                // 重新获取当前页数据
                this.getUserfaqTypeList()
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
