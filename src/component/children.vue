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
                overflow: hidden;
                .body{
                    box-sizing: border-box;

                    height: 100%;
                    width: 100%;
                    
                    margin-top: 8px;

                    background: #EBEFF5;
                    .breadcrumb{
                        position: fixed;
                        top: 88px;

                        display: flex;
                        align-items: center;
                        
                        // margin-top: 10px;
                        padding-left: 35px;

                        width: 100%;
                        height: 70px;
                        background: #EBEFF5;
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
