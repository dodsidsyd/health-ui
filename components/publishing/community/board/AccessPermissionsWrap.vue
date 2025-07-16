<template>
  <div class="has-no-permission">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  hasPermission: {
    type: Boolean,
    default: false // 기본값은 권한 없음
  }
})
</script>

<style scoped lang="scss">
.has-no-permission {
  height: calc(100vh - 7.6rem);
  margin: 0 -2rem;
  padding: 0 2rem;
  overflow: hidden;
}
</style>
