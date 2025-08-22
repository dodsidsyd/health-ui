<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-52"
  >
    <div class="mt-24">
      <h1 class="c-tit">
        <span class="text"> 놓치기 쉬운 실손 보험금<br />간편하게 자동청구 하세요 </span>
      </h1>
      <div class="c-tit-sub">
        통원 진료 후 보험금청구서와 필요한 서류들을 가입 보험사로 자동 전달해 간편하게 실손보험금을 청구 할 수 있어요.
      </div>
      <div class="wrap-info-text">
        <i class="info" alt="info"></i>
        <div class="text">입원 진료비 자동청구는 아직 준비중이에요.</div>
      </div>
    </div>
    <img class="img-main" src="/assets/images/insu/auto/img-submain.svg" alt="이미지:자동청구" />
    <Button
      btn-type="secondary"
      element-type="button"
      aria-label="자동청구 가능 병원 안내"
      class="xs ml-auto mr-auto medium"
      :width="16.7"
      @click="clickSignup('consultant')"
    />
    <button class="btn-alert" @click="clickNagative">
      <div class="wrap-alert">
        <label for="warn" class="label-warn">알아두세요!</label>
        <div class="text">자동청구 신청이 어려운 보험사가 있어요.</div>
      </div>
      <i class="icon-arrow-right"></i>
    </button>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="실손보험 자동청구 신청하기"
      class="lg w-full medium btn-sticky"
      @click="requsetForIssuance"
    />
  </ButtonGroup>
  <BottomModal
    :is-visible="isShowSortModal"
    title="자동청구 신청 불가 보험사 안내"
    :is-show-cancel-button="false"
    confirm-button-text="동의하고 다음"
    @close="isShowSortModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <div class="wrap-insurance-list">
        <button
          v-for="(insurance, index) in insuranceList"
          :key="index"
          class="item"
          :class="{ checked: insurance.checked }"
          @click="clickInsurance(index)"
        >
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance">{{ insurance.name }}</div>
        </button>
      </div>
      <div class="wrap-info-lists">
        <div class="item">빠른 시일내 서비스 이용 가능하도록 준비하겠습니다.</div>
      </div>
    </template>
  </BottomModal>
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

// 보험사 목록 데이터
const insuranceList = ref([
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false }
])
const isShowSortModal = ref(false)
const clickNagative = () => {
  isShowSortModal.value = !isShowSortModal.value
}

const clickInsurance = (index: number) => {
  insuranceList.value[index].checked = !insuranceList.value[index].checked
}

const clickNext = () => {
  // 다음 단계로 이동하는 로직
  console.log('다음 단계로 이동')
}

const clickSignup = (type: string) => {
  navigateTo('/insu/claim/auto/hospitalsOfferAutomaticBilling4Guide')
}
const requsetForIssuance = () => {
  navigateTo('/insu/claim/auto/agreement')
}
</script>

<style scoped lang="scss">
.img-main {
  margin: 6.4rem auto 0;
  width: 23rem;
}
.wrap-info-text {
  margin-top: 1.6rem;
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
.c-btn {
  margin-top: 1.6rem;
  &.grey {
    background-color: #555555;
  }
  &:not(:first-of-type) {
    margin-top: 0.8rem;
  }
}
.btn-alert {
  margin-top: auto;
  @include mixin.flex-container(justify-between items-center);
  .wrap-alert {
    @include mixin.flex-container(items-center);
    gap: 0.8rem;
    .label-warn {
      font-size: 1.2rem;
      font-weight: 500;
      color: #ca2828;
      padding: 0.3rem 0.6rem;
      border-radius: 0.4rem;
      background-color: #ffe7e7;
    }
    .text {
      font-size: 1.3rem;
      font-weight: 500;
      color: #555555;
    }
  }
  .icon-arrow-right {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-arrow-right.svg') center center no-repeat;
    background-size: contain;
  }
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
    border: 0.1rem solid #f9f9f9;
    &:active,
    &.checked {
      border: 0.1rem solid #555555;
      // border: 0.1rem solid red;
      // background: red;
    }
    .logo-insurance {
      width: 4rem;
      height: 4rem;
    }
    .name-insurance {
      font-size: 1.4rem;
      font-weight: 500;
      color: #2b2b2b;
    }
  }
}
.wrap-info-lists {
  margin-top: 0.8rem;
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
