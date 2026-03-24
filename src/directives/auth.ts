import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '@/stores/user'

interface AuthDirectiveBinding {
  value?: string | string[]
  modifiers: {
    disabled?: boolean
  }
}

export const auth: Directive = {
  mounted(el: HTMLElement, binding: AuthDirectiveBinding) {
    const { value } = binding
    const userStore = useUserStore()
    const permissions = userStore.userInfo?.permissions || []

    if (Array.isArray(value)) {
      const hasPermission = value.some((v) => permissions.includes(v))
      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    } else if (value) {
      if (!permissions.includes(value)) {
        el.parentNode?.removeChild(el)
      }
    }
  }
}

export const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string[]>) {
    const { value } = binding
    const userStore = useUserStore()
    const permissions = userStore.userInfo?.permissions || []

    if (value.length && !value.some((v) => permissions.includes(v))) {
      el.style.display = 'none'
    }
  }
}
