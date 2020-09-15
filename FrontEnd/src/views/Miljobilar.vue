<template>
    <v-container>
      <h1>Miljöbilar</h1>
      <p>Här hittar du bilar som är definierade som miljöbil. En miljöbil är en bil som antingen släpper ut mindre än 70 gram koldioxid per kilometer, eller är driven av naturgas. En miljöbil är perfekt för dig som vill leva klimatsmart.</p>
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
import { api } from "@/Api.js";
import CarCard from "../components/CarCard.vue"

export default {
  name: 'Miljöbilar',
  metaInfo: {
      title: 'Miljöbilar',
      meta: [
          {vmid: 'description', name: 'description', content: 'Söker du en ny bil som är miljövänlig. Här hittar du miljöbilar från mängder av märken. Elbilar, hybrider, gasbilar och bilar med lågt koldioxidutsläpp'}
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
        .get("/category/environmental")
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