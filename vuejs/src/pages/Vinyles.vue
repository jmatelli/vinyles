<template>
  <page-content page-title="Vinyles - Collection">
    <div class="main-content">
      <h2>Your Vinyl Records Collection</h2>
      <album-list v-if="vinyles.length" v-bind:list="vinyles"></album-list>
      <div v-else>
        <p>No vinyl record in your collection yet, you can search for one by clicking here</p>
        <md-button class="md-raised md-primary" v-on:click="openSearch()">Search for records</md-button>
      </div>
    </div>
  </page-content>
</template>

<script>
import AlbumList from '../components/AlbumList.vue'

export default {
  name: 'vinyles',

  components: {
    AlbumList,
  },

  computed: {
    vinyles() {
      return this.$store.state.vinyles
    },
  },

  methods: {
    openSearch() {
      this.$router.push('search')
      this.$store.commit('openSearch')
    }
  }
}
</script>

<style>
</style>
