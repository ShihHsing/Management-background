<template>
  <div id="logoTop">
    <el-col :span="12" class="logoTitle">
      <router-link to="/home"><h1>哎哟不错店家管理系统</h1></router-link>
    </el-col>
    <el-col :span="3" :offset="7" class="storeSelect">
      <el-select v-model="shop" placeholder="请选择">
        <el-option
          v-for="item in own_shop_list"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="2" class="user">
      <div @click="dialogVisible = true">
        <img src="../assets/img/e032a74b8985691686afe44af7391b91a477ab7e.jpg_320x200.jpg" height="200" width="320" :alt="userName">
      </div>
    </el-col>
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>您好确定要退出{{ userPhone }}这个账户吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logOut">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '../assets/store'
import { mapActions } from 'vuex'
import { USER_SIGNOUT, USER_SIGNIN } from '../assets/store/user'
import '../assets/style/logoTop.less'
import * as API from '../assets/axios/api.js'

export default {
  name: 'logoTop',
  data () {
    return {
      // 对话框控制
      dialogVisible: false,
      // 用户名字
      userName: '哎哟不错',
      // 用户头像
      userImgUrl: '',
      userPhone: store.state.user.userData.emp.phone_number,
      // 门店列表
      own_shop_list: store.state.user.userData.own_shop_list,
      // 选择门店
      shop: store.state.user.userData.own_shop_list[0].shop_id
    }
  },
  watch:{
    shop: function (val) {
      // TODO
      // 切换门店方法
      this.chageShop(val)
    },
    own_shop_list: function (val) {
      if (val.length > 0) {
        this.shop = val[0].shop_id
      }
    }
  },
  methods: {
    ...mapActions([USER_SIGNOUT]),
    ...mapActions([USER_SIGNIN]),
    logOut () {
      this.$axios.post(API.logOut)
      .then(msg => {
        console.log(msg)
        if (msg.data.flag === '01') {
          this.dialogVisible = false
          this.USER_SIGNOUT() // 退出登录
          this.consoleSuccess(msg.data.return_code)
          setTimeout(() => {
            this.$router.replace({ path: '/login' })
          }, 1000)
        } else {
          this.consoleError(msg.data.return_code)
        }
      })
      .catch(response => {
        console.log(response.data)
        this.dialogVisible = true
      })
    },
    // 跟换门店
    chageShop (id) {
      this.$axios.post(API.changeTheShop, {
        shop_id: id
      })
      .then(msg => {
        console.log(msg)
        if (msg.data.flag === '01') {
          const userData = msg.data
          this.USER_SIGNIN({ userData })
          this.consoleSuccess(`${msg.data.return_code}`)
        } else {
          this.consoleError(msg.data.return_code)
        }
      })
      .catch(response => {
        console.log(response.data)
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
  }
}
</script>
