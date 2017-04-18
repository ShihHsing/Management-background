<template>
  <div id="employList">
    <el-row class="employList_body" type="flex" justify="center">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">招聘列表</h2>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    name: 'newsList',
    data () {
      return {}
    },
    created: function () {},
    methods: {},
    components: {}
  }
</script>

<style lang="less">
   #employList{
    width: 100%;
    height: 100%;
    .employList_body{
      box-sizing: border-box;
      padding-top: 50px;
    }
  }
</style>
