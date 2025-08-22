<template>
  <div class="c-input">
    <div class="c-inpType">
      <label v-if="label" :for="inputId" class="c-label" :class="{ required: required === true }">{{ label }}</label>
      <div class="c-inp-el">
        <input
          :id="inputId"
          type="tel"
          :name="name"
          :placeholder="placeholder"
          :value="modelValue"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid }]"
          maxlength="6"
          @input="onInput"
        />
        <span class="at-hyphen">-</span>
        <input
          :id="`${inputId}-back`"
          type="hidden"
          :name="`${name}-back`"
          :placeholder="placeholder2"
          :value="backValue"
          :readonly="readonlyBack"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid }]"
          maxlength="7"
          @input="onBackInput"
        />
        <div class="circles-display" @click="onBackInputClick">
          <span
            v-for="(val, idx) in 7"
            :key="idx"
            :class="{
              filled: idx > 0 && idx <= backValue.length,
              showNum: idx === 0 && backValue.length > 0
            }"
          >
            {{ idx === 0 && backValue.length > 0 ? backValue[0] : '' }}
          </span>
        </div>
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">{{ errorMessage }}</span>
      </p>
    </div>

    <SecurityKeypad
      :is-visible="isShowBottomModal"
      :front-number="modelValue"
      @close="toggleBottomModal"
      @confirm="handleKeypadConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import SecurityKeypad from '~/components/common/modal/SecurityKeypad.vue'
import type { SecurityKeypadEmitData } from '~/components/common/modal/SecurityKeypad.vue'

const props = defineProps({
  label: { type: String, default: '주민등록번호' },
  required: { type: Boolean, default: false },
  name: { type: String, default: 'residentId' },
  placeholder: { type: String, default: '생년월일 6자리' },
  placeholder2: { type: String, default: '뒷자리 입력' },
  modelValue: { type: String, default: '' },
  backValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  readonlyBack: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  errorMessage: { type: String, default: '주민등록번호를 입력해주세요.' }
})

const emit = defineEmits(['update:modelValue', 'update:backValue', 'backInputClick'])

const inputId = props.name
const inputValue = ref(props.modelValue || '')
const isShowBottomModal = ref(false)

watch(
  () => props.modelValue,
  (newValue: string) => {
    inputValue.value = newValue || ''
  }
)

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '') // 숫자만 허용

  // 6자리까지만 입력 허용
  if (value.length <= 6) {
    inputValue.value = value
    emit('update:modelValue', value)
  } else {
    // 6자리를 초과하면 이전 값으로 되돌림
    target.value = value.slice(0, 6)
    inputValue.value = value.slice(0, 6)
    emit('update:modelValue', value.slice(0, 6))
  }
}

function onBackInput(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '') // 숫자만 허용

  // 7자리까지만 입력 허용
  if (value.length <= 7) {
    emit('update:backValue', value)
  } else {
    // 7자리를 초과하면 이전 값으로 되돌림
    target.value = value.slice(0, 7)
    emit('update:backValue', value.slice(0, 7))
  }
}

function onBackInputClick() {
  isShowBottomModal.value = true
  emit('backInputClick')
}

function toggleBottomModal() {
  isShowBottomModal.value = !isShowBottomModal.value
}

function handleKeypadConfirm(data: SecurityKeypadEmitData) {
  // 키패드에서 입력된 값을 backValue로 설정
  emit('update:backValue', data.backNumber)
  // 모달 닫기
  isShowBottomModal.value = false
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
    gap: 0;
    .c-inp {
      flex: 1;
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
      font-size: 18px;
      color: #555;
      font-weight: bold;
      flex-shrink: 0;
      margin: 0 1.2rem;
    }
    .circles-display {
      flex: 1;
      width: auto;
      min-height: 4.8rem;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 0.8rem;
      padding: 1.2rem;
      .showNum {
        font-weight: 500;
      }
      .filled {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        background: #2b2b2b;
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
