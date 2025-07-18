<!-- MultipleSelectContainer.vue -->
<template>
  <div class="multiple-select-container">
    <!-- 동적으로 생성되는 Select 컴포넌트들 -->
    <div v-for="(selectConfig, index) in selectConfigs" :key="selectConfig.id || index" class="select-item">
      <Select
        :label="selectConfig.label"
        :modal-title="selectConfig.modalTitle"
        :select-placeholder="selectConfig.selectPlaceholder"
        :cancel-button-text="selectConfig.cancelButtonText || '선택'"
        :confirm-button-text="selectConfig.confirmButtonText || '확인'"
        :is-show-cancel-btn="selectConfig.isShowCancelBtn ?? false"
        :is-show-confirm-btn="selectConfig.isShowConfirmBtn ?? true"
        :is-show-close-btn="selectConfig.isShowCloseBtn ?? true"
        :custom-opts="selectConfig.customOpts"
        :label-class="selectConfig.labelClass"
        :label-size="selectConfig.labelSize"
        :has-required-mark="selectConfig.hasRequiredMark"
        :transparent="selectConfig.transparent"
        :modal-classes="selectConfig.modalClasses"
        @select="value => handleSelect(selectConfig.id, value, selectConfig)"
      />
    </div>

    <!-- 선택된 값들을 표시하는 영역 (옵션) -->
    <div v-if="showSelectedValues && hasSelectedValues" class="selected-values-section">
      <h3>선택된 값들 ({{ selectedValues.length }}개)</h3>
      <div class="selected-values-grid">
        <div v-for="(value, index) in selectedValues" :key="`${value}-${index}`" class="selected-value-item">
          <span class="selected-value">{{ selectedLabels[index] || value }}</span>
          <button
            @click="clearSelection(index)"
            class="clear-btn"
            :aria-label="`${selectedLabels[index] || value} 선택 해제`"
          >
            ×
          </button>
        </div>
      </div>

      <div class="action-buttons" v-if="showActionButtons">
        <button @click="clearAllSelections" class="clear-all-btn">모두 지우기</button>
        <button @click="applySelections" class="apply-btn">적용</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, readonly } from 'vue'
import Select from '~/components/publishing/input/Select.vue'

// 인터페이스 정의
interface SelectOption {
  value: string
  label: string
}

interface SelectConfig {
  id: string
  label?: string
  modalTitle: string
  selectPlaceholder: string
  cancelButtonText?: string
  confirmButtonText?: string
  isShowCancelBtn?: boolean
  isShowConfirmBtn?: boolean
  isShowCloseBtn?: boolean
  customOpts: SelectOption[]
  labelClass?: string
  labelSize?: string
  hasRequiredMark?: boolean
  transparent?: boolean
  modalClasses?: string
}

interface SelectedValue {
  value: string
  label: string
}

// Props 정의
const props = withDefaults(
  defineProps<{
    selectConfigs: SelectConfig[]
    showSelectedValues?: boolean
    showActionButtons?: boolean
    modelValue?: string[]
  }>(),
  {
    showSelectedValues: true,
    showActionButtons: true,
    modelValue: () => []
  }
)

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  select: [selectId: string, value: string, label: string, allValues: string[]]
  clear: [selectId: string]
  'clear-all': []
  apply: [values: string[]]
}>()

// 선택된 값들 저장 (배열 방식)
const selectedValues = ref<string[]>([])
const selectedLabels = ref<string[]>([])

// 선택된 값이 있는지 확인
const hasSelectedValues = computed(() => {
  return selectedValues.value.length > 0
})

// 초기값 설정
watch(
  () => props.modelValue,
  newValue => {
    if (newValue && Array.isArray(newValue)) {
      selectedValues.value = [...newValue]
      // 라벨 업데이트
      updateLabels()
    }
  },
  { immediate: true }
)

// 라벨 업데이트 함수
const updateLabels = () => {
  selectedLabels.value = selectedValues.value.map(value => {
    // 모든 설정에서 해당 값 찾기
    for (const config of props.selectConfigs) {
      const option = config.customOpts.find(opt => opt.value === value)
      if (option) {
        return option.label
      }
    }
    return value // 라벨을 찾지 못한 경우 값 자체를 반환
  })
}

// Select 이벤트 핸들러
const handleSelect = (selectId: string, value: string, config: SelectConfig) => {
  const selectedOption = config.customOpts.find(opt => opt.value === value)

  if (selectedOption) {
    // 이미 선택된 값인지 확인
    const existingIndex = selectedValues.value.indexOf(value)

    if (existingIndex === -1) {
      // 새로운 값 추가
      selectedValues.value.push(value)
      selectedLabels.value.push(selectedOption.label)
    }

    // v-model 업데이트
    emit('update:modelValue', [...selectedValues.value])

    // select 이벤트 발생
    emit('select', selectId, value, selectedOption.label, selectedValues.value)
  }
}

// 개별 선택 해제 (인덱스 기반)
const clearSelection = (index: number) => {
  selectedValues.value.splice(index, 1)
  selectedLabels.value.splice(index, 1)

  // v-model 업데이트
  emit('update:modelValue', [...selectedValues.value])

  emit('clear', `index-${index}`)
}

// 값으로 선택 해제
const clearSelectionByValue = (value: string) => {
  const index = selectedValues.value.indexOf(value)
  if (index !== -1) {
    clearSelection(index)
  }
}

// 모든 선택 해제
const clearAllSelections = () => {
  selectedValues.value = []
  selectedLabels.value = []

  emit('update:modelValue', [])
  emit('clear-all')
}

// 선택값 적용
const applySelections = () => {
  emit('apply', selectedValues.value)
}

// 설정에서 라벨 가져오기
const getConfigLabel = (selectId: string) => {
  const config = props.selectConfigs.find(c => c.id === selectId)
  return config?.label || config?.modalTitle || selectId
}

// 외부에서 사용할 수 있도록 expose
defineExpose({
  selectedValues: readonly(selectedValues),
  selectedLabels: readonly(selectedLabels),
  clearSelection,
  clearSelectionByValue,
  clearAllSelections,
  hasSelectedValues
})
</script>

<style scoped lang="scss">
.multiple-select-container {
  width: 100%;

  .select-item {
    margin-bottom: 16px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

.selected-values-section {
  margin-top: 24px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;

  h3 {
    margin: 0 0 16px 0;
    color: #495057;
    font-size: 16px;
    font-weight: 600;
  }
}

.selected-values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.selected-value-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #dee2e6;

  .selected-value {
    flex: 1;
    color: #495057;
    font-size: 14px;
  }

  .clear-btn {
    background: none;
    border: none;
    color: #dc3545;
    cursor: pointer;
    font-size: 16px;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f8d7da;
    }

    &:focus {
      outline: 2px solid #dc3545;
      outline-offset: 2px;
    }
  }
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  button {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.2s;

    &:focus {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    &.clear-all-btn {
      background-color: #6c757d;
      color: white;

      &:hover {
        background-color: #5a6268;
      }
    }

    &.apply-btn {
      background-color: #007bff;
      color: white;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}

// 반응형 디자인
@media (max-width: 768px) {
  .selected-values-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
}
</style>
