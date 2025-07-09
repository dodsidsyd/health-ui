<template>
  <div class="c-input">
    <div class="c-inpType">
      <label v-if="label" :for="inputId" :class="['c-label', labelClass]" :style="{ fontSize: labelSize }">{{
        label
      }}</label>
      <div class="c-inp-el">
        <input
          :name="name"
          :id="inputId"
          :placeholder="placeholder"
          :value="emailLocal"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isInvalid }]"
          @input="onInput"
        />
        <span class="at-txt">@</span>
        <div class="custom-select mail">
          <!-- 직접 입력 모드일 때 input 필드 표시 -->
          <input
            v-if="selectedDomain === '' && emailDomainOptions.length === 1 && emailDomainOptions[0].value === 'direct'"
            v-model="directDomainInput"
            class="c-inp domain-input"
            placeholder="도메인 입력"
            @input="onDomainInput"
          />
          <!-- 기본 Select 컴포넌트 -->
          <Select
            v-else
            v-model="selectedDomain"
            select-placeholder="이메일 선택"
            modal-title="이메일을 선택해주세요"
            :custom-opts="emailDomainOptions"
            :transparent="true"
            @change="handleDomainChange"
          />
        </div>
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">올바른 이메일 주소를 입력하세요</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Select from './Select.vue'

// 이메일 도메인 옵션 타입 정의
interface EmailDomainOption {
  value: string
  label: string
}

const props = defineProps({
  label: { type: String, default: '' },
  labelSize: { type: String, default: '1.2rem' }, // 라벨 폰트 크기
  labelClass: { type: String, default: '' }, // 라벨 추가 CSS 클래스
  name: { type: String, default: '' },
  placeholder: { type: String, default: '이메일 입력' },
  modelValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  customDomains: { type: Array as () => EmailDomainOption[], default: () => [] }
})

const emit = defineEmits(['update:modelValue', 'change'])

// 이메일 도메인 옵션 (커스텀 + 기본)
const emailDomainOptions = computed(() => {
  // customDomains가 제공된 경우 직접 입력만 추가
  if (props.customDomains.length > 0) {
    const hasDirectInput = props.customDomains.some(domain => domain.value === 'direct')
    if (!hasDirectInput) {
      // 직접 입력 옵션이 없으면 추가
      return [...props.customDomains, { value: 'direct', label: '직접 입력' }]
    }
    return props.customDomains
  }

  // customDomains가 없으면 직접 입력만 표시
  const options = [{ value: 'direct', label: '직접 입력' }]
  console.log('emailDomainOptions:', options)
  return options
})

const inputId = props.name
const emailLocal = ref('')
const selectedDomain = ref('')
const directDomainInput = ref('') // 직접 입력용 도메인

// 전체 이메일 주소 계산
const fullEmail = computed(() => {
  if (!emailLocal.value) return ''

  // 직접 입력 모드일 때
  if (selectedDomain.value === '' && directDomainInput.value) {
    return `${emailLocal.value}@${directDomainInput.value}`
  }

  // 선택된 도메인이 있을 때
  if (selectedDomain.value && selectedDomain.value !== 'direct') {
    return `${emailLocal.value}@${selectedDomain.value}`
  }

  // 도메인이 없으면 로컬 부분만 반환
  return emailLocal.value
})

// modelValue가 변경될 때 분해
watch(
  () => props.modelValue,
  newValue => {
    if (newValue && newValue.includes('@')) {
      const [local, domain] = newValue.split('@')
      emailLocal.value = local

      // 기존 도메인 옵션에 있는지 확인
      const existingDomain = emailDomainOptions.value.find(opt => opt.value === domain)
      if (existingDomain && existingDomain.value !== 'direct') {
        selectedDomain.value = domain
        directDomainInput.value = ''
      } else {
        // 직접 입력된 도메인
        selectedDomain.value = ''
        directDomainInput.value = domain
      }
    } else {
      emailLocal.value = newValue || ''
      selectedDomain.value = ''
      directDomainInput.value = ''
    }
  },
  { immediate: true }
)

// 이메일 전체 값이 변경될 때 부모에게 전달
watch(fullEmail, newEmail => {
  emit('update:modelValue', newEmail)
  emit('change', newEmail)
})

// 이메일 로컬 부분 입력
function onInput(e: Event) {
  emailLocal.value = (e.target as HTMLInputElement).value
}

// 도메인 직접 입력
function onDomainInput(e: Event) {
  directDomainInput.value = (e.target as HTMLInputElement).value
}

// 도메인 선택 핸들러
function handleDomainChange(option: EmailDomainOption) {
  if (option.value === 'direct') {
    // '직접 입력'을 선택한 경우
    selectedDomain.value = ''
    console.log('직접입력')
  } else {
    // 기존 도메인을 선택한 경우
    selectedDomain.value = option.value
  }
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
    overflow: hidden; // 내용이 넘치지 않도록

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
      min-width: 0; // flex 아이템이 너무 작아지지 않도록
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
      &:read-only {
        cursor: not-allowed;
        color: #959595;
      }
    }
    .custom-select {
      position: relative;
      display: flex;
      &.mail {
        margin-right: 0;
        flex-shrink: 0; // 축소되지 않도록
        min-width: 12rem; // 최소 너비 보장
        max-width: 16rem; // 최대 너비 제한
        // transparent prop으로 Select 컴포넌트가 자체적으로 투명 스타일 적용

        // 직접 입력 input 스타일
        .domain-input {
          min-width: 12rem;
          max-width: 16rem;
          background: transparent;
          border: none;
          outline: none;
          font-size: 1.6rem;
          font-weight: 500;
          color: #2b2b2b;

          &::placeholder {
            color: #959595;
          }
        }
      }
    }
    .at-txt {
      margin: 0 1.2rem;
      flex-shrink: 0; // @ 기호는 고정 크기
      font-size: 1.6rem;
      font-weight: 500;
      color: #2b2b2b;
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
