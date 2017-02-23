<template>
  <md-button class="md-raised md-primary" :disabled="isDisabled" @click="action()">
    <span v-if="!isDisabled">Log In</span>
    <md-icon class="spinner" v-else>track_changes</md-icon>
  </md-button>
</template>

<script>
  export default {
    name: 'spinner-button',

    props: ['isDisabled', 'action'],
  }
</script>

<style lang="scss" scoped>
  .spinner {
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
