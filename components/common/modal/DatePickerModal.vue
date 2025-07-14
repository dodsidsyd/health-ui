<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      id="cDatePicker"
      class="c-modal bottom date-modal"
      :class="[{ 'is-show': isVisible }]"
      aria-describedby="modalBottomTitle"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div class="c-dim" @click="onClickCancel"></div>
      <div class="c-modal-inner">
        <div class="c-modal-header">
          <strong id="modalBottomTitle" class="c-modal-title">{{ title }}</strong>
          <button
            v-if="isShowCloseButton"
            type="button"
            class="c-modal-close-btn"
            aria-label="닫기"
            @click="onClickCancel"
          >
            <i class="icon close"></i>
          </button>
        </div>
        <div class="c-modal-body">
          <DatePicker v-model="selectedDate" />
        </div>
        <div class="c-modal-footer">
          <button
            v-if="isShowCancelButton"
            type="button"
            class="c-modal-btn cancel"
            :disabled="isDisabledCancelButton"
            @click="onClickCancel"
          >
            <span class="text">{{ cancelButtonText }}</span>
          </button>
          <button
            v-if="isShowConfirmButton"
            type="button"
            class="c-modal-btn confirm"
            :disabled="isDisabledConfirmButton"
            @click="onClickConfirm"
          >
            <span class="text">{{ confirmButtonText }}</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'

import DatePicker from '~/components/publishing/input/DatePicker.vue'

const props = withDefaults(
  defineProps<
    BaseModalProps & {
      initialDate?: Date | null
    }
  >(),
  {
    title: '',
    isVisible: false,
    isShowCloseButton: true,
    isShowCancelButton: true,
    isShowConfirmButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    disabledCancelButton: false,
    disabledConfirmButton: false,
    autoClose: true,
    initialDate: null
  }
)

const emit = defineEmits<{ (e: ModalEmitEvent, selectedDate?: Date): void }>()

// 선택된 날짜 상태
const selectedDate = ref<Date | null>(props.initialDate)

// body 스크롤 방지를 위한 상태
const originalBodyStyle = ref<string>('')

// body 스크롤 방지
const preventBodyScroll = () => {
  const body = document.body
  originalBodyStyle.value = body.style.overflow
  body.style.overflow = 'hidden'
}

// body 스크롤 복원
const restoreBodyScroll = () => {
  const body = document.body
  body.style.overflow = originalBodyStyle.value
}

// 모달이 열릴 때 및 닫힐 때 처리
watch(
  () => props.isVisible,
  async (newVisible) => {
    if (newVisible) {
      selectedDate.value = props.initialDate
      preventBodyScroll()
      
      // DOM 업데이트 후 포커스 설정
      await nextTick()
      const modal = document.getElementById('cDatePicker')
      if (modal) {
        modal.focus()
      }
    } else {
      restoreBodyScroll()
    }
  }
)

// ESC 키 이벤트 핸들러
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isVisible) {
    onClickCancel()
  }
}

// 이벤트 리스너 등록/제거
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  restoreBodyScroll() // 컴포넌트 제거 시 복원
})

const closeModal = () => {
  if (!props.autoClose) {
    return
  }
  emit('close')
}

const onClickCancel = () => {
  emit('cancel')
}

const onClickConfirm = () => {
  emit('confirm', selectedDate.value)
}

const isDisabledCancelButton = computed(() => {
  return props.disabledCancelButton
})

const isDisabledConfirmButton = computed(() => {
  return props.disabledConfirmButton
})
</script>
