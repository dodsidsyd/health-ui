<template>
  <!-- 고정될 탭 영역 -->
  <div class="scrollable-content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.scrollable-content {
  position: relative;
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  margin: 0 -2rem;
}
</style>
