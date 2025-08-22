<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    :has-tel-btn="true"
    class="pb-36"
  >
    <div class="agree-wrap flex flex-col gap-10 pb-32 mt-24">
      <h1 class="c-tit">
        <span class="text"> 주민등록번호를 입력해 주세요 </span>
      </h1>
    </div>

    <InputRRN
      v-model="residentIdFront"
      label="주민등록번호"
      :back-value="residentIdBack"
      :readonly="true"
      :readonly-back="false"
      @update:back-value="residentIdBack = $event"
    />

    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="다음"
        class="lg w-full medium btn-sticky"
        @click="clickAgreeTerm"
      />
    </ButtonGroup>
  </BaseBody>
  <BottomModal
    :is-visible="isShowAgreeModal"
    title="자동청구 가능 병원을 찾기 위해
동의가 필요해요."
    :is-show-cancel-button="false"
    confirm-button-text="동의하고 다음"
    @close="isShowAgreeModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <AgreeToTerms v-model="terms" :terms-list="termsList" @show-detail-term="showDetailTerm"
    /></template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { ref } from 'vue'
import InputRRN from '~/components/publishing/input/InputRRN.vue'
import AgreeToTerms from '~/components/insu/AgreeToTerms.vue'
// 주민등록번호 입력 필드
const residentIdFront = ref('000101')
const residentIdBack = ref('')
const isShowAgreeModal = ref(false)

const termsList = [
  { key: 'term1', label: '고유식별정보 수집 및 이용 동의(의료기관용)' },
  { key: 'term2', label: '고유식별정보 수집 및 이용 동의(보험사용)' }
]

const terms = {
  all: false,
  term1: false,
  term2: false
}
const clickAgreeTerm = () => {
  isShowAgreeModal.value = !isShowAgreeModal.value
}
const showDetailTerm = () => {
  // isShowDetailTerm.value = !isShowDetailTerm.value
}
const clickNext = () => {
  return navigateTo('/insu/claim/auto/searchingHospitalClaim')
}
</script>

<style scoped lang="scss">
.wrap-agree-check {
  margin-top: 1.2rem;
  .agree-all {
    width: 100%;
  }
  .agree-list {
    padding: 1.2rem 1.6rem;
    .item {
      padding: 0.8rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-arrow-right {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
        background-size: 100%;
      }
    }
  }
}
.wrap-agree-detail {
  text-align: left;
  .agree-txt-box {
    ol.num-type {
      list-style: none;
      counter-reset: list-counter;
      padding-left: 0;
      margin: 0;

      li {
        counter-increment: list-counter;
        position: relative;
        padding-left: 2.4rem;
        margin-bottom: 0.8rem;
        line-height: 1.6;

        &::before {
          content: '(' counter(list-counter) ')';
          position: absolute;
          left: 0;
          top: 0;
          font-weight: 500;
          color: #333;
        }
      }
    }
  }
}
</style>
