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
        name: 'ListBase',
        path: '/List/ByBase/:base',
        component: require('./views/ListBase')
    },
    {
        name: 'ShowSingle',
        path: '/Show/:id',
        component: require('./views/Show')
    },
];

export default new VueRouter({
    routes,
    linkActiveClass: 'active'
});
