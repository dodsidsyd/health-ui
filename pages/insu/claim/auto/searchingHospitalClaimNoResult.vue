<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="wrap-empty">
      <img src="/assets/images/insu/icon-alert.svg" alt="병원 없음" class="img" />
      <div class="tit">자동청구 가능 병원이 없어요.</div>
      <div class="sut-tit">실손보험 자동청구 가능한 모둔 병원에<br />이미 자동청구 하고 있어요.</div>
      <Button btn-type="line" element-type="button" aria-label="자동청구 가능 병원 안내" class="xs w-auto pl-14 pr-14" />
      <div class="wrap-info-text">
        <i class="info" alt="info"></i>
        <div class="text">서류 필요없는 실손 청구는 청구의 신 앱에서 가능해요.</div>
      </div>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="청구의신 앱 설치하기" class="lg w-full medium btn-sticky" @click="clickNext" />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'


definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})

</script>

<style scoped lang="scss">
.wrap-empty {
  margin-top: 2rem;
  padding: 24rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%;
    color: #555555;
  }
  .sut-tit {
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 140%;
    color: #555;
    text-align: center;
  }
}
.wrap-info-text {
  position: fixed;
  left: 50%;
  bottom: 7rem;
  transform: translate(-50%, 0);
  width: 100%;
  // margin-top: 1.6rem;
  @include mixin.flex-container(justify-center items-center);
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
</style>
