<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="agree-wrap flex flex-col gap-10 mt-24">
      <h1 class="c-tit">
        <span class="text"> 보험사를 선택해주세요. </span>
      </h1>
    </div>
    <FlexSection>
      <h2 class="section-tit mt-32">내 보험</h2>
      <div class="wrap-insurance-list">
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해DB손</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해DB손해손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
      </div>
    </FlexSection>
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <FlexSection>
      <RoundTabs :tabs="roundTabs" :active-key="activeRoundTab" @tab-change="onRoundTabChange" />
      <div class="wrap-insurance-list">
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
        <button class="item">
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance" @click="clickInsurance">DB손해</div>
        </button>
      </div>
    </FlexSection>
  </BaseBody>
  <BottomModal
    :is-visible="isShowAgreeModal"
    title="보험사 약관 동의"
    :is-show-cancel-button="false"
    confirm-button-text="다음"
    @close="isShowAgreeModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <div class="wrap-agree">
        <div class="wrap-company">
          <img class="logo" src="/assets/images/insu/logo_kbbank.svg" alt="KB은행" />
          <div class="company">KB손해보험</div>
        </div>
        <div class="wrap-agree-check">
          <Checkbox id="checkBox1" v-model="checkbox1" custom-style="button agree-all" aria-label="약관전체 동의" />
          <ul class="agree-list">
            <li class="item" @click="showDetailTerm">
              <Checkbox
                id="checkBox2"
                v-model="checkbox2"
                custom-style="small non-border"
                aria-label="수집 · 이용에 관한 사항"
              />
              <i class="icon-arrow-right"></i>
            </li>
            <li class="item" @click="showDetailTerm">
              <Checkbox
                id="checkBox3"
                v-model="checkbox3"
                custom-style="small non-border"
                aria-label="국내 제공에 관한 사항"
              />
              <i class="icon-arrow-right"></i>
            </li>
            <li class="item" @click="showDetailTerm">
              <Checkbox
                id="checkBox4"
                v-model="checkbox4"
                custom-style="small non-border"
                aria-label="국외 제3자 제공에 관한 사항"
              />
              <i class="icon-arrow-right"></i>
            </li>
            <li class="item" @click="showDetailTerm">
              <Checkbox
                id="checkBox5"
                v-model="checkbox5"
                custom-style="small non-border"
                aria-label="조회에 관한 사항"
              />
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
            <li>보험약관내용을 입력해주세요.</li>
            <li>보험약관내용을 입력해주세요.</li>
            <li>보험약관내용을 입력해주세요.</li>
          </ol>
        </div>
      </div>
    </template>
  </FullModal>
</template>

<script setup lang="ts">
import { /*ConfirmModal*/ BottomModal, FullModal } from '@lemonhc/fo-ui/components/modal'
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import RoundTabs, { type RoundTab } from '~/components/tabbar/RoundTabs.vue'
import Checkbox from '~/components/publishing/input/check.vue'

const checkbox1 = ref(false)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(false)
const checkbox5 = ref(false)

// RoundTabs 상태 관리
const activeRoundTab = ref('option1')
// RoundTabs 데이터
const roundTabs = ref<RoundTab[]>([
  { title: '손해보험', key: 'option1' },
  { title: '생명보험', key: 'option2' }
])

// RoundTabs 이벤트 핸들러
const onRoundTabChange = (key: string) => {
  activeRoundTab.value = key
  console.log('Round tab 1 changed to:', key)
}

const isShowAgreeModal = ref(false)
const isShowDetailTerm = ref(false)

const clickInsurance = () => {
  isShowAgreeModal.value = !isShowAgreeModal.value
}

const showDetailTerm = () => {
  isShowDetailTerm.value = !isShowDetailTerm.value
}

const clickAgreeTerm = () => {
  isShowDetailTerm.value = !isShowDetailTerm.value
}

const toggleFullModal = () => {
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
</script>

<style scoped lang="scss">
.section-tit {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2b2b2b;
}
.wrap-insurance-list {
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-columns: auto;
  gap: 0.8rem;
  .item {
    padding: 1.8rem 1.6rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    border-radius: 0.8rem;
    background-color: #f9f9f9;
    .logo-insurance {
      width: 4rem;
      height: 4rem;
    }
    .name-insurance {
      font-size: 1.4rem;
      font-weight: 500;
      color: #2b2b2b;
      word-break: break-all;
    }
  }
}
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
