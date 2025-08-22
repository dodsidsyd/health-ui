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
          :value="internalFromTime"
          :readonly="readonly"
          :disabled="disabled"
          :class="[
            'c-inp',
            $attrs.class,
            { 'is-invalid': isInvalid || timeRangeError, active: activeField === 'from' }
          ]"
          @input="onFromInput"
          @click="selectFromTime"
        />

        <button class="customClock" @click="selectFromTime"></button>
        <span class="wave-txt">~</span>
        <input
          :id="`${inputId}-to`"
          :name="`${name}-to`"
          :placeholder="placeholder2"
          :value="internalToTime"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid || timeRangeError, active: activeField === 'to' }]"
          @input="onToInput"
          @click="selectToTime"
        />
        <button class="customClock" @click="selectToTime"></button>
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">{{ validText }}</span>
      </p>
      <p v-if="timeRangeError" class="feedback error">
        <span class="text">시작 시간이 종료 시간보다 늦을 수 없습니다</span>
      </p>
    </div>
    <TimePickerModal
      :is-visible="isShowTimePickerModal"
      v-bind="timepickerProps"
      @cancel="clickTimePickerCancel"
      @confirm="clickTimePickerConfirm"
      @close="clickTimePickerClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import TimePickerModal from '~/components/common/modal/TimePickerModal.vue'

const props = defineProps({
  label: { type: String, default: '' },
  name: { type: String, default: 'clockRange' },
  labelClass: { type: String, default: '' },
  labelSize: { type: String, default: '' },
  placeholder: { type: String, default: 'HH:MM' },
  placeholder2: { type: String, default: 'HH:MM' },
  fromTime: { type: String, default: '' },
  toTime: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  size: { type: String, validator: (value: string) => ['lg', 'sm', 'normal'].includes(value), default: 'normal' },
  validText: { type: String, default: '시간을 선택해주세요' },
  defaultFromHour: { type: Number, default: 9, validator: (value: number) => value >= 0 && value <= 23 },
  defaultFromMinute: { type: Number, default: 0, validator: (value: number) => value >= 0 && value <= 59 },
  defaultToHour: { type: Number, default: 18, validator: (value: number) => value >= 0 && value <= 23 },
  defaultToMinute: { type: Number, default: 0, validator: (value: number) => value >= 0 && value <= 59 },
  minuteStep: { type: Number, default: 1, validator: (value: number) => value > 0 && value <= 60 },
  hourOnly: { type: Boolean, default: false }
})

const emit = defineEmits(['update:fromTime', 'update:toTime', 'validation-error', 'time-change'])

const inputId = props.name
const activeField = ref<'from' | 'to'>('from')

// 내부 상태로 시간 관리
const internalFromTime = ref(props.fromTime)
const internalToTime = ref(props.toTime)

const isShowTimePickerModal = ref(false)

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
  () => props.fromTime,
  newValue => {
    internalFromTime.value = newValue
  },
  { immediate: true }
)

watch(
  () => props.toTime,
  newValue => {
    internalToTime.value = newValue
  },
  { immediate: true }
)

// 시간 파싱 (HH:MM 또는 오전/오후 HH:MM)
const parseTime = (timeStr: string): { hour: number; minute: number } | null => {
  if (!timeStr) return null

  try {
    // 오전/오후 형식 처리
    const periodMatch = timeStr.match(/^(오전|오후)\s+(\d{1,2}):(\d{2})$/)
    if (periodMatch) {
      const period = periodMatch[1]
      let hour = parseInt(periodMatch[2])
      const minute = parseInt(periodMatch[3])

      // 12시간 형식을 24시간 형식으로 변환
      if (period === '오후' && hour !== 12) {
        hour += 12
      } else if (period === '오전' && hour === 12) {
        hour = 0
      }

      return { hour, minute }
    }

    // 24시간 형식 처리 (HH:MM)
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/)
    if (match) {
      const hour = parseInt(match[1])
      const minute = parseInt(match[2])
      return { hour, minute }
    }

    return null
  } catch (error) {
    return null
  }
}

// 시간 포맷팅
const formatTime = (hour: number, minute: number): string => {
  // 12시간 형식으로 변환
  const period = hour >= 12 ? '오후' : '오전'
  let hours12 = hour % 12
  if (hours12 === 0) hours12 = 12
  const hourStr = String(hours12).padStart(2, '0')
  const minuteStr = props.hourOnly ? '00' : String(minute).padStart(2, '0')

  return `${period} ${hourStr}:${minuteStr}`
}

// 시간 범위 검증
const timeRangeError = computed(() => {
  if (!internalFromTime.value || !internalToTime.value) return false

  const fromTime = parseTime(internalFromTime.value)
  const toTime = parseTime(internalToTime.value)

  if (!fromTime || !toTime) return false

  // 시간을 분 단위로 변환하여 비교
  const fromMinutes = fromTime.hour * 60 + fromTime.minute
  const toMinutes = toTime.hour * 60 + toTime.minute

  return fromMinutes > toMinutes
})

// 시간 검증
const validateTimeRange = (from: string, to: string): boolean => {
  if (!from || !to) return true

  const fromTime = parseTime(from)
  const toTime = parseTime(to)

  if (!fromTime || !toTime) return true

  const fromMinutes = fromTime.hour * 60 + fromTime.minute
  const toMinutes = toTime.hour * 60 + toTime.minute

  const isValid = fromMinutes <= toMinutes

  if (!isValid) {
    emit('validation-error', '시작 시간이 종료 시간보다 늦을 수 없습니다')
  }

  return isValid
}

