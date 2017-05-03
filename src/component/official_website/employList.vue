<template>
  <div id="employList" class="sx_basis_scroll sx_scroll_style">
    <el-row class="employList_body" type="flex" justify="center">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">招聘列表</h2>
          </div>
          <el-table
            :data="newEmployList"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="employ_time"
              label="招聘日期"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="position"
              label="招聘职位"
              align="center">
            </el-table-column>
            <el-table-column
              prop="department"
              label="招聘部门"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="180"
              align="center">
              <template scope="scope">
                <el-button 
                  type="success" 
                  size="small"
                  @click="modificationNews(scope.row.id)">编辑<i class="el-icon-edit el-icon--right"></i></el-button>
                <el-button 
                  type="danger" 
                  size="small"
                  @click="removeNews(scope.row.id)">删除<i class="el-icon-delete2 el-icon--right"></i></el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="编辑招聘信息" v-model="dialogUpdateWebsiteJoinUsInfo">
            <el-form 
              :model="ruleForm" 
              :rules="rules" 
              ref="ruleForm" 
              label-width="100px" 
              class="demo-ruleForm">
              <el-form-item label="招聘职位" prop="position">
                <el-input v-model="ruleForm.position"></el-input>
              </el-form-item>
              <el-form-item label="招聘部门" prop="department">
                <el-input v-model="ruleForm.department"></el-input>
              </el-form-item>
              <el-form-item label="招聘人数" required>
                <el-input-number v-model="ruleForm.employ_count" :min="1" :max="10"></el-input-number>
              </el-form-item>
              <el-form-item label="岗位职责" prop="duty">
                <el-input type="textarea" v-model="ruleForm.duty"></el-input>
              </el-form-item>
              <el-form-item label="任职要求" prop="demand">
                <el-input type="textarea" v-model="ruleForm.demand"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="postUpdateWebsiteJoinUsInfo('ruleForm')">立即修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-dialog>
          <!-- </br>
          </br>
          <el-row type="flex" justify="center">
            <el-col :span="22">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="current_page"
                :page-size="page_size"
                layout="prev, pager, next, jumper"
                :total="page_size*total_pages"
                style="float: right;padding: 0;">
              </el-pagination>
            </el-col>
          </el-row> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getWebsiteJoinUsInfo, updateWebsiteJoinUsInfo, deleteWebsiteJoinUsById } from '../../assets/axios/api.js'
  export default{
    name: 'newsList',
    data () {
      return {
        employList: [], // 招聘列表
        dialogUpdateWebsiteJoinUsInfo: false, // 修改招聘信息
        ruleForm: {
          position: '', // 招聘职位
          department: '', // 招聘部门
          duty: '', // 岗位职责
          demand: '', // 任职要求
          employ_count: 1
        },
        rules: {
          position: [
            { required: true, message: '请输入招聘职位', trigger: 'blur' },
            { min: 3, max: 10, message: '长度 3 到 10 个字符以内!', trigger: 'blur' }
          ],
          department: [
            { required: true, message: '请输入招聘部门', trigger: 'blur' },
            { min: 3, max: 10, message: '长度 3 到 10 个字符以内!', trigger: 'blur' }
          ],
          duty: [
            { required: true, message: '请输入岗位职责', trigger: 'blur' },
            { min: 10, max: 500, message: '长度 10 到 500 个字符以内!', trigger: 'blur' }
          ],
          demand: [
            { required: true, message: '请输入任职要求', trigger: 'blur' },
            { min: 10, max: 500, message: '长度 10 到 500 个字符以内!', trigger: 'blur' }
          ]
        }
        // current_page: 1, // 当前页
        // total_pages: 5, // 总页数
        // page_size: 5 // 每页条数
      }
    },
    created: function () {
      /* ===== 获取招聘列表 ===== */
      this.getWebsiteJoinUsInfo()
      /* ======================== */
    },
    computed: {
      newEmployList: function () {
        const arr = this.employList
        for (var i = arr.length - 1; i >= 0; i--) {
          arr[i].employ_time = this.getLocalTime(arr[i].employ_time)
        }
        return arr
      }
    },
    methods: {
      // 转换时间戳
      getLocalTime (nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
      },
      // 获取招聘
      getWebsiteJoinUsInfo () {
        this.$axios.post(getWebsiteJoinUsInfo)
        .then((msg) => {
          const data = msg.data
          switch (data.status) {
            case 1000:
              this.employList = data.data
              break
            case 9001:
              /* 不做处理 */
              this.$alert('暂无招聘信息', '友情提示', {
                confirmButtonText: '确定'
              })
              break
            default:
              this.consoleWarning(data.ret_msg)
              break
          }
        })
        .catch(error => {
          this.consoleError(error)
        })
      },
      /* 修改招聘 */
      modificationNews (id) {
        if (id) {
          this.dialogUpdateWebsiteJoinUsInfo = true
          /* 获取修改信息 */
          this.getUpdateWebsiteJoinUsInfo(id)
        } else {
          this.consoleWarning(`内部服务错误,id未获取成功!`)
        }
      },
      // 获取修改信息详情
      getUpdateWebsiteJoinUsInfo (id) {
        this.$axios.get(updateWebsiteJoinUsInfo, {
          params: {
            id
          }
        })
        .then((msg) => {
          const data = msg.data
          switch (data.status) {
            case 1000:
              this.ruleForm = data.data
              break
            default:
              this.consoleWarning(data.ret_msg)
              break
          }
        })
        .catch(error => {
          this.consoleError(error)
        })
      },
      // 提交修改信息
      postUpdateWebsiteJoinUsInfo (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /* ==== 请求后台 ==== */
            this.updateWebsiteJoinUsInfo()
            /* ------------------ */

            /* --- 清空表单 --- */
            this.resetForm('ruleForm', 500)
            /* ---------------- */
          } else {
            this.consoleWarning(`请完善信息后提交`)
            return false
          }
        })
      },
      updateWebsiteJoinUsInfo () {
        this.$axios.post(updateWebsiteJoinUsInfo, this.ruleForm)
        .then((msg) => {
          const data = msg.data
          switch (data.status) {
            case 1000:
              this.dialogUpdateWebsiteJoinUsInfo = false
              this.consoleSuccess(`修改招聘信息成功`)
              /* ===== 获取招聘列表 ===== */
              this.getWebsiteJoinUsInfo()
              /* ======================== */
              break
            default:
              this.consoleWarning(data.ret_msg)
              break
          }
        })
        .catch(error => {
          this.consoleError(error)
        })
      },
      /* 清空表单 */
      resetForm (formName, time) {
        setTimeout(() => {
          this.$refs[formName].resetFields()
          /* 计数清空 */
          this.ruleForm.employ_count = 1
          /* ======== */
        }, time)
      },
      /* 删除招聘 */
      removeNews (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(deleteWebsiteJoinUsById, {
            id
          })
          .then((msg) => {
            const data = msg.data
            switch (data.status) {
              case 1000:
                this.consoleSuccess(`招聘删除成功`)
                /* ===== 获取招聘列表 ===== */
                this.getWebsiteJoinUsInfo()
                /* ======================== */
                break
              default:
                this.consoleWarning(data.ret_msg)
                break
            }
          })
          .catch(error => {
            this.consoleError(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      consoleSuccess (success) {
        this.$notify({
          title: '成功',
          message: success,
          type: 'success'
        })
      },

      consoleWarning (warning) {
        this.$notify({
          title: '警告',
          message: warning,
          type: 'warning'
        })
      },

      consoleNews (news) {
        this.$notify.info({
          title: '消息',
          message: news
        })
      },

      consoleError (error) {
        this.$notify.error({
          title: '错误',
          message: error
        })
      }
      // handleCurrentChange (val) {
      //   console.log(`当前页: ${val}`)
      // },
    }
  }
</script>

<style lang="less">
   #employList{
    width: 100%;
    height: 100%;
    .employList_body{
      box-sizing: border-box;
      padding-top: 50px;
      textarea{
        height: 230px;
      }
    }
  }
</style>
