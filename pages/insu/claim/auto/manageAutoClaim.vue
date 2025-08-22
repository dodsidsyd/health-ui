<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <h1 class="c-tit mt-24">
      <span class="text">
        내 자동청구 정보
      </span>
    </h1>
    <div class="c-tit-sub">자동청구일 : 매월 9일, 19일, 20일
      <div class="icon" @click="toggleTooltip">
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10.5V6.75M10 13.2795V13.3125M17.5 10.5C17.5 14.6421 14.1421 18 10 18C5.85786 18 2.5 14.6421 2.5 10.5C2.5 6.35786 5.85786 3 10 3C14.1421 3 17.5 6.35786 17.5 10.5Z" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="tooltip" v-show="isTooltipOpen">
          <button type="button" class="c-tooltip-close-btn" aria-label="닫기" @click.stop="closeTooltip"></button>
          <div class="text">청구일이 주말/공휴일인 경우 그다음날 청구돼요.</div>
        </div>
      </div>
    </div>
    <div class="wrap-myinsurance-info">
      <div class="item">
        <div class="tit">청구 보험사</div>
        <div class="desc">DB손해보험</div>
      </div>
      <div class="item">
        <div class="tit">지급계좌</div>
        <div class="desc">국민은행(이레몬)<br />1324567897897</div>
      </div>
    </div>
    <hr class="hr-section ml-n20 mr-n20 mb-10" />
    <div class="wrap-insurance-info-list">
      <div class="item">
        <div class="wrap-item-header">
          <div class="wrap-item-info">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="logo" />
            <div class="name">경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원</div>
          </div>
          <Button btn-type="primary" element-type="button" aria-label="해지하기" class="xs" :width="8" @click="clickConfirmModal" />
        </div>
      </div>
      <div class="item">
        <div class="wrap-item-header">
          <div class="wrap-item-info">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="logo" />
            <div class="name">경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원</div>
          </div>
          <Button btn-type="primary" element-type="button" aria-label="해지하기" class="xs" :width="8" @click="clickConfirmModal" />
        </div>
      </div>
      <div class="item">
        <div class="wrap-item-header">
          <div class="wrap-item-info">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="logo" />
            <div class="name">경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원</div>
          </div>
          <Button btn-type="primary" element-type="button" aria-label="해지하기" class="xs" :width="8" @click="clickConfirmModal" />
        </div>
      </div>
    </div>
    <button class="btn-unsubscribe" @click="unsubscribeModal">
      자동청구 서비스 해지
      <i class="icon-arrow-right"></i>
    </button>
    <div class="wrap-alert">고려학교 안암병원<br />실손보험 자동청구가 해지되었어요.</div>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'

const clickConfirmModal = async () => {
  const modalContent = `
    <div style="display: flex; flex-direction: column; gap: 1rem; text-align: center">
      <div style="color: #555555;text-align: left;">고려대학교 안암병원에<br />실손보험 자동청구를 그만하시겠어요?</div>
    </div>`
  await ConfirmModal.open({
    isVisible: true,
    html: modalContent,
    title: '안내',
    confirmButtonText: '해지하기'
  })
}
const unsubscribeModal = async () => {
  const modalContent = `
    <div style="display: flex; flex-direction: column; gap: 1rem; text-align: center">
      <div style="color: #555555;text-align: left;">서비스를 해지 하시면 등록한 병원에 더이상<br />실손보험 자동청구를 하지 않아요.</div>
    </div>`
  await ConfirmModal.open({
    isVisible: true,
    html: modalContent,
    title: '자동청구 서비스 해지',
    confirmButtonText: '해지하기'
  })
}
definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: 'AI분석 숨은 보상금 찾기'
  // utils: ['phone']
  // customTitle: 'logo',
})

const isTooltipOpen = ref(false)
const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value
}

const closeTooltip = () => {
  isTooltipOpen.value = false
}


const clickNext = () => {
  // 서류없이 청구
  return navigateTo('/insu/claim/inputDefaultInfoData')
  // // 사진찍어 청구 && 본인 방문
  // return navigateTo('/insu/claim/inputDefaultInfoData')
  // // 사진찍어 청구 && 최초청구일 경우: 가족 방문
  // return navigateTo('/insu/claim/picture/inputFamilyData')
}

</script>

<style scoped lang="scss">
.c-tit-sub {
  align-items: flex-end;
  .icon {
    margin-bottom: 0.3rem;
  }
}
.wrap-insurance-info-list {
  .item {
    padding: 1.6rem 0.4rem;
    &:not(:first-child) {
      border-top: 0.1rem solid #EEEEEE;
    }
    .wrap-item-header {
      @include mixin.flex-container(justify-between items-center);
      gap: 0.4rem;
      .wrap-item-info {
        @include mixin.flex-container(items-center);
        gap: 1.6rem;
        flex: 1;
        min-width: 0;
        .name {
          font-weight: 700;
          flex: 1;
          min-width: 0;
          max-width: 100%;
          @include mixin.ellipsis;
        }
      }
    }
  }
}
.wrap-myinsurance-info {
  margin: 1.6rem 0 3.2rem;
  padding: 2rem;
  border-radius: 1.2rem;
  border: 0.1rem solid #E2E2E2;
  .item {
    @include mixin.flex-container(justify-between);
    &:not(:first-child) {
      margin-top: 1.6rem;
    }
    .tit {
      margin-left: 0.4rem;
      font-size: 1.4rem;
      color: #555555;
    }
    .desc {
      margin-right: 0.4rem;
      font-weight: 500;
      text-align: right;
    }
  }
}
.btn-unsubscribe {
  margin-top: 2.4rem;
  font-size: 1.4rem;
  color: #555555;
  @include mixin.flex-container(justify-center items-center);
  gap: 0.2rem;  
  .icon-arrow-right {
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
    background-size: 100%;
  }
}
.wrap-alert {
  padding: 1.5rem 2rem;
  width: calc(100% - 4rem);
  text-align: center;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  border-radius: 1.2rem;
  background: var(--Semantic-Background-BG-Dimmed, #000000B2);
}
</style>
