import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = newRoutes
  }

  function setDynamicRoutes(newRoutes: RouteRecordRaw[]) {
    dynamicRoutes.value = newRoutes
  }

  function reset() {
    routes.value = []
    dynamicRoutes.value = []
  }

  return {
    routes,
    dynamicRoutes,
    setRoutes,
    setDynamicRoutes,
    reset
  }
})
