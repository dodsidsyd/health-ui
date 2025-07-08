<template>
  <div :class="['c-input', { 'search-bar': inpType === 'search', transparent: transparent }]">
    <div class="c-inpType">
      <label v-if="label" class="c-label">{{ label }}</label>
      <div class="c-inp-el">
        <div class="custom-select custom" @click="openBottomModal">
          <div :class="['select-display', { 'placeholder-selected': !selectedLabel }]">
            {{ selectedLabel || selectPlaceholder }}
          </div>
          <i class="custom-arrow" :class="{ open: isShowBottomModal }"></i>
        </div>
      </div>
    </div>

    <!-- BottomModal for Options -->
    <BottomModal
      :is-visible="isShowBottomModal"
      :title="modalTitle || '옵션 선택'"
      :is-show-cancel-button="true"
      :is-show-confirm-button="true"
      :is-show-close-button="true"
      @close="cancelSelection"
      @cancel="cancelSelection"
      @confirm="confirmSelection"
    >
      <template #content>
        <div class="select-options">
          <div
            v-for="option in customOpts"
            :key="option.value"
            :class="['option-item', { selected: tempSelected === option.value }]"
            @click="selectOption(option)"
          >
            <span class="option-label">{{ option.label }}</span>
            <i v-if="tempSelected === option.value" class="check-icon icon"></i>
          </div>
        </div>
      </template>
    </BottomModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'

interface OptionType {
  value: string
  label: string
}

const props = defineProps({
  label: { type: String, default: '' },
  selectPlaceholder: { type: String, default: '선택하세요' },
  modalTitle: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isValid: { type: Boolean, default: false },
  inpType: { type: String, default: '' },
  transparent: { type: Boolean, default: false },
  customOpts: { type: Array as () => OptionType[], default: () => [] } // camelCase로 통일
})

const emit = defineEmits(['update:modelValue', 'change'])

// 상태 관리
const selected = ref(props.modelValue)
const tempSelected = ref(props.modelValue) // 임시 선택값
const isShowBottomModal = ref(false)

// 선택된 옵션의 라벨 표시
const selectedLabel = computed(() => {
  const selectedOption = props.customOpts.find(option => option.value === selected.value)
  return selectedOption?.label || ''
})

// v-model 양방향 바인딩
watch(
  () => props.modelValue,
  newValue => {
    selected.value = newValue
    tempSelected.value = newValue
  }
)

watch(selected, newValue => {
  emit('update:modelValue', newValue)
})

// BottomModal 관련 함수들
const openBottomModal = () => {
  if (props.disabled || props.readonly) return
  console.log('openBottomModal - customOpts:', props.customOpts)
  tempSelected.value = selected.value // 모달 열 때 현재 선택값으로 초기화
  isShowBottomModal.value = true
}

const closeBottomModal = () => {
  isShowBottomModal.value = false
}

const selectOption = (option: OptionType) => {
  tempSelected.value = option.value // 임시 선택값만 업데이트
}

// 확인 버튼 클릭 시 실제 선택 적용
const confirmSelection = () => {
  const selectedOption = props.customOpts.find(option => option.value === tempSelected.value)
  if (selectedOption) {
    selected.value = tempSelected.value
    emit('change', selectedOption)
  }
  closeBottomModal()
}

// 취소 버튼 클릭 시 임시 선택값 리셋
const cancelSelection = () => {
  tempSelected.value = selected.value
  closeBottomModal()
}
</script>

