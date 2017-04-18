<template>
  <div id="home">
  	<el-row type="flex" class="steps" justify="center">
      <el-col :span="12">
        <el-card class="box-card">
          <h1>首页</h1>
          <h3>2017-04-17内网提测版本</h3>
          <!-- ../assets/img/e032a74b8985691686afe44af7391b91a477ab7e.jpg_320x200.jpg -->
          <!-- <img src="" alt="说不给你看就不给看"> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style>
.steps{
  height: auto;
  width: 100%;
  margin-top: 100px;
}
img{
  width: 100%;
  height: auto;
}
</style>
