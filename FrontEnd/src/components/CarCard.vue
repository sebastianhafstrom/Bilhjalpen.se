<template>
  <v-col
        xl="3"
        md="4"
        sm="6"
        xs="12"
      >
        <v-card class="mx-auto" :to="'/bil/' + model.model">
          <v-img :src="'/img/cars/A1 Citycarver.webp'" contain></v-img>
          <v-row align="center" justify="center">
            <v-col cols="6" sm="8" class="py-0">
              <v-card-title>{{ model.model }}</v-card-title>
              <!--<v-card-subtitle>{{model.body_type}} | {{model.fuel_type}}</v-card-subtitle>-->
            </v-col>
            <v-col cols="6" sm="4">
              <v-img :src="'/img/logos/' + model.brand + '.png'"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
</template>

<script>
export default {
    name: "CarCard",
    props: ['model'],
    data: () => ({
        
    })
};
</script>

<style scoped>

</style>