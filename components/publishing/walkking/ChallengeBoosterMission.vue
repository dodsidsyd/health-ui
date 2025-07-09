<template>
  <div class="challenge-mission-wrap">
    <div class="flex align-center">
      <div class="mission-img-box">
        <img :src="fullImagePath" alt="미션 관련 이미지" />
      </div>
      <div class="ml-12">
        <h4 class="mission-tit">{{ title }}</h4>
        <p class="mission-info">{{ detail }}</p>
      </div>
    </div>
    <span class="steps-bonus">{{ steps }}</span>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const IMAGE_BASE_PATH = '/_nuxt/assets/images/walkingking/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})

const props = defineProps({
  src: { type: String, default: '' },
  title: { type: String, default: '' },
  detail: { type: String, default: '' },
  steps: { type: String, default: '' }
})
</script>
<style lang="scss" scoped>
.challenge-mission-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  padding: 2rem;
  background: #fff;
  border: 0.1rem solid #eee;
  border-radius: 2rem;
}
.mission-img-box {
  width: 6.4rem;
  height: 6.4rem;
}
.mission-tit {
  margin-bottom: 0.2rem;
  font-weight: 700;
  line-height: 2.2rem;
}
.mission-info {
  font-size: 1.4rem;
  line-height: 2rem;
  color: #555;
}
.steps-bonus {
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
  color: var(--blue-primary);
}
</style>
