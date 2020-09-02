<template>
  <div>
    <v-row
      style="height: 50vw; min-height: 300px; max-height:800px;"
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
        <h1 class="display-3 font-weight-thin mb-4">404 - Sidan hittas inte</h1>
        <p class="subheading">Den sida du försöker hitta verkar inte finnas.</p>
        <v-btn color="primary" class=" white--text mt-8" to="/" tile>Tillbaka till startsidan</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
//import { api } from "@/Api.js";

export default {
  name: "NotFound",

  data: () => ({

  }),
  created() {

  },
  methods: {

  },
};
</script>

