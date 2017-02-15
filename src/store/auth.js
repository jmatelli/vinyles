import * as firebase from 'firebase'
import { Promise } from 'es6-promise'
import _ from 'lodash'
import gravatar from '../utils/avatar'

const USER_STORAGE_KEY = 'user'
const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

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
            state.user = user.providerData[0]
            state.user.avatar = gravatar(state.user.email)
            window.localStorage.setItem('user', JSON.stringify(state.user))
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
            state.user = user.providerData[0]
            state.user.avatar = gravatar(state.user.email)
            window.localStorage.setItem('user', JSON.stringify(state.user))
            commit(LOGIN_SUCCESS)
            resolve()
          })
          .catch(reject)
      })
    },
  },
}
