<template>
  <div class="main-sector-graph" :class="props.currentStatus">
    <div class="chart-container">
      <div class="chart-item">
        <div class="radial-chart" ref="chart1">
          <svg viewBox="0 0 86 86" class="circular-chart">
            <!-- 배경 호 (7/8 원) -->
            <path
              class="circle-bg"
              d="M 21.2 67.4 A 35 35 0 1 1 64.8 67.4"
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.20)"
              stroke-width="8"
            />
            <!-- 진행률 호 (7/8 원) -->
            <path
              v-show="shouldShowProgress(0)"
              class="circle"
              d="M 21.2 67.4 A 35 35 0 1 1 64.8 67.4"
              fill="transparent"
              :stroke="computedChartData[displayOrder[0]].color"
              stroke-width="8"
              stroke-linecap="round"
              :stroke-dasharray="getCircumference(displayOrder[0])"
              :stroke-dashoffset="calculateDashOffset(displayOrder[0], computedChartData[displayOrder[0]].percentage)"
            />
            <text x="43" y="40" text-anchor="middle" class="percentage">
              {{ getChartValue(0) }}
            </text>
            <text x="43" y="52" text-anchor="middle" class="label">{{ computedChartData[displayOrder[0]].label }}</text>
          </svg>
        </div>
      </div>

      <div class="chart-item center-chart">
        <div class="radial-chart" ref="chart2">
          <svg viewBox="0 0 86 86" class="circular-chart">
            <!-- 배경 호 (7/8 원) -->
            <path
              class="circle-bg"
              d="M 21.2 67.4 A 35 35 0 1 1 64.8 67.4"
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.20)"
              stroke-width="8"
            />
            <!-- 진행률 호 (7/8 원) -->
            <path
              v-show="shouldShowCenterProgress()"
              class="circle"
              d="M 21.2 67.4 A 35 35 0 1 1 64.8 67.4"
              fill="transparent"
              :stroke="computedChartData[displayOrder[1]].color"
              stroke-width="8"
              stroke-linecap="round"
              :stroke-dasharray="getCircumference(displayOrder[1])"
              :stroke-dashoffset="calculateDashOffset(displayOrder[1], computedChartData[displayOrder[1]].percentage)"
            />
            <text x="43" y="45" text-anchor="middle" class="percentage">
              {{ getCenterChartValue() }}
            </text>
          </svg>
        </div>
      </div>

      <div class="chart-item">
        <div class="radial-chart" ref="chart3">
          <svg viewBox="0 0 86 86" class="circular-chart">
            <!-- 배경 호 (7/8 원) -->
            <path
              class="circle-bg"
              d="M 21.2 67.4 A 35 35 0 1 1 64.8 67.4"
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.20)"
              stroke-width="8"
            />
            <!-- 진행률 호 (7/8 원) -->
            <path
              v-show="shouldShowProgress(2)"
              class="circle"
              d="M 21.2 67.4 A 35 35 0 1 1 64.8 67.4"
              fill="transparent"
              :stroke="computedChartData[displayOrder[2]].color"
              stroke-width="8"
              stroke-linecap="round"
              :stroke-dasharray="getCircumference(displayOrder[2])"
              :stroke-dashoffset="calculateDashOffset(displayOrder[2], computedChartData[displayOrder[2]].percentage)"
            />
            <text x="43" y="40" text-anchor="middle" class="percentage">
              {{ getChartValue(2) }}
            </text>
            <text x="43" y="52" text-anchor="middle" class="label">{{ computedChartData[displayOrder[2]].label }}</text>
          </svg>
        </div>
      </div>

      <h2 class="main-graph-title">{{ computedChartData[displayOrder[1]].title }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'

// Props 정의
interface Props {
  currentStatus?: string
  isProfileSet?: boolean
  isSmartRingConnect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentStatus: 'walking-status',
  isProfileSet: true,
  isSmartRingConnect: true
})

interface ChartData {
  title: string
  label: string
  value: number // 실제 값 (예: 걸음 수, 심박수 등)
  maxValue: number // 최대값 (목표값)
  percentage: number // 계산된 비율
  color: string
}

const chartData = ref<ChartData[]>([
  {
    title: '오늘 걸음 수',
    label: '걸음',
    value: 10000, // 실제 걸음 수
    maxValue: 20000, // 목표 걸음 수
    percentage: 0, // 0 부터
    color: '#fff'
  },
  {
    title: '레몬건강지수',
    label: '건강',
    value: 5, // 실제 건강 지수
    maxValue: 100, // 최대 건강 지수
    percentage: 0, // 0 부터
    color: '#fff'
  },
  {
    title: '레몬활력지수',
    label: '활력',
    value: 95, // 실제 활력 지수
    maxValue: 100, // 최대 활력 지수
    percentage: 0, // 0 부터
    color: '#fff'
  }
])

