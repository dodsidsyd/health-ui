<template>
  <svg
    class="connection-svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- 동적으로 계산되는 연결선들 -->
    <path
      v-for="connection in connections"
      :key="connection.id"
      :id="connection.id"
      stroke="#AAE292"
      stroke-width="3"
      fill="none"
      stroke-linecap="round"
      class="connection-path"
    />
  </svg>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

interface Connection {
  from: number
  to: number
  id: string
  direction: string
}

interface Position {
  x: number
  y: number
}

const props = defineProps<{
  completedDays: Set<number>
  containerSelector?: string
}>()

const emit = defineEmits<{
  pathsCalculated: []
}>()

// 연결선 정의
const connections = ref<Connection[]>([
  { from: 1, to: 2, id: 'path-1-2', direction: 'horizontal' },
  { from: 2, to: 3, id: 'path-2-3', direction: 'horizontal' },
  { from: 3, to: 4, id: 'path-3-4', direction: 'right-top' },
  { from: 4, to: 5, id: 'path-4-5', direction: 'right-bottom' },
  { from: 5, to: 6, id: 'path-5-6', direction: 'horizontal' },
  { from: 6, to: 7, id: 'path-6-7', direction: 'left-top' },
  { from: 7, to: 8, id: 'path-7-8', direction: 'left-bottom' },
  { from: 8, to: 9, id: 'path-8-9', direction: 'horizontal' },
  { from: 9, to: 10, id: 'path-9-10', direction: 'right-top' },
  { from: 10, to: 11, id: 'path-10-11', direction: 'right-bottom' },
  { from: 11, to: 12, id: 'path-11-12', direction: 'horizontal' },
  { from: 12, to: 13, id: 'path-12-13', direction: 'left-top' },
  { from: 13, to: 14, id: 'path-13-14', direction: 'left-bottom' },
  { from: 14, to: 15, id: 'path-14-15', direction: 'horizontal' },
  { from: 15, to: 16, id: 'path-15-16', direction: 'right-top' },
  { from: 16, to: 17, id: 'path-16-17', direction: 'right-bottom' },
  { from: 17, to: 18, id: 'path-17-18', direction: 'horizontal' },
  { from: 18, to: 19, id: 'path-18-19', direction: 'left-top' },
  { from: 19, to: 20, id: 'path-19-20', direction: 'left-bottom' }
])

// 아이템 위치 계산 함수
const getItemPosition = (itemNumber: number): Position | null => {
  const item = document.querySelector(`[data-item="${itemNumber}"]`)
  if (!item) return null

  const container = document.querySelector(props.containerSelector || '.step-wrap')
  if (!container) return null

  const itemRect = item.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  // 아이템 중심점 계산 (퍼센트 기준)
  const x = ((itemRect.left - containerRect.left + itemRect.width / 2) / containerRect.width) * 100
  const y = ((itemRect.top - containerRect.top + itemRect.height / 2) / containerRect.height) * 100

  return { x, y }
}

// 곡선 경로 생성 함수
const createCurvePath = (start: Position, end: Position, direction: string = 'horizontal'): string => {
  if (!start || !end) return ''

  if (direction === 'right-bottom') {
    // L자 곡선 연결: 먼저 수직으로 이동한 후 곡선으로 수평 연결
    const midY = start.y + 7 // 고정값으로 아래로 내려가기
    const radius = 10 // 곡선 반경 (퍼센트 단위)

    // 곡선을 위한 제어점 계산
    const cornerX = start.x
    const cornerY = midY
    const curveStartY = cornerY - radius
    const curveEndX = cornerX - radius

    return `M${start.x} ${start.y} L${cornerX} ${curveStartY} Q${cornerX} ${cornerY} ${curveEndX} ${cornerY} L${end.x} ${end.y}`
  } else if (direction === 'right-top') {
    // 곡선 연결: 먼저 수평으로 이동한 후 곡선으로 수직 연결
    const radius = 10 // 곡선 반경 (퍼센트 단위)

    // 곡선을 위한 제어점 계산
    const cornerX = end.x
    const cornerY = start.y
    const curveStartX = cornerX - radius
    const curveEndY = cornerY + radius

    return `M${start.x} ${start.y} L${curveStartX} ${cornerY} Q${cornerX} ${cornerY} ${cornerX} ${curveEndY} L${end.x} ${end.y}`
  } else if (direction === 'left-top') {
    // 왼쪽 상단 곡선 연결: 먼저 왼쪽으로 이동한 후 곡선으로 수직 연결
    const radius = 10 // 곡선 반경 (퍼센트 단위)

    // 곡선을 위한 제어점 계산
    const cornerX = end.x
    const cornerY = start.y
    const curveStartX = cornerX + radius
    const curveEndY = cornerY + radius

    return `M${start.x} ${start.y} L${curveStartX} ${cornerY} Q${cornerX} ${cornerY} ${cornerX} ${curveEndY} L${end.x} ${end.y}`
  } else if (direction === 'left-bottom') {
    // 왼측 하단 곡선 연결: 먼저 수직으로 이동한 후 곡선으로 수평 연결
    const radius = 10 // 곡선 반경 (퍼센트 단위)

    // 곡선을 위한 제어점 계산
    const cornerX = start.x
    const cornerY = end.y
    const curveStartY = cornerY - radius
    const curveEndX = cornerX + radius

    return `M${start.x} ${start.y} L${cornerX} ${curveStartY} Q${cornerX} ${cornerY} ${curveEndX} ${cornerY} L${end.x} ${end.y}`
  } else {
    // 나머지는 모두 직선
    return `M${start.x} ${start.y} L${end.x} ${end.y}`
  }
}

