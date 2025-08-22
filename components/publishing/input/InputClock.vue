<template>
  <div class="c-input">
    <div class="c-inpType">
      <label v-if="label" :for="inputId" :class="['c-label', labelClass]" :style="{ fontSize: labelSize }">
        <template v-if="hasRequiredMark">
          <span v-for="(part, index) in labelParts" :key="index">
            <span v-if="part === '*'" class="required-mark">*</span>
            <span v-else>{{ part }}</span>
          </span>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </label>

      <div class="c-inp-el" :class="{ lg: props.size === 'lg', sm: props.size === 'sm' }">
        <input
          :id="inputId"
          :name="name"
          :placeholder="placeholder"
          :value="internalValue"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid }]"
          @input="onInput"
          @click="clickDatePickerModal"
        />
        <button class="customClock" @click="clickDatePickerModal"></button>
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">{{ validText }}</span>
      </p>
    </div>
    <TimePickerModal
      :is-visible="isShowDatePickerModal"
      v-bind="datepickerProps"
      :scheduled="scheduled"
      :hour-only="hourOnly"
      @cancel="clickDatePickerCancel"
      @confirm="clickDatePickerConfirm"
      @close="clickDatePickerClose"
      @scheduled-date-click="handleScheduledDateClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import TimePickerModal from '~/components/common/modal/TimePickerModal.vue'

interface OptionType {
  value: string
  label: string
}

const props = defineProps({
  label: { type: String, default: '' },
  name: { type: String, default: 'Clock' },
  placeholder: { type: String, default: 'HH:MM' },
  modelValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  validText: { type: String, default: '시간을 선택해주세요' },

  // 스케줄된 날짜들 (새로운 props)
  scheduled: {
    type: [String, Array],
    default: () => [],
    validator: (value: string | any[]) => {
      // 문자열 형태: "1, 13, 15" 또는 "1,13,15"
      // 배열 형태: [1, 13, 15] 또는 ["1", "13", "15"]
      // 날짜 객체 배열: [new Date(), ...]
      // 날짜 문자열 배열: ["2024-01-15", ...]
      if (typeof value === 'string') {
        return true
      }
      if (Array.isArray(value)) {
        return true
      }
      return false
    }
  },

  // 새로운 시간 관련 props
  showTimePicker: { type: Boolean, default: false },
  defaultHour: { type: Number, default: 9, validator: (value: number) => value >= 0 && value <= 23 },
  defaultMinute: { type: Number, default: 0, validator: (value: number) => value >= 0 && value <= 59 },
  minuteStep: { type: Number, default: 1, validator: (value: number) => value > 0 && value <= 60 },
  size: { type: String, validator: (value: string) => ['lg', 'sm', 'normal'].includes(value), default: 'normal' },
  hourOnly: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'time-change', 'scheduled-date-click'])

const inputId = props.name

// 내부 상태로 날짜 관리
const internalValue = ref(props.modelValue)

const isShowDatePickerModal = ref(false)

// Props 변경 감지하여 내부 상태 동기화
watch(
  () => props.modelValue,
  newValue => {
    internalValue.value = newValue
  },
  { immediate: true }
)

// 날짜 형식 파싱 (YYYY.MM.DD 또는 YYYY-MM-DD)
const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null

  try {
    // 시간이 포함된 경우와 포함되지 않은 경우 모두 처리
    let cleanedDate = dateStr

    // YYYY.MM.DD HH:MM 형식을 YYYY-MM-DD HH:MM으로 변환
    if (dateStr.includes(' ')) {
      const [datePart, timePart] = dateStr.split(' ')
      const cleanedDatePart = datePart.replace(/\./g, '-')
      cleanedDate = `${cleanedDatePart} ${timePart}`
    } else {
      // 날짜만 있는 경우
      cleanedDate = dateStr.replace(/\./g, '-')
    }

    const date = new Date(cleanedDate)
    return isNaN(date.getTime()) ? null : date
  } catch (error) {
    return null
  }
}

