<template>
  <page-content page-title="Verify Email" v-if="errActionCode">
    <div class="main-content">
      <md-card class="md-warn">
        <md-card-content>
          {{errActionCode}}
        </md-card-content>
      </md-card>
    </div>
  </page-content>
</template>

<script>
  export default {
    name: 'verify-email',

    data() {
      return {
        errActionCode: ''
      }
    },

    mounted() {
      this.$store.dispatch('verifyEmail')
        .then(res => {
        })
        .catch(err => {
          if (err.code === 'auth/invalid-action-code') {
            this.errActionCode = err.message
          }
        })
    }
  }
</script>

<style lang="scss" scoped>
  .main-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>
