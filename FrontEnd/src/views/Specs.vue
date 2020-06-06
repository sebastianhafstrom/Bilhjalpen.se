<template>
  <v-expansion-panels accordion focusable>
      <v-expansion-panel
        v-for="heading in headings"
        :key="heading"
      >
        <v-expansion-panel-header>{{ heading }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
  data: () => ({
    headings: [
      'Generellt',
      'Motor',
      'Teknik',
      'Säkerhet',
      'Miljö',
      'Övrigt'
    ]
  })

}
</script>
