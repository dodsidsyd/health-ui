<template>
  <div class="mobile-coupon-box" @click="handleClick">
    <img :src="imageName" alt="모바일 쿠폰 이미지" />
    <div class="txt-box">
      <p class="coupon-brand">{{ brand }}</p>
      <p class="coupon-name">{{ name }}</p>
      <p class="coupon-point">{{ point }}P</p>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  imageName: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  point: {
    type: String,
    default: '0'
  }
})

const emits = defineEmits(['buttonClick'])
const handleClick = () => {
  emits('buttonClick')
}
</script>
<style scoped lang="scss">
.mobile-coupon-box {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  img {
    display: block;
    width: 100%;
    max-width: 30rem;
    height: auto;
  }
  .txt-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    margin-top: 1.6rem;
    .coupon-brand {
      color: #555;
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 1.6rem;
    }
    .coupon-name {
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 2rem;
    }
    .coupon-point {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
    }
  }
}
</style>