const timepickerProps = computed(() => ({
  title: activeField.value === 'from' ? '시작 시간' : '종료 시간',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false,
  autoClose: false,
  defaultHour: activeField.value === 'from' ? props.defaultFromHour : props.defaultToHour,
  defaultMinute: activeField.value === 'from' ? props.defaultFromMinute : props.defaultToMinute,
  minuteStep: props.minuteStep,
  hourOnly: props.hourOnly,
  showTimePicker: true
}))

// 내부 상태 업데이트 및 외부로 emit
const updateFromTime = (value: string) => {
  internalFromTime.value = value
  emit('update:fromTime', value)

  // 실시간 검증
  if (internalToTime.value) {
    validateTimeRange(value, internalToTime.value)
  }
}

const updateToTime = (value: string) => {
  internalToTime.value = value
  emit('update:toTime', value)

  // 실시간 검증
  if (internalFromTime.value) {
    validateTimeRange(internalFromTime.value, value)
  }
}

// 입력 필드 이벤트 핸들러
const onFromInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  updateFromTime(value)
}

const onToInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  updateToTime(value)
}

// 시간 선택 모드 설정
const selectFromTime = () => {
  if (props.disabled || props.readonly) return
  activeField.value = 'from'
  toggleTimePickerModal()
}

const selectToTime = () => {
  if (props.disabled || props.readonly) return
  activeField.value = 'to'
  toggleTimePickerModal()
}

const toggleTimePickerModal = () => {
  isShowTimePickerModal.value = !isShowTimePickerModal.value
}

const clickTimePickerClose = () => {
  isShowTimePickerModal.value = false
}

// 모달 이벤트 핸들러
const clickTimePickerCancel = () => {
  isShowTimePickerModal.value = false
}

const clickTimePickerConfirm = async (selectedDate: Date | null) => {
  if (!selectedDate) {
    console.log('❌ 시간이 선택되지 않았습니다')
    return
  }

  const hour = selectedDate.getHours()
  const minute = props.hourOnly ? 0 : selectedDate.getMinutes()
  const formattedTime = formatTime(hour, minute)

  // 시간 업데이트 (내부 상태 + emit)
  if (activeField.value === 'from') {
    updateFromTime(formattedTime)
  } else {
    updateToTime(formattedTime)
  }

  // 시간 변경 이벤트 emit
  emit('time-change', {
    field: activeField.value,
    hour: hour,
    minute: minute
  })

  isShowTimePickerModal.value = false

  // DOM 업데이트 대기 후 input 요소에 값이 제대로 반영되었는지 확인
  await nextTick()

  console.log(`⏰ ${activeField.value === 'from' ? '시작 시간' : '종료 시간'} 선택: ${formattedTime}`)
  console.log('⏰ 시간:', hour, '시', minute, '분')
  console.log('⏰ 내부 상태 - From:', internalFromTime.value, 'To:', internalToTime.value)

  // input 요소의 실제 값 확인
  const inputElement = document.getElementById(
    activeField.value === 'from' ? inputId : `${inputId}-to`
  ) as HTMLInputElement
  if (inputElement) {
    console.log(`⏰ Input 요소 값: ${inputElement.value}`)
  }
}

// 내부 상태 변경 감지
watch([internalFromTime, internalToTime], ([newFrom, newTo]) => {
  if (newFrom && newTo) {
    validateTimeRange(newFrom, newTo)
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
    color: #f14960;
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
      cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M15.6378 14.9615C16.0308 15.0925 16.4555 14.8801 16.5865 14.4872C16.7175 14.0942 16.5051 13.6695 16.1122 13.5385L15.875 14.25L15.6378 14.9615ZM12.5 13.125H11.75C11.75 13.4478 11.9566 13.7344 12.2628 13.8365L12.5 13.125ZM13.25 8.42087C13.25 8.00666 12.9142 7.67087 12.5 7.67087C12.0858 7.67087 11.75 8.00666 11.75 8.42087H12.5H13.25ZM15.875 14.25L16.1122 13.5385L12.7372 12.4135L12.5 13.125L12.2628 13.8365L15.6378 14.9615L15.875 14.25ZM12.5 13.125H13.25V8.42087H12.5H11.75V13.125H12.5ZM21.5 12H20.75C20.75 16.5563 17.0563 20.25 12.5 20.25V21V21.75C17.8848 21.75 22.25 17.3848 22.25 12H21.5ZM12.5 21V20.25C7.94365 20.25 4.25 16.5563 4.25 12H3.5H2.75C2.75 17.3848 7.11522 21.75 12.5 21.75V21ZM3.5 12H4.25C4.25 7.44365 7.94365 3.75 12.5 3.75V3V2.25C7.11522 2.25 2.75 6.61522 2.75 12H3.5ZM12.5 3V3.75C17.0563 3.75 20.75 7.44365 20.75 12H21.5H22.25C22.25 6.61522 17.8848 2.25 12.5 2.25V3Z' fill='%232B2B2B'/%3E%3C/svg%3E");

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

      .wave-txt {
        font-size: 1.4rem;
        margin: 0 0.4rem;
      }
    }
  }
}
</style>
