// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/login', // 登录
        component: resolve => require(['../../component/login/login.vue'],
        resolve),
        naem: '登录',
        meta: { auth: false }
    }, {
        path: '/children', // 子页面
        component: resolve => require(['../../component/public/children.vue'],
        resolve),
        children: [{
            path: '/home', // 首页
            component: resolve => require(['../../component/login/home.vue'],
            resolve),
            name: '首页',
            meta: { auth: false }
        }, {
            path: '/commodityBrand', // 商品品牌
            component: resolve => require(['../../component/commodityBrand.vue'],
            resolve),
            name: '商品品牌'
        }, {
            path: '/commodityClassification', // 商品分类
            component: resolve => require(['../../component/commodityClassification.vue'],
            resolve),
            name: '商品分类'
        }, {
            path: '/goodsPrivateColor', // 商品私有颜色
            component: resolve => require(['../../component/shop_management/goodsPrivateColor.vue'],
            resolve),
            name: '商品管理-自定义属性-商品颜色'
        }, {
            path: '/goodsPrivateSize', // 商品私有尺码
            component: resolve => require(['../../component/shop_management/goodsPrivateSize.vue'],
            resolve),
            name: '商品管理-自定义属性-商品尺寸'
        }, {
            path: '/goodsPrivateProperty', // 商品私有属性
            component: resolve => require(['../../component/shop_management/goodsPrivateProperty.vue'],
            resolve),
            name: '商品管理-自定义属性-商品属性'
        }, {
            path: '/goodsPrivatePropertyValues', // 商品私有属性值
            component: resolve => require(['../../component/shop_management/goodsPrivatePropertyValues.vue'],
            resolve),
            name: '商品管理-自定义属性-商品属性值'
        }, {
            path: '/addMerchandise', // 添加商品
            component: resolve => require(['../../component/shop_management/addMerchandise.vue'],
            resolve),
            name: '商品管理-添加商品'
        }, {
            path: '/modificationMerchandise', // 修改商品
            component: resolve => require(['../../component/shop_management/modificationMerchandise.vue'],
            resolve),
            name: '商品管理-修改商品'
        }, {
            path: '/listOfGoods', // 商品列表
            component: resolve => require(['../../component/shop_management/listOfGoods.vue'],
            resolve),
            name: '商品管理-商品列表'
        }, {
            path: '/rouletteRules', // 幸运大转盘
            component: resolve => require(['../../component/robot/rouletteRules.vue'],
            resolve),
            name: '机器人活动管理-幸运大转盘',
            meta: { auth: false }
        }, {
            path: '/smashingGoldEggs', // 砸金蛋
            component: resolve => require(['../../component/robot/smashingGoldEggs.vue'],
            resolve),
            name: '机器人活动管理-砸金蛋',
            meta: { auth: false }
        }, {
            path: '/giftTopUp', // 砸金蛋礼品充值
            component: resolve => require(['../../component/robot/giftTopUp.vue'],
            resolve),
            name: '机器人活动管理-砸金蛋礼品充值'
        }, {
            path: '/integralRemind', // 积分提醒
            component: resolve => require(['../../component/robot/integralRemind.vue'],
            resolve),
            name: '机器人活动管理-积分提醒',
            meta: { auth: false }
        }, {
            path: '/addRobotInstructions', // 机器人使用说明
            component: resolve => require(['../../component/addRobotInstructions.vue'],
            resolve)
        }, {
            path: '/tvmFansList', // TVM吸粉列表
            component: resolve => require(['../../component/tvmFansList.vue'],
            resolve)
        }, {
            path: '/privateBrandStores', // 设置自由品牌
            component: resolve => require(['../../component/privateBrandStores.vue'],
            resolve)
        }, {
            path: '/goodsSetSwitch', // 商品设置的开关
            component: resolve => require(['../../component/goodsSetSwitch.vue'],
            resolve)
        }, {
            path: '/add3DModel', // 3D模型上传
            component: resolve => require(['../../component/shop_management/add3DModel.vue'],
            resolve),
            name: '商品管理-3D模型上传'
        }, {
            path: '/addCarouselDrawing', // 添加轮播图
            component: resolve => require(['../../component/addCarouselDrawing.vue'],
            resolve),
            name: '管理员-轮播图'
        }, {
            path: '/trainingClassifyList', // 添加培训分类&&培训分类列表
            component: resolve => require(['../../component/trainingClassifyList.vue'],
            resolve),
            name: '管理员-培训功能-培训分类'
        }, {
            path: '/addTraining', // 添加培训详情
            component: resolve => require(['../../component/addTraining.vue'],
            resolve),
            name: '管理员-培训功能-添加培训'
        }, {
            path: '/trainingList', // 培训列表
            component: resolve => require(['../../component/trainingList.vue'],
            resolve),
            name: '管理员-培训功能-培训列表'
        }, {
            path: '/addStore', // 培训列表
            component: resolve => require(['../../component/addStore.vue'],
            resolve),
            name: '管理员-门店管理-添加门店'
        }, {
            path: '/listStore', // 培训列表
            component: resolve => require(['../../component/listStore.vue'],
            resolve),
            name: '管理员-门店管理-门店列表',
            meta: { auth: false }
        }, {
            path: '/addExcel', // 老会员导入
            component: resolve => require(['../../component/addExcel.vue'],
            resolve),
            name: '会员导入'
        }, {
            path: '/editorTest',
            component: resolve => require(['../../component/editorTest.vue'],
            resolve)
        }, {
            path: '/addShareholder',
            component: resolve => require(['../../component/shareholder/addShareholder.vue'],
            resolve),
            name: '3D购股东-添加股东'
        }, {
            path: '/shareholderList',
            component: resolve => require(['../../component/shareholder/shareholderList.vue'],
            resolve),
            name: '3D购股东-股东列表'
        }, {
            path: '/orderDivided',
            component: resolve => require(['../../component/shareholder/orderDivided.vue'],
            resolve),
            name: '3D购股东-订单分成'
        }, {
            path: '/withdrawList',
            component: resolve => require(['../../component/shareholder/withdrawList.vue'],
            resolve),
            name: '3D购股东-提现列表'
        }, {
            path: '/shareholderInfo',
            component: resolve => require(['../../component/shareholder/shareholderInfo.vue'],
            resolve),
            name: '3D购股东-股东列表-股东详情'
        }]
    }, {
        path: '*',
        redirect: '/login'
    }
]

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

// 输出router
export default router
