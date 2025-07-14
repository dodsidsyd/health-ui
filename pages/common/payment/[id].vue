<template>
  <BaseBody :show-back-button="true" page-title="결제 상세내역" logo-type="text">
    <div class="payment-detail pb-56">
      <DetailItem title="주문상품" type="" text="승인완료" />
      <DetailItem title="결제금액" type="" text="50,000원" />
      <!-- 카드결제일때 카드사 텍스트 추가 -->
      <DetailItem title="결제수단" type="card" text="KB국민" />
      <DetailItem title="결제수단" type="toss" text="" />
      <DetailItem title="결제수단" type="kakao" text="" />
      <DetailItem title="결제수단" type="naver" text="" />
      <DetailItem title="결제수단" type="mobile" text="" />
      <DetailItem title="결제일시" type="" text="2025. 04.12" />
      <DetailItem title="승인결과" type="" text="승인완료" />
      <div class="btn-wrap fixed">
        <Button btn-type="primary" element-type="button" aria-label="결제취소" disabled class="lg w-full medium" />
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import DetailItem from '~/components/publishing/payment/DetailItem.vue'

import Button from '~/components/publishing/button/Button.vue'
</script>

<style scoped lang="scss">
.btn-wrap {
  &.fixed {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .c-btn {
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>
