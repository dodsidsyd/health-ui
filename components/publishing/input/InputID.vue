<template>
  <div class="c-input" @click="$emit('click')">
    <div class="c-inpType">
      <label v-if="label" :for="inputId" class="c-label">{{ label }}</label>
      <div class="c-inp-el">
        <input
          :id="inputId"
          type="number"
          :name="name"
          :placeholder="placeholder"
          :value="modelValue"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid }]"
          @input="onInput"
        />
        <span class="at-hyphen"></span>
        <input
          :id="`${inputId}-IDNum2`"
          type="text"
          :name="`${name}-IDNum2`"
          :placeholder="placeholder2"
          :value="maskedValue"
          :readonly="true"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid }]"
          maxlength="7"
        />
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">주민등록번호 앞자리를 입력해주세요.</span>
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
  name: { type: String, default: 'ID' },
  placeholder: { type: String, default: '' },
  placeholder2: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  maskedValue: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'click', 'inputComplete'])

const inputId = props.name
const inputValue = ref(props.modelValue || '')

watch(
  () => props.modelValue,
  (newValue: string) => {
    inputValue.value = newValue || ''
  }
)

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.value

  // 6자리까지만 입력 허용
  if (value.length <= 6) {
    inputValue.value = value
    emit('update:modelValue', value)

    // 6자리가 완성되면 이벤트 발생
    if (value.length === 6) {
      emit('inputComplete', value)
    }
  } else {
    // 6자리를 초과하면 이전 값으로 되돌림
    target.value = value.slice(0, 6)
    inputValue.value = value.slice(0, 6)
    emit('update:modelValue', value.slice(0, 6))
  }
}

function clearInput() {
  inputValue.value = ''
  emit('update:modelValue', '')
}

function onButtonClick() {
  inputValue.value = ''
  emit('update:modelValue', '')
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
      flex: 1 1 0;
      min-width: 0;
      color: #2b2b2b;
      font-size: 1.6rem;
      font-weight: 500;
      background-color: transparent;
      border: none;
      outline: none;
      &:first-of-type {
        margin-right: 0.8rem;
      }
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
    .at-hyphen {
      width: 8px;
      height: 8px;
      margin: 0 1.2rem;
      flex-shrink: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='8' viewBox='0 0 9 8' fill='none'%3E%3Cpath d='M6.9001 4L2.1001 4' stroke='%232B2B2B' stroke-linecap='round'/%3E%3C/svg%3E");
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
