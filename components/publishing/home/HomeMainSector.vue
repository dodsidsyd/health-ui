<template>
  <div class="main-sector">
    <MainTopGraph
      :current-status="currentStatus"
      :is-profile-set="healthCondition !== 'noProfileSet'"
      :is-smart-ring-connect="vitalityCondition !== 'noSmartRingConnect'"
    />
    <section
      class="main-section"
      :class="[
        currentStatus,
        {
          dragging: isDragging,
          'health-good': currentStatus === 'health-status' && healthCondition === 'good',
          'health-careful': currentStatus === 'health-status' && healthCondition === 'careful',
          'health-warning': currentStatus === 'health-status' && healthCondition === 'warning',
          'health-no-profile': currentStatus === 'health-status' && healthCondition === 'noProfileSet',
          'vitality-good': currentStatus === 'vitality-status' && vitalityCondition === 'good',
          'vitality-careful': currentStatus === 'vitality-status' && vitalityCondition === 'careful',
          'vitality-warning': currentStatus === 'vitality-status' && vitalityCondition === 'warning',
          'vitality-no-ring': currentStatus === 'vitality-status' && vitalityCondition === 'noSmartRingConnect'
        }
      ]"
    >
      <div
        class="swipe-animation"
        aria-hidden="true"
        :style="{
          transform: `translateX(${dragOffset}px)`,
          transition: isTransitioning
            ? 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease'
            : 'none',
          opacity: isDragging
            ? Math.max(
                0.7,
                1 - Math.abs(dragOffset) / (typeof window !== 'undefined' ? window.innerWidth * 0.5 : 187.5)
              )
            : 1
        }"
      ></div>
      <div
        class="charactor"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
      >
        <span class="charctor-txt" v-html="characterText"></span>
        <LottieAnimation
          :src="animationSrc"
          width="100%"
          height="100%"
          :speed="1.2"
          :loop="true"
          aria-label="건강의 신 케릭터 이미지"
        />
        <i class="charactor-shadow" aria-hidden="true"></i>

        <div class="charctor-option" v-if="currentStatus === 'walking-status'">
          <button type="button" class="cbtn btn-white">걷기통계</button>
          <button type="button" class="cbtn btn-white">친구랭킹</button>
        </div>

        <div class="charctor-option" v-if="currentStatus === 'health-status'">
          <button type="button" v-if="healthCondition !== 'noProfileSet'" class="cbtn btn-white">자세히보기</button>
          <div class="info-text" v-if="healthCondition === 'noProfileSet'">
            건강 프로필 정보 AI분석을 통해<br />
            레몬건강지수가 산정됩니다.
          </div>
        </div>

        <div class="charctor-option" v-if="currentStatus === 'vitality-status'">
          <button type="button" v-if="vitalityCondition !== 'noSmartRingConnect'" class="cbtn btn-white">
            자세히보기
          </button>
          <div class="info-text" v-if="vitalityCondition === 'noSmartRingConnect'">
            생체데이터를 종합적으로 분석하여<br />
            Aura Vival Score를 제공합니다.
          </div>
        </div>
      </div>
      <!-- 걸음영역 - walking-status일 때만 표시 -->
      <WalkingStatus v-if="currentStatus === 'walking-status'" />
      <!-- 건강영역 - health-status일 때만 표시 -->
      <HealthStatus v-if="currentStatus === 'health-status' && healthCondition !== 'noProfileSet'" />
      <!-- 활력영역 - vitality-status일 때만 표시 -->
      <VitalityStatus v-if="currentStatus === 'vitality-status' && vitalityCondition !== 'noSmartRingConnect'" />

      <!-- 건강 상태 프로필 없을 때 배너 -->
      <div class="banner-box health" v-if="currentStatus === 'health-status' && healthCondition === 'noProfileSet'">
        <nuxt-link to="javascript:void(0)" class="box-content">
          <strong
            >내 건강 프로필 맞춤 AI 건강미션 매일 완료하고 포인트 받으세요!
            <span class="arrow-txt">건강프로필 작성하기</span>
          </strong>
          <img src="~/assets/images/home/img-gift.svg" alt="" />
        </nuxt-link>
      </div>

      <!-- 활력 상태 스마트링 없을 때 배너 -->
      <div class="banner-box" v-if="currentStatus === 'vitality-status' && vitalityCondition === 'noSmartRingConnect'">
        <nuxt-link to="javascript:void(0)" class="box-content">
          <strong class="blue-txt"
            >실시간 건강데이터 모니터링으로 구체적인 목표를 제시합니다.<span class="arrow-txt"
              >레몬스마트링 알아보기</span
            ></strong
          >
          <img src="~/assets/images/home/img-ring.svg" alt="" />
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import MainTopGraph from '~/components/publishing/home/MainTopGraph.vue'

