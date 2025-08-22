<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    :has-tel-btn="true"
    class="pb-36"
  >
    <h1 class="c-tit mt-24">
      <span class="text"> 서비스 가입을 위해<br />약관에 동의해 주세요. </span>
    </h1>
    <div class="wrap-agree-check">
      <Checkbox id="checkBox1" v-model="checkbox1" custom-style="button agree-all" aria-label="약관전체 동의" />
      <ul class="agree-list">
        <li class="item" @click="showDetailTerm">
          <Checkbox
            id="checkBox2"
            v-model="checkbox2"
            custom-style="small non-border"
            aria-label="[필수] 실손보험 자동청구 서비스 이용 약관"
          />
          <i class="icon-arrow-right"></i>
        </li>
        <li class="item" @click="showDetailTerm">
          <Checkbox
            id="checkBox3"
            v-model="checkbox3"
            custom-style="small non-border"
            aria-label="[필수] 개인(신용)정보 수집 및 이용 동의"
          />
          <i class="icon-arrow-right"></i>
        </li>
        <li class="item" @click="showDetailTerm">
          <Checkbox
            id="checkBox4"
            v-model="checkbox4"
            custom-style="small non-border"
            aria-label="[필수] 민감정보(진료정보) 수집 및 이용 동의"
          />
          <i class="icon-arrow-right"></i>
        </li>
        <li class="item" @click="showDetailTerm">
          <Checkbox
            id="checkBox5"
            v-model="checkbox5"
            custom-style="small non-border"
            aria-label="[필수] 민감정보(진료정보] 제3자 제공 동의"
          />
          <i class="icon-arrow-right"></i>
        </li>
        <li class="item" @click="showDetailTerm">
          <Checkbox
            id="checkBox6"
            v-model="checkbox6"
            custom-style="small non-border"
            aria-label="[필수] 진료기록 열람 및 사본발급 동의ㆍ위임"
          />
          <i class="icon-arrow-right"></i>
        </li>
        <li class="item" @click="showDetailTerm">
          <Checkbox
            id="checkBox7"
            v-model="checkbox7"
            custom-style="small non-border"
            aria-label="[선택] 마케팅 정보 활용 동의"
          />
          <i class="icon-arrow-right"></i>
        </li>
      </ul>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="동의하고 다음"
      class="lg w-full medium btn-sticky"
      @click="clickBottomModal"
    />
  </ButtonGroup>
  <BottomModal
    title="사용할 본인 서명 입력"
    :is-visible="isShowBottomModal"
    :is-show-cancel-button="false"
    v-bind="bottomModalProps"
    @cancel="clickCancel"
    @confirm="clickConfirm"
    @close="toggleBottomModal"
  >
    <template #content>
      <!-- ToDo: 터치 시작하면 .wrap-sign에 .active 추가  -->
      <div class="wrap-sign active">
        <button class="btn-cancel">
          <i class="icon ico-cancel"></i>
        </button>
        <div class="text">손가락으로 직접<br />여기에 서명해 주세요.</div>
      </div>
    </template>
  </BottomModal>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowBottomModal = ref(false)
const checkbox1 = ref(false)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(false)
const checkbox5 = ref(false)
const checkbox6 = ref(false)
const checkbox7 = ref(false)

const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}
</script>
<style lang="scss" scoped>
.wrap-agree-check {
  margin-top: 3.2rem;
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
.wrap-sign {
  margin-top: 1.6rem;
  background-color: #f4f4f4;
  border: 0.1rem solid #e2e2e2;
  border-radius: 0.8rem;
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &.active {
    background-color: #fff;
    .btn-cancel {
      display: flex;
    }
    .text {
      display: none;
    }
  }
  .text {
    text-align: center;
    font-weight: 500;
    color: #959595;
  }
  .btn-cancel {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    width: 2.4rem;
    height: 2.4rem;
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .ico-cancel {
      width: 2.4rem;
      height: 2.4rem;
      background: url('/assets/images/insu/subrogation/icon-round-cancel.svg') no-repeat center center;
      background-size: 100%;
    }
  }
}
</style>
