import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cars from '../views/Cars.vue'
import Car from '../views/Car.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import Elbilar from '../views/Elbilar.vue'
import Miljobilar from '../views/Miljobilar.vue'
import Brand from '../views/Brand.vue'
import Brands from '../views/Brands.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hem',
    component: Home,
  },
  {
    path: '/bilar',
    name: 'Bilar',
    component: Cars,
  },
  {
    path: '/bil/:model',
    name: 'Car',
    component: Car,
  },
  {
    path: '/marken',
    name: 'Alla märken',
    component: Brands,

  },
  {
    path: '/marke/:brand',
    name: "Specifikt märke",
    component: Brand,
  },
  {
    path: '/kategori/el',
    name: 'Kategori El',
    component: Elbilar,
  },
  {
    path: '/kategori/miljo',
    name: 'Kategori Miljö',
    component: Miljobilar,
  },
  {
    path: '/om',
    name: 'Om',
    component: About,
  },
  {
    path: '/404',
    name: 'Not found',
    component: NotFound,
  }
]

const scrollBehavior = (to, from, savedPosotion) => {
  if(savedPosotion){
    return savedPosotion
  } else {
    return { x: 0, y: 0}
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/404');
  } else {
    next();
  }
});

export default router
