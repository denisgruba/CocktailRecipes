/**
 * Required to support IE11
 */
require('es6-promise').polyfill();
require('./includes'); //recreates ES6 includes function for IE11
/**
* Import jQuery and Materialize.js Framework. Only used for materialize.
*/

window.$ = window.jQuery = require('jquery');
require('./materialize/materialize.js');

/**
* Import Vue Component and Vue router.
* Vuex is adding cross-component interactions and variable exchange.
* Axios supports Ajax requests with Vue.
* Local Storage for Vue uses HTML5 Local Storage to keep the Liked objects. Together with Vuex, they are used to dynamically store the data upon interaction.
*/

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueRouter from 'vue-router';
import router from './routes';
import VueLocalStorage from 'vue-ls';

/**
* Assign Vue and Axios to window.
* Assign API url for easy access.
*/
window.Vue = Vue;
window.axios = axios;

window.url = "http://www.thecocktaildb.com/api/json/v1/1/";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueLocalStorage, {namespace: 'ocasta__'});

/**
* Register additional components to vue object.
*/

Vue.component('NavigationBar', require('./components/NavigationBar.vue'));
Vue.component('DrinkCard', require('./components/DrinkCard.vue'));


/**
 * Vuex is used to allow cross-component communication.
 * I Initialize the data with data saved from Local Storage, or if it's not found, assing default value.
 * When mutations are triggered from other component, I update both store and Local Storage values.
 */
const store = new Vuex.Store({
    state: {
        hideThumbs: Vue.ls.get('hideThumbs', false),
        favouritesID: Vue.ls.get('favouritesID', []),
        favouritesObjects:  Vue.ls.get('favouritesObjects', []),
    },
    mutations: {
        toggleThumbs (state) {
            // Change hideThumbs value to it's opposite
            state.hideThumbs = !state.hideThumbs;
            Vue.ls.set('hideThumbs', state.hideThumbs);
        },
        addFavourite (state, object){
            // Updates and saves favourites
            state.favouritesID.push(object.idDrink);
            state.favouritesObjects.push(object);
            Vue.ls.set('favouritesID', state.favouritesID);
            Vue.ls.set('favouritesObjects', state.favouritesObjects);
        },
        removeFavourite (state, object) {
            // Removes favourite from the list that matches passed object
            state.favouritesID.splice( state.favouritesID.indexOf(object.idDrink), 1 ); // Remove the index that matches object's id
            state.favouritesObjects = state.favouritesObjects.filter( function(el) {
                // Keep all the objects in the array with the exception of the passed object
                if(el.idDrink !== object.idDrink){
                    return true
                } else return false;
            });
            Vue.ls.set('favouritesID', state.favouritesID);
            Vue.ls.set('favouritesObjects', state.favouritesObjects);
        },
    }
});
window.store = store;

/**
* Initialize Vue Instance.
*/
const myApp = new Vue({
    el: '#app',
    router: router,
});
