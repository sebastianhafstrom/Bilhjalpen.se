import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'
import store from './store'
import VueMq from 'vue-mq'
import VueGtag from "vue-gtag";
import VueMeta from 'vue-meta'

Vue.use(VueMeta) 

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  }
})

Vue.use(VueGtag, {
  config: { id: "UA-176569582-1" }
}, router);

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
