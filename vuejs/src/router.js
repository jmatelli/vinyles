import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import store from './store'

import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import Vinyles from './pages/Vinyles.vue'
import Vinyle from './pages/Vinyle.vue'
import Wishlist from './pages/Wishlist.vue'
import Search from './pages/Search.vue'

const isAuth = (to, from, next) => {
  auth.authUser()
    .then(() => next())
    .catch(() => next(false))
}

const homeRoute = {
  path: '/',
  redirect: '/vinyl-collection',
}

const loginRoute = {
  path: '/login',
  name: 'login',
  component: Login,
}

const logoutRoute = {
  path: '/logout',
  beforeEnter(to, from, next) {
    store.dispatch('logout')
      .then(() => router.push('/login'))
      .catch(() => next(false))
  },
}

const signupRoute = {
  path: '/signup',
  name: 'signup',
  component: Signup,
}

const collectionRoute = {
  path: '/vinyl-collection',
  name: 'vinyles',
  component: Vinyles,
  children: [
    { path: ':id', name: 'vinyle', component: Vinyle  },
  ],
  meta: {
    auth: true,
  },
}

const wishlistRoute = {
  path: '/wishlist',
  name: 'wishlist',
  component: Wishlist,
  meta: {
    auth: true,
  },
}

const searchRoute = {
  path: '/search',
  name: 'search',
  component: Search,
  meta: {
    auth: true,
  },
}

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    homeRoute,
    loginRoute,
    logoutRoute,
    signupRoute,
    collectionRoute,
    wishlistRoute,
    searchRoute,
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLoggedIn && store.getters.user) {
    console.log(`You can't access the ${to.name} route if you're not logged in`)
    router.replace('/login')
  } else {
    next()
  }
})

export default router
