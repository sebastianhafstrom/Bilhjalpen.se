import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Car from '../views/Car.vue'

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
    component: Car
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

export default router
