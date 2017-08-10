window.$ = window.jQuery = require('jquery');
require('./materialize/materialize.js');

/**
* Import Vue Component and Vue router
*/

import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import router from './routes';
import VueLocalStorage from 'vue-ls';

window.Vue = Vue;
window.axios = axios;

window.favouritesID = [];
window.favouritesObjects = [];

window.url = "http://www.thecocktaildb.com/api/json/v1/1/";

// window.axios.defaults.headers.common = {
//     'X-Requested-With' : 'XMLHttpRequest'
// }

Vue.use(VueRouter);
Vue.use(VueLocalStorage, {namespace: 'vuejs__'});

/**
* Next, we will create a fresh Vue application instance and attach it to
* the page. Then, you may begin adding components to this application
* or customize the JavaScript scaffolding to fit your unique needs.
*/

Vue.component('NavigationBar', require('./components/NavigationBar.vue'));
Vue.component('DrinkCard', require('./components/DrinkCard.vue'));

const myApp = new Vue({
    el: '#app',
    router: router,
    data() {
        return {

        }
    },
    methods : {
        handleLocalStorage (){
            var favlist = Vue.ls.get('favouritesID', []);
            favouritesID = favlist;
            var favObjects = Vue.ls.get('favouritesObjects', []);
            favouritesObjects = favObjects;
        }
    },
    created() {
        this.handleLocalStorage ();
    }
});
