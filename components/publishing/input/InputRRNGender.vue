<template>
  <div class="c-input">
    <div class="c-inpType">
      <label v-if="label" :for="inputId" class="c-label" :class="{ required: required === true }">{{ label }}</label>
      <div class="c-inp-el">
        <input
          :id="inputId"
          type="text"
          :name="name"
          :placeholder="placeholder"
          :value="modelValue"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid }]"
          maxlength="6"
          @input="onInput"
        />
        <span class="at-hyphen"></span>
        <input
          :id="`${inputId}-back`"
          type="text"
          :name="`${name}-back`"
          :placeholder="placeholder2"
          :value="backValue"
          :readonly="readonlyBack"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid }]"
          maxlength="1"
          style="max-width: 4rem"
          @input="onBackInput"
        />
        <div class="masking">●●●●●●</div>
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">{{ errorMessage }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  label: { type: String, default: '주민등록번호' },
  required: { type: Boolean, default: false },
  name: { type: String, default: 'residentId' },
  placeholder: { type: String, default: '앞자리 입력' },
  placeholder2: { type: String, default: '' }, // placeholder2 기본값 변경
  modelValue: { type: String, default: '' },
  backValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  readonlyBack: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  errorMessage: { type: String, default: '주민등록번호를 입력해주세요.' }
})

const inputId = props.name
const emit = defineEmits(['update:modelValue', 'update:backValue'])

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '').slice(0, 6) // 숫자만 남기고 6자리로 제한
  emit('update:modelValue', value)
  target.value = value
}

function onBackInput(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '').slice(0, 7) // 숫자만 남기고 7자리로 제한
  emit('update:backValue', value)
  target.value = value
}
</script>

<style lang="scss" scoped>
.c-input {
  width: 100%;
}

.c-label {
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 400;
  color: #555;
  font-size: 12px;
  position: relative;
  &.required {
    &::after {
      content: '*';
      font-size: 1.2rem;
      display: inline-block;
      margin-left: 0.3rem;
      color: #f14960;
    }
  }
}

.c-inpType {
  .c-inp-el {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    .c-inp {
      flex: 1;
      height: 4.8rem;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
      min-width: 0;
      color: #2b2b2b;
      font-weight: 500;
      background-color: #fff;
      outline: none;
      &::placeholder {
        color: #bbb;
      }
      &:read-only {
        cursor: pointer;
        color: #959595;
        background-color: #f4f4f4;
        border-color: #e2e2e2;
      }
      &:disabled {
        cursor: not-allowed;
        color: #959595;
        background-color: #f4f4f4;
        border-color: #e2e2e2;
      }
    }
    .at-hyphen {
      width: 0.8rem;
      height: 0.8rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8' fill='none'%3E%3Cpath d='M6.39998 4L1.59998 4' stroke='%232B2B2B' stroke-linecap='round'/%3E%3C/svg%3E");
    }
    .masking {
      flex: 1;
      font-size: 1.4rem;
      line-height: 2rem;
      color: #d5d5d5;
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
