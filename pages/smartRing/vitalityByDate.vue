<template>
  <BaseBody page-title="활력" :show-back-button="true">
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

    <DateRangeSelect
      v-model="selectedDate"
      class="mt-23"
      :navigation-mode="navigationMode"
      @change="handleDateChange"
    />

    <CircleLineVitalChart
      :percentage="currentVitalScore"
      :no-data="currentVitalScore === 0"
      @tooltip-click="handleTooltipClick"
    />

    <ChartInfoBox class="mb-32" :status="currentVitalStatus" />

    <!-- weekly 모드일 때 WeekChartBar 표시 -->
    <WeekChartBar
      v-if="navigationMode === 'week'"
      class="mb-32"
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
    <SmartRingUsingTipWrap :title="'추천'">
      <SmartRingUsingTipItem :title="'수면'" :icon-class="'ico-sleep'">
        오늘 밤에는 7~8시간 수면을 목표로 해보세요.<br />
        자기 전 스마트폰 사용을 줄이면 더 깊은 수면이 가능합니다.
      </SmartRingUsingTipItem>
      <SmartRingUsingTipItem :title="'스트레스'" :icon-class="'ico-stress'">
        가벼운 스트레스 상태입니다.<br />
        따뜻한 차 한 잔이나 음악 감상으로 릴랙스하는 건 어떨까요?
      </SmartRingUsingTipItem>
      <SmartRingUsingTipItem :title="'심박수'" :icon-class="'ico-heart-beep'">
        심박수가 조금 올라갔어요!<br />
        짧은 휴식을 취하거나 깊게 호흡해보세요.
      </SmartRingUsingTipItem>
      <SmartRingUsingTipItem :title="'심박변이도'" :icon-class="'ico-variability'">
        심박 변이도가 우수해요! <br />지금처럼 신체 리듬을 유지하며 긍정적인 마음을 가지세요.
      </SmartRingUsingTipItem>
      <SmartRingUsingTipItem :title="'체온'" :icon-class="'ico-temperature'">
        정상 체온 상태입니다. <br />건강한 상태를 유지하고 있어요. 계속해서 균형 잡힌 생활을 이어가세요.
      </SmartRingUsingTipItem>
      <SmartRingUsingTipItem :title="'산소포화도'" :icon-class="'ico-oxygen'">
        정상 산소포화도 상태입니다.<br />
        몸에 충분한 산소가 공급되고 있어요.
      </SmartRingUsingTipItem>
    </SmartRingUsingTipWrap>

    <SmartRingStatusWrap
      :title="
        navigationMode === 'month' ? '월간 활력 현황' : navigationMode === 'week' ? '주간 활력 현황' : '일일 활력 현황'
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
import { ref, computed } from 'vue'

import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

import DateRangeSelect from '~/components/smartRing/DateRangeSelect.vue'

