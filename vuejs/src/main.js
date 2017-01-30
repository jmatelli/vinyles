import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

require('es6-promise').polyfill()

import App from './App.vue'
import PageContent from './components/PageContent.vue'
import store from './store'
import router from './router'

Vue.use(VueMaterial)
Vue.component('page-content', PageContent);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
