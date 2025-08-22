<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-tel-btn="true"
    class="pb-60"
  >
    <h1 class="c-tit mt-24">
      <span class="text"> 자동청구 할 진료비를<br />설정해 주세요. </span>
    </h1>
    <div class="wrap-info-text">
      <i class="info" alt="info"></i>
      <div class="text">설정한 금액 미만은 자동청구 진행하지 않아요</div>
    </div>

    <Select
      label="자동청구 진료비"
      modal-title="자동청구 진료비"
      select-placeholder="선택"
      :is-show-cancel-btn="false"
      :custom-opts="[
        { value: '1천원 이상', label: '1천원 이상' },
        { value: '5천원 이상', label: '5천원 이상' },
        { value: '1만원 이상', label: '1만원 이상' },
        { value: '1만5천원 이상', label: '1만5천원 이상' },
        { value: '2만원 이상', label: '2만원 이상' },
        { value: '2만5천원 이상', label: '2만5천원 이상' }
      ]"
      @change="clickNext"
    />
    <h3 class="tit-info mt-32">실손보험 가입 시기별 자기 부담금</h3>
    <div class="wrap-info-lists">
      <div class="item">2009년 9월 이전 : 자기부담금 5천원 (동원의료 비와 약제비를 합한 금액)</div>
      <div class="item">2009년 9월 이후 ~ 2017년 4월 이전 : 자기부담 금 8천원</div>
      <div class="item">2017년 4월 이후 : 2가지 공제방식 중 공제액이 큰 금액을 뺀 나머지 실손 보상</div>
    </div>
    <h3 class="tit-info">예시) 약제비 30,000원일 경우</h3>
    <div class="wrap-info-lists">
      <div class="item">2009년 9월 이전 가입자 : 30,000원 - 자기부담금 5,000원 = 25,000원 실촌 보상</div>
      <div class="item">2009년 9월 이후 2017년 4월 이전 가입자 : 30,000원• 자기부담금 8,000원= 22,000원 실손 보상</div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Select from '~/components/publishing/input/Select.vue'

const clickNext = () => {
  return navigateTo('/insu/claim/auto/selectRetroactivePeriod')
}
</script>

<style scoped lang="scss">
.wrap-info-text {
  margin-top: 1.6rem;
  margin-bottom: 3.2rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  .info {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
  .text {
    font-size: 1.4rem;
    font-weight: 500;
    color: #959595;
  }
}
.tit-info {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.2rem;
}
.wrap-info-lists {
  padding: 1rem 0;
  + .tit-info {
    margin-top: 1.2rem;
  }
  .item {
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    &:not(:first-child) {
      margin-top: 0.6rem;
    }
    & > span {
      color: #4c7ff7;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
}
</style>
