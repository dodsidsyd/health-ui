<template>
  <div class="team-profile-wrap">
    <p class="label">대표이미지</p>
    <div class="img-box">
      <img :src="fullImagePath" alt="팀 프로필 대표이미지" />
      <button v-if="modify" class="del-image"></button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = withDefaults(
  defineProps<{
    src?: string
    modify?: boolean
  }>(),
  {
    src: 'img-profile.svg',
    modify: false
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
.team-profile-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  .img-box {
    position: relative;
    width: 8rem;
    height: 8rem;
    background-color: #eee;
    border-radius: 0.8rem;
  }
}
.label {
  margin-bottom: 0.6rem;
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: #555;
}
.del-image {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z' fill='%232B2B2B'/%3E%3Cpath d='M15.5265 7.41809C15.8211 7.17778 16.2558 7.19524 16.5304 7.46984C16.805 7.74445 16.8225 8.17917 16.5821 8.47375L16.5304 8.53039L13.0607 12.0001L16.5304 15.4698L16.5821 15.5265C16.8225 15.8211 16.805 16.2558 16.5304 16.5304C16.2558 16.805 15.8211 16.8225 15.5265 16.5821L15.4698 16.5304L12.0001 13.0607L8.53039 16.5304C8.2375 16.8233 7.76274 16.8233 7.46984 16.5304C7.17695 16.2375 7.17695 15.7627 7.46984 15.4698L10.9396 12.0001L7.46984 8.53039L7.41809 8.47375C7.17778 8.17917 7.19524 7.74445 7.46984 7.46984C7.74445 7.19524 8.17917 7.17778 8.47375 7.41809L8.53039 7.46984L12.0001 10.9396L15.4698 7.46984L15.5265 7.41809Z' fill='white'/%3E%3C/svg%3E");
}
</style>
