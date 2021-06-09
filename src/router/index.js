import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Authorization',
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/reg',
    name: 'Registration',
    component: () => import('../views/Reg.vue')
  },
  {
    path: '/info',
    name: 'InfoForUsers',
    component: () => import('../views/InfoUser.vue')
  },
  {
    path: '/info/admin',
    name: 'InfoForAdmin',
    component: () => import('../views/InfoAdmin.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
