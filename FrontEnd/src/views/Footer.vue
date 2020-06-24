<template>
  <v-footer
      color="red accent-4"
      class="font-weight-medium d-flex align-center justify-center py-4"
      dark
    >
        {{ new Date().getFullYear() }} — <strong>CarPicker</strong>
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