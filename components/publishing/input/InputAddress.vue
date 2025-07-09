<template>
  <div class="c-input">
    <div class="c-inpType flex flex-col gap-8">
      <label v-if="label" :for="inputId" :class="['c-label', labelClass]" :style="{ fontSize: labelSize }">{{
        label
      }}</label>
      <div class="c-inp-el c-inp-address">
        <input
          :id="inputId1"
          :type="type"
          :inpType="inpType"
          :name="name"
          :placeholder="placeholder"
          :value="displayValue"
          readonly
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 't-right': unitR }]"
          @input="onInput"
        />
        <Button
          btn-type="secondary"
          element-type="button"
          aria-label="주소검색"
          class="xs"
          :width="7.2"
          @click="onAddressSearch"
        />
      </div>
      <div class="c-inp-el">
        <input
          :id="inputId2"
          :type="type"
          :inpType="inpType"
          :name="name"
          :value="secondInputValue"
          :readonly="secondInputReadonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 't-right': unitR }, { 'is-invalid': isInvalid }]"
          placeholder="상세주소를 입력해 주세요."
          @input="onSecondInput"
        />
        <button
          v-show="inputValue.length > 0 && !unitR && !readonly && !disabled"
          class="clear-btn"
          type="button"
          aria-label="작성내용 삭제하기"
          style="display: block"
          @click="clearInput"
        ></button>
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">{{ validText }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
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
  timer: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  validText: { type: String, default: '상세주소를 입력해 주세요.' }, // 유효성 검사 메시지
  customOpts: { type: Array as () => OptionType[], default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

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
const secondInputValue = ref('') // 두 번째 input의 별도 값
const secondInputReadonly = ref(true) // 두 번째 input의 readonly 상태 제어

watch(
  () => props.modelValue,
  newValue => {
    inputValue.value = newValue || ''
  }
)

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
  inputValue.value = (e.target as HTMLInputElement).value
}

function clearInput() {
  secondInputValue.value = ''
  emit('update:modelValue', '')

  // input 요소에 focus 다시 설정
  const inputEl = document.getElementById(inputId) as HTMLInputElement
  if (inputEl) {
    inputEl.focus()
  }
}

// 두 번째 input 입력 핸들러
function onSecondInput(e: Event) {
  secondInputValue.value = (e.target as HTMLInputElement).value
  // 필요시 상대 컴포넌트에 전달
  // emit('update:detailAddress', secondInputValue.value)
}

function onButtonClick() {
  inputValue.value = ''
  emit('update:modelValue', '')
}

// 주소검색 버튼 클릭 핸들러
function onAddressSearch() {
  alert('주소검색 기능을 실행합니다.')

  // 예시 주소 데이터 (실제로는 주소검색 API 결과)
  const exampleAddress = '대구광역시 중구 공평로 88'

  // input 값 업데이트
  inputValue.value = exampleAddress
  emit('update:modelValue', exampleAddress)

  // 두 번째 input의 readonly 속성을 false로 변경
  secondInputReadonly.value = false

  // 향후 주소검색 API 연동 위치
  // 예: 다음 주소 API, 카카오 주소 API 등
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
    &.c-inp-address:has(.c-inp:read-only) {
      background: #fff;
      border: 1px solid #e2e2e2;
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
    .c-btn {
      flex-shrink: 0;
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
  display: block;
  width: 2.4rem;
  height: 2.4rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.ico-magnifying-glass {
  width: 2.4rem;
  height: 2.4rem;
  margin-left: 1.2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M16.927 17.0401L20.4001 20.4001M19.2801 11.4401C19.2801 15.77 15.77 19.2801 11.4401 19.2801C7.11019 19.2801 3.6001 15.77 3.6001 11.4401C3.6001 7.11019 7.11019 3.6001 11.4401 3.6001C15.77 3.6001 19.2801 7.11019 19.2801 11.4401Z' stroke='%232B2B2B' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
}
</style>
