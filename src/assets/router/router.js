// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
// 登录
import login from '../../component/login.vue';
// 子页面
import children from '../../component/children.vue';
// 首页
import home from '../../component/home.vue';
// 商品品牌
import commodityBrand from '../../component/commodityBrand.vue';
// 商品分类
import commodityClassification from '../../component/commodityClassification.vue';
// 商品私有属性
import goodsPrivateProperty from '../../component/goodsPrivateProperty.vue';
// 商品私有属性值
import goodsPrivatePropertyValues from '../../component/goodsPrivatePropertyValues.vue';
// 商品私有颜色
import goodsPrivateColor from '../../component/goodsPrivateColor.vue';
// 商品私有尺码
import goodsPrivateSize from '../../component/goodsPrivateSize.vue';
// 添加商品
import addMerchandise from '../../component/addMerchandise.vue';
// 修改商品
import modificationMerchandise from '../../component/modificationMerchandise.vue';
// 商品列表
import listOfGoods from '../../component/listOfGoods.vue';
// 机器人使用说明
import addRobotInstructions from'../../component/addRobotInstructions.vue';
// TVM吸粉列表
import tvmFansList from '../../component/tvmFansList.vue';
// 设置自由品牌
import privateBrandStores from '../../component/privateBrandStores.vue';
// 商品设置的开关
import goodsSetSwitch from '../../component/goodsSetSwitch.vue';
// 3D模型上传
import add3DModel from '../../component/add3DModel.vue';
// 添加轮播图
import addCarouselDrawing from '../../component/addCarouselDrawing.vue';
// const home = { template: '<div>home</div>' };
// const Bar = { template: '<div>bar</div>' };

// const home = {
//   template: '<div>home</div>',
//   beforeRouteEnter (to, from, next) {
//   // 在渲染该组件的对应路由被 confirm 前调用
//   // 不！能！获取组件实例 `this`
//   // 因为当钩子执行前，组件实例还没被创建
//     console.log('beforeRouteEnter')
//   },
//   beforeRouteUpdate (to, from, next) {
//     // 在当前路由改变，但是改组件被复用时调用
//     // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
//     // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
//     // 可以访问组件实例 `this`
//     console.log('beforeRouteUpdate')
//   },
//   beforeRouteLeave (to, from, next) {
//     // 导航离开该组件的对应路由时调用
//     // 可以访问组件实例 `this`
//     console.log('beforeRouteLeave')
//   }
// }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
  { path: '/login', component: login },
  { 
    path: '/children', component: children, 
    children: [
      { path: '/home', component: home },
      { path: '/commodityBrand', component: commodityBrand },
      { path: '/commodityClassification', component: commodityClassification },
      { path: '/goodsPrivateColor', component: goodsPrivateColor },
      { path: '/goodsPrivateSize', component: goodsPrivateSize },
      { path: '/goodsPrivateProperty', component: goodsPrivateProperty },
      { path: '/goodsPrivatePropertyValues', component: goodsPrivatePropertyValues },
      { path: '/addMerchandise', component: addMerchandise },
      { path: '/modificationMerchandise', component: modificationMerchandise },
      { path: '/listOfGoods', component: listOfGoods },
      { path: '/addRobotInstructions', component: addRobotInstructions },
      { path: '/tvmFansList', component: tvmFansList },
      { path: '/privateBrandStores', component: privateBrandStores },
      { path: '/goodsSetSwitch', component: goodsSetSwitch },
      { path: '/add3DModel', component: add3DModel },
      { path: '/addCarouselDrawing', component: addCarouselDrawing },
    ]
  },
  { path: '*', redirect: '/home' }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})


// 全局钩子
// router.beforeEach((to, from, next) => {
//   // ...
//   next()
// })

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 输出router
export default router;
// 现在，应用已经启动了！