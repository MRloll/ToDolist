import { createRouter, createWebHistory } from 'vue-router'
import ToDo from '../views/to-do.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ToDo
    }
  ]
})

export default router
