<template>
  <div :class="['chart-wrap', chartClass]">
    <div class="chart-container">
      <svg :width="size" :height="size" :viewBox="viewBox">
        <g v-for="segment in segments" :key="segment.index">
          <path :d="segment.path" :fill="segment.color" />

          <text
            :x="getLabelPosition(segment.midAngle).x"
            :y="getLabelPosition(segment.midAngle).y"
            text-anchor="middle"
            dominant-baseline="middle"
            class="label"
          >
            {{ Math.round((segment.value / total) * 100) }}%
          </text>
        </g>
      </svg>

      <!-- 최대값 툴팁 -->
      <div v-if="highestSegment" class="tooltip" :style="getTooltipStyle(highestSegment)">
        <div class="tooltip-content">
          <span class="count"> {{ highestSegment.value.toLocaleString() }}명 </span>
          <div class="tooltip-arrow" :style="getTooltipArrowStyle(highestSegment)"></div>
        </div>
      </div>
    </div>

    <!-- 범례 -->
    <div class="legend">
      <div v-for="item in chartData" :key="item.label" class="legend-item">
        <div class="dot" :style="{ backgroundColor: item.color }" />
        <span class="legend-label">{{ item.label }}</span>
        <!-- <span class="legend-value">{{ item.value.toLocaleString() }}명</span> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ChartData {
  label: string
  value: number
  color: string
}

interface PieSegment extends ChartData {
  path: string
  midAngle: number
  angle: number
  index: number
}

interface Position {
  x: number
  y: number
}

// Props 정의
interface Props {
  data: ChartData[]
  size?: number
  viewBox?: string
  showTooltip?: boolean
  chartClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 300,
  viewBox: '0 0 300 300',
  showTooltip: true,
  chartClass: ''
})

const chartData = computed(() => props.data)
const center = computed(() => props.size / 2)
const radius = computed(() => props.size / 3) // size에 비례하여 반지름 계산
const labelRadius = computed(() => radius.value * 0.55) // 라벨 위치도 동적으로

const total = computed(() => chartData.value.reduce((sum, d) => sum + d.value, 0))

const createPieSlice = (
  value: number,
  total: number,
  startAngle: number
): { path: string; midAngle: number; angle: number } => {
  const angle = (value / total) * 360
  const endAngle = startAngle + angle
  const x1 = center.value + radius.value * Math.cos((startAngle * Math.PI) / 180)
  const y1 = center.value + radius.value * Math.sin((startAngle * Math.PI) / 180)
  const x2 = center.value + radius.value * Math.cos((endAngle * Math.PI) / 180)
  const y2 = center.value + radius.value * Math.sin((endAngle * Math.PI) / 180)
  const largeArc = angle > 180 ? 1 : 0

  return {
    path: `M ${center.value} ${center.value} L ${x1} ${y1} A ${radius.value} ${radius.value} 0 ${largeArc} 1 ${x2} ${y2} Z`,
    midAngle: startAngle + angle / 2,
    angle
  }
}

const segments = computed(() => {
  let currentAngle = -90
  return chartData.value.map((item, index) => {
    const slice = createPieSlice(item.value, total.value, currentAngle)
    currentAngle += slice.angle
    return { ...item, ...slice, index }
  })
})

const highestSegment = computed(() => {
  if (!props.showTooltip) return null
  const max = Math.max(...chartData.value.map(d => d.value))
  return segments.value.find(s => s.value === max)
})

const getLabelPosition = (angle: number, innerOffset?: number): Position => {
  const offset = innerOffset || labelRadius.value
  const rad = (angle * Math.PI) / 180
  return {
    x: center.value + offset * Math.cos(rad),
    y: center.value + offset * Math.sin(rad)
  }
}

const getTooltipStyle = (segment: PieSegment) => {
  const angle = (segment.midAngle + 360) % 360
  const labelPos = getLabelPosition(segment.midAngle)

  // 툴팁 오프셋을 size에 비례하여 계산
  const tooltipOffset = props.size * 0.067 // 20px는 300px 기준 (20/300 = 0.067)

  let offsetX = 0
  let offsetY = 0
  let transform = 'translate(-50%, -50%)'

  if (angle >= 45 && angle < 135) {
    // 아래
    offsetY = tooltipOffset
    transform = 'translate(-50%, 0)'
  } else if (angle >= 135 && angle < 225) {
    // 왼쪽
    offsetX = -tooltipOffset
    transform = 'translate(calc(-100% - .8rem), -50%)'
  } else if (angle >= 225 && angle < 315) {
    // 위
    offsetY = -tooltipOffset
    transform = 'translate(-50%, -100%)'
  } else {
    // 오른쪽
    offsetX = tooltipOffset
    transform = 'translate(0, -50%)'
  }

  return {
    position: 'absolute' as const,
    left: `${labelPos.x + offsetX}px`,
    top: `${labelPos.y + offsetY}px`,
    transform
  }
}

const getTooltipArrowStyle = (segment: PieSegment) => {
  const angle = segment.midAngle % 360
  if (angle >= 315 || angle < 45) return { left: '-3px', top: '50%', transform: 'translateY(-50%) rotate(0deg)' }
  if (angle >= 45 && angle < 135) return { top: '-13px', left: '50%', transform: 'translateX(-50%) rotate(90deg)' }
  if (angle >= 135 && angle < 225) return { right: '-3px', top: '50%', transform: 'translateY(-50%) rotate(180deg)' }
  return { bottom: '-8px', left: '50%', transform: 'translateX(-50%) rotate(180deg)' }
}
</script>

<style lang="scss" scoped>
.chart-wrap {
  .chart-container {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  svg {
    display: block;
    margin: 0 auto;
  }

  .label {
    fill: #fff;
    font-weight: bold;
    font-size: 12px;
    pointer-events: none;
  }

  .tooltip {
    position: absolute;
    z-index: 10;
    transform: translate(-50%, -50%);
    background: #4f5561;
    color: #fff;
    border-radius: 1.2rem;
    padding: 8px 12px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    .tooltip-content {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-direction: column;
    }

    .color-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .tooltip-arrow {
      position: absolute;
      width: 0.4rem;
      height: 2.4rem;
      /* border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid #333; */
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='24' viewBox='0 0 4 24' fill='none'%3E%3Cpath d='M0.99992 13.2676C-0.333254 12.4977 -0.33336 10.5735 0.99992 9.80371L3.99992 8.07129L3.99992 15L0.99992 13.2676Z' fill='%234F5561'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: 0.4rem;
      background-position: 100%;
    }
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    @media (max-width: 370px) {
      gap: 0.6rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      border-radius: 1.6rem;
      font-size: 1.1rem;
      line-height: 1.5rem;

      .dot {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
      }

      .legend-label {
        font-size: 1.1rem;
        font-weight: 400;
        color: #959595;
      }

      .legend-value {
        color: #666;
        font-size: 12px;
      }
    }
  }
}
</style>
