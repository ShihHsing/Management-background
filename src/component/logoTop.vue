<template>
  <div id="logoTop">
    <el-col :span="12" class="logoTitle">
      <router-link to="/home"><h1>哎哟不错店家管理系统</h1></router-link>
    </el-col>
    <el-col :span="3" :offset="7" class="storeSelect">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="2" class="user">
      <div>
        <img :src="userImgUrl" :alt="userName" @click="dialogVisible = true">
      </div>
    </el-col>
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>确定要退出{{ userPhone }}这个用户吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logOut">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '../assets/store';
import { mapActions } from 'vuex';
import { USER_SIGNOUT } from '../assets/store/user';
import '../assets/style/logoTop.less';
import axios from 'axios';
import * as API from '../assets/axios/api.js';

export default {
  name: 'logoTop',
  data () {
    return {
      // 对话框控制
      dialogVisible: false,
      // 门店选择
      options: [{
        value: '选项1',
        label: '深大店'
      }, {
        value: '选项2',
        label: '南山店'
      }, {
        value: '选项3',
        label: '高新园店'
      }, {
        value: '选项4',
        label: '宝安店'
      }, {
        value: '选项5',
        label: '石岩店'
      }],
      value: '选项1',
      // 用户img
      userImgUrl: 'http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484901235476&di=0b91b607a22beca9c92ce65a9c64084f&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ff603918fa0ec08faf0f7ace15cee3d6d54fbda85.jpg',
      // 用户名字
      userName: '石鑫',
      userPhone: store.state.user.userData.phone_number,
      // session_id: store.state.user.userData.session_id
    }
  },
  methods: {
    ...mapActions([USER_SIGNOUT]),
    logOut () {
      this.$axios.post(API.logOut)
      .then( msg => {
        console.log(msg)
        if (msg.data.flag == '01') {

          // statement
          this.dialogVisible = false;
          this.USER_SIGNOUT();// 退出登录
          this.consoleSuccess(msg.data.return_code);
          setTimeout( () => {
            this.$router.replace({ path: '/login' })
          },1000)
        } else {
          this.consoleError(msg.data.return_code);
        }
      })
      .catch( response => {
        console.log(response.data)
        this.dialogVisible = true;
      });
    },
    consoleSuccess(success) {
      this.$notify({
        title: '成功',
        message: success,
        type: 'success'
      });
    },

    consoleWarning(warning) {
      this.$notify({
        title: '警告',
        message: warning,
        type: 'warning'
      });
    },

    consoleNews(news) {
      this.$notify.info({
        title: '消息',
        message: news
      });
    },

    consoleError(error) {
      this.$notify.error({
        title: '错误',
        message: error
      });
    }
  }
}
</script>
