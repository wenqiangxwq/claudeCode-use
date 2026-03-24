import { defineStore } from 'pinia'
import { ref } from 'vue'
import { setToken, removeToken } from '@/utils/storage'

export interface UserInfo {
  id: string
  name: string
  avatar?: string
  roles: string[]
  permissions: string[]
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)

  function setUserToken(newToken: string) {
    token.value = newToken
    setToken(newToken)
  }

  function setUserInfo(info: UserInfo) {
    userInfo.value = info
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    removeToken()
  }

  return {
    token,
    userInfo,
    setUserToken,
    setUserInfo,
    logout
  }
})
