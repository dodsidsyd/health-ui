<template>
  <BaseBody page-title="스마트링 권한" :show-back-button="true">
    <sleepPatternChart :sleepData="mySleepSegments" :chartMinTime="chartPeriodStart" :chartMaxTime="chartPeriodEnd" />

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
      <SmartRingUsingTipItem>
        충분한 잠을 자는 것은 신체와 정신 건강에 많은 도움을 줍니다. 우리의 몸과 뇌는 하루 동안 축적된 피로를 회복하고,
        내일을 위한 에너지를 비축하기 위해 잠을 필요로 합니다. 수면은 단순히 쉬는 시간이 아니라, 몸이 스스로 치유하고
        재충전할 수 있는 중요한 과정입니다.
      </SmartRingUsingTipItem>
    </SmartRingUsingTipWrap>
    <SmartRingStatusWrap :title="'일일 활력 현황'">
      <SmartRingStatusItem
        v-for="(item, index) in statusItems"
        :key="index"
        :title="'심박수'"
        :unit="'점'"
        :list-items="item"
        :badge-text="getBadgeText(item.point)"
        :color="getBadgeColor(item.point)"
      />
    </SmartRingStatusWrap>
    <FullModal :is-visible="isShowFullModal" v-bind="fullModalProps" @close="toggleFullModal">
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
import SmartRingUsingTipWrap from '~/components/smartRing/SmartRingUsingTipWrap.vue'
import SmartRingUsingTipItem from '~/components/smartRing/SmartRingUsingTipItem.vue'
import SmartRingStatusWrap from '~/components/smartRing/SmartRingStatusWrap.vue'
import SmartRingStatusItem, { type ListItemsProps } from '~/components/smartRing/SmartRingStatusItem.vue'
import GuidePopDetail from '~/components/smartRing/GuidePopDetail.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import CommonBadge, { type BadgeColorType } from '~/components/common/badge/CommonBadge.vue'
import FullModal from '~/components/common/modal/FullModal.vue'
import sleepPatternChart from '~/components/smartRing/sleepPatternChart.vue'
import { ref } from 'vue'
const mySleepSegments = ref([
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

const isShowFullModal = ref(false)

const toggleFullModal = () => {
  isShowFullModal.value = !isShowFullModal.value
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
// 활력점수
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
// 수면점수
const guideList3 = ref([
  '수면 점수는 사용자의 수면 데이터를 기반으로 수면의 질과 양을 종합적으로 평가한 지표입니다.',
  '수면 점수는 각성수면, REM수면, 얕은수면, 깊은수면 등 여러 요소를 반영하여 계산됩니다.',
  '높은 점수는 충분하고 회복력 있는 수면을 의미하며, 낮은 점수는 수면의 질이 떨어지거나 충분하지 않음을 나타냅니다.'
])
const customTableData2 = ref({
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
const guideList4 = ref([
  'Ohayon et al., 2017. The role of sleep efficiency in sleep quality assessment.',
  'Sleep and health: further studies of duration and quality'
])

// 스트레스 점수
const guideList5 = ref([
  '스트레스 점수는 지금 당신의 신체적, 정신적 건강 상태를 100분위 점수로 나타낸 것입니다.',
  '스트레스 점수가 높을수록 스트레스가 많다는 신호이니, 이를 통해 몸 상태를 확인해보세요.'
])
const customTableData3 = ref({
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
const guideList6 = ref(['PSS - Laboratory for the Study of Stress, Immunity, and Disease / Carnegie Mellon University'])

// 산소포화도
const guideList7 = ref([
  '산소포화도(SPO2)는 혈액 내 헤모글로빈이 산소와 결합된 비율을 나타내는 지표로, 혈액이 얼마나 산소를 운반하고 있는지 보여줍니다. 이 값은 일반적으로 퍼센트(%)로 표시됩니다. 건강한 사람의 정상 산소포화도는 95% 이상으로 간주되며, 이 값이 낮아지면 산소 부족을 나타낼 수 있습니다.'
])
const customTableData4 = ref({
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
const guideList8 = ref(['서울아산병원 건강정보 > 의료정보 > 건강, 시술,수술정보'])

// 심박수
const guideList9 = ref([
  '심박수는 심장이 1분 동안 뛰는 횟수를 나타냅니다. 일반적으로 성인의 정상적인 심박수는 60에서 100번 사이입니다.',
  '심박수는 운동, 스트레스, 감정 상태에 따라 달라지며, 심박수가 너무 빠르거나 느리면 건강 상태를 점검하는 것이 좋습니다.'
])
const customTableData5 = ref({
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
const guideList10 = ref(['Heart Rate Variability: A Review of the Literature / Harvard health'])

// 심박변이도
const guideList11 = ref([
  '심박 변이도(HRV)는 심장이 뛰는 간격의 변화를 측정한 지표로, HRV가 높을수록 몸이 스트레스에 잘 대응하고 회복력이 좋다는 의미입니다.',
  'HRV가 일반적으로 높을수록 건강에 좋은 신호로 간주되지만, HRV 값이 너무 높거나 낮은 것 모두가 적절한 상태는 아닙니다.'
])
const customTableData6 = ref({
  cols: [{ width: '7.2rem' }, { width: '8.8rem' }, { width: 'auto' }],
  headers: [[{ text: 'HRV 수치' }, { text: '상태' }, { text: '설명' }]],
  body: [
    [
      { text: '91 이상' },
      { content: h(CommonBadge, { variant: 'round', color: 'blue' }, '건강') },
      {
        content: h('div', [
          h('p', { class: 'highlight-txt' }, '건강한 회복력, 스트레스 적음'),
          h('p', '자율 신경계가 균형을 잘 이루고 있으며, 회복력이 뛰어납니다.')
        ])
      }
    ],
    [
      {
        text: '51~90'
      },
      { content: h(CommonBadge, { variant: 'round', color: 'yellow' }, '정상') },
      {
        content: h('div', [
          h('p', { class: 'highlight-txt' }, '정상, 평균적인 회복력'),
          h('p', '건강한 상태로, 스트레스에 잘 대응하고 있으며 회복력이 적당합니다.')
        ])
      }
    ],
    [
      {
        text: '21~50'
      },
      { content: h(CommonBadge, { variant: 'round', color: 'orange' }, '낮음') },
      {
        content: h('div', [
          h('p', { class: 'highlight-txt' }, '스트레스, 피로 가능성'),
          h('p', '스트레스를 많이 받고 있거나, 피로가 누적으로 인해 자율 신경계가 불균형할 수 있습니다.')
        ])
      }
    ],
    [
      {
        text: '20 이하'
      },
      { content: h(CommonBadge, { variant: 'round', color: 'red' }, '매우낮음') },
      {
        content: h('div', [
          h('p', { class: 'highlight-txt' }, '건강문제 의심'),
          h('p', '자율 신경계의 불균형이나 건강 문제가 있을 수 있습니다. 전문적인 검사가 필요할 수 있습니다.')
        ])
      }
    ]
  ]
})
const guideList12 = ref(['Heart Rate Variability: A Review of the Literature / Harvard health'])

// 체온
const guideList13 = ref([
  '체온은 사람의 건강 상태를 알 수 있는 중요한 지표 중 하나입니다. 일반적으로 정상 체온은 36.0℃에서 37.5℃ 사이로 유지됩니다. 이는 성인의 경우 평균 체온이 약 36.6℃로 보고되며, 하루 중 시간대나 활동에 따라 약간의 차이가 있을 수 있습니다.',
  '체온이 36.0℃ 이하로 내려가면 저체온증을 의심할 수 있으며, 37.5℃ 이상으로 오르면 발열이 발생할 수 있습니다. 체온은 개인마다 약간의 차이를 보일 수 있지만, 정상 범위를 벗어나는 변화가 지속될 경우, 건강 문제가 있을 수 있으므로 주의가 필요합니다.'
])
const customTableData7 = ref({
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
const guideList14 = ref(['건강보험공단 건강 매거진 (헬스조선, 아시아 투데이. 국민건강지식센터 건강컬럼)'])

const statusItems = ref<ListItemsProps[]>([
  {
    time: '10:00',
    point: 100
  },
  {
    time: '10:30',
    point: 81
  },
  {
    time: '10:30',
    point: 80
  },
  {
    time: '10:30',
    point: 65
  },
  {
    time: '10:30',
    point: 60
  }
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
