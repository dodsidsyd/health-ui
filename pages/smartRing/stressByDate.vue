<template>
  <BaseBody page-title="스트레스" :show-back-button="true">
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
      :unit="'점'"
      :title="'스트레스 점수'"
      :icon-class="'ico-stress'"
      :badge-text="getBadgeText(currentVitalScore)"
      :color="getBadgeColor(currentVitalScore)"
      @tooltip-click="handleTooltipClick"
    >
      몸과 마음이 많이 지친 상태예요. 충분한 휴식을 취하고 주변에 도움을 요청해보세요.
    </QuickSummary>
    <!-- 데이터가 없는 경우 -->
    <QuickSummaryNodata
      v-else
      :title="'스트레스 점수'"
      :unit="'점'"
      :icon-class="'ico-stress'"
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
    <SmartRingUsingTipWrap :title="'스트레스'">
      <SmartRingUsingTipItem>
        스트레스 지수는 사용자의 신체 상태를 기반으로 현재의 스트레스 수준을 보여주는 종합적인 지표입니다. 스트레스
        점수가 높을수록 스트레스가 많다는 신호이니, 이를 통해 몸 상태를 확인해보세요.
      </SmartRingUsingTipItem>
    </SmartRingUsingTipWrap>

    <SmartRingStatusWrap
      :title="
        navigationMode === 'month'
          ? '월간 스트레스 현황'
          : navigationMode === 'week'
            ? '주간 스트레스 현황'
            : '일일 스트레스 현황'
      "
    >
      <template v-if="currentStatusItems.length > 0">
        <SmartRingStatusItem
          v-for="(item, index) in currentStatusItems"
          :key="index"
          :unit="'점'"
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
  title: '스트레스 점수란?',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const LegendDefinitions: LegendDefinition[] = [
  { status: 'good', text: '적당한 스트레스', range: '60점 이하' },
  { status: 'bad', text: '과도한 스트레스', range: '61점 이상' }
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
  '2025-07-01': { score: 85, status: 'bad' },
  '2025-07-02': { score: 92, status: 'bad' },
  '2025-07-03': { score: 78, status: 'bad' },
  // '2025-07-04': 데이터 없음 (빈 날짜)
  '2025-07-05': { score: 65, status: 'bad' },

  // 7월 2주 (7/6~7/12)
  // '2025-07-06': 데이터 없음
  '2025-07-07': { score: 88, status: 'bad' },
  '2025-07-08': { score: 100, status: 'bad' },
  '2025-07-09': { score: 72, status: 'bad' },
  '2025-07-10': { score: 60, status: 'good' },
  '2025-07-11': { score: 90, status: 'bad' },
  '2025-07-12': { score: 82, status: 'bad' },

  // 7월 3주 (7/13~7/19)
  '2025-07-13': { score: 75, status: 'bad' },
  // '2025-07-14': 데이터 없음
  '2025-07-15': { score: 58, status: 'good' },
  '2025-07-16': { score: 87, status: 'bad' },
  '2025-07-17': { score: 93, status: 'bad' },
  '2025-07-18': { score: 79, status: 'bad' },
  '2025-07-19': { score: 66, status: 'bad' },

  // 7월 4주 (7/20~7/26)
  '2025-07-20': { score: 91, status: 'bad' },
  '2025-07-21': { score: 84, status: 'bad' },
  '2025-07-22': { score: 77, status: 'bad' },
  // '2025-07-23': 데이터 없음
  '2025-07-24': { score: 89, status: 'bad' },
  '2025-07-25': { score: 62, status: 'bad' },
  '2025-07-26': { score: 96, status: 'bad' },

  // 7월 5주 (7/27~7/31)
  '2025-07-27': { score: 83, status: 'bad' }
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
    point: 100
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
// 스트레스 점수
const guideList1 = ref([
  '스트레스 점수는 지금 당신의 신체적, 정신적 건강 상태를 100분위 점수로 나타낸 것입니다.',
  '스트레스 점수가 높을수록 스트레스가 많다는 신호이니, 이를 통해 몸 상태를 확인해보세요.'
])
const customTableData1 = ref({
  cols: [{ width: '8rem' }, { width: '9.2rem' }, { width: 'auto' }],
  headers: [[{ text: '점수 범위' }, { text: '스트레스 수준' }, { text: '설명' }]],
  body: [
    [
      { text: '0~40점' },
      { content: h(CommonBadge, { variant: 'round', color: 'blue' }, '낮음') },
      { text: '몸과 마음이 편안한 상태입니다.' }
    ],
    [
      { text: '41~60점' },
      { content: h(CommonBadge, { variant: 'round', color: 'yellow' }, '중간') },
      { text: '약간의 긴장이 느껴지며 스트레스가 시작되는 단계입니다.' }
    ],
    [
      { text: '61~80점' },
      { content: h(CommonBadge, { variant: 'round', color: 'orange' }, '높음') },
      {
        text: '스트레스가 쌓이며 신체적/정신적으로 불편함이 느껴지기 시작합니다.'
      }
    ],
    [
      { text: '81~100점' },
      { content: h(CommonBadge, { variant: 'round', color: 'red' }, '매우높음') },
      {
        text: '매운 높은 스트레스 상태로 일상생활과 건강에 영향을 줄 수 있는 단계입니다.'
      }
    ]
  ]
})
const guideList2 = ref(['PSS - Laboratory for the Study of Stress, Immunity, and Disease / Carnegie Mellon University'])

// DailyWaveLineChart - yAxisLabel
const getBadgeText = (point: number): string => {
  if (point <= 40) return '낮음'
  if (point <= 60) return '중간'
  if (point <= 80) return '높음'
  return '매우높음'
}

// CommonBadge 색상 정의
const getBadgeColor = (point: number): BadgeColorType => {
  if (point <= 40) return 'blue'
  if (point <= 60) return 'yellow'
  if (point <= 80) return 'orange'
  return 'red'
}

// DailyWaveLineChart MIN_POINT, MAX_POINT 정의
const GRAPH_MIN_POINT = 0
const GRAPH_MAX_POINT = 100

// DailyWaveLineChart Y축 라벨 포인트 (getBadgeText와 연동)
const GRAPH_Y_AXIS_LABEL_POINTS = [100, 80, 60, 40]
</script>

<style scoped lang="scss"></style>
