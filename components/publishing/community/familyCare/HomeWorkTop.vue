<template>
  <section class="homework-top">
    <h2 class="tit">{{ title }}</h2>
    <p class="duration-date">{{ duration }}</p>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  duration: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.homework-top {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem 0;
  .tit {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2b2b2b;
  }
  .duration-date {
    font-size: 1.4rem;
    font-weight: 500;
    color: #959595;
  }
}
</style>
