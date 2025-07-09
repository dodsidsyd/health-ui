<template>
  <div class="common-card">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// 별도의 props가 필요하다면 여기에 추가하세요
</script>

<style scoped>
.common-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 24px;
  margin: 16px 0;
  transition: box-shadow 0.2s;
}
.common-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
</style>
