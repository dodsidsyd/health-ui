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
        <button class="customCalendar"></button>
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
  name: { type: String, default: 'Calendar' },
  placeholder: { type: String, default: '2025.04.01' },
  modelValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false }
})
const inputId = props.name
const inputValue = ref(props.modelValue || '')

const emit = defineEmits(['update:modelValue'])

function onInput(e: Event) {
  inputValue.value = (e.target as HTMLInputElement).value
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
