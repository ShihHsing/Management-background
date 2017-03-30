<template>
  <div id="tvmFansList">
    <el-row>
      <el-col :span="22" :offset="1">

        <el-table
          :data="listTVMFans"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="phone_number"
            label="手机号码">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
        
      </el-col>
    </el-row></br></br>

    <el-row type="flex" justify="center">
      <el-col :span="22">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current_page"
          :page-size="20"
          layout="prev, pager, next"
          :total="20*total_pages"
          style="float: right;padding: 0;">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'tvmFansList',

  data () {
    return {
      listTVMFansInfoUrl: 'Shop/listTVMFansInfo',
      // 服务器端获取数据
      listTVMFans: [],
      // 当前页
      current_page: 0,
      // 总页数
      total_pages: 0
    }
  },

  created: function() {
    // 初始化
    this.getTvmData(0);
  },

  methods: {
    getTvmData(current_page) {
      var _this = this;
      this.$axios.post(this.listTVMFansInfoUrl,{
        current_page: current_page
      })
      .then( (msg) => {
        console.log(msg.data)
        if (msg.data.flag == '1000') {
          // statement
          this.listTVMFans = msg.data.fans_list;
          this.total_pages = msg.data.total_pages;
          this.current_page = msg.data.current_page;
        } else {
          this.consoleError(msg.data.return_code)
        }
      }, (response) => {
        this.consoleError(response.return_code)
      })
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTvmData(val)
      console.log(`当前页: ${val}`);
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
