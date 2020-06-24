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
    <v-divider class="mx-xl-8"></v-divider>
    <div 
      id="bilar"
      style="" 
      class="d-flex flex-row justify-start flex-wrap pt-8 align-center mx-xl-8">
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
        <p class="ml-auto">Antal bilar som matchar: {{filteredModels.length}} av {{models.length}}</p>
    </div>
    <v-row style="" class="">
      <v-col v-for="model in filteredModels" v-model="filteredModels" :key="model._id" xl="3" md="4" sm="6" xs="12">
        <v-card class="mx-auto" :to="'/car/' + model.model">
          <v-img :src="'/img/cars/' + model.model + '.webp'" contain></v-img>

          <v-card-title>
            {{ model.model }}
          </v-card-title>
          <v-card-subtitle>
            {{ model.brand}} | {{model.body_type}} | {{model.fuel_type}}
          </v-card-subtitle>
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
      models: [], // All the models from the
      filteredModels: [], // Models displayed depending on the choosen filter
      drivmedel: [],
      kaross: [],
      selectedDrivmedel: [],
      selectedKaross: []
    }),
    created () {
      this.getModels()
    },
    methods: {
      useFilter() {
        if(this.selectedDrivmedel.length == 0 && this.selectedKaross.length == 0){
          this.filteredModels = this.models;
        }else{

          this.filteredModels = this.models.filter((model) => {
            let fuelCheck = false
            let bodyCheck = false
            if(!this.selectedDrivmedel.length == 0){
              this.selectedDrivmedel.forEach(element => {
                if(model.fuel_type === element){
                  fuelCheck = true;
                  return;
                }
              });
            }else{
              fuelCheck = true
            }
            if(!this.selectedKaross.length == 0){
              this.selectedKaross.forEach(element => {
                if(model.body_type === element){
                  bodyCheck = true;
                  return;
                }
              });
            }else{
              bodyCheck = true
            }
            
            if(fuelCheck && bodyCheck){
              return model;
            }
          })
        }
      },
      getBodyTypesFromModels(){
        this.models.forEach(model => {
          if(!this.kaross.includes(model.body_type)){
            this.kaross.push(model.body_type)
          }
        });
      },
      getFuelTypesFromModels(){
        this.models.forEach(model => {
          if(!this.drivmedel.includes(model.fuel_type)){
            this.drivmedel.push(model.fuel_type)
          }
        });
      },
      getModels () {
        api.get('/specs')
        .then(response => {
          this.models = response.data
          this.getBodyTypesFromModels()
          this.getFuelTypesFromModels()
          this.useFilter()
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
