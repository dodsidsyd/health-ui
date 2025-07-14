<template>
  <div class="participant-profile-wrap" :class="{ wating: wating }">
    <div class="img-box">
      <img :src="fullImagePath" alt="" />
    </div>
    <p class="user-name">{{ name }}</p>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = withDefaults(
  defineProps<{
    name: string
    src?: string
    wating?: boolean
  }>(),
  {
    src: 'img-profile.svg',
    wating: false
  }
)
const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})
</script>
<style lang="scss" scoped>
.participant-profile-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
  .img-box {
    width: 5.6rem;
    height: 5.6rem;
    flex-shrink: 0;
    img {
      border-radius: 50%;
    }
  }
  .user-name {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #555;
  }
  &.wating {
    opacity: 0.4;
  }
}
</style>
