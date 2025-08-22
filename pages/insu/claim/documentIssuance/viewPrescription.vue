<template>
  <BaseBody
    page-title="처방전 보기"
    :show-back-button="true"
    style="background-color: #1f1f1f"
    :has-close-btn="true"
    :is-transparent="true"
    :has-add-text="false"
    :add-text-click-enabled="true"
    :white-logo="true"
    :page-type="'dark-bg'"
  >
    <div class="wrap-doc">
      <img class="img-doc" src="/assets/images/insu/subrogation/img-doc-insurance.png" alt="진단서 예시" />
    </div>
    <div class="wrap-btn-zoom">
      <button class="btn-minus">축소</button>
      <button class="btn-plus">확대</button>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="발급하기"
      class="lg w-full medium btn-sticky"
      @click="clickPayment"
    />
  </ButtonGroup>
  <BottomModal
    :is-visible="isShowPaymentModal"
    title="결제 방법을 선택해 주세요."
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    confirm-button-text="확인"
    @close="isShowPaymentModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <div class="wrap-pay-info">
        <div class="pay-text">총 결제 금액</div>
        <div class="pay-amount">456,789원</div>
      </div>
      <div class="wrap-btn-pay">
        <Button
          btn-type="line"
          element-type="button"
          aria-label="신용/체크카드"
          class="btn-card"
          icon="ico-card"
          :icon-size="24"
        />
        <Button
          btn-type="line"
          element-type="button"
          aria-label="네이버페이"
          class="btn-naver"
          icon="ico-naver"
          :icon-size="24"
        />
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowPaymentModal = ref(false)
const clickPayment = () => {
  isShowPaymentModal.value = !isShowPaymentModal.value
}
const clickNext = () => {
  // return navigateTo('/insu/')
}
</script>

<style scoped lang="scss">
.wrap-doc {
  margin: 0 -2rem;
  .img-doc {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 73vh;
  }
}
.wrap-btn-zoom {
  margin: 2.4rem 0 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  .btn-minus {
    background: url('/assets/images/insu/subrogation/icon-minus.svg') no-repeat center center;
    background-size: contain;
  }
  .btn-plus {
    background: url('/assets/images/insu/subrogation/icon-plus.svg') no-repeat center center;
    background-size: contain;
  }
  .btn-minus,
  .btn-plus {
    width: 4rem;
    height: 4rem;
    font-size: 0;
  }
}
.wrap-form {
  text-align-last: left;
  .c-input {
    &:not(:first-child) {
      margin-top: 1.6rem;
    }
  }
}
.wrap-pay-info {
  padding: 0.8rem 0;
  .pay-text {
    font-size: 1.8rem;
    font-weight: 500;
  }
  .pay-amount {
    margin-top: 0.4rem;
    font-size: 2.6rem;
    font-weight: 700;
    color: #4c7ff7;
  }
}
.wrap-btn-pay {
  margin: 1.6rem 0 2.4rem;
  @include mixin.flex-container(justify-between items-center);
  gap: 0.8rem;
}
</style>
