<template>
  <page-content page-title="Wishlist">
    <div class="main-content">
      <h2>Your Wishlist</h2>
      <album-list v-if="wishlist.length" v-bind:list="wishlist"></album-list>
      <div v-else>
        <p>No vinyl record in your wishlist yet, you can search for one in the searchbar above</p>
      </div>
    </div>
  </page-content>
</template>

<script>
import AlbumList from '../components/AlbumList.vue'

export default {
  name: 'wishlist-page',

  components: {
    AlbumList,
  },

  computed: {
    wishlist() {
      return this.$store.state.wishlist
    },
  },

  methods: {
    openSearch() {
      this.$router.push('search')
      this.$store.commit('openSearch')
    },
  },
}
</script>
