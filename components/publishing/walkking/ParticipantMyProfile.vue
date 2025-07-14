<template>
  <div class="participant-profile-wrap">
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
  }>(),
  {
    src: 'img-profile.svg'
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
  .img-box {
    position: relative;
    width: 5.6rem;
    height: 5.6rem;
    flex-shrink: 0;
    img {
      outline: 0.3rem solid var(--blue-primary);
      border-radius: 50%;
    }
    &::after {
      content: '';
      position: absolute;
      top: -0.4rem;
      right: -0.4rem;
      width: 2.4rem;
      height: 2.4rem;
      background: url('~/assets/images/walkingking/ico-my-profile.png') center / 2.2rem no-repeat;
    }
  }
  .user-name {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #555;
  }
}
</style>
