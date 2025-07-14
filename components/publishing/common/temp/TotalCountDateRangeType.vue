<template>
  <div class="c-count-box">
    <div>
      총 <strong>{{ displayCount }}</strong
      >건
    </div>
    <!-- 버튼 타입 -->
    <div class="select-option btn-type">
      <button
        v-for="(option, index) in periodOptions"
        :key="option.key"
        type="button"
        :class="{
          'select-item': true,
          active: option.key === currentPeriod
        }"
        @click="handleOptionClick(option, index)"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- 기본 날짜 범위 모달 -->
    <DateRangeModal
      v-if="!useCustomModal"
      :is-visible="isShowDatePickerModal"
      v-bind="datepickerProps"
      @cancel="clickDatePickerCancel"
      @confirm="clickDatePickerConfirm"
      @close="toggleDatePickerModal"
    />
    
    <!-- 커스텀 모달 슬롯 -->
    <DateRangeModal
      v-if="useCustomModal"
      :is-visible="isShowDatePickerModal"
      :title="modalTitle"
      :is-show-close-button="true"
      :is-show-cancel-button="false"
      :is-show-confirm-button="false"
      @cancel="clickDatePickerCancel"
      @close="toggleDatePickerModal"
    >
      <template #content>
        <slot name="modal-content" 
              :close="toggleDatePickerModal"
              :confirm="handleCustomModalConfirm"
              :cancel="clickDatePickerCancel">
          <!-- 기본 내용 -->
          <div class="default-modal-content">
            <p>커스텀 모달 내용을 여기에 추가하세요.</p>
          </div>
        </slot>
      </template>
    </DateRangeModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import DateRangeModal, { type DateRange } from '~/components/common/modal/DateRangeModal.vue'

// 옵션 타입 정의
export interface SelectOption {
  label: string
  value?: string | number
  key?: string
  action?: 'modal' | 'direct' | 'custom'
  disabled?: boolean
}

// Props 정의
interface Props {
  count?: number
  data?: any[]  // 전체 데이터를 받아서 내부에서 필터링
  selectOptions?: SelectOption[]
  activeOption?: string | number
  modalTitle?: string
  showModal?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  useCustomModal?: boolean  // 커스텀 모달 사용 여부
  customFilterMode?: boolean  // 커스텀 필터링 모드 (부모에서 직접 처리)
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  data: () => [],
  selectOptions: () => [
    { label: '전체', key: 'all', value: 'all', action: 'direct' },
    { label: '3개월', key: '3months', value: '3months', action: 'direct' },
    { label: '6개월', key: '6months', value: '6months', action: 'direct' },
    { label: '12개월', key: '12months', value: '12months', action: 'direct' },
    { label: '직접설정', key: 'custom', value: 'custom', action: 'modal' }
  ],
  activeOption: 'all',
  modalTitle: '조회기간',
  showModal: false,
  confirmButtonText: '조회하기',
  cancelButtonText: '취소',
  useCustomModal: false,
  customFilterMode: false
})

// Emits 정의
const emit = defineEmits<{
  (e: 'filtered-data-change', data: any[]): void
  (e: 'period-change', period: string): void
  (e: 'option-change', option: SelectOption, index: number): void  // 커스텀 모드용
  (e: 'custom-modal-confirm', data: any): void  // 커스텀 모달 확인
  (e: 'update:activeOption', value: string | number): void
  (e: 'update:showModal', value: boolean): void
}>()

// 반응형 상태
const isShowDatePickerModal = ref(props.showModal)
const currentPeriod = ref(props.activeOption)
const filteredData = ref<any[]>([])

// 기간 옵션 computed
const periodOptions = computed(() => props.selectOptions)

// 필터링된 데이터 개수 computed
const displayCount = computed(() => {
  return props.count > 0 ? props.count : filteredData.value.length
})

// 데이터 필터링 함수
const filterDataByPeriod = (period: string) => {
  if (!props.data || props.data.length === 0) {
    filteredData.value = []
    return
  }

  const now = new Date()
  
  switch (period) {
    case 'all':
      filteredData.value = [...props.data]
      break
    case '3months':
      filteredData.value = filterByMonths(3, now)
      break
    case '6months':
      filteredData.value = filterByMonths(6, now)
      break
    case '12months':
      filteredData.value = filterByMonths(12, now)
      break
    default:
      filteredData.value = [...props.data]
  }
  
  // 필터링된 데이터를 부모에게 전달
  emit('filtered-data-change', filteredData.value)
  emit('period-change', period)
}

// 월별 필터링 헬퍼 함수
const filterByMonths = (months: number, now: Date) => {
  const startDate = new Date(now.getFullYear(), now.getMonth() - months, now.getDate())
  
  return props.data.filter(item => {
    // date 필드를 찾아서 필터링 (여러 필드명 지원)
    const dateValue = item.date || item.createdAt || item.created_at || item.timestamp
    if (!dateValue) return false
    
    const itemDate = new Date(dateValue)
    return itemDate >= startDate && itemDate <= now
  })
}