// 연결선 계산 및 그리기
const calculateAndDrawPaths = () => {
  // 각 아이템의 위치 계산
  const positions: { [key: number]: Position | null } = {}
  for (let i = 1; i <= 20; i++) {
    positions[i] = getItemPosition(i)
  }

  // SVG 경로 업데이트
  connections.value.forEach(conn => {
    const startPos = positions[conn.from]
    const endPos = positions[conn.to]
    const pathElement = document.getElementById(conn.id)

    if (startPos && endPos && pathElement) {
      const pathData = createCurvePath(startPos, endPos, conn.direction)
      pathElement.setAttribute('d', pathData)
    }
  })

  emit('pathsCalculated')
}

// 경로 진행 상태 업데이트
const updatePathProgress = () => {
  const paths = document.querySelectorAll('.connection-path')
  const completedArray = Array.from(props.completedDays).sort((a, b) => a - b)

  // 완료된 날이 없으면 모든 경로를 미완료 상태로
  if (completedArray.length === 0) {
    paths.forEach((path: Element) => {
      const pathElement = path as SVGPathElement
      pathElement.style.stroke = '#AAE292'
      pathElement.style.strokeWidth = '3'
      pathElement.classList.remove('completed-path')
    })
    return
  }

  // 연속된 완료 일수 계산 (1부터 시작하여 연속된 날들)
  let consecutiveDays = 0
  for (let i = 1; i <= 20; i++) {
    if (completedArray.includes(i)) {
      consecutiveDays = i
    } else {
      break
    }
  }

  // 완료된 경로 수 계산
  const completedPathCount = consecutiveDays - 1

  paths.forEach((path: Element, index: number) => {
    const pathElement = path as SVGPathElement
    const pathNumber = index + 1

    if (pathNumber <= completedPathCount) {
      // 완료된 경로
      pathElement.style.stroke = '#7ABD5E'
      pathElement.style.strokeWidth = '3'
      pathElement.classList.add('completed-path')
    } else {
      // 미완료 경로
      pathElement.style.stroke = '#AAE292'
      pathElement.style.strokeWidth = '3'
      pathElement.classList.remove('completed-path')
    }
  })
}

// completedDays prop 변경 감지
watch(
  () => props.completedDays,
  () => {
    updatePathProgress()
  },
  { deep: true }
)

// 리사이즈 핸들러
const handleResize = () => {
  setTimeout(calculateAndDrawPaths, 0)
}

onMounted(() => {
  nextTick(() => {
    // 위치 계산 후 연결선 그리기
    setTimeout(() => {
      calculateAndDrawPaths()
      updatePathProgress()
    }, 100)
  })

  // 리사이즈 이벤트 리스너 등록
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})

// 외부에서 호출할 수 있는 메서드 노출
defineExpose({
  calculateAndDrawPaths,
  updatePathProgress
})
</script>

<style scoped lang="scss">
.connection-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  .connection-path.completed-path {
    filter: drop-shadow(0 0 0.8rem rgba(0, 0, 0, 0.11));
  }
}
</style>
