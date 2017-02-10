import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import * as firebase from 'firebase'
import VueFire from 'vuefire'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

require('es6-promise').polyfill()

import App from './App.vue'
import PageContent from './components/PageContent.vue'
import store from './store'
import router from './router'
import { FIREBASE_CONFIG } from './config'

Vue.use(VueMaterial)
Vue.use(VueFire)
Vue.component('page-content', PageContent);

sync(store, router)

function init() {
  firebase.initializeApp(FIREBASE_CONFIG)
}

init()

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
