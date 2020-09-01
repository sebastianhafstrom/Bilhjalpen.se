<template>
  <v-footer
      color="primary"
      class="font-weight-medium d-flex align-center justify-center py-4"
      dark
    >
        {{ new Date().getFullYear() }} — <strong>Bilhjälpen</strong>
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