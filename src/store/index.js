import Vue from 'vue'
import Vuex from 'vuex'

// Vuex Modules
import { auth, pluginAuth } from './auth'
import { search } from './search'

Vue.use(Vuex)

const VINYLES_STORAGE_KEY = 'vinyles-vuejs'
const WISHLIST_STORAGE_KEY = 'wishlist-vuejs'

export default new Vuex.Store({
  modules: {
    auth,
    search,
  },

  state: {
    vinyles: [],
    wishlist: [],
  },

  mutations: {
    addOwnedVinyle (state, vinyle) {
    },

    deleteOwnedVinyle (state, vinyle) {
    },

    addWishedVinyle (state, vinyle) {
    },

    deleteWishedVinyle (state, vinyle) {
    },
  },

  plugins: [pluginAuth],
})
