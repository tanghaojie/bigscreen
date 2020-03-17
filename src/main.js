import Vue from 'vue'
import store from './store/store'
import router from './router'
import App from './App'
import './assets/styles/util.less'
import './assets/styles/util_rl.less'
import dataV from '@jiaminghi/data-view'
Vue.config.productionTip = false
Vue.use(dataV)
let vm = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
window.GLOBAL_VUE_INSTANCE = vm
