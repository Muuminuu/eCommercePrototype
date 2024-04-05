import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import sitemap from '../data/routesList.json'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    alias: ['/homepage'],
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  }
]
sitemap.forEach(el => {
  let newRoute = setRoute(el)
  routes.push(newRoute)
});

function sanitizeRoutePath(path) {
  return path[0] != '/' ? '/' + path : path
}

function setRoute(el, level = null) {
  let newRoute = {
    path: sanitizeRoutePath(el.path),
    component: () => import(/* @vite-ignore */ `../views/${el.component}`),
    name: el.name,
    props: { name: el.name, uuid: el.uuid },
    meta: el.meta ? el.meta : null,
    prams: el.params ? el.params : null,
    query: el.query ? el.query : null,
    hash: el.hash ? el.hash : null,
    sensitive: el.sensitive ? el.sensitive : false,
    strict: el.strict ? el.strict : false,
    alias: el.alias ? el.alias : [],
    redirect: el.redirect ? el.redirect : null
  }
  if (level == null) {
    newRoute.children = el.children ? getChildrenData(el.children) : null
  }
  return newRoute
}

function getChildrenData(children) {
  const childrenArray = []
  children.forEach(el => {
    let childRoute = setRoute(el, 'children')
    childrenArray.push(childRoute)
  })
  return childrenArray
}







const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // },
    // {
    //   path: '/products',
    //   name: 'products',
    //   component: () => import('../views/ProductsView.vue')
    // },
    // {
    //   path: '/cart',
    //   name: 'cart',
    //   component: () => import('../views/CartView.vue')
    // }
  routes: routes,
})

export default router
