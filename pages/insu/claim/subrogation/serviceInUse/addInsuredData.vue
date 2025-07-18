<template>
  <BaseBody>
    <div>
      <div style="padding: 0.75rem">담당 설계사</div>
      <div style="padding: 0.75rem">피보험자 이름</div>
      <div style="padding: 0.75rem">피보험자 휴대폰 번호</div>
      <div style="padding: 0.75rem">피보험자 생년월일</div>
      <div style="padding: 0.75rem">피보험자 성별</div>
      <div style="padding: 0.75rem">피보험자 주소</div>
      <div style="padding: 0.75rem">피보험자 메모</div>
    </div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="clickNext">다음</button>
  </BaseFooter>

  <BottomModal
    :is-visible="isShowModal"
    title="선택"
    confirm-button-text="확인"
    :is-show-cancel-button="false"
    @close="isShowModal = false"
    @cancel="clickDiff"
    @confirm="clickSame"
  >
    <template #content>
      <div class="select-modal-tit">피보험자(치료 받은 분)와<br />수익자(보험금 받는 분)가 같은가요?</div>
      <div class="radio-wrap flex gap-8">
        <Radio id="rdo1" name="rdo1" custom-style="button" aria-label="아니요, 달라요" />
        <Radio id="rdo2" name="rdo1" checked custom-style="button" aria-label="네, 같아요" />
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'
import Radio from '~/components/publishing/input/radio.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowModal = ref(false)

const clickDiff = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickSame = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickNext = () => {
  isShowModal.value = true
}
</script>
<style scoped lang="scss">
.select-modal-tit {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.6rem;
  text-align: left;
}
.radio-wrap {
  display: flex;
  flex-direction: row;
  > * {
    flex: 1 1 auto;
  }
  :deep(.c-label) {
    width: 100%;
  }
}
</style>
