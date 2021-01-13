import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/datav/:id',
    name: 'datav',
    component: () => import(/* webpackChunkName: "datav" */ '../views/datav/Datav')
  },
  {
    path: '/preview/:id',
    name: 'preview',
    component: () => import(/* webpackChunkName: "preview" */ '../views/preview/Preview')
  }, {
    path: '/workspace',
    name: 'workspace',
    component: () => import(/* webpackChunkName: "workspace" */ '../views/workspace/Workspace.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  }, {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '../views/test.vue')
  },
]

const router = new VueRouter({
  routes
})



router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (to.path.includes("login") && token) {
    next('/workspace')
  } else if (!to.path.includes("login") && !token) {
    next('/login')
  } else {
    next()
  }
});

export default router
