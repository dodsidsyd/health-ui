<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    :has-tel-btn="true"
    class="pb-60"
  >
    <h1 class="c-tit mt-24 mb-32">
      <span class="text"> 문자로 전송된<br />인증번호 6자리를 입력해 주세요. </span>
    </h1>
    <FlexSection class="gap-12">
      <FlexColDiv class="gap-6">
        <InputTimer label="인증번호 입력" error-message="인증번호를 다시 확인해 주세요." />
        <nuxt-link
          to="/insu/claim/auto/checkIdMessageInfo"
          title="인증문자 확인 안내 페이지로 이동"
          class="wrap-info-text"
        >
          <i class="info" alt="info"></i>
          <div class="text">인증 번호를 받지 못했나요?</div>
          <i class="icon-arrow-right" alt="arrow-right"></i>
        </nuxt-link>
      </FlexColDiv>
      <InputPhone label="휴대폰 번호" :button-text="'재전송'" />
      <InputRRNGender />
      <InputText label="이름" :is-valid="true" valid-text="이름을 입력해주세요." placeholder="이름을 입력해 주세요." />
    </FlexSection>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="확인"
      class="lg btn-sticky w-full"
      @click="clickNext"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import InputPhone from '~/components/publishing/input/InputPhone.vue'
import InputTimer from '~/components/publishing/input/InputTimer.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import InputRRNGender from '~/components/publishing/input/InputRRNGender.vue'
const clickNext = () => {
  return navigateTo('/insu/claim/auto/inputIdentification')
}
</script>

<style scoped lang="scss">
.wrap-info-text {
  display: flex;
  justify-content: flex-end;
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
  .icon-arrow-right {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7.50008 5.83203L11.6667 9.9987L7.50008 14.1654' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: contain;
  }
}
</style>
