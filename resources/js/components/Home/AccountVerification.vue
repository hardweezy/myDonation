<template>
  <div class="column is-6">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Account Verification
        </p>
      </header>
      <div class="card-content">
        <div class="field is-grouped">
          <p class="control is-hidden-mobile">
            Verification Code
          </p>
          <p class="control is-expanded">
            <b-field>
              <b-input 
                placeholder="Enter Verification Code"
                v-model="token.code"></b-input>
            </b-field>
          </p>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button class="button is-primary" @click.prevent="confirmVerification($event)">
            Submit
            </button>
          </p>
          <p class="control">
            <button class="button is-light" @click.prevent="resendCode($event)">
            Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../../services/authfactory'
  export default {
    data() {
      return {
        token: {
          code: ''
        },
        error: false,
      }
    },

    methods: {
      confirmVerification: function (event) {
        event.preventDefault();
        if (this.token.code.length) {
          this.$store.commit('TOGGLE_ISLOADING', true);
          AuthService.confirmVerification(this, this.token, 'dream');
        }
      },
      
      resendCode: function (event) {
        event.preventDefault();
        this.$store.commit('TOGGLE_ISLOADING', true);
        AuthService.resendCode(this);
      }
    }
  }
</script>