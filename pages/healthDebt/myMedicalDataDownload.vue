<template>
  <BaseBody page-title="레몬건강지수 AI 정밀분석" :show-back-button="true">
    <h2 class="fz-18 bold lineH-140">의료마이데이터 내려받기</h2>
    <p class="fz-16 medium lineH-140 mt-4">내려받을 기간을 선택해 주세요.</p>
    <div class="mt-16">
      <SegmentedTabs :tabs="segmentedTabs" :active-key="activeSegmentedTab" @tab-change="onSegmentedTabChange" />
    </div>
    <InputCalendarFromTo
      v-model:from-date="startDate"
      v-model:to-date="endDate"
      class="mt-8 mb-8"
      placeholder="시작일"
      placeholder2="종료일"
      :readonly="!isDirectInput"
      :disabled="!isDirectInput"
    />
    <p class="fz-11 lineH-140 text-center" style="color: #555">시작일 기준으로 최대 1년까지 조회가 가능합니다.</p>
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="내려받기"
      class="medium mt-8"
      @click="handleDownloadMyMedicalData"
    />
    <hr class="hr-section mt-20 mb-20 ml-n20 mr-n20" />
    <MyMedicalDataGuide />
    <div v-if="downloaded">
      <TableWrap :table-data="customTableData1" class="mt-18 text-left" />
      <pagination v-model:current-page="page" :total-items="5" />
      <ButtonGroup class="is-fixed">
        <Button
          btn-type="primary"
          element-type="button"
          aria-label="전달하기"
          class="lg btn-sticky medium w-full"
          @click="handleTransmissionMedicalData"
        />
      </ButtonGroup>
    </div>
    <!-- 최초 접근 시, DATA 없음 표시 -->
    <div v-else>
      <PointEmpty :text="'조회된 내역이 없습니다.'" />
    </div>

    <ConfirmModal
      :is-visible="showConfirmModal"
      :html="ConfirmModalContent"
      :confirm-button-text="confirmButtonText"
      :cancel-button-text="cancelButtonText"
      :is-show-cancel-button="isShowCancelButton"
      @cancel="closeConfirmModal"
      @close="closeConfirmModal"
      @confirm="handleToDownloadMydata"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import pagination from '~/components/publishing/input/pagination.vue'
import Button from '~/components/publishing/button/Button.vue'
import TableWrap from '~/components/common/tableWrap.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'
import BaseBody from '~/components/layout/BaseBody.vue'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'
import MyMedicalDataGuide from '~/components/publishing/healthDebt/MyMedicalDataGuide.vue'
import PointEmpty from '~/components/publishing/point/PointEmpty.vue'
// 내려받기 전 상태
const downloaded = ref(false)
// pagination 현재 page
const page = ref(1)
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
  (e: 'update:startDate' | 'update:endDate', date: Date): void
  (e: 'close' | 'cancel' | 'confirm'): void
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

const customTableData1 = ref({
  cols: [{ width: '14rem' }, { width: '7.2rem' }, { width: 'auto' }],
  headers: [[{ text: '병원' }, { text: '진단코드' }, { text: '질병 이름' }]],
  body: [
    [{ text: '중앙대학교병원' }, { text: 'A40' }, { text: '패혈증' }],
    [{ text: '중앙대학교병원' }, { text: 'A40' }, { text: '패혈증' }],
    [{ text: '중앙대학교병원' }, { text: 'A40' }, { text: '패혈증' }],
    [{ text: '중앙대학교병원' }, { text: 'A40' }, { text: '패혈증' }],
    [{ text: '중앙대학교병원' }, { text: 'A40' }, { text: '패혈증' }],
    [{ text: '중앙대학교병원' }, { text: 'A40' }, { text: '패혈증' }],
    [{ text: '중앙대학교병원' }, { text: 'A40' }, { text: '패혈증' }],
    [{ text: '중앙대학교병원' }, { text: 'A40' }, { text: '패혈증' }],
    [{ text: '중앙대학교병원' }, { text: 'A40' }, { text: '패혈증' }],
    [{ text: '중앙대학교병원' }, { text: 'A40' }, { text: '패혈증' }]
  ]
})
const ConfirmModalContent = ref('')
const showConfirmModal = ref(false)
const confirmButtonText = ref('연동정보 확인')
const cancelButtonText = ref('닫기')
const isShowCancelButton = ref(true)
const handleDownloadMyMedicalData = async () => {
  ConfirmModalContent.value = `
  <img src="/_nuxt/assets/images/walkingking/ico-warning.svg" alt="알림 이미지" style="margin: 0 auto"/>
  <div class="fz-18 bold mt-6" style="width: 28rem;">
    조회된 의료마이데이터가 없습니다.<br/>
    기간을 다시 선택해 주시거나<br/>
    MY병원 연동 정보를 확인해 주세요.
  </div>`
  showConfirmModal.value = true
}
const handleTransmissionMedicalData = async () => {
  ConfirmModalContent.value = `
  <img src="/_nuxt/assets/images/walkingking/ico-warning.svg" alt="알림 이미지" style="margin: 0 auto"/>
  <div class="fz-18 bold mt-6" style="width: 28rem;">
    내려받은 의료마이데이터를<br/>건강의신에 전달합니다.
  </div>
  <div class="fz-14 lineH-140 mt-8 pr-4 pl-4">
    <dl class="flex space-between">
      <dt style="color:#555">제공 대상</dt>
      <dd class="medium">준비중</dd>
    </dl>
    <dl class="flex space-between mt-6">
      <dt style="color:#555">제공 기간</dt>
      <dd class="medium">준비중</dd>
    </dl>
    <dl class="flex space-between mt-6">
      <dt style="color:#555">제공 목적</dt>
      <dd class="medium">레몬지수 서비스 이용</dd>
    </dl>
    <dl class="flex space-between mt-6">
      <dt style="color:#555">제공 데이터</dt>
      <dd class="medium">환자번호, 진단코드</dd>
    </dl>
  </div>
  `
  confirmButtonText.value = '전달하기'
  showConfirmModal.value = true
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
}

const handleToDownloadMydata = () => {
  showConfirmModal.value = false
  downloaded.value = true
}
</script>

<style scoped lang="scss"></style>
