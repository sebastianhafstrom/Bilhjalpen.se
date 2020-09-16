<template>
   <div>
      <h1>{{brandName}}</h1>
      <h2> Grundat {{brandYear}} i {{brandPlace}}</h2>
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
  </div>
</template>

<script>
import { api } from "@/Api.js"
import CarCard from "../components/CarCard.vue"

export default {
   name: 'Märkessidan',
   components: {
      CarCard,
   },
   metaInfo () {
      return {
        title: this.brandName,
        meta: [
          {vmid: 'description', name: 'description', content: 'Här har vi samlat alla nya bilar som säljs av ' + this.brandName + '. Perfekt för dig som vet vilket bilmärke du gillar och vill hitta den perfekta bilen' }
        ]
      }
    },
   data: () => ({
      brandName: '',
      brandYear: '',
      brandPlace: '',
      models: [],
      loading: true
   }),
   created() {
      this.brandName = this.$route.params.brand
      this.getBrandInfo()
   },
   methods: {
      getBrandInfo() {
         api.get(`/brands/${this.brandName}`)
            .then(response => {
               this.brandYear = response.data.brandYear
               this.brandPlace = response.data.origin
               this.getBrandModels()
            })
            .catch(error => {
               console.log(error)
            })
            .finally(() => this.loading = false)
      },
      getBrandModels() {
         api.get(`/specs/${this.brandName}/models`)
            .then(response => {
               this.models = response.data
            })
            .catch(error => {
               console.log(error)
            })
      }
   }

}
</script>

<style>

</style>