// 옵션 클릭 핸들러
const handleOptionClick = (option: SelectOption, index: number) => {
  console.log('클릭된 옵션:', option)
  console.log('커스텀 필터 모드:', props.customFilterMode)
  console.log('커스텀 모달 사용:', props.useCustomModal)
  
  // 비활성화된 옵션은 무시
  if (option.disabled) {
    console.log('비활성화된 옵션')
    return
  }

  // 활성 옵션 업데이트
  currentPeriod.value = option.key || option.value || index
  emit('update:activeOption', currentPeriod.value)

  // 커스텀 필터링 모드인 경우 부모에게 이벤트 전달
  if (props.customFilterMode) {
    console.log('커스텀 필터링 모드 - 부모에게 이벤트 전달')
    emit('option-change', option, index)
    
    // 모달 액션인 경우 모달 열기
    if (option.action === 'modal') {
      console.log('모달 열기 시도')
      clickDateRangeModal()
    }
    return
  }

  // 액션에 따른 처리
  if (option.action === 'direct') {
    // 직접 처리 - 데이터 필터링
    filterDataByPeriod(option.key || option.value?.toString() || 'all')
    console.log(`📅 ${option.label} 옵션 선택 - ${filteredData.value.length}개 데이터 필터링 완료`)
  } else if (option.action === 'modal') {
    // 모달 열기
    console.log('모달 열기')
    clickDateRangeModal()
  } else {
    // 기본적으로 직접 처리
    filterDataByPeriod(option.key || option.value?.toString() || 'all')
  }
}

const clickDateRangeModal = () => {
  console.log('모달 열기 함수 호출')
  toggleDatePickerModal()
}

const toggleDatePickerModal = () => {
  console.log('모달 토글 - 현재 상태:', isShowDatePickerModal.value)
  isShowDatePickerModal.value = !isShowDatePickerModal.value
  console.log('모달 토글 - 변경 후 상태:', isShowDatePickerModal.value)
  emit('update:showModal', isShowDatePickerModal.value)
}

const clickDatePickerCancel = () => {
  isShowDatePickerModal.value = false
  emit('update:showModal', false)
}

const clickDatePickerConfirm = (dateRange: DateRange) => {
  isShowDatePickerModal.value = false
  emit('update:showModal', false)
  
  // 사용자 지정 기간으로 데이터 필터링
  currentPeriod.value = 'custom'
  filterDataByDateRange(dateRange)
  
  console.log('📅 날짜 범위 선택 완료:', dateRange, `- ${filteredData.value.length}개 데이터`)
}

// 커스텀 모달 확인 처리
const handleCustomModalConfirm = (data?: any) => {
  isShowDatePickerModal.value = false
  emit('update:showModal', false)
  emit('custom-modal-confirm', data)
  
  console.log('📅 커스텀 모달 확인:', data)
}

// 날짜 범위로 데이터 필터링
const filterDataByDateRange = (dateRange: DateRange) => {
  if (!props.data || props.data.length === 0) {
    filteredData.value = []
    return
  }
  
  filteredData.value = props.data.filter(item => {
    const dateValue = item.date || item.createdAt || item.created_at || item.timestamp
    if (!dateValue) return false
    
    const itemDate = new Date(dateValue)
    return itemDate >= dateRange.startDate && itemDate <= dateRange.endDate
  })
  
  // 필터링된 데이터를 부모에게 전달
  emit('filtered-data-change', filteredData.value)
  emit('period-change', 'custom')
}

// DateRangeModal props 계산
const datepickerProps = computed(() => ({
  title: props.modalTitle,
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: props.confirmButtonText,
  cancelButtonText: props.cancelButtonText,
  disabledCancelButton: false,
  disabledConfirmButton: false,
  autoClose: true,
  // 현재 선택된 기간에 따라 초기 설정
  initialPeriodType:
    currentPeriod.value === '3months'
      ? 'segment1'
      : currentPeriod.value === '6months'
        ? 'segment2'
        : currentPeriod.value === '12months'
          ? 'segment3'
          : 'segment4'
}))

// props.data 변경 감시
watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    // 데이터가 변경되면 현재 기간으로 다시 필터링
    filterDataByPeriod(currentPeriod.value?.toString() || 'all')
  }
}, { immediate: true })

// activeOption 변경 감시
watch(() => props.activeOption, (newOption) => {
  if (newOption !== currentPeriod.value) {
    currentPeriod.value = newOption
    filterDataByPeriod(newOption?.toString() || 'all')
  }
})

// 초기화
onMounted(() => {
  if (props.data && props.data.length > 0) {
    filterDataByPeriod(currentPeriod.value?.toString() || 'all')
  }
})
</script>

<style scoped lang="scss">
.c-count-box {
  display: flex;
  flex-direction: row;
  align-items: center;

  .select-option {
    display: flex;
    flex-direction: row;
    margin-left: auto;
    align-items: center;

    &.btn-type {
      .select-item {
        font-size: 1.6rem;
        font-weight: 500;
        color: #555;
        position: relative;
        padding-left: 2.4rem;
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;

        &::before {
          content: '';
          position: absolute;
          left: 1.2rem;
          top: 50%;
          margin-top: -0.6rem;
          display: block;
          width: 0.1rem;
          height: 1.2rem;
          background: #e2e2e2;
        }

        &:hover {
          color: #4c7ff7;
        }

        &.active {
          color: #4c7ff7;
          font-weight: 700;
        }

        &:disabled {
          color: #d5d5d5;
          cursor: not-allowed;

          &:hover {
            color: #d5d5d5;
          }
        }

        &:first-child {
          padding-left: 0;

          &::before {
            content: none;
          }
        }
      }
    }
  }
}
@media (max-width: 375px) {
  .c-count-box {
    .select-option {
      &.btn-type {
        .select-item {
          font-size: 1.4rem;
          padding-left: 1.4rem;
          &::before {
            left: 0.7rem;
          }
        }
      }
    }
  }
}
</style>
