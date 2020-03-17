import Vue from 'vue'
import Router from 'vue-router'
import screenMonitor from '../components/screen_monitor.vue'
import screenStatistic from '../components/screen_statistic.vue'
import overlay from '../components/overlayBackground.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: null
    },
    {
      path: '/monitor',
      components:
      {
        default: screenMonitor,
        overlay: overlay
      }
    },
    {
      path: '/statistic',
      components:
      {
        default: screenStatistic,
        overlay: overlay
      }
    }
  ]
})