<style lang="scss" scoped>
.c-input {
  width: 100%;

  // 투명 스타일 옵션
  &.transparent {
    .c-inpType {
      .c-inp-el {
        height: auto;
        padding: 0;
        background: transparent;
        border: none;
        border-radius: 0;

        &:hover,
        &:focus {
          background: transparent;
          border-color: transparent;
        }
      }
    }

    .select-display {
      // min-width: 12rem; // 최소 너비 보장
      max-width: 16rem; // 최대 너비 제한
      width: auto; // 내용에 따라 자동 조절
      padding: 0;
      padding-right: 2.6rem;
      background: transparent;
      border: none;
      font-size: 1.6rem;
      font-weight: 500;
      color: #2b2b2b;
      white-space: nowrap; // 텍스트 줄바꿈 방지
      overflow: hidden; // 넘치는 텍스트 숨김
      text-overflow: ellipsis; // 넘치는 텍스트에 ... 표시

      &.placeholder-selected {
        color: #959595;
      }

      &:hover,
      &:focus {
        background: transparent;
        border-color: transparent;
      }
    }

    .custom-arrow {
      position: absolute;
      right: 0;
      top: 0;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      flex-shrink: 0; // 화살표는 항상 고정 크기

      &.open {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  &.search-bar {
    .c-inp-el {
      background-color: #f4f4f4;
      border-color: #f4f4f4;
      &:hover,
      &:focus {
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
    &:hover,
    &:focus {
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
    [role='button'],
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
        & + .input-timer {
          color: #555;
        }
      }
    }
    .custom-select {
      position: relative;
      display: flex;
      &.custom {
        width: 100%;
        margin-right: 0;
        select {
          width: 100%;
        }
      }
      &.mail {
        margin-right: 0;
        select {
          max-width: 15.9rem;
          padding-right: 2.6rem;
        }
      }
      select {
        width: 11.1rem;
        padding-right: 2.6rem;
        background-color: transparent;
        font-size: 16px;
        font-weight: 500;
        &.placeholder-selected {
          color: #959595;
        }
        &:not(.placeholder-selected) {
          color: #2b2b2b;
        }
        option:not([disabled]) {
          color: #2b2b2b;
        }
        &:invalid {
          color: #959595;
        }
        option {
          color: #2b2b2b;
        }
      }
      .select-display {
        flex: 1;
        padding-right: 2.6rem;
        background-color: transparent;
        font-size: 1.6rem;
        font-weight: 500;
        cursor: pointer;
        color: #2b2b2b;

        @media (max-width: 420px) {
          font-size: 1.4rem;
          min-width: 8rem;
        }

        &.placeholder-selected {
          color: #959595;
        }
      }
      .custom-arrow {
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 2.4rem;
        height: 2.4rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10L12.0008 14.58L17 10' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        &.open {
          transform: translateY(-50%) rotate(180deg);
        }
      }
    }
    .input-unit {
      width: fit-content;
      &.right {
        margin-left: 0.2rem;
      }
    }
    .at-txt {
      margin: 0 1.2rem;
    }
    .wave-txt {
      margin: 0 1.6rem;
      font-family: Roboto;
      font-size: 1.6rem;
    }
    .at-hyphen {
      width: 8px;
      height: 8px;
      margin: 0 1.2rem;
      flex-shrink: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='8' viewBox='0 0 9 8' fill='none'%3E%3Cpath d='M6.9001 4L2.1001 4' stroke='%232B2B2B' stroke-linecap='round'/%3E%3C/svg%3E");
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
      @include mixin.rippleEffectPrimary;
    }
    .calCost {
      position: relative;
      width: 2.4rem;
      height: 2.4rem;
      background-repeat: no-repeat;
      background-size: 2.4rem;
      font-size: 0;
      @include mixin.rippleEffectPrimary;
      &::after {
        background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
      }
      &.minus {
        margin-right: 1.2rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Crect width='24' height='24' rx='4' fill='%23EEEEEE'/%3E%3Cpath d='M16.8002 12L7.2002 12' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      }
      &.plus {
        margin-left: 1.2rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Crect width='24' height='24' rx='4' fill='%23EEEEEE'/%3E%3Cpath d='M12.0002 7.19995L12.0002 16.8M16.8002 12L7.2002 12' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      }
    }
    .input-timer {
      width: 2.5rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: rgba(76, 127, 247, 1);
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
.clear-btn {
  display: block;
  width: 2.4rem;
  height: 2.4rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.ico-magnifying-glass {
  width: 2.4rem;
  height: 2.4rem;
  margin-left: 1.2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M16.927 17.0401L20.4001 20.4001M19.2801 11.4401C19.2801 15.77 15.77 19.2801 11.4401 19.2801C7.11019 19.2801 3.6001 15.77 3.6001 11.4401C3.6001 7.11019 7.11019 3.6001 11.4401 3.6001C15.77 3.6001 19.2801 7.11019 19.2801 11.4401Z' stroke='%232B2B2B' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
}

// BottomModal 내 Select Options 스타일
.select-options {
  margin-left: -2rem;
  margin-right: -2rem;
  .option-item {
    display: flex;
    position: relative;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1.6rem 2rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &.selected {
      background-color: #f6f9ff;

      .option-label {
        color: vars.$blue-primary;
        font-weight: 700;
      }
    }

    .option-label {
      flex: 1;
      font-size: 1.6rem;
      font-weight: 500;
      color: #555555;
      text-align: left;
    }

    .check-icon {
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      right: 2rem;
      top: 50%;
      margin-top: -1.2rem;

      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }
}
</style>
