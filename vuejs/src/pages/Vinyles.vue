<template>
  <page-content page-title="Vinyles - collection">
    <Navbar></Navbar>
    <div class="main-content">
      <md-layout md-flex="100">
        <h2>Vinyl Records</h2>
      </md-layout>
      <md-layout v-if="vinyles.length" md-row>
        list of vinyl records
      </md-layout>
      <md-layout v-else md-row>
        <p>No vinyl record in your collection yet, you can search for one by clicking here</p>
        <md-button class="md-raised md-primary" v-on:click="openSearch()">Search for records</md-button>
      </md-layout>
    </div>
  </page-content>
</template>

<script>
export default {
  name: 'vinyles',

  computed: {
    vinyles() {
      return this.$store.state.vinyles
    },
  },

  methods: {
    openSearch() {
      this.$store.commit('openSearch')
    }
  }
}
</script>

<style>
</style>
