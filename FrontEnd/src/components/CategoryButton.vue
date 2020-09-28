<template>
  <v-col cols="12" sm="6">
    <v-hover v-slot:default="{ hover }">
      <router-link :to="item.link">
        <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" :color="item.color">
          <v-card-title class="title white--text align-self-center">
            <v-row class="fill-height flex-column" justify="space-between">
              <p id="categories-option" class="mt-4 subheading text-center">{{ item.title }}</p>

              <div>
                <p class="ma-0 body-1 text-center">{{ item.text }}</p>
              </div>
            </v-row>
          </v-card-title>
        </v-card>
      </router-link>
    </v-hover>
  </v-col>
</template>

<script>
export default {
    name: "CategoryButton",
    props: ['item'],
    data: () => ({
        transparent: 'rgba(255, 255, 255, 0)'
    })
};
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
 }

 a {  text-decoration: none;}
</style>