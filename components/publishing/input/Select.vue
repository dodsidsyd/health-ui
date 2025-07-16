<template>
  <div :class="['c-input', { 'search-bar': inpType === 'search', transparent: transparent }]">
    <div class="c-inpType">
      <label v-if="label" :class="['c-label', labelClass]" :style="{ fontSize: labelSize }">
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
      <div class="c-inp-el">
        <div class="custom-select custom" @click="openBottomModal">
          <div :class="['select-display', { 'placeholder-selected': !selectedLabel }]">
            {{ selectedLabel || selectPlaceholder }}
          </div>
          <i class="custom-arrow" :class="{ open: isShowBottomModal }"></i>
        </div>
      </div>
    </div>

    <!-- Teleport BottomModal to body for independence -->
    <Teleport to="body">
      <BottomModal
        v-if="isShowBottomModal"
        :is-visible="isShowBottomModal"
        :title="modalTitle || '옵션 선택'"
        :is-show-cancel-button="isShowCancelBtn"
        :is-show-confirm-button="isShowConfirmBtn"
        :is-show-close-button="isShowCloseBtn"
        :cancel-button-text="confirmButtonText"
        :confirm-button-text="cancelButtonText"
        :class="modalClasses"
        role="dialog"
        :aria-label="modalTitle || '옵션 선택'"
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
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'

interface OptionType {
  value: string
  label: string
}

const props = defineProps({
  label: { type: String, default: '' },
  labelSize: { type: String, default: '1.2rem' }, // 라벨 폰트 크기
  labelClass: { type: String, default: '' }, // 라벨 추가 CSS 클래스
  selectPlaceholder: { type: String, default: '선택하세요' },
  modalTitle: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  inpType: { type: String, default: '' },
  transparent: { type: Boolean, default: false },
  isShowCloseBtn: { type: Boolean, default: true },
  isShowCancelBtn: { type: Boolean, default: true },
  isShowConfirmBtn: { type: Boolean, default: true },
  cancelButtonText: { type: String, default: '취소' },
  confirmButtonText: { type: String, default: '확인' },
  customOpts: { type: Array as () => OptionType[], default: () => [] } // camelCase로 통일
})

const emit = defineEmits(['update:modelValue', 'change'])

// 상태 관리
const selected = ref(props.modelValue)
const tempSelected = ref(props.modelValue) // 임시 선택값
const isShowBottomModal = ref(false)
const hasParentModal = ref(false) // 부모 모달 존재 여부

// 선택된 옵션의 라벨 표시
const selectedLabel = computed(() => {
  const selectedOption = props.customOpts.find(option => option.value === selected.value)
  return selectedOption?.label || ''
})
// 라벨에 * 표시가 있는지 확인
const hasRequiredMark = computed(() => {
  return props.label.includes('*')
})

