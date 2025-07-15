<template>
  <div class="attached-wrap">
    <slot></slot>
  </div>
  <p class="count-box">
    <span class="file-count">{{ currentCount }}</span
    >/{{ maxCount }}
  </p>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  currentCount: number
  maxCount: number
}>()
</script>

<style scoped lang="scss">
.attached-wrap {
  background-color: #f4f4f4;
  border-radius: 1.2rem;
  overflow: hidden;
}
.count-box {
  margin-top: 0.8rem;
  text-align: right;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
  color: #959595;
  .file-count {
    color: var(--blue-primary);
  }
}
</style>
