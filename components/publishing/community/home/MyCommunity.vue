<template>
  <div class="main-community">
    <div
      class="main-community-container"
      ref="containerRef"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
      :style="{
        transform: `translateX(${dragOffset}px)`,
        transition: isTransitioning
          ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          : isDragging
            ? 'none'
            : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }"
    >
      <MyCommunityCard
        v-for="(item, index) in communityItems"
        :key="item.id || index"
        v-bind="item"
        @click="item.id ? handleCardClick(item.id) : undefined"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import MyCommunityCard from '~/components/publishing/community/home/MyCommunityCard.vue'

// Props 정의
interface CommunityItem {
  id?: string | number
  text?: string
  src?: string
}

interface Props {
  items?: CommunityItem[]
  cardWidth?: number // rem 단위
  cardGap?: number // rem 단위
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [
    { id: 1, text: '전체', src: '/community/home/ico-community-all.svg' },
    { id: 2, text: '걷기왕', src: '/community/home/ico-community-all.svg', isNew: true },
    { id: 3, text: '스마트링', src: '/community/home/ico-community-all.svg' },
    { id: 4, text: '청구의신', src: '/community/home/ico-community-all.svg', isNew: true },
    { id: 5, text: '레몬건강지수', src: '/community/home/ico-community-all.svg' },
    { id: 6, text: '건강/운동', src: '/community/home/ico-community-all.svg' },
    { id: 7, text: '체중관리', src: '/community/home/ico-community-all.svg' },
    { id: 8, text: '식단', src: '/community/home/ico-community-all.svg' },
    { id: 9, text: '마음건강', src: '/community/home/ico-community-all.svg' }
  ],
  cardWidth: 20, // 20rem
  cardGap: 1.2 // 1.2rem
})

// 동적 데이터
const communityItems = computed(() => props.items)
const containerRef = ref<HTMLElement>()

// 이벤트 정의
const emit = defineEmits<{
  cardClick: [item: CommunityItem]
}>()

// 스와이프 이벤트 관리
const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const isMouseDragging = ref(false)
const dragOffset = ref(0)
const isTransitioning = ref(false)
const velocity = ref(0)
const lastMoveTime = ref(0)
const lastMoveX = ref(0)
const hasMoved = ref(false) // 실제로 움직였는지 체크
const minSwipeDistance = 20

// 동적으로 최대 스크롤 범위 계산
const getMaxScrollDistance = () => {
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth - 64 : 311 // 패딩 제외
  const itemWidth = props.cardWidth * 12 + props.cardGap * 12 // rem을 px로 변환 (1rem = 10px 가정)
  const totalItems = communityItems.value.length
  const totalWidth = totalItems * itemWidth - props.cardGap * 0 // 마지막 간격 제외

  return Math.max(0, totalWidth - containerWidth)
}

// 실제 DOM 기반으로 정확한 스크롤 범위 계산
const getActualMaxScrollDistance = () => {
  if (!containerRef.value) return 0

  const container = containerRef.value.parentElement
  const containerElement = containerRef.value

  if (!container) return 0

  const containerWidth = container.clientWidth
  const totalWidth = containerElement.scrollWidth + 20 // 마지막 아이템 뒤 20px 여백 추가

  return Math.max(0, totalWidth - containerWidth)
}

// 터치 이벤트 핸들러
const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX
  lastMoveX.value = e.touches[0].clientX
  lastMoveTime.value = Date.now()
  velocity.value = 0
  isDragging.value = true
  isTransitioning.value = false
  hasMoved.value = false

  // 카드 클릭을 위해 preventDefault 하지 않음
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return

  currentX.value = e.touches[0].clientX
  const deltaX = currentX.value - lastMoveX.value

  // 일정 거리 이상 움직였을 때만 스와이프로 판정
  if (Math.abs(currentX.value - startX.value) > 10) {
    hasMoved.value = true
    e.preventDefault() // 스와이프 시에만 기본 동작 차단

    const now = Date.now()
    const deltaTime = now - lastMoveTime.value

    if (deltaTime > 0) {
      velocity.value = deltaX / deltaTime
    }

    const maxDistance = getActualMaxScrollDistance()
    const newOffset = Math.max(-maxDistance - 50, Math.min(50, dragOffset.value + deltaX))
    dragOffset.value = newOffset

    lastMoveX.value = currentX.value
    lastMoveTime.value = now
  }
}

const handleTouchEnd = () => {
  if (!isDragging.value) return

  isDragging.value = false

  if (hasMoved.value) {
    isTransitioning.value = true

    const maxDistance = getActualMaxScrollDistance()
    let finalOffset = dragOffset.value + velocity.value * 100

    finalOffset = Math.max(-maxDistance, Math.min(0, finalOffset))
    dragOffset.value = finalOffset

    setTimeout(() => {
      isTransitioning.value = false
    }, 500)
  }
}

