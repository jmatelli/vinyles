<template>
  <div class="page-content">
    <div v-if="!isSearching">
      <md-theme md-name="default">
        <md-whiteframe md-tag="md-toolbar" md-elevation="2">
          <h2 class="md-title" style="flex: 1">{{ pageTitle }}</h2>

          <md-button class="md-icon-button"i v-on:click="openSearch()">
            <md-icon>search</md-icon>
          </md-button>
        </md-whiteframe>
      </md-theme>
    </div>

    <div class="search-navbar" v-else>
      <md-theme md-name="white">
        <md-whiteframe md-tag="md-toolbar" md-elevation="2">
          <md-button class="md-icon-button" v-on:click="closeSearch()">
            <md-icon>arrow_back</md-icon>
          </md-button>

          <md-input-container md-inline style="flex: 1">
            <md-input v-focus v-model="searchRequest" placeholder="Search..." type="search"></md-input>
          </md-input-container>

          <md-button class="md-icon-button" v-on:click="clearSearch()">
            <md-icon>close</md-icon>
          </md-button>
        </md-whiteframe>
      </md-theme>
    </div>

    <slot></slot>
  </div>
</template>

<script>
  import _ from 'lodash'
  import resource from '../resource'
  import { API_TOKEN, requestBuilder } from '../config.js'

  export default {
    name: 'page-content',

    props: {
      pageTitle: String,
    },

    data() {
      return {
        searchRequest: '',
        searchResult: [],
      }
    },

    watch: {
      searchRequest() {
        this.searchVinyles()
      }
    },

    computed: {
      isSearching() {
        return this.$store.state.isSearching
      }
    },

    methods: {
      openSearch() {
        this.$store.commit('openSearch')
      },

      closeSearch() {
        this.$store.commit('closeSearch')
      },

      clearSearch() {
        this.searchRequest = ''
      },

      searchVinyles: _.debounce(function() {
        if (this.searchRequest !== '') {
          resource
            .get(requestBuilder('/database/search?query=' + this.searchRequest))
            .then(res => {
              this.searchResult = res.data.results
            })
            .catch(err => {
              throw new Error('Couldn\'t find what you\'re looking for')
            })
        }
      }, 500),
    },

    directives: {
      focus: {
        inserted(el) {
          el.focus()
        }
      }
    }
  }
</script>

<style scoped>
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
input[type="search"]::-webkit-input-placeholder {
  color: white;
}
input[type="search"] {
  border: none;
  box-shadow: none;
  min-height: 40px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0 20px;
}
.md-input-container {
  padding: 0;
  margin: 0;
  border: none;
  box-shadow: none;
  min-height: initial;
}
.md-input-container::after {
  height: 0;
}
.page-content {
  min-height: 100%;
  max-height: 100%;
  flex: 1;
  display: flex;
  flex-flow: column
}
.search-navbar {
  background: #353535;
  color: white;
}
.main-header {
  z-index: 2;
  color: #fff !important;
}
</style>
