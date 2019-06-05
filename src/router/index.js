import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login', // 登录
      component: () => import(/* webpackChunkName: "login" */ '../pages/login.vue')
    },
    {
      path: '/logout',
      name: 'logout', // 注销
      component: () => import(/* webpackChunkName: "logout" */ '../pages/logout.vue')
    }
  ]
})
