import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {BootstrapVue} from 'bootstrap-vue'

// add these before Vue is instantiated
window.axios = axios
Vue.config.productionTip = false

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
