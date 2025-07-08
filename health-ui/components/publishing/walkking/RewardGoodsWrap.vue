<template>
  <div
    class="reward-goods-wrap"
    :class="{
      gold: props.type === '1st',
      silver: props.type === '2nd',
      copper: props.type === '3rd'
    }"
  >
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
  detail: { type: String, default: '' },
  type: {
    type: String,
    default: '',
    validator: (value: string) => {
      return ['1st', '2nd', '3rd', 'etc'].includes(value)
    }
  }
})
</script>
<style lang="scss" scoped>
.reward-goods-wrap {
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.6rem 2.4rem 1.6rem 4rem;
  border-radius: 1.2rem;
  border: 0.1rem solid #eee;
  background: #fff;
  &::before {
    content: '';
    position: absolute;
    top: -0.5rem;
    left: 1rem;
    width: 4.8rem;
    height: 4.8rem;
    background-position: center;
    background-size: 4.8rem;
    background-repeat: no-repeat;
  }
  &.gold {
    background: #e7f4ff;
    border-color: #e7f4ff;
    &::before {
      background-image: url('~/assets/images/walkingking/img-1st.svg');
    }
  }
  &.silver {
    &::before {
      background-image: url('~/assets/images/walkingking/img-2nd.svg');
    }
  }
  &.copper {
    &::before {
      background-image: url('~/assets/images/walkingking/img-3rd.svg');
    }
  }
  .goods-tit {
    margin-bottom: 0.2rem;
    font-weight: 700;
    font-size: 1.8rem;
  }
  .goods-info {
    width: 14.1rem;
    font-size: 1.4rem;
    color: #555;
  }
}
.reward-img-box {
  width: 13.2rem;
  margin-right: 1.6rem;
}
</style>
