<template>
  <BaseBody page-title="체온" :show-back-button="true">
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
      :unit="'℃'"
      :title="'체온'"
      :icon-class="'ico-temperature'"
      :badge-text="getBadgeText(currentVitalScore)"
      :color="getBadgeColor(currentVitalScore)"
      @tooltip-click="handleTooltipClick"
    >
      체온이 정상 범위로 유지되고 있어요! 여유로운 하루를 보내며 체온 조절을 계속 신경 써주세요.
    </QuickSummary>
    <!-- 데이터가 없는 경우 -->
    <QuickSummaryNodata
      v-else
      :unit="'℃'"
      :title="'체온'"
      :icon-class="'ico-temperature'"
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
    <SmartRingUsingTipWrap :title="'체온'">
      <SmartRingUsingTipItem>
        일일 체온 측정은 건강 상태를 모니터링하고 비정상적인 변화를 조기에 감지하는 데 유용합니다. 체온 변화가
        지속적으로 발생하면 의사와 상담하는 것이 좋습니다.
      </SmartRingUsingTipItem>
    </SmartRingUsingTipWrap>

    <SmartRingStatusWrap
      :title="
        navigationMode === 'month' ? '월간 체온 현황' : navigationMode === 'week' ? '주간 체온 현황' : '일일 체온 현황'
      "
    >
      <template v-if="currentStatusItems.length > 0">
        <SmartRingStatusItem
          v-for="(item, index) in currentStatusItems"
          :key="index"
          :has-gauge="false"
          :unit="'℃'"
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
  title: '체온이란?',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 이모지 범례
const LegendDefinitions: LegendDefinition[] = [
  { status: 'good', text: '안정', range: '36.1℃ ~ 37.4℃' },
  { status: 'bad', text: '주의', range: '36℃ 이하, 37.5℃ 이상' }
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
  '2025-07-01': { score: 36.1, status: 'good' },
  '2025-07-02': { score: 37.4, status: 'good' },
  '2025-07-03': { score: 78, status: 'bad' },
  // '2025-07-04': 데이터 없음 (빈 날짜)
  '2025-07-05': { score: 65, status: 'bad' },

  // 7월 2주 (7/6~7/12)
  // '2025-07-06': 데이터 없음
  '2025-07-07': { score: 88, status: 'bad' },
  '2025-07-08': { score: 100, status: 'bad' },
  '2025-07-09': { score: 72, status: 'bad' },
  '2025-07-10': { score: 60, status: 'bad' },
  '2025-07-11': { score: 90, status: 'bad' },
  '2025-07-12': { score: 82, status: 'bad' },

  // 7월 3주 (7/13~7/19)
  '2025-07-13': { score: 75, status: 'bad' },
  // '2025-07-14': 데이터 없음
  '2025-07-15': { score: 58, status: 'bad' },
  '2025-07-16': { score: 87, status: 'bad' },
  '2025-07-17': { score: 93, status: 'bad' },
  '2025-07-18': { score: 79, status: 'bad' },
  '2025-07-19': { score: 66, status: 'bad' },

  // 7월 4주 (7/20~7/26)
  '2025-07-20': { score: 91, status: 'bad' },
  '2025-07-21': { score: 84, status: 'bad' },
  '2025-07-22': { score: 77, status: 'bad' },
  // '2025-07-23': 데이터 없음
  '2025-07-24': { score: 37, status: 'good' },
  '2025-07-25': { score: 37, status: 'good' },
  '2025-07-26': { score: 37, status: 'good' },

  // 7월 5주 (7/27~7/31)
  '2025-07-27': { score: 37, status: 'good' }
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
    point: 40
  },
  {
    time: '12:24',
    point: 35
  },
  {
    time: '13:18',
    point: 36
  },
  {
    time: '15:58',
    point: 36.5
  },
  {
    time: '16:58',
    point: 50
  },
  {
    time: '20:58',
    point: 70
  }
])
const guideList1 = ref([
  '체온은 사람의 건강 상태를 알 수 있는 중요한 지표 중 하나입니다. 일반적으로 정상 체온은 36.0℃에서 37.5℃ 사이로 유지됩니다. 이는 성인의 경우 평균 체온이 약 36.6℃로 보고되며, 하루 중 시간대나 활동에 따라 약간의 차이가 있을 수 있습니다.',
  '체온이 36.0℃ 이하로 내려가면 저체온증을 의심할 수 있으며, 37.5℃ 이상으로 오르면 발열이 발생할 수 있습니다. 체온은 개인마다 약간의 차이를 보일 수 있지만, 정상 범위를 벗어나는 변화가 지속될 경우, 건강 문제가 있을 수 있으므로 주의가 필요합니다.'
])
const customTableData1 = ref({
  cols: [{ width: '8rem' }, { width: '10rem' }, { width: 'auto' }],
  headers: [[{ text: '온도' }, { text: '상태' }, { text: '설명' }]],
  body: [
    [
      { text: '36℃ 이하' },
      { content: h(CommonBadge, { variant: 'round', color: 'purple' }, '저체온') },
      {
        content: h('div', [
          h('p', { class: 'highlight-txt' }, '저체온증 의심'),
          h('p', '저체온증을 의심할 수 있으며 건강문제가 있을 수 있습니다.')
        ])
      }
    ],
    [
      {
        text: '36.1 ~ 37.4℃'
      },
      { content: h(CommonBadge, { variant: 'round', color: 'blue' }, '정상') },
      {
        content: h('div', [
          h('p', { class: 'highlight-txt' }, '안정적'),
          h('p', '호흡이 안정적이며, 정상적인 상태입니다.')
        ])
      }
    ],
    [
      {
        text: '37.5℃ 이상'
      },
      { content: h(CommonBadge, { variant: 'round', color: 'red' }, '주의 필요') },
      {
        content: h('div', [
          h('p', { class: 'highlight-txt' }, '발열 의심'),
          h('p', '발열을 의심할 수 있으며 건강문제가 있을 수 있습니다.')
        ])
      }
    ]
  ]
})
const guideList2 = ref(['건강보험공단 건강 매거진 (헬스조선, 아시아 투데이. 국민건강지식센터 건강컬럼)'])

// DailyWaveLineChart - yAxisLabel
const getBadgeText = (point: number): string => {
  if (point <= 36) return '저체온'
  if (point <= 37.4) return '정상'
  return '주의 필요'
}

// CommonBadge 색상 정의
const getBadgeColor = (point: number): BadgeColorType => {
  if (point <= 36) return 'purple'
  if (point <= 37.4) return 'blue'
  return 'red'
}

// DailyWaveLineChart MIN_POINT, MAX_POINT 정의
const GRAPH_MIN_POINT = 0
const GRAPH_MAX_POINT = 100

// DailyWaveLineChart Y축 라벨 포인트 (getBadgeText와 연동)
const GRAPH_Y_AXIS_LABEL_POINTS = [36, 37, 38]
</script>

<style scoped lang="scss"></style>
