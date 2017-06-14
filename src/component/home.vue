<template>
    <div id="home">
        <h2>{{ name }} 您好,欢迎您使用哎哟不错店家管理系统</h2>
    </div>
</template>

<script>
import store from '../assets/store'

export default {
    name: 'home',
    data () {
        return {
            // 用户姓名
            name: store.state.user.userData.emp.name
        }
    }
}
</script>

<style lang="less">
    #home{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        
        margin-top: 8px;
        padding-top: 70px;
        background: url('../assets/img/home/home_banner.jpg') no-repeat center center #EBEFF5;
        background-size: cover;
        h2{
            font-weight: 500;
            font-size: 18px;
            color: #1D8CE0;
            text-indent: 35px;
            line-height: 50px;
            background: #fff;
        }
    }
</style>
