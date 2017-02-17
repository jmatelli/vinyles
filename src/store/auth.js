import * as firebase from 'firebase'
import { Promise } from 'es6-promise'
import _ from 'lodash'
import gravatar from '../utils/avatar'
import router from '../router'

const USER_STORAGE_KEY = 'user'
const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const UPDATE_USER = ' UPDATE_USER'

export const pluginAuth = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === UPDATE_USER && mutation.payload) {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mutation.payload))
    }
  })
}

export const auth = {
  state: {
    user: JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY) || '{}'),
    isLoggedIn: !!window.localStorage.getItem(USER_STORAGE_KEY),
  },

  mutations: {
    [LOGIN](state) {
      state.pending = true
    },

    [LOGIN_SUCCESS](state) {
      state.isLoggedIn = true
      state.pending = false
    },

    [LOGOUT](state) {
      state.isLoggedIn = false
    },

    [UPDATE_USER](state, user) {
      if (user) {
        state.user = user
        state.user.avatar = gravatar(user.email)
      }
    }
  },

  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn
    },

    user(state) {
      return state.user
    },
  },

  actions: {
    login({ commit, state }, { email, password }) {
      commit(LOGIN)
      return new Promise((resolve, reject) => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            commit(UPDATE_USER, user)
            commit(LOGIN_SUCCESS)
            resolve()
          })
          .catch(reject)
      })
    },

    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        return firebase
          .auth()
          .signOut()
          .then(() => {
            window.localStorage.removeItem('user')
            state.user = undefined
            commit(LOGOUT)
            resolve()
          })
          .catch(reject)
      })
    },

    signup({ commit, state }, { email, password }) {
      return new Promise((resolve, reject) => {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            commit(UPDATE_USER, user)
            commit(LOGIN_SUCCESS)
            return user.sendEmailVerification()
          })
          .then((user) => {
            resolve()
            router.push('profile')
          })
          .catch(reject)
      })
    },

    updateUser({ commit }, user) {
      commit(UPDATE_USER, user)
    },

    verifyEmail({ rootState }) {
      return new Promise((resolve, reject) => {
        let mode
        switch (rootState.route.query.mode) {
          case 'verifyEmail':
            mode = 'applyActionCode'
            break;
        }
        return firebase
          .auth()
          [mode](rootState.route.query.oobCode)
          .then((res) => {
            router.push('profile')
            resolve()
          })
          .catch(reject)
      })
    },
  },
}
