<template>
  <nav>
    <v-app-bar color="primary" dark height="60">
        <router-link to="/"><v-img alt="Bilhjälpen.se logo" class="my-8" src="/img/logo.png" to="/" max-height="50" max-width="250" position="left" /></router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="$mq === 'laptop' || $mq === 'desktop'">
          <v-btn id="home" text to="/">Hem</v-btn>
          <v-btn id="all-cars" text to="/bilar">Alla bilar</v-btn>
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on }">
              <v-btn
                id="categories"
                color="primary"
                text
                v-on="on"
                style="color: white !important;"
              >Kategorier
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in dropdownItems"
                :key="index"
                :to="item.link"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn id="about-section" text to="/om">Om Bilhjälpen.se</v-btn>
        </v-toolbar-items>
        <v-icon v-if="$mq === 'tablet' || $mq === 'mobile'" @click.stop="drawer = !drawer" dark right large>{{ mdiMenu }}</v-icon>
      
    </v-app-bar>

    <!-- Start of mobile side menu -->
    <v-navigation-drawer app v-model="drawer" right disable-resize-watcher>
      <!-- Menu title -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Meny</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <!-- Menu Links -->
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- End of mobile side menu -->
  </nav>
</template>

<script>
import { mdiMenu } from '@mdi/js';

export default {
  name: "Navbar",
  data: () => ({
    mdiMenu,
    drawer: false, // Hide mobile side menu by default
    items: [
      { text: "Hem", link: "/" },
      { text: "Alla bilar", link: "/bilar" },
      { text: "Om Bilhjälpen.se", link: "/om" }
    ],
    dropdownItems: [
        { title: 'Miljöbilar',
          link: '/kategori/miljo' 
        },
        { title: 'Elbilar',
          link: '/kategori/el'  
        }
      ],
  }),
};
</script>