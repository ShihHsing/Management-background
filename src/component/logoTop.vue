<template>
  <div id="logoTop">
    <el-col :span="12" class="logoTitle">
      <h1>哎哟不错店家管理系统</h1>
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
        <img :src="userImgUrl" :alt="userName">
      </div>
    </el-col>
  </div>
</template>

<script>
import '../assets/style/logoTop.less'
export default {
  name: 'logoTop',
  data () {
    return {
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
      userName: '石鑫'
    }
  },
  methods: {
	 
  }
}
</script>
