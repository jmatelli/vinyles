<template>
  <page-content page-title="Log In">
    <div class="main-content center-content">
      <md-card>
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

            <md-input-container :class="{ 'md-input-invalid': errPassword }" md-has-password>
              <md-icon>lock</md-icon>
              <label>Password</label>
              <md-input md-has-password v-model="password" type="password" required></md-input>
              <span class="md-error">{{ errPassword }}</span>
            </md-input-container>
          </form>
        </md-card-content>

        <md-card-actions>
          <spinner-button :is-disabled="loggingIn" :action="login"></spinner-button>
        </md-card-actions>
      </md-card>
    </div>
  </page-content>
</template>

<script>
  import SpinnerButton from '../components/SpinnerButton.vue'

  export default {
    name: 'login',

    components: {
      SpinnerButton,
    },

    data() {
      return {
        email: '',
        password: '',
        errEmail: '',
        errPassword: '',
        loggingIn: false,
      }
    },

    watch: {
      email() {
        if (this.email) {
          this.errEmail = ''
        }
      },

      password() {
        if (this.password) {
          this.errPassword = ''
        }
      },
    },

    methods: {
      login() {
        if (this.loggingIn) {
          return
        }
        this.loggingIn = true
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        })
          .then(() => {
            this.loggingIn = false
            this.$router.push('/')
          })
          .catch(err => {
            this.loggingIn = false
            if (err.code === 'auth/invalid-email') {
              this.errEmail = err.message
            }
            if (err.code === 'auth/wrong-password') {
              this.errPassword = err.message
            }
          })
      }
    }
  }
</script>