// 비율 계산 및 데이터 업데이트
const computedChartData = computed(() => {
  return chartData.value.map(item => ({
    ...item,
    percentage: Math.min(Math.round((item.value / item.maxValue) * 100), 100)
  }))
})

// 상태에 따른 차트 순서 결정
const displayOrder = computed(() => {
  let order
  switch (props.currentStatus) {
    case 'walking-status':
      order = [1, 0, 2] // 건강, 걸음, 활력
      break
    case 'vitality-status':
      order = [0, 2, 1] // 걸음, 활력, 건강
      break
    case 'health-status':
      order = [2, 1, 0] // 활력, 건강, 걸음
      break
    default:
      order = [1, 0, 2]
  }

  return order
})

// 각 차트별 원의 둘레 계산
const circumference = computed(() => 1.75 * Math.PI * 35) // 모든 차트 동일

// 둘레 값 반환 함수
const getCircumference = (index: number) => {
  console.log(`getCircumference 호출 - index: ${index}, 둘레값: ${circumference.value}`)
  return circumference.value
}

// 퍼센티지에 따른 stroke-dashoffset 계산 (7/8 원 기준으로 조정)
const calculateDashOffset = (index: number, percentage: number) => {
  // 7/8 원에 맞춰 퍼센티지 조정: 100%일 때 7/8만 채워지도록
  const adjustedPercentage = (percentage / 100) * 0.875 // 7/8 = 0.875
  return circumference.value * (1 - adjustedPercentage)
}

// center-chart 값 표시 로직
const getCenterChartValue = () => {
  // health-status이고 profile이 설정되지 않은 경우 '?' 표시
  if (props.currentStatus === 'health-status' && !props.isProfileSet) {
    return '?'
  }
  // vitality-status이고 smart ring이 연결되지 않은 경우 '?' 표시
  if (props.currentStatus === 'vitality-status' && !props.isSmartRingConnect) {
    return '?'
  }
  return computedChartData.value[displayOrder.value[1]].value
}

// 모든 차트의 값 표시 로직
const getChartValue = (chartIndex: number) => {
  const dataIndex = displayOrder.value[chartIndex]
  const currentData = computedChartData.value[dataIndex]
  
  // health-status이고 profile이 설정되지 않은 경우 모든 차트 '?' 표시
  if (props.currentStatus === 'health-status' && !props.isProfileSet) {
    return '?'
  }
  
  // vitality-status이고 smart ring이 연결되지 않은 경우 모든 차트 '?' 표시
  if (props.currentStatus === 'vitality-status' && !props.isSmartRingConnect) {
    return '?'
  }
  
  return currentData.value
}

// center-chart 진행률 호 표시 여부
const shouldShowCenterProgress = () => {
  // health-status이고 profile이 설정되지 않은 경우 진행률 호 숨김
  if (props.currentStatus === 'health-status' && !props.isProfileSet) {
    return false
  }
  // vitality-status이고 smart ring이 연결되지 않은 경우 진행률 호 숨김
  if (props.currentStatus === 'vitality-status' && !props.isSmartRingConnect) {
    return false
  }
  return true
}

// 모든 차트의 진행률 호 표시 여부
const shouldShowProgress = (chartIndex: number) => {
  const dataIndex = displayOrder.value[chartIndex]
  
  // health-status이고 profile이 설정되지 않은 경우 모든 차트 진행률 호 숨김
  if (props.currentStatus === 'health-status' && !props.isProfileSet) {
    return false
  }
  
  // vitality-status이고 smart ring이 연결되지 않은 경우 모든 차트 진행률 호 숨김
  if (props.currentStatus === 'vitality-status' && !props.isSmartRingConnect) {
    return false
  }
  
  return true
}

// 데이터 업데이트 함수 (외부에서 호출 가능)
const updateChartData = (index: number, newValue: number, newMaxValue?: number, newDisplayValue?: string) => {
  if (index >= 0 && index < chartData.value.length) {
    chartData.value[index].value = newValue
    if (newMaxValue !== undefined) {
      chartData.value[index].maxValue = newMaxValue
    }

    // 애니메이션 업데이트
    updateChartAnimations()
  }
}

// 컴포넌트 외부에서 사용할 수 있도록 export
defineExpose({
  updateChartData,
  chartData: computedChartData
})

const chart1 = ref<HTMLElement>()
const chart2 = ref<HTMLElement>()
const chart3 = ref<HTMLElement>()

