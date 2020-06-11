<template>
  <v-container>
    <v-row class="text-center d-flex align-center justify-center flex-column" style="height: 400px;">
        <h1 class="display-2 font-weight-bold mb-3">
          Välkommen till CarPicker
        </h1>

        <p class="subheading font-weight-regular mx-8">
          Vi ger dig oberoende jämförelse mellan världens alla bilar.
        </p>
        <v-btn
          ref="button"
          
          color="primary"
          @click="$vuetify.goTo('#bilar')"
        >
          Till bilarna
        </v-btn>
    </v-row>
    <v-divider></v-divider>
    <div 
      id="bilar"
      style="" 
      class="d-flex flex-row justify-start flex-wrap pt-8 align-center">
      
      <v-select
          :items="kaross"
          label="Kaross"
          v-model="selectedKaross"
          class="mr-4 flex-sm-grow-0"
          color="green"
          style="width: 250px; max-width: 400px;"
          outlined
          multiple
          @change="useFilter()"
        ></v-select>
      <v-select
          :items="drivmedel"
          label="Drivmedel"
          v-model="selectedDrivmedel"
          class="mr-4 flex-sm-grow-0"
          style="width: 250px; max-width: 400px;"
          outlined
          multiple
          @change="useFilter()"
        ></v-select>
        <v-select
          :items="vaxellada"
          label="Växellåda"
          v-model="selectedVaxellada"
          class="mr-4 flex-sm-grow-0"
          style="width: 250px; max-width: 400px;"
          outlined
          multiple
          @change="useFilter()"
        ></v-select>
        <v-select
          :items="modelBrands"
          label="Märke"
          v-model="selectedBrands"
          class="mr-4 flex-sm-grow-0"
          style="width: 250px; max-width: 400px;"
          outlined
          multiple
          @change="useFilter()"
        ></v-select>
        <p v-if="filteredModels.length && models.length" class="ml-auto">Antal bilar som matchar: {{filteredModels.length}} av {{models.length}}</p>
    </div>
    <v-row style="min-height: 1000px;">
      <v-col v-for="model in filteredModels" v-model="filteredModels" :key="model._id" xl="3" md="4" sm="6" xs="12">
        <v-card class="mx-auto">
          <v-img 
            :src="require(`../assets/cars/${model.name}.jpg`)" contain></v-img>

          <v-card-title>
            {{ model.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ model.brand}}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              :to="'/car/' + model.name + '/specs'"
            >
              Läs mer
            </v-btn>

            <!-- <v-btn
              color="primary"
              text
            >
              Jämför
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { api } from '@/Api.js'


  export default {
    name: 'Home',

    data: () => ({
      brands: [],
      filteredBrands: [],
      models: [], // All the models from the
      filteredModels: [], // Models displayed depending on the choosen filter
      loading: true,
      countries: ['Alla'],
      modelBrands: [],
      selectedCountry: null,
      selectedDrivmedel: null,
      selectedKaross: null,
      selectedVaxellada: null,
      selectedBrands: null,
      drivmedel: ['Bensin', 'Diesel', "Hybrid", "El", "Gas"],
      kaross: ['Kombi', 'Halvkombi', 'Sedan', 'SUV', 'Coupé', 'Cabriolet', 'Pickup'],
      vaxellada: ['Manuell', 'Automat']
    }),
    created () {
      this.getBrands()
      this.getModels()
    },
    methods: {
      useFilter() {
        if(this.selectedBrands === null || this.selectedBrands.length == 0){
          this.filteredModels = this.models;
        }else if(this.selectedBrands !== null){
          this.filteredModels = this.models.filter((model) => {
            let check = false
            this.selectedBrands.forEach(element => {
              if(model.brand === element){
                check = true;
                return;
              }
            });
            if(check){
              return model;
            }
          })
        }

      },
      getCountries(){
        this.brands.forEach(element => {
          if(!this.countries.includes(element.origin)){
            this.countries.push(element.origin)
          }
        });
        this.countries.sort()
      },
      getBrandsFromModels(){
        this.models.forEach(model => {
          if(!this.modelBrands.includes(model.brand)){
            this.modelBrands.push(model.brand)
          }
        });
        this.countries.sort()
      },
      getBrands () {
        api.get('/brands')
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
        api.get('/models')
        .then(response => {
          this.models = response.data.models
          this.getBrandsFromModels()
          this.useFilter()
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
