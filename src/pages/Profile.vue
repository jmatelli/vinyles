<template>
  <page-content page-title="Profile">
    <div class="main-content" v-if="user">
      <md-card v-if="!user.emailVerified" class="success">
        <md-card-content>
          <p>You received an email asking you to verify your account, please click on the link you will find in this email.</p>
          <p>If you didn't get it, you can send a new confirmation link by clicking <a href="" @click="sendVerification()">here</a></p>
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{ user.email }}</div>
          </md-card-header-text>
          <md-card-media md-big>
            <img :src="user.avatar" alt=""/>
          </md-card-media>
        </md-card-header>
      </md-card>
    </div>
  </page-content>
</template>

<script>
  export default {
    name: 'profile',

    computed: {
      user() {
        return this.$store.state.auth.user
      },
    },

    methods: {
      sendVerification() {
        this.user.sendEmailVerification()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .main-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .md-card {
    width: 700px!important;
    margin-bottom: 20px;
  }
  .success {
    background-color: mediumseagreen!important;
    color: white!important;
  }
</style>
