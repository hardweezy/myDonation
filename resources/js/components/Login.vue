<template>
  <div class="container">
    <div class="column is-4 is-offset-4 is-vcentered">
      <h3 class="title has-text-grey">Sign in</h3>
      <p class="subtitle has-text-grey">Please sign in to proceed.</p>
      <div class="box login-screen">
        <div v-if="error" class="has-text-danger error-text">{{ errorMessage }}</div>
        <form @submit.prevent="submit($event)">
          <b-field>
            <b-input type="email"
              placeholder="Email e.g alex@doe.com" 
              v-model.trim="credentials.email" 
              autofocus="">
            </b-input>
          </b-field>
          <b-field>
            <b-input type="password"
              placeholder="Password e.g ******"
              v-model.trim="credentials.password"
              password-reveal>
            </b-input>
          </b-field>
          <button class="button is-block is-info is-default is-fullwidth">Login</button>
        </form>
      </div>
      <p class="has-text-grey  has-text-centered">
        <router-link to="/signup">Sign Up</router-link>
        &nbsp;·&nbsp;
        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/authfactory'
export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: false,
      errorMessage: ""
    }
  },

  methods: {
    submit: function (event) {
      event.preventDefault();
      if (this.credentials.email.length && this.credentials.password.length) {
        this.$store.commit('TOGGLE_ISLOADING', true);
        AuthService.login(this, this.credentials, 'home');
        return;
      }
    },
  },

  beforeCreate: function () {
    if (this.$store.state.authenticated) {
      this.$router.back();
    }
  },
}
</script>