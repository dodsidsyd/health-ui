<template>
  <!-- 만성질환 선택 전체 화면 팝업 -->
  <full-modal
    :is-visible="show"
    title="만성질환 선택"
    :is-show-cancel-button="false"
    :is-show-confirm-button="true"
    :confirm-button-text="`${localSelectedDiseases.length}건의 만성질환 선택`"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <template #content>
      <div class="chronic-disease-content">
        <div class="search-box">
          <InputText inp-type="search" placeholder="질환명을 검색해주세요" @search="handleSearch" />
        </div>

        <div class="disease-categories">
          <div class="disease-list">
            <label v-for="disease in filteredDiseases" :key="disease.id" class="disease-item">
              <input v-model="localSelectedDiseases" type="checkbox" :value="disease.id" class="disease-checkbox" />
              <span class="disease-name">{{ disease.name }}</span>
              <i class="icon check-icon"></i>
            </label>
          </div>
        </div>
      </div>
    </template>
  </full-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import FullModal from '~/components/common/modal/FullModal.vue'
import InputText from '~/components/publishing/input/InputText.vue'

// Props
interface Props {
  show: boolean
  selectedDiseases?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  selectedDiseases: () => []
})

// Emits
interface Emits {
  (e: 'close'): void
  (e: 'confirm', selectedDiseases: string[]): void
}

const emit = defineEmits<Emits>()

// 만성질환 데이터 타입 정의
interface ChronicDisease {
  id: string
  name: string
  category?: string
}

// 상태 관리
const searchKeyword = ref('')
const localSelectedDiseases = ref<string[]>([])

// 만성질환 목록 데이터
const chronicDiseases = ref<ChronicDisease[]>([
  { id: 'diabetes', name: '당뇨병' },
  { id: 'hypertension', name: '고혈압' },
  { id: 'dyslipidemia', name: '이상지질혈증' },
  { id: 'heart_disease', name: '심장질환' },
  { id: 'stroke', name: '뇌졸중' },
  { id: 'kidney_disease', name: '만성신장질환' },
  { id: 'liver_disease', name: '만성간질환' },
  { id: 'thyroid', name: '갑상선질환' },
  { id: 'arthritis', name: '관절염' },
  { id: 'osteoporosis', name: '골다공증' },
  { id: 'copd', name: '만성폐쇄성폐질환' },
  { id: 'asthma', name: '천식' },
  { id: 'depression', name: '우울증' },
  { id: 'anxiety', name: '불안장애' },
  { id: 'cancer', name: '암' }
])

// 검색 필터링된 만성질환 목록
const filteredDiseases = computed(() => {
  if (!searchKeyword.value.trim()) {
    return chronicDiseases.value
  }
  return chronicDiseases.value.filter(disease => disease.name.includes(searchKeyword.value.trim()))
})

// Props의 selectedDiseases 변경 감지
watch(
  () => props.selectedDiseases,
  newValue => {
    localSelectedDiseases.value = [...newValue]
  },
  { immediate: true }
)

// 팝업 표시 상태 변경 감지
watch(
  () => props.show,
  newValue => {
    if (newValue) {
      // 팝업이 열릴 때 현재 선택된 항목들로 초기화
      localSelectedDiseases.value = [...props.selectedDiseases]
    } else {
      searchKeyword.value = '' // 검색어 초기화
    }
  }
)

// 팝업 닫기
const handleClose = () => {
  emit('close')
}

// 선택 완료
const handleConfirm = () => {
  emit('confirm', localSelectedDiseases.value)
}

// 검색 버튼 클릭 핸들러
const handleSearch = (keyword: string) => {
  searchKeyword.value = keyword
  console.log('검색어 적용:', keyword)
}
</script>

<style scoped lang="scss">
// 만성질환 선택 콘텐츠 스타일
.chronic-disease-content {
  .search-box {
    margin-bottom: 2rem;

    .search-input {
      width: 100%;
      padding: 1.2rem 1.6rem;
      border: 0.1rem solid #e5e5e5;
      border-radius: 0.8rem;
      font-size: 1.6rem;
      outline: none;

      &:focus {
        border-color: vars.$blue-primary;
      }

      &::placeholder {
        color: #999;
      }
    }
  }

  .disease-categories {
    .category-title {
      font-size: 1.6rem;
      font-weight: vars.$semibold;
      margin-bottom: 1.6rem;
      color: #2b2b2b;
    }

    .disease-list {
      display: flex;
      flex-direction: column;

      .disease-item {
        display: flex;
        align-items: center;
        padding: 1.7rem 0;
        cursor: pointer;
        transition: all 0.2s ease;
        border-bottom: 0.1rem solid #eee;

        .disease-checkbox {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;

          &:checked + .disease-name {
            color: vars.$blue-primary;
            font-weight: vars.$bold;

            & + .icon {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M14 7L8.03374 13L6 10.9548' stroke='%234C7FF7' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            }
          }
        }

        .disease-name {
          font-size: 1.6rem;
          color: #555;
        }

        .icon {
          width: 2rem;
          height: 2rem;
          margin-left: auto;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M14 7L8.03374 13L6 10.9548' stroke='%23E2E2E2' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
  }
}
</style>
