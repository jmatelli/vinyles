<template>
  <div id="app">
    <md-sidenav class="main-sidebar md-left md-fixed">
      <md-toolbar class="vue-material-logo" md-theme="white">
        <router-link exact to="/">
          <img src="vinyles/dist/logo.png" alt="Vue">
        </router-link>
      </md-toolbar>
      <div class="main-sidebar-links">
        <md-list>
          <md-list-item v-if="isLoggedIn">
            <router-link to="/vinyl-collection">
              <md-icon>album</md-icon>
              <md-tooltip md-direction="right">Vinyl Collection</md-tooltip>
            </router-link>
          </md-list-item>

          <md-list-item v-if="isLoggedIn">
            <router-link to="/wishlist">
              <md-icon>list</md-icon>
              <md-tooltip md-direction="right">Wishlist</md-tooltip>
            </router-link>
          </md-list-item>

          <md-list-item v-if="isLoggedIn">
            <router-link to="/logout">
              <md-icon>power_settings_new</md-icon>
              <md-tooltip md-direction="right">Log out</md-tooltip>
            </router-link>
          </md-list-item>

          <md-list-item v-if="!isLoggedIn">
            <router-link to="/login">
              <md-icon>exit_to_app</md-icon>
              <md-tooltip md-direction="right">Log in</md-tooltip>
            </router-link>
          </md-list-item>

          <md-list-item v-if="!isLoggedIn">
            <router-link to="/signup">
              <md-icon>person_add</md-icon>
              <md-tooltip md-direction="right">Sign up</md-tooltip>
            </router-link>
          </md-list-item>
        </md-list>
      </div>
    </md-sidenav>
    <transition name="md-router" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<style lang="scss">
  @import '../node_modules/vue-material/src/core/stylesheets/variables.scss';
  [v-cloak] {
    display: none;
  }
  html,
  body {
    height: 100%;
    overflow: hidden;
  }
  body {
    background-color: #f0f0f0!important;
    display: flex;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #353535;
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    transition: $swift-ease-out;
    padding-left: 64px;
  }
  .vue-material-logo {
    font-size: 24px;
    a {
      width: 100%;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      color: #353535 !important;
      text-decoration: none !important;
      &:hover {
        color: inherit;
        text-decoration: nonei !important;
      }
    }
    img {
      width: 32px;
    }
  }
  .main-sidebar.md-sidenav {
    .md-sidenav-content {
      background-color: #353535!important;
      color: white!important;
      width: 64px;
      display: flex;
      flex-flow: column;
      overflow: hidden;
      top: 0;
      pointer-events: auto;
      transform: translate3d(0, 0, 0);
    }
    .md-toolbar {
      min-height: 64px;
      border-bottom: 1px solid rgba(#000, .12);
    }
    .main-sidebar-links {
      overflow: auto;
      flex: 1;
      .md-list {
        padding: 0!important;
      }
      .md-button {
        min-width: initial;
        text-align: center;
      }
      .md-icon {
        margin: 0!important;
        color: white;
      }
      .md-list-item-container {
        padding: 0 15px!important;
        background-color: #353535!important;
        color: white!important;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
  .main-content {
    padding: 16px;
    flex: 1;
    overflow: auto;
    transform: translate3D(0, 0, 0);
    transition: $swift-ease-out;
    transition-delay: .2s;
    &.center-content {
      display: flex;
      justify-content: center;
      align-items: center;
      .md-card {
        width: 500px;
      }
    }
  }
  .md-router-enter,
  .md-router-leave {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    left: 64px;
    .main-content {
      opacity: 0;
      overflow: hidden;
    }
  }
  .md-router-leave {
    z-index: 1;
    transition: $swift-ease-in;
    transition-duration: .25s;
  }
  .md-router-enter {
    z-index: 2;
    transition: $swift-ease-out;
    .main-content {
      transform: translate3D(0, 10%, 0);
    }
  }
</style>
