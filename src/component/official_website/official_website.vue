<template>
  <div id="official_website">
    <el-row class="top" type="flex" justify="space-between">
      <el-col class="quit">
        <span class="cursor" @click="logOut">
          <i class="el-icon-arrow-left"></i>&nbsp;Quit
        </span>
      </el-col>
      <el-col class="title">
        官网管理后台
        <!-- <img src="../../assets/img/Expression_36.png" alt="官网后台"> -->
      </el-col>
      <el-col class="right">
        <span class="cursor">
          <i class="el-icon-share"></i>
        </span>
      </el-col>
    </el-row>
    <div class="body">
      <div class="nav">
        <el-menu 
          mode="vertical"
          class="el-menu-vertical-demo nav_substratum" 
          theme="dark"
          :default-active="router_url"
          unique-opened
          router>
          <el-menu-item index="/addNews">
            <i class="el-icon-star-on"></i>添加新闻
          </el-menu-item>
          <el-menu-item index="/newsList">
            <i class="el-icon-menu"></i>新闻列表
          </el-menu-item>
          <el-menu-item index="/addEmploy">
            <i class="el-icon-star-on"></i>添加招聘
          </el-menu-item>
          <el-menu-item index="/employList">
            <i class="el-icon-menu"></i>招聘列表
          </el-menu-item>
        </el-menu>
      </div>
      <div class="router_substratum">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
        <div class="official_website_bottom">Copyright©2017深圳市哎哟不错机器人科研有限公司All rights reserved 粤ICP备16038767号</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'official_website',
    data () {
      return {
        router_url: null
      }
    },
    created: function () {
      // 初始化获取路由地址
      this.getRouterUrl()
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      // 获取当前路由地址
      // 动态绑定导航和路由对应关系
      getRouterUrl () {
        this.router_url = this.$route.path
      },
      /* ---- 退出 ---- */
      logOut () {
        this.$confirm('是否确认退出', '友情提示', {
          confirmButtonText: '残忍退出',
          cancelButtonText: '再玩一会',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '你上当了,呵呵呵...'
          })
          this.$confirm('在玩一会呗', '友情提示', {
            confirmButtonText: '残忍退出',
            cancelButtonText: '嘿嘿嘿',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '想退出先夸夸我!'
            })
            this.$confirm('你最丑', '友情提示', {
              confirmButtonText: '我最丑',
              cancelButtonText: '我最美',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '是的你最丑 Bay!'
              })
              setTimeout(() => {
                this.$router.push('login')
              }, 1000)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '你最丑'
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '在玩一会吧'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '在玩一会吧'
          })
        })
      }
    },
    components: {}
  }
</script>

<style lang="less">
  .steps{
    height: auto;
    width: 100%;
    margin-top: 100px;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  #official_website{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .top{
      width: 100%;
      height: 65px;
      background: #45c8dc;
      color: #fff;
      box-sizing: border-box;
      padding: 0 15px;
      font-size: 18px;
      position: fixed;
      top: 0;
      z-index: 99;
      .quit,.right{
        line-height: 65px;
        .cursor{
          cursor: pointer;
        }
      }
      .right{
        .cursor{
          float: right;
        }
      }
      .title{
        text-align: center;
        font-size: 30px;
        line-height: 65px;
        float: left;
        color: #fff;
        img{
          box-sizing: border-box;
          padding: 15px;
          height: 100%;
          float: left;
        }
      }
    }
    .body{
      box-sizing: border-box;
      padding-top: 65px;
      width: 100%;
      height: 100%;
      background: #f6f7f9;
      .nav{
        width: 195px;
        height: 100%;
        position: fixed;
        .nav_substratum{
          height: 100%;
          border-right: 2px solid #fff;
        }
      }
      .router_substratum{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding-left: 195px;
        padding-bottom: 40px;
        .official_website_bottom{
          box-sizing: border-box;
          border-top: 1px solid #45c8dc;
          text-align: center;
          line-height: 40px;
          color: #45c8dc;
        }
      }
    }
  }
</style>