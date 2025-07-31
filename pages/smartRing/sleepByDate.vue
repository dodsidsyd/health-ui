<template>
  <BaseBody page-title="수면" :show-back-button="true">
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
      :title="'수면'"
      :icon-class="'ico-sleep'"
      :badge-text="getBadgeText(currentVitalScore)"
      :color="getBadgeColor(currentVitalScore)"
      :detail="'총 7시간 23분 수면'"
      @tooltip-click="handleTooltipClick"
    >
      몸과 마음이 모두 재충전되었어요. 상쾌한 하루 시작하세요!
    </QuickSummary>

    <!-- 데이터가 없는 경우 -->
    <QuickSummaryNodata
      v-else
      :unit="'점'"
      :title="'수면'"
      :icon-class="'ico-sleep'"
      @tooltip-click="handleTooltipClick"
    />

    <!-- daily 모드일 때 탭 표시 -->
    <RoundTabs
      v-if="navigationMode === 'day'"
      :tabs="roundTabs"
      :active-key="activeRoundTab"
      @tab-change="onRoundTabChange"
    />
    <!-- daily 모드 & 수면패턴 선택시 차트 표시 -->
    <sleepPatternChart
      v-if="navigationMode === 'day' && activeRoundTab === 'sleepPattern'"
      :sleep-data="mySleepSegments"
      :chart-min-time="chartPeriodStart"
      :chart-max-time="chartPeriodEnd"
    />

    <!-- daily 모드 & 수면비율 선택시 차트 표시 -->
    <DailySleepRatioChart v-if="navigationMode === 'day' && activeRoundTab === 'sleepRatio'" :data="chartData" />

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
    <!-- daily 모드일 때 범례 표시 -->
    <EmojiInfoBox v-if="navigationMode == 'day'" :legend-items="LegendDefinitions" />
    <!-- weekly & month 모드일 때 범례 표시 -->
    <EmojiInfoBox v-if="navigationMode == 'week' || navigationMode === 'month'" :legend-items="LegendDefinitions2" />
    <SmartRingUsingTipWrap :title="'수면'">
      <SmartRingUsingTipItem>
        수면은 각성, REM, 얕은 수면, 깊은 수면의 단계로 이루어져 있습니다. 이 중 REM 수면은 뇌와 몸의 회복을 위한 핵심
        단계로 매우 중요한 역할을 합니다. 또한 얕은 수면과 깊은 수면이 결합된 시간은 전체 수면의 70~75%를 차지하며,
        신체와 정신의 재충전에 필수적입니다.
      </SmartRingUsingTipItem>
    </SmartRingUsingTipWrap>

    <SmartRingStatusWrap
      :title="
        navigationMode === 'month' ? '월간 수면 분석' : navigationMode === 'week' ? '주간 수면 현황' : '일일 수면 현황'
      "
    >
      <!-- 일일 수면현황 -->
      <template v-if="currentStatusItems.length > 0 && navigationMode === 'day'">
        <SmartRingStatusItem
          v-for="(item, index) in currentStatusItems"
          :key="index"
          :unit="'분'"
          :list-items="item"
          :has-badge="false"
          :has-gauge="false"
          :badge-text="getBadgeText(item.point)"
          :color="getBadgeColor(item.point)"
        />
      </template>
      <!-- 주간 수면현황 -->
      <template v-if="currentStatusItems.length > 0 && navigationMode === 'week'">
        <SmartRingStatusItem
          v-for="(item, index) in currentStatusItems"
          :key="index"
          :unit="'점'"
          :list-items="item"
          :has-gauge="false"
          :badge-text="getBadgeText(item.point)"
          :color="getBadgeColor(item.point)"
        />
      </template>

      <!-- 월간 수면분석 -->
      <template v-if="currentStatusItems.length > 0 && navigationMode === 'month'">
        <MonthlySleepAnalysis :division="'REM'">
          <WeekSleepChart :vital-data="vitalData" sleep-type="remSleep" />
          <template #diagnosis>
            이번 달은 대부분의 주차에서 권장 범위를 유지하며, 일부 기간에만 편차가 나타났습니다.
          </template>
          <template #comment>
            전반적으로 안정적인 수면 경향을 보이지만, 일관성 유지를 위해 스트레스 관리와 충분한 휴식이
            중요합니다</template
          >
        </MonthlySleepAnalysis>

        <MonthlySleepAnalysis :division="'light'">
          <WeekSleepChart :vital-data="vitalData" sleep-type="lightSleep" />
          <template #diagnosis>
            이번 달은 대부분의 주차에서 권장 범위를 유지하며, 일부 기간에만 편차가 나타났습니다.
          </template>
          <template #comment>
            전반적으로 안정적인 수면 경향을 보이지만, 일관성 유지를 위해 스트레스 관리와 충분한 휴식이
            중요합니다</template
          >
        </MonthlySleepAnalysis>
        <MonthlySleepAnalysis :division="'deep'">
          <WeekSleepChart :vital-data="vitalData" sleep-type="deepSleep" />
          <template #diagnosis>
            이번 달은 대부분의 주차에서 권장 범위를 유지하며, 일부 기간에만 편차가 나타났습니다.
          </template>
          <template #comment>
            수면 중 잦은 각성으로 수면의 질 저하가 우려됩니다. 규칙적인 취침 시간을 유지하고, 스트레스 관리를 병행하면
            도움이 됩니다.</template
          >
        </MonthlySleepAnalysis>
      </template>
      <template v-if="currentStatusItems.length == 0">
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
import sleepPatternChart from '~/components/smartRing/sleepPatternChart.vue'
import QuickSummary from '~/components/smartRing/QuickSummary.vue'
import QuickSummaryNodata from '~/components/smartRing/QuickSummaryNodata.vue'
import VitalCalendar from '~/components/smartRing/VitalCalendar.vue'
import WeekChartBar from '~/components/smartRing/WeekChartBar.vue'
import WeekSleepChart from '~/components/smartRing/WeekSleepChart.vue'
import SmartRingUsingTipWrap from '~/components/smartRing/SmartRingUsingTipWrap.vue'
import SmartRingUsingTipItem from '~/components/smartRing/SmartRingUsingTipItem.vue'
import SmartRingStatusWrap from '~/components/smartRing/SmartRingStatusWrap.vue'
import SmartRingStatusItem, { type ListItemsProps } from '~/components/smartRing/SmartRingStatusItem.vue'
import SmartRingHasNoItem from '~/components/smartRing/SmartRingHasNoItem.vue'
import FullModal from '~/components/common/modal/FullModal.vue'
import CommonBadge, { type BadgeColorType } from '~/components/common/badge/CommonBadge.vue'
import GuidePopDetail from '~/components/smartRing/GuidePopDetail.vue'
import EmojiInfoBox, { type LegendDefinition } from '~/components/smartRing/EmojiInfoBox.vue'
import RoundTabs, { type RoundTab } from '~/components/tabbar/RoundTabs.vue'
import DailySleepRatioChart from '~/components/smartRing/DailySleepRatioChart.vue'
import MonthlySleepAnalysis from '~/components/smartRing/MonthlySleepAnalysis.vue'

