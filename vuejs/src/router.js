import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Vinyles from './pages/Vinyles.vue'
import Vinyle from './pages/Vinyle.vue'
import Wishlist from './pages/Wishlist.vue'
import Search from './pages/Search.vue'

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', redirect: '/vinyl-collection' },
    {
      path: '/vinyl-collection',
      name: 'vinyles',
      component: Vinyles,
      children: [
        { path: ':id', name: 'vinyle', component: Vinyle  }
      ]
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: Wishlist,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
  ]
})
