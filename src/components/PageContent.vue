<template>
  <div class="page-content">
    <div>
      <md-theme md-name="default">
        <md-whiteframe md-tag="md-toolbar" md-elevation="0">
          <h2 class="md-title" style="flex: 1">{{ pageTitle }}</h2>

          <md-menu v-if="isLoggedIn" md-align-trigger md-direction="bottom left" ref="menu">
            <md-avatar md-menu-trigger>
              <img :src="user.avatar" alt=""/>
            </md-avatar>

            <md-menu-content>
              <md-menu-item @selected="goToProfile()">Profile</md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-whiteframe>
      </md-theme>
    </div>

    <div class="search-navbar" v-if="isLoggedIn && user.emailVerified">
      <md-theme md-name="white">
        <md-whiteframe md-tag="md-toolbar" md-elevation="2">
          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>

          <md-input-container md-inline style="flex: 1">
            <input v-model="searchRequest" placeholder="Search a record..." type="search">
          </md-input-container>

          <md-button class="md-icon-button" @click="clearSearch()">
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
  import gravatar from '../utils/avatar'

  export default {
    name: 'page-content',

    props: {
      pageTitle: String,
    },

    data() {
      return {
        searchRequest: '',
      }
    },

    watch: {
      searchRequest() {
        this.searchVinyles()
      }
    },

    computed: {
      isLoggedIn() {
        return this.$store.state.auth.isLoggedIn
      },

      user() {
        return this.$store.getters.user
      }
    },

    methods: {
      goToProfile() {
        this.$router.push('profile')
      },

      clearSearch() {
        this.searchRequest = ''
      },

      searchVinyles: _.debounce(function() {
        if (this.searchRequest !== '') {
          resource
            .get(requestBuilder('/database/search?type=release&format=vinyl&release_title=' + this.searchRequest))
            .then(res => {
              this.$store.state.search.results = res.data.results
            })
            .catch(err => {
              throw new Error('Couldn\'t find what you\'re looking for')
            })
        } else {
          this.$store.state.search.results = []
        }
      }, 500),
    },
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
    color: #353535;
    font-size: 1em;
  }
  input[type="search"] {
    border: none;
    box-shadow: none;
    min-height: 40px;
    border-radius: 3px;
    color: black;
    padding: 0 20px;
    font-size: 1.5em;
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
    color: #353535;
  }
  .main-header {
    z-index: 2;
    color: #fff !important;
  }
  .md-avatar {
    cursor: pointer;
  }
</style>
