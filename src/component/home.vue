<template>
    <div id="home">
        <h2>{{ name }} 您好,欢迎您使用哎哟不错电价管理系统</h2>
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
        width: 100%;
        height: 100%;

        background: url('../assets/img/login/home_banner.jpg') no-repeat center center;
        background-size: cover;
        h2{
            font-size: 18px;
            color: #1D8CE0;
            text-indent: 35px;
        }
    }
</style>
