import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './assets/router/router.js'
import jQuery from 'jquery'
import store from './assets/store/';
import './assets/editor/editor.config.js'

Vue.use(ElementUI)
Vue.use(VueResource)

router.beforeEach(({meta, path}, from, next) => {
  var { auth = true } = meta;
  var isLogin = Boolean(store.state.user.userData) //true用户已登录， false用户未登录

  if (auth && !isLogin && path !== '/login') {
    return next({ path: '/login' })
  }
  next()
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

console.log("%c↘ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↙", "color:red")
console.log("%c→                            ←", "color:red")
console.log("%c→  嗨~~  http://www.aybc.so  ←", "color:red")
console.log("%c→                            ←", "color:red")
console.log("%c↗ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↖", "color:red")