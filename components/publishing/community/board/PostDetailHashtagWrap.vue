<template>
  <div class="post-detail-hashtag-wrap">
    <span v-for="(tag, index) in hashtags" :key="index" class="hashtag-item">
      {{ tag }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  hashtags: {
    type: Array as () => string[],
    required: false,
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.post-detail-hashtag-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 3.2rem 0;
  .hashtag-item {
    padding: 0.8rem 1.6rem;
    background-color: #ddeec2;
    border-radius: 1.8rem;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #56761f;
    white-space: nowrap;
  }
}
</style>
