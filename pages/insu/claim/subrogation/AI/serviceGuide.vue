<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI분석 숨은 보상금 찾기"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="mt-24">
      <h1 class="c-tit">
        <span class="text">
          AI가 계약된 보험에서<br />숨은 보상금을 찾기 위해 고객님의<br />통원/입원 진료내역을 가져옵니다
        </span>
      </h1>
      <div class="c-tit-sub">MY병원의 최근 3년간 통원/입원 진료내역으로<br />AI가 추가 보상금 수령 가능성 유무를 분석해요.</div>
    </div>
    <img class="img-main" src="/assets/images/insu/ai/img-serviceGuide.png" alt="이미지:서비스 안내" />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="MY병원 진료내역 가져오기" class="lg w-full medium btn-sticky" @click="clickAgree" />
  </ButtonGroup>

  <BottomModal
    :is-visible="isShowAgreeModal"
    title="약관동의"
    :is-show-cancel-button="false"
    confirm-button-text="다음"
    @close="isShowAgreeModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <div class="wrap-agree">
        <div class="wrap-company">
          <div class="agree-tit">진료내역을 가져오기 위해 동의가 필요해요.</div>
        </div>
        <div class="wrap-agree-check">
          <Checkbox id="checkBox1" v-model="checkbox1" custom-style="button agree-all" aria-label="전체동의" />
          <ul class="agree-list">
            <li class="item" @click="showDetailTerm">
              <Checkbox id="checkBox2" v-model="checkbox2" custom-style="small non-border" aria-label="개인(신용)정보 수집 및 동의" />
              <i class="icon-arrow-right"></i>
            </li>
            <li class="item" @click="showDetailTerm">
              <Checkbox id="checkBox3" v-model="checkbox3" custom-style="small non-border" aria-label="민감정보(진료정보) 수집 및 이용 동의" />
              <i class="icon-arrow-right"></i>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </BottomModal>

  <FullModal
    :is-visible="isShowDetailTerm"
    title="보험사 약관 동의"
    :is-show-cancel-button="false"
    confirm-button-text="동의하기"
    @close="isShowDetailTerm = false"
    @confirm="clickAgreeTerm"
  >
    <template #content>
      <div class="wrap-agree-detail flex flex-col gap-10 pb-48">
        <div class="fz-14 semibold">1. 수집 · 이용에 관한 사항</div>
        <div class="agree-txt-box fz-14 flex flex-col gap-2">
          <div class="semibold">제1조(목적)</div>
          보험약관내용을 입력해주세요.
        </div>
        <div class="agree-txt-box fz-14 flex flex-col gap-2">
          <div class="semibold">제2조(용어의 정의)</div>
          본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          <ol class="num-type">
            <li>
              보험약관내용을 입력해주세요.
            </li>
            <li>
              보험약관내용을 입력해주세요.
            </li>
            <li>
              보험약관내용을 입력해주세요.
            </li>
          </ol>
        </div>
      </div>
    </template>
  </FullModal>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal, FullModal } from '@lemonhc/fo-ui/components/modal'
import Checkbox from '~/components/publishing/input/check.vue'

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: 'AI분석 숨은 보상금 찾기'
  // utils: ['phone']
  // customTitle: 'logo',
})

const isShowAgreeModal = ref(false)
const isShowDetailTerm = ref(false)

const clickAgree = () => {
  isShowAgreeModal.value = !isShowAgreeModal.value
}

const showDetailTerm = () => {
  isShowDetailTerm.value = !isShowDetailTerm.value
}

const clickAgreeTerm = () => {
  isShowDetailTerm.value = !isShowDetailTerm.value
}
const clickNext = () => {
  // 서류없이 청구
  return navigateTo('/insu/claim/inputDefaultInfoData')
  // // 사진찍어 청구 && 본인 방문
  // return navigateTo('/insu/claim/inputDefaultInfoData')
  // // 사진찍어 청구 && 최초청구일 경우: 가족 방문
  // return navigateTo('/insu/claim/picture/inputFamilyData')
}

const clickSignup = (type: string) => {
  // 설계사, 설계사 대리인에 따라 동의화면 이후 분기처리
  navigateTo('/insu/claim/subrogation/serviceNotInUse/term')
}
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

// 약관 동의 모달
.wrap-agree {
  .wrap-company {
    padding: 0 0.4rem;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    .logo {
      width: 5.6rem;
      height: auto;
    }
    .company {
      font-size: 1.6rem;
      font-weight: 700;
    }
    .agree-tit {
      font-size: 1.8rem;
      font-weight: 700;
    }
  }
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
