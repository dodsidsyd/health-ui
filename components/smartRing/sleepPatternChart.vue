<template>
  <div class="sleep-timeline-container">
    <div class="y-axis-labels-wrapper">
      <div
        v-for="(category, index) in sleepCategories"
        :key="'y-label-text-' + index"
        :style="{
          height: segmentHeight - barVerticalPadding + 'px',
          lineHeight: segmentHeight - barVerticalPadding + 'px',
          marginBottom: barVerticalPadding + 'px'
        }"
        class="y-axis-label-item"
      >
        {{ category }}
      </div>
    </div>

    <div ref="svgWrapperRef" class="svg-chart-wrapper">
      <svg
        :width="svgWidth"
        :height="SVG_TOTAL_HEIGHT"
        :viewBox="`0 0 ${svgWidth} ${SVG_TOTAL_HEIGHT}`"
        preserveAspectRatio="none"
      >
        <!-- 바 그래프 배경 -->
        <g class="sleep-category-backgrounds">
          <rect
            v-for="(category, index) in sleepCategories"
            :key="'bg-rect-' + index"
            :x="svgPaddingLeft"
            :y="yCategoryToPx(category)"
            :width="chartContentWidth"
            :height="segmentHeight - barVerticalPadding"
            :fill="getCategoryBackgroundColor(category)"
          />
        </g>
        <!-- 바 그래프 -->
        <g class="sleep-segments">
          <rect
            v-for="(segment, index) in processedSleepSegments"
            :key="'segment-' + index"
            :x="timeToPx(segment.startTime)"
            :y="yCategoryToPx(segment.phase)"
            :width="timeToPx(segment.endTime) - timeToPx(segment.startTime)"
            :height="segmentHeight - barVerticalPadding"
            :fill="segment.color"
          />
        </g>
        <!-- 가로축 라벨 -->
        <g class="x-axis-labels">
          <text
            v-for="(timeLabel, index) in xAxisTimeLabels"
            :key="'x-label-' + index"
            :x="timeToPx(timeLabel.timestamp) + 20"
            :y="SVG_TOTAL_HEIGHT"
            text-anchor="middle"
            font-size="12px"
            fill="#959595"
          >
            {{ formatTime(timeLabel.timestamp) }}
          </text>
        </g>
        <!-- 점선 -->
        <g class="x-axis-grid">
          <line
            v-for="(timeLabel, index) in xAxisTimeLabels"
            :key="'grid-line-' + index"
            :x1="timeToPx(timeLabel.timestamp)"
            :y1="0"
            :x2="timeToPx(timeLabel.timestamp)"
            :y2="SVG_TOTAL_HEIGHT"
            stroke="#B9B9B9"
            stroke-dasharray="2 3"
          />
        </g>
      </svg>
    </div>
    <div v-if="!sleepData.length" class="empty-data-container">데이터가 충분하지 않아요</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs, onMounted, onUnmounted } from 'vue' // onMounted, onUnmounted 추가

interface SleepSegment {
  phase: '각성' | '렘 수면' | '얕은 수면' | '깊은 수면'
  startTime: number // 타임스탬프 (ms)
  endTime: number // 타임스탬프 (ms)
}

interface SleepColorMapping {
  phase: '각성' | '렘 수면' | '얕은 수면' | '깊은 수면'
  color: string
}

interface Props {
  sleepData: SleepSegment[]
  chartMinTime: number // 차트 X축 시작 시간 (타임스탬프)
  chartMaxTime: number // 차트 X축 종료 시간 (타임스탬프)
}

const props = withDefaults(defineProps<Props>(), {})

const { sleepData, chartMinTime, chartMaxTime } = toRefs(props)

// 수면 단계별 색상 및 라벨 매핑 (고정)
const sleepColorMapping = ref<SleepColorMapping[]>([
  { phase: '각성', color: '#B9B9B9' },
  { phase: '렘 수면', color: '#9B48FF' },
  { phase: '얕은 수면', color: '#41BCF5' },
  { phase: '깊은 수면', color: '#243E8E' }
])

// Y축 카테고리 (고정)
const sleepCategories = ref<Array<SleepSegment['phase']>>(['각성', '렘 수면', '얕은 수면', '깊은 수면'])

// SVG 레이아웃 및 계산 관련 변수
const svgPaddingLeft = 0
const svgPaddingRight = 0
const yAxisPaddingTop = 0

