<template>
  <BaseBody :show-back-button="true" page-title="환전 상세내역" logo-type="text">
    <PointDetailItem title="처리상태" status="standby" />
    <PointDetailItem title="환전요청일시" main-text="2025-06-15 16:18:24" />
    <PointDetailItem
      title="입금계좌정보"
      main-text="국민 1548954481567"
      sub-text="홍길동"
      link-text="계좌정보 변경하기"
      link-url="/account/edit"
      type="account"
    />
    <PointDetailItem title="환전요청 포인트" main-text="16,200P" />
    <PointDetailItem title="환전수수료" main-text="- 1,620P" />

    <!-- 예상 환전금액 -->
    <div class="estimated-price">
      <dl class="detail-item">
        <dt class="title">예상환전금액</dt>
        <dd class="price">14,580원</dd>
      </dl>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import PointDetailItem from '~/components/publishing/point/PointDetailItem.vue'
</script>

<style scoped lang="scss">
.estimated-price {
  border-radius: 0.8rem;
  border: 0.1rem solid vars.$blue-primary;
  padding: 0.7rem 1.6rem;
  background: #f6f9ff;
  margin-top: 1.6rem;
}
.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 1.2rem 0;
  flex-direction: row;
  .title {
    font-size: 1.6rem;
    color: #555;
    font-weight: 500;
    margin: 0;
  }
  .price {
    font-size: 1.6rem;
    font-weight: 700;
    color: vars.$blue-primary;
  }
}
</style>
