<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <h2>다녀온 병원을 검색해 주세요</h2>
      <div style="text-align: right" @click="clickPrescription">약제비만 청구</div>
      <div style="display: flex; justify-content: space-between">
        <input
          style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
          placeholder="병원 이름을 입렵해 주세요"
        />
      </div>

      <div>
        <div style="display: flex; justify-content: space-between">
          <div>최근검색</div>
          <div>전체삭제</div>
        </div>

        <button
          class="c-btn outline gray xl"
          style="display: flex; flex-direction: column; margin-bottom: 3px"
          @click="clickHospital"
        >
          <span style="display: inline-block">강남세브란스병원</span>
          <span style="display: block">서울특별시 강남구 도곡1동 연주로211</span>
        </button>
        <button class="c-btn outline gray xl" style="display: flex; flex-direction: column" @click="clickHospital">
          <span style="display: block">베스트산부인과의원</span>
          <span style="display: block">서울특별시 강남구 도곡1동 연주로211</span>
        </button>
      </div>
    </div>
  </BaseBody>

  <BottomModal
    :is-visible="isShowModal"
    title="누가 병원에 다녀왔나요?"
    :is-show-cancel-button="false"
    confirm-button-text="확인"
    @close="closeModal"
    @confirm="clickConfirm"
  >
    <template #content>
      <div v-if="!isSelectPrescription" style="display: flex; gap: 1rem">
        <div style="padding: 2rem; border: 1px solid gainsboro; border-radius: 10px" @click="selectVisitor('self')">
          본인 방문
        </div>
        <div style="padding: 2rem; border: 1px solid gainsboro; border-radius: 10px" @click="selectVisitor('family')">
          가족 방문
        </div>
      </div>
      <div v-else style="border-radius: 10px; background-color: gainsboro; padding: 1rem; text-align: left">
        <div style="font-weight: bold">약제비 청구를 하시려면 미리 준비해주세요.</div>
        <div>병원 발급 처방전</div>
        <div>약국 발급 약제비 영수증(약봉투)</div>
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowModal = ref(false)
const isSelectPrescription = ref(false)

const clickPrescription = () => {
  isSelectPrescription.value = true
  isShowModal.value = true
}

const clickConfirm = () => {
  // 주민등록번호 입력 페이지로 이동
  return navigateTo('/insu/claim/inputResidentRegistrationNumber')
}

const clickHospital = () => {
  isSelectPrescription.value = false
  isShowModal.value = true
}

const selectVisitor = (type: string) => {
  //
}

const closeModal = () => {
  isSelectPrescription.value = false
  isShowModal.value = false
}
</script>

<style scoped lang="scss"></style>
