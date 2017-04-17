<template>
  <div id="goodsSetSwitch">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 22px;">添加商品开关</span>
            <el-button style="float: right;" type="text" @click="dialogVisible = true">操作说明</el-button>
          </div>
          <el-form   
            label-position="top">
            <el-form-item label="商品设置开关(展示!!!)">
              <template v-if="items">
                <template v-for="item in items">
                  <div style="float: left;margin:0 10px;">
                    <span style="color: #666;">{{ item.switch_name }}:</span>
                    <el-switch
                      v-model="value"
                      disabled>
                    </el-switch>
                  </div>
                </template>
              </template>
              <template v-else>
                <span style="text-align: center;">数据为空</span>
              </template>
            </el-form-item>
            <div style="color: #666">若您需要的设置开关不在此分类请点击<el-button type="text" @click="addGoodsSwitchVal = true">这里添加</el-button></div></br>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <!-- 提示用户页面操作须知 -->
    <el-dialog title="操作说明" v-model="dialogVisible" size="tiny">
      <span>待定!</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 商品设置添加 -->
    <el-dialog title="商品设置添加" v-model="addGoodsSwitchVal" size="tiny">
      <el-form label-position="top">
        <el-form-item label="商品设置">
          <el-input v-model="postData.addGoodsSwitchVal" placeholder="商品设置添加"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodsSwitchVal = false">取 消</el-button>
        <el-button type="primary" @click="postAddGoodsSwitchName();">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import '../assets/style/goodsSetSwitch.less'
import * as API from '../assets/axios/api.js'
export default {
  name: 'goodsSetSwitch',
  data () {
    return {
      // 商品设置开关
      addGoodsSwitchVal: false,
      // 上传数据模型
      postData: {
        addGoodsSwitchVal: ''
      },
      value: true,
      // 获取已有商品设置开发
      items: [],
      // 提示用户窗口
      dialogVisible: true
    }
  },

  created: function () {
    // 获取以后商品设置开关
    this.getShopData()
  },

  methods: {
    // 获取现有商品设置开关
    getShopData () {
      this.$axios.post(API.listSwitchName)
      .then((msg) => {
        console.log(msg.data)
        // 初始化
        const data = msg.data

        switch (data.flag) {
          case 1000:
            this.items = data.switch_list
            break
          // 初始化数据为空
          case 4001:
            this.items = ''
            break
          default:
            this.consoleError(`${msg.data.return_code}`)
        }
      })
      .catch(error => {
        this.consoleError(`服务器${error.response}`)
      })
    },

    // 上传商品设置开关
    postAddGoodsSwitchName () {
      if (this.postData.addGoodsSwitchVal) {
        // statement
        this.$axios.post(API.addGoodsSwitchNameUrl, {
          'switch_name': this.postData.addGoodsSwitchVal
        })
        .then(msg => {
          console.log(msg.data)
          if (msg.data.flag >> 0 === 1000) {
            // statement
            this.consoleSuccess(`${msg.data.return_code}`)
            this.addGoodsSwitchVal = false
            this.postData.addGoodsSwitchVal = ''
            this.getShopData()
          } else {
            this.consoleError(`${msg.data.return_code}`)
          }
        })
        .catch(error => {
          this.consoleError(`服务器${error.response}`)
        })
      } else {
        this.consoleError('请完善信息后提交!!!')
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
