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
import Footer from './components/Footer'
import Navbar from './components/Navbar'



export default {
  name: "App",
  metaInfo: {
    title: 'Vi hjälper dig hitta den perfekta bilen',
    titleTemplate: 'Bilhjälpen.se - %s',
    meta: [
      { charset: 'UTF-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0'},
      {vmid: 'description', name: 'description', content: 'Är du på jakt efter en ny bil? På Bilhjälpen kan du göra oberoende jämförelser mellan mängder av märken av modeller för att hitta en som passar just dig'},
      {name: 'robots', content: 'index,follow'} 
      
    ],
    link: [
      { rel: 'favicon', href: '/favicon.ico' },
    ]

  },
  data: () => ({
  }),
  components: {
    navbar: Navbar,
    foot: Footer
  }
};
</script>
