<template>
  <v-container>
    <!-- Navigation drawer for the mobile filtering-->
    <MobileNavDrawer
      v-bind:drawer="drawer"
      v-bind:kaross="kaross"
      v-bind:drivmedel="drivmedel"
      v-bind:selectedKaross="selectedKaross"
      v-bind:selectedDrivmedel="selectedDrivmedel" 
      v-on:changedKaross="updatedSelectedKaross($event)"
      v-on:changedDrivmedel="updatedSelectedDrivmedel($event)"
      v-on:changedDrawer="drawer = $event"/>
    
    <!-- Only visible on tablet (<900 pixels) -->
    <div v-if="$mq === 'tablet' || $mq === 'mobile'" class="d-flex flex-column align-stretch mt-4">
        <v-btn class=" flex-sm-grow-0 mb-4" color="primary" dark @click.stop="drawer = !drawer">Filtrera</v-btn>
        <v-select
            :items="sorting"
            label="Sortera efter"
            v-model="selectedSorting"
            class="flex-sm-grow-0"
            color="primary"
            @change="setSort()"
        ></v-select>
    </div>
    <!-- Only visible on widths larger than 900 pixels -->
    <div v-else id="bilar" style class="d-flex flex-row justify-space-between flex-wrap pt-8">
      <div class="d-flex flex-row flex-wrap">
        <v-select
          :items="kaross"
          :item-text="item => item.body +' ('+ item.number + ')'"
          item-value="body"
          :item-disabled="disKaross"
          label="Kaross"
          v-model="selectedKaross"
          class="mr-4 flex-sm-grow-1"
          color="primary"
          style="width: 250px; max-width: 400px;"
          multiple
          @change="setFilter()"
        >
        </v-select>
        <v-select
          :items="drivmedel"
          :item-text="item => item.fuel +' ('+ item.number + ')'"
          item-value="fuel"
          label="Drivmedel"
          :item-disabled="disDrivmedel"
          v-model="selectedDrivmedel"
          class="mr-4 flex-sm-grow-1"
          color="primary"
          style="width: 250px; max-width: 400px;"
          multiple
          @change="setFilter()"
        ></v-select>
        <v-btn ref="button" color="primary white--text" class="my-auto" @click="clearSelection()">Rensa</v-btn>
      </div>
      <div class="d-flex align-center flex-wrap">
        <v-select
          :items="sorting"
          label="Sortera efter"
          v-model="selectedSorting"
          class="mr-4 flex-sm-grow-0 ml-auto"
          color="primary"
          style="width: 150px; max-width: 400px;"
          @change="setSort()"
        ></v-select>
      </div>
    </div>
    
    <v-row v-if="loading === false">
      <CarCard
          v-for="(model, index) in filteredModels"
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
import MobileNavDrawer from "../components/MobileNavDrawer.vue"

