<template>
  <div :class="['shadow-card', cardClass]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    cardClass?: string
  }>(),
  {
    cardClass: ''
  }
)
</script>
<style lang="scss" scoped>
.shadow-card {
  overflow: hidden;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
}
</style>
