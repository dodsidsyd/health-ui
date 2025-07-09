<template>
  <div
    ref="containerRef"
    class="chart-container"
    style="position: relative; width: 100%; max-width: 400px; margin: 0 auto"
  >
    <!-- SVG -->
    <svg
      ref="svgEl"
      width="100%"
      height="100px"
      viewBox="0 0 170 76"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- 배경 채움 -->
      <path
        d="M53 18.707C33.8988 28.3307 3.99978 84.4229 -2 60.0707V133H170L172 70.9998C163.85 71.5827 141.967 38.967 127 24C87.5 -15.5001 72.1472 9.06021 53 18.707Z"
        fill="url(#paint0_linear)"
      />
      <!-- 선 곡선 -->
      <path
        ref="curvePath"
        d="M-7.5 65.9999C-1.45095 88.266 33.2716 36.5886 49.6207 22.423C75.5 -0.000207901 93 -9.00024 122.5 19.5003C137.321 33.8192 171.783 80.5328 180 79.9998"
        stroke="#4C7FF7"
        stroke-width="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="54.264"
          y1="74.314"
          x2="54.264"
          y2="-103.334"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F9F9F9" stop-opacity="0" />
          <stop offset="1" stop-color="#4C7FF7" />
        </linearGradient>
      </defs>
    </svg>

    <!-- 포인트 -->
    <div
      class="point"
      :style="{ left: `${point.x}px`, top: `${point.y}px` }"
      style="
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 0.2rem solid #4c7ff7;
        background: #fff;
        transform: translate(-50%, -50%);
      "
    ></div>

    <!-- 툴팁 -->
    <div
      class="tooltip"
      :style="{ left: `${point.x}px`, top: `${point.y - 45}px` }"
      style="
        position: absolute;
        transform: translateX(-50%);
        padding: 0.4rem 0.8rem;
        background: #4f5561;
        border-radius: 1.2rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: #fff;
        white-space: nowrap;
      "
    >
      평균 {{ averageHeartRate }}bpm
      <svg
        class="tooltip-arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="6"
        viewBox="0 0 7 4"
        fill="none"
        style="position: absolute; left: 50%; bottom: -5px; transform: translateX(-50%)"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.23228 3C4.46248 4.33333 2.53798 4.33333 1.76818 3L0.0361328 0H6.96433L5.23228 3Z"
          fill="#4F5561"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed, watch } from 'vue'

const svgEl = ref(null)
const curvePath = ref(null)
const containerRef = ref(null)

// Props로 심박수 데이터 받기
const props = defineProps({
  heartRateData: {
    type: Array,
    default: () => [
      { value: 75, timestamp: new Date('2024-01-01 09:00') },
      { value: 82, timestamp: new Date('2024-01-01 10:00') },
      { value: 78, timestamp: new Date('2024-01-01 11:00') },
      { value: 85, timestamp: new Date('2024-01-01 12:00') },
      { value: 80, timestamp: new Date('2024-01-01 13:00') }
    ]
  },
  maxHeartRate: {
    type: Number,
    default: 100 // 곡선의 최고점에 해당하는 심박수
  },
  minHeartRate: {
    type: Number,
    default: 60 // 곡선의 최저점에 해당하는 심박수
  }
})

// 심박수 데이터에서 평균값 계산
const averageHeartRate = computed(() => {
  if (!props.heartRateData || props.heartRateData.length === 0) return 0
  const sum = props.heartRateData.reduce((acc, data) => acc + data.value, 0)
  return Math.round(sum / props.heartRateData.length)
})

// 곡선 분석하여 실제 y값 범위 찾기
function analyzeCurveRange() {
  const path = curvePath.value
  if (!path) return { minY: 0, maxY: 76 }

  const totalLength = path.getTotalLength()
  let minY = Infinity
  let maxY = -Infinity

  // 곡선을 500개 점으로 더 세밀하게 샘플링
  for (let i = 0; i <= 500; i++) {
    const point = path.getPointAtLength((totalLength * i) / 500)
    minY = Math.min(minY, point.y)
    maxY = Math.max(maxY, point.y)
  }

  console.log('Curve Y range:', { minY, maxY })
  return { minY, maxY }
}

// 심박수에 해당하는 곡선상의 점 찾기
function findPointOnCurve(heartRateValue) {
  const path = curvePath.value
  if (!path) return null

  const totalLength = path.getTotalLength()
  const { minY, maxY } = analyzeCurveRange()

  // 심박수 값을 y 좌표로 변환 (높은 심박수 = 낮은 y값, SVG는 y축이 반대)
  const heartRateRange = props.maxHeartRate - props.minHeartRate
  const yRange = maxY - minY
  const normalizedHeartRate = (heartRateValue - props.minHeartRate) / heartRateRange
  const targetY = maxY - normalizedHeartRate * yRange

  console.log('Target mapping:', {
    heartRateValue,
    normalizedHeartRate,
    targetY,
    heartRateRange,
    yRange
  })

  let bestPoint = null
  let minYDifference = Infinity

  // 곡선 전체에서 목표 y값에 가장 가까운 점 찾기
  for (let i = 0; i <= 500; i++) {
    const point = path.getPointAtLength((totalLength * i) / 500)
    const yDifference = Math.abs(point.y - targetY)

    if (yDifference < minYDifference) {
      minYDifference = yDifference
      bestPoint = point
    }
  }

  console.log('Best point found:', bestPoint)
  return bestPoint
}

const point = reactive({ x: 0, y: 0 })

function updateTooltipPosition() {
  const path = curvePath.value
  const svg = svgEl.value
  const container = containerRef.value

  if (!path || !svg || !container) return

  // SVG의 실제 렌더링된 크기 가져오기
  const svgRect = svg.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  // 올바른 viewBox 크기 사용
  const viewBoxWidth = 170
  const viewBoxHeight = 76

  // 스케일 계산
  const scaleX = svgRect.width / viewBoxWidth
  const scaleY = svgRect.height / viewBoxHeight

  // 평균 심박수에 해당하는 곡선상의 점 찾기
  const targetPoint = findPointOnCurve(averageHeartRate.value)

  if (targetPoint) {
    // SVG 좌표를 컨테이너 기준 좌표로 변환
    point.x = targetPoint.x * scaleX
    point.y = targetPoint.y * scaleY

    console.log('Final point position:', {
      svgPoint: targetPoint,
      containerPoint: { x: point.x, y: point.y },
      scale: { scaleX, scaleY }
    })
  }
}

// 디바운스 함수
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const debouncedUpdate = debounce(updateTooltipPosition, 100)

// 심박수 데이터 변경 시 그래프 업데이트
watch([averageHeartRate], () => {
  nextTick(() => {
    updateTooltipPosition()
  })
})

onMounted(async () => {
  // DOM이 완전히 렌더링된 후 실행
  await nextTick()

  // 초기 위치 설정을 위한 충분한 지연
  setTimeout(updateTooltipPosition, 300)

  // Resize 대응
  const resizeObserver = new ResizeObserver(debouncedUpdate)
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }

  // window resize 이벤트 처리
  window.addEventListener('resize', debouncedUpdate)

  // 컴포넌트 언마운트 시 이벤트 리스너 정리
  return () => {
    window.removeEventListener('resize', debouncedUpdate)
    resizeObserver.disconnect()
  }
})
</script>

<style lang="scss" scoped></style>