export default {
  name: "Cars",
  metaInfo: {
      title: 'Hitta din nya bil bland mängder av bilar',
      meta: [
          {vmid: 'description', name: 'description', content: 'Här listar vi alla bilar från mängder av olika märken som säljer i Sverige. Filtrera och sortera för att hitta den bilen som passar just dig och dina behov'}
      ]
  },
  components: {
    CarCard,
    MobileNavDrawer
  },
  data: () => ({
    models: [], // All the models from the
    filteredModels: [], // Models displayed depending on the choosen filter
    drivmedel: [],
    kaross: [],
    selectedDrivmedel: [],
    selectedKaross: [],
    sorting: ["Namn A-Ö", "Namn Ö-A", "Kaross", "Drivmedel"],
    selectedSorting: '',
    drawer: false,
    loading: true,
  }),
  created() {
    if(this.$store.getters.getCars.length == 0){
      this.getModels()
    }else{
      this.loading = false
      this.models = this.$store.getters.getCars
      this.getBodyTypesFromModels()
      this.getFuelTypesFromModels()
      this.getStoreStuff()
    }
    
  },
  methods: {
    updatedSelectedKaross(value) {
      this.selectedKaross = value
      this.setFilter()
    },
    updatedSelectedDrivmedel(value) {
      this.selectedDrivmedel = value
      this.setFilter()
    },
    disKaross(item) {
      if (this.selectedKaross.length == 0) return item.number == 0;
    },
    disDrivmedel(item) {
      if (this.selectedDrivmedel.length == 0) return item.number == 0;
    },
    setSort() {
      this.$store.commit("setSort", this.selectedSorting);
      this.sortCars()
    },
    sortCars() {
      switch (this.selectedSorting) {
        case "Namn A-Ö":
          this.filteredModels.sort(function (a, b) {
            
            var nameA = a.model.toUpperCase(); // ignore upper and lowercase
            var nameB = b.model.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
          break;
        case "Namn Ö-A":
          this.filteredModels.sort(function (a, b) {
            var nameA = a.model.toUpperCase(); // ignore upper and lowercase
            var nameB = b.model.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
            return 0;
          });
          break;
        case "Kaross":
          this.filteredModels.sort(function (a, b) {
            var nameA = a.body_type.toUpperCase(); // ignore upper and lowercase
            var nameB = b.body_type.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
          break;
        case "Drivmedel":
          this.filteredModels.sort(function (a, b) {
            var nameA = a.fuel_type.toUpperCase(); // ignore upper and lowercase
            var nameB = b.fuel_type.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
          break;
        default:
        // code block
      }
    },
    getStoreStuff() {
      this.selectedDrivmedel = this.$store.getters.getFilteredFuels
      this.selectedKaross = this.$store.getters.getFilteredBodies
      this.selectedSorting = this.$store.getters.getSort
      this.useFilter()
      this.sortCars()
      return;
    },
    setFilter(){
      this.$store.commit("setBody", this.selectedKaross);
      this.$store.commit("setFuel", this.selectedDrivmedel);
      this.useFilter()
    },
    useFilter() {
      if (
        this.selectedDrivmedel.length == 0 &&
        this.selectedKaross.length == 0
      ) {
        this.filteredModels = this.models;
        this.countFuelTypes();
        this.countBodyTypes();
        return;
      } else if (
        this.selectedDrivmedel.length != 0 &&
        this.selectedKaross.length == 0
      ) {
        this.filteredModels = this.models.filter((model) => {
          if (this.selectedDrivmedel.includes(model.fuel_type)) return model;
        });
        this.countBodyTypes();
        this.countFuelTypes();
        return;
      } else if (
        this.selectedDrivmedel.length == 0 &&
        this.selectedKaross.length != 0
      ) {
        this.filteredModels = this.models.filter((model) => {
          if (this.selectedKaross.includes(model.body_type)) return model;
        });
        this.countFuelTypes();
        this.countBodyTypes();
        return;
      } else {
        this.filteredModels = this.models.filter((model) => {
          if (
            this.selectedKaross.includes(model.body_type) &&
            this.selectedDrivmedel.includes(model.fuel_type)
          )
            return model;
        });
        this.countFuelTypes();
        this.countBodyTypes();
      }
      this.sortCars();
    },
    getBodyTypesFromModels() {
      this.models.forEach((model) => {
        var objIndex = this.kaross.findIndex(
          (obj) => obj.body == model.body_type
        );
        if (objIndex == -1) {
          this.kaross.push({
            body: model.body_type,
            number: 0,
          });
        }
      });
      this.kaross.sort();
    },
    getFuelTypesFromModels() {
      this.models.forEach((model) => {
        var objIndex = this.drivmedel.findIndex(
          (obj) => obj.fuel == model.fuel_type
        );
        if (objIndex == -1) {
          this.drivmedel.push({
            fuel: model.fuel_type,
            number: 0,
          });
        }
      });
      this.drivmedel.sort();
    },
    getModels() {
      api
        .get("/specs")
        .then((response) => {
          this.models = response.data;
          this.getBodyTypesFromModels();
          this.getFuelTypesFromModels();
          this.$store.commit("setCars", this.models);
          this.getStoreStuff()
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => this.loading = false)
    },
    clearSelection() {
      this.selectedDrivmedel = [];
      this.selectedKaross = [];
      this.useFilter();
    },
    countBodyTypes() {
      this.kaross.forEach((kaross) => {
        kaross.number = 0;
      });

      this.filteredModels.forEach((model) => {
        var objIndex = this.kaross.findIndex(
          (obj) => obj.body == model.body_type
        );
        this.kaross[objIndex].number += 1;
      });
    },
    countFuelTypes() {
      this.drivmedel.forEach((drivmedel) => {
        drivmedel.number = 0;
      });
      this.filteredModels.forEach((model) => {
        var objIndex = this.drivmedel.findIndex(
          (obj) => obj.fuel == model.fuel_type
        );
        this.drivmedel[objIndex].number += 1;
      });
    },
  },
};
</script>
