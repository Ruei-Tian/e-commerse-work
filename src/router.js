import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

import Dashboard from './views/Dashboard.vue'
import Products from '@/components/Products.vue'
import Orders from '@/components/Orders.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      //避免空白頁面
      path: '*',
      redirect: 'login'
    },   
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,      
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
      ]
    }
  ]
})
