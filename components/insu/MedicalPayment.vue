<template>
  <div class="medical-payment-box">
    <div class="payment-info">
      <div v-for="paymentInfo in paymentInfos" :key="paymentInfo.id" class="payment-info-item">
        <span class="tit">{{ paymentInfo.title }}</span>
        <span class="price">{{ paymentInfo.price.toLocaleString() }}원</span>
      </div>
    </div>
    <div class="payment-total">
      <strong>총 결제금액</strong>
      <strong>{{ totalPrice.toLocaleString() }}원</strong>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  paymentInfos: {
    type: Array as PropType<{ id: number; title: string; price: number }[]>,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.medical-payment-box {
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e2e2;
  border-radius: 1.2rem;
  background: #fff;
  padding: 2rem;
  .payment-info {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .payment-info-item {
    display: flex;
    justify-content: space-between;
    .tit {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
      color: #959595;
    }
    .price {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
    }
  }
  .payment-total {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e2e2;
    strong {
      line-height: 2.2rem;
    }
  }
}
</style>
