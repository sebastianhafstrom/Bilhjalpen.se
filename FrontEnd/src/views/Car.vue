<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="6" xs="12">
                <h1 >This is the {{ model }} page</h1>
                <h2>Find the specs and reviews here</h2>
            </v-col>
            <v-col cols="6" xs="12">
                <v-img
                :src="require('../assets/logos/Nissan.png')"
                class="my-auto"
                contain
                height="200"
                />
            </v-col>
            <v-col cols="12">
                <v-btn text :to="'/car/' + $route.params.model">Specs</v-btn>
                <v-btn text :to="'/car/' + $route.params.model + '/reviews'">Reviews</v-btn>
                <router-view></router-view>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        model: ''
    }),
    created() {
        this.model = this.$route.params.model
    }

}
</script>
