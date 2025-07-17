<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구 안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="mt-24">
      <h1 class="c-tit">
        <span class="text">
          보험금 청구 <strong>1건당 50원?</strong><br />구독 서비스로 해결!
        </span>
      </h1>
      <div class="c-tit-sub">구독 가입으로 무제한으로 청구 서비스<br />이용하고 인슈어링크(커뮤니티)에서<br />보험 영업을 더 스마트하게!</div>
    </div>
    <img class="img-main" src="/assets/images/insu/subrogation/img-signup-main.png" alt="이미지:서비스 안내" />
    <div class="wrap-info-text">
      <i class="info" alt="info"></i>
      <div class="text">전송결과는 카카오 알림톡으도로 안내해 드립니다.</div>
    </div>
    <Button btn-type="primary" element-type="button" aria-label="설계사 가입하기" class="sm" @click="clickSignup('consultant')" />
    <Button btn-type="primary" element-type="button" aria-label="설계사 대리인 가입하기" class="sm grey" @click="clickSignup('agent')" />
    <div class="claim-info">보험 설계사 및 대리인의 개인정보는 보험사로 전달되지않으며, 청구의 편의를 위해서만 사용됩니다.</div>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})

const clickSignup = (type: string) => {
  // 설계사, 설계사 대리인에 따라 동의화면 이후 분기처리
  navigateTo('/insu/claim/subrogation/serviceNotInUse/term')
}
</script>

<style scoped lang="scss">
.img-main {
  margin: 3.7rem auto 0;
  width: 23rem;
}
.wrap-info-text {
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
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
.c-btn {
  margin-top: 1.6rem;
  &.grey {
    background-color: #555555;
  }
  &:not(:first-of-type) {
    margin-top: 0.8rem;
  }
}
.claim-info {
  margin-top: 3.6rem;
  padding-left: 1rem;
  font-weight: 1.4rem;
  color: #555555;
  position: relative;
  &::before {
    content: '';
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    background-color:#959595;
    position: absolute;
    top: 1rem;
    left: 0rem;
  }
}
</style>
