<template>
  <div class="health-status">
    <div class="status-tit">
      <strong>AI 건강미션</strong>
      <span class="mission-steps">3 / 7</span>
    </div>
    <div
      class="mission-list"
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
      <div class="item completed">
        <span class="img-wrap">
          <img src="~/assets/images/img-community-01.png" alt="" />
        </span>
        <span class="txt">금연하기</span>
      </div>
      <div class="item completed">
        <span class="img-wrap">
          <img src="~/assets/images/img-community-01.png" alt="" />
        </span>
        <span class="txt">금연하기금</span>
      </div>
      <div class="item current">
        <span class="img-wrap">
          <i class="point-info">포인트 받기</i>
          <img src="~/assets/images/img-community-01.png" alt="" />
        </span>
        <span class="txt">30분스트레칭</span>
      </div>
      <div class="item">
        <span class="img-wrap">
          <img src="~/assets/images/img-community-01.png" alt="" />
        </span>
        <span class="txt">금연하기금연</span>
      </div>
      <div class="item">
        <span class="img-wrap">
          <img src="~/assets/images/img-community-01.png" alt="" />
        </span>
        <span class="txt">금연하기금</span>
      </div>
      <div class="item">
        <span class="img-wrap">
          <img src="~/assets/images/img-community-01.png" alt="" />
        </span>
        <span class="txt">금연하기금연</span>
      </div>
      <div class="item">
        <span class="img-wrap">
          <img src="~/assets/images/img-community-01.png" alt="" />
        </span>
        <span class="txt">금연하기금연</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 스와이프 이벤트 관리
const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const isMouseDragging = ref(false)
const dragOffset = ref(0)
const isTransitioning = ref(false)
const velocity = ref(0) // 속도 추가
const lastMoveTime = ref(0) // 마지막 움직임 시간
const lastMoveX = ref(0) // 마지막 X 위치
const minSwipeDistance = 20 // 최소 스와이프 거리 (더 민감하게)

// 미션 리스트의 최대 스크롤 범위 계산
const getMaxScrollDistance = () => {
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth - 64 : 311 // 패딩 4rem(64px) 제외
  const itemWidth = 64 + 14 // 아이템 크기 + 간격
  const totalItems = 7
  const totalWidth = totalItems * itemWidth - 34 // 마지막 간격 제외

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
  e.preventDefault()
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return

  currentX.value = e.touches[0].clientX
  const now = Date.now()
  const deltaX = currentX.value - lastMoveX.value
  const deltaTime = now - lastMoveTime.value

  // 속도 계산 (부드러운 관성 효과를 위해)
  if (deltaTime > 0) {
    velocity.value = deltaX / deltaTime
  }

  const maxDistance = getMaxScrollDistance()

  // 드래그 오프셋 계산 (더 부드럽게)
  const newOffset = Math.max(-maxDistance - 50, Math.min(50, dragOffset.value + deltaX))
  dragOffset.value = newOffset

  lastMoveX.value = currentX.value
  lastMoveTime.value = now
  e.preventDefault()
}

const handleTouchEnd = () => {
  if (!isDragging.value) return

  isDragging.value = false
  isTransitioning.value = true

  // 관성 스크롤링 계산
  const maxDistance = getMaxScrollDistance()
  let finalOffset = dragOffset.value + velocity.value * 200 // 관성 계수

  // 경계값 제한
  finalOffset = Math.max(-maxDistance, Math.min(0, finalOffset))

  dragOffset.value = finalOffset

  setTimeout(() => {
    isTransitioning.value = false
  }, 500) // 더 긴 애니메이션
}

