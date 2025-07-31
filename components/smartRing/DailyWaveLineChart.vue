<template>
  <div ref="graphContainerRef" class="graph-container">
    <div class="y-axis-labels">
      <div v-for="(label, index) in yAxisLabels" :key="'y-label-' + index">
        {{ label.text }}
      </div>
    </div>
    <div class="svg-wrapper">
      <svg :viewBox="`0 0 ${svgWidth} ${SVG_HEIGHT_FIXED}`">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0" stop-color="#4C7FF7" stop-opacity="0.3" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
        </defs>

        <line
          v-for="(item, index) in fixedXAxisLinesAndLabels"
          :key="'grid-line-' + index"
          :x1="item.x"
          y1="0"
          :x2="item.x"
          :y2="SVG_HEIGHT_FIXED"
          class="grid-line"
        />

        <template v-if="computedPathDataLine">
          <path class="graph-fill" :d="computedPathDataFill" />
          <path class="graph-line" :d="computedPathDataLine" />
        </template>
        <template v-else>
          <foreignObject :x="0" :y="0" :width="svgWidth" :height="SVG_HEIGHT_FIXED">
            <div class="empty-data-container">데이터가 충분하지 않아요.</div>
          </foreignObject>
        </template>

        <g class="x-axis-labels-group">
          <text
            v-for="(item, index) in fixedXAxisLinesAndLabels"
            :key="'label-' + index"
            :x="item.x + 20"
            :y="SVG_HEIGHT_FIXED"
            text-anchor="middle"
            fill="#666"
            font-size="0.9em"
          >
            {{ item.time }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type PropType } from 'vue'

interface ListItemsProps {
  time: string // "HH:mm"
  point: number // 0-100 범위 (이제 MIN_POINT에 따라 달라짐)
  division?: string
}

const props = defineProps({
  items: {
    type: Array as () => ListItemsProps[],
    required: true
  },
  yAxisLabelFormatter: {
    type: Function as PropType<(point: number) => string>,
    required: true
  },
  minPoint: {
    type: Number,
    default: 0
  },
  maxPoint: {
    type: Number,
    default: 100
  },
  yAxisLabelPoints: {
    type: Array as PropType<number[]>,
    default: () => [100, 80, 60, 40, 20]
  }
})

// SVG 너비를 동적으로 설정할 반응형 변수 (높이는 고정)
const svgWidth = ref(420)

// SVG 높이를 고정된 값으로 정의
const SVG_HEIGHT_FIXED = 208

// 컨테이너 ref
const graphContainerRef = ref<HTMLElement | null>(null)

// SVG wrapper의 여백(left) 값을 변수로 가져와서 svgWidth 계산에 활용
const SVG_WRAPPER_LEFT_PADDING = 60

const updateSvgDimensions = () => {
  if (graphContainerRef.value) {
    const containerWidth = graphContainerRef.value.offsetWidth

    // Y축 라벨 공간(6rem)을 제외한 실제 SVG 너비
    svgWidth.value = containerWidth - SVG_WRAPPER_LEFT_PADDING
  }
}

onMounted(() => {
  updateSvgDimensions() // 컴포넌트 마운트 시 초기 너비 설정
  window.addEventListener('resize', updateSvgDimensions) // 리사이즈 이벤트 리스너 등록
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSvgDimensions) // 컴포넌트 언마운트 시 리스너 해제
})

const TOTAL_MINUTES_IN_DAY = 24 * 60 // 1440분

const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return hours * 60 + minutes
}

// yScale 함수에서 고정된 높이 SVG_HEIGHT_FIXED 사용
const yScale = (point: number): number => {
  const clampedPoint = Math.max(props.minPoint, Math.min(props.maxPoint, point))
  return SVG_HEIGHT_FIXED - ((clampedPoint - props.minPoint) / (props.maxPoint - props.minPoint)) * SVG_HEIGHT_FIXED
}

const xScale = (minutes: number): number => {
  return (minutes / TOTAL_MINUTES_IN_DAY) * svgWidth.value
}

const computedPathDataLine = computed<string>(() => {
  if (!props.items || props.items.length < 1) {
    return ''
  }

  const sortedData = [...props.items].sort((a, b) => {
    return timeToMinutes(a.time) - timeToMinutes(b.time)
  })

  const points = sortedData.map(item => ({
    x: xScale(timeToMinutes(item.time)),
    y: yScale(item.point)
  }))

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y} L ${points[0].x} ${points[0].y}`
  }
  let path = `M ${points[0].x} ${points[0].y}`

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i]
    const p2 = points[i + 1]

    const cp1x = p1.x + (p2.x - p1.x) / 3
    const cp1y = p1.y

    const cp2x = p1.x + ((p2.x - p1.x) * 2) / 3
    const cp2y = p2.y

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }

  return path
})

const computedPathDataFill = computed<string>(() => {
  const linePath = computedPathDataLine.value
  if (!linePath || props.items.length === 0) {
    return ''
  }

  const sortedData = [...props.items].sort((a, b) => {
    return timeToMinutes(a.time) - timeToMinutes(b.time)
  })
  const firstX = xScale(timeToMinutes(sortedData[0].time))
  const lastX = xScale(timeToMinutes(sortedData[sortedData.length - 1].time))
  const bottomY = SVG_HEIGHT_FIXED // 고정된 SVG_HEIGHT_FIXED 사용

  if (sortedData.length === 1) return ''

  return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`
})

const fixedXAxisLinesAndLabels = computed(() => {
  const fixedTimes = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
  return fixedTimes.map(timeStr => ({
    time: timeStr,
    x: xScale(timeToMinutes(timeStr))
  }))
})

const yAxisLabels = computed(() => {
  const labelPoints = [...props.yAxisLabelPoints].sort((a, b) => b - a)
  const labelHeightPercentage = 100 / labelPoints.length

  return labelPoints.map(point => ({
    text: props.yAxisLabelFormatter(point),
    height: `${labelHeightPercentage}%`
  }))
})
</script>

<style scoped lang="scss">
.graph-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20.8rem;
  margin-bottom: 3.2rem;
}
.y-axis-labels {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 6rem;
  height: 100%;
  box-sizing: border-box;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6rem;
  color: #555;
  & > div {
    display: flex;
    align-items: top;
    justify-content: flex-start;
    height: v-bind('yAxisLabels.length > 0 ? yAxisLabels[0].height : "auto"');
  }
}

.svg-wrapper {
  position: relative;
  flex-grow: 1;
  width: 100%;
  svg {
    width: calc(100% - 6rem);
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6rem;
    box-sizing: border-box;
    overflow: visible;
  }
}

.grid-line {
  stroke: #ddd;
  stroke-dasharray: 2 4;
  stroke-width: 1;
}

.graph-line {
  fill: none;
  stroke: #4c7ff7;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: fadeIn 1.5s ease-in;
}
.graph-fill {
  fill: url(#gradient);
  opacity: 0.7;
  animation: fadeIn 1.5s ease-in;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.x-axis-labels-group text {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6rem;
  color: #959595;
}
.empty-data-container {
  position: absolute;
  top: 50%;
  left: calc(50% - 3rem);
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
