window.$ = window.jQuery = require('jquery');
require('./materialize/materialize.js');

/**
* Import Vue Component and Vue router
*/

import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import router from './routes';

window.Vue = Vue;
window.axios = axios;

window.favouritesID = [];

window.url = "http://www.thecocktaildb.com/api/json/v1/1/";

// window.axios.defaults.headers.common = {
//     'X-Requested-With' : 'XMLHttpRequest'
// }

Vue.use(VueRouter);

/**
* Next, we will create a fresh Vue application instance and attach it to
* the page. Then, you may begin adding components to this application
* or customize the JavaScript scaffolding to fit your unique needs.
*/


// Vue.component('test', require('./components/Test.vue'));
Vue.component('NavigationBar', require('./components/NavigationBar.vue'));
Vue.component('DrinkCard', require('./components/DrinkCard.vue'));

const myApp = new Vue({
    el: '#app',
    router: router,
    data() {
        return {

        }
    }
});
