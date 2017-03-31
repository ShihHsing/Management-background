<template>
  <div id="commodityBrand">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="12">
        <el-card class="box-card">
          <h1>商品品牌</h1>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'commodityBrand',
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
</style>
