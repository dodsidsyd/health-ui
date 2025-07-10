<template>
  <NuxtLink :to="link" :class="['news-item', isColLink ? 'col' : '']">
    <div v-if="isShowImg" class="img"><img :src="fullImagePath" alt="" /></div>
    <span class="new-cate">{{ newsCate }}</span>
    <p class="new-text">{{ newsText }}</p>
  </NuxtLink>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    link?: string
    isShowImg?: boolean
    src: string
    newsCate: string
    newsText: string
    isColLink?: boolean | ''
  }>(),
  {
    link: '#',
    isShowImg: false,
    isColLink: false
  }
)

import { computed } from 'vue'

const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})
</script>
<style lang="scss" scoped>
.news-item {
  display: flex;
  &.col {
    flex: 1;
    flex-direction: column;
    padding-bottom: 2rem;
    .new-cate {
      & + .new-text {
        margin-top: 0.4rem;
      }
    }
    .new-text {
      flex: 1;
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
  &:not(.col) {
    gap: 0.6rem;
    padding: 2.4rem 0;
    border-top: 1px solid #eee;
    .new-text {
      flex: 1;
      @include mixin.ellipsis;
    }
  }
  .img {
    width: 100%;
    overflow: hidden;
    margin-bottom: 1.2rem;
    border-radius: 1.2rem;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .new-cate {
    font-size: 1.4rem;
    font-weight: 500;
    color: #4c7ff7;
  }
  .new-text {
    font-weight: 500;
  }
}
</style>