import WalkingStatus from '~/components/publishing/home/WalkingStatus.vue'
import HealthStatus from '~/components/publishing/home/HealthStatus.vue'
import VitalityStatus from '~/components/publishing/home/VitalityStatus.vue'

// 상태 관리
const statusList = ['walking-status', 'vitality-status', 'health-status']
const currentIndex = ref(0)
const currentStatus = ref(statusList[0])

// 애니메이션 소스 맵핑
const animationMap = {
  'walking-status': '/animations/character/walk.json',
  'vitality-status': '/animations/character/default.json',
  'health-status': '/animations/character/cry.json'
}

// 캐릭터 텍스트 맵핑
const textMap = {
  'walking-status': '다음미션까지 <br />1240 걸음',
  'vitality-status': '가볍게 스트레칭 <br />해보세요',
  'health-status': '건강에 주의해야해요!!'
}

// 현재 상태에 따른 애니메이션 소스
const animationSrc = computed(() => {
  if (currentStatus.value === 'health-status') {
    switch (healthCondition.value) {
      case 'good':
        return '/animations/character/happy.json'
      case 'careful':
        return '/animations/character/worry.json'
      case 'warning':
        return '/animations/character/cry.json'
      case 'noProfileSet':
        return '/animations/character/default.json'
      default:
        return '/animations/character/default.json'
    }
  } else if (currentStatus.value === 'vitality-status') {
    switch (vitalityCondition.value) {
      case 'good':
        return '/animations/character/happy.json'
      case 'careful':
        return '/animations/character/worry.json'
      case 'warning':
        return '/animations/character/cry.json'
      case 'noSmartRingConnect':
        return '/animations/character/default.json'
      default:
        return '/animations/character/default.json'
    }
  } else {
    return animationMap[currentStatus.value] || '/animations/character/walk.json'
  }
})

// 현재 상태에 따른 캐릭터 텍스트
const characterText = computed(() => {
  if (currentStatus.value === 'health-status') {
    switch (healthCondition.value) {
      case 'good':
        return '지금 잘 하고 있어요!'
      case 'careful':
        return '건강에 조금 더 신경써주세요!'
      case 'warning':
        return '건강에 주의해야해요!!'
      case 'noProfileSet':
        return '건강프로필을 <br />작성해주세요!'
      default:
        return '건강프로필을 <br />작성해주세요!'
    }
  } else if (currentStatus.value === 'vitality-status') {
    switch (vitalityCondition.value) {
      case 'good':
        return '활력지수 좋음'
      case 'careful':
        return '가볍게 스트레칭 <br />해보세요'
      case 'warning':
        return '활력지수 나쁨'
      case 'noSmartRingConnect':
        return '레몬스마트링을 <br />연결해보세요'
      default:
        return '레몬스마트링을 <br />연결해보세요'
    }
  } else {
    // walking-status
    return textMap[currentStatus.value] || '다음미션까지 <br />1240 걸음'
  }
})

// 터치/마우스 이벤트 관리
const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const isMouseDragging = ref(false) // 마우스 드래그 상태 추가
const minSwipeDistance = 50 // 최소 스와이프 거리
const dragOffset = ref(0) // 드래그 오프셋
const isTransitioning = ref(false) // 전환 중 상태

// 조건부 상태 전역 상태 관리
// health 상태: 'good', 'careful', 'warning', 'noProfileSet'
// vitality 상태: 'good', 'careful', 'warning', 'noSmartRingConnect'
const vitalityCondition = ref('noSmartRingConnect') // 기본값을 noSmartRingConnect로 설정
const healthCondition = ref('noProfileSet') // 기본값을 noProfileSet로 설정

// 터치 이벤트 핸들러
const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX
  isDragging.value = true

  // 기본 스와이프 동작 방지
  e.preventDefault()
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  currentX.value = e.touches[0].clientX

  // 드래그 오프셋 계산 (화면 너비의 30%로 제한)
  const deltaX = currentX.value - startX.value
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375 // 기본값 설정
  const maxOffset = screenWidth * 0.3
  dragOffset.value = Math.max(-maxOffset, Math.min(maxOffset, deltaX))

  // 기본 스와이프 동작 방지
  e.preventDefault()
}

