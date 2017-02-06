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
  </div>
</template>

<script>
  export default {
    name: 'album-list',

    props: ['album'],

    data() {
      return {
        isSearch: this.$route.name === 'search'
      }
    },

    methods: {
      addOwnedVinyle() {
        this.$store.commit('addOwnedVinyle', this.album)
      },

      addWishedVinyle() {
        this.$store.commit('addWishedVinyle', this.album)
      },
    },

    mounted() {
      console.log(this.$route)
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
