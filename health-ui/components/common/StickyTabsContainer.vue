<template>
  <!-- 스크롤 될 영역 -->
  <div class="sticky-tabs-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.sticky-tabs-container {
  position: sticky;
  top: 5.6rem; // c-header 높이만큼 떨어진 위치에 고정
  z-index: 90; // header보다 낮은 z-index
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