// 고정된 SVG 메인 차트 내용의 높이 (수면 단계 막대 영역)
const SVG_MAIN_CHART_HEIGHT_PX = 184

// 전체 SVG의 높이
const SVG_TOTAL_HEIGHT = 208

const svgWidth = ref(0) // 초기값을 0으로 설정, 마운트 후 실제 너비로 업데이트됨

const chartContentWidth = computed(() => svgWidth.value - svgPaddingLeft - svgPaddingRight)
const chartContentHeight = computed(() => SVG_MAIN_CHART_HEIGHT_PX) // 차트 내용 높이는 이제 고정

const barVerticalPadding = 6 // 막대 간격

const segmentHeight = computed(() => chartContentHeight.value / sleepCategories.value.length)

const processedSleepSegments = computed(() => {
  return sleepData.value.map(segment => {
    const colorMap = sleepColorMapping.value.find(cm => cm.phase === segment.phase)
    return {
      ...segment,
      color: colorMap ? colorMap.color : '#000000'
    }
  })
})

const getCategoryBackgroundColor = (category: string) => {
  const bgColors: { [key: string]: string } = {
    각성: '#F4F4F4',
    '렘 수면': '#F4EBFF',
    '얕은 수면': '#DBF2FF',
    '깊은 수면': '#E6ECFF'
  }
  return bgColors[category] || '#ffffff'
}

const timeToPx = (timestamp: number) => {
  const totalChartDuration = chartMaxTime.value - chartMinTime.value
  if (totalChartDuration <= 0) return svgPaddingLeft
  const progress = (timestamp - chartMinTime.value) / totalChartDuration
  return svgPaddingLeft + progress * chartContentWidth.value
}

const yCategoryToPx = (category: string) => {
  const index = sleepCategories.value.indexOf(category as SleepSegment['phase'])
  if (index === -1) return 0
  return yAxisPaddingTop + index * segmentHeight.value
}

const xAxisTimeLabels = computed(() => {
  const labels = []
  const startTime = chartMinTime.value
  const endTime = chartMaxTime.value

  const totalDuration = endTime - startTime
  const maxLabels = 6
  const intervalMs = totalDuration / (maxLabels - 1)

  for (let i = 0; i < maxLabels; i++) {
    const timestamp = startTime + i * intervalMs
    labels.push({
      timestamp: timestamp
    })
  }
  if (labels.length > 0) {
    labels[labels.length - 1].timestamp = endTime
  }
  return labels
})

const formatTime = (timestamp: number) => {
  if (isNaN(timestamp) || timestamp <= 0) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
}

// ResizeObserver 관련
const svgWrapperRef = ref<HTMLElement | null>(null) // SVG를 감싸는 div에 대한 ref
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (svgWrapperRef.value) {
    svgWidth.value = svgWrapperRef.value.getBoundingClientRect().width

    // ResizeObserver
    resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect) {
          // contentRect는 padding을 포함하지 않는 콘텐츠 영역
          svgWidth.value = entry.contentRect.width
        }
      }
    })
    resizeObserver.observe(svgWrapperRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<style scoped lang="scss">
.sleep-timeline-container {
  position: relative;
  display: flex; /* Y축 레이블과 SVG 차트를 나란히 배치 */
  width: 100%;
  margin: 2.4rem auto 0;
  overflow: hidden;
  box-sizing: border-box;
  .y-axis-labels-wrapper {
    display: flex;
    justify-content: flex-start; /* 상단부터 채우도록 변경 */
    align-items: flex-start;
    flex-direction: column;
    flex-shrink: 0;
    width: 6rem;
    box-sizing: border-box;
    padding-top: 0px;
    height: v-bind(SVG_TOTAL_HEIGHT + 'px'); /* 스크립트 변수를 CSS 변수로 바인딩 */

    .y-axis-label-item {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.6rem;
      color: #555;
      box-sizing: border-box;
    }
  }

  .svg-chart-wrapper {
    flex-grow: 1;
    overflow: hidden;
  }

  svg {
    display: block;
  }
}
.sleep-segments rect {
  transition: all 0.3s ease;
}
.empty-data-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem 2.4rem;
  border-radius: 1.2rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(1rem);
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.2rem;
  color: #fff;
}
</style>
