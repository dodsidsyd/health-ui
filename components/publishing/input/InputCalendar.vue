<template>
  <div class="c-input">
    <div class="c-inpType">
      <label v-if="label" :for="inputId" class="c-label">{{ label }}</label>
      <div class="c-inp-el">
        <input
          :name="name"
          :id="inputId"
          :placeholder="placeholder"
          :value="internalValue"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid }]"
          @input="onInput"
          @click="clickDatePickerModal"
        />
        <button class="customCalendar" @click="clickDatePickerModal"></button>
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">메세지를 입력하세요</span>
      </p>
    </div>
    <DatePickerModal
      :is-visible="isShowDatePickerModal"
      v-bind="datepickerProps"
      @cancel="clickDatePickerCancel"
      @confirm="clickDatePickerConfirm"
      @close="toggleDatePickerModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import DatePickerModal from '~/components/common/modal/DatePickerModal.vue'
interface OptionType {
  value: string
  label: string
}

const props = defineProps({
  label: { type: String, default: '' },
  name: { type: String, default: 'Calendar' },
  placeholder: { type: String, default: '2025.04.01' },
  modelValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const inputId = props.name

// 내부 상태로 날짜 관리
const internalValue = ref(props.modelValue)

const isShowDatePickerModal = ref(false)

// Props 변경 감지하여 내부 상태 동기화
watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue
}, { immediate: true })

// 날짜 형식 파싱 (YYYY.MM.DD 또는 YYYY-MM-DD)
const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null
  
  // YYYY.MM.DD 또는 YYYY-MM-DD 형식 지원
  const cleanedDate = dateStr.replace(/\./g, '-')
  const date = new Date(cleanedDate)
  
  return isNaN(date.getTime()) ? null : date
}

// 날짜를 YYYY.MM.DD 형식으로 포맷
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

const datepickerProps = computed(() => ({
  title: '일자선택',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false,
  autoClose: false,
  initialDate: getInitialDate()
}))

// 모달에 전달할 초기 날짜 가져오기
const getInitialDate = (): Date | null => {
  return internalValue.value ? parseDate(internalValue.value) : null
}

// 내부 상태 업데이트 및 외부로 emit
const updateValue = (value: string) => {
  internalValue.value = value
  emit('update:modelValue', value)
}

// 입력 필드 이벤트 핸들러
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  updateValue(value)
}

const toggleDatePickerModal = () => {
  isShowDatePickerModal.value = !isShowDatePickerModal.value
}

const clickDatePickerModal = () => {
  if (props.disabled || props.readonly) return
  toggleDatePickerModal()
}

const clickDatePickerCancel = () => {
  isShowDatePickerModal.value = false
}

const clickDatePickerConfirm = async (selectedDate: Date | null) => {
  if (!selectedDate) {
    console.log('❌ 날짜가 선택되지 않았습니다')
    return
  }
  
  const formattedDate = formatDate(selectedDate)
  
  // 날짜 업데이트 (내부 상태 + emit)
  updateValue(formattedDate)
  
  isShowDatePickerModal.value = false
  
  // DOM 업데이트 대기 후 input 요소에 값이 제대로 반영되었는지 확인
  await nextTick()
  
  console.log(`📅 날짜 선택: ${formattedDate}`)
  console.log('📅 Date 객체:', selectedDate)
  console.log('📅 내부 상태:', internalValue.value)
  
  // input 요소의 실제 값 확인
  const inputElement = document.getElementById(inputId) as HTMLInputElement
  if (inputElement) {
    console.log(`📅 Input 요소 값: ${inputElement.value}`)
  }
}
</script>

<style lang="scss" scoped>
.c-input {
  width: 100%;
}

.c-label {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6rem;
  color: #555;
  & + .c-inp-el {
    margin-left: 0;
  }
}

.c-inpType {
  .c-inp-el {
    position: relative;
    display: flex;
    align-items: center;
    height: 4.8rem;
    padding: 0.8rem 1.6rem;
    background: #fff;
    border-radius: 0.8rem;
    border: 1px solid #e2e2e2;
    &:hover,
    &:focus-within {
      background: #f6f9ff;
      border-color: #4c7ff7;
    }
    &:has(.c-inp.is-invalid) {
      border-color: #f14960;
    }
    &:has(.c-inp:read-only) {
      border-color: #e2e2e2;
      background-color: #f4f4f4;
    }
    &:has(.c-inp:disabled) {
      border-color: #e2e2e2;
      background-color: #f4f4f4;
      color: #959595;
    }
    .c-inp {
      flex: 1 1 auto;
      color: #2b2b2b;
      font-size: 1.6rem;
      font-weight: 500;
      background-color: transparent;
      text-align: left;
      min-width: 0;
      &::placeholder {
        color: #959595;
      }
      &.t-right {
        text-align: right;
      }
      &:read-only {
        cursor: not-allowed;
        color: #959595;
      }
    }
    .input-unit {
      width: fit-content;
      &.right {
        margin-left: 0.2rem;
      }
    }
    .customCalendar {
      width: 2.4rem;
      height: 2.4rem;
      flex: 0 0 auto;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M4.75 8.91425H18.75M6.55952 3V4.54304M16.75 3V4.54285M19.75 7.24285V18.3C19.75 19.7912 18.5561 21 17.0833 21H6.41667C4.94391 21 3.75 19.7912 3.75 18.3V7.24285C3.75 5.75168 4.94391 4.54285 6.41667 4.54285H17.0833C18.5561 4.54285 19.75 5.75168 19.75 7.24285Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
  }
}

.feedback {
  margin-top: 0.4rem;
  &.error {
    color: #f14960;
    font-size: 1.3rem;
    line-height: 1.4rem;
  }
}
</style>
