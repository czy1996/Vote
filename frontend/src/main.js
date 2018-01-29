// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import store from './assets/store/store'
import Utils from './utils/utils'
import axios from './assets/api/api'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(Utils)

Vue.prototype.axios = axios

Vue.config.productionTip = false

// Vue.material.registerTheme('app', {
//   primary: 'teal',
//   accent: 'cyan',
//   warn: 'red'
// })
//
// Vue.material.setCurrentTheme('app')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
