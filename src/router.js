import VueRouter from 'vue-router';
import Vue from 'vue';
import store from './store';
import Home from './components/Home';
import LoginView from './components/LoginView';

Vue.use(VueRouter);

function requireAuth(to, from, next) {
    if (store.state.idToken) {
        next();
    }
    else {
        next('/login');
    }
}

var routes = [
    {path: '', components: {default: Home}, beforeEnter: requireAuth},
    {path: '/login', components: {default: LoginView}}
];

export default new VueRouter({
    routes,
});