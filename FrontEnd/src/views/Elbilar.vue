<template>
  <v-container>
      <h1>Elbilar</h1>
      <v-row v-if="loading === false">
      <CarCard
          v-for="(model, index) in models"
          v-bind:model="model"
          v-bind:key="index" />
    </v-row>
    <div class="text-center" v-else>
      <p>Laddar bilar...</p>
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
      
    </div>
  </v-container>
</template>

<script>
import { api } from "../Api.js";
import CarCard from "../components/CarCard.vue"

export default {
  name: 'Elbilar',
  metaInfo: {
      title: 'Elbilar',
      meta: [
          {vmid: 'description', name: 'description', content: 'För dig som vill vara riktigt miljövnälig hittar du här elbilar från mängder av olika bilar. Hitta en som passar just dig'}
      ],
      link: [
            { rel: 'canonical', href: 'kategori/el'}
        ]
  },
  components: {
    CarCard
  },
  data: () => ({
    loading: true,
    models: []
  }),
  created() {
    this.getModels()
  },
  methods: {
    getModels() {
      api
        .get("/category/electric")
        .then((response) => {
          this.models = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => this.loading = false)
    }
  }

}
</script>

<style>

</style>