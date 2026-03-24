<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import TagsView from './components/TagsView.vue'

const settingsStore = useSettingsStore()

const classObj = computed(() => ({
  'sidebar-opened': settingsStore.sidebarOpened,
  'sidebar-closed': !settingsStore.sidebarOpened
}))
</script>

<template>
  <div class="app-wrapper" :class="classObj">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <Header class="navbar" />
      <TagsView />
      <div class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  &.sidebar-opened {
    .sidebar-container {
      width: 200px;
    }
  }

  &.sidebar-closed {
    .sidebar-container {
      width: 64px;
    }
  }
}

.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  background-color: #304156;
  transition: width 0.3s;
  z-index: 1001;
}

.main-container {
  min-height: 100%;
  margin-left: 200px;
  transition: margin-left 0.3s;
  position: relative;
}

.sidebar-closed .main-container {
  margin-left: 64px;
}

.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.app-main {
  min-height: calc(100vh - 60px - 34px);
  padding: 16px;
  background-color: #f0f2f5;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
