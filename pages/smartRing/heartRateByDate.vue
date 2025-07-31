<template>
  <BaseBody page-title="심박수" :show-back-button="true">
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

    <DateRangeSelect
      v-model="selectedDate"
      class="mt-23"
      :navigation-mode="navigationMode"
      @change="handleDateChange"
    />
    <QuickSummary
      v-if="currentVitalScore > 0"
      :score="String(currentVitalScore)"
      :unit="'bpm'"
      :title="'심박수'"
      :icon-class="'ico-heart-beep'"
      :badge-text="getBadgeText(currentVitalScore)"
      :color="getBadgeColor(currentVitalScore)"
      @tooltip-click="handleTooltipClick"
    >
      몸과 마음이 많이 지친 상태예요. 충분한 휴식을 취하고 주변에 도움을 요청해보세요.
    </QuickSummary>
    <!-- 데이터가 없는 경우 -->
    <QuickSummaryNodata
      v-else
      :unit="'bpm'"
      :title="'심박수'"
      :icon-class="'ico-heart-beep'"
      @tooltip-click="handleTooltipClick"
    />
    <!-- daily 모드일 때 DailyWaveLineChart 표시 -->
    <DailyWaveLineChart
      v-if="navigationMode === 'day'"
      :items="dailyStatusItems"
      :y-axis-label-formatter="getBadgeText"
      :min-point="GRAPH_MIN_POINT"
      :max-point="GRAPH_MAX_POINT"
      :y-axis-label-points="GRAPH_Y_AXIS_LABEL_POINTS"
    />

    <!-- weekly 모드일 때 WeekChartBar 표시 -->
    <WeekChartBar
      v-if="navigationMode === 'week'"
      :selected-date="selectedDate"
      :vital-data="vitalData"
      @day-click="handleWeekDayClick"
    />

    <!-- month 모드일 때만 VitalCalendar 표시 -->
    <VitalCalendar
      v-if="navigationMode === 'month'"
      :vital-record="true"
      :selected-date="selectedDate"
      :vital-data="vitalData"
      @date-change="handleCalendarDateChange"
      @date-status-change="handleDateStatusChange"
      @emoji-click="handleEmojiClick"
    />
    <!-- weekly & month 모드일 때만 범례 표시 -->
    <EmojiInfoBox v-if="navigationMode !== 'day'" :legend-items="LegendDefinitions" />
    <SmartRingUsingTipWrap :title="'심박수'">
      <SmartRingUsingTipItem>
        심박수(BPM, Beats Per Minute)는 1분 동안 심장이 뛰는 횟수를 의미하며, 신체 활동, 감정 상태, 건강 상태에 따라
        변합니다. 일반적으로 성인의 안정 시 심박수는 60~100BPM이며, 낮을수록 심폐 건강이 좋은 경향이 있습니다. 운동이나
        스트레스 상황에서는 심박수가 증가하고, 휴식 중에는 감소하는 특징이 있습니다.
      </SmartRingUsingTipItem>
    </SmartRingUsingTipWrap>

    <SmartRingStatusWrap
      :title="
        navigationMode === 'month'
          ? '월간 심박수 현황'
          : navigationMode === 'week'
            ? '주간 심박수 현황'
            : '일일 심박수 현황'
      "
    >
      <template v-if="currentStatusItems.length > 0">
        <SmartRingStatusItem
          v-for="(item, index) in currentStatusItems"
          :key="index"
          :unit="'bpm'"
          :list-items="item"
          :badge-text="getBadgeText(item.point)"
          :color="getBadgeColor(item.point)"
        />
      </template>
      <template v-else>
        <SmartRingHasNoItem />
      </template>
    </SmartRingStatusWrap>

    <FullModal :is-visible="showTooltipModal" v-bind="fullModalProps" @close="toggleFullModal">
      <template #content>
        <!-- 수면점수일 경우 title="'참고'" -->
        <GuidePopDetail
          :title="'출처'"
          :table-data="customTableData1"
          :list-items="guideList1"
          :additional-items="guideList2"
        />
      </template>
    </FullModal>
  </BaseBody>
</template>
<script setup lang="ts">
import { ref, computed, h } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

