<template>
  <div class="fieldset">
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
    <div class="c-texttype">
      <div class="c-inp-el">
        <textarea
          v-model="inputValue"
          name="textField"
          id="textField"
          :placeholder="placeholder"
          :class="['c-textarea', $attrs.class, { 'is-invalid': isInvalid }]"
          :disabled="disabled"
          :maxlength="maxLength"
          @input="onInput"
        ></textarea>
      </div>
      <div v-if="countArea" class="group_feedback">
        <p class="feedback char-count">
          <span class="count">{{ currentLength }}</span
          ><span>/</span><span> {{ maxLength }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps({
  label: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '텍스트를 입력해주세요.' },
  disabled: { type: Boolean, default: false },
  customStyle: { type: String, default: '' },
  isInvalid: { type: Boolean, default: false },
  countArea: { type: Boolean, default: true },
  maxLength: { type: Number, default: 200 },
  labelSize: { type: String, default: '1.2rem' },
  labelClass: { type: String, default: '' } // 라벨 추가 CSS 클래스
})
const emit = defineEmits(['update:modelValue'])

const inputId = props.name
const opened = ref(false)
const selected = ref('')

// 라벨에 * 표시가 있는지 확인
const hasRequiredMark = computed(() => {
  return props.label.includes('*')
})

// 라벨을 * 기준으로 분리
const labelParts = computed(() => {
  if (!hasRequiredMark.value) return []
  return props.label.split(/([*])/).filter(part => part !== '')
})
const inputValue = ref(props.modelValue)

// 현재 입력된 문자 수 계산
const currentLength = computed(() => {
  return inputValue.value.length
})

// props.modelValue가 변경될 때 inputValue 동기화
watch(
  () => props.modelValue,
  newValue => {
    inputValue.value = newValue
  }
)

// 입력 이벤트 핸들러
function onInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  inputValue.value = target.value
  emit('update:modelValue', target.value)
}
</script>

<style lang="scss" scoped>
.c-texttype {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 11.6rem;
  padding: 1.2rem 1.2rem 0.8rem 1.2rem;
  border-radius: 0.8rem;
  border: 0.1rem solid #e2e2e2;
  background: #fff;
  .c-inp-el {
    height: 100%;
    textarea {
      background-color: transparent;
      height: 100%;
    }
  }
  .feedback {
    justify-content: flex-end;
    align-items: center;
    margin-top: 0;
    padding-right: 0;
    color: #959595;
    font-size: 1.3rem;
    span:last-child {
      margin: 0 0.2rem;
    }
  }
  &:focus,
  &:hover {
    border-color: #4c7ff7;
    background: #f9f8f7;
  }
  &:has(.c-textarea.is-invalid) {
    border-color: #f14960;
  }
  &:has(.c-textarea:disabled) {
    border-color: #e2e2e2;
    background: #f9f8f7;
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
</style>
