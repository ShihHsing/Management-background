<template>
  <div id="login">
    <div class="htmleaf-container">
      <div class="wrapper">
        <div class="container">
          <h1>哎哟不错管理后台</h1>
          
          <form class="form">
            <input type="text" v-model="phone_number" placeholder="账号/手机号">
            <input type="password" v-model="password" placeholder="密码">
            <div id="login-button" @click="login();">登录</div>
          </form>
        </div>
        
        <ul class="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { USER_SIGNIN } from '../assets/store/user.js'
import * as API from '../assets/axios/api.js'
import '../assets/style/login.less'

export default {
  name: 'login',
  data () {
    return {
      phone_number: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([USER_SIGNIN]),

    login () {
      if (this.phone_number !== '') {
        // statement
        if (this.password !== '') {
          // statement
          const data = {
            'phone_number': this.phone_number,
            'password': this.password
          }
          this.$axios.post(API.loginUrl, data)
          .then(msg => {
            console.log(msg)
            if (msg.data.flag === '01') {
              // statement
              var data = null
              switch (msg.data.emp.level >> 0) {
                case 1:
                  data = '店员!欢迎你的登录!'
                  break
                case 2:
                  data = '店长!欢迎你的登录!'
                  break
                case 3:
                  if (msg.data.emp.shop_id >> 0 === 1) {
                    data = '最大BOSS!欢迎您!'
                  } else {
                    data = '老板!欢迎您的登录!'
                  }
                  break
                default:
                  data = '管理员!注意使用规则!'
                  break
              }
              this.consoleSuccess(data)
              var userData = msg.data
              this.USER_SIGNIN({ userData })
              setTimeout(() => {
                this.$router.push({ path: 'home' })
              }, 1000)
            } else {
              this.consoleError(msg.data.return_code)
            }
          })
          .catch(error => {
            this.consoleWarning('服务发生意外情况,请稍后重试!')
            console.log(error)
          })
        } else {
          this.consoleError('请完善密码!')
        }
      } else {
        this.consoleError('请完善账号!')
      }
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
  }
}
</script>
