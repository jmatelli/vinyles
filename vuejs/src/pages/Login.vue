<template>
  <page-content page-title="Vinyles - Collection">
    <div class="main-content">
      <md-card md-with-hover>
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <form novalidate>
            <md-input-container>
              <md-icon>person</md-icon>
              <label>email</label>
              <md-input v-model="email" type="email" required></md-input>
            </md-input-container>

            <md-input-container>
              <md-icon>lock</md-icon>
              <label>Password</label>
              <md-input md-has-password v-model="password" type="password" required></md-input>
            </md-input-container>
          </form>
        </md-card-content>

        <md-card-actions>
          <md-button @click="login()">Log In</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </page-content>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },

    methods: {
      login() {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        })
          .then(() => this.$router.push('/'))
      }
    }
  }
</script>
