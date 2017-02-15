import * as firebase from 'firebase'
import { FIREBASE_CONFIG } from './config'

firebase.initializeApp(FIREBASE_CONFIG)

// Vue dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import VueFire from 'vuefire'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

// Vue components
import App from './App.vue'
import PageContent from './components/PageContent.vue'
import store from './store'
import router from './router'

Vue.use(VueMaterial)
Vue.use(VueFire)
Vue.component('page-content', PageContent);

sync(store, router)

new Vue({
  el: '#app',
  store,
  router,
  firebase: {},
  render: h => h(App)
})
