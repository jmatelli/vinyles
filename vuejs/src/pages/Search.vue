<template>
  <page-content page-title="Vinyles - Search">
    <div class="main-content">
      <h2 v-if="searchResult.length">Search Results</h2>
      <h2 v-else>Waiting for something to search...</h2>
      <album-list v-bind:list="searchResult"></album-list>
    </div>
  </page-content>
</template>

<script>
import AlbumList from '../components/AlbumList.vue'

export default {
  name: 'search',

  components: {
    AlbumList,
  },

  computed: {
    searchResult() {
      return this.$store.state.searchResult
    },

    isSearching() {
      return this.$store.state.isSearching
    },
  },
}
</script>
