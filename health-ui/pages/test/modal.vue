<template>
  <div style="padding: 1rem 3rem; display: flex; flex-direction: column; gap: 1rem">
    <button
      style="padding: 1rem 3rem; background-color: #4299e1; color: white; border-radius: 0.75rem"
      @click="clickConfirmModal"
    >
      Confirm Modal
    </button>

    <button
      style="padding: 1rem 3rem; background-color: #4299e1; color: white; border-radius: 0.75rem"
      @click="clickAlertModal"
    >
      Alert Modal
    </button>

    <button
      style="padding: 1rem 3rem; background-color: #4299e1; color: white; border-radius: 0.75rem"
      @click="clickBottomModal"
    >
      Bottom Modal
    </button>

    <button
      style="padding: 1rem 3rem; background-color: #4299e1; color: white; border-radius: 0.75rem"
      @click="clickBaseModal"
    >
      Base Modal
    </button>

    <button
      style="padding: 1rem 3rem; background-color: #4299e1; color: white; border-radius: 0.75rem"
      @click="clickFullModal"
    >
      Full Modal
    </button>

    <BottomModal
      :is-visible="isShowBottomModal"
      v-bind="bottomModalProps"
      @cancel="clickCancel"
      @confirm="clickConfirm"
      @close="isShowBottomModal = false"
    >
      <template #content>
        <div>모달 내용은 Slot</div>
      </template>
    </BottomModal>

    <BaseModal
      :is-visible="isShowBaseModal"
      v-bind="baseModalProps"
      @cancel="clickCancelBaseModal"
      @confirm="clickConfirmBaseModal"
      @close="isShowBaseModal = false"
    >
      <template #content>
        <div>모달 내용은 Slot</div>
      </template>
    </BaseModal>

    <FullModal
      :is-visible="isShowFullModal"
      v-bind="fullModalProps"
      @cancel="clickCancelFullModal"
      @confirm="clickConfirmFullModal"
      @close="isShowFullModal = false"
    >
      <template #content>
        <div>모달 내용은 Slot</div>
      </template>
    </FullModal>
  </div>
</template>

<script setup lang="ts">
import BottomModal from '~/components/common/modal/BottomModal.vue'
import BaseModal from '~/components/common/modal/BaseModal.vue'
import FullModal from '~/components/common/modal/FullModal.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal'
import AlertModal from '~/components/common/modal/AlertModal'

const isShowBottomModal = ref(false)
const isShowBaseModal = ref(false)
const isShowFullModal = ref<boolean>(false)

const bottomModalProps = ref({
  title: '하단 모달 제목',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const baseModalProps = ref({
  title: 'Base 모달 제목'
})

const fullModalProps = ref({
  title: 'Full 모달 제목'
})

const clickConfirmModal = async () => {
  const modalContent = `
    <div style="display: flex; flex-direction: column; gap: 1rem; text-align: center">
      <div>
        <i class="ri-information-line"></i>
      </div>
      <div style="font-weight: bold">Confirm 모달 내용입니다.</div>
    </div>`

  const confirmRes = await ConfirmModal.open({
    isVisible: true,
    html: modalContent,
    confirmButtonText: '확인'
  })

  if (confirmRes) {
    await AlertModal.open({
      isVisible: true,
      content: '이것은 Alert Modal 입니다.'
    })
  }
}

const clickAlertModal = async () => {
  await AlertModal.open({
    isVisible: true,
    content: '이것은 Alert Modal 입니다.'
  })
}

const clickBottomModal = () => {
  isShowBottomModal.value = true
}
const clickCancel = () => {
  console.log('하단 모달 취소')
}
const clickConfirm = () => {
  console.log('하단 모달 확인 클릭')
}

const clickBaseModal = () => {
  isShowBaseModal.value = true
}
const clickCancelBaseModal = () => {
  console.log('Base 모달 취소')
}
const clickConfirmBaseModal = () => {
  console.log('Base 모달 확인 클릭')
}

const clickFullModal = () => {
  isShowFullModal.value = true
}
const clickCancelFullModal = () => {
  console.log('Full 모달 취소')
}
const clickConfirmFullModal = () => {
  console.log('Full 모달 확인 클릭')
}
</script>

<style scoped lang="scss"></style>
