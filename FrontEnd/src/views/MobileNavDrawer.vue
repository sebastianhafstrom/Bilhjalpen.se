<template>
  <v-navigation-drawer v-model="drawerLocal" fixed temporary right>
      <v-subheader>Välj Kaross</v-subheader>
      <v-list shaped rounded>
        <v-list-item-group v-model="selectedKarossLocal" multiple>
          <template v-for="(item, i) in kaross">
            <v-list-item
              :key="`item-${i}`"
              :value="item.body"
              active-class="secondary"
              dense
            >
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active" color="primary"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{item.body}}
                    <span style="float: right;">({{item.number}})</span>
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-subheader>Välj drivmedel</v-subheader>
      <v-list shaped rounded>
        <v-list-item-group v-model="selectedDrivmedelLocal" multiple>
          <template v-for="(item, i) in drivmedel">
            <v-list-item
              :key="`item-${i}`"
              :value="item.fuel"
              active-class="secondary"
              dense
            >
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active" color="primary"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{item.fuel}}
                    <span style="float: right;">({{item.number}})</span>
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "MobileNavDrawer",
    props: ['drawer', 'kaross', 'drivmedel', 'selectedKaross', 'selectedDrivmedel'],
    data: () => ({
        
    }),
    computed: {
        selectedKarossLocal: {
          get() {
              return this.selectedKaross
            },
            set(val) {
              this.$emit('changedKaross', val)
            }
        },
        selectedDrivmedelLocal: {
          get() {
              return this.selectedDrivmedel
            },
            set(val) {
              this.$emit('changedDrivmedel', val)
            }
        },
        drawerLocal: {
            get() {
                return this.drawer
            },
            set() {
                this.$emit('changedDrawer')
            }
        }
    }

}
</script>

<style>

</style>