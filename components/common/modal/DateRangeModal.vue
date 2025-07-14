<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      id="cDateRangePicker"
      class="c-modal bottom date-range-modal"
      :class="[{ 'is-show': isVisible }]"
      aria-describedby="modalBottomTitle"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div class="c-dim" @click="closeModal"></div>
      <div class="c-modal-inner">
        <div class="c-modal-header">
          <strong id="modalBottomTitle" class="c-modal-title">{{ title }}</strong>
          <button
            v-if="isShowCloseButton"
            type="button"
            class="c-modal-close-btn"
            aria-label="닫기"
            @click="closeModal"
          >
            <i class="icon close"></i>
          </button>
        </div>
        <div class="c-modal-body">
          <!-- 기간 선택 탭 -->
          <div class="date-range-tabs">
            <SegmentedTabs :tabs="segmentedTabs" :active-key="activeSegmentedTab" @tab-change="onSegmentedTabChange" />
          </div>

          <!-- 날짜 입력 영역 -->
          <div class="date-input-section">
            <InputCalendarFromTo
              v-model:from-date="startDate"
              v-model:to-date="endDate"
              placeholder="시작일"
              placeholder2="종료일"
              :readonly="!isDirectInput"
              :disabled="!isDirectInput"
            />
          </div>
        </div>
        <div class="c-modal-footer">
          <button
            v-if="isShowCancelButton"
            type="button"
            class="c-modal-btn cancel"
            :disabled="isDisabledCancelButton"
            @click="onClickCancel"
          >
            <span class="text">{{ cancelButtonText }}</span>
          </button>
          <button
            v-if="isShowConfirmButton"
            type="button"
            class="c-modal-btn confirm"
            :disabled="isDisabledConfirmButton"
            @click="onClickConfirm"
          >
            <span class="text">{{ confirmButtonText }}</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'

// 타입 정의
export interface DateRange {
  startDate: Date
  endDate: Date
  periodType: 'custom' | '3months' | '6months' | '12months'
  label: string
}

interface DateRangeModalProps extends BaseModalProps {
  initialStartDate?: Date | null
  initialEndDate?: Date | null
  initialPeriodType?: string
}

const props = withDefaults(defineProps<DateRangeModalProps>(), {
  title: '기간 선택',
  isVisible: false,
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false,
  autoClose: true,
  initialStartDate: null,
  initialEndDate: null,
  initialPeriodType: 'segment4'
})

const emit = defineEmits<{
  (e: ModalEmitEvent, dateRange?: DateRange): void
  (e: 'update:startDate', date: Date): void
  (e: 'update:endDate', date: Date): void
}>()

// 반응형 상태
const activeSegmentedTab = ref(props.initialPeriodType || 'segment4')
const startDate = ref<string>('')
const endDate = ref<string>('')

// body 스크롤 방지를 위한 상태
const originalBodyStyle = ref<string>('')

// SegmentedTabs 설정
const segmentedTabs = ref<SegmentTab[]>([
  { title: '3개월', key: 'segment1' },
  { title: '6개월', key: 'segment2' },
  { title: '12개월', key: 'segment3' },
  { title: '직접설정', key: 'segment4' }
])

// 직접 입력 모드 여부
const isDirectInput = computed(() => activeSegmentedTab.value === 'segment4')

// 날짜 포맷팅 유틸리티
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null
  const cleanedDate = dateStr.replace(/\./g, '-')
  const date = new Date(cleanedDate)
  return isNaN(date.getTime()) ? null : date
}

// 미리 정의된 기간에 따른 날짜 계산
const updatePredefinedDates = () => {
  const now = new Date()
  let start: Date
  let end: Date = new Date(now)

  switch (activeSegmentedTab.value) {
    case 'segment1': // 3개월
      start = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
      break
    case 'segment2': // 6개월
      start = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
      break
    case 'segment3': // 12개월
      start = new Date(now.getFullYear(), now.getMonth() - 12, now.getDate())
      break
    default:
      // 직접설정의 경우 기존 값 유지 또는 초기값 사용
      if (props.initialStartDate) {
        start = new Date(props.initialStartDate)
      } else {
        start = new Date(now.getFullYear(), now.getMonth(), 1) // 이번 달 1일
      }
      if (props.initialEndDate) {
        end = new Date(props.initialEndDate)
      }
      break
  }

  startDate.value = formatDate(start)
  endDate.value = formatDate(end)
}

