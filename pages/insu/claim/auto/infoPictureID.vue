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
      <span class="text"> 신분증을<br />준비해 주세요. </span>
    </h1>
    <div class="c-tit-sub">청구의신에서 실손보험을 청구하시려면<br />관련 법규에 의거, 고객님의 신분증이 필요해요.</div>

    <div class="wrap-identification">
      <div class="item" @click="goToTakePicturePage('id')">
        <div class="wrap-item-tit">
          <img src="/assets/images/insu/auto/icon-id.svg" alt="신분증" />
          <div class="text">주민등록증</div>
        </div>
        <i class="icon-arrow-right"></i>
      </div>
      <div class="item" @click="goToTakePicturePage('driver')">
        <div class="wrap-item-tit">
          <img src="/assets/images/insu/auto/icon-drive-licensing.svg" alt="운전면허증" />
          <div class="text">운전면허증</div>
        </div>
        <i class="icon-arrow-right"></i>
      </div>
      <div class="item" @click="goToTakePicturePage('passport')">
        <div class="wrap-item-tit">
          <img src="/assets/images/insu/auto/icon-passport.svg" alt="여권" />
          <div class="text">한국 여권</div>
        </div>
        <i class="icon-arrow-right"></i>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'

const goToTakePicturePage = (type: string) => {
  navigateTo({
    path: '/insu/claim/auto/takePictureID', // 다음 페이지 경로
    query: { type: type } // 'type'이라는 쿼리 파라미터에 값을 담아 전달
  })
}
</script>

<style scoped lang="scss">
.wrap-identification {
  margin-top: 3.2rem;
  .item {
    padding: 1.6rem 0.4rem;
    @include mixin.flex-container(justify-between items-center);
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
    }
    .wrap-item-tit {
      @include mixin.flex-container(items-center);
      gap: 1.2rem;
      .text {
        font-weight: 700;
      }
    }
    .icon-arrow-right {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
      background-size: contain;
    }
  }
}
</style>
