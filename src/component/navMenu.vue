<template>
  <div id="navMenu">
    <el-menu theme="dark" :default-active="router_url" class="el-menu-demo" mode="vertical" @select="handleSelect" unique-opened router>
  	  <el-menu-item index="/home">首页</el-menu-item>
  	  <el-submenu index="门店管理">
  	    <template slot="title">门店管理</template>
  	    <el-menu-item index="/privateBrandStores">设置自由品牌</el-menu-item>
  	    <el-menu-item index="/goodsSetSwitch">商品设置开关</el-menu-item>
  	    <el-menu-item index="2-3">选项3</el-menu-item>
  	  </el-submenu>
      <el-submenu index="商品管理">
        <template slot="title">商品管理</template>
        <el-menu-item index="/commodityBrand">商品品牌</el-menu-item>
        <el-menu-item index="/commodityClassification">商品分类</el-menu-item>
        <el-submenu index="商品属性">
          <template slot="title">私有属性</template>
          <el-menu-item index="/goodsPrivateColor">商品私有颜色</el-menu-item>
          <el-menu-item index="/goodsPrivateSize">商品私有尺码</el-menu-item>
          <el-menu-item index="/goodsPrivateProperty">商品私有属性</el-menu-item>
          <el-menu-item index="/goodsPrivatePropertyValues">商品私有属性值</el-menu-item>
        </el-submenu>
        <el-menu-item index="3-4">商品风格</el-menu-item>
        <el-menu-item index="/addMerchandise">添加商品</el-menu-item>
        <el-menu-item index="/listOfGoods">商品列表</el-menu-item>
        <el-menu-item index="/addCarouselDrawing">新增轮播图</el-menu-item>
      </el-submenu>
      <el-submenu index="内部服务">
        <template slot="title">内部服务</template>
        <el-menu-item index="/addRobotInstructions">机器人使用说明</el-menu-item>
        <el-menu-item index="/tvmFansList">TVM活动吸粉列表</el-menu-item>
      </el-submenu>
  	</el-menu>
  </div>
</template>

<script>
import '../assets/style/navMenu.less'
export default {
  name: 'navMenu',
  data () {
    return {
      router_url: ''
    }
  },

  created: function() {
    // 初始化获取路由地址
    this.getRouterUrl();
  },

  methods: {
	  handleSelect(key, keyPath) {
	    console.log(key, keyPath);
	  },

    // 获取当前路由地址
    // 动态绑定导航和路由对应关系
    getRouterUrl () {
      this.router_url = this.$route.path;
    }
  }
}
</script>
