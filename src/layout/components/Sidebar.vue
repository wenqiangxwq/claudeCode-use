<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouteRecordRaw } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

const route = useRoute()
const settingsStore = useSettingsStore()

const menuItems = computed(() => {
  const children = route.matched[0]?.children || []
  return children.filter((item: RouteRecordRaw) => item.meta?.title)
})

const activeMenu = computed(() => {
  return route.path
})
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-logo">
      <h1>Frontend-PC</h1>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="!settingsStore.sidebarOpened"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      router
    >
      <el-menu-item index="/dashboard">
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="system">
        <template #title>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/user">用户管理</el-menu-item>
        <el-menu-item index="/system/role">角色管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.sidebar-logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: #2b3a4a;

  h1 {
    color: #fff;
    font-size: 20px;
    margin: 0;
  }
}

.el-menu {
  border: none;
}

.el-menu-item,
:deep(.el-sub-menu__title) {
  &:hover {
    background-color: #263445 !important;
  }
}
</style>
