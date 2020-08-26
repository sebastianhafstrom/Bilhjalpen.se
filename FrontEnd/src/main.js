import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'
import store from './store'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  }
})

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
