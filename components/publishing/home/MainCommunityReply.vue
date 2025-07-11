<template>
  <div class="main-community-reply">
    <!-- Dynamic Community Reply Swipers -->
    <div
      v-for="(slider, sliderIndex) in sliders"
      :key="`slider-${sliderIndex}`"
      class="community-reply-swiper-container"
    >
      <div
        :ref="el => setSliderRef(el, sliderIndex)"
        class="community-reply-swiper"
        @touchstart="e => handleTouchStart(e, sliderIndex)"
        @touchmove="e => handleTouchMove(e, sliderIndex)"
        @touchend="() => handleTouchEnd(sliderIndex)"
        @mousedown="e => handleMouseDown(e, sliderIndex)"
        @mousemove="e => handleMouseMove(e, sliderIndex)"
        @mouseup="() => handleMouseUp(sliderIndex)"
        @mouseleave="() => handleMouseUp(sliderIndex)"
        :style="{
          transform: `translateX(${dragOffsets[sliderIndex] || 0}px)`,
          transition: isTransitioning[sliderIndex]
            ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            : isDragging[sliderIndex]
              ? 'none'
              : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }"
      >
        <div
          v-for="(item, itemIndex) in slider"
          :key="`item-${item.id}-${itemIndex}`"
          class="community-item"
          :class="{
            'blue-type': item.type === 'blue-type',
            new: item.type === 'new'
          }"
        >
          <nuxt-link :to="item.link || 'javascript:void(0)'" @click="e => handleLinkClick(e, sliderIndex, item)">
            <i class="icon-wrap">
              <img :src="item.icon" alt="" />
            </i>
            {{ item.text }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'

// Props 정의
interface CommunityItem {
  id: string | number
  text: string
  type?: 'blue-type' | 'new' | 'default'
  link?: string
  icon?: string
}

interface Props {
  sliders?: CommunityItem[][]
  rightMargin?: number // 마지막 드래그 종료 시 우측 여백 (px)
}

import dummyIcon from '~/assets/images/home/ico-dummy.svg'
import dummyIcon2 from '~/assets/images/home/ico-dummy2.svg'

const props = withDefaults(defineProps<Props>(), {
  rightMargin: 40,
  sliders: () => [
    [
      { id: 1, text: '새로운 댓글 3개', type: 'blue-type', link: '', icon: dummyIcon2 },
      { id: 2, text: '새로운 반응 12개', type: 'blue-type', link: '', icon: dummyIcon2 },
      { id: 3, text: '추가 알림 5개', type: 'blue-type', link: '', icon: dummyIcon2 }
    ],
    [
      { id: 4, text: '새로운 댓글 3개', type: 'new', link: '', icon: dummyIcon },
      { id: 5, text: '새로운 댓글 3개', type: 'default', link: '', icon: dummyIcon },
      { id: 6, text: '추가 댓글 7개', type: 'default', link: '', icon: dummyIcon }
    ],
    [
      { id: 7, text: '오늘의 한마디 : 내가 가장 행복한 순간', type: 'default', link: '', icon: dummyIcon },
      { id: 8, text: '오늘의 한마디 : 내가 가장 행복한 순간', type: 'default', link: '', icon: dummyIcon },
      { id: 9, text: '오늘의 한마디 : 감사한 마음 1', type: 'default', link: '', icon: dummyIcon },
      { id: 10, text: '오늘의 한마디 : 감사한 마음 2', type: 'default', link: '', icon: dummyIcon },
      { id: 11, text: '오늘의 한마디 : 감사한 마음 3', type: 'default', link: '', icon: dummyIcon },
      { id: 12, text: '오늘의 한마디 : 감사한 마음 4', type: 'default', link: '', icon: dummyIcon }
    ]
  ]
})

// 슬라이더 상태 관리 (동적 개수에 맞춰 초기화)
const sliderCount = ref(props.sliders.length)
const startX = ref<number[]>([])
const currentX = ref<number[]>([])
const isDragging = ref<boolean[]>([])
const isMouseDragging = ref<boolean[]>([])
const dragOffsets = ref<number[]>([])
const isTransitioning = ref<boolean[]>([])
const velocity = ref<number[]>([])
const lastMoveTime = ref<number[]>([])
const lastMoveX = ref<number[]>([])

// 드래그와 클릭을 구분하기 위한 변수들
const hasMoved = ref<boolean[]>([])
const dragThreshold = 10
const startTime = ref<number[]>([])
const clickTimeThreshold = 300

// 스크롤 설정
const rightMarginPx = computed(() => props.rightMargin) // 마지막 드래그 종료 시 우측 여백

// 슬라이더 컨테이너 참조
const sliderRefs = ref<HTMLElement[]>([])

// ref 설정 함수
const setSliderRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    sliderRefs.value[index] = el
  }
}

