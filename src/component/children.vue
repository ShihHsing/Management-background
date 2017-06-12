<template>
<div id="children">
<el-col :span="24">
<logoTop></logoTop>
</el-col>
<el-col :lg="3" :md="5" :sm="5" :xs="6" class="navMenuWrap">
<el-col :span="24" style="height:100%;">
<navMenu></navMenu>
</el-col>
</el-col>
<el-col :lg="21" :md="19" :sm="19" :xs="18" class="bodyWrap sx_basis_scroll sx_scroll_style_lucency">
<el-col :span="24" class="body">
<!-- 面包屑 -->
<el-col :span="24" class="breadcrumb">
<breadcrumb></breadcrumb>
</el-col>
<!-- 路由展示区 -->
<transition mode="out-in">
<router-view></router-view>
</transition>
</br>
</br>
</br>
</el-col>
</el-col>
</div>
</template>

<script>
// 导航栏
import navMenu from './navMenu.vue'
// 页头
import logoTop from './logoTop.vue'
// 面包屑
import breadcrumb from './Breadcrumb.vue'
// 样式
import '../assets/style/children.less'
export default {
name: 'children',
data () {
return {}
},
components: { navMenu, logoTop, breadcrumb }
}
</script>
