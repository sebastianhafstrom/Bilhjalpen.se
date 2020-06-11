<template>
    <v-container>
        <v-row justify="start" align="center">
            <v-col sm="12" md="6">
                <h1 >This is the {{ model }} page</h1>
                <h2>Find the specs and reviews here</h2>
            </v-col>
            <v-col sm="12" md="6">
                <v-img
                :src="require('@/assets/logos/Nissan.png')"
                contain
                height="200"
                />
            </v-col>

            <v-col cols="12">
                <v-carousel
                    cycle
                    hide-delimiter-background
                    show-arrows-on-hover
                    height="50vw"
                    width="50vw"
                >
                    <v-carousel-item
                    v-for="(image, i) in images"
                    :key="i"
                    :src="image.src"
                    >
                    
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
        <v-row class="text-center">
            <v-col cols="12">
                <v-btn text :to="'/car/' + $route.params.model + '/specs'">Specs</v-btn>
                <v-btn text :to="'/car/' + $route.params.model + '/reviews'">Reviews</v-btn>
                <router-view></router-view>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        model: '',
        images: [
            {
                src: "https://audimediacenter-a.akamaihd.net/system/production/media/87435/images/d0c6183095f7330532ea82417aeb5ac596ac851c/A1915308_full.jpg?1582585947"
            },
            {
                src: "https://audimediacenter-a.akamaihd.net/system/production/media/87433/images/46bb25600114b66450cc83368b626362f395ae8a/A1915306_full.jpg?1582585953"
            },
            {
                src: "https://audimediacenter-a.akamaihd.net/system/production/media/87430/images/6f3a702edffc2bee0d728d705d12546b4e71b731/A1915303_full.jpg?1582585946"
            }
        ]
    }),
    created() {
        this.model = this.$route.params.model
    }

}
</script>
