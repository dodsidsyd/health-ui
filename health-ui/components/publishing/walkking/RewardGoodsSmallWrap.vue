<template>
  <div class="reward-goods-wrap">
    <div class="reward-img-box">
      <img :src="fullImagePath" alt="상품 이미지" />
    </div>
    <div>
      <span class="rank-badge">{{ rank }}</span>
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
  detail: { type: String, default: '' },
  rank: { type: String, default: '' }
})
</script>
<style lang="scss" scoped>
.reward-goods-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1.6rem 0;
  border-radius: 1.2rem;
  border: 0.1rem solid #eee;
  background: #fff;
  text-align: center;
  .goods-tit {
    margin-bottom: 0.2rem;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2rem;
  }
  .goods-info {
    font-size: 1.3rem;
    line-height: 1.8rem;
    color: #777;
  }
}
.rank-badge {
  display: inline-block;
  margin-bottom: 0.6rem;
  padding: 0.2rem 1.2rem;
  background: #5a5a5a;
  border-radius: 4.8rem;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.7rem;
  color: #fff;
}
.reward-img-box {
  width: 8rem;
  height: 8rem;
  margin-bottom: 1.2rem;
}
</style>
