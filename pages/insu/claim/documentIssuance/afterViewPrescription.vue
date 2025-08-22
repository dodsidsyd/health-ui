<template>
  <BaseBody
    page-title="처방전 보기"
    :show-back-button="true"
    style="background-color: #1f1f1f"
    :has-close-btn="true"
    :is-transparent="true"
    :has-add-text="false"
    :add-text-click-enabled="true"
    :white-logo="true"
    :page-type="'dark-bg'"
  >
    <div class="wrap-doc">
      <img class="img-doc" src="/assets/images/insu/subrogation/img-doc-insurance.png" alt="진단서 예시" />
    </div>
    <div class="wrap-btn-zoom">
      <button class="btn-minus">축소</button>
      <button class="btn-plus">확대</button>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed half">
    <Button
      btn-type="secondary"
      element-type="button"
      aria-label="다운로드"
      class="lg medium btn-sticky"
      @click="clickDownload"
    />
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="제3자 공유"
      class="lg medium btn-sticky"
      @click="clickSetPassword"
    />
  </ButtonGroup>
  <BottomModal
    :is-visible="isShowSortModal"
    title="처방전 비밀번호 설정"
    :is-show-cancel-button="true"
    cancel-button-text="닫기"
    :confirm-button-text="modalConfirmText"
    :disabled-confirm-button="!checkbox01 && (!password || !passwordConfirm)"
    @close="isShowSortModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <div class="wrap-form">
        <InputText
          v-model="password"
          type="password"
          label="비밀번호"
          :is-valid="false"
          valid-text="비밀번호는 숫자 4자 이상 10자 이하로 입력해 주세요"
          placeholder="비밀번호를 입력해 주세요"
        />
        <InputText
          v-model="passwordConfirm"
          type="password"
          label="비밀번호 확인"
          :is-valid="false"
          valid-text="비밀번번호가 일치하지 않아요"
          placeholder="비밀번호 확인"
        />
        <Checkbox id="checkBox01" v-model="checkbox01" aria-label="비밀번호 설정하지 않음" class="mt-12" />
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import InputText from '~/components/publishing/input/InputText.vue'
import Checkbox from '~/components/publishing/input/check.vue'
const password = ref('')
const passwordConfirm = ref('')
const checkbox01 = ref(false)
const isShowSortModal = ref(false)
const modalConfirmText = ref('')
const clickDownload = () => {
  password.value = ''
  passwordConfirm.value = ''
  checkbox01.value = false
  isShowSortModal.value = !isShowSortModal.value
  modalConfirmText.value = '다운로드'
}
const clickSetPassword = () => {
  password.value = ''
  passwordConfirm.value = ''
  checkbox01.value = false
  isShowSortModal.value = !isShowSortModal.value
  modalConfirmText.value = '제3자 공유'
}
const clickNext = () => {
  // return navigateTo('/insu/')
}
</script>

<style scoped lang="scss">
.wrap-doc {
  margin: 0 -2rem;
  .img-doc {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 73vh;
  }
}
.wrap-btn-zoom {
  margin: 2.4rem 0 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  .btn-minus {
    background: url('/assets/images/insu/subrogation/icon-minus.svg') no-repeat center center;
    background-size: contain;
  }
  .btn-plus {
    background: url('/assets/images/insu/subrogation/icon-plus.svg') no-repeat center center;
    background-size: contain;
  }
  .btn-minus,
  .btn-plus {
    width: 4rem;
    height: 4rem;
    font-size: 0;
  }
}
.wrap-form {
  text-align-last: left;
  .c-input {
    &:not(:first-child) {
      margin-top: 1.6rem;
    }
  }
}
</style>
