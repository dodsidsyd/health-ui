<template>
  <div :class="['c-input', { 'search-bar': inpType === 'search' }]">
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
      <div class="c-inp-el">
        <span v-if="unitL" class="input-unit left">{{ unitL }}</span>
        <input
          :type="type"
          :inpType="inpType"
          :name="name"
          :id="inputId"
          :placeholder="placeholder"
          :value="displayValue"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 't-right': unitR }, { 'is-invalid': isValid }]"
          @input="onInput"
        />
        <!-- Clear button for debugging -->
        <button
          v-show="inputValue.length > 0 && !unitR && !readonly && !disabled"
          class="clear-btn"
          type="button"
          aria-label="작성내용 삭제하기"
          @click="clearInput"
          style="display: block"
        ></button>
        <span v-if="unitR" class="input-unit right ml-8">{{ unitR }}</span>
        <button
          v-if="inpType === 'search'"
          class="icon ml-12 ico-magnifying-glass"
          type="button"
          @click="onSearchClick"
          aria-label="검색"
        ></button>
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">{{ validText }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
interface OptionType {
  value: string
  label: string
}

const props = defineProps({
  label: { type: String, default: '' },
  labelSize: { type: String, default: '1.2rem' }, // 라벨 폰트 크기
  labelClass: { type: String, default: '' }, // 라벨 추가 CSS 클래스
  name: { type: String, default: '' },
  placeholder: { type: String, default: '입력하세요' },
  modelValue: { type: String, default: '' },
  unitL: { type: String, default: '' },
  unitR: { type: String, default: '' },
  inpType: { type: String, default: 'text' },
  type: { type: String, default: 'text' },
  maxLength: { type: [String, Number], default: null }, // maxLength 속성 추가
  timer: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  validText: { type: String, default: '인풋 유효성 에러 메시지' }, // 유효성 검사 메시지
  customOpts: { type: Array as () => OptionType[], default: () => [] }
})

const emit = defineEmits(['update:modelValue', 'search'])

const time = ref(300)
let intervalId: ReturnType<typeof setInterval> | null = null

const formattedTime = computed(() => {
  const min = String(Math.floor(time.value / 60)).padStart(1, '0')
  const sec = String(time.value % 60).padStart(2, '0')
  return `${min}:${sec}`
})

function startTimer() {
  if (intervalId) clearInterval(intervalId)
  time.value = 300
  intervalId = setInterval(() => {
    if (time.value > 0) {
      time.value--
    } else {
      clearInterval(intervalId!)
      intervalId = null
    }
  }, 1000)
}

watch(
  () => props.timer,
  val => {
    if (val) startTimer()
    else {
      if (intervalId) clearInterval(intervalId)
      time.value = 300
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
const inputId = props.name
const opened = ref(false)
const selected = ref('')
const inputValue = ref(props.modelValue || '')

// 라벨에 * 표시가 있는지 확인
const hasRequiredMark = computed(() => {
  return props.label.includes('*')
})

// 라벨을 * 기준으로 분리
const labelParts = computed(() => {
  if (!hasRequiredMark.value) return []
  return props.label.split(/([*])/).filter(part => part !== '')
})

watch(
  () => props.modelValue,
  newValue => {
    inputValue.value = newValue || ''
  }
)

// 입력값이 있는지 확인하는 computed
const hasValue = computed(() => {
  const result = Boolean(inputValue.value && inputValue.value.trim())
  return result
})

// display되는 값 계산
const displayValue = computed(() => {
  if (props.inpType === 'phone') {
    const nums = inputValue.value.replace(/\D/g, '').slice(0, 11)
    if (nums.length <= 3) return nums
    if (nums.length <= 7) return nums.replace(/(\d{3})(\d+)/, '$1-$2')
    return nums.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3')
  }
  return inputValue.value
})

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  let value = target.value

  // maxLength 제한 적용
  if (props.maxLength && value.length > props.maxLength) {
    value = value.slice(0, props.maxLength)
    target.value = value
  }

  inputValue.value = value

  emit('update:modelValue', value)
}

function clearInput() {
  inputValue.value = ''
  emit('update:modelValue', '')

  // input 요소에 focus 다시 설정
  const inputEl = document.getElementById(inputId) as HTMLInputElement
  if (inputEl) {
    inputEl.focus()
  }
}

function onButtonClick() {
  inputValue.value = ''
  emit('update:modelValue', '')
}

// 검색 버튼 클릭 핸들러
function onSearchClick() {
  emit('search', inputValue.value)
}
</script>

<style lang="scss" scoped>
.c-input {
  width: 100%;
  &.search-bar {
    .c-inp-el {
      background-color: #f4f4f4;
      border-color: #f4f4f4;
      &:hover,
      &:focus-within {
        background: #f6f9ff;
        border-color: transparent;
      }
    }
  }
}

.c-label {
  // SCSS 변수 테스트: vars.$fs12 변수를 사용
  font-size: vars.$fs12; // 1.2rem과 동일
  font-weight: vars.$regular; // 400과 동일
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
      &::placeholder {
        color: #959595;
      }
      &.t-right {
        text-align: right;
      }
      &.t-left {
        text-align: left;
      }
      &:read-only {
        cursor: not-allowed;
        color: #959595;
        & + .input-timer {
          color: #555;
        }
      }
    }

    .input-unit {
      width: fit-content;
      &.left {
        margin-right: 0.2rem;
      }
      &.right {
        margin-left: 0.2rem;
      }
    }
    .input-timer {
      width: 2.5rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: rgba(76, 127, 247, 1);
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

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  flex-shrink: 0; /* 버튼이 찌그러지지 않도록 */
  z-index: 10;
  position: relative;
  background-size: 2rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.ico-magnifying-glass {
  width: 2.4rem;
  height: 2.4rem;
}
</style>
