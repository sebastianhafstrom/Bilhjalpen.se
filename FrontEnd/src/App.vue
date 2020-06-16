<template>
  <v-app>
    <navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <footer />
  </v-app>
</template>

<script>
import Footer from './views/Footer'
import Navbar from './views/Navbar'



export default {
  name: "App",
  data: () => ({
  }),
  components: {
    navbar: Navbar,
    footer: Footer
  }
};
</script>
