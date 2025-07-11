<template>
  <div class="vitality-status">
    <div class="status-tit">
      <div class="battery-condition">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M23 10V14"
            :stroke="batteryConfig.strokeColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1 16V8C1 6.89543 1.89543 6 3 6H18C19.1046 6 20 6.89543 20 8V16C20 17.1046 19.1046 18 18 18H3C1.89543 18 1 17.1046 1 16Z"
            :stroke="batteryConfig.strokeColor"
            stroke-width="1.5"
          />
          <rect x="3" y="8" :width="batteryConfig.fillWidth" height="8" rx="1" :fill="batteryConfig.fillColor" />
        </svg>

        <strong class="condition-txt" :class="batteryConfig.textClass">{{ batteryConfig.percentage }}%</strong>
      </div>
      <div class="current-time">
        pm 4:15 기준
        <button type="button" class="btn-refresh" aria-label="새로고침버튼"></button>
      </div>
    </div>

    <!-- 스마트링 옵션 -->
    <div
      class="vitality-options"
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
      <div class="item">
        <i class="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M12.8884 23.2009H12.1353L13.7113 20.0088H8.36157L6.55612 23.6658C6.26522 24.255 6.69396 24.9448 7.35103 24.9448H8.6524L8.76366 28.5348C8.77918 29.0349 9.4157 29.2364 9.71613 28.8363L13.3118 24.0482C13.5738 23.6993 13.3249 23.2009 12.8884 23.2009Z"
              fill="#FED402"
            />
            <path
              d="M18.2896 21.9946H24.1584C28.3549 21.9946 31.7567 18.5928 31.7567 14.3964C31.7567 10.1999 28.3549 6.79806 24.1584 6.79806C23.9285 6.79806 23.7011 6.80888 23.4764 6.8289C23.0406 4.26465 21.4167 2.10501 19.1909 0.936523L11.9565 2.93392L10.564 18.1613L18.2896 21.9946Z"
              fill="#6F7B96"
            />
            <path
              d="M13.2178 11.8189C13.2178 7.49985 15.5236 3.61787 19.1909 0.93695C18.0515 0.338801 16.7546 0 15.3784 0C10.8614 0 7.1965 3.64555 7.16392 8.15478C7.16366 8.15478 7.1634 8.15478 7.16315 8.15478C3.34137 8.15478 0.243164 11.2529 0.243164 15.0748C0.243164 18.8966 3.3413 21.9948 7.16315 21.9948H18.2897C15.1501 19.3595 13.2178 15.7725 13.2178 11.8189Z"
              fill="#6F7B96"
            />
            <path
              d="M24.1222 23.3752H23.0138L25.3332 18.667H17.4601L14.803 24.0609C14.3749 24.9299 15.0059 25.9473 15.9728 25.9473H17.888L18.0518 31.2424C18.0745 31.98 19.0113 32.2772 19.4535 31.6871L24.7452 24.6249C25.1309 24.1102 24.7645 23.3752 24.1222 23.3752Z"
              fill="#FED402"
            />
          </svg>
        </i>
        <span class="tit">스트레스</span>
        <strong class="condition-txt">낮음</strong>
      </div>
      <div class="item">
        <i class="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M5.99984 29.3337H25.9998C27.8408 29.3337 29.3332 27.8413 29.3332 26.0003V6.00033C29.3332 4.15938 27.8408 2.66699 25.9998 2.66699H5.99984C4.15889 2.66699 2.6665 4.15938 2.6665 6.00033V26.0003C2.6665 27.8413 4.15889 29.3337 5.99984 29.3337Z"
              fill="#292977"
            />
            <mask
              id="mask0_8072_40617"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="2"
              y="2"
              width="28"
              height="28"
            >
              <path
                d="M5.99984 29.3337H25.9998C27.8408 29.3337 29.3332 27.8413 29.3332 26.0003V6.00032C29.3332 4.15938 27.8408 2.66699 25.9998 2.66699H5.99984C4.15889 2.66699 2.6665 4.15938 2.6665 6.00032V26.0003C2.6665 27.8413 4.15889 29.3337 5.99984 29.3337Z"
                fill="#662DC8"
              />
            </mask>
            <g mask="url(#mask0_8072_40617)">
              <path
                d="M30.6668 13.3322L24.4846 9.33301L19.3081 18.333L14.9944 10.833L8.95518 21.333L1.3335 17.8322"
                stroke="#02FFA6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </i>
        <span class="tit">심박변동</span>
        <strong class="condition-txt">건강</strong>
      </div>

      <div class="item">
        <i class="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M21.2856 5.63794C21.2856 2.52905 18.7566 0 15.6477 0C12.5391 0 10.0098 2.52905 10.0098 5.63794V19.1899C8.71094 20.6045 8 22.4224 8 24.3525C8 28.5693 11.4309 32 15.6477 32C19.8645 32 23.2954 28.5693 23.2954 24.3525C23.2954 22.4224 22.5847 20.6045 21.2856 19.1902V5.63794Z"
              fill="#FFC739"
            />
            <path d="M10.0098 5.85645H12.6365V7.69434H10.0098V5.85645Z" fill="#FFF587" />
            <path d="M10.0098 9.58594H12.6365V11.4241H10.0098V9.58594Z" fill="#FFF587" />
            <path d="M10.0098 13.3154H12.6365V15.1533H10.0098V13.3154Z" fill="#FFF587" />
            <path d="M10.0098 17.043H12.6365V18.8809H10.0098V17.043Z" fill="#FFF587" />
            <path d="M10.0098 5.85645H12.6365V7.69434H10.0098V5.85645Z" fill="#DE9A56" />
            <path d="M10.0098 9.58594H12.6365V11.4241H10.0098V9.58594Z" fill="#DE9A56" />
            <path d="M10.0098 13.3154H12.6365V15.1533H10.0098V13.3154Z" fill="#DE9A56" />
            <path d="M10.0098 17.043H12.6365V18.8809H10.0098V17.043Z" fill="#DE9A56" />
            <path
              d="M16.6132 20.7026V13.4463H14.7341V20.7026C14.101 20.8645 13.5021 21.1919 13.0078 21.6863C11.5378 23.1563 11.5378 25.5481 13.0078 27.0181C13.7199 27.7302 14.6664 28.1223 15.6735 28.1223C16.6806 28.1223 17.6274 27.7302 18.3395 27.0181C19.8095 25.5481 19.8095 23.1565 18.3395 21.6863C17.8452 21.1919 17.2463 20.8645 16.6132 20.7026Z"
              fill="#FF1100"
            />
          </svg>
        </i>
        <span class="tit">체온</span>
        <strong class="condition-txt">정상</strong>
      </div>

      <div class="item">
        <i class="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M21.2856 5.63794C21.2856 2.52905 18.7566 0 15.6477 0C12.5391 0 10.0098 2.52905 10.0098 5.63794V19.1899C8.71094 20.6045 8 22.4224 8 24.3525C8 28.5693 11.4309 32 15.6477 32C19.8645 32 23.2954 28.5693 23.2954 24.3525C23.2954 22.4224 22.5847 20.6045 21.2856 19.1902V5.63794Z"
              fill="#FFC739"
            />
            <path d="M10.0098 5.85645H12.6365V7.69434H10.0098V5.85645Z" fill="#FFF587" />
            <path d="M10.0098 9.58594H12.6365V11.4241H10.0098V9.58594Z" fill="#FFF587" />
            <path d="M10.0098 13.3154H12.6365V15.1533H10.0098V13.3154Z" fill="#FFF587" />
            <path d="M10.0098 17.043H12.6365V18.8809H10.0098V17.043Z" fill="#FFF587" />
            <path d="M10.0098 5.85645H12.6365V7.69434H10.0098V5.85645Z" fill="#DE9A56" />
            <path d="M10.0098 9.58594H12.6365V11.4241H10.0098V9.58594Z" fill="#DE9A56" />
            <path d="M10.0098 13.3154H12.6365V15.1533H10.0098V13.3154Z" fill="#DE9A56" />
            <path d="M10.0098 17.043H12.6365V18.8809H10.0098V17.043Z" fill="#DE9A56" />
            <path
              d="M16.6132 20.7026V13.4463H14.7341V20.7026C14.101 20.8645 13.5021 21.1919 13.0078 21.6863C11.5378 23.1563 11.5378 25.5481 13.0078 27.0181C13.7199 27.7302 14.6664 28.1223 15.6735 28.1223C16.6806 28.1223 17.6274 27.7302 18.3395 27.0181C19.8095 25.5481 19.8095 23.1565 18.3395 21.6863C17.8452 21.1919 17.2463 20.8645 16.6132 20.7026Z"
              fill="#FF1100"
            />
          </svg>
        </i>
        <span class="tit">산소분포도</span>
        <strong class="condition-txt">경고</strong>
      </div>
      <div class="item">
        <i class="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M21.2856 5.63794C21.2856 2.52905 18.7566 0 15.6477 0C12.5391 0 10.0098 2.52905 10.0098 5.63794V19.1899C8.71094 20.6045 8 22.4224 8 24.3525C8 28.5693 11.4309 32 15.6477 32C19.8645 32 23.2954 28.5693 23.2954 24.3525C23.2954 22.4224 22.5847 20.6045 21.2856 19.1902V5.63794Z"
              fill="#FFC739"
            />
            <path d="M10.0098 5.85645H12.6365V7.69434H10.0098V5.85645Z" fill="#FFF587" />
            <path d="M10.0098 9.58594H12.6365V11.4241H10.0098V9.58594Z" fill="#FFF587" />
            <path d="M10.0098 13.3154H12.6365V15.1533H10.0098V13.3154Z" fill="#FFF587" />
            <path d="M10.0098 17.043H12.6365V18.8809H10.0098V17.043Z" fill="#FFF587" />
            <path d="M10.0098 5.85645H12.6365V7.69434H10.0098V5.85645Z" fill="#DE9A56" />
            <path d="M10.0098 9.58594H12.6365V11.4241H10.0098V9.58594Z" fill="#DE9A56" />
            <path d="M10.0098 13.3154H12.6365V15.1533H10.0098V13.3154Z" fill="#DE9A56" />
            <path d="M10.0098 17.043H12.6365V18.8809H10.0098V17.043Z" fill="#DE9A56" />
            <path
              d="M16.6132 20.7026V13.4463H14.7341V20.7026C14.101 20.8645 13.5021 21.1919 13.0078 21.6863C11.5378 23.1563 11.5378 25.5481 13.0078 27.0181C13.7199 27.7302 14.6664 28.1223 15.6735 28.1223C16.6806 28.1223 17.6274 27.7302 18.3395 27.0181C19.8095 25.5481 19.8095 23.1565 18.3395 21.6863C17.8452 21.1919 17.2463 20.8645 16.6132 20.7026Z"
              fill="#FF1100"
            />
          </svg>
        </i>
        <span class="tit">수면</span>
        <strong class="condition-txt">매우나쁨</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
