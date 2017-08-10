import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./views/Home')
    },
    {
        name: 'List',
        path: '/List',
        component: require('./views/ListAlphabet')
    },
    {
        name: 'ListAlphabet',
        path: '/List/ByAlphabet/:letter',
        component: require('./views/ListAlphabet')
    },
    {
        name: 'Search',
        path: '/Search',
        component: require('./views/Search')
    },
    {
        name: 'ListBase',
        path: '/List/ByBase/:base',
        component: require('./views/ListBase')
    },
    {
        name: 'ListIngredient',
        path: '/List/ByIngredient',
        component: require('./views/ListIngredients')
    },
    {
        name: 'ListIngredientSelected',
        path: '/List/ByIngredient/:ingredient',
        component: require('./views/ListIngredients')
    },
    {
        name: 'ListFavorites',
        path: '/List/Favorites',
        component: require('./views/ListFavorites')
    },
    {
        name: 'ShowSingle',
        path: '/Show/:id',
        component: require('./views/Show')
    },
];

export default new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior (to, from, savedPosition) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
});
