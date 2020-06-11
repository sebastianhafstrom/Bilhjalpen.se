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
import Footer from './views/Footer'
import Navbar from './views/Navbar'



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
