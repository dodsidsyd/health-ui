<template>
  <div class="image-detail-wrap">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})

const props = defineProps({
  src: { type: String, default: 'img-profile.svg' },
  title: { type: String, default: '게시글 타이틀' },
  board: { type: String, default: '게시판명' },
  nickname: { type: String, default: '' },
  level: { type: Number, default: 0 },
  time: { type: Number, default: 1 },
  isFollowingInitial: { type: Boolean, default: false }
})
</script>

<style scoped lang="scss">
.image-detail-wrap {
  margin: 0 -2rem;
  :deep(swiper-slide) {
    border-radius: 0;
  }
}
</style>
