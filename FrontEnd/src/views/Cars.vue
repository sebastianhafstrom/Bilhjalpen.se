<template>
  <v-container>
    <!-- Navigation drawer for the mobile filtering-->
    <v-navigation-drawer v-model="drawer" fixed temporary right>
      <v-subheader>Välj Kaross</v-subheader>
      <v-list shaped rounded>
        <v-list-item-group v-model="selectedKaross" multiple @change="useFilter()">
          <template v-for="(item, i) in kaross">
            <v-list-item
              :key="`item-${i}`"
              :value="item.body"
              active-class="secondary"
              dense
            >
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active" color="primary"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{item.body}}
                    <span style="float: right;">({{item.number}})</span>
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-subheader>Välj drivmedel</v-subheader>
      <v-list shaped rounded>
        <v-list-item-group v-model="selectedDrivmedel" multiple @change="useFilter()">
          <template v-for="(item, i) in drivmedel">
            <v-list-item
              :key="`item-${i}`"
              :value="item.fuel"
              active-class="secondary"
              dense
            >
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active" color="primary"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{item.fuel}}
                    <span style="float: right;">({{item.number}})</span>
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- Only visible on tablet (<900 pixels) -->
    <div v-if="$mq === 'tablet' || $mq === 'mobile'" class="d-flex flex-column align-stretch mt-4">
        <v-btn class=" flex-sm-grow-0 mb-4" color="primary" dark @click.stop="drawer = !drawer">Filtrera</v-btn>
        <v-select
            :items="sorting"
            label="Sortera efter"
            v-model="selectedSorting"
            class="flex-sm-grow-0"
            color="red"
            @change="sortCars()"
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
          color="red"
          style="width: 250px; max-width: 400px;"
          multiple
          @change="useFilter()"
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
          color="red"
          style="width: 250px; max-width: 400px;"
          multiple
          @change="useFilter()"
        ></v-select>
        <v-btn ref="button" color="primary white--text" class="my-auto" @click="clearSelection()">Rensa</v-btn>
      </div>
      <div class="d-flex align-center flex-wrap">
        <v-select
          :items="sorting"
          label="Sortera efter"
          v-model="selectedSorting"
          class="mr-4 flex-sm-grow-0 ml-auto"
          color="red"
          style="width: 150px; max-width: 400px;"
          @change="sortCars()"
        ></v-select>
      </div>
    </div>
    
    <v-row style class>
      <CarCard
          v-for="(model, index) in filteredModels"
          v-bind:model="model"
          v-bind:key="index" />
    </v-row>
  </v-container>
</template>

<script>
import { api } from "@/Api.js";
import CarCard from "./CarCard.vue"

export default {
  name: "Cars",
  components: {
    CarCard
  },
  data: () => ({
    models: [], // All the models from the
    filteredModels: [], // Models displayed depending on the choosen filter
    drivmedel: [],
    kaross: [],
    selectedDrivmedel: [],
    selectedKaross: [],
    sorting: ["Name A-Ö", "Namn Ö-A", "Kaross", "Drivmedel"],
    selectedSorting: "Name A-Ö",
    drawer: null,
  }),
  created() {
    this.getStoreStuff();
    this.getModels();
  },
  methods: {
    disKaross(item) {
      if (this.selectedKaross.length == 0) return item.number == 0;
    },
    disDrivmedel(item) {
      if (this.selectedDrivmedel.length == 0) return item.number == 0;
    },
    sortCars() {
    this.$store.commit("setSort", this.selectedSorting);
      switch (this.selectedSorting) {
        case "Name A-Ö":
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
      return;
    },
    useFilter() {
      this.$store.commit("setBody", this.selectedKaross);
      this.$store.commit("setFuel", this.selectedDrivmedel);

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
        /* let fuelCheck = false
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
            } */
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
          this.useFilter();
        })
        .catch((error) => {
          console.log(error);
        });
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
