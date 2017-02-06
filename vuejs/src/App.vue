<template>
  <div id="app">
    <md-sidenav class="main-sidebar md-left md-fixed">
      <md-toolbar class="vue-material-logo" md-theme="white">
        <router-link exact to="/">
          <img src="../assets/logo.png" alt="Vue">
          <span>Vinyles</span>
        </router-link>
      </md-toolbar>
      <div class="main-sidebar-links">
        <md-list>
          <md-list-item>
            <router-link to="/vinyl-collection"><md-icon>album</md-icon><span>Vinyl Collection</span></router-link>
          </md-list-item>
          <md-list-item>
            <router-link to="/wishlist"><md-icon>list</md-icon><span>Wishlist</span></router-link>
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
}
</script>

<style lang="scss">
  @import '../node_modules/vue-material/src/core/stylesheets/variables.scss';
  $sizebar-size: 280px;
  [v-cloak] {
    display: none;
  }
  html,
  body {
    height: 100%;
    overflow: hidden;
  }
  body {
    display: flex;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    transition: $swift-ease-out;
    @media (min-width: 1281px) {
      padding-left: $sizebar-size;
    }
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
      width: 160px;
      margin-bottom: 16px;
    }
  }
  .main-sidebar.md-sidenav {
    .md-sidenav-content {
      width: $sizebar-size;
      display: flex;
      flex-flow: column;
      overflow: hidden;
      @media (min-width: 1281px) {
        top: 0;
        pointer-events: auto;
        transform: translate3d(0, 0, 0);
        box-shadow: $material-shadow-2dp;
      }
    }
    .md-backdrop {
      @media (min-width: 1281px) {
        opacity: 0;
        pointer-events: none;
      }
    }
    .md-toolbar {
      min-height: 250px;
      border-bottom: 1px solid rgba(#000, .12);
    }
    .main-sidebar-links {
      overflow: auto;
      flex: 1;
      .md-inset .md-list-item-container {
        padding-left: 36px;
      }
      .md-list-item-container {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
  .main-content {
    padding: 16px;
    flex: 1;
    overflow: auto;
    background-color: #fff;
    transform: translate3D(0, 0, 0);
    transition: $swift-ease-out;
    transition-delay: .2s;
  }
  .md-router-enter,
  .md-router-leave {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    @media (min-width: 1281px) {
      left: $sizebar-size;
    }
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
  .phone-viewport {
    width: 360px;
    height: 540px;
    margin-right: 16px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid rgba(#000, .12);
  }
</style>

<style>
</style>
