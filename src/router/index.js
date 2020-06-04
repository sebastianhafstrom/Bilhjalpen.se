import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HelloWorld from '../views/HelloWorld.vue'
import About from '../views/About.vue'
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
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/car/:model',
    name: Car,
    component: Car,
    children: [
      {
        path: '',
        component: Specs
      },
      {
        path: 'reviews',
        component: Reviews
      }
    ]

  },
  {
    path: '*',
    component: HelloWorld
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
