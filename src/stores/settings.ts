import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const sidebarOpened = ref(true)
  const size = ref('default')

  function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value
  }

  function setSize(newSize: string) {
    size.value = newSize
  }

  return {
    sidebarOpened,
    size,
    toggleSidebar,
    setSize
  }
})
