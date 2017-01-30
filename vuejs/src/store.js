import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VINYLES_STORAGE_KEY = 'vinyles-vuejs'
const WISHLIST_STORAGE_KEY = 'wishlist-vuejs'

const localStoragePlugin = store => {
  store.subscribe((mutation, { vinyles }) => window.localStorage.setItem(VINYLES_STORAGE_KEY, JSON.stringify(vinyles)))
  store.subscribe((mutation, { wishlist }) => window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist)))
}


export default new Vuex.Store({
  state: {
    isSearching: false,
    vinyles: JSON.parse(window.localStorage.getItem(VINYLES_STORAGE_KEY) || '[]'),
    wishlist: JSON.parse(window.localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]'),
  },

  mutations: {
    openSearch(state) {
      state.isSearching = true
    },

    closeSearch(state) {
      state.isSearching = false
    },

    toggleSearch(state) {
      state.isSearching = !state.isSearching
    },

    addOwnedVinyle (state, vinyle) {
      state.vinyles.push(vinyle)
    },

    deleteOwnedVinyle (state, vinyle) {
      state.vinyles.splice(state.vinyles.indexOf(vinyle), 1)
    },

    addWishedVinyle (state, vinyle) {
      state.wishlist.push(vinyle)
    },

    deleteWishedVinyle (state, vinyle) {
      state.wishlist.splice(state.wishlist.indexOf(vinyle), 1)
    },
  },

  plugins: [
    localStoragePlugin,
  ],
})
