import VueRouter from 'vue-router';
import Vue from 'vue';
import store from './store';
import Home from './components/Home';
import Gate from './components/Gate';

Vue.use(VueRouter);

var routes = [
    {path: '', components: {default: Home},
        beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next();
            }
            else {
                next('/login');
            }
        }
    },
    {path: '/login', components: {default: Gate}}
];

export default new VueRouter({
    routes,
  });