// 마우스 이벤트 핸들러 (데스크톱 지원)
const handleMouseDown = (e: MouseEvent) => {
  startX.value = e.clientX
  lastMoveX.value = e.clientX
  lastMoveTime.value = Date.now()
  velocity.value = 0
  isDragging.value = true
  isMouseDragging.value = false
  isTransitioning.value = false
  e.preventDefault()
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = Math.abs(e.clientX - startX.value)
  if (deltaX > 3) {
    // 더 민감하게
    isMouseDragging.value = true
  }

  if (isMouseDragging.value) {
    currentX.value = e.clientX
    const now = Date.now()
    const mouseDelta = currentX.value - lastMoveX.value
    const deltaTime = now - lastMoveTime.value

    // 속도 계산
    if (deltaTime > 0) {
      velocity.value = mouseDelta / deltaTime
    }

    const maxDistance = getMaxScrollDistance()
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
  isTransitioning.value = true

  // 관성 스크롤링
  const maxDistance = getMaxScrollDistance()
  let finalOffset = dragOffset.value + velocity.value * 200
  finalOffset = Math.max(-maxDistance, Math.min(0, finalOffset))

  dragOffset.value = finalOffset

  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

// 윈도우 리사이즈 이벤트
const handleResize = () => {
  const maxDistance = getMaxScrollDistance()
  if (dragOffset.value < -maxDistance) {
    dragOffset.value = -maxDistance
  }
}

// 라이프사이클
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.health-status {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  padding-bottom: 2.4rem;
  overflow-x: hidden; // 가로 스크롤 숨김
  .status-tit {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2b2b2b;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .mission-list {
    display: flex;
    flex-direction: row;
    margin-top: 1.4rem;
    gap: 0 1.4rem;
    cursor: grab;
    user-select: none;
    touch-action: pan-y; // 세로 스크롤만 허용
    will-change: transform; // GPU 가속
    backface-visibility: hidden; // 애니메이션 최적화

    &:active {
      cursor: grabbing;
    }
    .item {
      width: 6.4rem;
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
      gap: 0.8rem 0;
      .img-wrap {
        width: 6.4rem;
        height: 6.4rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 2.4rem;
          opacity: 0.6;
          object-fit: cover;
        }
      }
      .txt {
        font-size: 1.3rem;
        font-weight: 500;
        position: relative;
        color: #2b2b2b;
        word-break: break-all;
        text-align: center;
        width: calc(100% + 1.2rem);
      }
      &.completed,
      &.current {
        .img-wrap {
          img {
            opacity: 1;
          }
        }
      }
      &.completed {
        .img-wrap {
          &::before {
            content: '';
            display: block;
            width: 4rem;
            height: 4rem;
            left: -1rem;
            top: -1rem;
            background-size: contain;
            position: absolute;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44' fill='none'%3E%3Cg filter='url(%23filter0_d_14454_1669)'%3E%3Ccircle cx='21' cy='21' r='16' fill='%23FBE200'/%3E%3Ccircle cx='21' cy='21' r='15.5' stroke='%23FDD70F'/%3E%3C/g%3E%3Cpath d='M27 17L18.75 25L15 21.3636' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cdefs%3E%3Cfilter id='filter0_d_14454_1669' x='0' y='0' width='44' height='44' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dx='1' dy='1'/%3E%3CfeGaussianBlur stdDeviation='3'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_14454_1669'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_14454_1669' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E");
          }
        }
      }
      &.current {
        .img-wrap {
          .point-info {
            position: absolute;
            top: -1.2rem;
            width: 7rem;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            font-size: 1.2rem;
            font-weight: 400;
            border-radius: 2rem;
            background-color: #f14960;
            color: vars.$white;
            white-space: nowrap;
            padding: 0.4rem 0.8rem;
            &::before {
              content: '';
              position: absolute;
              width: 1.2rem;
              height: 0.8rem;
              bottom: -0.8rem;
              left: 50%;
              transform: translateX(-50%);
              background-repeat: no-repeat;
              background-position: center;
              background-size: 1.2rem;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cg clip-path='url(%23clip0_14454_8510)'%3E%3Cpath d='M2 -1H10C10.824 -1 11.2944 -0.0592363 10.8 0.6L6.8 5.93333C6.4 6.46667 5.6 6.46667 5.2 5.93333L1.2 0.6C0.705572 -0.0592362 1.17595 -1 2 -1Z' fill='%23F14960'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_14454_8510'%3E%3Crect width='12' height='8' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
            }
          }
        }
      }
    }
  }
}
</style>
