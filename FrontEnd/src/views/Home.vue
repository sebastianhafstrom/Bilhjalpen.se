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
    </v-row>
    
    
    <v-row align="center" justify="center">
        <v-col sm="12" md="6">
          <v-overflow-btn
            v-model="selectedCountry"
            :items="countries"
            label="Land"
          ></v-overflow-btn>
        </v-col>
        <v-col sm="12" md="6">
          <v-btn color="success" v-on:click="filterModels()">
            Apply
          </v-btn>
        </v-col>
    </v-row>
    <v-row>
      <v-col v-for="brand in filteredBrands" :key="brand._id" xl="2" md="3" sm="6" xs="12">
        <v-card class="mx-auto">
          <v-img src="https://audimediacenter-a.akamaihd.net/system/production/media/63328/images/9ad842ff41aba23e530617ae36f4062fa9d7bad8/A186773_full.jpg?1582428030" height="150px"></v-img>

          <v-card-title>
            {{ brand.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ brand.origin}} | {{ brand.year}}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              :to="'/car/' + brand.name + '/specs'"
            >
              Läs mer
            </v-btn>

            <v-btn
              color="primary"
              text
            >
              Jämför
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

  export default {
    name: 'HelloWorld',

    data: () => ({
      brands: [],
      filteredBrands: [],
      models: [],
      loading: true,
      countries: ['Alla'],
      selectedCountry: null
    }),
    created () {
      this.getBrands()
      this.getModels()
    },
    methods: {
      getCountries(){
        this.brands.forEach(element => {
          if(!this.countries.includes(element.origin)){
            this.countries.push(element.origin)
          }
        });
        this.countries.sort()
      },
      getBrands () {
        axios
        .get('http://localhost:3000/api/brands')
        .then(response => {
          this.brands = response.data.brands
          this.filteredBrands = response.data.brands
          this.getCountries()
        })
        .catch(error => {
          console.log(error)
        })
      },
      getModels () {
        axios
        .get('http://localhost:3000/api/models')
        .then(response => {
          this.models = response.data.models
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => this.loading = false)
      },
      filterModels() {
        if(this.selectedCountry == 'Alla'){
          this.filteredBrands = this.brands
        }else{
          this.filteredBrands = this.brands.filter(brand => brand.origin == this.selectedCountry);
        }
        
      }
    }
  }
</script>
