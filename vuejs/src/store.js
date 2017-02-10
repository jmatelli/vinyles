import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import * as firebase from 'firebase'

Vue.use(Vuex)

const VINYLES_STORAGE_KEY = 'vinyles-vuejs'
const WISHLIST_STORAGE_KEY = 'wishlist-vuejs'
const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

const localStoragePlugin = store => {
  store.subscribe((mutation, { vinyles }) => window.localStorage.setItem(VINYLES_STORAGE_KEY, JSON.stringify(vinyles)))
  store.subscribe((mutation, { wishlist }) => window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist)))
}


export default new Vuex.Store({
  state: {
    isSearching: false,
    isLoggedIn: !!window.localStorage.getItem('user'),
    vinyles: JSON.parse(window.localStorage.getItem(VINYLES_STORAGE_KEY) || '[]'),
    wishlist: JSON.parse(window.localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]'),
    searchResult: [],
  },

  mutations: {
    openSearch(state) {
      state.isSearching = true
    },

    closeSearch(state) {
      state.isSearching = false
      state.searchResult = []
    },

    toggleSearch(state) {
      state.isSearching = !state.isSearching
    },

    addOwnedVinyle (state, vinyle) {
      let storage = JSON.parse(window.localStorage.getItem(VINYLES_STORAGE_KEY))
      if (!_.find(storage, { id: vinyle.id })) {
        state.vinyles.push(vinyle)
      }
    },

    deleteOwnedVinyle (state, vinyle) {
      state.vinyles.splice(state.vinyles.indexOf(vinyle), 1)
    },

    addWishedVinyle (state, vinyle) {
      let storage = JSON.parse(window.localStorage.getItem(WISHLIST_STORAGE_KEY))
      if (!_.find(storage, { id: vinyle.id })) {
        state.wishlist.push(vinyle)
      }
    },

    deleteWishedVinyle (state, vinyle) {
      state.wishlist.splice(state.wishlist.indexOf(vinyle), 1)
    },

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
    }
  },

  actions: {
    login({ commit, state }, { email, password }) {
      commit(LOGIN)
      return new Promise((resolve, reject) => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            window.localStorage.setItem('user', JSON.stringify(user))
            commit(LOGIN_SUCCESS)
            state.route.push
            resolve()
          })
          .catch(reject)
      })
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        return firebase.auth().signOut()
          .then(() => {
            window.localStorage.removeItem('user')
            commit(LOGOUT)
            resolve()
          })
          .catch(reject)
      })
    },
  },

  plugins: [
    localStoragePlugin,
  ],
})
