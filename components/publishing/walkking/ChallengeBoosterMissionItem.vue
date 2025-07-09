<template>
  <div class="challenge-mission-item-wrap">
    <div class="flex align-center">
      <div class="mission-img-box">
        <img :src="fullImagePath" alt="미션 관련 이미지" />
      </div>
      <div class="mission-txt-box">
        <span>{{ subtit }}</span>
        <p>{{ mission }}</p>
      </div>
    </div>
    <div class="button-box">
      <Button btn-type="primary" element-type="button" class="xs auto-height" :width="8" :disabled="disabled">
        <span class="reward-condition">{{ condition }}</span
        >{{ reward }}</Button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})

const props = defineProps({
  src: { type: String, default: '' },
  subtit: { type: String, default: '' },
  mission: { type: String, default: '' },
  condition: { type: String, default: '' },
  reward: { type: String, default: '' },
  disabled: { type: Boolean, defult: false }
})
</script>
<style lang="scss" scoped>
.challenge-mission-item-wrap {
  display: flex;
  align-items: center;
  .mission-img-box {
    width: 6.4rem;
    height: 6.4rem;
  }
  .mission-txt-box {
    display: flex;
    flex-direction: column;
    margin-left: 1.2rem;
    text-align: left;
    span {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2rem;
    }
    p {
      margin-top: 0.2rem;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 2.2rem;
    }
  }
  .button-box {
    margin-left: auto;
  }
  .reward-condition {
    font-size: 1.1rem;
    line-height: 2rem;
  }
  .auto-height {
    height: auto;
    max-height: 4.6rem;
    padding: 0.8rem 0;
    line-height: 2rem;
  }
}
</style>
