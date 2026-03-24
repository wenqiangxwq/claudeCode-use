<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">{{ title }}</h2>
    </div>
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background: #fff;
  border-radius: 4px;
}

.page-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
}

.page-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.page-content {
  padding: 20px;
}
</style>
