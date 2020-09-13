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
   metaInfo () {
      return {
        title: this.brandName,
        meta: [
          {vmid: 'description', name: 'description', content: 'Här har vi samlat alla nya bilar som säljs av ' + this.brandName + '. Perfekt för dig som vet vilket bilmärke du gillar och vill hitta den perfekta bilen' }
        ],
        link: [
            { rel: 'canonical', href: 'marke/' + this.brandName}
        ]
      }
    },
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