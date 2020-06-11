<template>
  <v-app>
    <navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <foot />
  </v-app>
</template>

<script>
import Navbar from '@/views/Navbar.vue'
import Footer from './views/Footer.vue'


export default {
  name: "App",
  data: () => ({
  }),
  components: {
    navbar: Navbar,
    foot: Footer
  }
};
</script>
