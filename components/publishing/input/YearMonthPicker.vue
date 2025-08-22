<template>
  <div class="year-month-picker">
    <div class="picker-container">
      <!-- 연도 선택 -->
      <div class="picker-section">
        <div ref="yearRollContainer" class="roll-container">
          <div
            class="roll-wheel"
            :style="{ transform: `translateY(${yearTranslateY}px)` }"
            @touchstart="e => handleTouchStart(e, 'year')"
            @touchmove="e => handleTouchMove(e, 'year')"
            @touchend="() => handleTouchEnd('year')"
            @mousedown="e => handleMouseDown(e, 'year')"
            @mousemove="e => handleMouseMove(e, 'year')"
            @mouseup="() => handleMouseUp('year')"
            @mouseleave="() => handleMouseUp('year')"
          >
            <div
              v-for="(year, index) in yearList"
              :key="`year-${year || index}`"
              class="roll-item"
              :class="{
                active: index === activeYearIndex,
                fade: Math.abs(index - activeYearIndex) > 1,
                empty: year === null
              }"
            >
              {{ year ? `${year}년` : '' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 월 선택 -->
      <div class="picker-section">
        <div ref="monthRollContainer" class="roll-container">
          <div
            class="roll-wheel"
            :style="{ transform: `translateY(${monthTranslateY}px)` }"
            @touchstart="e => handleTouchStart(e, 'month')"
            @touchmove="e => handleTouchMove(e, 'month')"
            @touchend="() => handleTouchEnd('month')"
            @mousedown="e => handleMouseDown(e, 'month')"
            @mousemove="e => handleMouseMove(e, 'month')"
            @mouseup="() => handleMouseUp('month')"
            @mouseleave="() => handleMouseUp('month')"
          >
            <div
              v-for="(month, index) in monthList"
              :key="`month-${month || index}`"
              class="roll-item"
              :class="{
                active: index === activeMonthIndex,
                fade: Math.abs(index - activeMonthIndex) > 1,
                empty: month === null
              }"
            >
              {{ month ? `${month}월` : '' }}
            </div>
          </div>
          <!-- 선택 영역 표시 -->
          <!-- <div class="selection-indicator"></div> -->
        </div>
      </div>
      <!-- 선택 영역 표시 -->
      <div class="selection-indicator"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'

interface Props {
  modelValue?: { year: number; month: number } | null
  minYear?: number
  maxYear?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  minYear: 1990,
  maxYear: new Date().getFullYear()
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: { year: number; month: number }): void
}>()

// Constants
const ITEM_HEIGHT = 48
const VISIBLE_ITEMS = 5

// 현재 연도와 월
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1

// 선택된 연도와 월
const selectedYear = ref(props.modelValue?.year || currentYear)
const selectedMonth = ref(props.modelValue?.month || currentMonth)

// Refs
const yearRollContainer = ref<HTMLElement>()
const monthRollContainer = ref<HTMLElement>()
const yearTranslateY = ref(0)
const monthTranslateY = ref(0)

// Dragging states
const isDraggingYear = ref(false)
const isDraggingMonth = ref(false)
const startY = ref(0)
const startTranslateY = ref(0)

// 연도 리스트 생성 (앞뒤 빈칸 추가)
const yearList = computed(() => {
  const years: (number | null)[] = []
  // 앞에 2개 빈칸
  years.push(null, null)
  // 실제 연도들
  for (let year = props.minYear; year <= props.maxYear; year++) {
    years.push(year)
  }
  // 뒤에 2개 빈칸
  years.push(null, null)
  return years
})

// 월 리스트 생성 (앞뒤 빈칸 추가)
const monthList = computed(() => {
  const months: (number | null)[] = []
  // 앞에 2개 빈칸
  months.push(null, null)
  // 실제 월들
  for (let month = 1; month <= 12; month++) {
    months.push(month)
  }
  // 뒤에 2개 빈칸
  months.push(null, null)
  return months
})

// Active indices
const activeYearIndex = computed(() => {
  const maxTranslateY = 0
  const minTranslateY = -(yearList.value.length - 1) * ITEM_HEIGHT
  const clampedTranslateY = Math.max(minTranslateY, Math.min(maxTranslateY, yearTranslateY.value))
  return Math.round(-clampedTranslateY / ITEM_HEIGHT)
})

const activeMonthIndex = computed(() => {
  const maxTranslateY = 0
  const minTranslateY = -(monthList.value.length - 1) * ITEM_HEIGHT
  const clampedTranslateY = Math.max(minTranslateY, Math.min(maxTranslateY, monthTranslateY.value))
  return Math.round(-clampedTranslateY / ITEM_HEIGHT)
})

