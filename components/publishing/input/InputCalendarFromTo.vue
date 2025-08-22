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
          :placeholder="getFromPlaceholder"
          :value="internalFromDate"
          :readonly="readonly"
          :disabled="disabled"
          :class="[
            'c-inp',
            $attrs.class,
            { 'is-invalid': isInvalid || dateRangeError, active: activeField === 'from' }
          ]"
          @input="onFromInput"
          @click="selectFromDate"
        />

        <button class="customCalendar" @click="selectFromDate"></button>
        <span class="wave-txt">~</span>
        <input
          :id="`${inputId}-to`"
          :name="`${name}-to`"
          :placeholder="getToPlaceholder"
          :value="internalToDate"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid || dateRangeError, active: activeField === 'to' }]"
          @input="onToInput"
          @click="selectToDate"
        />
        <button class="customCalendar" @click="selectToDate"></button>
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">{{ validText }}</span>
      </p>
      <p v-if="dateRangeError" class="feedback error">
        <span class="text">시작일이 종료일보다 늦을 수 없습니다</span>
      </p>
    </div>
    <DatePickerModal
      :is-visible="isShowDatePickerModal"
      v-bind="datepickerProps"
      @cancel="clickDatePickerCancel"
      @confirm="clickDatePickerConfirm"
      @close="clickDatePickerClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import DatePickerModal from '~/components/common/modal/DatePickerModal.vue'

const props = defineProps({
  label: { type: String, default: '' },
  name: { type: String, default: 'calendar' },
  labelClass: { type: String, default: '' },
  placeholder: { type: String, default: 'YYYY.MM.DD' },
  placeholder2: { type: String, default: 'YYYY.MM.DD' },
  fromDate: { type: String, default: '' },
  toDate: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  size: { type: String, validator: (value: string) => ['lg', 'sm', 'normal'].includes(value), default: 'normal' },
  // 새로운 시간 관련 props
  showTimePicker: { type: Boolean, default: false },
  defaultHour: { type: Number, default: 0, validator: (value: number) => value >= 0 && value <= 23 },
  defaultMinute: { type: Number, default: 0, validator: (value: number) => value >= 0 && value <= 59 },
  minuteStep: { type: Number, default: 1, validator: (value: number) => value > 0 && value <= 60 },
  validText: { type: String, default: '기간을 선택해주세요' }
})

const emit = defineEmits(['update:fromDate', 'update:toDate', 'validation-error', 'time-change'])

const inputId = props.name
const activeField = ref<'from' | 'to'>('from')

// 내부 상태로 날짜 관리
const internalFromDate = ref(props.fromDate)
const internalToDate = ref(props.toDate)

const isShowDatePickerModal = ref(false)

// 시간 선택 여부에 따른 placeholder 계산
const getFromPlaceholder = computed(() => {
  return props.showTimePicker ? 'YYYY.MM.DD HH:MM' : props.placeholder
})

const getToPlaceholder = computed(() => {
  return props.showTimePicker ? 'YYYY.MM.DD HH:MM' : props.placeholder2
})

// 라벨에 * 표시가 있는지 확인
const hasRequiredMark = computed(() => {
  return props.label.includes('*')
})

// 라벨을 * 기준으로 분리
const labelParts = computed(() => {
  if (!hasRequiredMark.value) return []
  return props.label.split(/([*])/).filter(part => part !== '')
})

// Props 변경 감지하여 내부 상태 동기화
watch(
  () => props.fromDate,
  newValue => {
    internalFromDate.value = newValue
  },
  { immediate: true }
)

watch(
  () => props.toDate,
  newValue => {
    internalToDate.value = newValue
  },
  { immediate: true }
)

// 날짜 범위 검증
const dateRangeError = computed(() => {
  if (!internalFromDate.value || !internalToDate.value) return false

  const fromDateObj = parseDate(internalFromDate.value)
  const toDateObj = parseDate(internalToDate.value)

  if (!fromDateObj || !toDateObj) return false

  return fromDateObj > toDateObj
})

// 날짜 형식 파싱 (YYYY.MM.DD 또는 YYYY-MM-DD, 시간 포함 가능)
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

