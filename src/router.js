import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

import Dashboard from './views/Dashboard.vue'
import Products from '@/components/Products.vue'
import Orders from '@/components/Orders.vue'
import Coupons from '@/components/Coupon.vue'
import CustomerOrder from '@/components/CustomerOrder.vue'





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
        {
          path: 'coupons',
          name: 'coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
      ]
      },
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,      
        children: [
          {
            path: 'Customer_order',
            name: 'CustomerOrder',
            component: CustomerOrder,           
          }
        ]
      },
  ]
})
