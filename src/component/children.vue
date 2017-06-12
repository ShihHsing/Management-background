<template>
    <div id="children">
        <el-col :span="24">
            <logoTop></logoTop>
        </el-col>
        <div class="children_body">
            <div class="navMenuWrap">
                <navMenu></navMenu>
            </div>
            <div class="bodyWrap sx_basis_scroll sx_scroll_style_lucency">
                <el-col :span="24" class="body">
                    <!-- 面包屑 -->
                    <div class="breadcrumb">
                        <breadcrumb></breadcrumb>
                    </div>
                    <!-- 路由展示区 -->
                    <transition mode="out-in">
                        <router-view></router-view>
                    </transition>
                    </br>
                    </br>
                    </br>
                </el-col>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #children{
        height: 100%;
        width: 100%;

        overflow: hidden;
        .children_body{
            display: flex;

            height: 100%;
            width: 100%;
            .navMenuWrap{
                height: 100%;
                width: 200px;

                padding-bottom: 80px;
            }
            .bodyWrap{
                height: 100%;
                flex: 1;

                padding-bottom: 60px;
                overflow-x: auto;
                .body{
                    height: 100%;
                    width: 100%;
                    .breadcrumb{
                        display: flex;
                        align-items: center;

                        padding-left: 35px;

                        width: 100%;
                        height: 70px;
                    }
                }
            }
        }
    }
</style>

<script>
// 导航栏
import navMenu from './navMenu.vue'
// 页头
import logoTop from './logoTop.vue'
// 面包屑
import breadcrumb from './Breadcrumb.vue'
export default {
    name: 'children',
    data () {
        return {}
    },
    components: { navMenu, logoTop, breadcrumb }
}
</script>
