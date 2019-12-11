<template>
  <v-app>
    <!--  -->
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Pathfinder Character Creator</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="loggedIn" @click="onLogout()">Logout</v-btn>
    </v-app-bar>

    <!--  -->
    <v-content>
      <v-container>
        <router-view></router-view>
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
    }
  }
};
</script>