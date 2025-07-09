<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <div style="padding: 1rem; background-color: #b0b0b0; border-radius: 10px">KB손해보험</div>

      <div style="display: flex; flex-direction: column; border: 1px solid #888888; padding: 1rem; border-radius: 10px">
        <div style="display: flex; justify-content: space-between">
          <h3>청구내용</h3>
          <button class="c-btn" style="width: 30%">청구서보기</button>
        </div>
        <hr />

        <div style="display: flex; flex-direction: column; gap: 1rem">
          <div style="display: flex; justify-content: space-between">
            <div>청구일</div>
            <div>2025.04.01</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>피보험자(치료 받은 분)</div>
            <div>김레몬</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>수익자(보험금을 받을 분)</div>
            <div>이헬스</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>사고유형</div>
            <div>질병</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>보험금 수령계좌</div>
            <div>국민은행(이헬스) 134544646546546541</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>보상안애 연락처</div>
            <div>박미란(설계사) 010-1111-2222</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>첨부서류</div>
            <button class="c-btn outline" style="width: 10%" @click="toggleAttachFilesModal">상세보기</button>
          </div>
        </div>
      </div>
    </div>
  </BaseBody>
  <FullModal
    confirm-button-text="선택 다운로드"
    :is-visible="isShowAttachFilesModal"
    :is-show-cancel-button="false"
    @close="toggleAttachFilesModal"
  >
    <template #content>
      <h1>다운로드 하실 첨부서류를 선택해 주세요</h1>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem">
        <div style="padding: 2rem; border: 1px solid #8c8c8c">X</div>
        <div style="padding: 2rem; border: 1px solid #8c8c8c">X</div>
        <div style="padding: 2rem; border: 1px solid #8c8c8c">X</div>
        <div style="padding: 2rem; border: 1px solid #8c8c8c">X</div>
        <div style="padding: 2rem; border: 1px solid #8c8c8c">X</div>
        <div style="padding: 2rem; border: 1px solid #8c8c8c">X</div>
      </div>
    </template>
  </FullModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import { FullModal } from '@lemonhc/fo-ui/components/modal'

definePageMeta({
  title: '청구 상세내역 조회'
})

const agent = ref('')
const isShowAttachFilesModal = ref(false)

const searchName = () => {
  console.log('피보험자 검색')
}

const toggleAttachFilesModal = () => {
  isShowAttachFilesModal.value = !isShowAttachFilesModal.value
}
</script>

<style scoped lang="scss"></style>
