<template>
  <div class="claim-gift-wrap">
    <div class="gift-detail-box">
      <img :src="imageName" alt="선물 이미지" />
      <div class="gift-detail-text">
        <span class="brand"> {{ brandName }}</span>
        <p class="gift-name">{{ giftName }}</p>
        <span class="type">{{ giftType }}</span>
      </div>
    </div>
    <InputNum unit-r="" placeholder="0" class="t-right" />
    <div class="mt-8">
      <InputText placeholder="받는사람 휴대폰 번호" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import InputText from '~/components/publishing/input/InputText.vue'
import InputNum from '~/components/publishing/input/InputNum.vue'
const props = defineProps({
  imageName: { type: String, default: '' },
  brandName: { type: String, default: '브랜드' },
  giftName: { type: String, default: '상품 이름' },
  giftType: { type: String, default: '상품 타입' }
})
</script>
<style scoped lang="scss">
.claim-gift-wrap {
  margin-top: 1.6rem;
  .gift-detail-box {
    display: flex;
    margin-bottom: 1.6rem;
    img {
      width: 8.8rem;
      height: 8.8rem;
    }
    .gift-detail-text {
      margin-left: 2rem;
      text-align: left;
    }
  }
  .brand {
    display: inline-block;
    background: #e9ecef;
    padding: 0.3rem 0.6rem;
    border-radius: 0.3rem;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
  .gift-name {
    margin-top: 0.6rem;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.2rem;
  }
  .type {
    display: inline-block;
    margin-top: 1.2rem;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.2rem;
  }
}
</style>
