<template>
  <v-footer
      color="primary"
      class="font-weight-medium d-flex flex-column align-center justify-center py-4"
      dark
    >
        <router-link to="/"><v-img alt="Bilhjälpen.se logo" class="mr-3" src="/img/logo.png" to="/" max-width="300" position="left" /></router-link>
        <div class="flex-row">
          <v-btn class="mt-4" dark text to="/bilar">Alla Bilar</v-btn>
          <v-btn class="mt-4" dark text to="/om">Om Bilhjälpen.se</v-btn>
        </div>
        <div class="flex-row">
          <a href="#"><v-icon>{{ mdiFacebook }}</v-icon></a>
          <a href="#"><v-icon>{{ mdiLinkedin }}</v-icon></a>
          <a href="#"><v-icon>{{ mdiTwitter }}</v-icon></a>
          <a href="#"><v-icon>{{ mdiEmail }}</v-icon></a>
        </div>
    </v-footer>
</template>

<script>
import { mdiFacebook } from '@mdi/js';
import { mdiLinkedin } from '@mdi/js';
import { mdiTwitter } from '@mdi/js';
import { mdiEmail } from '@mdi/js';

export default {
  name: "Footer",
  data: () => ({
    mdiFacebook,
    mdiLinkedin,
    mdiTwitter,
    mdiEmail
  })
};
</script>