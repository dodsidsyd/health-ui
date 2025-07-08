<template>
  <div class="c-input">
    <div class="c-inpType">
      <label v-if="label" :for="inputId" :class="['c-label', labelClass]" :style="{ fontSize: labelSize }">{{
        label
      }}</label>
      <div class="c-inp-el">
        <div class="custom-select phone">
          <Select
            v-model="selectedCarrier"
            select-placeholder="통신사"
            modal-title="통신사 선택"
            :custom-opts="carrierOptions"
            :transparent="true"
            @change="handleCarrierChange"
          />
        </div>

        <input
          :id="inputId"
          :name="name"
          :placeholder="placeholder"
          :value="displayValue"
          :readonly="readonly"
          :disabled="disabled"
          :class="['c-inp', $attrs.class, { 'is-invalid': isValid }]"
          maxlength="13"
          @input="onInput"
        />

        <button class="verify-btn" @click="onButtonClick">{{ buttonText }}</button>
      </div>
      <p v-if="isValid" class="feedback error">
        <span class="text">올바른 휴대폰 번호를 입력하세요</span>
      </p>
    </div>

    <!-- 토스트 메시지 -->
    <BottomToast v-model="showToast" type="success" :duration="3000" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Select from './Select.vue'
import BottomToast from '../../common/bottomToast.vue'

// 통신사 옵션 타입 정의
interface CarrierOption {
  value: string
  label: string
}

// 기본 통신사 목록
const DEFAULT_CARRIERS: CarrierOption[] = [
  { value: 'skt', label: 'SKT' },
  { value: 'kt', label: 'KT' },
  { value: 'lgu', label: 'LG U+' },
  { value: 'skt_mvno', label: 'SKT 알뜰폰' },
  { value: 'kt_mvno', label: 'KT 알뜰폰' },
  { value: 'lgu_mvno', label: 'LG U+ 알뜰폰' }
]

const props = defineProps({
  label: { type: String, default: '' },
  labelSize: { type: String, default: '1.2rem' }, // 라벨 폰트 크기
  labelClass: { type: String, default: '' }, // 라벨 추가 CSS 클래스
  name: { type: String, default: 'phoneNumber' },
  placeholder: { type: String, default: '010-0000-0000' },
  modelValue: { type: String, default: '' },
  buttonText: { type: String, default: '인증요청' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isValid: { type: Boolean, default: false },
  customCarriers: { type: Array as () => CarrierOption[], default: () => [] },
  userName: { type: String, default: '홍길동' } // 토스트에 표시할 사용자 이름
})

const emit = defineEmits(['update:modelValue', 'change', 'verify'])

// 통신사 옵션 (커스텀 + 기본)
const carrierOptions = computed(() => {
  return props.customCarriers.length > 0 ? props.customCarriers : DEFAULT_CARRIERS
})

const inputId = props.name
const selectedCarrier = ref('')
const inputValue = ref(props.modelValue || '')
const showToast = ref(false) // 토스트 표시 상태

// 전체 데이터 계산 (통신사 + 휴대폰 번호)
const fullData = computed(() => {
  return {
    carrier: selectedCarrier.value,
    phoneNumber: inputValue.value,
    formattedPhone: displayValue.value
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

// 통신사 선택 핸들러
function handleCarrierChange(option: CarrierOption) {
  selectedCarrier.value = option.value
}

// 인증 버튼 클릭
function onButtonClick() {
  showToast.value = true
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
      margin-right: 0.8rem;

      &.phone {
        flex-shrink: 0; // 축소되지 않도록
        min-width: 10rem;
        max-width: 13rem; // 최대 너비 제한
        // transparent prop으로 Select 컴포넌트가 자체적으로 투명 스타일 적용
      }
    }

    .verify-btn {
      position: relative;
      width: 7.2rem;
      height: 3.4rem;
      margin-left: 0.8rem;
      padding: 0.7rem 0;
      background: #4c7ff7;
      border-radius: 6px;
      color: #fff;
      font-size: 1.4rem;
      flex-shrink: 0; // 버튼은 축소되지 않도록
      @include mixin.rippleEffectPrimary;

      @include mixin.media-max-width(420) {
        width: 6.5rem;
        font-size: 1.3rem;
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