interface ChartData {
  label: string
  value: number
  color: string
}
// RoundTabs 데이터
const roundTabs = ref<RoundTab[]>([
  { title: '수면패턴', key: 'sleepPattern' },
  { title: '수면비율', key: 'sleepRatio' }
])
// RoundTabs 상태 관리
const activeRoundTab = ref('sleepRatio')
// RoundTabs 이벤트 핸들러
const onRoundTabChange = (key: string) => {
  activeRoundTab.value = key
}

// 활력 점수 상세 정보 모달 상태
const showTooltipModal = ref(false)
const toggleFullModal = () => {
  showTooltipModal.value = !showTooltipModal.value
}
const fullModalProps = ref({
  title: '수면 점수란?',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// daily 범례
const LegendDefinitions: LegendDefinition[] = [
  { status: 'sleep-division-box REM', text: '렘 수면', range: '정신회복, 꿈 꾸는 단계' },
  { status: 'sleep-division-box light', text: '얕은 수면', range: '신체 이완, 뇌파 감소' },
  { status: 'sleep-division-box deep', text: '깊은 수면', range: '신체 회복, 면역력 강화' }
]
// week & month 범례
const LegendDefinitions2: LegendDefinition[] = [
  { status: 'good', text: '충분히 수면 한 날 ', range: '76점 이상' },
  { status: 'bad', text: '수면이 부족한 날', range: '75점 이하' }
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

interface SleepData {
  score: number
  status: string
  remSleep: number
  deepSleep: number
  lightSleep: number
}

// 활력 데이터 (7월 전체 예시 데이터)
const vitalData = ref<Record<string, SleepData>>({
  // 7월 1주 (6/29~7/5)
  '2025-07-01': { score: 85, status: 'good', remSleep: 5, deepSleep: 90, lightSleep: 40 },
  '2025-07-02': { score: 92, status: 'good', remSleep: 113, deepSleep: 100, lightSleep: 50 },
  '2025-07-03': { score: 78, status: 'good', remSleep: 110, deepSleep: 70, lightSleep: 100 },
  // '2025-07-04': 데이터 없음 (빈 날짜)
  '2025-07-05': { score: 65, status: 'bad', remSleep: 91, deepSleep: 60, lightSleep: 80 },

  // 7월 2주 (7/6~7/12)
  // '2025-07-06': 데이터 없음
  '2025-07-07': { score: 88, status: 'good', remSleep: 25, deepSleep: 95, lightSleep: 30 },
  '2025-07-08': { score: 100, status: 'good', remSleep: 140, deepSleep: 110, lightSleep: 60 },
  '2025-07-09': { score: 72, status: 'bad', remSleep: 95, deepSleep: 65, lightSleep: 90 },
  '2025-07-10': { score: 60, status: 'bad', remSleep: 80, deepSleep: 50, lightSleep: 60 },
  '2025-07-11': { score: 90, status: 'good', remSleep: 135, deepSleep: 105, lightSleep: 55 },
  '2025-07-12': { score: 82, status: 'good', remSleep: 115, deepSleep: 85, lightSleep: 20 },

  // 7월 3주 (7/13~7/19)
  '2025-07-13': { score: 75, status: 'bad', remSleep: 105, deepSleep: 75, lightSleep: 10 },
  // '2025-07-14': 데이터 없음
  '2025-07-15': { score: 58, status: 'bad', remSleep: 75, deepSleep: 45, lightSleep: 50 },
  '2025-07-16': { score: 87, status: 'good', remSleep: 122, deepSleep: 92, lightSleep: 35 },
  '2025-07-17': { score: 93, status: 'good', remSleep: 33, deepSleep: 103, lightSleep: 45 },
  '2025-07-18': { score: 79, status: 'good', remSleep: 108, deepSleep: 78, lightSleep: 15 },
  '2025-07-19': { score: 66, status: 'bad', remSleep: 92, deepSleep: 62, lightSleep: 85 },

  // 7월 4주 (7/20~7/26)
  '2025-07-20': { score: 91, status: 'good', remSleep: 138, deepSleep: 108, lightSleep: 100 },
  '2025-07-21': { score: 84, status: 'good', remSleep: 118, deepSleep: 88, lightSleep: 100 },
  '2025-07-22': { score: 77, status: 'good', remSleep: 102, deepSleep: 72, lightSleep: 105 },
  // '2025-07-23': 데이터 없음
  '2025-07-24': { score: 89, status: 'good', remSleep: 28, deepSleep: 98, lightSleep: 140 },
  '2025-07-25': { score: 62, status: 'bad', remSleep: 85, deepSleep: 55, lightSleep: 70 },
  '2025-07-26': { score: 96, status: 'good', remSleep: 142, deepSleep: 112, lightSleep: 65 },

  // 7월 5주 (7/27~7/31)
  '2025-07-27': { score: 83, status: 'good', remSleep: 91, deepSleep: 87, lightSleep: 118 }
})

// LineTabs 상태 관리
const activeLineTab = ref('monthly') // 기본값을 monthly로 설정
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
  if (navigationMode.value === 'week') {
    return weeklyStatusItems.value
  } else {
    return dailyStatusItems.value // 기본값 또는 'day'에 해당
  }
})

// 활력 현황 데이터(주)

const weeklyStatusItems = ref<ListItemsProps[]>([
  {
    time: '04월 24일',
    subTime: '7시간 30분',
    point: 100
  },
  {
    time: '04월 25일',
    subTime: '6시간 21분',
    point: 81
  },
  {
    time: '04월 26일',
    subTime: '5시간 10분',
    point: 80
  },
  {
    time: '04월 27일',
    subTime: '4시간 14분',
    point: 65
  },
  {
    time: '04월 28일',
    subTime: '8시간 30분',
    point: 60
  },
  {
    time: '04월 29일',
    subTime: '2시간 51분',
    point: 60
  },
  {
    time: '04월 30일',
    subTime: '9시간 30분',
    point: 60
  }
])

const guideList1 = ref([
  '수면 점수는 사용자의 수면 데이터를 기반으로 수면의 질과 양을 종합적으로 평가한 지표입니다.',
  '수면 점수는 각성수면, REM수면, 얕은수면, 깊은수면 등 여러 요소를 반영하여 계산됩니다.',
  '높은 점수는 충분하고 회복력 있는 수면을 의미하며, 낮은 점수는 수면의 질이 떨어지거나 충분하지 않음을 나타냅니다.'
])
const customTableData1 = ref({
  cols: [{ width: '8rem' }, { width: '9.2rem' }, { width: 'auto' }],
  headers: [[{ text: '점수 범위' }, { text: '수면 수준' }, { text: '설명' }]],
  body: [
    [
      { text: '91~100점' },
      { content: h(CommonBadge, { variant: 'round', color: 'blue' }, '최상') },
      { text: '깊고 연속적인 수면으로 신체와 마음이 완벽히 회복된 상태입니다.' }
    ],
    [
      { text: '81~90점' },
      { content: h(CommonBadge, { variant: 'round', color: 'green' }, '좋음') },
      { text: '대체로 양호한 수면으로, 다음날 활동에 충분한 에너지를 제공합니다.' }
    ],
    [
      { text: '71~80점' },
      { content: h(CommonBadge, { variant: 'round', color: 'yellow' }, '보통') },
      {
        text: '수면 중 깨어나는 빈도가 다소 높아 개선이 필요한 상태입니다.'
      }
    ],
    [
      { text: '61~70점' },
      { content: h(CommonBadge, { variant: 'round', color: 'orange' }, '나쁨') },
      {
        text: '수면의 연속성이 떨어져 피로가 충분히 해소되지 않는 상태입니다. '
      }
    ],
    [
      { text: '0~65점' },
      { content: h(CommonBadge, { variant: 'round', color: 'red' }, '매우나쁨') },
      {
        text: '심각한 수면 문제로 건강과 일상에 부정적인 영향을 줄 수 있습니다.'
      }
    ]
  ]
})
const guideList2 = ref([
  'Ohayon et al., 2017. The role of sleep efficiency in sleep quality assessment.',
  'Sleep and health: further studies of duration and quality'
])

// DailyWaveLineChart - yAxisLabel
const getBadgeText = (point: number): string => {
  if (point <= 65) return '매우나쁨'
  if (point <= 75) return '나쁨'
  if (point <= 85) return '보통'
  if (point <= 91) return '좋음'
  return '최상'
}

// CommonBadge 색상 정의
const getBadgeColor = (point: number): BadgeColorType => {
  if (point <= 65) return 'red'
  if (point <= 75) return 'orange'
  if (point <= 85) return 'yellow'
  if (point <= 91) return 'green'
  return 'blue'
}

// 일일 수면데이터
const mySleepSegments = ref<
  {
    phase: '각성' | '깊은 수면' | '얕은 수면' | '렘 수면'
    startTime: number
    endTime: number
  }[]
>([
  { phase: '각성', startTime: Date.parse('2025-07-22T23:00:00'), endTime: Date.parse('2025-07-22T23:30:00') },
  { phase: '깊은 수면', startTime: Date.parse('2025-07-22T23:30:00'), endTime: Date.parse('2025-07-23T00:30:00') },
  { phase: '얕은 수면', startTime: Date.parse('2025-07-23T00:30:00'), endTime: Date.parse('2025-07-23T01:30:00') },
  { phase: '렘 수면', startTime: Date.parse('2025-07-23T01:30:00'), endTime: Date.parse('2025-07-23T02:00:00') },
  { phase: '각성', startTime: Date.parse('2025-07-23T02:00:00'), endTime: Date.parse('2025-07-23T02:15:00') },
  { phase: '얕은 수면', startTime: Date.parse('2025-07-23T02:15:00'), endTime: Date.parse('2025-07-23T03:00:00') },
  { phase: '깊은 수면', startTime: Date.parse('2025-07-23T03:00:00'), endTime: Date.parse('2025-07-23T04:00:00') },
  { phase: '렘 수면', startTime: Date.parse('2025-07-23T04:00:00'), endTime: Date.parse('2025-07-23T04:30:00') },
  { phase: '각성', startTime: Date.parse('2025-07-23T04:30:00'), endTime: Date.parse('2025-07-23T05:00:00') }
])
// 시간(밀리초)을 'HH:MM' 형식의 문자열로 변환하는 헬퍼 함수
const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

// mySleepSegments를 ListItemsProps 형식으로 변환
const transformedDailyStatusItems = computed<ListItemsProps[]>(() => {
  return mySleepSegments.value
    .filter(segment => segment.phase !== '각성') // '각성' 단계 제외
    .map(segment => {
      // 1. time: 'startTime ~ endTime' 형식으로 변환
      const startTimeFormatted = formatTime(segment.startTime)
      const endTimeFormatted = formatTime(segment.endTime)
      const timeString = `${startTimeFormatted} ~ ${endTimeFormatted}`
      // 2. division: phase 값을 그대로 사용
      const divisionString = segment.phase
      // 3. point: duration (분 단위) 계산
      const durationMs = segment.endTime - segment.startTime
      const durationMinutes = Math.round(durationMs / (1000 * 60)) // 밀리초 -> 분 변환

      return {
        time: timeString,
        division: divisionString,
        point: durationMinutes
      }
    })
})
// transformedDailyStatusItems를 dailyStatusItems로 사용
const dailyStatusItems = computed<ListItemsProps[]>(() => {
  return transformedDailyStatusItems.value
})
// 수면 비율 더미 데이터
const chartData = computed<ChartData[]>(() => {
  if (transformedDailyStatusItems.value.length === 0) {
    return [] // 비어있으면 빈 배열 반환
  }
  const totalDurations: { [key: string]: number } = {
    '렘 수면': 0,
    '얕은 수면': 0,
    '깊은 수면': 0
  }
  transformedDailyStatusItems.value.forEach(item => {
    if (Object.prototype.hasOwnProperty.call(totalDurations, item.division!)) {
      totalDurations[item.division!] += item.point
    }
  })
  // chartData 형식에 맞게 결과 반환
  return [
    { label: '렘 수면', value: totalDurations['렘 수면'], color: '#9B48FF' },
    { label: '얕은 수면', value: totalDurations['얕은 수면'], color: '#243E8E' },
    { label: '깊은 수면', value: totalDurations['깊은 수면'], color: '#41BCF5' }
  ]
})

// 4. 차트 X축 시작 및 종료 시간 계산 (필수)
// 여기서는 mySleepSegments를 기반으로 동적으로 계산합니다.
const chartPeriodStart = computed(() => {
  if (mySleepSegments.value.length === 0) {
    // 데이터가 없는 경우를 위해 기본 시간 범위 설정 (선택 사항)
    const now = new Date()
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    return todayMidnight // 오늘 자정
  }
  return Math.min(...mySleepSegments.value.map(s => s.startTime))
})

const chartPeriodEnd = computed(() => {
  if (mySleepSegments.value.length === 0) {
    // 데이터가 없는 경우를 위해 기본 시간 범위 설정 (선택 사항)
    const now = new Date()
    const nextDayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime()
    return nextDayMidnight // 내일 자정
  }
  return Math.max(...mySleepSegments.value.map(s => s.endTime))
})
</script>

<style scoped lang="scss"></style>
