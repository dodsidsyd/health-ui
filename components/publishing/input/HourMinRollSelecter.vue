<template>
  <div class="hour-min-roll-selector">
    <!-- 시간 선택 영역 -->
    <div class="time-section">
      <div ref="hourContainer" class="roll-container">
        <div
          class="roll-wheel"
          :style="{ transform: `translateY(${hourTranslateY}px)` }"
          @touchstart="e => handleTouchStart(e, 'hour')"
          @touchmove="e => handleTouchMove(e, 'hour')"
          @touchend="() => handleTouchEnd('hour')"
          @mousedown="e => handleMouseDown(e, 'hour')"
          @mousemove="e => handleMouseMove(e, 'hour')"
          @mouseup="() => handleMouseUp('hour')"
          @mouseleave="() => handleMouseUp('hour')"
        >
          <div
            v-for="(hour, index) in allHours"
            :key="hour"
            class="roll-item"
            :class="{
              active: index === activeHourIndex,
              fade: Math.abs(index - activeHourIndex) > 1
            }"
          >
            {{ String(hour).padStart(2, '0') }}시
          </div>
        </div>
      </div>
    </div>

    <!-- 분 선택 영역 -->
    <div v-if="!hourOnly" class="time-section">
      <div ref="minuteContainer" class="roll-container">
        <div
          class="roll-wheel"
          :style="{ transform: `translateY(${minuteTranslateY}px)` }"
          @touchstart="e => handleTouchStart(e, 'minute')"
          @touchmove="e => handleTouchMove(e, 'minute')"
          @touchend="() => handleTouchEnd('minute')"
          @mousedown="e => handleMouseDown(e, 'minute')"
          @mousemove="e => handleMouseMove(e, 'minute')"
          @mouseup="() => handleMouseUp('minute')"
          @mouseleave="() => handleMouseUp('minute')"
        >
          <div
            v-for="(minute, index) in allMinutes"
            :key="minute"
            class="roll-item"
            :class="{
              active: index === activeMinuteIndex,
              fade: Math.abs(index - activeMinuteIndex) > 1
            }"
          >
            {{ String(minute).padStart(2, '0') }}분
          </div>
        </div>
      </div>
    </div>
    <!-- 선택 영역 표시 -->
    <div class="selection-indicator"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'

// Props
interface Props {
  modelValue?: { hour: number; minute: number }
  minHour?: number
  maxHour?: number
  minuteStep?: number
  defaultHour?: number
  defaultMinute?: number
  hourOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ hour: 9, minute: 0 }),
  minHour: 0,
  maxHour: 23,
  minuteStep: 1,
  defaultHour: 9,
  defaultMinute: 0,
  hourOnly: false
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: { hour: number; minute: number }]
  change: [value: { hour: number; minute: number }]
}>()

// Refs
const hourContainer = ref<HTMLElement>()
const minuteContainer = ref<HTMLElement>()
const hourTranslateY = ref(0)
const minuteTranslateY = ref(0)
const isDraggingHour = ref(false)
const isDraggingMinute = ref(false)
const hourStartY = ref(0)
const minuteStartY = ref(0)
const hourStartTranslateY = ref(0)
const minuteStartTranslateY = ref(0)

// 선택된 시간/분 상태
const selectedHour = ref(props.modelValue?.hour ?? props.defaultHour)
const selectedMinute = ref(props.modelValue?.minute ?? props.defaultMinute)

// Constants
const ITEM_HEIGHT = 40
const VISIBLE_ITEMS = 5

// Computed
const allHours = computed(() => {
  const hours = []
  for (let i = props.minHour; i <= props.maxHour; i++) {
    hours.push(i)
  }
  return hours
})

const allMinutes = computed(() => {
  const minutes = []
  for (let i = 0; i < 60; i += props.minuteStep) {
    minutes.push(i)
  }
  return minutes
})

const selectedHourIndex = computed(() => {
  return allHours.value.findIndex(val => val === selectedHour.value)
})

const selectedMinuteIndex = computed(() => {
  return allMinutes.value.findIndex(val => val === selectedMinute.value)
})

const activeHourIndex = computed(() => {
  const maxTranslateY = 0
  const minTranslateY = -(allHours.value.length - 1) * ITEM_HEIGHT
  const clampedTranslateY = Math.max(minTranslateY, Math.min(maxTranslateY, hourTranslateY.value))
  return Math.round(-clampedTranslateY / ITEM_HEIGHT)
})

