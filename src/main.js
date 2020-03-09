import Vue from 'vue'
import App from './App'
import store from './store/store'

import './assets/util.less'
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
// console.log(vm)

Vue.use({
  vm
})
