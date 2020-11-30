import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/datav/:id',
    name: 'datav',
    component: () => import(/* webpackChunkName: "datav" */ '../views/datav/Datav')
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import(/* webpackChunkName: "preview" */ '../views/preview/Preview')
  }, {
    path: '/workspace',
    name: 'workspace',
    component: () => import(/* webpackChunkName: "workspace" */ '../views/workspace/Workspace.vue')
  }, {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '../views/test.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