// 날짜를 지정된 형식으로 포맷
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  if (props.showTimePicker) {
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${year}.${month}.${day} ${hour}:${minute}`
  } else {
    return `${year}.${month}.${day}`
  }
}

// 날짜 검증
const validateDateRange = (from: string, to: string): boolean => {
  if (!from || !to) return true

  const fromDate = parseDate(from)
  const toDate = parseDate(to)

  if (!fromDate || !toDate) return true

  const isValid = fromDate <= toDate

  if (!isValid) {
    emit('validation-error', '시작일이 종료일보다 늦을 수 없습니다')
  }

  return isValid
}

const datepickerProps = computed(() => ({
  title: activeField.value === 'from' ? '시작일 선택' : '종료일 선택',
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
  size: { type: String, validator: (value: string) => ['lg', 'sm', 'normal'].includes(value), default: 'normal' }
}))

// 모달에 전달할 초기 날짜 가져오기
const getInitialDate = (): Date | null => {
  const dateStr = activeField.value === 'from' ? internalFromDate.value : internalToDate.value
  return dateStr ? parseDate(dateStr) : null
}

// 내부 상태 업데이트 및 외부로 emit
const updateFromDate = (value: string) => {
  internalFromDate.value = value
  emit('update:fromDate', value)

  // 실시간 검증
  if (internalToDate.value) {
    validateDateRange(value, internalToDate.value)
  }
}

const updateToDate = (value: string) => {
  internalToDate.value = value
  emit('update:toDate', value)

  // 실시간 검증
  if (internalFromDate.value) {
    validateDateRange(internalFromDate.value, value)
  }
}

// 입력 필드 이벤트 핸들러
const onFromInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  updateFromDate(value)
}

const onToInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  updateToDate(value)
}

// 날짜 선택 모드 설정
const selectFromDate = () => {
  if (props.disabled || props.readonly) return
  activeField.value = 'from'
  toggleDatePickerModal()
}

const selectToDate = () => {
  if (props.disabled || props.readonly) return
  activeField.value = 'to'
  toggleDatePickerModal()
}

const toggleDatePickerModal = () => {
  isShowDatePickerModal.value = !isShowDatePickerModal.value
}

const clickDatePickerClose = () => {
  isShowDatePickerModal.value = false
}

// 모달 이벤트 핸들러
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
  if (activeField.value === 'from') {
    updateFromDate(formattedDate)
  } else {
    updateToDate(formattedDate)
  }

  // 시간 변경 이벤트 emit (시간 선택기가 활성화된 경우)
  if (props.showTimePicker) {
    emit('time-change', {
      field: activeField.value,
      hour: selectedDate.getHours(),
      minute: selectedDate.getMinutes(),
      dateTime: selectedDate
    })
  }

  isShowDatePickerModal.value = false

  // DOM 업데이트 대기 후 input 요소에 값이 제대로 반영되었는지 확인
  await nextTick()

  console.log(`📅 ${activeField.value === 'from' ? '시작일' : '종료일'} 선택: ${formattedDate}`)
  console.log('📅 Date 객체:', selectedDate)
  console.log('📅 내부 상태 - From:', internalFromDate.value, 'To:', internalToDate.value)

  // input 요소의 실제 값 확인
  const inputElement = document.getElementById(
    activeField.value === 'from' ? inputId : `${inputId}-to`
  ) as HTMLInputElement
  if (inputElement) {
    console.log(`📅 Input 요소 값: ${inputElement.value}`)
  }
}

// 내부 상태 변경 감지
watch([internalFromDate, internalToDate], ([newFrom, newTo]) => {
  if (newFrom && newTo) {
    validateDateRange(newFrom, newTo)
  }
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
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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
      cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M4.75 8.91425H18.75M6.55952 3V4.54304M16.75 3V4.54285M19.75 7.24285V18.3C19.75 19.7912 18.5561 21 17.0833 21H6.41667C4.94391 21 3.75 19.7912 3.75 18.3V7.24285C3.75 5.75168 4.94391 4.54285 6.41667 4.54285H17.0833C18.5561 4.54285 19.75 5.75168 19.75 7.24285Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");

      &:hover {
        opacity: 0.7;
      }
    }

    .wave-txt {
      margin: 0 0.8rem;
      color: #959595;
      font-size: 1.6rem;
      font-weight: 500;
      flex: 0 0 auto;
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
@media (max-width: 393px) {
  .c-inpType {
    .c-inp-el {
      .c-inp {
        font-size: 1.4rem;
      }
      // .customCalendar {
      //   width: 1.8rem;
      //   height: 1.8rem;
      //   background-size: contain;
      //   display: none;
      // }
      .wave-txt {
        font-size: 1.4rem;
        margin: 0 0.4rem;
      }
    }
  }
}
</style>
