<template>
  <NuxtLink to="#" :class="['news-item', isColLink ? 'col' : '']">
    <div v-if="isShowImg" class="img"><img :src="fullImagePath" alt="" /></div>
    <span>{{ newsCate }}</span>
    <p>{{ newsText }}</p>
  </NuxtLink>
</template>
<script setup lang="ts">
import { computed, defineProps } from 'vue'

const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})

const props = withDefaults(
  defineProps<{
    isShowImg?: boolean
    src: string
    newsCate: string
    newsText: string
    isColLink?: boolean
  }>(),
  {
    isShowImg: false,
    isColLink: false
  }
)
</script>
<style lang="scss" scoped>
.news-item {
  display: flex;
}
</style>
