<template>
  <div class="used-item-wrap">
    <div class="img-box">
      <img :src="fullImagePath" alt="아이템 이미지" />
    </div>
    <div class="summary-box">
      <h5 class="time">59 : 47<span>남음</span></h5>
      <div class="flex align-center">
        <p class="steps">{{ steps }}걸음x{{ multiply }}</p>
        <p class="stacked-steps">누적 {{ 2464 }} 걸음</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = withDefaults(
  defineProps<{
    steps: string
    multiply: number
    stacked: string
    src?: string
    count?: string
  }>(),
  {
    src: 'walkingking/img-used-item.png',
    count: '+'
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
<style scoped lang="scss">
.used-item-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 1.6rem;
  padding: 2.4rem;
  gap: 1.6rem;
  border-radius: 2rem;
  border: 0.2rem solid #00f7c5;
  background: #283940;
  .img-box {
    width: 6.8rem;
    height: 6.8rem;
  }
  .summary-box {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
    color: #fff;
    text-align: left;
    .time {
      margin-bottom: 0.4rem;
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 2.9rem;
      color: #00f7c5;
      span {
        margin-left: 1.2rem;
        color: #fff;
        font-size: 1.4rem;
        font-weight: 500;
      }
    }
    .steps {
      position: relative;
      margin-right: 1.2rem;
      padding-right: 1.2rem;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 0.1rem;
        height: 1.2rem;
        background: rgba(255, 255, 255, 0.4);
      }
    }
  }
}
</style>