const handleTouchEnd = () => {
  if (!isDragging.value) return

  const deltaX = currentX.value - startX.value
  isTransitioning.value = true

  if (Math.abs(deltaX) > minSwipeDistance) {
    if (deltaX > 0) {
      // 오른쪽 스와이프 - 이전 상태
      goToPrevious()
    } else {
      // 왼쪽 스와이프 - 다음 상태
      goToNext()
    }
  } else {
    // 스와이프 거리가 부족하면 원래 위치로 복귀
    dragOffset.value = 0
    setTimeout(() => {
      isTransitioning.value = false
    }, 300)
  }

  isDragging.value = false
}

// 마우스 이벤트 핸들러 (데스크톱 지원)
const handleMouseDown = (e: MouseEvent) => {
  startX.value = e.clientX
  currentX.value = e.clientX // 초기값 설정
  isDragging.value = true
  isMouseDragging.value = false // 실제 드래그 여부 초기화
  e.preventDefault()
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = Math.abs(e.clientX - startX.value)
  if (deltaX > 10) {
    // 10px 이상 움직이면 실제 드래그로 간주
    isMouseDragging.value = true
  }

  currentX.value = e.clientX

  // 마우스 드래그 오프셋 계산
  if (isMouseDragging.value) {
    const dragDelta = currentX.value - startX.value
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375 // 기본값 설정
    const maxOffset = screenWidth * 0.3
    dragOffset.value = Math.max(-maxOffset, Math.min(maxOffset, dragDelta))
  }

  e.preventDefault()
}

const handleMouseUp = () => {
  if (!isDragging.value) return

  isTransitioning.value = true

  // 실제로 드래그한 경우에만 스와이프 로직 실행
  if (isMouseDragging.value) {
    const deltaX = currentX.value - startX.value

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // 오른쪽 드래그 - 이전 상태
        goToPrevious()
      } else {
        // 왼쪽 드래그 - 다음 상태
        goToNext()
      }
    } else {
      // 스와이프 거리가 부족하면 원래 위치로 복귀
      dragOffset.value = 0
      setTimeout(() => {
        isTransitioning.value = false
      }, 300)
    }
  } else {
    // 드래그하지 않았다면 전환 상태 해제
    isTransitioning.value = false
  }

  isDragging.value = false
  isMouseDragging.value = false
}

// 상태 변경 함수
const goToNext = () => {
  const oldStatus = currentStatus.value
  currentIndex.value = (currentIndex.value + 1) % statusList.length
  currentStatus.value = statusList[currentIndex.value]

  // 애니메이션 처리
  dragOffset.value = 0
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
}

const goToPrevious = () => {
  const oldStatus = currentStatus.value
  currentIndex.value = (currentIndex.value - 1 + statusList.length) % statusList.length
  currentStatus.value = statusList[currentIndex.value]

  // 애니메이션 처리
  dragOffset.value = 0
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
}

// 조건 상태 변경 함수(건강)
const setHealthCondition = (condition: 'good' | 'careful' | 'warning' | 'noProfileSet') => {
  healthCondition.value = condition
}
// 조건 상태 변경 함수(활력)
const setVitalityCondition = (condition: 'good' | 'careful' | 'warning' | 'noSmartRingConnect') => {
  vitalityCondition.value = condition
}

// 외부에서 사용할 수 있도록 export
defineExpose({
  setHealthCondition,
  setVitalityCondition,
  healthCondition,
  vitalityCondition
})

// 라이프사이클
onMounted(() => {
  // Edge 브라우저 오버스크롤 방지를 위한 전역 스타일 적용
  document.body.style.overscrollBehaviorX = 'none'
  document.documentElement.style.overscrollBehaviorX = 'none'

  // iOS Safari 바운스 효과 방지
  document.body.style.webkitOverflowScrolling = 'auto'
  document.documentElement.style.webkitOverflowScrolling = 'auto'

  // 터치 동작 제어 (모든 브라우저)
  document.body.style.touchAction = 'pan-y pinch-zoom'

  // iOS에서 메타 브이포트 추가 설정
  const viewport = document.querySelector('meta[name="viewport"]')
  if (viewport && /iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)) {
    const currentContent = viewport.getAttribute('content') || ''
    if (!currentContent.includes('user-scalable=no')) {
      viewport.setAttribute('content', currentContent + ', user-scalable=no')
    }
  }
})

onUnmounted(() => {
  // 정리 시 스타일 복원
  document.body.style.overscrollBehaviorX = ''
  document.documentElement.style.overscrollBehaviorX = ''
  document.body.style.webkitOverflowScrolling = ''
  document.documentElement.style.webkitOverflowScrolling = ''
  document.body.style.touchAction = ''
})
</script>

