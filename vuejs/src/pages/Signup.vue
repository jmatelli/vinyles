<template>
  <page-content page-title="Vinyles - Sign Up">
    <div class="main-content center-content">
      <md-card md-with-hover>
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

            <md-input-container md-has-password>
              <md-icon>lock</md-icon>
              <label>Password</label>
              <md-input md-has-password v-model="password" type="password" required></md-input>
            </md-input-container>

            <md-input-container md-has-password>
              <md-icon>lock</md-icon>
              <label>Confirm password</label>
              <md-input md-has-password v-model="confirmPassword" type="password" required></md-input>
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
      }
    },

    methods: {
      signup() {
        if (this.email && this.password && this.confirmPassword && this.password === this.confirmPassword) {
          this.$store.dispatch('signup', {
            email: this.email,
            password: this.password
          })
            .then(() => this.$router.push('/'))
        }
      },
    }
  }
</script>
