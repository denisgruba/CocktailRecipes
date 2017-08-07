import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./views/Home')
    },
    {
        path: '/List',
        component: require('./views/List')
    }
];

export default new VueRouter({
    routes
});
