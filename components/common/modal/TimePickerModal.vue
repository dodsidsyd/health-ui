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
          <HourMinRollSelecter
            ref="hourMinRollSelecterRef"
            v-model="selectedTime"
            :min-hour="0"
            :max-hour="23"
            :minute-step="minuteStep"
            :default-hour="defaultHour"
            :default-minute="defaultMinute"
            :hour-only="hourOnly"
            @change="handleTimeChange"
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
import { ref, watch } from 'vue'
import HourMinRollSelecter from '~/components/publishing/input/HourMinRollSelecter.vue'

interface Props {
  isVisible: boolean
  title?: string
  isShowCloseButton?: boolean
  isShowCancelButton?: boolean
  isShowConfirmButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  disabledCancelButton?: boolean
  disabledConfirmButton?: boolean
  autoClose?: boolean
  initialDate?: Date | null
  showTimePicker?: boolean
  defaultHour?: number
  defaultMinute?: number
  minuteStep?: number
  scheduled?: string | any[]
  hourOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  title: '시간 선택',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false,
  autoClose: false,
  initialDate: null,
  showTimePicker: true,
  defaultHour: 9,
  defaultMinute: 0,
  minuteStep: 1,
  hourOnly: false
})

const emit = defineEmits<{
  cancel: []
  confirm: [selectedDate: Date | null]
  close: []
  'scheduled-date-click': [scheduleInfo: any]
}>()

const hourMinRollSelecterRef = ref<InstanceType<typeof HourMinRollSelecter>>()
const selectedTime = ref({ hour: props.defaultHour, minute: props.defaultMinute })

const isDisabledCancelButton = ref(props.disabledCancelButton)
const isDisabledConfirmButton = ref(props.disabledConfirmButton)

watch(
  () => props.disabledCancelButton,
  newVal => {
    isDisabledCancelButton.value = newVal
  }
)

watch(
  () => props.disabledConfirmButton,
  newVal => {
    isDisabledConfirmButton.value = newVal
  }
)

const onClickCancel = () => {
  emit('cancel')
  emit('close')
}

const onClickConfirm = () => {
  const now = new Date()
  const selectedDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    selectedTime.value.hour,
    props.hourOnly ? 0 : selectedTime.value.minute
  )
  emit('confirm', selectedDate)
  if (props.autoClose) {
    emit('close')
  }
}

const handleTimeChange = (time: { hour: number; minute: number }) => {
  selectedTime.value = time
}
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
