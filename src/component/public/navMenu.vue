<template>
    <div id="navMenu">
        <el-menu theme="dark" :default-active="router_url" class="el-menu-demo"
        mode="vertical" @select="handleSelect" unique-opened router>
            <el-menu-item index="/home">
                <span v-bind:class="[router_url == '/home' ? 'selected_home' : 'home']">
                    首页
                </span>
            </el-menu-item>
            <el-submenu index="商品管理">
                <template slot="title">
                    <span class="shop_manage">
                        商品管理
                    </span>
                </template>
                <el-submenu index="商品属性">
                    <template slot="title">
                        自定义属性
                    </template>
                    <el-menu-item index="/goodsPrivateColor">
                        商品颜色
                    </el-menu-item>
                    <el-menu-item index="/goodsPrivateSize">
                        商品尺码
                    </el-menu-item>
                    <el-menu-item index="/goodsPrivateProperty">
                        商品属性
                    </el-menu-item>
                    <el-menu-item index="/goodsPrivatePropertyValues">
                        商品属性值
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="/addMerchandise">
                    添加商品
                </el-menu-item>
                <el-menu-item index="/listOfGoods">
                    商品列表
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="/addExcel">
                <span class="addExcel" v-bind:class="[router_url == '/addExcel' ? 'selected_addExcel' : 'addExcel']">
                    会员导入
                </span>
            </el-menu-item>
            <el-submenu index="3D购股东" v-if="phoneNumber !== '15914383361'">
                <template slot="title">
                    <span class="shareholder">
                        3D购股东
                    </span>
                </template>
                <el-menu-item index="/addShareholder">
                    添加股东
                </el-menu-item>
                <el-menu-item index="/shareholderList">
                    股东列表
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="/giftTopUp">
                砸金蛋礼品充值
            </el-menu-item>
            <!-- 管理员权限 -->
            <el-submenu index="管理员" v-if="phoneNumber === '15914383361'">
                <template slot="title">
                    管理员
                </template>
                <el-submenu index="培训功能">
                    <template slot="title">
                        培训功能
                    </template>
                    <el-menu-item index="/trainingClassifyList">
                        培训分类
                    </el-menu-item>
                    <el-menu-item index="/addTraining">
                        新增培训
                    </el-menu-item>
                    <el-menu-item index="/trainingList">
                        培训列表
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="/addCarouselDrawing">
                    轮播图
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<style lang="less">
    #navMenu{
        height: 100%;
        a{
            color: #bfcbd9;
        }
        .el-menu-demo{
            height: 100%!important;
        }
        .el-menu{
            border-radius: 0px!important;
        }

        /*---------------------------- 导航图标 ------------------------*/
        .home{
            padding-left: 30px;
            background: url('../../assets/img/nav-menu/home_default.png') no-repeat left center;
            background-size: 18px;
        }
        .selected_home{
            padding-left: 30px;
            background: url('../../assets/img/nav-menu/home_selected.png') no-repeat left center;
            background-size: 18px;
        }
        .shop_manage{
            padding-left: 30px;
            background: url('../../assets/img/nav-menu/commodity_management_default.png') no-repeat left
             center;
             background-size: 18px;
        }
        .addExcel{
            padding-left: 30px;
            background: url('../../assets/img/nav-menu/member_import_default.png') no-repeat left
             center;
             background-size: 18px;
        }
        .selected_addExcel{
            padding-left: 30px;
            background: url('../../assets/img/nav-menu/member_import_selected.png') no-repeat left
             center;
             background-size: 18px;
        }
        .shareholder{
            padding-left: 30px;
            background: url('../../assets/img/nav-menu/3d_shareholders_default.png') no-repeat left
             center;
             background-size: 18px;
        }
        .selected_shareholder{
            padding-left: 30px;
            background: url('../../assets/img/nav-menu/3d_shareholders_selected.png') no-repeat left
             center;
             background-size: 18px;
        }

    }
</style>

<script>
import store from '../../assets/store'
export default {
    name: 'navMenu',
    data () {
        return {
            // 用户姓名
            phoneNumber: store.state.user.userData.emp.phone_number
        }
    },

    computed: {
        router_url: function () {
            return this.$route.path
        }
    },

    methods: {
        handleSelect (key, keyPath) {
            console.log(key, keyPath)
        }

        // 获取当前路由地址
        // 动态绑定导航和路由对应关系
        // getRouterUrl () {
        //     this.router_url = this.$route.path
        // }
    }
}
</script>
