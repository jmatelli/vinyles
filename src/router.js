import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import store from './store'

import NotFound from './pages/NotFound.vue'
import ErrorComponent from './pages/Error.vue'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import VerifyEmail from './pages/VerifyEmail.vue'
import Profile from './pages/Profile.vue'
import Vinyles from './pages/Vinyles.vue'
import Vinyle from './pages/Vinyle.vue'
import Wishlist from './pages/Wishlist.vue'

const isAuth = (to, from, next) => {
  auth.authUser()
    .then(() => next())
    .catch(() => next(false))
}

const notFoundRoute = {
  path: '*',
  component: NotFound,
}

const errorRoute = {
  path: '/error',
  name: 'error',
  component: ErrorComponent,
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
      .then(() => router.push('login'))
      .catch(() => router.push('error'))
  },
}

const verifyEmailRoute = {
  path: '/verify-email',
  name: 'verify-email',
  component: VerifyEmail,
}

const signupRoute = {
  path: '/signup',
  name: 'signup',
  component: Signup,
}

const profileRoute = {
  path: '/profile',
  name: 'profile',
  component: Profile,
  meta: {
    auth: true,
  }
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
  beforeEnter,
}

const wishlistRoute = {
  path: '/wishlist',
  name: 'wishlist',
  component: Wishlist,
  meta: {
    auth: true,
  },
  beforeEnter,
}

function beforeEnter(to, from, next) {
  if (store.getters.user.emailVerified) {
    next()
  } else {
    console.log(`You need to verify your email before we grant you access to the ${to.name} route.`)
    router.push('/profile')
  }
}

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    homeRoute,

    // Auth routes
    loginRoute,
    logoutRoute,
    signupRoute,
    verifyEmailRoute,

    // Pages routes
    profileRoute,
    collectionRoute,
    wishlistRoute,

    errorRoute,
    notFoundRoute,
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLoggedIn) {
    console.log(`You can't access the ${to.name} route if you're not logged in`)
    router.replace('/login')
  } else {
    next ()
  }
})

export default router
