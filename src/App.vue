<template>
  <v-app>
    <navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './views/Navbar.vue'

export default {
  name: "App",
  data: () => ({
  }),
  components: {
    navbar: Navbar
  }
};
</script>
