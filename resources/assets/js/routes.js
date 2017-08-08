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
