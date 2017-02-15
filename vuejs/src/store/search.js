export const search = {
  state: {
    isSearching: false,
    results: []
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
  }
}
