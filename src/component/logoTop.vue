<template>
    <div id="logoTop">
        <!-- logo -->
        <div class="logo_left_wrap">
            <div class="logo">
                <el-row type="flex" justify="center">
                    <router-link to="/home"><img src="../assets/img/logo-top/nav_logo.png"></router-link>
                </el-row>
            </div>
        </div>
        
        <div class="logo_right_wrap">
            <!-- 标题 -->
            <el-col :span="16" class="logoTitle">
                <h1>哎哟不错店家管理系统</h1>
            </el-col>
            <!-- 门店列表 -->
            <el-col :span="4" class="storeSelect">
                <el-select v-model="shop" placeholder="请选择">
                    <el-option
                        v-for="item in own_shop_list"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <!-- 退出 -->
            <el-col :span="3" :offset="1">
                <el-row type="flex" justify="space-around" class="user">
                    <div class="user_icon">
                        {{ name }}
                    </div>
                    <div :span="6">
                        |
                    </div>
                    <div :span="6" @click="dialogVisible = true">
                        退出
                    </div>
                </el-row>
            </el-col>
        </div>
        
        <!-- 二次确认框 -->
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
            <span>确定要退出 {{ name }} 这个账户吗?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="logOut">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style lang="less">
    #logoTop{
        display: flex;

        height: 80px;
        background-color: #fff;

        -moz-box-shadow: 1px 1px 20px #8492A6; /* Firefox */
        -webkit-box-shadow: 1px 1px 20px #8492A6; /* Safari 和 Chrome */
        box-shadow: 1px 1px 20px #8492A6; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
        .logo_left_wrap{
            width: 200px;
            .logo{
                width: 100%;
                height: 80px;

                background: #1D8CE0;
                img{
                    height: 60px;
                    width: auto;

                    margin: 0 auto;
                    margin-top: 10px;
                }
            }
        }
        .logo_right_wrap{
            flex: 1;
            .logoTitle{
                h1{
                    font-size: 28px;
                    color: #8492A6;
                    line-height: 80px;
                    text-indent: 35px;
                }
            }
            .storeSelect{
                display: flex;
                justify-content: center;
                align-items: center;

                height: 100%;
                input{
                    border-color: #E5E9F2;
                    color: #8492A6;
                }
            }
        }
        .user{
            color: #8492A6;
            font-size: 12px;
            text-align: center;
            line-height: 80px;
            .user_icon{
                cursor: pointer;

                padding-left: 25px;
                background: url('../assets/img/logo-top/user_center.png') no-repeat left center;
            }
            img{
                width: 20px;
                height: 20px;

                line-height: 100px;
            }
            div:nth-of-type(3){
                cursor: pointer;
            }
        }
    }
</style>

<script>
import store from '../assets/store'
import { mapActions } from 'vuex'
import { USER_SIGNOUT, USER_SIGNIN } from '../assets/store/user'
import * as API from '../assets/axios/api.js'

export default {
    name: 'logoTop',
    data () {
        return {
            // 对话框控制
            dialogVisible: false,
            // 用户头像
            userImgUrl: '',
            userPhone: store.state.user.userData.emp.phone_number,
            // 门店列表
            own_shop_list: store.state.user.userData.own_shop_list,
            // 选择门店
            shop: store.state.user.userData.own_shop_list[0].shop_id,
            // 用户姓名
            name: store.state.user.userData.emp.name
        }
    },
    watch: {
        shop: function (val) {
            // 切换门店方法
            this.chageShop(val)
        },
        own_shop_list: function (val) {
            if (val.length > 0) {
                this.shop = val[0].shop_id
            }
        }
    },
    methods: {
        ...mapActions([USER_SIGNOUT]), // 展开 USER_SIGNOUT 到内部作用域
        ...mapActions([USER_SIGNIN]), // 展开 USER_SIGNIN 到内部作用域

        // 退出
        logOut () {
            this.$axios.post(API.logOut)
            .then(msg => {
                const data = msg.data
                if (data.flag !== '01') {
                    this.$message.error(data.return_code)
                    setTimeout(() => {
                        // 退出到登录页
                        this.$router.replace({ path: '/login' })
                    }, 1000)
                    return false
                }

                this.dialogVisible = false // 关闭对话框
                this.USER_SIGNOUT() // 退出登录

                this.$message({
                    data: data.return_code,
                    type: 'success'
                })

                setTimeout(() => {
                    // 退出到登录页
                    this.$router.replace({ path: '/login' })
                }, 1000)
            })
            .catch(response => {
                this.dialogVisible = false // 关闭对话框
                this.$message('服务器Error')
            })
        },

        // 更换门店
        chageShop (id) {
            this.$axios.post(API.changeTheShop, {
                shop_id: id
            })
            .then(msg => {
                const data = msg.data
                if (data.flag !== '01') {
                    this.consoleError(data.return_code)
                    return false
                }
                const userData = data
                this.USER_SIGNIN({ userData })// 通知vuex改变状态树
                this.consoleSuccess({
                    data: data.return_code,
                    type: 'success'
                })
            })
            .catch(response => {
                this.$message('服务器Error')
            })
        }
    }
}
</script>
