<template>
  <v-app>
    <!--  -->
    <v-app-bar
      app
      dark
    >
      <v-app-bar-nav-icon v-if="loggedIn"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Pathfinder Character Creator</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="loggedIn" @click="onLogout()">Logout</v-btn>
    </v-app-bar>

    <!--  -->
    <v-content>
      <v-container fluid>
        <router-view v-if="isCompleted"></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import store from './store';

export default {
  name: 'App',

  data() {
    return {
      isCompleted: false,
    }
  },
  computed: {
    loggedIn() {
      return store.getters.isAuthenticated;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
    },
    completed() {
      // console.log();
      this.isCompleted = true;
    }
  },
  created() {
    console.log('App created');
    console.log('Attempting auto login');
    store.dispatch('tryAutoLogin', this.completed);
  }
};
</script>