<template>
  <BaseBody
    :show-back-button="true"
    page-title="내 보험 정보"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="mt-24">
      <h1 class="c-tit">
        <span class="text">
          흩어져 있는 내 보험,<br />클릭 한번으로 모아보세요
        </span>
      </h1>
      <div class="c-tit-sub">금융 마이데이터를 통해 내 보험<br />가입내역과 납입 보험료를 확인해요.</div>
    </div>
    <img class="img-main" src="/assets/images/insu/ai/img-importGuide.png" alt="이미지:내 보험 가져오기 안내" />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="내 보험 가져오기" class="lg w-full medium btn-sticky" @click="clickAgree" />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '내 보험 정보'
  // utils: ['phone']
  // customTitle: 'logo',
})
</script>

<style scoped lang="scss">
.img-main {
  margin: 9.6rem auto 0;
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
