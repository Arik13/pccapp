import Vue from 'vue'
import Vuex from 'vuex'
import axiosAuth from './axios-auth';
import axios from 'axios';
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apiKey: 'AIzaSyBi7Rzb_yllQQvBau7dnSLtrq3_gEmmueU',
        idToken: null,
        userId: null,
        user: null,
    },
    getters: {
        user(state) {
            console.log("user getter called");
            return state.user;
        },
        isAuthenticated(state) {
            return state.idToken !== null;
        }
    },
    mutations: {
        storeAuthData(state, authData) {
            console.log("storeAuthData mutation called");
            state.idToken = authData.idToken;
            state.userId = authData.userId;
        },
        storeUserLocal(state, user) {
            console.log("storeUser mutation called");
            state.user = user;
        },
        clearAuthData(state) {
            state.idToken = null;
            state.userId = null;
        },
        dummy() {

        },
    },
    actions: {
        storeUser({commit, state}, userData) {
            console.log("storeUser action called");
            commit('dummy');
            if (!state.idToken) {
                return;
            }
            axios.put('/users/' + state.userId + '.json' + '?auth=' + state.idToken, userData)
            .then(res => console.log(res))
            .catch(error => console.log("storeUser error: " + error))
        },
        fetchUser({commit, state}) {
            console.log("fetchUser action called");
            if (!state.idToken) {
                return;
            }
            axios.get('/users/' + state.userId + '.json'  + '?auth=' + state.idToken)
            .then(res => {
                console.log(res);
                const data = res.data;
                console.log("Fetched Data: " + data);
                commit('storeUserLocal', data);
            })
            .catch(error => console.log(error))
        },
        signup({commit, dispatch}, authData) {
            console.log("signup action called");
            axiosAuth.post('/accounts:signUp?key=AIzaSyBi7Rzb_yllQQvBau7dnSLtrq3_gEmmueU', {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true,
            })
                .then(res => {
                    console.log(res);
                    commit('storeAuthData', {
                        idToken: res.data.idToken,
                        userId: res.data.localId,
                    });
                })
                .then(() => {
                    dispatch('storeUser', authData);
                })
                .then(() => {
                    dispatch('login', authData);
                })
                .catch(error => console.log(error));
                //commit('storeUser', authData);
        },
        login({commit, dispatch}, authData) {
            console.log("login action called");
            axiosAuth.post('/accounts:signInWithPassword?key=AIzaSyBi7Rzb_yllQQvBau7dnSLtrq3_gEmmueU', {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true,
            })
                .then(res => {
                    console.log(res)
                    commit('storeAuthData', {
                        idToken: res.data.idToken,
                        userId: res.data.localId,
                    });
                })
                .then(() => {
                    console.log("dispatching fetchUser");
                    dispatch('fetchUser');
                })
                .then(() => {
                    console.log("navigating to home");
                    router.replace('/');
                })
                .catch(error => console.log(error));
        },
        logout({commit}) {
            console.log("logout action called");
            commit('clearAuthData');
            router.replace('/login');
        }
    }
});