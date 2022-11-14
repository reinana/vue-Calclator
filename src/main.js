import Vue from 'vue'
import App from './App.vue'
import { BigNumber } from 'bignumber.js';
Vue.use(BigNumber)

// bootstrapを使う
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