const activeMinuteIndex = computed(() => {
  const maxTranslateY = 0
  const minTranslateY = -(allMinutes.value.length - 1) * ITEM_HEIGHT
  const clampedTranslateY = Math.max(minTranslateY, Math.min(maxTranslateY, minuteTranslateY.value))
  return Math.round(-clampedTranslateY / ITEM_HEIGHT)
})

// Methods
const updateSelection = (type: 'hour' | 'minute') => {
  if (type === 'hour') {
    const newIndex = activeHourIndex.value
    if (newIndex >= 0 && newIndex < allHours.value.length) {
      const newHour = allHours.value[newIndex]
      if (newHour !== selectedHour.value) {
        selectedHour.value = newHour
        emitUpdate()
      }
    }
  } else {
    const newIndex = activeMinuteIndex.value
    if (newIndex >= 0 && newIndex < allMinutes.value.length) {
      const newMinute = allMinutes.value[newIndex]
      if (newMinute !== selectedMinute.value) {
        selectedMinute.value = newMinute
        emitUpdate()
      }
    }
  }
}

const emitUpdate = () => {
  const value = { hour: selectedHour.value, minute: props.hourOnly ? 0 : selectedMinute.value }
  emit('update:modelValue', value)
  emit('change', value)
  console.log(
    `⏰ 선택된 시간: ${String(selectedHour.value).padStart(2, '0')}:${String(props.hourOnly ? 0 : selectedMinute.value).padStart(2, '0')}`
  )
}

const snapToNearest = (type: 'hour' | 'minute') => {
  const isHour = type === 'hour'
  const currentTranslateY = isHour ? hourTranslateY.value : minuteTranslateY.value
  const allValues = isHour ? allHours.value : allMinutes.value

  const targetIndex = Math.round(-currentTranslateY / ITEM_HEIGHT)
  const clampedIndex = Math.max(0, Math.min(allValues.length - 1, targetIndex))
  const targetTranslateY = -clampedIndex * ITEM_HEIGHT

  // 애니메이션으로 스냅
  const startY = currentTranslateY
  const distance = targetTranslateY - startY
  const duration = 200
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // easeOut 효과
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    const newTranslateY = startY + distance * easeProgress

    if (isHour) {
      hourTranslateY.value = newTranslateY
    } else {
      minuteTranslateY.value = newTranslateY
    }

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      if (isHour) {
        hourTranslateY.value = targetTranslateY
      } else {
        minuteTranslateY.value = targetTranslateY
      }
      updateSelection(type)
    }
  }

  requestAnimationFrame(animate)
}

const constrainTranslateY = (value: number, type: 'hour' | 'minute') => {
  const allValues = type === 'hour' ? allHours.value : allMinutes.value
  const maxTranslateY = 0
  const minTranslateY = -(allValues.length - 1) * ITEM_HEIGHT
  return Math.max(minTranslateY, Math.min(maxTranslateY, value))
}

// Touch Events
const handleTouchStart = (e: TouchEvent, type: 'hour' | 'minute') => {
  if (type === 'hour') {
    isDraggingHour.value = true
    hourStartY.value = e.touches[0].clientY
    hourStartTranslateY.value = hourTranslateY.value
  } else {
    isDraggingMinute.value = true
    minuteStartY.value = e.touches[0].clientY
    minuteStartTranslateY.value = minuteTranslateY.value
  }
}

const handleTouchMove = (e: TouchEvent, type: 'hour' | 'minute') => {
  const isDragging = type === 'hour' ? isDraggingHour.value : isDraggingMinute.value
  if (!isDragging) return

  e.preventDefault()
  const currentY = e.touches[0].clientY
  const startY = type === 'hour' ? hourStartY.value : minuteStartY.value
  const startTranslateY = type === 'hour' ? hourStartTranslateY.value : minuteStartTranslateY.value
  const deltaY = currentY - startY
  const newTranslateY = startTranslateY + deltaY
  const constrainedY = constrainTranslateY(newTranslateY, type)

  if (type === 'hour') {
    hourTranslateY.value = constrainedY
  } else {
    minuteTranslateY.value = constrainedY
  }

  updateSelection(type)
}

const handleTouchEnd = (type: 'hour' | 'minute') => {
  const isDragging = type === 'hour' ? isDraggingHour.value : isDraggingMinute.value
  if (!isDragging) return

  if (type === 'hour') {
    isDraggingHour.value = false
  } else {
    isDraggingMinute.value = false
  }

  snapToNearest(type)
}

// Mouse Events
const handleMouseDown = (e: MouseEvent, type: 'hour' | 'minute') => {
  if (type === 'hour') {
    isDraggingHour.value = true
    hourStartY.value = e.clientY
    hourStartTranslateY.value = hourTranslateY.value
  } else {
    isDraggingMinute.value = true
    minuteStartY.value = e.clientY
    minuteStartTranslateY.value = minuteTranslateY.value
  }
  e.preventDefault()
}

