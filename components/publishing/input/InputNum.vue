<template>
  <div class="c-input">
    <div class="c-inpType">
      <label v-if="label" :for="inputId" class="c-label">{{ label }}</label>
      <div :class="['c-inp-el', { 'no-line': noLine, lg: props.size === 'lg', sm: props.size === 'sm' }]">
        <button type="button" class="calCost minus" @click="decreaseValue">minus</button>
        <input
          :id="inputId"
          :name="name"
          :placeholder="placeholder"
          :value="inputValue"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 't-right': unitR }, { 'is-invalid': isInvalid }]"
          @input="onInput"
        />
        <span class="input-unit right">{{ unitR }}</span>
        <button type="button" class="calCost plus" @click="increaseValue">plus</button>
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
  placeholder: { type: String, default: '0000' },
  modelValue: { type: String, default: '' },
  unitR: { type: String, default: '원' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  noLine: { type: Boolean, default: false },
  step: { type: Number, default: 1 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: Infinity },
  size: { type: String, validator: (value: string) => ['lg', 'sm', 'normal'].includes(value), default: 'normal' }
})

const emit = defineEmits(['update:modelValue'])

const inputId = props.name

const inputValue = ref(props.modelValue || '')

watch(
  () => props.modelValue,
  newValue => {
    inputValue.value = newValue || ''
  }
)

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  inputValue.value = value
  emit('update:modelValue', value)
}

function increaseValue() {
  console.log('increaseValue called', props.readonly, props.disabled)
  if (props.readonly || props.disabled) return

  const currentValue = parseFloat(inputValue.value) || 0
  const newValue = Math.min(currentValue + props.step, props.max)
  const formattedValue = newValue.toString()

  console.log('Increase:', currentValue, '->', newValue)
  inputValue.value = formattedValue
  emit('update:modelValue', formattedValue)
}

function decreaseValue() {
  console.log('decreaseValue called', props.readonly, props.disabled)
  if (props.readonly || props.disabled) return

  const currentValue = parseFloat(inputValue.value) || 0
  const newValue = Math.max(currentValue - props.step, props.min)
  const formattedValue = newValue.toString()

  console.log('Decrease:', currentValue, '->', newValue)
  inputValue.value = formattedValue
  emit('update:modelValue', formattedValue)
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

    &.no-line {
      border: 0;
      padding: 0;
      &:hover,
      &:focus-within {
        background: transparent;
        border-color: transparent;
      }
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

    .calCost {
      position: relative;
      width: 2.4rem;
      height: 2.4rem;
      background-repeat: no-repeat;
      background-size: 2.4rem;
      font-size: 0;
      flex: 0 0 auto;
      @include mixin.rippleEffectPrimary;

      &.minus {
        margin-right: 1rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Crect width='24' height='24' rx='4' fill='%23EEEEEE'/%3E%3Cpath d='M16.8002 12L7.2002 12' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      }
      &.plus {
        margin-left: 1rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Crect width='24' height='24' rx='4' fill='%23EEEEEE'/%3E%3Cpath d='M12.0002 7.19995L12.0002 16.8M16.8002 12L7.2002 12' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      }
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
