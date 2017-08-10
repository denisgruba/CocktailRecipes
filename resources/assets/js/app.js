/**
 * Import jQuery and Materialize.js Framework. Only used for materialize.
 */

window.$ = window.jQuery = require('jquery');
require('./materialize/materialize.js');

/**
* Import Vue Component and Vue router.
* Axios supports Ajax requests with Vue.
* Local Storage for Vue uses HTML5 Local Storage to keep the Liked objects.
*/

import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import router from './routes';
import VueLocalStorage from 'vue-ls';

/**
 * Assign Vue and Axios to window.
 * Assign Favourites to Window to make it easier to catch variable between pages.
 * Assign API url for easy access.
 */
window.Vue = Vue;
window.axios = axios;

window.favouritesID = [];
window.favouritesObjects = [];

window.url = "http://www.thecocktaildb.com/api/json/v1/1/";

Vue.use(VueRouter);
Vue.use(VueLocalStorage, {namespace: 'vuejs__'});

/**
* Register additional components to vue object.
*/

Vue.component('NavigationBar', require('./components/NavigationBar.vue'));
Vue.component('DrinkCard', require('./components/DrinkCard.vue'));

/**
 * Initialize Vue Instance, catch Favourites from Local Storage.
 */
const myApp = new Vue({
    el: '#app',
    router: router,
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
