import Vue from 'vue'
import App from './App'
import store from './store/store'

import './assets/styles/util.less'
import './assets/styles/util_rl.less'
// import router from './router'
import dataV from '@jiaminghi/data-view'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
Vue.config.productionTip = false

Vue.use(dataV)
// Vue.use(BootstrapVue)

let vm = new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

Vue.use({
  vm
})
