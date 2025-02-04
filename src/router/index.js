import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/IndexView.vue'
import { useUserSession } from '@/stores/userSession'

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
    },
    {
      path: '/nodes/add',
      name: 'node-add',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AddNodeView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userSession = useUserSession()
  if (to.meta.requiresAuth && !userSession.isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
