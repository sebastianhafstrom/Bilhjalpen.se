<template>
    <v-container>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
        <v-row justify="start" align="center">
            <v-col class="col-sm-6 offset-sm-3 col-xs-12" >
                <v-img :src="'/img/cars/' + model + '.webp'" contain></v-img>
            </v-col>
            <v-col cols='12'>
                <div class="ml-2">
                    <h1 >{{brand}} {{ model }}</h1>
                </div>
            </v-col>
            
            
            

            
        </v-row>
        <!-- <v-row class="text-center">
            <v-col cols="12">
                <v-btn text :to="'/car/' + $route.params.model + '/specs'">Specs</v-btn>
                <v-btn text :to="'/car/' + $route.params.model + '/reviews'">Reviews</v-btn>
                <router-view></router-view>
            </v-col>
        </v-row> -->
    </v-container>
</template>

<script>
import { api } from '@/Api.js'

export default {
    data: () => ({
        model: '',
        brand: '',
        items: [
        {
          text: 'Hem',
          disabled: false,
          href: '/',
        },
        {
          text: 'Link 1',
          disabled: true,
          href: 'breadcrumbs_link_1',
        },
      ],
    }),
    created() {
        this.model = this.$route.params.model
        this.getModelData()
        this.setBreadCrumbs()
    },
    methods: {
        getModelData() {
            api.get(`/models/${this.model}`)
                .then(response => {
                    this.brand = response.data.brand
                })
                .catch(error => {
                    console.log(error)
                })
        },
        setBreadCrumbs() {
            this.items[1].text = this.model
        }
    }

}
</script>
