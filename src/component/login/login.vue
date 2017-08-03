<template>
    <div id="login">
        <div class="login_top">
            <div class="login_top_body">
                <!-- 头部 -->
                <header class="login_top_body_header">
                    <h1>   
                        <!-- TODO: 跳转首页 -->
                        <img src="../../assets/img/login/logo.png">
                    </h1>
                    <div class="contact">
                        服务热线</br>0755-83667791
                    </div>
                </header>
                <!-- 大标题 -->
                <div class="title">
                    <h1>哎哟不错管理后台Dev</h1>
                </div>
                <!-- 登录框 -->
                <div class="login_form_wrap">
                    <p class="login_form_title">用户登录</p>
                    <el-input placeholder="请输入账号/手机号" v-model="phone_number">
                        <template slot="prepend">
                            <img src="../../assets/img/login/login_user.png" height="20" width="20">
                        </template>
                    </el-input>
                    </br></br>
                    <el-input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
                        <template slot="prepend">
                            <img src="../../assets/img/login/login_password.png" height="20" width="20">
                        </template>
                    </el-input>
                    <el-button class="login_button" type="primary" size="large" @click="login">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #login{
        width: 100%;
        height: 100%;

        background: #fff;
        .login_top{
            width: 100%;
            height: 600px;
            
            background: #1D8CE0;
            .login_top_body{
                width: 1200px;
                height: 100%;

                margin: 0 auto;
                .login_top_body_header{
                    width: 100%;
                    height: 100px;
                    h1{
                        float: left;
                        img{
                            height: 50px;
                            width: auto;
                            margin-top: 25px;
                        }
                    }
                    .contact_icon{
                        float: right;
                        i{
                            width: 40px;
                            color: #fff;
                        }
                    }
                    .contact{
                        float: right;
                        margin-top: 25px;
                        padding-left: 50px;

                        font-size: 14px;
                        line-height: 20px;
                        color: #fff;

                        background: url('../../assets/img/login/phone.png') no-repeat left center;
                    }
                }
                .title{
                    width: 100%;
                    height: 180px;

                    margin-top: 50px;
                    h1{
                        font-size: 60px;
                        color: #fff;
                        text-align: center;
                        line-height: 180px;
                    }
                }
                .login_form_wrap{
                    box-sizing: border-box;

                    width: 520px;
                    height: 350px;
                    
                    padding: 37px 120px;
                    margin: 0 auto;

                    background: #fff;

                    -moz-border-radius: 5px; /* Firefox */
                    -webkit-border-radius: 5px; /* Safari 和 Chrome */
                    border-radius:  5x; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */

                    -moz-box-shadow: 5px 5px 30px #1D8CE0; /* Firefox */
                    -webkit-box-shadow: 5px 5px 30px #1D8CE0; /* Safari 和 Chrome */
                    box-shadow: 5px 5px 30px #1D8CE0; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
                    .login_form_title{
                        width: 100%;
                        
                        margin-bottom: 30px;

                        color: #1D8CE0;
                        font-size: 34px;
                        text-align: center;
                    }
                    .login_button{
                        width: 100%;
                        height: 50px;

                        margin-top: 40px;
                    }
                }
            }
        }
    }
</style>

<script>
import { mapActions } from 'vuex'
import { USER_SIGNIN } from '../../assets/store/user.js'
import * as API from '../../assets/axios/api.js'

export default {
    name: 'login',
    data () {
        return {
            phone_number: '', // 手机号
            password: '' // 密码
        }
    },
    methods: {
        // 展开 USER_SIGNIN 到内部作用域
        ...mapActions([USER_SIGNIN]),

        login () {
            if (this.phone_number === '') {
                this.$message.error('请完善账号!')
                return false
            }
            if (this.password === '') {
                this.$message.error('请完善密码!')
                return false
            }
            const data = {
                'phone_number': this.phone_number,
                'password': this.password
            }
            this.$axios.post(API.loginUrl, data)
            .then(msg => {
                let data = null // 返回语
                if (msg.data.flag !== '01') {
                    this.$message.error(msg.data.return_code)
                    return false
                }
                switch (msg.data.emp.level >> 0) {
                case 1:
                    data = '店员!欢迎你的登录!'
                    break
                case 2:
                    data = '店长!欢迎你的登录!'
                    break
                case 3:
                    if (msg.data.emp.shop_id >> 0 === 1) {
                        data = '最大BOSS!欢迎您!'
                    } else {
                        data = '老板!欢迎您的登录!'
                    }
                    break
                default:
                    data = '管理员!注意使用规则!'
                    break
                }

                this.$message({
                    message: data,
                    type: 'success'
                })

                const userData = msg.data // 用户信息
                this.USER_SIGNIN({ userData }) // 通知vuex改变状态树

                // 跳转逻辑
                setTimeout(() => {
                    this.$router.push({ path: 'home' })
                }, 1000)
            })
            .catch(error => {
                this.$message('服务发生意外情况,请稍后重试!')
                console.log(error)
            })
        }
    }
}
</script>
