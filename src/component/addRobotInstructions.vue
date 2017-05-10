<template>
  <div id="addRobotInstructions">
    <el-row>
    	<el-col :span="22" :offset="1">
        <div class="sx_basis_scroll sx_scroll_style_lucency">
          <!-- <vue-html5-editor :content="newDescription" @change="updateData"></vue-html5-editor> -->
          <quill-editor
            ref="myTextEditor"
            v-model="newDescription"
            :options="editorOption">
          </quill-editor>
        </div>
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
<style lang="less">
  .content{
    img{
      width: 80%!important;
    }
  }
</style>

<script>
import * as API from '../assets/axios/api.js'
export default {
  name: 'addRobotInstructions',

  data () {
    return {
      editorOption: {}, // 富文本对象
      // 消息提示控件
      dialogVisible: true,
      // 富文本数据
      newDescription: ''
    }
  },

  created: function () {
    // 初始化数据
    this.initDate()
  },

  methods: {

    // 提交数据
    postData () {
      if (this.newDescription) {
        // statement
        this.$axios.post(API.recordTheInstructions, {
          'instructions': this.newDescription
        })
        .then((msg) => {
          console.log(msg.data, '服务器')
          if (msg.data.flag === '01') {
            // statement
            this.consoleSuccess(msg.data.return_code)
            setTimeout(() => {
              this.initDate()
            }, 800)
          } else {
            // statement
            this.consoleError(msg.data.return_code)
          }
        }, (response) => {
          this.consoleError(response.return_code)
        })
      } else {
        this.consoleWarning('请完善内容!')
      }
    },

    initDate () {
      this.$axios.post(API.recordTheInstructions)
      .then((msg) => {
        if (msg.data.flag === '01') {
          this.newDescription = msg.data.instructions
        } else {
          this.consoleError(msg.data.return_code)
        }
      }, (response) => {
        this.consoleError(response.return_code)
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