// Methods
const updateSelection = (type: 'year' | 'month') => {
  if (type === 'year') {
    const newIndex = activeYearIndex.value
    if (newIndex >= 0 && newIndex < yearList.value.length) {
      const newValue = yearList.value[newIndex]
      if (newValue !== null && newValue !== selectedYear.value) {
        selectedYear.value = newValue
        emitChange()
      }
    }
  } else {
    const newIndex = activeMonthIndex.value
    if (newIndex >= 0 && newIndex < monthList.value.length) {
      const newValue = monthList.value[newIndex]
      if (newValue !== null && newValue !== selectedMonth.value) {
        selectedMonth.value = newValue
        emitChange()
      }
    }
  }
}

const emitChange = () => {
  emit('update:modelValue', {
    year: selectedYear.value,
    month: selectedMonth.value
  })
  console.log(`📅 선택된 날짜: ${selectedYear.value}년 ${selectedMonth.value}월`)
}

const snapToNearest = (type: 'year' | 'month') => {
  const translateY = type === 'year' ? yearTranslateY : monthTranslateY
  const list = type === 'year' ? yearList.value : monthList.value

  let targetIndex = Math.round(-translateY.value / ITEM_HEIGHT)

  // 빈 항목은 건너뛰기
  while (targetIndex >= 0 && targetIndex < list.length && list[targetIndex] === null) {
    // 가장 가까운 유효한 항목 찾기
    const prevValid = findPrevValidIndex(list, targetIndex)
    const nextValid = findNextValidIndex(list, targetIndex)

    if (prevValid === -1 && nextValid === -1) break

    if (prevValid === -1) {
      targetIndex = nextValid
    } else if (nextValid === -1) {
      targetIndex = prevValid
    } else {
      // 더 가까운 유효한 항목 선택
      const prevDist = targetIndex - prevValid
      const nextDist = nextValid - targetIndex
      targetIndex = prevDist <= nextDist ? prevValid : nextValid
    }
  }

  // 범위 제한
  targetIndex = Math.max(0, Math.min(list.length - 1, targetIndex))
  const targetTranslateY = -targetIndex * ITEM_HEIGHT

  // 애니메이션으로 스냅
  const startY = translateY.value
  const distance = targetTranslateY - startY
  const duration = 200
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // easeOut 효과
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    translateY.value = startY + distance * easeProgress

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      translateY.value = targetTranslateY
      updateSelection(type)
    }
  }

  requestAnimationFrame(animate)
}

const findPrevValidIndex = (list: (number | null)[], fromIndex: number): number => {
  for (let i = fromIndex - 1; i >= 0; i--) {
    if (list[i] !== null) return i
  }
  return -1
}

const findNextValidIndex = (list: (number | null)[], fromIndex: number): number => {
  for (let i = fromIndex + 1; i < list.length; i++) {
    if (list[i] !== null) return i
  }
  return -1
}

const constrainTranslateY = (value: number, type: 'year' | 'month') => {
  const list = type === 'year' ? yearList.value : monthList.value
  const maxTranslateY = 0
  const minTranslateY = -(list.length - 1) * ITEM_HEIGHT
  return Math.max(minTranslateY, Math.min(maxTranslateY, value))
}

// Touch Events
const handleTouchStart = (e: TouchEvent, type: 'year' | 'month') => {
  if (type === 'year') {
    isDraggingYear.value = true
  } else {
    isDraggingMonth.value = true
  }
  startY.value = e.touches[0].clientY
  startTranslateY.value = type === 'year' ? yearTranslateY.value : monthTranslateY.value
}

const handleTouchMove = (e: TouchEvent, type: 'year' | 'month') => {
  const isDragging = type === 'year' ? isDraggingYear.value : isDraggingMonth.value
  if (!isDragging) return

  e.preventDefault()
  const currentY = e.touches[0].clientY
  const deltaY = currentY - startY.value
  const newTranslateY = startTranslateY.value + deltaY

  if (type === 'year') {
    yearTranslateY.value = constrainTranslateY(newTranslateY, 'year')
  } else {
    monthTranslateY.value = constrainTranslateY(newTranslateY, 'month')
  }
}

const handleTouchEnd = (type: 'year' | 'month') => {
  if (type === 'year') {
    if (!isDraggingYear.value) return
    isDraggingYear.value = false
  } else {
    if (!isDraggingMonth.value) return
    isDraggingMonth.value = false
  }
  snapToNearest(type)
}

