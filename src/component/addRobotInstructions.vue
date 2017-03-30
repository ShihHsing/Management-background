<template>
  <div id="addRobotInstructions">
    <el-row>
    	<el-col :span="22" :offset="1">
        <vue-html5-editor :content="initData" :height="500" @change="updateData"></vue-html5-editor>
    	</el-col>
    </el-row></br></br></br>
    <el-row>
      <el-col :span="2" :offset="21">
        <el-button type="primary" @click="postData();" style="float: right;">提交</el-button>
      </el-col>
    </el-row>
    <!-- 提示用户页面操作须知 -->
    <el-dialog title="操作说明" v-model="dialogVisible" size="tiny">
      <span>1.此服务仅针对本公司内部使用。</span></br>
      <span>2.请注意文明用语!</span></br>
      <span>3.若页面加载失败,请刷新后重试!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
  .content{
    height: 680px!important;
  }
</style>

<script>
import * as API from '../assets/axios/api.js';
export default {
  name: 'addRobotInstructions',

  data () {
    return {
      // 消息提示控件
      dialogVisible: true,
      // 初始化数据
      initData: '',
      // 修改后的数据
      newData: ''
    }
  },

  created: function() {
    // 初始化数据
    this.initDate();
  },

  methods: {
    updateData (data) {
      this.newData = data;
    },

    // 提交数据
    postData() {
      console.log(this.newData,'富文本数据')
      if (this.newData) {
        // statement
        this.$axios.post(API.recordTheInstructions,{
          instructions: this.newData
        })
        .then( (msg) => {
          console.log(msg.data,'服务器')
          if (msg.data.flag == '1000') {
            // statement
            this.consoleSuccess(msg.data.return_code)
            window.location.reload();
          } else {
            // statement
            this.consoleError(msg.data.return_code)
          }
        }, (response) => {
          this.consoleError(response.return_code)
        })
      } else {
        this.consoleError('请完善数据!')
      }
    },

    initDate() {
      this.$axios.post(API.recordTheInstructions)
      .then( (msg) => {
        console.log(msg.data)
        if (msg.data.flag == '1000') {
          // statement
          this.initData = msg.data.instructions;
        } else {
          // statement
          this.consoleError(msg.data.return_code)
        }
      }, (response) => {
        this.consoleError(response.return_code)
      })
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
