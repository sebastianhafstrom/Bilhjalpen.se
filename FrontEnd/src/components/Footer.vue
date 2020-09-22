<template>
  <v-footer
      color="#112D32"
      class="font-weight-medium py-8"
      dark
    >
    <v-row>
      <v-col cols="4">
        <router-link to="/"><v-img alt="Bilhjälpen.se logo" class="mr-3" src="/img/logo.png" to="/" max-width="300" position="left" /></router-link>
        <ul>
          <li>Om Bilhjäpen</li>
          <li>Kontakt</li>
        </ul>
        <a href="#"><v-icon>{{ mdiFacebook }}</v-icon></a>
        <a href="#"><v-icon>{{ mdiLinkedin }}</v-icon></a>
        <a href="#"><v-icon>{{ mdiTwitter }}</v-icon></a>
        <a href="#"><v-icon>{{ mdiEmail }}</v-icon></a>
      </v-col>
      <v-col cols="4">
        <h3>Bilmärken</h3>
        <ul>
          <li>Volvo</li>
          <li>BMW</li>
          <li>SKODA</li>
          <li>AUDI</li>
          <li>Visa alla märken</li>
        </ul>
      </v-col>
      <v-col cols="4">
        <h3>Kategorier</h3>
        <ul>
          <li>Barnfamilj</li>
          <li>Miljöbilar</li>
          <li>Performance</li>
          <li>Stora bilar</li>
          <li>Visa alla kategorier</li>
        </ul>
      </v-col>
    </v-row>
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