// Mouse Events
const handleMouseDown = (e: MouseEvent, type: 'year' | 'month') => {
  if (type === 'year') {
    isDraggingYear.value = true
  } else {
    isDraggingMonth.value = true
  }
  startY.value = e.clientY
  startTranslateY.value = type === 'year' ? yearTranslateY.value : monthTranslateY.value
  e.preventDefault()
}

const handleMouseMove = (e: MouseEvent, type: 'year' | 'month') => {
  const isDragging = type === 'year' ? isDraggingYear.value : isDraggingMonth.value
  if (!isDragging) return

  const currentY = e.clientY
  const deltaY = currentY - startY.value
  const newTranslateY = startTranslateY.value + deltaY

  if (type === 'year') {
    yearTranslateY.value = constrainTranslateY(newTranslateY, 'year')
  } else {
    monthTranslateY.value = constrainTranslateY(newTranslateY, 'month')
  }
}

const handleMouseUp = (type: 'year' | 'month') => {
  if (type === 'year') {
    if (!isDraggingYear.value) return
    isDraggingYear.value = false
  } else {
    if (!isDraggingMonth.value) return
    isDraggingMonth.value = false
  }
  snapToNearest(type)
}

// 선택된 연도로 스크롤
const scrollToSelectedYear = () => {
  const index = yearList.value.findIndex(y => y === selectedYear.value)
  if (index !== -1) {
    yearTranslateY.value = -index * ITEM_HEIGHT
  }
}

// 선택된 월로 스크롤
const scrollToSelectedMonth = () => {
  const index = monthList.value.findIndex(m => m === selectedMonth.value)
  if (index !== -1) {
    monthTranslateY.value = -index * ITEM_HEIGHT
  }
}

// Lifecycle
onMounted(() => {
  nextTick(() => {
    scrollToSelectedYear()
    scrollToSelectedMonth()
  })
})

// Watch for external model value changes
watch(
  () => props.modelValue,
  newValue => {
    if (newValue) {
      if (newValue.year !== selectedYear.value) {
        selectedYear.value = newValue.year
        scrollToSelectedYear()
      }
      if (newValue.month !== selectedMonth.value) {
        selectedMonth.value = newValue.month
        scrollToSelectedMonth()
      }
    }
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
.year-month-picker {
  width: 100%;

  .picker-container {
    display: flex;
    gap: 0;
    padding: 0 3rem;
    justify-content: center;
  }

  .picker-section {
    flex: 1;
    max-width: 20rem;
  }

  .picker-label {
    font-size: 1.4rem;
    font-weight: 600;
    color: #2b2b2b;
    margin-bottom: 1.2rem;
    text-align: center;
  }
}

.roll-container {
  position: relative;
  height: 24rem;
  width: 100%;
  padding: 0;
  overflow: hidden;
  background: #f9f9f9;
  border-radius: 0.8rem;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

.roll-wheel {
  position: relative;
  padding-top: 9.6rem; // (VISIBLE_ITEMS / 2) * ITEM_HEIGHT (2 * 48)
  transition: transform 0.1s ease-out;
  user-select: none;
  z-index: 2;
}

.roll-item {
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: #555;
  transition: all 0.2s ease;

  &.active {
    color: vars.$blue-primary;
    font-size: 2.2rem;
  }

  &.fade {
    opacity: 0.5;
    color: #959595;
    font-size: 1.6rem;
  }

  &.empty {
    visibility: hidden;
    pointer-events: none;
  }
}

.selection-indicator {
  position: absolute;
  top: 50%;
  left: 5.6rem;
  right: 5.6rem;
  height: 4.8rem;
  margin-top: 2rem;
  transform: translateY(-50%);
  border-radius: 0.8rem;
  background: vars.$white;
  box-shadow: 0 0.4rem 1.2rem 0px rgba(0, 0, 0, 0.08);
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    left: -2.4rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M11.2 6.55157C12.2667 7.19525 12.2667 8.80447 11.2 9.44815L6.4 12.3447C5.33333 12.9884 4 12.1838 4 10.8964L4 5.10327C4 3.8159 5.33333 3.01129 6.4 3.65498L11.2 6.55157Z' fill='%234C7FF7'/%3E%3C/svg%3E");
  }

  &::after {
    right: -2.4rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4.8 9.44843C3.73333 8.80475 3.73333 7.19553 4.8 6.55185L9.6 3.65526C10.6667 3.01157 12 3.81618 12 5.10355V10.8967C12 12.1841 10.6667 12.9887 9.6 12.345L4.8 9.44843Z' fill='%234C7FF7'/%3E%3C/svg%3E");
  }
}
</style>
