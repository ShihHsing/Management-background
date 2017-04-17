<template>
  <div id="app">
    <!-- 路由展示区 -->
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  a{
    text-decoration: none;
  }
  #app{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
