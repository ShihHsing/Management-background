<template>
    <div id="children">
        <el-row style="height: 100%;width: 100%;">
            <el-col :span="24">
                <logoTop></logoTop>
            </el-col>
            <el-col :span="24" class="children_body_wrap">
                <div class="children_body">
                    <div class="navMenuWrap">
                        <navMenu></navMenu>
                    </div>
                    <div class="bodyWrap">
                        <el-col :span="24" class="body">
                            <!-- 面包屑 -->
                            <div class="breadcrumb">
                                <breadcrumb></breadcrumb>
                            </div>
                            <div class="children_html_wrap">
                                <div class="children_html">
                                    <!-- 路由展示区 -->
                                    <transition mode="out-in">
                                        <router-view></router-view>
                                    </transition>
                                </div>
                            </div>
                            </br>
                            </br>
                            </br>
                        </el-col>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="less">
#children{
    position: relative;

    width: 100%;
    height: 100%;
    overflow: hidden;
    .children_body_wrap{
        box-sizing: border-box;

        padding-bottom: 80px;

        width: 100%;
        height: 100%;
        .children_body{
            display: flex;

            width: 100%;
            height: 100%;
            .navMenuWrap{
                height: 100%;
                width: 200px;
            }
            .bodyWrap{
                height: 100%;
                flex: 1;

                overflow: hidden;
                .body{
                    box-sizing: border-box;

                    height: 100%;
                    width: 100%;
                    
                    margin-top: 8px;
                    padding-bottom: 8px;

                    background: #EBEFF5;
                    .breadcrumb{
                        display: flex;
                        align-items: center;
                        
                        margin-bottom: 8px;
                        padding-left: 35px;

                        width: 100%;
                        height: 70px;
                        background: #EBEFF5;
                    }
                    .children_html_wrap{
                        box-sizing: border-box;
                        
                        padding-bottom: 78px;

                        width: 100%;
                        height: 100%;
                        .children_html{
                            width: 100%;
                            height: 100%;

                            box-sizing: border-box;

                            padding: 0 35px 35px 35px;

                            overflow: hidden;
                        }
                    }
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