// 마우스 이벤트 핸들러
const handleMouseDown = (e: MouseEvent) => {
  startX.value = e.clientX
  lastMoveX.value = e.clientX
  lastMoveTime.value = Date.now()
  velocity.value = 0
  isDragging.value = true
  isMouseDragging.value = false
  isTransitioning.value = false
  hasMoved.value = false
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = Math.abs(e.clientX - startX.value)
  if (deltaX > 5) {
    isMouseDragging.value = true
    hasMoved.value = true
  }

  if (isMouseDragging.value) {
    currentX.value = e.clientX
    const now = Date.now()
    const mouseDelta = currentX.value - lastMoveX.value
    const deltaTime = now - lastMoveTime.value

    if (deltaTime > 0) {
      velocity.value = mouseDelta / deltaTime
    }

    const maxDistance = getActualMaxScrollDistance()
    const newOffset = Math.max(-maxDistance - 50, Math.min(50, dragOffset.value + mouseDelta))
    dragOffset.value = newOffset

    lastMoveX.value = currentX.value
    lastMoveTime.value = now
  }

  e.preventDefault()
}

const handleMouseUp = () => {
  if (!isDragging.value) return

  isDragging.value = false
  isMouseDragging.value = false

  if (hasMoved.value) {
    isTransitioning.value = true

    const maxDistance = getActualMaxScrollDistance()
    let finalOffset = dragOffset.value + velocity.value * 200
    finalOffset = Math.max(-maxDistance, Math.min(0, finalOffset))

    dragOffset.value = finalOffset

    setTimeout(() => {
      isTransitioning.value = false
    }, 500)
  }
}

// 카드 클릭 핸들러
const handleCardClick = (id: string | number) => {
  // 스와이프 중이 아닐 때만 클릭 이벤트 처리
  if (!hasMoved.value) {
    const item = communityItems.value.find(item => item.id === id)
    if (item) {
      console.log('카드 클릭됨:', item)
      emit('cardClick', item)
    }
  }
}

// 윈도우 리사이즈 및 아이템 변경 시 오프셋 재조정
const handleResize = () => {
  nextTick(() => {
    const maxDistance = getActualMaxScrollDistance()
    if (dragOffset.value < -maxDistance) {
      dragOffset.value = -maxDistance
    }
  })
}

// 아이템이 변경될 때 오프셋 재조정
watch(
  () => communityItems.value.length,
  () => {
    nextTick(() => {
      const maxDistance = getActualMaxScrollDistance()
      if (dragOffset.value < -maxDistance) {
        dragOffset.value = Math.max(-maxDistance, 0)
      }
    })
  }
)

// 외부에서 사용할 수 있는 메서드들
const scrollToIndex = (index: number) => {
  if (index < 0 || index >= communityItems.value.length) return

  const itemWidth = props.cardWidth * 12 + props.cardGap * 12
  const targetOffset = -(index * itemWidth)
  const maxDistance = getActualMaxScrollDistance()

  dragOffset.value = Math.max(-maxDistance, Math.min(0, targetOffset))
}

const scrollToStart = () => {
  dragOffset.value = 0
}

const scrollToEnd = () => {
  const maxDistance = getActualMaxScrollDistance()
  dragOffset.value = -maxDistance
}

// 라이프사이클
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 외부에서 접근 가능하도록 expose
defineExpose({
  scrollToIndex,
  scrollToStart,
  scrollToEnd,
  currentOffset: dragOffset
})
</script>

<style lang="scss" scoped>
.main-community {
  overflow-x: hidden; // 가로 스크롤 숨김
  margin: 0 -2rem;
  margin-top: 1.2rem;

  .main-community-container {
    display: flex;
    gap: 0 1.6rem;
    cursor: grab;
    user-select: none;
    touch-action: pan-y; // 세로 스크롤만 허용
    will-change: transform; // GPU 가속
    backface-visibility: hidden; // 애니메이션 최적화
    padding: 0 2rem;
    padding-right: 4rem; // 마지막 아이템 뒤 20px 여백

    &:active {
      cursor: grabbing;
    }

    // MainCommunityCard가 flex-shrink되지 않도록 설정
    :deep(.commnuity-card) {
      flex: 0 0 auto;

      .card-link {
        width: 20rem; // 고정 폭 유지
      }
    }
  }
}
.commnuity-card {
  .card-link {
    position: relative;
  }
}
@media (max-width: 375px) {
}

.commnuity-card {
  .card-link {
    border-radius: 2rem;
    width: 20rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 0.1rem solid #edeff2;
    background: var(--grayscale-white-fff, #fff);
    box-shadow: 0.4rem 0.4rem 2.3rem 0 rgba(0, 0, 0, 0.06);
    position: relative;
    cursor: pointer;
    @include mixin.rippleEffectPrimary;

    .img-wrap {
      width: 100%;
      height: 12.8rem;
      display: block;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    .community-contents {
      display: flex;
      flex-direction: column;
      padding: 1.6rem;
      gap: 0.2rem 0;

      .cate-txt {
        font-size: 1.2rem;
        color: #777;
      }

      .tit {
        color: #222;
        font-weight: 700;
        font-size: 1.6rem;
        min-height: 4.5rem;
        line-height: 1.4;

        // 2줄 말줄임 처리
        @include mixin.multi-ellipsis(2);
      }
    }

    .sub-txt {
      padding: 0 1.6rem 2rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: #007bff;

      // 1줄 말줄임 처리
      @include mixin.ellipsis;
    }
  }
}

@media (max-width: 375px) {
  .commnuity-card {
    .card-link {
      width: 18rem;
    }
  }
}
</style>