// 선택된 기간 표시
const formattedPeriod = computed(() => {
  if (!startDate.value || !endDate.value) return ''

  const start = parseDate(startDate.value)
  const end = parseDate(endDate.value)

  if (!start || !end) return ''

  const startFormatted = formatDate(start)
  const endFormatted = formatDate(end)

  return `${startFormatted} ~ ${endFormatted}`
})

// 기간 라벨 계산
const getPeriodLabel = (): string => {
  switch (activeSegmentedTab.value) {
    case 'segment1':
      return '최근 3개월'
    case 'segment2':
      return '최근 6개월'
    case 'segment3':
      return '최근 12개월'
    default:
      return '사용자 지정'
  }
}

// 탭 변경 핸들러
const onSegmentedTabChange = (key: string) => {
  activeSegmentedTab.value = key
  updatePredefinedDates()

  console.log(`📅 기간 탭 변경: ${getPeriodLabel()}`)
}

// body 스크롤 방지
const preventBodyScroll = () => {
  const body = document.body
  originalBodyStyle.value = body.style.overflow
  body.style.overflow = 'hidden'
}

const restoreBodyScroll = () => {
  const body = document.body
  body.style.overflow = originalBodyStyle.value
}

// 모달 열기/닫기 처리
watch(
  () => props.isVisible,
  async newVisible => {
    if (newVisible) {
      // 초기값 설정
      activeSegmentedTab.value = props.initialPeriodType || 'segment4'
      updatePredefinedDates()
      preventBodyScroll()

      await nextTick()
      const modal = document.getElementById('cDateRangePicker')
      if (modal) {
        modal.focus()
      }
    } else {
      restoreBodyScroll()
    }
  }
)

// ESC 키 이벤트 핸들러
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isVisible) {
    closeModal()
  }
}

// 이벤트 리스너 등록/제거
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  restoreBodyScroll()
})

const closeModal = () => {
  if (!props.autoClose) return
  emit('close')
}

const onClickCancel = () => {
  emit('cancel')
}

const onClickConfirm = () => {
  const start = parseDate(startDate.value)
  const end = parseDate(endDate.value)

  if (!start || !end) {
    console.warn('유효하지 않은 날짜입니다.')
    return
  }

  // 시작일이 종료일보다 늘은지 확인
  if (start > end) {
    console.warn('시작일이 종료일보다 늘을 수 없습니다.')
    return
  }

  const dateRange: DateRange = {
    startDate: start,
    endDate: end,
    periodType:
      activeSegmentedTab.value === 'segment1'
        ? '3months'
        : activeSegmentedTab.value === 'segment2'
          ? '6months'
          : activeSegmentedTab.value === 'segment3'
            ? '12months'
            : 'custom',
    label: getPeriodLabel()
  }

  emit('confirm', dateRange)
  emit('update:startDate', start)
  emit('update:endDate', end)

  console.log('📅 선택된 기간:', dateRange)
}

const isDisabledCancelButton = computed(() => props.disabledCancelButton)
const isDisabledConfirmButton = computed(() => props.disabledConfirmButton)
</script>

<style scoped lang="scss">
.date-range-modal {
  .c-modal-body {
    padding-top: 1.6rem;

    .date-input-section {
      margin-top: 0.5rem;
    }

    .selected-period {
      padding: 1.6rem;
      background-color: #f8f9fa;
      border-radius: 0.8rem;
      border: 1px solid #e2e2e2;

      .period-text {
        margin: 0;
        font-size: 1.4rem;
        color: #26282c;
        line-height: 1.4;

        strong {
          font-weight: 600;
          color: #4c7ff7;
        }
      }
    }
  }
}

// 비활성화된 입력 필드 스타일
:deep(.c-input .c-inpType .c-inp-el) {
  &:has(.c-inp:disabled) {
    background-color: #f8f9fa;
    border-color: #e2e2e2;
    opacity: 0.7;

    .c-inp {
      color: #959595;
      cursor: not-allowed;
    }

    .customCalendar {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &:has(.c-inp:read-only) {
    background-color: #f8f9fa;
    border-color: #e2e2e2;

    .c-inp {
      color: #959595;
      cursor: default;
    }

    .customCalendar {
      opacity: 0.5;
      cursor: default;
    }
  }
}
</style>
