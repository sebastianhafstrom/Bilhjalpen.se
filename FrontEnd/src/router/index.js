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
import Admin from '../views/Admin.vue'
import { api } from '@/Api.js'

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
        beforeEnter: (to, from, next) => {
            function isValid(param) {
                // check if param is valid
                api.get(`/models/${param}`)
                    .then(response => {
                        response
                        next()
                    })
                    .catch(error => {
                        if(error.response.status == 404){
                            next({ name: 'Not found' });
                        } else {
                            console.log(error)
                        }
                    })
            }
            isValid(to.params.model)
        }
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
        beforeEnter: (to, from, next) => {
            function isValid(param) {
                // check if param is valid
                api.get(`/brands/${param}`)
                    .then(response => {
                        response
                        next()
                    })
                    .catch(error => {
                        if(error.response.status == 404){
                            next({ name: 'Not found' });
                        } else {
                            console.log(error)
                        }
                    })
            }
            isValid(to.params.brand)
        }
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
        path: '/admin',
        name: 'Admin',
        component: Admin
    },
    {
        path: '/404',
        name: 'Not found',
        component: NotFound,
    }
]

const scrollBehavior = (to, from, savedPosotion) => {
    if (savedPosotion) {
        return savedPosotion
    } else {
        return { x: 0, y: 0 }
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
