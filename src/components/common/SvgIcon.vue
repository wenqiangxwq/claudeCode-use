<script setup lang="ts">
defineProps<{
  name: string
  size?: number
}>()
</script>

<template>
  <svg
    class="svg-icon"
    :style="{ width: `${size || 16}px`, height: `${size || 16}px` }"
    aria-hidden="true"
  >
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
  fill: currentColor;
}
</style>
