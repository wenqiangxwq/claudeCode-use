import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

export function useAuth() {
  const userStore = useUserStore()

  const permissions = computed(() => userStore.userInfo?.permissions || [])
  const roles = computed(() => userStore.userInfo?.roles || [])

  function hasPermission(permission: string | string[]): boolean {
    if (Array.isArray(permission)) {
      return permission.some((p) => permissions.value.includes(p))
    }
    return permissions.value.includes(permission)
  }

  function hasRole(role: string | string[]): boolean {
    if (Array.isArray(role)) {
      return role.some((r) => roles.value.includes(r))
    }
    return roles.value.includes(role)
  }

  return {
    permissions,
    roles,
    hasPermission,
    hasRole
  }
}