// 라벨을 * 기준으로 분리
const labelParts = computed(() => {
  if (!hasRequiredMark.value) return []
  return props.label.split(/([*])/).filter(part => part !== '')
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

// 부모 모달 감지 함수
const detectParentModal = () => {
  try {
    // 현재 열려있는 .c-modal.bottom.is-show 모달들을 찾기
    const existingModals = document.querySelectorAll('.c-modal.bottom.is-show')

    // Select 컴포넌트가 포함된 모달 제외하고 다른 모달이 있는지 확인
    for (const modal of existingModals) {
      // 해당 모달 내부에 select 입력이 있는지 확인
      const hasSelectInput = modal.querySelector('.c-input, .custom-select')
      if (hasSelectInput) {
        console.log('Parent modal found with select input:', modal)
        return true
      }
    }

    // 오늘버레이가 있는 모달을 찾아서 부모 모달 여부 판단
    const modalsWithOverlay = document.querySelectorAll('.c-modal.is-show .c-dim')
    return modalsWithOverlay.length > 0
  } catch (error) {
    console.warn('Error detecting parent modal:', error)
    return false
  }
}

// 동적 클래스 생성
const modalClasses = computed(() => {
  const baseClass = 'select-modal-teleported'
  const parentModalClass = hasParentModal.value ? 'has-parent-modal' : 'no-parent-modal'
  return `${baseClass} ${parentModalClass}`
})

// 부모 모달 dim 제어 함수들
const hideParentModalDim = () => {
  try {
    // 부모 모달의 dim 요소들을 찾아서 투명하게 만들기
    const parentModals = document.querySelectorAll('.c-modal.bottom.is-show:not(.select-modal-teleported)')
    parentModals.forEach(modal => {
      const dimElement = modal.querySelector('.c-dim')
      if (dimElement) {
        // 기존 배경색 저장
        dimElement.dataset.originalBackground = dimElement.style.backgroundColor || ''
        // 투명하게 설정
        dimElement.style.backgroundColor = 'transparent'
        dimElement.classList.add('select-hidden-dim')
        console.log('Parent modal dim hidden:', modal)
      }
    })
  } catch (error) {
    console.warn('Error hiding parent modal dim:', error)
  }
}

const restoreParentModalDim = () => {
  try {
    // 숨겨졌던 부모 모달 dim 복원
    const hiddenDims = document.querySelectorAll('.c-dim.select-hidden-dim')
    hiddenDims.forEach(dimElement => {
      // 기존 배경색 복원
      const originalBackground = dimElement.dataset.originalBackground
      if (originalBackground) {
        dimElement.style.backgroundColor = originalBackground
      } else {
        dimElement.style.backgroundColor = '' // 기본값으로 복원
      }
      dimElement.classList.remove('select-hidden-dim')
      delete dimElement.dataset.originalBackground
      console.log('Parent modal dim restored:', dimElement)
    })
  } catch (error) {
    console.warn('Error restoring parent modal dim:', error)
  }
}

// BottomModal 관련 함수들
const openBottomModal = async () => {
  if (props.disabled || props.readonly) return
  console.log('openBottomModal - customOpts:', props.customOpts)

  // 부모 모달 존재 여부 감지
  hasParentModal.value = detectParentModal()
  console.log('Parent modal detected:', hasParentModal.value)

  // 부모 모달의 dim을 투명하게 처리
  if (hasParentModal.value) {
    hideParentModalDim()
  }

  tempSelected.value = selected.value // 모달 열 때 현재 선택값으로 초기화
  isShowBottomModal.value = true

  // body 스크롤 방지
  await nextTick()
  document.body.style.overflow = 'hidden'
}

const closeBottomModal = () => {
  // 부모 모달의 dim을 복원
  if (hasParentModal.value) {
    restoreParentModalDim()
  }

  isShowBottomModal.value = false
  // body 스크롤 복원
  document.body.style.overflow = ''
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

// 컴포넌트 unmount 시 cleanup
onUnmounted(() => {
  // 모달이 열린 상태로 unmount될 경우 body 스크롤 복원
  if (isShowBottomModal.value) {
    document.body.style.overflow = ''
    // 부모 모달 dim도 복원
    if (hasParentModal.value) {
      restoreParentModalDim()
    }
  }
})
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
  .required-mark {
    color: #f14960; // 빨간색으로 * 표시
    font-weight: 400;
    display: inline-block;
    margin-left: 0.4rem;
  }
}

.c-inpType {
  text-align: left;
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

// Teleported Modal 독립적 스타일 (Global 적용)
:global(.select-modal-teleported.c-modal.bottom) {
  z-index: 9999; // 부모 모달보다 높은 z-index

  .c-modal-inner {
    max-height: 100vh !important; // 화면 전체 사용
    border-radius: 2rem 2rem 0 0;
  }
}

:global(.select-modal-teleported .c-dim) {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

// 부모 모달 dim 숨김 처리
:global(.c-dim.select-hidden-dim) {
  background-color: transparent !important;
  transition: background-color 0.3s ease;
}

// 부모 모달 dim 복원 애니메이션
:global(.c-dim:not(.select-hidden-dim)) {
  transition: background-color 0.3s ease;
}
</style>
