<template>
  <nav>
    <v-app-bar color="red accent-4" dark>
      <v-toolbar-title class="headline text-uppercase">CarPicker</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
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