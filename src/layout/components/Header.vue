<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const settingsStore = useSettingsStore()
const userStore = useUserStore()

function handleCommand(command: string) {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger
        :is-active="settingsStore.sidebarOpened"
        class="hamburger"
        @toggle-click="settingsStore.toggleSidebar"
      />
    </div>
    <div class="right-menu">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <span class="user-name">管理员</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import Hamburger from './Hamburger.vue'

export default defineComponent({
  components: { ArrowDown, Hamburger }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.left-menu {
  display: flex;
  align-items: center;
}

.hamburger {
  cursor: pointer;
}

.right-menu {
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.user-name {
  margin-right: 8px;
}
</style>
