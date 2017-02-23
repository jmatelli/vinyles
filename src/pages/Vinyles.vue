<template>
  <page-content page-title="Collection">
    <div class="main-content">
      <h2>Your Vinyl Records Collection</h2>
      <album-list v-if="vinyles.length" v-bind:list="vinyles"></album-list>
      <div v-else>
        <p>No vinyl record in your collection yet, you can search for one in the searchbar above</p>
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
}
</script>

<style>
</style>
