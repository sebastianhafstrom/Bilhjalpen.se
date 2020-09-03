<template>
  <div>

    <v-row
      style="height: 50vw; min-height: 300px; max-height:800px;"
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
      <template v-for="(item, i) in items">
        <v-col
          :key="i"
          cols="12"
          sm="6"
          md="4"
        >
          <v-hover v-slot:default="{ hover }">
            <router-link :to="item.link">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              :color="item.color"
            >
                <v-card-title class="title white--text align-self-center">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-center">{{ item.title }}</p>

                    <div>
                      <p class="ma-0 body-1 text-center">
                        {{ item.text }}
                      </p>
                    </div>
                  </v-row>
                </v-card-title>
            </v-card>
            </router-link>
          </v-hover>
        </v-col>
      </template>
    </v-row>
    </v-container>
  </div>
</template>

<script>
//import { api } from "@/Api.js";

export default {
  name: "Home",

  data: () => ({
    icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
      items: [
        {
          title: 'För den miljövänliga',
          text: "Miljövänliga hybridbilar, elbilar och gasbilar",
          color: 'green',
          link: '/'
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
      ],
      transparent: 'rgba(255, 255, 255, 0)',
  }),
  created() {

  },
  methods: {

  },
};
</script>
<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
 }

 a {  text-decoration: none;}
</style>
