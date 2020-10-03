<template>
<div>
  <div style="min-height: 20vw; width: 100%;" class="d-flex">
    <div id="main-box" class="justify-center d-flex flex-column" style="padding-left: 30px; padding-right: 20px;">
      <h1 class="display-1 font-weight-thin" style="color: #000000;  ">Vi hjälper <span style="color: #F17544">dig</span> 
hitta <span style="color: #F17544">din</span> nya bil</h1>
      <div class="d-flex flex-wrap">
        <v-btn color="#367588" class=" mt-8 mr-4" to="/bilar" outlined>Till Bilväljaren</v-btn>
        <v-btn color="#367588" class=" white--text mt-8" to="/bilar">Visa alla bilar</v-btn>
      </div>
      
    </div>
    <div id="car-image">
      <img style="width: 100%;" src="https://www.alabamamediagroup.com/wp-content/uploads/2017/04/newcar2-1030x687.jpg">
    </div>
  </div>
  <div style="background-color: #ffffff; height:80px;" class="d-flex align-center justify-space-around">
    <v-img height="40" contain src="/img/logos-black/skoda_black.png"></v-img>
    <v-img height="40" contain src="/img/logos-black/skoda_black.png"></v-img>
    <v-img height="40" contain src="/img/logos-black/skoda_black.png"></v-img>
    <v-img height="40" contain src="/img/logos-black/skoda_black.png"></v-img>
    <v-img height="40" contain src="/img/logos-black/skoda_black.png"></v-img>
    <v-img height="40" contain src="/img/logos-black/skoda_black.png"></v-img>
    <v-img height="40" contain src="/img/logos-black/skoda_black.png"></v-img>
    <v-img height="40" contain src="/img/logos-black/skoda_black.png"></v-img>

  </div>



  <v-row class="justify-center align-center" style="color: #E9ECED; background-color: #112D32; height: 50vw; min-height: 400px; max-height: 700px;">
    <v-col cols="4" class="text-box">
      <h2 class="font-weight-regular" style="margin-bottom: 20px; border-left: thick solid #F17544;">All information på samma ställe</h2>
      <p class="font-weight-light">Vi har all information från bagageutrymme till .....</p>
    </v-col>
    <v-col cols="4" class="text-box">
      <h2 style="margin-bottom: 20px;">Oberoende jämförelser</h2>
      <p>Vi är ett helt oberoende företag, vars enda mål är att hjälpa just dig hitta en bil som passar dina behov och ditt liv!</p>
    </v-col>
    <v-col cols="4" class="text-box">
      <h2 style="margin-bottom: 20px;">Personliga rekommendationer</h2>
      <p>Hur kan vi hjälpa dig?</p>
    </v-col>
  </v-row>

  <div class="" style="color: #000000; background-color: #E9ECED; height: 50vw; min-height: 400px; max-height: 700px; padding-top: 50px; padding-left:30px;padding-right:30px;">
    <h2 class="font-weight-regular">Populära kategorier</h2>
    <v-row class="" align="center" justify="left">
        <CategoryButton
          v-for="(item, index) in items"
          v-bind:item="item"
          v-bind:key="index" />
      </v-row>
  </div>
  


  <!-- <div style="background-color: #254E58; height: 50vw; min-height: 400px; max-height: 700px;">
    <v-container>
      <h2 id="popular-categories" class="text-center headline my-6">De populäraste kategorierna</h2>    
      <v-row class="fill-height" align="center" justify="center">
        <CategoryButton
          v-for="(item, index) in items"
          v-bind:item="item"
          v-bind:key="index" />
      </v-row>
    </v-container>
    </div> -->
</div>
</template>

<script>
import CategoryButton from '../components/CategoryButton.vue'

export default {
  name: "Home",
  metaInfo: {
  },

  components: {
    CategoryButton
  },

  data: () => ({
      url: '',
      transparent: 'rgba(255, 255, 255, 0)',
      items: [
        {
          title: 'Bilar för barnfamiljen',
          text: "Miljövänliga hybridbilar, elbilar och gasbilar",
          color: 'green',
          link: '/kategori/miljo'
        },
        {
          title: 'Bilar för den miljömedvetna',
          text: 'Endast de renaste elbilarna',
          color: 'red',
          link: '/kategori/el'
        },
        {
          title: 'Bilar där performance är allt',
          text: '',
          color: 'blue',
          link: '/'
        }
      ]
  }),
  created() {

  },
  methods: {

  },
};
</script>
<style scoped>
#main-box {
  background-color: #E9ECED;
  width: 35%;
}

#car-image {
  width: 65%;
}

.text-box {
  padding-left: 30px;
  padding-right: 30px;
}
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
 }

 a {  text-decoration: none;}
</style>
