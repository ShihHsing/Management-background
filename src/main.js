import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './assets/router/router.js'
import store from './assets/store/'
import axios from './assets/axios/http.js'
import './assets/editor/editor.config.js'
import Qs from 'qs'
import './assets/public/sx_style.less'

Vue.use(ElementUI)

Vue.use(VueResource)
// Vue.config.devtools = true
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.$axios = axios

// 将Qs挂载到prototype上，在组件中可以直接使用this.Qs访问
Vue.prototype.$Qs = Qs

router.beforeEach(({ meta, path }, from, next) => {
  var { auth = true } = meta
  var isLogin = Boolean(store.state.user.userData) // true用户已登录， false用户未登录
  if (auth && !isLogin && path !== '/login') {
    return next({ path: '/login' })
  }
  next()
})

new Vue({
  el: '#app',
  store,
  router,
  axios,
  render: h => h(App)
})

console.log('%c↘ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↙', 'color:red')
console.log('%c→                            ←', 'color:red')
console.log('%c→  嗨~~  http://www.aybc.so  ←', 'color:red')
console.log('%c→                            ←', 'color:red')
console.log('%c↗ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↖', 'color:red')
