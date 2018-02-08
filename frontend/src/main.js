// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import Vuetify from 'vuetify'
import ECharts from 'vue-echarts/components/ECharts'
import Utils from './utils/utils'
import 'vuetify/dist/vuetify.min.css'

import 'echarts/lib/chart/bar'
import 'echarts/theme/macarons'

Vue.component('chart', ECharts)

Vue.use(Vuetify, { theme: {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
}})

Vue.use(Utils)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
