<template>
  <BottomModal
    :is-visible="isVisible"
    :is-show-close-button="false"
    :is-show-cancel-button="false"
    :auto-close="false"
    title="선택"
    confirm-button-text="확인"
    @close="closeModal"
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
import BottomModal from '~/components/common/modal/BottomModal.vue'
import Radio from '~/components/publishing/input/radio.vue'
interface Props {
  isVisible: boolean
}

withDefaults(defineProps<Props>(), {
  isVisible: false
})

const emit = defineEmits(['click-diff', 'click-same', 'close', 'update-same-status'])

// 로컬 상태로 관리
const isSameInsuredAndBeneficiary = ref<boolean | null>(null)

const clickDiff = () => {
  isSameInsuredAndBeneficiary.value = false
  emit('update-same-status', false)
  emit('click-diff')
}

const clickSame = () => {
  isSameInsuredAndBeneficiary.value = true
  emit('update-same-status', true)
  emit('click-same')
}

const closeModal = () => {
  emit('close')
}

// 현재 상태를 외부에서 접근할 수 있도록 expose
defineExpose({
  isSameInsuredAndBeneficiary: readonly(isSameInsuredAndBeneficiary)
})
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
