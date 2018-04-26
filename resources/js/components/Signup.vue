<template>
  <div class="container">
    <div class="column is-4 is-offset-4 is-vcentered">
      <h3 class="title has-text-grey">Create an Account</h3>
      <div class="box">
        <form @submit.prevent = "submit($event)">
          <b-field 
            :type="error.username.type" 
            :message="error.username.message">
            <b-input
              autofocus=""
              v-model="credentials.username"
              placeholder="Username e.g alex"
              required></b-input>
          </b-field>
          <b-field 
            :type="error.email.type" 
            :message="error.email.message">
            <b-input
              type="email"
              autofocus=""
              v-model="credentials.email"
              placeholder="Email e.g alex@doe.com"
              required></b-input>
          </b-field>
          <b-field>
            <b-input type="password"
              v-model="credentials.password"
              placeholder="Password e.g ******"
              password-reveal
              required>
            </b-input>
          </b-field>
          <b-field>
            <b-input 
              v-model="credentials.name"
              placeholder="Name e.g Alex Doe"
              required></b-input>
          </b-field>
          <div class="field">
            <div class="control">
              <vue-phone-input :to-front="['za', 'zw', 'ng']" code="za" :on-change="vuePhoneInputChange">
              </vue-phone-input required>
              <p class="help is-danger" v-if="error.cell.hasError">{{error.cell.message}}</p>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <b-checkbox v-model="credentials.terms">I accept the Terms of Service</b-checkbox>
            </div>
          </div>
          <button class="button is-block is-info is-default is-fullwidth" :disabled="!credentials.terms">Create New Account</button>
        </form>
      </div>
      <p class="has-text-grey  has-text-centered">
        <router-link to="/login">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/authfactory';
import $lodash from '../plugins/lodash'
export default {
  data() {
    return {
      credentials: {
        username: '',
        email: '',
        name: '',
        tel: {},
        password: '',
        terms: false
      },
      error: {
        username: {
          type: '',
          message: '',
          hasError: false,
        },
        email: {
          type: '',
          message: '',
          hasError: false,
        },
        cell: {
          type: '',
          message: '',
          hasError: false,
        },
      },
    }
  },
  methods: {
    vuePhoneInputChange: function (phoneInput) {
      this.credentials.tel = phoneInput.intlData;
      this.credentials.tel.cell = phoneInput.phoneNumber
      return this.credentials.tel;
    },

    validateEmail: $lodash.debounce(function (email) {
      if (email) {
        var check_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!check_email.test(email)) {
          this.error.email.type = "is-danger";
          this.error.email.message = "";
          this.error.email.hasError = true;
        } else {
          AuthService.validateEmail(this, this.error.email, {
            email: email
          })
        }
      }
    }, 1000),

    validateUsername: $lodash.debounce(function (username) {
      if (username) {
        var check_username = /^[A-Za-z0-9_-]{3,15}$/;
        if (!check_username.test(username)) {
          this.error.username.type = "is-danger";
          this.error.username.message = "";
          this.error.username.hasError = true;
        } else {
          AuthService.validateUsername(this, this.error.username, {
            username: username
          })
        }
      }
    }, 1000),

    validateCell: function (cell) {
      if (cell) {
        var check_cell = /^[0-9]{7,14}$/;
        if (!check_cell.test(cell)) {
          this.error.cell.type = "is-danger";
          this.error.cell.message = "invalid cellphone format";
          this.error.cell.hasError = true;
        } else {
          return Promise.resolve(AuthService.validateCell(this, this.error.cell, {
            cell: cell,
            dialCode: this.credentials.tel.dialCode
          }));
        }
      }
    },

    submit: function (event) {
      event.preventDefault();
      const $this = this;
      if (this.error.username.hasError ||
        this.error.email.hasError) {
        this.$snackbar.open({
          message: `fix erros with the form`,
          type: 'is-danger',
          positon: 'is-bottom-right',
          actionText: 'Ok',
        });
      } else if (this.error.cell.hasError &&
        (this.tempCell == this.credentials.tel.cell)) {
        this.$snackbar.open({
          message: `fix erros with the form`,
          type: 'is-danger',
          positon: 'is-bottom-right',
          actionText: 'Ok',
        });
      } else {
        var validateCell = this.validateCell(this.credentials.tel.cell);
        validateCell
          .then(function (res) {
            $this.tempCell = $this.credentials.tel.cell
            if (res.data.status_code == 400) {
              $this.error.cell.type = "is-danger";
              $this.error.cell.message = res.data.message;
              $this.error.cell.hasError = true;
            } else if (res.data.status_code == 200) {
              $this.error.cell.type = "is-success";
              $this.error.cell.message = "";
              $this.error.cell.hasError = false;
              $this.$store.commit('TOGGLE_ISLOADING', true);
              AuthService.signup($this, $this.credentials, 'home')
            }
          })
          .catch(function (err) {
            $this.$snackbar.open({
              message: `problem processing this request`,
              type: 'is-danger',
              positon: 'is-bottom-right',
              actionText: 'Retry',
            });
          })
      }
    }
  },

  beforeCreate: function () {
    if (this.$store.state.authenticated) {
      this.$router.back();
    }
  },

  watch: {
    'credentials.email': function (value) {
      if (value && value.length) {
        this.validateEmail(value)
      }
    },
    'credentials.username': function (value) {
      if (value && value.length) {
        this.validateUsername(value)
      }
    },
  }
}
</script>