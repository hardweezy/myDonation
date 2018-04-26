require('./bootstrap');

import Vue from 'vue';
import store from './config/store';
import VueRouter from 'vue-router';
import PersistedStorage from './plugins/storage';
import Buefy from 'buefy';
import VuePhoneInput from '../scripts/vue-plugins/vue-phone-input/src';

Vue.use(Buefy);
Vue.use(VueRouter);
Vue.use(PersistedStorage);
Vue.use(require('vue-moment'));
var moment = require('moment');


Vue.component('vue-phone-input', VuePhoneInput);




import App from './components/App.vue';
import AuthService from './services/authfactory'
import routes from './route';


const router = new VueRouter({
  routes 
});


const app = new Vue({
  el: '#app',
  router,
  store,
  render: app => app(App)
});


export const EventBus = new Vue();