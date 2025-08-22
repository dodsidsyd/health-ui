<template>
  <div class="category-selector">
    <!-- 진료과 선택 -->
    <div class="category-section">
      <div class="category-header">
        <h3 class="category-title">진료과 확인</h3>
        <button class="select-button" @click="openTreatmentModal">
          진료과 선택 <i class="icon ico-chevron-right"></i>
        </button>
      </div>
      <div class="selected-items">
        <div v-for="(item, index) in selectedTreatments" :key="`treatment-${index}`" class="selected-item">
          <Button
            class="remove-button w-full"
            btn-type="text"
            :aria-label="item.name"
            icon="close"
            icon-position="right"
            @click="removeTreatment(index)"
          />
        </div>
      </div>
    </div>

    <!-- 검사종류 선택 -->
    <div class="category-section">
      <div class="category-header">
        <h3 class="category-title">검사종류</h3>
        <button class="select-button" @click="openExaminationModal">
          검사종류 선택 <i class="icon ico-chevron-right"></i>
        </button>
      </div>
      <div class="selected-items">
        <div v-for="(item, index) in selectedExaminations" :key="`examination-${index}`" class="selected-item">
          <Button
            class="remove-button w-full"
            btn-type="text"
            :aria-label="item.name"
            icon="close"
            icon-position="right"
            @click="removeExamination(index)"
          />
        </div>
      </div>
    </div>

    <!-- 진료과 선택 모달 -->
    <CategoryModal
      :is-visible="showTreatmentModal"
      title="진료과 선택"
      content-title="진료과는 여러 개 <br/>선택 가능해요."
      :items="treatments"
      :selected-items="selectedTreatments"
      search-placeholder="진료과를 검색하세요"
      @confirm="handleTreatmentConfirm"
      @update:is-visible="showTreatmentModal = $event"
    />

    <!-- 검사종류 선택 모달 -->
    <CategoryModal
      :is-visible="showExaminationModal"
      title="검사종류 선택"
      content-title="검사종류는 여러 개 <br/>선택 가능해요."
      :items="examinations"
      :selected-items="selectedExaminations"
      search-placeholder="검사종류를 검색하세요"
      @confirm="handleExaminationConfirm"
      @update:is-visible="showExaminationModal = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import CategoryModal from './CategoryModal.vue'
import Button from '~/components/publishing/button/Button.vue'

// Props
interface Props {
  modelValue?: {
    treatments: Array<{ id: string | number; name: string }>
    examinations: Array<{ id: string | number; name: string }>
  }
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ treatments: [], examinations: [] })
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [
    value: {
      treatments: Array<{ id: string | number; name: string }>
      examinations: Array<{ id: string | number; name: string }>
    }
  ]
}>()

// 상태 관리
const showTreatmentModal = ref(false)
const showExaminationModal = ref(false)

// 선택된 항목들
const selectedTreatments = ref<Array<{ id: string | number; name: string }>>([
  { id: 0, name: '전체' },
  ...props.modelValue.treatments
])
const selectedExaminations = ref<Array<{ id: string | number; name: string }>>([
  { id: 0, name: '전체' },
  ...props.modelValue.examinations
])

// 진료과 데이터 (예시)
const treatments = ref([
  { id: 1, name: '가정의학과' },
  { id: 2, name: '내과' },
  { id: 3, name: '내분비비내과' },
  { id: 4, name: '류마티스내과' },
  { id: 5, name: '마취통증의학과' },
  { id: 6, name: '방사선종양학과' },
  { id: 7, name: '병리과' },
  { id: 8, name: '비뇨의학과' },
  { id: 9, name: '산부인과' }
])

// 검사종류 데이터 (예시)
const examinations = ref([
  { id: 1, name: 'MRI' },
  { id: 2, name: 'CT' },
  { id: 3, name: 'X-RAY' },
  { id: 4, name: '심전도 검사' },
  { id: 5, name: '내시경' },
  { id: 6, name: '초음파' },
  { id: 7, name: '대장내시경' },
  { id: 8, name: '종양내시경' },
  { id: 9, name: '심전도 검사' }
])

// 모달 열기
const openTreatmentModal = () => {
  showTreatmentModal.value = true
}

const openExaminationModal = () => {
  showExaminationModal.value = true
}

// 모달 확인 처리
const handleTreatmentConfirm = (selectedItems: Array<{ id: string | number; name: string }>) => {
  selectedTreatments.value = selectedItems
  updateModelValue()
}

const handleExaminationConfirm = (selectedItems: Array<{ id: string | number; name: string }>) => {
  selectedExaminations.value = selectedItems
  updateModelValue()
}

// 항목 제거
const removeTreatment = (index: number) => {
  selectedTreatments.value.splice(index, 1)
  updateModelValue()
}

const removeExamination = (index: number) => {
  selectedExaminations.value.splice(index, 1)
  updateModelValue()
}

// 모델 값 업데이트
const updateModelValue = () => {
  // "전체" 항목을 제외하고 실제 선택된 항목들만 emit
  const actualTreatments = selectedTreatments.value.filter(item => item.id !== 0)
  const actualExaminations = selectedExaminations.value.filter(item => item.id !== 0)

  emit('update:modelValue', {
    treatments: actualTreatments,
    examinations: actualExaminations
  })
}

// props.modelValue가 변경될 때 "전체" 항목 유지
watch(
  () => props.modelValue,
  newValue => {
    selectedTreatments.value = [{ id: 0, name: '전체' }, ...newValue.treatments]
    selectedExaminations.value = [{ id: 0, name: '전체' }, ...newValue.examinations]
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.category-selector {
  .category-section {
    margin-bottom: 2.4rem;

    .category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.2rem;

      .category-title {
        font-size: 1.6rem;
        font-weight: 700;
        color: #2b2b2b;
        margin: 0;
      }

      .select-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-size: 1.4rem;
        color: #666;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        transition: color 0.2s ease;

        &:hover {
          color: #4c7ff7;
        }

        .icon {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
    }

    .selected-items {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      .remove-button {
        display: flex;
        justify-content: space-between;
        background: none;
        border: none;
        padding: 1.4rem 1.6rem;
        border-radius: 0.8rem;
        border: 1px solid #e2e2e2;
        background: #fff;
        transition: background-color 0.2s ease;

        :deep(.text) {
          padding: 0;
        }
        :deep(.icon) {
          background-size: cover;
        }
      }
    }
  }
}

.modal-content {
  .search-box {
    margin-bottom: 2rem;

    .search-input {
      width: 100%;
      padding: 1.2rem 1.6rem;
      border: 0.1rem solid #e9ecef;
      border-radius: 0.8rem;
      font-size: 1.4rem;
      outline: none;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: #4c7ff7;
      }

      &::placeholder {
        color: #999;
      }
    }
  }

  .category-list {
    max-height: 40rem;
    overflow-y: auto;

    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem 1.6rem;
      border: 0.1rem solid #e9ecef;
      border-radius: 0.8rem;
      margin-bottom: 0.8rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #f8f9fa;
        border-color: #4c7ff7;
      }

      &.selected {
        background-color: #e8f0ff;
        border-color: #4c7ff7;
      }

      .item-name {
        font-size: 1.4rem;
        color: #2b2b2b;
      }

      .icon {
        width: 1.6rem;
        height: 1.6rem;
        color: #4c7ff7;
      }
    }
  }
}

.modal-footer {
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
}
</style>
