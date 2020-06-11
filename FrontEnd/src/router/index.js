import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Car from '../views/Car.vue'
import Specs from '../views/Specs.vue'
import Reviews from '../views/Reviews.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/car/:model',
    name: Car,
    component: Car,
    children: [
      {
        path: 'specs',
        component: Specs
      },
      {
        path: 'reviews',
        component: Reviews
      }
    ]

  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