// 날짜를 YYYY.MM.DD 형식으로 포맷
const formatDate = (date: Date): string => {
  const hours24 = date.getHours()
  const minute = String(date.getMinutes()).padStart(2, '0')

  // 12시간 형식으로 변환
  const period = hours24 >= 12 ? '오후' : '오전'
  let hours12 = hours24 % 12
  if (hours12 === 0) hours12 = 12 // 0시는 12시로, 12시는 그대로 12시
  const hourStr = String(hours12).padStart(2, '0')

  // hourOnly 모드일 때는 분을 00으로 표시
  if (props.hourOnly) {
    return `${period} ${hourStr}:00`
  }

  // 시간만 표시 (hourOnly가 아니어도)
  return `${period} ${hourStr}:${minute}`
}

const datepickerProps = computed(() => ({
  title: '시간선택',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false,
  autoClose: false,
  initialDate: getInitialDate(),
  // 시간 선택 관련 props 전달
  showTimePicker: props.showTimePicker,
  defaultHour: props.defaultHour,
  defaultMinute: props.defaultMinute,
  minuteStep: props.minuteStep,
  hourOnly: props.hourOnly,
  size: { type: String, validator: (value: string) => ['lg', 'sm', 'normal'].includes(value), default: 'normal' }
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

const clickDatePickerClose = () => {
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

  // 시간 변경 이벤트 emit (시간 선택기가 활성화된 경우)
  if (props.showTimePicker) {
    emit('time-change', {
      hour: selectedDate.getHours(),
      minute: selectedDate.getMinutes(),
      dateTime: selectedDate
    })
  }

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

// 스케줄된 날짜 클릭 핸들러
const handleScheduledDateClick = (scheduleInfo: any) => {
  console.log('📌 스케줄된 날짜 클릭:', scheduleInfo)
  emit('scheduled-date-click', scheduleInfo)

  // 스케줄된 날짜를 바로 선택하려면 아래 주석 해제
  // const formattedDate = formatDate(scheduleInfo.date)
  // updateValue(formattedDate)
}

// 라벨에 * 표시가 있는지 확인
const hasRequiredMark = computed(() => {
  return props.label.includes('*')
})

// 라벨을 * 기준으로 분리
const labelParts = computed(() => {
  if (!hasRequiredMark.value) return []
  return props.label.split(/([*])/).filter(part => part !== '')
})
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
  .required-mark {
    color: #f14960; // 빨간색으로 * 표시
    font-weight: 400;
    display: inline-block;
    margin-left: 0.4rem;
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
    &.lg {
      height: 5.6rem;
    }
    &.sm {
      height: 4rem;
    }
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
    .customClock {
      width: 2.4rem;
      height: 2.4rem;
      flex: 0 0 auto;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M15.6378 14.9615C16.0308 15.0925 16.4555 14.8801 16.5865 14.4872C16.7175 14.0942 16.5051 13.6695 16.1122 13.5385L15.875 14.25L15.6378 14.9615ZM12.5 13.125H11.75C11.75 13.4478 11.9566 13.7344 12.2628 13.8365L12.5 13.125ZM13.25 8.42087C13.25 8.00666 12.9142 7.67087 12.5 7.67087C12.0858 7.67087 11.75 8.00666 11.75 8.42087H12.5H13.25ZM15.875 14.25L16.1122 13.5385L12.7372 12.4135L12.5 13.125L12.2628 13.8365L15.6378 14.9615L15.875 14.25ZM12.5 13.125H13.25V8.42087H12.5H11.75V13.125H12.5ZM21.5 12H20.75C20.75 16.5563 17.0563 20.25 12.5 20.25V21V21.75C17.8848 21.75 22.25 17.3848 22.25 12H21.5ZM12.5 21V20.25C7.94365 20.25 4.25 16.5563 4.25 12H3.5H2.75C2.75 17.3848 7.11522 21.75 12.5 21.75V21ZM3.5 12H4.25C4.25 7.44365 7.94365 3.75 12.5 3.75V3V2.25C7.11522 2.25 2.75 6.61522 2.75 12H3.5ZM12.5 3V3.75C17.0563 3.75 20.75 7.44365 20.75 12H21.5H22.25C22.25 6.61522 17.8848 2.25 12.5 2.25V3Z' fill='%232B2B2B'/%3E%3C/svg%3E");
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