import DateRangeSelect from '~/components/smartRing/DateRangeSelect.vue'
import DailyWaveLineChart from '~/components/smartRing/DailyWaveLineChart.vue'
import QuickSummary from '~/components/smartRing/QuickSummary.vue'
import QuickSummaryNodata from '~/components/smartRing/QuickSummaryNodata.vue'
import VitalCalendar from '~/components/smartRing/VitalCalendar.vue'
import WeekChartBar from '~/components/smartRing/WeekChartBar.vue'
import SmartRingUsingTipWrap from '~/components/smartRing/SmartRingUsingTipWrap.vue'
import SmartRingUsingTipItem from '~/components/smartRing/SmartRingUsingTipItem.vue'
import SmartRingStatusWrap from '~/components/smartRing/SmartRingStatusWrap.vue'
import SmartRingStatusItem, { type ListItemsProps } from '~/components/smartRing/SmartRingStatusItem.vue'
import SmartRingHasNoItem from '~/components/smartRing/SmartRingHasNoItem.vue'
import FullModal from '~/components/common/modal/FullModal.vue'
import CommonBadge, { type BadgeColorType } from '~/components/common/badge/CommonBadge.vue'
import GuidePopDetail from '~/components/smartRing/GuidePopDetail.vue'
import EmojiInfoBox, { type LegendDefinition } from '~/components/smartRing/EmojiInfoBox.vue'
// 활력 점수 상세 정보 모달 상태
const showTooltipModal = ref(false)
const toggleFullModal = () => {
  showTooltipModal.value = !showTooltipModal.value
}
const fullModalProps = ref({
  title: '심박수 점수란?',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const LegendDefinitions: LegendDefinition[] = [
  { status: 'dislike', text: '낮음', range: '60bpm 이하' },
  { status: 'good', text: '정상', range: '61~100bpm' },
  { status: 'bad', text: '높음', range: '101bpm 이상' }
]
// 선택된 날짜 상태 관리 (활력 데이터가 있는 7월로 초기화)
const selectedDate = ref(new Date(2025, 6, 1)) // 2025년 7월 1일

// 현재 선택된 날짜의 활력 점수 계산
const currentVitalScore = computed(() => {
  // 로컬 시간으로 날짜 키 생성 (UTC 변환 방지)
  const year = selectedDate.value.getFullYear()
  const month = String(selectedDate.value.getMonth() + 1).padStart(2, '0')
  const day = String(selectedDate.value.getDate()).padStart(2, '0')
  const dateKey = `${year}-${month}-${day}`

  const vitalInfo = vitalData.value[dateKey]
  return vitalInfo ? vitalInfo.score : 0
})

// 현재 선택된 날짜의 활력 상태 계산
const currentVitalStatus = computed(() => {
  // 로컬 시간으로 날짜 키 생성 (UTC 변환 방지)
  const year = selectedDate.value.getFullYear()
  const month = String(selectedDate.value.getMonth() + 1).padStart(2, '0')
  const day = String(selectedDate.value.getDate()).padStart(2, '0')
  const dateKey = `${year}-${month}-${day}`

  const vitalInfo = vitalData.value[dateKey]
  return vitalInfo ? vitalInfo.status : 'no-data'
})
interface DailyVitalData {
  score: number
  status: string
}
// 활력 데이터 (7월 전체 예시 데이터)
const vitalData = ref<Record<string, DailyVitalData>>({
  // 7월 1주 (6/29~7/5)
  '2025-07-01': { score: 85, status: 'good' },
  '2025-07-02': { score: 92, status: 'good' },
  '2025-07-03': { score: 78, status: 'good' },
  // '2025-07-04': 데이터 없음 (빈 날짜)
  '2025-07-05': { score: 65, status: 'good' },

  // 7월 2주 (7/6~7/12)
  // '2025-07-06': 데이터 없음
  '2025-07-07': { score: 88, status: 'good' },
  '2025-07-08': { score: 101, status: 'bad' },
  '2025-07-09': { score: 72, status: 'good' },
  '2025-07-10': { score: 60, status: 'dislike' },
  '2025-07-11': { score: 90, status: 'good' },
  '2025-07-12': { score: 82, status: 'good' },

  // 7월 3주 (7/13~7/19)
  '2025-07-13': { score: 75, status: 'good' },
  // '2025-07-14': 데이터 없음
  '2025-07-15': { score: 58, status: 'dislike' },
  '2025-07-16': { score: 87, status: 'good' },
  '2025-07-17': { score: 93, status: 'good' },
  '2025-07-18': { score: 79, status: 'good' },
  '2025-07-19': { score: 66, status: 'good' },

  // 7월 4주 (7/20~7/26)
  '2025-07-20': { score: 91, status: 'good' },
  '2025-07-21': { score: 84, status: 'good' },
  '2025-07-22': { score: 77, status: 'good' },
  // '2025-07-23': 데이터 없음
  '2025-07-24': { score: 89, status: 'good' },
  '2025-07-25': { score: 62, status: 'good' },
  '2025-07-26': { score: 96, status: 'good' },

  // 7월 5주 (7/27~7/31)
  '2025-07-27': { score: 83, status: 'good' }
})

// LineTabs 상태 관리
const activeLineTab = ref('daily') // 기본값을 monthly로 설정
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
  console.log(`📅 탭 변경: ${key}, 네비게이션 모드: ${navigationMode.value}`)
}

const lineTabs = ref<Tab[]>([
  { title: '일일', key: 'daily' },
  { title: '주간', key: 'weekly' },
  { title: '월간', key: 'monthly' }
])

// LineTabs에서 DateRangeSelect의 navigation-mode 매핑
const navigationMode = computed(() => {
  switch (activeLineTab.value) {
    case 'daily':
      return 'day'
    case 'weekly':
      return 'week'
    case 'monthly':
      return 'month'
    default:
      return 'month'
  }
})

// CircleLineVitalChart에서 tooltip 클릭 처리
const handleTooltipClick = () => {
  showTooltipModal.value = true
}

// 점수 범위 메시지
// const getScoreRange = (score: number) => {
//   if (score >= 91) return '매우 좋음 (91-100점)'
//   if (score >= 81) return '좋음 (81-90점)'
//   if (score >= 71) return '보통 (71-80점)'
//   if (score >= 61) return '주의 (61-70점)'
//   return '나쁨 (0-60점)'
// }

// 상태 메시지
// const getStatusMessage = (status: string) => {
//   switch (status) {
//     case 'excellent':
//       return '훌륭한 컨디션'
//     case 'good':
//       return '좋은 컨디션'
//     case 'normal':
//       return '평범한 컨디션'
//     case 'dislike':
//       return '주의가 필요한 컨디션'
//     case 'bad':
//       return '나쁨 컨디션'
//     default:
//       return '데이터 없음'
//   }
// }

// DateRangeSelect에서 날짜 변경 처리
const handleDateChange = (newDate: Date) => {
  selectedDate.value = newDate
}

// WeekChartBar에서 날짜 클릭 처리
const handleWeekDayClick = (date: Date) => {
  selectedDate.value = date
}

// VitalCalendar에서 날짜 변경 처리
const handleCalendarDateChange = (newDate: Date) => {
  selectedDate.value = newDate
}

// VitalCalendar에서 날짜 상태 변경 처리 (vitalRecord 모드에서)
const handleDateStatusChange = (dateInfo: { date: Date; status: string }) => {
  selectedDate.value = dateInfo.date
}

// VitalCalendar에서 이모지 클릭 처리
const handleEmojiClick = (emojiData: any) => {
  // 선택된 날짜를 클릭한 날짜로 업데이트
  selectedDate.value = emojiData.date

  // LineTabs를 daily 모드로 변경
  activeLineTab.value = 'daily'
}
// weekly, daily, montly 데이터
const currentStatusItems = computed<ListItemsProps[]>(() => {
  if (navigationMode.value === 'month') {
    return monthlyStatusItems.value
  } else if (navigationMode.value === 'week') {
    return weeklyStatusItems.value
  } else {
    return dailyStatusItems.value // 기본값 또는 'day'에 해당
  }
})
// 활력 현황 데이터(월)
const monthlyStatusItems = ref<ListItemsProps[]>([
  {
    time: '4월 1주',
    point: 100
  },
  {
    time: '4월 2주',
    point: 81
  },
  {
    time: '4월 3주',
    point: 80
  },
  {
    time: '4월 4주',
    point: 65
  },
  {
    time: '4월 5주',
    point: 60
  }
])
// 활력 현황 데이터(주)

const weeklyStatusItems = ref<ListItemsProps[]>([
  {
    time: '04월 24일',
    point: 100
  },
  {
    time: '04월 25일',
    point: 81
  },
  {
    time: '04월 26일',
    point: 80
  },
  {
    time: '04월 27일',
    point: 65
  },
  {
    time: '04월 28일',
    point: 60
  },
  {
    time: '04월 29일',
    point: 60
  },
  {
    time: '04월 30일',
    point: 60
  }
])
// 활력 현황 데이터(일)
const dailyStatusItems = ref<ListItemsProps[]>([
  {
    time: '00:01',
    point: 150
  },
  {
    time: '10:24',
    point: 81
  },
  {
    time: '13:18',
    point: 80
  },
  {
    time: '15:58',
    point: 65
  },
  {
    time: '16:58',
    point: 60
  },
  {
    time: '20:58',
    point: 10
  }
])
const guideList1 = ref([
  '심박수는 심장이 1분 동안 뛰는 횟수를 나타냅니다. 일반적으로 성인의 정상적인 심박수는 60에서 100번 사이입니다.',
  '심박수는 운동, 스트레스, 감정 상태에 따라 달라지며, 심박수가 너무 빠르거나 느리면 건강 상태를 점검하는 것이 좋습니다.'
])
const customTableData1 = ref({
  cols: [{ width: '8rem' }, { width: '10.5rem' }, { width: 'auto' }],
  headers: [[{ text: '심박수 범위(BPM)' }, { text: '상태' }, { text: '설명' }]],
  body: [
    [
      { text: '60bpm 이하' },
      { content: h(CommonBadge, { variant: 'round', color: 'purple' }, '휴식') },
      { text: '운동 선수나 잘 훈련된 사람들에게서 정상 범위일 수 있으나 비정상적인 경우도 있을 수 있습니다.' }
    ],
    [
      {
        text: '61~100 bpm'
      },
      { content: h(CommonBadge, { variant: 'round', color: 'blue' }, '정상') },
      { text: '대부분의 성인은 이 범위에 해당하며, 일반적으로 건강한 상태를 의미합니다.' }
    ],
    [
      {
        text: '101~120 bpm'
      },
      { content: h(CommonBadge, { variant: 'round', color: 'yellow' }, '중간 강도 활동') },
      { text: '운동 후 또는 스트레스가 많은 상태에서 발생할 수 있습니다' }
    ],
    [
      {
        text: '121~150 bpm'
      },
      { content: h(CommonBadge, { variant: 'round', color: 'orange' }, '높은 강도 활동') },
      { text: '격렬한 운동 중에 발생할 수 있으며 심장에 더 큰 부담을 줄 수 있습니다.' }
    ],
    [
      {
        text: '150bpm 이상'
      },
      { content: h(CommonBadge, { variant: 'round', color: 'red' }, '고강도 활동') },
      {
        text: '고강도 운동이나 심장에 심한 부담을 주는 상황에서 발생할 수 있으며, 비정상적인 경우에는 의료적 평가가 필요할 수 있습니다.'
      }
    ]
  ]
})
const guideList2 = ref(['Heart Rate Variability: A Review of the Literature / Harvard health'])

// DailyWaveLineChart - yAxisLabel
const getBadgeText = (point: number): string => {
  if (point <= 60) return '휴식'
  if (point <= 100) return '정상'
  if (point <= 120) return '중간 강도 활동'
  if (point <= 150) return '높은 강도 활동'
  return '고강도 활동'
}

// CommonBadge 색상 정의
const getBadgeColor = (point: number): BadgeColorType => {
  if (point <= 60) return 'purple'
  if (point <= 100) return 'blue'
  if (point <= 120) return 'yellow'
  if (point <= 150) return 'orange'
  return 'red'
}

// DailyWaveLineChart MIN_POINT, MAX_POINT 정의
const GRAPH_MIN_POINT = 0
const GRAPH_MAX_POINT = 200

// DailyWaveLineChart Y축 라벨 포인트 (getBadgeText와 연동)
const GRAPH_Y_AXIS_LABEL_POINTS = [200, 150, 120, 100, 60]
</script>

<style scoped lang="scss"></style>
