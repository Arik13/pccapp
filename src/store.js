import Vue from 'vue';
import Vuex from 'vuex';
import axiosAuth from './axios-auth';
import axios from 'axios';
import router from './router';
import {apiKey} from './apiKey';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
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
            console.log(authData);
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
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('userId');
        },
    },
    actions: {
        setLogoutTimer({dispatch}, expirationTime) {
            console.log("Setting timeout for: ");
            console.log(expirationTime * 1000);
            setTimeout(() => {
                dispatch('logout');
            }, expirationTime * 1000);
        },
        storeUser({state}, userData) {
            console.log("storeUser action called");
            if (!state.idToken) {
                return;
            }
            axios.put('/users/' + state.userId + '.json' + '?auth=' + state.idToken, userData)
            .then(res => console.log(res))
            .catch(error => console.log("storeUser error: " + error))
        },
        fetchUser({commit, state}) {
            return new Promise((resolve, reject) => {
                console.log("fetchUser action called");
                if (!state.idToken) {
                    return;
                }
                console.log('fetching user from: ' + '/users/' + state.userId + '.json'  + '?auth=' + state.idToken);
                axios.get('/users/' + state.userId + '.json'  + '?auth=' + state.idToken)
                .then(res => {
                    console.log(res);
                    const data = res.data;
                    console.log("Fetched Data: " + data);
                    commit('storeUserLocal', data);
                    console.log("fetchUser action completed");
                    resolve();
                })
                .catch(error => {
                    console.log("fetchUser action rejected");
                    console.log(error)
                    reject();
                });
            });
        },
        signup({commit, dispatch}, authData) {
            console.log("signup action called");
            axiosAuth.post('/accounts:signUp?key=' + apiKey, {
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
                    dispatch('storeUser', {
                        email: authData.email,
                        screenName: authData.screenName,
                    });
                    dispatch('login', authData);
                })
                .catch(error => console.log(error));
        },
        login({commit, dispatch}, authData) {
            console.log("login action called");
            axiosAuth.post('/accounts:signInWithPassword?key=' + apiKey, {
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
                    console.log("dispatching fetchUser");
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
                    localStorage.setItem('token', res.data.idToken);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', res.data.localId);
                    dispatch('setLogoutTimer', res.data.expiresIn);
                    dispatch('fetchUser')
                        .then(() => {
                            dispatch('routeTo', {path: "/"}
                        )});
                })
                .catch(error => console.log(error));
        },
        tryAutoLogin({commit, dispatch}, completed) {
            const token = localStorage.getItem('token');
            if (!token) {
                completed();
                return;
            }
            console.log('valid token found');
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const now = new Date();
            if (now >= expirationDate) {
                console.log('Token expired on' + expirationDate);
                completed();
                return;
            }
            console.log('Token expires on: ' + expirationDate);
            const userId = localStorage.getItem('userId');
            commit('storeAuthData', {
                idToken: token,
                userId: userId,
            });
            dispatch('setLogoutTimer', (expirationDate.getTime() - now.getTime())/1000);
            dispatch('fetchUser')
                .then(() => {
                    dispatch('routeTo', {path: "/"});
                    completed();
            });
        },
        logout({commit, dispatch}) {
            console.log("logout action called");
            commit('clearAuthData');
            dispatch('routeTo', {path: "/login"});
        },

        // eslint-disable-next-line
        routeTo({commit}, payload) {
            console.log(payload.path);
            console.log("navigating to " + payload.path);
            router.replace(payload.path);
        }
    }
});