// 차트 애니메이션 업데이트 함수
const updateChartAnimations = () => {
  console.log('updateChartAnimations called') // 디버그용

  nextTick(() => {
    const charts = [chart1.value, chart2.value, chart3.value]

    charts.forEach((chart, index) => {
      if (chart) {
        const path = chart.querySelector('.circle') as SVGPathElement
        if (path) {
          // 현재 displayOrder에 따른 차트 데이터 인덱스
          const chartIndex = displayOrder.value[index]
          const targetOffset = calculateDashOffset(chartIndex, computedChartData.value[chartIndex].percentage)

          // 부드러운 트랜지션 적용
          path.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          path.style.strokeDashoffset = targetOffset.toString()
        }
      }
    })
  })
}

onMounted(() => {
  // 애니메이션 효과를 위한 초기화
  const charts = [chart1.value, chart2.value, chart3.value]

  charts.forEach((chart, index) => {
    if (chart) {
      const path = chart.querySelector('.circle') as SVGPathElement
      if (path) {
        // 초기 상태: 아주 작은 값으로 시작점만 보이도록 설정
        const initialOffset = circumference.value - 1 // 1px 정도만 보이도록
        path.style.strokeDashoffset = initialOffset.toString()
        path.style.strokeDasharray = circumference.value.toString()

        // 애니메이션 실행
        setTimeout(
          () => {
            updateChartAnimations()
          },
          300 + index * 150
        ) // 순차적으로 애니메이션 실행
      }
    }
  })
})

// props.currentStatus 변경시 차트 업데이트
watch(
  () => props.currentStatus,
  (newStatus, oldStatus) => {
    updateChartAnimations()
  },
  { immediate: false }
)
</script>

<style scoped lang="scss">
.main-sector-graph {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  .main-graph-title {
    position: absolute;
    bottom: -3rem;
    font-size: 2rem;
    font-weight: 700;
    color: #2b2b2b;
    text-align: center;
    left: 0;
    right: 0;
  }
}

.chart-container {
  display: flex;
  flex-direction: row;
  gap: 0 3.6rem;
  transition: all 0.3s ease-in-out;
}

.chart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0.5;
  transition: all 0.3s ease-in-out;
}

.chart-item:nth-child(1) .radial-chart {
  width: 7.2rem;
  height: 7.2rem;
}

.chart-item:nth-child(2) .radial-chart {
  width: 8.6rem;
  height: 8.6rem;
  position: relative;
  &::before {
    content: '';
    display: block;
    width: 2rem;
    height: 2rem;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.8rem;
    background-size: 2rem;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
  }
}

.walking-status {
  .chart-item:nth-child(2) .radial-chart {
    &::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M6.83114 15L16.3561 5.475L12.5749 1.725C12.4383 1.57743 12.2731 1.45922 12.0894 1.37755C11.9056 1.29589 11.7072 1.25249 11.5061 1.25C11.1067 1.25 10.7235 1.40869 10.4411 1.69117C10.1586 1.97365 9.99989 2.35677 9.99989 2.75625C9.99989 3.35133 9.7635 3.92204 9.34271 4.34282C8.92193 4.76361 8.35122 5 7.75614 5H6.87489C6.54337 5 6.22543 5.1317 5.99101 5.36612C5.75659 5.60054 5.62489 5.91848 5.62489 6.25V7.5H7.49989C7.66565 7.5 7.82462 7.56585 7.94183 7.68306C8.05904 7.80027 8.12489 7.95924 8.12489 8.125C8.12489 8.29076 8.05904 8.44973 7.94183 8.56694C7.82462 8.68415 7.66565 8.75 7.49989 8.75H5.62489V10H7.49989C7.66565 10 7.82462 10.0658 7.94183 10.1831C8.05904 10.3003 8.12489 10.4592 8.12489 10.625C8.12489 10.7908 8.05904 10.9497 7.94183 11.0669C7.82462 11.1842 7.66565 11.25 7.49989 11.25H4.99989C4.00533 11.25 3.0515 11.6451 2.34824 12.3483C1.64498 13.0516 1.24989 14.0054 1.24989 15H6.83114ZM7.49989 16.0687L17.2374 6.3625L17.6811 6.8C18.0323 7.15156 18.2295 7.62812 18.2295 8.125C18.2295 8.62188 18.0323 9.09844 17.6811 9.45L9.29989 17.8375C9.00915 18.1275 8.66409 18.3574 8.28446 18.5139C7.90482 18.6705 7.49805 18.7507 7.08739 18.75H3.12489C2.62761 18.75 2.1507 18.5525 1.79907 18.2008C1.44744 17.8492 1.24989 17.3723 1.24989 16.875V16.25H7.08739C7.24197 16.2402 7.38809 16.176 7.49989 16.0687Z' fill='white'/%3E%3C/svg%3E");
    }
  }
}

