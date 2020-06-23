<template>
  <nav>
    <v-app-bar color="red accent-4" dark>
      <v-toolbar-title class="headline text-uppercase">CarPicker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-and-down">
        <v-btn text to="/" exact>Home</v-btn>
      </v-toolbar-items>
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Start of mobile side menu -->
    <v-navigation-drawer app v-model="drawer" right disable-resize-watcher>
      <!-- Menu title -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <!-- Menu Links -->
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

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
      { text: "Home", icon: "mdi-home", link: "/" },
    ],
    inset: false
  })
};
</script>