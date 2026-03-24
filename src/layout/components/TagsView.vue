<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const visitedViews = ref<{ path: string; title: string }[]>([])

const isActive = (path: string) => {
  return route.path === path
}

const addView = () => {
  const { path, meta } = route
  if (path && !visitedViews.value.some((v) => v.path === path)) {
    visitedViews.value.push({
      path,
      title: (meta.title as string) || '未命名'
    })
  }
}

const closeView = (path: string) => {
  const index = visitedViews.value.findIndex((v) => v.path === path)
  visitedViews.value.splice(index, 1)
  if (isActive(path)) {
    const last = visitedViews.value[index - 1]
    router.push(last?.path || '/dashboard')
  }
}

addView()
</script>

<template>
  <div class="tags-view">
    <router-link
      v-for="view in visitedViews"
      :key="view.path"
      :to="view.path"
      class="tags-view-item"
      :class="{ active: isActive(view.path) }"
    >
      {{ view.title }}
      <span class="el-icon-close" @click.prevent="closeView(view.path)">
        <svg viewBox="0 0 1024 1024" width="12" height="12">
          <path
            fill="currentColor"
            d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 1 0 45.12-45.12L557.12 512l252.288-252.352a31.936 31.936 0 0 0-45.12-45.184z"
          />
        </svg>
      </span>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.tags-view {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  display: flex;
  align-items: center;
  padding: 0 10px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 0;
  }
}

.tags-view-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495057;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  border-radius: 2px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 5px;
  }

  &.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;

    &::before {
      content: '';
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 2px;
    }
  }
}

.el-icon-close {
  margin-left: 5px;
  border-radius: 50%;
  text-align: center;

  &:hover {
    background-color: #b4bccc;
    color: #fff;
  }
}
</style>
