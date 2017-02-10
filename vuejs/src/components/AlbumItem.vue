<template>
  <div class=card-holder>
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ album.title }}</div>
          <div class="md-subhead">{{ album.year }}</div>
        </md-card-header-text>
      </md-card-header>

      <md-card-actions v-if="isSearch">
        <md-button v-on:click="addOwnedVinyle">Add to collection</md-button>
        <md-button v-on:click="addWishedVinyle">Add to wishlist</md-button>
      </md-card-actions>
    </md-card>

    <md-snackbar ref="snackbar">
      <span>{{ snackbarMessage  }}</span>
      <md-button class="md-accent" md-theme="light-blue" @click="undo()">Undo</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'album-list',

    props: ['album'],

    data() {
      return {
        isSearch: this.$route.name === 'search',
        snackbarMessage: ''
      }
    },

    methods: {
      addOwnedVinyle() {
        this.snackbarMessage = 'Record added to collection'
        this.$refs.snackbar.open()
        return
        this.$store.commit('addOwnedVinyle', this.album)
      },

      addWishedVinyle() {
        this.snackbarMessage = 'Record added to wishlist'
        this.$refs.snackbar.open()
        return
        this.$store.commit('addWishedVinyle', this.album)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .card-holder {
    display: inline-block;
    vertical-align: top;
    width: 100%;

    .md-card {
      margin: 0 4px 16px;
    }
  }
</style>
