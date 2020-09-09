<template>
   <div>
      <h1>{{brandName}}</h1>
      <h2> Grundat {{brandYear}} i {{brandPlace}}</h2>
  </div>
</template>

<script>
import { api } from "@/Api.js";

export default {
   name: 'Märkessidan',
   data: () => ({
      brandName: '',
      brandYear: '',
      brandPlace: '',
      loading: true
   }),
   created() {
      this.brandName = this.$route.params.brand
      this.getModels()
   },
   methods: {
      getModels() {
         api.get(`/brands/${this.brandName}`)
            .then(response => {
               this.brandYear = response.data.brandYear
               this.brandPlace = response.data.origin
            })
            .catch(error => {
               console.log(error)
            })
            .finally(() => this.loading = false)
      }
   }

}
</script>

<style>

</style>