interface Props {
  batteryLevel?: number
  conditionText?: string
}

const props = withDefaults(defineProps<Props>(), {
  batteryLevel: 20,
  conditionText: 'excellent'
})

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

// vitality-options의 최대 스크롤 범위 계산
const getMaxScrollDistance = () => {
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth - 64 : 311 // 패딩 4rem(64px) 제외
  const itemWidth = 108 + 8 // 아이템 크기(10.8rem = 108px) + 간격(0.8rem = 8px)
  const totalItems = 5 // vitality-options 아이템 개수
  const totalWidth = totalItems * itemWidth - 28 // 마지막 간격 제외

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
  let finalOffset = dragOffset.value + velocity.value * 100 // 관성 계수

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

// 배터리 상태 설정
const batteryConfig = computed(() => {
  const level = props.batteryLevel
  const condition = props.conditionText.toLowerCase()

  // 배터리 레벨에 따른 너비 계산 (최대 15)
  const fillWidth = Math.max(0, Math.min(15, (level / 100) * 15))

  // 조건에 따른 색상 및 클래스 설정
  let fillColor = '#2B2B2B'
  let strokeColor = '#2B2B2B'
  let textClass = ''

  // 20% 밑으로 내려가면 배터리 색상 변경
  if (condition.includes('critical') || level <= 20) {
    fillColor = '#FF4444'
    strokeColor = '#FF4444'
    textClass = 'critical'
  } else {
    fillColor = '#2B2B2B'
    strokeColor = '#2B2B2B'
    textClass = ''
  }

  return {
    fillWidth,
    fillColor,
    strokeColor,
    textClass,
    percentage: level
  }
})

// 라이프사이클
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.vitality-status {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 0 2rem 3.2rem;
  overflow-x: hidden; // 가로 스크롤 숨김
  .status-tit {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .battery-condition {
      display: flex;
      align-items: center;
      gap: 0 0.4rem;
      strong {
        font-size: 1.3rem;
        font-weight: 700;
        color: #2b2b2b;
        // 배터리 텍스트 색상
        // &.critical {
        //   color: #ff4444;
        // }
      }
    }
  }
  .current-time {
    display: flex;
    flex-direction: row;
    gap: 0 0.4rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: #555;
    align-items: center;
    .btn-refresh {
      width: 2.4rem;
      height: 2.4rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M19.4221 8.01389C18.0322 5.61438 15.4343 4 12.4588 4C9.08513 4 6.19686 6.07535 5.00433 9.01736M16.9806 9.01736H21V5.00347M5.57787 16.0417C6.96782 18.4412 9.56573 20.0556 12.5412 20.0556C15.9149 20.0556 18.8031 17.9802 19.9957 15.0382M8.0194 15.0382H4V19.0521' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      transition: 0.3s transform cubic-bezier(0.075, 0.82, 0.165, 1);
      &:active {
        transform: rotate(360deg) scale(0.8);
      }
    }
  }

  .vitality-options {
    display: flex;
    flex-direction: row;
    margin-top: 1.2rem;
    gap: 0 0.8rem;
    cursor: grab;
    // user-select: none;
    touch-action: pan-y; // 세로 스크롤만 허용
    will-change: transform; // GPU 가속
    backface-visibility: hidden; // 애니메이션 최적화

    &:active {
      cursor: grabbing;
    }

    .item {
      width: 10.8rem;
      height: 12rem;
      border-radius: 1.6rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.4);
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
      backdrop-filter: blur(10px);
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.6rem 1rem;

      .option-icon {
        display: block;
        width: 3.2rem;
        height: 3.2rem;
        margin-bottom: 0.5rem;
      }

      .tit {
        font-size: 1.4rem;
        font-weight: 500;
        color: #2b2b2b;
        text-align: center;
      }

      .condition-txt {
        font-size: 1.8rem;
        margin-top: 0.2rem;
        font-weight: 700;
        color: #2b2b2b;
        text-align: center;
      }
    }
  }
}
</style>
