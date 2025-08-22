<template>
  <div class="header-section">
    <img class="img-complete" src="/assets/images/insu/subrogation/img-completed.png" alt="" />
    <h2 class="title" v-html="title"></h2>
    <p v-if="description" class="description" v-html="description"></p>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<style lang="scss" scoped>
.header-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 3.2rem;
  text-align: center;
  .title {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.1rem;
  }
  .description {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.2rem;
    color: #555;
  }
  .img-complete {
    width: 12.8rem;
    height: auto;
    margin: 0 auto;
  }
}
</style>
