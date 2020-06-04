<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Välkommen till CarPicker
        </h1>

        <p class="subheading font-weight-regular">
          Vi ger dig oberoende jämförelse mellan världens alla bilar.
        </p>
      </v-col>
      <v-col cols="12">
        <v-list>
        <v-list-item v-for="brand in brands" :key="brand._id">
          <v-list-item-content>
            <v-list-item-title>{{ brand.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ brand.origin}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

  export default {
    name: 'HelloWorld',

    data: () => ({
      brands: null,
      loading: true
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
