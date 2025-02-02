import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: HomeView,
    },
    {
      path: '/nodes',
      name: 'nodes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/NodesView.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'add',
          name: 'node-add',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/AddNodeView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/')
  } else {
    next()
  }
})

export default router
