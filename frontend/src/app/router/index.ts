import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: () => import('@/pages/notes/NotesPage.vue'),
    },
  ],
})

export default router
