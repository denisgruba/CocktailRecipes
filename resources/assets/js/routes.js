import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./views/Home')
    },
    {
        name: 'List',
        path: '/List',
        component: require('./views/List')
    },
    {
        name: 'ListFiltered',
        path: '/List/:base',
        component: require('./views/List')
    }
];

export default new VueRouter({
    routes,
    linkActiveClass: 'active'
});
