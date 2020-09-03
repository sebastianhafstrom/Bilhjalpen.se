import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cars from '../views/Cars.vue'
import Car from '../views/Car.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hem',
    component: Home,
    meta: {
      title: 'Hem - Bilhjälpen',
      metaTags: [
        {
          name: 'description',
          content: 'Startsidan för Bilhjälpen.'
        },
        {
          property: 'og:description',
          content: 'Startsidan för Bilhjälpen.'
        }
      ]
    }
  },
  {
    path: '/bilar',
    name: 'Bilar',
    component: Cars,
    meta: {
      title: 'Alla bilar - Bilhjälpen',
      metaTags: [
        {
          name: 'description',
          content: 'Alla bilar som finns tillgängliga på Bilhjälpen'
        },
        {
          property: 'og:description',
          content: 'Alla bilar som finns tillgängliga på Bilhjälpen'
        }
      ]
    }
  },
  {
    path: '/bil/:model',
    name: Car,
    component: Car,
    meta: {
      title: 'Bil - Bilhjälpen'
    }
  },
  {
    path: '/om',
    name: 'Om',
    component: About,
    meta: {
      title: 'Om oss - Bilhjälpen',
      metaTags: [
        {
          name: 'description',
          content: 'Om Bilhjälpen'
        },
        {
          property: 'og:description',
          content: 'Om Bilhjälpen'
        }
      ]
    }
  },
  {
    path: '/404',
    name: 'Not found',
    component: NotFound,
    meta: {
      title: 'Bilhjälpen - Sidan kan inte hittas'
    }
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

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  //const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router
