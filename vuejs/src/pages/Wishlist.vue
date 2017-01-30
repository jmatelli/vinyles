<template>
  <page-content page-title="Vinyles - Wishlist">
    <div class="main-content">
      <md-layout md-flex="100">
        <h2>Your Wishlist</h2>
      </md-layout>
      <md-layout v-if="wishlist.length" md-row>
        list of vinyl records
      </md-layout>
      <md-layout v-else md-row>
        <p>No vinyl record in your wishlist yet, you can search for one by clicking here</p>
        <md-button class="md-raised md-primary" v-on:click="openSearch()">Search for records</md-button>
      </md-layout>
    </div>
  </page-content>
</template>

<script>
export default {
  name: 'wishlist',

  computed: {
    wishlist() {
      return this.$store.state.wishlist
    },
  },

  methods: {
    openSearch() {
      this.$store.commit('openSearch')
    },
  },
}
</script>
