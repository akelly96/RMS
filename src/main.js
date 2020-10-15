import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// add these before Vue is instantiated
window.axios = axios
axios.defaults.baseURL = "https://localhost:44346/api/"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
