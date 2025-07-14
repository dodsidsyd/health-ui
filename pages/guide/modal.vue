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
      @click="clickFullModal"
    >
      Full Modal
    </button>

    <button
      style="padding: 1rem 3rem; background-color: #4299e1; color: white; border-radius: 0.75rem"
      @click="clickDatePickerModal"
    >
      조회기간 Modal
    </button>

    <BottomModal
      :is-visible="isShowBottomModal"
      v-bind="bottomModalProps"
      @cancel="clickCancel"
      @confirm="clickConfirm"
      @close="toggleBottomModal"
    >
      <template #content>
        <div>모달 내용은 Slot</div>
      </template>
    </BottomModal>

    <DateRangeModal
      :is-visible="isShowDatePickerModal"
      v-bind="datepickerProps"
      @cancel="clickDatePickerCancel"
      @confirm="clickDatePickerConfirm"
      @close="toggleDatePickerModal"
    />

    <FullModal
      :is-visible="isShowFullModal"
      v-bind="fullModalProps"
      @cancel="clickFullCancel"
      @confirm="clickFullConfirm"
      @close="toggleFullModal"
    >
      <template #content>
        <div style="padding: 2rem">
          <h3 style="margin-bottom: 1rem">전체화면 모달 예시</h3>
          <p style="margin-bottom: 1rem">이것은 전체화면을 차지하는 모달입니다.</p>
          <p style="margin-bottom: 1rem">모바일에서 특히 유용합니다.</p>
          <div style="background-color: #f7fafc; padding: 1rem; border-radius: 0.5rem">
            <p>여기에 더 많은 컨텐츠를 추가할 수 있습니다.</p>
          </div>
        </div>
      </template>
    </FullModal>
  </div>
</template>

<script setup lang="ts">
import { ConfirmModal, AlertModal, BottomModal } from '@lemonhc/fo-ui/components/modal'
import DateRangeModal from '~/components/common/modal/DateRangeModal.vue'
import FullModal from '~/components/common/modal/FullModal.vue'

const isShowBottomModal = ref(false)
const isShowFullModal = ref(false)
const isShowDatePickerModal = ref(false)

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

const fullModalProps = ref({
  title: '전체화면 모달 제목',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const datepickerProps = ref({
  title: '조회기간',
  // isVisible: false, // 이 라인 제거 (개별 prop으로 전달)
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '조회하기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false,
  autoClose: true // 명시적으로 추가
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

const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}

const toggleFullModal = () => {
  isShowFullModal.value = !isShowFullModal.value
}

const clickFullModal = () => {
  toggleFullModal()
}

const toggleDatePickerModal = () => {
  isShowDatePickerModal.value = !isShowDatePickerModal.value
}

const clickDatePickerModal = () => {
  toggleDatePickerModal()
}

const clickCancel = () => {
  console.log('모달 취소')
}
const clickConfirm = () => {
  console.log('모달 확인 클릭')
}

const clickFullCancel = () => {
  console.log('전체화면 모달 취소')
}
const clickFullConfirm = () => {
  console.log('전체화면 모달 확인 클릭')
}

const clickDatePickerCancel = () => {
  console.log('전체화면 모달 취소')
}
const clickDatePickerConfirm = () => {
  console.log('전체화면 모달 확인 클릭')
}
</script>

<style scoped lang="scss"></style>
