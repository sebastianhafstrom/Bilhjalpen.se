<template>
  <nav>
    <v-app-bar color="primary" dark height="60">
        <router-link to="/"><v-img class="mr-3" :src="require('../assets/logo.png')" to="/" max-width="300" position="left" /></router-link>
        <!--<v-toolbar-title class="headline">Bilhjälpen</v-toolbar-title> -->
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="$mq === 'laptop' || $mq === 'desktop'">
          <v-btn text to="/">Hem</v-btn>
          <v-btn text to="/bilar">Alla bilar</v-btn>
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on }">
              <v-btn
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
          <v-btn text to="/om">Om Bilhjälpen.se</v-btn>
        </v-toolbar-items>
        <v-app-bar-nav-icon v-if="$mq === 'tablet' || $mq === 'mobile'" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
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
    dropdownItems: [
        { title: 'Miljöbilar',
          link: '/' 
        },
        { title: 'Elbilar',
          link: '/'  
        },
        { title: 'Stora bilar',
          link: '/'  
        },
        { title: 'Små bilar',
          link: '/'  },
      ],
  }),
};
</script>