// 실제 DOM 요소를 측정하여 최대 스크롤 거리 계산
const getMaxScrollDistance = async (index: number): Promise<number> => {
  if (typeof window === 'undefined' || !sliderRefs.value[index]) return 0

  // DOM이 완전히 렌더링될 때까지 대기
  await nextTick()

  const container = sliderRefs.value[index].parentElement
  const sliderElement = sliderRefs.value[index]

  if (!container || !sliderElement) return 0

  // 컨테이너 너비 (실제 가시 영역)
  const containerWidth = container.clientWidth

  // 슬라이더 전체 너비 (모든 아이템들의 실제 너비 합계)
  const sliderWidth = sliderElement.scrollWidth

  // 우측 여백 추가
  const rightMargin = rightMarginPx.value

  // 스크롤 가능한 최대 거리 (우측 여백 포함)
  const maxDistance = Math.max(0, sliderWidth - containerWidth + rightMargin)

  return maxDistance
}

// 상태 배열 초기화
const initializeStateArrays = (count: number) => {
  startX.value = Array(count).fill(0)
  currentX.value = Array(count).fill(0)
  isDragging.value = Array(count).fill(false)
  isMouseDragging.value = Array(count).fill(false)
  dragOffsets.value = Array(count).fill(0)
  isTransitioning.value = Array(count).fill(false)
  velocity.value = Array(count).fill(0)
  lastMoveTime.value = Array(count).fill(0)
  lastMoveX.value = Array(count).fill(0)
  hasMoved.value = Array(count).fill(false)
  startTime.value = Array(count).fill(0)
}

// 모든 슬라이더의 최대 스크롤 거리를 다시 계산
const recalculateAllScrollDistances = async () => {
  for (let i = 0; i < sliderCount.value; i++) {
    const maxDistance = await getMaxScrollDistance(i)
    // 현재 오프셋이 새로운 최대값을 초과하면 조정
    if (dragOffsets.value[i] < -maxDistance) {
      dragOffsets.value[i] = -maxDistance
    }
  }
}

// 터치 이벤트 핸들러
const handleTouchStart = (e: TouchEvent, index: number) => {
  startX.value[index] = e.touches[0].clientX
  lastMoveX.value[index] = e.touches[0].clientX
  lastMoveTime.value[index] = Date.now()
  startTime.value[index] = Date.now()
  velocity.value[index] = 0
  isDragging.value[index] = true
  isTransitioning.value[index] = false
  hasMoved.value[index] = false
}

const handleTouchMove = async (e: TouchEvent, index: number) => {
  if (!isDragging.value[index]) return

  currentX.value[index] = e.touches[0].clientX
  const deltaX = currentX.value[index] - startX.value[index]

  if (Math.abs(deltaX) > dragThreshold) {
    hasMoved.value[index] = true
    e.preventDefault()
  }

  if (hasMoved.value[index]) {
    const now = Date.now()
    const moveX = currentX.value[index] - lastMoveX.value[index]
    const deltaTime = now - lastMoveTime.value[index]

    if (deltaTime > 0) {
      velocity.value[index] = moveX / deltaTime
    }

    const maxDistance = await getMaxScrollDistance(index)
    const newOffset = Math.max(-maxDistance - 50, Math.min(50, dragOffsets.value[index] + moveX))
    dragOffsets.value[index] = newOffset

    lastMoveX.value[index] = currentX.value[index]
    lastMoveTime.value[index] = now
  }
}

const handleTouchEnd = async (index: number) => {
  if (!isDragging.value[index]) return

  isDragging.value[index] = false

  if (hasMoved.value[index]) {
    isTransitioning.value[index] = true

    const maxDistance = await getMaxScrollDistance(index)
    let finalOffset = dragOffsets.value[index] + velocity.value[index] * 100

    finalOffset = Math.max(-maxDistance, Math.min(0, finalOffset))
    dragOffsets.value[index] = finalOffset

    setTimeout(() => {
      isTransitioning.value[index] = false
    }, 500)
  }

  hasMoved.value[index] = false
}

// 마우스 이벤트 핸들러
const handleMouseDown = (e: MouseEvent, index: number) => {
  startX.value[index] = e.clientX
  lastMoveX.value[index] = e.clientX
  lastMoveTime.value[index] = Date.now()
  startTime.value[index] = Date.now()
  velocity.value[index] = 0
  isDragging.value[index] = true
  isMouseDragging.value[index] = false
  isTransitioning.value[index] = false
  hasMoved.value[index] = false
}

