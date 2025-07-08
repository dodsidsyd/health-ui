<template>
  <BottomModal
    :is-visible="isVisible"
    :is-show-close-button="false"
    :auto-close="false"
    title="선택"
    confirm-button-text="네, 같아요"
    cancel-button-text="아니요, 달라요"
    @close="closeModal"
    @cancel="clickDiff"
    @confirm="clickSame"
  >
    <template #content>
      <div>피보험자(치료 받은 분)와<br />수익자(보험금 받는 분)가 같은가요?</div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BottomModal from '~/components/common/modal/BottomModal.vue'
import { useClaimStore } from '~/store/insu/claim.store'

withDefaults(defineProps<{ isVisible: boolean }>(), {
  isVisible: false
})

const emit = defineEmits(['click-diff', 'click-same', 'close'])

const claimStore = useClaimStore()

const clickDiff = () => {
  claimStore.isSameInsuredAndBeneficiary = false
  emit('click-diff')
}

const clickSame = () => {
  claimStore.isSameInsuredAndBeneficiary = true
  emit('click-same')
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped lang="scss"></style>
