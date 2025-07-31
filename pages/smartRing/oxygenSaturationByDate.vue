<template>
  <BaseBody page-title="산소포화도" :show-back-button="true">
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
      :unit="'%'"
      :title="'산소포화도'"
      :icon-class="'ico-oxygen'"
      :badge-text="getBadgeText(currentVitalScore)"
      :color="getBadgeColor(currentVitalScore)"
      @tooltip-click="handleTooltipClick"
    >
      정상 산소포화도 상태입니다! 몸에 충분한 산소가 공급되고 있어요.
    </QuickSummary>
    <!-- 데이터가 없는 경우 -->
    <QuickSummaryNodata
      v-else
      :title="'산소포화도'"
      :unit="'%'"
      :icon-class="'ico-oxygen'"
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
    <SmartRingUsingTipWrap :title="'산소포화도'">
      <SmartRingUsingTipItem>
        일일 산소포화도 측정은 혈액 내 산소 농도를 모니터링하여 호흡기 건강을 관리하는 데 중요합니다. 정상 범위(95%
        이상)를 유지하는 것이 핵심이며, 지속적으로 낮은 수치가 나타나면 산소 부족을 의심할 수 있습니다. 하루 동안 다양한
        시간대에 측정하여, 일관된 데이터를 확인하는 것이 효과적입니다.
      </SmartRingUsingTipItem>
    </SmartRingUsingTipWrap>

    <SmartRingStatusWrap
      :title="
        navigationMode === 'month'
          ? '월간 산소포화도 현황'
          : navigationMode === 'week'
            ? '주간 산소포화도 현황'
            : '일일 산소포화도 현황'
      "
    >
      <template v-if="currentStatusItems.length > 0">
        <SmartRingStatusItem
          v-for="(item, index) in currentStatusItems"
          :key="index"
          :has-gauge="false"
          :unit="'%'"
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
  title: '산소포화도란?',
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
  { status: 'good', text: '정상', range: '95% 이상' },
  { status: 'bad', text: '주의', range: '94.9% 이하' }
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
  '2025-07-08': { score: 100, status: 'good' },
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
  '2025-07-24': { score: 89, status: 'bad' },
  '2025-07-25': { score: 62, status: 'bad' },
  '2025-07-26': { score: 96, status: 'good' },

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
    point: 90
  },
  {
    time: '12:24',
    point: 95
  },
  {
    time: '13:18',
    point: 95
  },
  {
    time: '15:58',
    point: 100
  },
  {
    time: '16:58',
    point: 101
  },
  {
    time: '23:58',
    point: 94
  }
])
const guideList1 = ref([
  '산소포화도(SPO2)는 혈액 내 헤모글로빈이 산소와 결합된 비율을 나타내는 지표로, 혈액이 얼마나 산소를 운반하고 있는지 보여줍니다. 이 값은 일반적으로 퍼센트(%)로 표시됩니다. 건강한 사람의 정상 산소포화도는 95% 이상으로 간주되며, 이 값이 낮아지면 산소 부족을 나타낼 수 있습니다.'
])
const customTableData1 = ref({
  cols: [{ width: '8rem' }, { width: '10rem' }, { width: 'auto' }],
  headers: [[{ text: '산소포화도' }, { text: '상태' }, { text: '설명' }]],
  body: [
    [
      { text: '95~ 100%' },
      { content: h(CommonBadge, { variant: 'round', color: 'blue' }, '정상') },
      { text: '호흡이 안정적이며, 정상적인 상태입니다.' }
    ],
    [
      {
        text: '94.9% 이하'
      },
      { content: h(CommonBadge, { variant: 'round', color: 'red' }, '주의') },
      {
        content: h('div', [
          h('p', { class: 'highlight-txt' }, '저산소증 의심'),
          h('p', '저산소증을 의심할 수 있으며 건강 문제가 있을 수 있습니다.')
        ])
      }
    ]
  ]
})
const guideList2 = ref(['서울아산병원 건강정보 > 의료정보 > 건강, 시술,수술정보'])

// DailyWaveLineChart - yAxisLabel
const getBadgeText = (point: number): string => {
  if (point <= 95) return '주의'
  return '정상'
}

// CommonBadge 색상 정의
const getBadgeColor = (point: number): BadgeColorType => {
  if (point <= 95) return 'red'
  return 'blue'
}

// DailyWaveLineChart MIN_POINT, MAX_POINT 정의
const GRAPH_MIN_POINT = 85
const GRAPH_MAX_POINT = 100

// DailyWaveLineChart Y축 라벨 포인트 (getBadgeText와 연동)
const GRAPH_Y_AXIS_LABEL_POINTS = [0, 100]
</script>

<style scoped lang="scss"></style>
