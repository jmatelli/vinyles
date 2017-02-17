<template>
  <page-content page-title="Vinyles - Sign Up">
    <div class="main-content center-content">
      <md-card>
        <md-card-header>
          <div class="md-title">Sign up</div>
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

            <md-input-container :class="{ 'md-input-invalid': errConfirm }" md-has-password>
              <md-icon>lock</md-icon>
              <label>Confirm password</label>
              <md-input md-has-password v-model="confirmPassword" type="password" required></md-input>
              <span class="md-error">{{ errConfirm }}</span>
            </md-input-container>
          </form>
        </md-card-content>

        <md-card-actions>
          <md-button @click="signup()">Sign up</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </page-content>
</template>

<script>
  export default {
    name: 'signup',

    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        errEmail: '',
        errPassword: '',
        errConfirm: '',
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

      confirmPassword() {
        if (this.confirmPassword) {
          this.errConfirm = ''
        }
      },
    },

    methods: {
      signup() {
        if (this.password !== this.confirmPassword) {
          this.errConfirm = `The passwords don't match`
          return
        } else {
          this.errConfirm = ''
          if (this.password && this.confirmPassword) {
            this.$store.dispatch('signup', {
              email: this.email,
              password: this.password
            })
              .catch(err => {
                if (err.code === 'auth/invalid-email' || err.code === 'auth/email-already-in-use') {
                  this.errEmail = err.message
                }
                if (err.code === 'auth/weak-password') {
                  this.errPassword = err.message
                }
              })
          }
        }
      },
    }
  }
</script>
