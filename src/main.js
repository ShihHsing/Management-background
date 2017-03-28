import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './assets/router/router.js'
import jQuery from 'jquery'
import './assets/editor/editor.config.js'

Vue.use(ElementUI)
Vue.use(VueResource)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

console.log("%c↘ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↙", "color:red")
console.log("%c→                            ←", "color:red")
console.log("%c→  嗨~~  http://www.aybc.so  ←", "color:red")
console.log("%c→                            ←", "color:red")
console.log("%c↗ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↖", "color:red")