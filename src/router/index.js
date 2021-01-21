import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const adminMenu = [{
  path: 'error-logs',
  name: 'error-logs',
  component: () => import(/* webpackChunkName: "error-logs" */ '../views/admin/error-logs.vue'),
  meta: {
    menuName: '错误日志',
  },
}, {
  path: 'user-manage',
  name: 'user-manage',
  component: () => import(/* webpackChunkName: "user-manage" */ '../views/admin/user-manage.vue'),
  meta: {
    menuName: '用户管理',
  },
}]

const routes = [
  {
    path: '*',
    component: () => import(/* webpackChunkName: "404" */ '../views/errorPage/404')
  }, {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '../views/test.vue')
  },
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
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/error-logs',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/admin-main.vue'),
    children: adminMenu
  }
]

const router = new VueRouter({
  routes
})
console.log('router');


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
