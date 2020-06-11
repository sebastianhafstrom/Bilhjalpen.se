<template>
  <v-footer
      color="red lighten-3"
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>CarPicker</strong>
      </v-col>
    </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    message: "Hello"
  })
};
</script>