const handleMouseMove = async (e: MouseEvent, index: number) => {
  if (!isDragging.value[index]) return

  const deltaX = Math.abs(e.clientX - startX.value[index])
  const deltaTime = Date.now() - startTime.value[index]

  if (deltaX > dragThreshold || deltaTime > clickTimeThreshold) {
    isMouseDragging.value[index] = true
    hasMoved.value[index] = true
  }

  if (isMouseDragging.value[index]) {
    currentX.value[index] = e.clientX
    const now = Date.now()
    const mouseDelta = currentX.value[index] - lastMoveX.value[index]
    const moveTime = now - lastMoveTime.value[index]

    if (moveTime > 0) {
      velocity.value[index] = mouseDelta / moveTime
    }

    const maxDistance = await getMaxScrollDistance(index)
    const newOffset = Math.max(-maxDistance - 50, Math.min(50, dragOffsets.value[index] + mouseDelta))
    dragOffsets.value[index] = newOffset

    lastMoveX.value[index] = currentX.value[index]
    lastMoveTime.value[index] = now

    e.preventDefault()
  }
}

const handleMouseUp = async (index: number) => {
  if (!isDragging.value[index]) return

  isDragging.value[index] = false

  if (isMouseDragging.value[index] && hasMoved.value[index]) {
    isTransitioning.value[index] = true

    const maxDistance = await getMaxScrollDistance(index)
    let finalOffset = dragOffsets.value[index] + velocity.value[index] * 200
    finalOffset = Math.max(-maxDistance, Math.min(0, finalOffset))

    dragOffsets.value[index] = finalOffset

    setTimeout(() => {
      isTransitioning.value[index] = false
    }, 500)
  }

  isMouseDragging.value[index] = false
  hasMoved.value[index] = false
}

// 링크 클릭 이벤트 처리
const handleLinkClick = (e: Event, index: number, item: CommunityItem) => {
  if (hasMoved.value[index]) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  // 실제 링크가 있다면 네비게이션 수행
  if (item.link && item.link !== 'javascript:void(0)') {
    // Nuxt 라우터를 사용한 네비게이션
  }

  return true
}

// 윈도우 리사이즈 이벤트
const handleResize = async () => {
  await recalculateAllScrollDistances()
}

// 슬라이더 데이터가 변경될 때 상태 재초기화
const reinitializeSliders = () => {
  const newCount = props.sliders.length
  sliderCount.value = newCount

  // 배열 크기 조정
  initializeStateArrays(newCount)

  // 다음 틱에서 스크롤 거리 재계산
  nextTick(() => {
    recalculateAllScrollDistances()
  })
}

// 라이프사이클
onMounted(() => {
  window.addEventListener('resize', handleResize)
  // 초기 상태 배열 설정
  initializeStateArrays(sliderCount.value)
  // 마운트 후 스크롤 거리 계산
  nextTick(() => {
    recalculateAllScrollDistances()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Props 변경 감지
watch(
  () => props.sliders,
  () => {
    reinitializeSliders()
  },
  { deep: true }
)

// 템플릿에서 사용할 수 있도록 expose
defineExpose({
  handleLinkClick,
  reinitializeSliders,
  recalculateAllScrollDistances
})
</script>

<style lang="scss" scoped>
.main-community-reply {
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem 0;

  .community-reply-swiper-container {
    position: relative;
    overflow: hidden;
    padding-left: 2rem;
    margin: 0 -2rem;
    .community-reply-swiper {
      display: flex;
      gap: 0 0.8rem;
      cursor: grab;
      user-select: none;
      touch-action: pan-y;
      will-change: transform;
      backface-visibility: hidden;

      &:active {
        cursor: grabbing;
      }

      .community-item {
        position: relative;
        flex: 0 0 auto;

        > a {
          padding: 0 2rem;
          display: inline-flex;
          border-radius: 9rem;
          align-items: center;
          gap: 0 0.6rem;
          font-size: 1.6rem;
          line-height: 1;
          height: 5.2rem;
          font-weight: 700;
          background-color: #e3e9f1;
          color: #666;
          white-space: nowrap;
          position: relative;
          @include mixin.rippleEffectPrimary;
        }

        &.blue-type {
          > a {
            background-color: vars.$blue-primary;
            color: vars.$white;
            @include mixin.rippleEffectWhite;
          }
        }

        &.new {
          &::after {
            content: '';
            width: 1rem;
            height: 1rem;
            background: #f14960;
            border-radius: 50%;
            position: absolute;
            right: 0.6rem;
            top: 0rem;
            z-index: 2;
          }
        }

        .icon-wrap {
          width: 2.8rem;
          height: 2.8rem;
          display: inline-block;
          flex: 0 0 2.8rem;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }
}

@media (max-width: 375px) {
  .main-community-reply {
    .community-reply-swiper-container {
      .community-reply-swiper {
        .community-item {
          > a {
            font-size: 1.4rem;
            height: 4.8rem;
            padding: 0 1.6rem;
          }

          .icon-wrap {
            width: 2.4rem;
            height: 2.4rem;
            flex: 0 0 2.4rem;
          }
        }
      }
    }
  }
}
</style>