const handleMouseMove = (e: MouseEvent, type: 'hour' | 'minute') => {
  const isDragging = type === 'hour' ? isDraggingHour.value : isDraggingMinute.value
  if (!isDragging) return

  const currentY = e.clientY
  const startY = type === 'hour' ? hourStartY.value : minuteStartY.value
  const startTranslateY = type === 'hour' ? hourStartTranslateY.value : minuteStartTranslateY.value
  const deltaY = currentY - startY
  const newTranslateY = startTranslateY + deltaY
  const constrainedY = constrainTranslateY(newTranslateY, type)

  if (type === 'hour') {
    hourTranslateY.value = constrainedY
  } else {
    minuteTranslateY.value = constrainedY
  }

  updateSelection(type)
}

const handleMouseUp = (type: 'hour' | 'minute') => {
  const isDragging = type === 'hour' ? isDraggingHour.value : isDraggingMinute.value
  if (!isDragging) return

  if (type === 'hour') {
    isDraggingHour.value = false
  } else {
    isDraggingMinute.value = false
  }

  snapToNearest(type)
}

// 외부에서 값을 설정하는 메서드
const setTime = (hour: number, minute: number) => {
  selectedHour.value = hour
  if (!props.hourOnly) {
    selectedMinute.value = minute
  }

  const hourIndex = allHours.value.findIndex(val => val === hour)
  
  if (hourIndex !== -1) {
    hourTranslateY.value = -hourIndex * ITEM_HEIGHT
  }
  
  if (!props.hourOnly) {
    const minuteIndex = allMinutes.value.findIndex(val => val === minute)
    if (minuteIndex !== -1) {
      minuteTranslateY.value = -minuteIndex * ITEM_HEIGHT
    }
  }

  emitUpdate()
}

// Lifecycle
onMounted(() => {
  nextTick(() => {
    // 초기 위치를 선택된 값으로 설정
    const initialHourIndex = selectedHourIndex.value
    hourTranslateY.value = -initialHourIndex * ITEM_HEIGHT
    
    if (!props.hourOnly) {
      const initialMinuteIndex = selectedMinuteIndex.value
      minuteTranslateY.value = -initialMinuteIndex * ITEM_HEIGHT
    }
  })
})

// Watch for external model value changes
watch(
  () => props.modelValue,
  newValue => {
    if (newValue && (newValue.hour !== selectedHour.value || (!props.hourOnly && newValue.minute !== selectedMinute.value))) {
      selectedHour.value = newValue.hour
      if (!props.hourOnly) {
        selectedMinute.value = newValue.minute
      }

      const hourIndex = allHours.value.findIndex(val => val === newValue.hour)
      if (hourIndex !== -1) {
        hourTranslateY.value = -hourIndex * ITEM_HEIGHT
      }
      
      if (!props.hourOnly) {
        const minuteIndex = allMinutes.value.findIndex(val => val === newValue.minute)
        if (minuteIndex !== -1) {
          minuteTranslateY.value = -minuteIndex * ITEM_HEIGHT
        }
      }
    }
  },
  { deep: true, immediate: true }
)

// 외부에서 사용할 수 있도록 expose
defineExpose({
  setTime
})
</script>

<style scoped lang="scss">
.hour-min-roll-selector {
  background-color: #f9f9f9;
  margin-top: 1.6rem;
  padding: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  gap: 0rem;
  border-radius: 0.8rem;
  justify-content: center;
  .time-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 12rem;
    flex: 0 0 auto;
  }

  .roll-container {
    position: relative;
    height: 20rem; // 5 * ITEM_HEIGHT (5 * 40px)
    width: 100%; // 시/분 텍스트를 위해 너비 증가
    overflow: hidden;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }

  .roll-wheel {
    position: relative;
    padding-top: 8.2rem; // (VISIBLE_ITEMS / 2) * ITEM_HEIGHT (1 * 40px)
    transition: transform 0.1s ease-out;
    user-select: none;
    z-index: 2;
  }

  .roll-item {
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 600;
    color: #555;
    transition: all 0.2s ease;

    &.active {
      color: vars.$blue-primary;
      font-size: 2.2rem;
      font-weight: 700;
      opacity: 1;
    }
    &.fade {
      font-size: 1.6rem;
      color: #959595;
    }
  }
}
.selection-indicator {
  position: absolute;
  top: 50%;
  left: 3.6rem;
  right: 3.6rem;
  height: 4.8rem;
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
