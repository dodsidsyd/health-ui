<template>
  <BaseBody>
    <h2>보험사를 선택해 주세요</h2>
    내 보험
    <div style="display: flex; gap: 1rem; margin-bottom: 1rem">
      <button class="c-btn xl" @click="clickInsurance">DB손해</button>
      <button class="c-btn xl" @click="clickInsurance">DB손해</button>
      <button class="c-btn xl" @click="clickInsurance">DB손해</button>
    </div>

    <hr />

    <div style="margin-top: 1rem">
      <div style="display: flex">
        <div style="border: 1px solid gray; padding: 1rem">손해보험</div>
        <div style="border: 1px solid gray; padding: 1rem">생명보험</div>
      </div>

      <div style="display: flex; gap: 1rem; margin-bottom: 1rem; margin-top: 1rem">
        <button class="c-btn xl" @click="clickInsurance">DB손해</button>
        <button class="c-btn xl" @click="clickInsurance">DB손해</button>
        <button class="c-btn xl" @click="clickInsurance">DB손해</button>
      </div>
    </div>
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
      <div>KB 손해보험</div>
      <div>약관전체 동의</div>
      <div @click="showDetailTerm">수정.이용에 관한 사항 ></div>
      <div @click="showDetailTerm">국내 제공에 관한 사항 ></div>
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
      <div>
        <span>1. 수집.이용에 관한 사항</span>
        <span>제1조(목적)</span>
        <span>보험약관내용..........................</span>
      </div>
    </template>
  </FullModal>
</template>

<script setup lang="ts">
import { /*ConfirmModal*/ BottomModal, FullModal } from '@lemonhc/fo-ui/components/modal'
import BaseBody from '~/components/layout/BaseBody.vue'

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

const clickNext = () => {
  // 서류없이 청구
  return navigateTo('/insu/claim/inputDefaultInfoData')
  // // 사진찍어 청구 && 본인 방문
  // return navigateTo('/insu/claim/inputDefaultInfoData')
  // // 사진찍어 청구 && 최초청구일 경우: 가족 방문
  // return navigateTo('/insu/claim/picture/inputFamilyData')
}
</script>

<style scoped lang="scss"></style>
