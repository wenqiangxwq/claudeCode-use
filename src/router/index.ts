import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { staticRoutes } from './routes/static'
import { setupRouterGuard } from './guard'

const routes: RouteRecordRaw[] = [...staticRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_API),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

setupRouterGuard(router)

export default router

