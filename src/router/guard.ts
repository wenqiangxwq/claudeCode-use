import type { Router } from 'vue-router'
import { getToken } from '@/utils/storage'

export function setupRouterGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    const token = getToken()

    if (to.meta.requiresAuth) {
      if (token) {
        next()
      } else {
        next({ name: 'login', query: { redirect: to.fullPath } })
      }
    } else {
      next()
    }
  })

  router.afterEach((to) => {
    document.title = (to.meta.title as string) || 'Frontend-PC'
  })
}