.vitality-status {
  .chart-item:nth-child(2) .radial-chart {
    &::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cg clip-path='url(%23clip0_14333_2417)'%3E%3Cpath d='M13.8899 12.8512C15.9565 10.8064 19.4879 6.27548 17.6621 4.25644C17.662 4.25643 15.0583 1.65268 15.0583 1.65268C18.1426 4.99853 6.04778 17.1033 2.69141 14.0195L5.29516 16.6233C7.32216 18.4466 11.8358 14.923 13.8899 12.8512Z' fill='white'/%3E%3Cpath d='M5.46946 13.0151C6.56256 10.0987 11.1385 5.52289 14.0547 4.42982C14.5056 3.32788 14.4452 2.69605 14.2297 2.48052C13.9845 2.2353 13.2004 2.19069 11.7977 2.87199C10.3874 3.55702 8.78727 4.75765 7.29228 6.25264C5.79729 7.74763 4.59669 9.34769 3.91169 10.7581C3.23036 12.1608 3.27497 12.9449 3.52019 13.1901C3.73568 13.4056 4.36754 13.466 5.46946 13.0151Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_14333_2417'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
    }
  }
}

.health-status {
  .chart-item:nth-child(2) .radial-chart {
    &::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M19.4139 10.335H18.2621C18.2819 10.5275 18.2923 10.723 18.2923 10.9207C18.2923 14.0351 15.7587 16.5686 12.6444 16.5686C9.53024 16.5686 6.99652 14.0351 6.99652 10.9207C6.99652 10.723 7.00689 10.5275 7.02673 10.335H5.875C5.55136 10.335 5.28906 10.5973 5.28906 10.9207C5.28906 14.9765 8.58862 18.2761 12.6444 18.2761C16.7002 18.2761 19.9997 14.9765 19.9997 10.9207C19.9997 10.5973 19.7374 10.335 19.4139 10.335Z' fill='white'/%3E%3Cpath d='M16.4711 13.2416C16.8832 12.5644 17.121 11.7699 17.121 10.9207C17.121 10.7222 17.1078 10.5268 17.0825 10.335H13.5645L16.4711 13.2416Z' fill='white'/%3E%3Cpath d='M13.2305 15.3586C14.1936 15.2321 15.0614 14.7985 15.7317 14.1593L13.2305 11.6582V15.3586Z' fill='white'/%3E%3Cpath d='M9.55762 14.1593C10.2279 14.7985 11.0955 15.2321 12.0587 15.3586V11.6582L9.55762 14.1593Z' fill='white'/%3E%3Cpath d='M8.20676 10.335C8.18158 10.5268 8.16846 10.7222 8.16846 10.9207C8.16846 11.7699 8.40604 12.5644 8.81833 13.2416L11.725 10.335H8.20676Z' fill='white'/%3E%3Cpath d='M4.11763 10.9204C4.11763 9.95131 4.90605 9.16289 5.87514 9.16289H16.4835C16.5302 8.76189 16.5476 8.36318 16.5352 7.96843C16.5047 6.99523 16.2952 6.08993 15.9119 5.27358C16.0468 4.81796 16.1615 4.3225 16.227 3.90808C16.3605 3.06274 16.2949 2.5795 16.0076 2.29202C15.7201 2.0047 15.2368 1.93893 14.3915 2.0726C13.9771 2.13806 13.4816 2.25281 13.026 2.38769C10.0327 0.982514 5.99263 1.97998 3.10735 4.86526C0.222223 7.75039 -0.775243 11.7905 0.629784 14.7838C0.494897 15.2394 0.380151 15.7348 0.314691 16.1493C0.181177 16.9946 0.246789 17.478 0.534264 17.7653C0.821587 18.0528 1.30483 18.1184 2.15017 17.9849C2.56475 17.9194 3.0602 17.8045 3.51583 17.6698C4.40862 18.0884 5.40913 18.2976 6.4565 18.2976C6.99422 18.2976 7.54429 18.2416 8.09834 18.1312C5.70821 16.6189 4.11763 13.9522 4.11763 10.9204Z' fill='white'/%3E%3C/svg%3E");
    }
  }
}

.chart-item:nth-child(3) .radial-chart {
  width: 7.2rem;
  height: 7.2rem;
}

.circular-chart {
  width: 100%;
  height: 100%;
}

.circle {
  transition: stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1);
  stroke-linecap: round;
}

.percentage {
  font-size: 1.8rem;
  font-weight: bold;
  fill: #333;
}

.center-chart {
  opacity: 1;
  .percentage {
    font-size: 2.2rem;
  }
}

.label {
  font-size: 1.2rem;
  font-weight: 700;
  fill: #2b2b2b;
}

.chart-info {
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;
  }
}

// 반응형 디자인

@media (max-width: 375px) {
  .chart-container {
    gap: 0 2rem;
  }
}
</style>