import CircleLineVitalChart from '~/components/smartRing/CircleLineVitalChart.vue'
import ChartInfoBox from '~/components/smartRing/ChartInfoBox.vue'

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
  title: '활력 점수란?',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const LegendDefinitions: LegendDefinition[] = [
  { status: 'excellent', text: '적당한', range: '91~100점' },
  { status: 'good', text: '활력 점수가 좋았던 날', range: '81~90점' },
  { status: 'normal', text: '활력 점수가 보통인 날', range: '71~80점' },
  { status: 'dislike', text: '활력 점수가 좋지 않은 날', range: '61~70점' },
  { status: 'bad', text: '활력 점수가 매우 좋지 않은 날', range: '0~60점' }
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
  console.log(`📊 현재 날짜 (${dateKey}) 상태:`, vitalInfo?.status || 'no-data')
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
  '2025-07-02': { score: 92, status: 'excellent' },
  '2025-07-03': { score: 78, status: 'normal' },
  // '2025-07-04': 데이터 없음 (빈 날짜)
  '2025-07-05': { score: 65, status: 'dislike' },

  // 7월 2주 (7/6~7/12)
  // '2025-07-06': 데이터 없음
  '2025-07-07': { score: 88, status: 'good' },
  '2025-07-08': { score: 100, status: 'excellent' },
  '2025-07-09': { score: 72, status: 'normal' },
  '2025-07-10': { score: 60, status: 'bad' },
  '2025-07-11': { score: 90, status: 'excellent' },
  '2025-07-12': { score: 82, status: 'good' },

  // 7월 3주 (7/13~7/19)
  '2025-07-13': { score: 75, status: 'normal' },
  // '2025-07-14': 데이터 없음
  '2025-07-15': { score: 58, status: 'bad' },
  '2025-07-16': { score: 87, status: 'good' },
  '2025-07-17': { score: 93, status: 'excellent' },
  '2025-07-18': { score: 79, status: 'normal' },
  '2025-07-19': { score: 66, status: 'dislike' },

  // 7월 4주 (7/20~7/26)
  '2025-07-20': { score: 91, status: 'excellent' },
  '2025-07-21': { score: 84, status: 'good' },
  '2025-07-22': { score: 77, status: 'normal' },
  // '2025-07-23': 데이터 없음
  '2025-07-24': { score: 89, status: 'good' },
  '2025-07-25': { score: 62, status: 'dislike' },
  '2025-07-26': { score: 96, status: 'excellent' },

  // 7월 5주 (7/27~7/31)
  '2025-07-27': { score: 83, status: 'good' }
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

// 점수 범위 메시지
const getScoreRange = (score: number) => {
  if (score >= 91) return '매우 좋음 (91-100점)'
  if (score >= 81) return '좋음 (81-90점)'
  if (score >= 71) return '보통 (71-80점)'
  if (score >= 61) return '주의 (61-70점)'
  return '나쁨 (0-60점)'
}

// 상태 메시지
const getStatusMessage = (status: string) => {
  switch (status) {
    case 'excellent':
      return '훌륭한 컨디션'
    case 'good':
      return '좋은 컨디션'
    case 'normal':
      return '평범한 컨디션'
    case 'dislike':
      return '주의가 필요한 컨디션'
    case 'bad':
      return '나쁨 컨디션'
    default:
      return '데이터 없음'
  }
}

// DateRangeSelect에서 날짜 변경 처리
const handleDateChange = (newDate: Date) => {
  console.log('📅 DateRangeSelect 날짜 변경:', newDate)
  selectedDate.value = newDate
}

// WeekChartBar에서 날짜 클릭 처리
const handleWeekDayClick = (date: Date) => {
  console.log('📅 WeekChartBar 날짜 클릭:', date)
  selectedDate.value = date
  // ChartInfoBox는 currentVitalStatus computed로 자동 업데이트됨
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
    time: '12:01',
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
    point: 60
  }
])
// 활력점수 상세정보
const guideList1 = ref([
  '활력 점수는 수면, 심박수, 산소포화도, 스트레스, 체온, 심박변이도의 핵심 지표를 기반으로 사용자의 전반적인 건강 상태와 회복력을 평가합니다.',
  '이 점수는 각 항목의 균형과 안정성을 고려해 산출되며, 현재 신체의 회복 수준과 에너지 상태를 반영합니다.',
  '활력 점수를 통해 자신의 건강 흐름을 확인하고, 일정한 패턴을 유지하거나 필요한 경우 생활 방식을 조정하여 최적의 컨디션을 유지하는 데 활용하세요.'
])
const customTableData1 = ref({
  cols: [{ width: '8rem' }, { width: '9.2rem' }, { width: 'auto' }],
  headers: [[{ text: '점수 범위' }, { text: '스트레스 수준' }, { text: '설명' }]],
  body: [
    [
      { text: '91~100점' },
      { content: h(CommonBadge, { variant: 'round', color: 'blue' }, '최상') },
      { text: '에너지가 넘치고 신체 회복이 최적 상태입니다. 일상 활동과 집중력 유지에 매우 유리한 상태입니다.' }
    ],
    [
      { text: '81~90점' },
      { content: h(CommonBadge, { variant: 'round', color: 'green' }, '좋음') },
      { text: '대체로 안정적이며 건강한 컨디션을 유지하고 있습니다. 가벼운 활동부터 무리 없이 수행할 수 있습니다.' }
    ],
    [
      { text: '71~80점' },
      { content: h(CommonBadge, { variant: 'round', color: 'yellow' }, '보통') },
      {
        text: '기본적인 활력은 유지되지만 약간의 피로감이나 스트레스 신호가 나타날 수 있습니다. 규칙적인 휴식과 건강 관리가 필요합니다.'
      }
    ],
    [
      { text: '61~70점' },
      { content: h(CommonBadge, { variant: 'round', color: 'orange' }, '나쁨') },
      {
        text: '신체 회복이 저하되고 피로감이 누적된 상태입니다. 충분한 수면과 스트레스 관리를 보충하는 것이 중요합니다.'
      }
    ],
    [
      { text: '0~60점' },
      { content: h(CommonBadge, { variant: 'round', color: 'red' }, '매우나쁨') },
      {
        text: '활력이 크게 저하된 상태로, 피로와 스트레스가 극심할 수 있습니다. 무리한 활동을 피하고 회복에 집중해야 합니다.'
      }
    ]
  ]
})
const guideList2 = ref([
  'Heart rate variability: standards of measurement, physiological interpretation, and clinical use',
  'Sleep and health: further studies of duration and quality'
])

const getBadgeText = (point: number): string => {
  if (point <= 60) return '매우 나쁨'
  if (point <= 70) return '나쁨'
  if (point <= 80) return '보통'
  if (point <= 90) return '좋음'
  return '최상'
}
const getBadgeColor = (point: number): BadgeColorType => {
  if (point <= 60) return 'red'
  if (point <= 70) return 'orange'
  if (point <= 80) return 'yellow'
  if (point <= 90) return 'green'
  return 'blue'
}
</script>

<style scoped lang="scss"></style>
