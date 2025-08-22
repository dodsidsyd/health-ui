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
      <span class="text" v-html="pageTitle"></span>
    </h1>
    <!-- computed 속성을 사용하여 동적으로 이미지 경로를 바인딩합니다. -->
    <img class="img-identification" :src="computedImageSrc" :alt="computedImageAlt" />
    <button type="button" class="btn-take-picture" @click="shotID"><i class="icon-camera"></i>{{ shotTxt }}</button>
    <div class="wrap-info-lists">
      <div class="item">반드시 본인의 신분증 앞면을 글씨가 잘 보이도록 촬영해 주세요.</div>
      <div class="item">빛이 반사 되거나 기타 이유로 신분증 내용 확인이 어려운 경우 재촬영 요구가 있을 수 있어요.</div>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="다음"
      class="lg w-full medium btn-sticky"
      @click="clickNext"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

// 촬영 상태 관리 ref
const isShot = ref(false)
const shotTxt = computed(() => (isShot.value ? '다시 촬영하기' : '촬영하기'))

const shotID = () => {
  isShot.value = !isShot.value
}

const route = useRoute()
const identificationType = route.query.type as string

const pageTitle = computed(() => {
  switch (identificationType) {
    case 'id':
      return `신분증을<br />촬영해 주세요.`
    case 'driver':
      return `운전면허증을<br />촬영해 주세요.`
    case 'passport':
      return `대한민국 여권을<br />촬영해 주세요.`
    default:
      return `신분증을<br />촬영해 주세요.`
  }
})

const computedImageSrc = computed(() => {
  if (isShot.value) {
    // 촬영 후 이미지
    return `/_nuxt/assets/images/insu/auto/img-id-test.png`
  }

  // 초기 이미지 (신분증 타입에 따라 분기)
  switch (identificationType) {
    case 'id':
      return `/_nuxt/assets/images/insu/auto/img-id.png`
    case 'driver':
      return `/_nuxt/assets/images/insu/auto/img-drive-licensing.png`
    case 'passport':
      return `/_nuxt/assets/images/insu/auto/img-passport.png`
    default:
      return `/_nuxt/assets/images/insu/auto/img-id.png`
  }
})

const computedImageAlt = computed(() => {
  if (isShot.value) {
    return `촬영된 이미지`
  }
  switch (identificationType) {
    case 'id':
      return `신분증 촬영`
    case 'driver':
      return `운전면허증 촬영`
    case 'passport':
      return `여권 촬영`
    default:
      return `신분증 촬영`
  }
})

const clickNext = () => {
  return navigateTo('/insu/claim/auto/selectClaimPrice')
}
</script>

<style scoped lang="scss">
.img-identification {
  margin-top: 3.2rem;
}
.btn-take-picture {
  @include mixin.flex-container(justify-center items-center);
  gap: 0.6rem;
  padding: 1.4rem 2rem;
  border-radius: 5rem;
  background-color: #4f5561;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  width: max-content;
  margin: 1.6rem auto 0;
  .icon-camera {
    display: inline-block;
    background: url('/assets/images/insu/auto/icon-camera.svg') no-repeat center center;
    background-size: contain;
    width: 2rem;
    height: 2rem;
  }
}
.wrap-info-lists {
  padding: 2rem 0;
  .item {
    text-align: left;
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    margin-top: 0.8rem;
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
