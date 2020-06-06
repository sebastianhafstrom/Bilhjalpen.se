<template>
  <v-container>
    <v-row class="text-center">
      

      <v-col cols="12" class="mb-4 mt-8">
        <h1 class="display-2 font-weight-bold mb-3">
          Välkommen till CarPicker
        </h1>

        <p class="subheading font-weight-regular">
          Vi ger dig oberoende jämförelse mellan världens alla bilar.
        </p>
      </v-col>
      <v-col md="2" cols="0"></v-col>
      <v-col md="8" cols="12">
        <v-data-table
          :headers="headers"
          :items="brands"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-col>
      <v-col md="2" cols="0"></v-col>

    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

  export default {
    name: 'HelloWorld',

    data: () => ({
      brands: [],
      loading: true,
      headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: '_id',
          },
          { text: 'Name', value: 'name' },
          { text: 'Origin', value: 'origin' },
          { text: 'Founded', value: 'year' },
        ]
    }),
    mounted () {
      axios
        .get('http://localhost:3000/api/brands')
        .then(response => {
          this.brands = response.data.brands
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => this.loading = false)
    }
  }
</script>
