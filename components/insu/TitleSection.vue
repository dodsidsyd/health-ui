<template>
  <div class="header-section">
    <h2 class="title" v-html="title"></h2>
    <p class="description" v-if="description" v-html="description"></p>
    <slot name="content"> </slot>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<style lang="scss" scoped>
.header-section {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  .title {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.1rem;
  }
  .description {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.5rem;
    color: #555;
  }
  .service-help {
    display: flex;
    gap: 0.4rem;
    .icon {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
