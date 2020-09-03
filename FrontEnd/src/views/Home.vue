<template>
  <div>
    <v-row
      style="height: 50vw; min-height: 300px; max-height:600px;"
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
        <h1 class="display-3 font-weight-thin mb-4">Bilhjälpen.se</h1>
        <p class="subheading">Låt oss hjälpa dig hitta din nya bil</p>
        <v-btn color="primary" class=" white--text mt-8" to="/bilar" tile>Visa alla bilar</v-btn>
      </v-col>
    </v-row>
    <v-parallax height="100" src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
    </v-parallax>

    <v-container>
      <h2 class="text-center headline my-6">De populäraste kategorierna</h2>    
      <v-row class="fill-height" align="center" justify="center">
        <CategoryButton
          v-for="(item, index) in items"
          v-bind:item="item"
          v-bind:key="index" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
//import { api } from "@/Api.js";
import CategoryButton from './CategoryButton.vue'

export default {
  name: "Home",
  components: {
    CategoryButton
  },

  data: () => ({
      items: [
        {
          title: 'För den miljövänliga',
          text: "Miljövänliga hybridbilar, elbilar och gasbilar",
          color: 'green',
          link: '/om'
        },
        {
          title: 'För den riktigt miljövänliga',
          text: 'Endast de renaste elbilarna',
          color: 'red',
          link: '/'
        },
        {
          title: 'För den som gillar att ta plats och synas',
          text: 'Stora SUVar',
          color: 'pink',
          link: '/'
        },
        {
          title: 'För den stora familjen',
          text: 'Bilar med extra plats för det viktigaste i livet',
          color: 'purple',
          link: '/'
        },
        {
          title: 'För den fartglade',
          text: 'När utrymme och bensinåtgång inte är prio',
          color: 'deep-purple',
          link: '/'
        },
        {
          title: 'För den lilla familjen',
          text: 'Liten och smidig, men plats för allt',
          color: 'indigo',
          link: '/'
        },
      ]
  }),
  created() {

  },
  methods: {

  },
};
</script>
<style scoped>

</style>
