<template>
  <BaseBody
    :show-back-button="true"
    page-title="병원서류 발급신청"
    logo-type="text"
    :has-cart="true"
    :cart-count="2"
    class="pb-60"
  >
    <h1 class="c-tit mt-24">
      <span class="text"> 발급할 서류 정보를<br />선택해 주세요. </span>
    </h1>
    <div class="wrap-form">
      <div class="tit-form">병원</div>
      <Select
        modal-title="병원"
        select-placeholder="병원을 선택해주세요"
        cancel-button-text="선택"
        :is-show-cancel-btn="false"
        :custom-opts="hospitalOptions"
      />
      <div class="tit-form">발급서류</div>
      <Select
        modal-title="발급서류"
        select-placeholder="발급서류를 선택해주세요"
        cancel-button-text="선택"
        :is-show-cancel-btn="false"
        :custom-opts="documentOptions"
      />
      <div class="tit-form">연도</div>
      <Select
        modal-title="발급연도 선택"
        select-placeholder="발급연도 선택"
        cancel-button-text="선택"
        :is-show-cancel-btn="false"
        :custom-opts="yearOptions"
      />
      <div class="tit-form">조회기간</div>
      <!-- 기간 선택 탭 -->
      <div class="date-range-tabs">
        <SegmentedTabs :tabs="segmentedTabs" :active-key="activeSegmentedTab" @tab-change="onSegmentedTabChange" />
      </div>

      <!-- 날짜 입력 영역 -->
      <div class="date-input-section mt-8">
        <InputCalendarFromTo
          v-model:from-date="startDate"
          v-model:to-date="endDate"
          placeholder="시작일"
          placeholder2="종료일"
          :readonly="!isDirectInput"
          :disabled="!isDirectInput"
        />
      </div>
      <div class="tit-form">사용용도</div>
      <Select
        modal-title="사용할 용도 선택"
        select-placeholder="사용할 용도 선택"
        cancel-button-text="선택"
        :is-show-cancel-btn="false"
        :custom-opts="usageOptions"
      />
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="다음"
      class="lg w-full medium btn-sticky"
      @click="clickNext"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Select from '~/components/publishing/input/Select.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'

const hospitalOptions = [
  { value: '강동성심병원', label: '강동성심병원' },
  { value: '삼성서울병원', label: '삼성서울병원' },
  { value: '서울아산병원', label: '서울아산병원' },
  { value: '세브란스병원', label: '세브란스병원' },
  { value: '한양대병원', label: '한양대병원' }
]
const documentOptions = [
  { value: '진료확인서', label: '진료확인서' },
  { value: '소견서', label: '소견서' },
  { value: '입퇴원확인서', label: '입퇴원확인서' },
  { value: '처방전', label: '처방전' },
  { value: '진단서', label: '진단서' }
]
const yearOptions = [
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' }
]
const usageOptions = [
  { value: '보험청구', label: '보험청구' },
  { value: '개인용', label: '개인용' },
  { value: '기타', label: '기타' }
]

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

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '병원서류 발급신청'
  // utils: ['phone']
  // customTitle: 'logo',
})
</script>

<style scoped lang="scss">
.wrap-form {
  margin: 2rem 0 4.8rem;
}
</style>
