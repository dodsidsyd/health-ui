<template>
  <div class="store-item-wrap">
    <slot></slot>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.store-item-wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  justify-items: center;
  padding-bottom: 4.8rem;
}
</style>
