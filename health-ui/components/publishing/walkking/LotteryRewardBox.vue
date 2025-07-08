<template>
  <div class="lottery-reward-box">
    <div class="reward-img-box">
      <img :src="fullImagePath" alt="상품 이미지" />
    </div>
    <div>
      <h4 class="goods-tit">{{ title }}</h4>
      <p class="goods-info">{{ detail }}</p>
    </div>
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
  detail: { type: String, default: '' }
})
</script>
<style lang="scss" scoped>
.lottery-reward-box {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  padding: 1.6rem 1.2rem;
  background-color: #fff;
  border-radius: 2rem;
  text-align: center;
}
.reward-img-box {
  width: 8rem;
  height: 8rem;
  margin-bottom: 1.2rem;
}
.goods-tit {
  margin-bottom: 0.2rem;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 2rem;
}
.goods-info {
  font-size: 1.3rem;
  line-height: 1.8rem;
  color: #777;
}
</style>
