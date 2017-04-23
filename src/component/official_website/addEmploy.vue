<template>
  <div id="addEmploy">
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
            <el-form-item label="招聘人数" prop="number">
              <el-input v-model.number="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item label="招聘日期" required>
              <el-col :span="11">
                <el-form-item prop="date">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="岗位职责" prop="responsibilities">
              <el-input type="textarea" v-model="ruleForm.responsibilities"></el-input>
            </el-form-item>
            <el-form-item label="任职要求" prop="requirements">
              <el-input type="textarea" v-model="ruleForm.requirements"></el-input>
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
  export default{
    name: 'newsList',
    data () {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            callback()
          }
        }, 800)
      }
      return {
        ruleForm: {
          position: '', // 招聘职位
          department: '', // 招聘部门
          date: '', // 招聘日期
          responsibilities: '', // 岗位职责
          requirements: '' // 任职要求
        },
        rules: {
          position: [
            { required: true, message: '请输入招聘职位', trigger: 'blur' },
            { min: 3, max: 10, message: '长度 3 到 10 个字符以内!', trigger: 'change' }
          ],
          department: [
            { required: true, message: '请输入招聘部门', trigger: 'blur' },
            { min: 3, max: 10, message: '长度 3 到 10 个字符以内!', trigger: 'change' }
          ],
          number: [
            { required: true, validator: checkAge, trigger: 'blur' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择招聘日期', trigger: 'change' }
          ],
          responsibilities: [
            { required: true, message: '请输入岗位职责', trigger: 'blur' },
            { min: 10, max: 500, message: '长度 10 到 500 个字符以内!', trigger: 'change' }
          ],
          requirements: [
            { required: true, message: '请输入任职要求', trigger: 'blur' },
            { min: 10, max: 500, message: '长度 10 到 500 个字符以内!', trigger: 'change' }
          ]
        }
      }
    },
    created: function () {},
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.consoleSuccess(`添加成功`)
            /* --- 清空表单 --- */
            this.resetForm()
            /* ---------------- */
          } else {
            this.consoleWarning(`请完善信息后提交`)
            return false
          }
        })
      },
      /* 清空表单 */
      resetForm (formName) {
        this.$refs[formName].resetFields()
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
    }
  }
</style>
