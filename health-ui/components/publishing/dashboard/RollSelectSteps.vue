<template>
  <div class="roll-step-select">
    <div ref="rollContainer" class="roll-container">
      <div
        class="roll-wheel"
        :style="{ transform: `translateY(${translateY}px)` }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
      >
        <div
          v-for="(value, index) in allValues"
          :key="value"
          class="roll-item"
          :class="{
            active: index === activeIndex,
            fade: Math.abs(index - activeIndex) > 1
          }"
        >
          {{ value.toLocaleString() }}
        </div>
      </div>

      <!-- 선택 영역 표시 -->
      <div class="selection-indicator"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'

// Props
interface Props {
  modelValue?: number
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 8000, // 디폴트 셋팅 걸음수
  min: 5000, // 최저 선택 옵션
  max: 30000, // 최고 선택옵션
  step: 500 // 선택옵션 단계
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

// Refs
const rollContainer = ref<HTMLElement>()
const translateY = ref(0)
const isDragging = ref(false)
const startY = ref(0)
const startTranslateY = ref(0)
const selectedValue = ref(props.modelValue)

// Constants
const ITEM_HEIGHT = 48
const VISIBLE_ITEMS = 5
const centerIndex = Math.floor(VISIBLE_ITEMS / 2)

// Computed
const allValues = computed(() => {
  const values = []
  for (let i = props.min; i <= props.max; i += props.step) {
    values.push(i)
  }
  return values
})

const selectedIndex = computed(() => {
  return allValues.value.findIndex(val => val === selectedValue.value)
})

const activeIndex = computed(() => {
  const maxTranslateY = 0
  const minTranslateY = -(allValues.value.length - 1) * ITEM_HEIGHT
  const clampedTranslateY = Math.max(minTranslateY, Math.min(maxTranslateY, translateY.value))

  return Math.round(-clampedTranslateY / ITEM_HEIGHT)
})

// Methods
const updateSelection = () => {
  const newIndex = activeIndex.value
  if (newIndex >= 0 && newIndex < allValues.value.length) {
    const newValue = allValues.value[newIndex]
    if (newValue !== selectedValue.value) {
      selectedValue.value = newValue
      emit('update:modelValue', selectedValue.value)
      console.log('선택된 목표 걸음수 = ' + selectedValue.value)
    }
  }
}

const snapToNearest = () => {
  const targetIndex = Math.round(-translateY.value / ITEM_HEIGHT)
  const clampedIndex = Math.max(0, Math.min(allValues.value.length - 1, targetIndex))
  const targetTranslateY = -clampedIndex * ITEM_HEIGHT

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
      updateSelection()
    }
  }

  requestAnimationFrame(animate)
}

const constrainTranslateY = (value: number) => {
  const maxTranslateY = 0
  const minTranslateY = -(allValues.value.length - 1) * ITEM_HEIGHT
  return Math.max(minTranslateY, Math.min(maxTranslateY, value))
}

// Touch Events
const handleTouchStart = (e: TouchEvent) => {
  isDragging.value = true
  startY.value = e.touches[0].clientY
  startTranslateY.value = translateY.value
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return

  e.preventDefault()
  const currentY = e.touches[0].clientY
  const deltaY = currentY - startY.value
  const newTranslateY = startTranslateY.value + deltaY
  translateY.value = constrainTranslateY(newTranslateY)
  updateSelection()
}

const handleTouchEnd = () => {
  if (!isDragging.value) return

  isDragging.value = false
  snapToNearest()
}

// Mouse Events
const handleMouseDown = (e: MouseEvent) => {
  isDragging.value = true
  startY.value = e.clientY
  startTranslateY.value = translateY.value
  e.preventDefault()
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  const currentY = e.clientY
  const deltaY = currentY - startY.value
  const newTranslateY = startTranslateY.value + deltaY
  translateY.value = constrainTranslateY(newTranslateY)
  updateSelection()
}

const handleMouseUp = () => {
  if (!isDragging.value) return

  isDragging.value = false
  snapToNearest()
}

// Lifecycle
onMounted(() => {
  // 초기 위치를 선택된 값으로 설정
  nextTick(() => {
    const initialIndex = selectedIndex.value
    translateY.value = -initialIndex * ITEM_HEIGHT
  })
})

// Watch for external model value changes
watch(
  () => props.modelValue,
  newValue => {
    if (newValue !== selectedValue.value) {
      selectedValue.value = newValue
      const newIndex = allValues.value.findIndex(val => val === newValue)
      if (newIndex !== -1) {
        translateY.value = -newIndex * ITEM_HEIGHT
      }
    }
  }
)
</script>

<style scoped lang="scss">
.roll-step-select {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.roll-container {
  position: relative;
  height: 24rem;
  width: 100%;
  padding: 0 4.8rem;
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
  font-size: 1.8rem;
  font-weight: 600;
  color: #666;
  transition: all 0.2s ease;

  &.active {
    color: vars.$blue-primary;
    font-size: 2.2rem;
  }

  &.fade {
    color: #959595;
    font-size: 1.6rem;
  }
}

.selection-indicator {
  position: absolute;
  top: 50%;
  left: 4.8rem;
  right: 4.8rem;
  height: 4.8rem;
  transform: translateY(-50%);
  border-radius: 0.8rem;
  background: vars.$white;
  box-shadow: 0 0.4rem 1.2rem 0px rgba(0, 0, 0, 0.04);
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
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M11.2 6.55157C12.2667 7.19525 12.2667 8.80447 11.2 9.44815L6.4 12.3447C5.33333 12.9884 4 12.1838 4 10.8964L4 5.10327C4 3.8159 5.33333 3.01129 6.4 3.65498L11.2 6.55157Z' fill='%234C7FF7'/%3E%3C/svg%3E");
  }
  &::before {
    left: -3.2rem;
  }
  &::after {
    right: -3.2rem;
    transform: scaleX(-1) translateY(-50%);
  }
}
</style>
