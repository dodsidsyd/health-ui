<template>
  <div class="c-input">
    <div class="c-inpType">
      <label v-if="label" :for="inputId" class="c-label">{{ label }}</label>
      <div class="c-inp-el">
        <input
          :name="name"
          :id="inputId"
          :placeholder="placeholder"
          :value="modelValue"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid }]"
          @input="onInput"
        />
        <span class="input-timer">{{ formattedTime }}</span>
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">메세지를 입력하세요</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
interface OptionType {
  value: string
  label: string
}

const props = defineProps({
  label: { type: String, default: '' },
  name: { type: String, default: '' },
  placeholder: { type: String, default: '입력하세요' },
  modelValue: { type: String, default: '' },
  timer: { type: Boolean, default: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false }
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

const inputValue = ref(props.modelValue || '')

watch(
  () => props.modelValue,
  newValue => {
    inputValue.value = newValue || ''
  }
)
function onInput(e: Event) {
  inputValue.value = (e.target as HTMLInputElement).value
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
      min-width: 0;
      &::placeholder {
        color: #959595;
      }
      &:read-only {
        cursor: not-allowed;
        color: #959595;
        & + .input-timer {
          color: #555;
        }
      }
    }

    .input-timer {
      width: 2.5rem;
      margin-left: 0.8rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: rgba(76, 127, 247, 1);
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
</style>
