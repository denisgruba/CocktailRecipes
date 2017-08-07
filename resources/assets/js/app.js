/**
 * Import Vue Component and Vue router
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './routes';

Vue.use(VueRouter);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


Vue.component('test', require('./components/Test.vue'));
Vue.component('NavigationBar', require('./components/NavigationBar.vue'));

new Vue({
    el: '#app',
    router: router,

});
