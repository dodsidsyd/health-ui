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
          <DatePicker
            v-model="selectedDate"
            :scheduled="scheduled"
            :show-time-picker="showTimePicker"
            :default-hour="defaultHour"
            :default-minute="defaultMinute"
            :minute-step="minuteStep"
            @time-change="handleTimeChange"
            @scheduled-date-click="handleScheduledDateClick"
          />
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
      // 스케줄된 날짜들 (새로운 prop)
      scheduled?: string | any[]
      // 시간 선택 관련 props 추가
      showTimePicker?: boolean
      defaultHour?: number
      defaultMinute?: number
      minuteStep?: number
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
    initialDate: null,
    scheduled: () => [],
    // 시간 선택 기본값
    showTimePicker: false,
    defaultHour: 0,
    defaultMinute: 0,
    minuteStep: 1
  }
)

const emit = defineEmits<{
  (e: ModalEmitEvent, selectedDate?: Date): void
  (e: 'time-change', timeInfo: { hour: number; minute: number; dateTime: Date }): void
  (e: 'scheduled-date-click', scheduleInfo: { date: Date; year: number; month: number; day: number }): void
}>()

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

// 시간 변경 핸들러
const handleTimeChange = (timeInfo: { hour: number; minute: number; dateTime: Date }) => {
  selectedDate.value = timeInfo.dateTime
  emit('time-change', timeInfo)
}

// 스케줄된 날짜 클릭 핸들러
const handleScheduledDateClick = (scheduleInfo: { date: Date; year: number; month: number; day: number }) => {
  console.log('📌 모달에서 스케줄된 날짜 클릭:', scheduleInfo)
  emit('scheduled-date-click', scheduleInfo)

  // 스케줄된 날짜를 바로 선택하려면 아래 주석 해제
  // selectedDate.value = scheduleInfo.date
}

// 모달이 열릴 때 및 닫힐 때 처리
watch(
  () => props.isVisible,
  async newVisible => {
    if (newVisible) {
      // initialDate가 있으면 사용하고, 없으면 현재 시간으로 설정
      if (props.initialDate) {
        selectedDate.value = new Date(props.initialDate)
      } else if (props.showTimePicker) {
        // 시간 선택기가 활성화되어 있고 초기 날짜가 없으면 오늘 날짜 + 기본 시간으로 설정
        const today = new Date()
        today.setHours(props.defaultHour, props.defaultMinute, 0, 0)
        selectedDate.value = today
      } else {
        selectedDate.value = null
      }

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
  return props.disabledConfirmButton || !selectedDate.value
})
</script>

<style lang="scss" scoped>
.c-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  &.is-show {
    opacity: 1;
    visibility: visible;

    .c-modal-inner {
      transform: translateY(0);
    }
  }

  &.bottom {
    align-items: flex-end;
  }

  .c-dim {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  .c-modal-inner {
    position: relative;
    width: 100%;
    max-width: 50rem;
    background-color: vars.$white;
    border-radius: 2rem 2rem 0 0;
    transform: translateY(100%);
    transition: transform 0.3s ease;

    .c-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2rem 2rem 1rem;

      .c-modal-title {
        font-size: 1.8rem;
        font-weight: 600;
        color: #26282c;
        margin: 0;
      }

      .c-modal-close-btn {
        width: 2.4rem;
        height: 2.4rem;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon.close {
          width: 2.4rem;
          height: 2.4rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M18 6L6 18M6 6L18 18' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        &:hover {
          opacity: 0.7;
        }
      }
    }

    .c-modal-body {
      padding: 1rem 2rem;
      overflow-y: auto;
    }
  }
}
</style>
