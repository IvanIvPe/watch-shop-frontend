import { createRouter, createWebHistory } from 'vue-router'
import CartView from '@/views/CartView.vue'
import WatchView from '@/views/WatchView.vue'
import LoginView from '@/views/LoginView.vue'
import UserView from '../views/UserView.vue'
import RegisterView from '@/views/RegisterView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/watch'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/watch',
      name: 'watch',
      component: WatchView
     },
    
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {  path: '/register', 
       name: 'register',
       component: RegisterView }
  ]
})

export default router