<style scoped lang="scss">
.main-sector {
  height: 58.7rem;
  margin: -5.6rem -2rem 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('~/assets/images/home/bg-main-sector.png');

  // Edge 브라우저 스와이프 바운스 효과 방지
  overscroll-behavior-x: none;
  -ms-scroll-chaining: none;
  -ms-overflow-style: none;

  // iOS Safari 바운스 효과 방지
  -webkit-overflow-scrolling: auto;
  overflow-scrolling: auto;

  .main-section {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    position: relative;
    transition: background 0.3s ease-in-out;
    user-select: none;
    will-change: transform, opacity; // GPU 가속 최적화

    // 드래그 중일 때 스케일 효과
    &.dragging {
      transform-origin: center;
    }

    // 터치 및 스크롤 동작 제어
    touch-action: pan-y pinch-zoom;
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;
    .swipe-animation {
      display: block;
      bottom: 0;
      position: absolute;
      left: -10%;
      top: 0;
      right: -10%;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
      transition: background 0.3s 0.3s ease-in-out;
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        background: transparent;
      }
    }
    &.walking-status {
      // background-color: transparent;
      background: linear-gradient(to bottom, rgba(175, 226, 217, 0) 0%, rgba(175, 226, 217, 0) 50%, #afe2d9 100%);
      .swipe-animation {
        background: linear-gradient(180deg, #76cdff 0%, rgba(118, 205, 255, 0) 30%);
      }
    }

    &.vitality-status {
      background-color: #f2dd92;
      .swipe-animation {
        background: linear-gradient(180deg, #ffe057 0%, rgba(255, 196, 87, 0) 100%);
      }
    }

    &.health-status {
      background-color: #56e2c1;
      .swipe-animation {
        background: linear-gradient(180deg, rgba(0, 125, 134, 0.2) 0%, rgba(0, 125, 134, 0) 100%);
      }
      &.health-careful {
        background-color: #a9a0fd;
        .swipe-animation {
          background: linear-gradient(180deg, rgba(60, 0, 134, 0.2) 0%, rgba(60, 0, 134, 0) 100%);
        }
      }
      &.health-warning {
        background-color: #ff8e75;
        .swipe-animation {
          background: linear-gradient(180deg, rgba(188, 11, 11, 0.2) 0%, rgba(188, 11, 11, 0) 100%);
        }
      }
    }

    &.vitality-no-ring,
    &.health-no-profile {
      background-color: #dadee7;
      .swipe-animation {
        background: #dadee7;
      }
    }

    .charactor {
      width: 100%;
      height: 20rem;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -2rem;
      transform: translate(-50%, -50%);
      cursor: grab; // 스와이프 가능 영역 표시
      user-select: none;
      touch-action: pan-x; // 가로 스와이프만 허용
      z-index: 10; // 다른 요소보다 위에 배치
      background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%);
      .charactor-shadow {
        position: absolute;
        bottom: 3rem;
        left: 50%;
        transform: translateX(-50%);
        width: 7rem;
        border-radius: 50%;
        height: 1rem;
        filter: blur(2px);
        background: radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
      }
      &::before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        width: 3.2rem;
        height: 3.2rem;
        top: 50%;
        background-size: 2.4rem;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='21' viewBox='0 0 25 21' fill='none'%3E%3C!-- 왼쪽 화살표 --%3E%3Cpath d='M0.506498 11.3207L9.07083 19.7512C9.23007 19.9093 9.41951 20.0347 9.62824 20.1203C9.83697 20.2059 10.0608 20.25 10.287 20.25C10.5131 20.25 10.737 20.2059 10.9457 20.1203C11.1544 20.0347 11.3439 19.9093 11.5031 19.7512C11.6636 19.5945 11.7911 19.408 11.878 19.2026C11.965 18.9971 12.0098 18.7767 12.0098 18.5541C12.0098 18.3315 11.965 18.1111 11.878 17.9057C11.7911 17.7002 11.6636 17.5137 11.5031 17.357L4.13778 10.1236L11.5031 2.89015C11.6628 2.73294 11.7895 2.5463 11.8759 2.3409C11.9624 2.13549 12.0068 1.91534 12.0068 1.69301C12.0068 1.24399 11.8256 0.813371 11.5031 0.49587C11.1806 0.178369 10.7431 0 10.287 0C10.0611 0 9.83747 0.0437899 9.6288 0.128872C9.42014 0.213953 9.23054 0.33866 9.07083 0.49587L0.506498 8.92642C0.345954 9.08317 0.218523 9.26965 0.131563 9.47512C0.0446033 9.68059 -0.000165939 9.90097 -0.000165939 10.1236C-0.000165939 10.3461 0.0446033 10.5665 0.131563 10.772C0.218523 10.9775 0.345954 11.164 0.506498 11.3207Z' fill='white'%3E%3Canimate attributeName='fill-opacity' values='1;0.3;1' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'/%3E%3C/path%3E%3C!-- 오른쪽 화살표 --%3E%3Cpath d='M12.507 11.3207L21.0713 19.7512C21.2306 19.9093 21.42 20.0347 21.6287 20.1203C21.8375 20.2059 22.0613 20.25 22.2875 20.25C22.5136 20.25 22.7375 20.2059 22.9462 20.1203C23.1549 20.0347 23.3444 19.9093 23.5036 19.7512C23.6641 19.5945 23.7916 19.408 23.8785 19.2026C23.9655 18.9971 24.0103 18.7767 24.0103 18.5541C24.0103 18.3315 23.9655 18.1111 23.8785 17.9057C23.7916 17.7002 23.6641 17.5137 23.5036 17.357L16.1383 10.1236L23.5036 2.89015C23.6633 2.73294 23.79 2.5463 23.8764 2.3409C23.9628 2.13549 24.0073 1.91534 24.0073 1.69301C24.0073 1.24399 23.8261 0.813371 23.5036 0.49587C23.1811 0.178369 22.7436 0 22.2875 0C22.0616 0 21.838 0.0437899 21.6293 0.128872C21.4206 0.213953 21.231 0.33866 21.0713 0.49587L12.507 8.92642C12.3464 9.08317 12.219 9.26965 12.1321 9.47512C12.0451 9.68059 12.0003 9.90097 12.0003 10.1236C12.0003 10.3461 12.0451 10.5665 12.1321 10.772C12.219 10.9775 12.3464 11.164 12.507 11.3207Z' fill='white' fill-opacity='0.3'%3E%3Canimate attributeName='fill-opacity' values='0.3;1;0.3' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'/%3E%3C/path%3E%3C/svg%3E%0A");
      }
      &::before {
        left: 1.2rem;
      }
      &::after {
        right: 1.2rem;
        transform: scaleX(-1);
      }
      &:active {
        cursor: grabbing;
      }
      .lottie-animation {
        position: absolute;
        width: 20rem;
        height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
      }
      .charctor-txt {
        position: absolute;
        right: 50%;
        text-align: left;
        margin-right: 2.5rem;
        top: 3.7rem;
        border-radius: 1.2rem;
        opacity: 0.8;
        padding: 1.1rem 1.6rem;
        background: rgba(2, 2, 2, 0.85);
        box-shadow: 0 0.4rem 0.8rem 0 rgba(0, 0, 0, 0.04);
        backdrop-filter: blur(1.5rem);
        font-size: 1.3rem;
        color: vars.$white;
        white-space: nowrap;
      }
    }
    .charctor-option {
      display: flex;
      flex-direction: row;
      gap: 0 0.6rem;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: -2rem;
      left: 0;
      right: 0;
      z-index: 10;
      .btn-white {
        border-radius: 2rem;
        border: 0.1rem solid #fff;
        font-size: 1.4rem;
        font-weight: 600;
        color: #2b2b2b;
        line-height: 2rem;
        padding: 0.8rem 1.6rem;
        position: relative;
        background: rgba(255, 255, 255, 0.7);
        @include mixin.rippleEffectPrimary;
      }
      .info-text {
        font-size: 1.4rem;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.7);
        text-align: center;
      }
    }
    .banner-box {
      position: absolute;
      bottom: 3.2rem;
      left: 2rem;
      right: 2rem;
      border-radius: 1.2rem;
      border: 0.1rem solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      .box-content {
        padding: 2.4rem;
        padding-right: 13.2rem;
        position: relative;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        img {
          position: absolute;
          right: 0;
          top: 0;
          width: 13.2rem;
        }
        strong {
          display: flex;
          flex-direction: column;
          gap: 2rem 0;
          font-size: 1.6rem;
          font-weight: 700;
          &.blue-txt {
            color: #31519e;
          }
          .arrow-txt {
            font-weight: 400;
            color: #2b2b2b;
            display: inline-flex;
            align-items: center;
            gap: 0 0.2rem;
            &:after {
              content: '';
              width: 2rem;
              height: 2rem;
              display: inline-block;
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7.49984 5.83301L11.6665 9.99967L7.49984 14.1663' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            }
          }
        }
      }
    }
  }
}
@media (max-width: 375px) {
  .main-sector {
    .main-section {
      .charactor {
        .charctor-txt {
          font-size: 1.2rem;
          top: 1.5rem;
          padding: 1.1rem;
          margin-right: 0;
        }
      }
    }
  }
}
</style>
