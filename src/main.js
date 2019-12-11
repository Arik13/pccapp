import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'https://pccdb-c1ffa.firebaseio.com/';

Vue.config.productionTip = false


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
