import Vue from 'vue'
import VueRouter from 'vue-router'
import authenticated from '@/util'
import Login from '@/views/Login'
import Home from '@/views/Home'

Vue.use(VueRouter)

const checkAuth = async (to, from, next) => {
  try {
    if (await authenticated()) next()
    else next({
      path: '/login',
      replace: true
    })
  } catch (error) {
    console.error(error.message)
    next({
      path: '/login',
      replace: true
    })
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: checkAuth,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
