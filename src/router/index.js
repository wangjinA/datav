import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/datav',
    name: 'datav',
    component: () => import(/* webpackChunkName: "datav" */ '../views/datav/Datav')
  }
]

const router = new VueRouter({
  routes
})

export default router
