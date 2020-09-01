<template>
  <nav>
    <v-app-bar color="primary" dark height="80">
      <router-link to="/"><img class="mr-3" :src="require('../assets/logo.png')" height="40" to="/" /></router-link>
      <!--<v-toolbar-title class="headline">Bilhjälpen</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="/cars" exact>Alla bilar</v-btn>
      </v-toolbar-items>
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
          <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>-->

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
export default {
  name: "Navbar",
  data: () => ({
    drawer: false, // Hide mobile side menu by default
    items: [
      { text: "Hem", link: "/" },
      { text: "Alla bilar", link: "/cars" },
    ],
  }),
};
</script>