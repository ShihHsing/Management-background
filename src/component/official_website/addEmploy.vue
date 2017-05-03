<template>
  <div id="addEmploy" class="sx_basis_scroll sx_scroll_style">
    <el-row class="addEmploy_body" type="flex" justify="center">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">添加招聘</h2>
          </div>
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
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { addWebsiteJoinUs } from '../../assets/axios/api.js'
  import store from '../../assets/store'
  export default{
    name: 'newsList',
    data () {
      return {
        ruleForm: {
          position: '', // 招聘职位
          department: '', // 招聘部门
          duty: '', // 岗位职责
          demand: '', // 任职要求
          employ_count: 1,
          session_id: store.state.user.userData.session_id
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
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /* ==== 请求后台 ==== */
            this.addWebsiteJoinUs()
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
      addWebsiteJoinUs () {
        this.$axios.post(addWebsiteJoinUs, this.ruleForm)
        .then((msg) => {
          const data = msg.data
          switch (data.status) {
            case 1000:
              this.consoleSuccess(`招聘信息添加成功!`)
              setTimeout(() => {
                /* 跳转 */
                this.$router.push('employList')
              }, 500)
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
        }, time)
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
    },
    components: {}
  }
</script>

<style lang="less">
   #addEmploy{
    width: 100%;
    height: 100%;
    .addEmploy_body{
      box-sizing: border-box;
      padding-top: 50px;
      textarea{
        height: 200px;
      }
    }
  }
</style>
