<template>
  <div class="c-input search-bar">
    <div class="c-inpType">
      <label v-if="label" :for="inputId" :class="['c-label', labelClass]" :style="{ fontSize: labelSize }">{{
        label
      }}</label>
      <div class="c-inp-el">
        <div class="custom-select search">
          <Select
            v-model="selectedOption"
            :select-placeholder="selectPlaceholder"
            modal-title="검색 옵션을 선택해주세요"
            :custom-opts="searchOptions"
            :transparent="true"
            :inp-type="'search'"
            @change="handleOptionChange"
          />
        </div>

        <input
          :name="name"
          :id="inputId"
          :placeholder="placeholder"
          :value="inputValue"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', { 'is-invalid': isInvalid }]"
          @input="onInput"
          @keyup.enter="onSearch"
        />

        <button v-if="inputValue" class="clear-btn" aria-label="삭제" @click="clearInput"></button>
        <button class="ico-magnifying-glass" aria-label="검색" @click="onSearch"></button>
      </div>
      <p v-if="isInvalid" class="feedback error">
        <span class="text">검색어를 입력하세요</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Select from './Select.vue'

// 검색 옵션 타입 정의
interface SearchOption {
  value: string
  label: string
}

// 기본 검색 옵션 목록
const DEFAULT_SEARCH_OPTIONS: SearchOption[] = [
  { value: 'name', label: '이름' },
  { value: 'phone', label: '휴대폰' },
  { value: 'all', label: '전체' }
]

const props = defineProps({
  label: { type: String, default: '' },
  labelSize: { type: String, default: '1.2rem' }, // 라벨 폰트 크기
  labelClass: { type: String, default: '' }, // 라벨 추가 CSS 클래스
  name: { type: String, default: 'search' },
  selectPlaceholder: { type: String, default: '검색 옵션' },
  placeholder: { type: String, default: '이름, 휴대폰 뒷자리' },
  modelValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  customSearchOptions: { type: Array as () => SearchOption[], default: () => [] }
})

const emit = defineEmits(['update:modelValue', 'search', 'change'])

// 검색 옵션 (커스텀 + 기본)
const searchOptions = computed(() => {
  return props.customSearchOptions.length > 0 ? props.customSearchOptions : DEFAULT_SEARCH_OPTIONS
})

const inputId = props.name
const selectedOption = ref('')
const inputValue = ref(props.modelValue || '')

// 전체 검색 데이터 계산
const searchData = computed(() => {
  return {
    option: selectedOption.value,
    keyword: inputValue.value.trim()
  }
})

// modelValue가 변경될 때 처리
watch(
  () => props.modelValue,
  newValue => {
    inputValue.value = newValue || ''
  },
  { immediate: true }
)

// 입력값이 변경될 때 부모에게 전달
watch(inputValue, newValue => {
  emit('update:modelValue', newValue)
  emit('change', searchData.value)
})

// 검색 옵션이 변경될 때도 전달
watch(selectedOption, () => {
  emit('change', searchData.value)
})

// 입력 핸들러
function onInput(e: Event) {
  const newValue = (e.target as HTMLInputElement).value
  inputValue.value = newValue
}

// 검색 옵션 변경 핸들러
function handleOptionChange(option: SearchOption) {
  console.log('검색 옵션 선택됨:', option)
  selectedOption.value = option.value
}

// 입력값 초기화
function clearInput() {
  inputValue.value = ''
  emit('update:modelValue', '')
  emit('change', searchData.value)
}

// 검색 실행
function onSearch() {
  if (!inputValue.value.trim()) return

  console.log('검색 실행:', searchData.value)
  emit('search', searchData.value)
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
      margin-right: 0.8rem;

      &.search {
        flex-shrink: 0; // 축소되지 않도록
        min-width: 10rem; // 최소 너비 보장
        max-width: 12rem; // 최대 너비 제한
        // transparent prop으로 Select 컴포넌트가 자체적으로 투명 스타일 적용
      }
    }

    .clear-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.4rem;
      height: 2.4rem;
      flex-shrink: 0; // 버튼은 축소되지 않도록
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }

    .ico-magnifying-glass {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.4rem;
      height: 2.4rem;
      flex-shrink: 0; // 버튼은 축소되지 않도록
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M16.927 17.0401L20.4001 20.4001M19.2801 11.4401C19.2801 15.77 15.77 19.2801 11.4401 19.2801C7.11019 19.2801 3.6001 15.77 3.6001 11.4401C3.6001 7.11019 7.11019 3.6001 11.4401 3.6001C15.77 3.6001 19.2801 7.11019 19.2801 11.4401Z' stroke='%232B2B2B' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      margin-left: 0.8rem;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
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
