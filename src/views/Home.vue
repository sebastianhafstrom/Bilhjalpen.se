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
        ],
      desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
    }),
    mounted () {
      axios
        .get('http://localhost:3000/brands')
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
