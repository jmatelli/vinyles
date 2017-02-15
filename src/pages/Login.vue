<template>
  <page-content page-title="Vinyles - Log In">
    <div class="main-content center-content">
      <md-card md-with-hover>
        <md-card-header>
          <div class="md-title">Log in</div>
        </md-card-header>

        <md-card-content>
          <form novalidate>
            <md-input-container :class="{ 'md-input-invalid': errEmail }">
              <md-icon>person</md-icon>
              <label>email</label>
              <md-input v-model="email" type="email" required></md-input>
              <span class="md-error">{{ errEmail }}</span>
            </md-input-container>

            <md-input-container md-has-password>
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
        errEmail: '',
        errPassword: '',
      }
    },

    methods: {
      login() {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        })
          .then(() => this.$router.push('/'))
          .catch(err => {
            if (err.code === 'auth/invalid-email') {
            console.log(err.code)
              this.errEmail = err.message
            }
            if (err.code === 'auth/wrong-password') {
              this.errorPassword = err.message
            }
          })
      }
    }
  }
</script>
