<template>
  <div class="main-my-rank">
    <div class="rank-swiper-container">
      <div
        ref="rankSwiperRef"
        class="rank-swiper"
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
        <div v-for="(rank, index) in rankData" :key="`rank-${index}`" class="rank-box">
          <i class="badge" :class="rank.iconClass" aria-label="hidden"></i>
          <div class="box-txt">
            <span class="tit">{{ rank.title }}</span>
            <strong class="txt">{{ rank.value }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'

// 랭킹 데이터 인터페이스
interface RankData {
  id: number
  title: string
  value: string
  iconClass: string
}

// Props 정의
interface Props {
  ranks?: RankData[]
  rightMargin?: number // 마지막 드래그 종료 시 우측 여백 (px)
}

const props = withDefaults(defineProps<Props>(), {
  rightMargin: 40,
  ranks: () => [
    { id: 1, title: '총상금', value: '480,000P', iconClass: 'total-prize' },
    { id: 2, title: '올해 상금 랭킹', value: '134위', iconClass: 'total-trophy' },
    { id: 3, title: '챌린지 참가', value: '10회', iconClass: 'total-challenge' },
    { id: 4, title: '최고순위', value: '84위', iconClass: 'total-rank' },
    { id: 5, title: '총걸음', value: '264,203걸음', iconClass: 'total-steps' },
    { id: 6, title: '평균걸음(일)', value: '12,120걸음', iconClass: 'average-steps' }
  ]
})

// 스와이프 상태 관리
const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const isMouseDragging = ref(false)
const dragOffset = ref(0)
const isTransitioning = ref(false)
const velocity = ref(0)
const lastMoveTime = ref(0)
const lastMoveX = ref(0)

// 드래그와 클릭을 구분하기 위한 변수들
const hasMoved = ref(false)
const dragThreshold = 10
const startTime = ref(0)
const clickTimeThreshold = 300

// 스크롤 설정
const rightMarginPx = computed(() => props.rightMargin)

// 슬라이더 컨테이너 참조
const rankSwiperRef = ref<HTMLElement | null>(null)

// 랭킹 데이터
const rankData = computed(() => props.ranks)

// 실제 DOM 요소를 측정하여 최대 스크롤 거리 계산
const getMaxScrollDistance = async (): Promise<number> => {
  if (typeof window === 'undefined' || !rankSwiperRef.value) return 0

  // DOM이 완전히 렌더링될 때까지 대기
  await nextTick()

  const container = rankSwiperRef.value.parentElement
  const sliderElement = rankSwiperRef.value

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

// 터치 이벤트 핸들러
const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX
  lastMoveX.value = e.touches[0].clientX
  lastMoveTime.value = Date.now()
  startTime.value = Date.now()
  velocity.value = 0
  isDragging.value = true
  isTransitioning.value = false
  hasMoved.value = false
}

const handleTouchMove = async (e: TouchEvent) => {
  if (!isDragging.value) return

  currentX.value = e.touches[0].clientX
  const deltaX = currentX.value - startX.value

  if (Math.abs(deltaX) > dragThreshold) {
    hasMoved.value = true
    e.preventDefault()
  }

  if (hasMoved.value) {
    const now = Date.now()
    const moveX = currentX.value - lastMoveX.value
    const deltaTime = now - lastMoveTime.value

    if (deltaTime > 0) {
      velocity.value = moveX / deltaTime
    }

    const maxDistance = await getMaxScrollDistance()
    const newOffset = Math.max(-maxDistance - 50, Math.min(50, dragOffset.value + moveX))
    dragOffset.value = newOffset

    lastMoveX.value = currentX.value
    lastMoveTime.value = now
  }
}

const handleTouchEnd = async () => {
  if (!isDragging.value) return

  isDragging.value = false

  if (hasMoved.value) {
    isTransitioning.value = true

    const maxDistance = await getMaxScrollDistance()
    let finalOffset = dragOffset.value + velocity.value * 100

    finalOffset = Math.max(-maxDistance, Math.min(0, finalOffset))
    dragOffset.value = finalOffset

    setTimeout(() => {
      isTransitioning.value = false
    }, 500)
  }

  hasMoved.value = false
}

// 마우스 이벤트 핸들러
const handleMouseDown = (e: MouseEvent) => {
  startX.value = e.clientX
  lastMoveX.value = e.clientX
  lastMoveTime.value = Date.now()
  startTime.value = Date.now()
  velocity.value = 0
  isDragging.value = true
  isMouseDragging.value = false
  isTransitioning.value = false
  hasMoved.value = false
}

const handleMouseMove = async (e: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = Math.abs(e.clientX - startX.value)
  const deltaTime = Date.now() - startTime.value

  if (deltaX > dragThreshold || deltaTime > clickTimeThreshold) {
    isMouseDragging.value = true
    hasMoved.value = true
  }

  if (isMouseDragging.value) {
    currentX.value = e.clientX
    const now = Date.now()
    const mouseDelta = currentX.value - lastMoveX.value
    const moveTime = now - lastMoveTime.value

    if (moveTime > 0) {
      velocity.value = mouseDelta / moveTime
    }

    const maxDistance = await getMaxScrollDistance()
    const newOffset = Math.max(-maxDistance - 50, Math.min(50, dragOffset.value + mouseDelta))
    dragOffset.value = newOffset

    lastMoveX.value = currentX.value
    lastMoveTime.value = now

    e.preventDefault()
  }
}

const handleMouseUp = async () => {
  if (!isDragging.value) return

  isDragging.value = false

  if (isMouseDragging.value && hasMoved.value) {
    isTransitioning.value = true

    const maxDistance = await getMaxScrollDistance()
    let finalOffset = dragOffset.value + velocity.value * 200
    finalOffset = Math.max(-maxDistance, Math.min(0, finalOffset))

    dragOffset.value = finalOffset

    setTimeout(() => {
      isTransitioning.value = false
    }, 500)
  }

  isMouseDragging.value = false
  hasMoved.value = false
}

// 최대 스크롤 거리를 다시 계산
const recalculateScrollDistance = async () => {
  const maxDistance = await getMaxScrollDistance()
  // 현재 오프셋이 새로운 최대값을 초과하면 조정
  if (dragOffset.value < -maxDistance) {
    dragOffset.value = -maxDistance
  }
}

// 윈도우 리사이즈 이벤트
const handleResize = async () => {
  await recalculateScrollDistance()
}

// 라이프사이클
onMounted(() => {
  window.addEventListener('resize', handleResize)
  // 마운트 후 스크롤 거리 계산
  nextTick(() => {
    recalculateScrollDistance()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Props 변경 감지
watch(
  () => props.ranks,
  () => {
    nextTick(() => {
      recalculateScrollDistance()
    })
  },
  { deep: true }
)

// 템플릿에서 사용할 수 있도록 expose
defineExpose({
  recalculateScrollDistance
})
</script>

<style scoped lang="scss">
.main-my-rank {
  .rank-swiper-container {
    position: relative;
    overflow: hidden;
    padding-left: 2rem;
    margin: 0 -2rem;

    .rank-swiper {
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

      .rank-box {
        padding: 1.4rem 1.2rem 1.2rem 1.4rem;
        flex: 0 0 auto;
        min-width: 11.4rem;
        border-radius: 1.2rem;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        gap: 0 0.8rem;

        .badge {
          display: block;
          flex: 0 0 auto;
          width: 2rem;
          height: 2rem;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;

          &.total-prize {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M17.5716 9.00256C17.572 7.3073 17.0698 5.64995 16.1284 4.24012C15.1869 2.83029 13.8486 1.7313 12.2825 1.0821C10.7165 0.432912 8.9931 0.262679 7.33031 0.592939C5.66752 0.9232 4.14001 1.73912 2.94094 2.93751C1.74187 4.13591 0.925085 5.66296 0.593885 7.32556C0.262685 8.98816 0.431941 10.7116 1.08025 12.278C1.72856 13.8444 2.8268 15.1834 4.23609 16.1257C5.64539 17.0679 7.30245 17.5711 8.99772 17.5716C10.1234 17.5722 11.2382 17.351 12.2784 16.9207C13.3186 16.4903 14.2638 15.8592 15.0601 15.0635C15.8563 14.2677 16.4879 13.3228 16.9188 12.2829C17.3498 11.2429 17.5716 10.1283 17.5716 9.00256Z' fill='%23FBC700'/%3E%3Cpath d='M6.5 12.5716V5.42871H9.58315C10.1133 5.42871 10.5771 5.53334 10.9747 5.74261C11.3723 5.95187 11.6816 6.246 11.9025 6.625C12.1234 7.004 12.2338 7.44694 12.2338 7.95382C12.2338 8.46536 12.1199 8.9083 11.892 9.28265C11.6665 9.65699 11.3491 9.94531 10.9399 10.1476C10.533 10.3499 10.0575 10.451 9.51339 10.451H7.67188V8.94434H9.12277C9.35063 8.94434 9.54478 8.90481 9.70522 8.82575C9.86798 8.74437 9.99237 8.62928 10.0784 8.48047C10.1668 8.33166 10.2109 8.15611 10.2109 7.95382C10.2109 7.74921 10.1668 7.57482 10.0784 7.43066C9.99237 7.28418 9.86798 7.17257 9.70522 7.09584C9.54478 7.01679 9.35063 6.97726 9.12277 6.97726H8.43917V12.5716H6.5Z' fill='white'/%3E%3C/svg%3E");
          }
          &.total-trophy {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='19' viewBox='0 0 16 19' fill='none'%3E%3Cpath d='M6.42856 12.6373V13.1694C6.42856 14.4486 5.21429 15.4203 3.80957 15.4203L5.90476 15.9455L7.99995 15.4203L8.52375 14.1073L7.99995 12.7943L7.21035 12.269L6.42856 12.6373Z' fill='%23F7BC2B'/%3E%3Cpath d='M9.57139 13.1694C9.57139 12.9833 9.57139 12.8234 9.57139 12.6373L8.78961 12.269L8 12.7943V15.4203L10.0952 15.9455L12.1904 15.4203C10.7808 15.4203 9.57139 14.444 9.57139 13.1694Z' fill='%23F7BC2B'/%3E%3Cpath d='M3.79017 2.29C3.66309 1.40337 2.90079 0.714355 1.97587 0.714355C0.965011 0.714355 0.142578 1.53894 0.142578 2.5526V4.91607C0.142578 9.24366 3.63076 12.7943 7.99955 12.7943L8.52335 7.54214L7.99955 2.29C7.49052 2.29 4.30255 2.29 3.79017 2.29ZM1.19017 4.91607C1.19017 4.27314 1.19017 2.92747 1.19017 2.5526C1.19017 2.11822 1.54262 1.76478 1.97587 1.76478C2.40909 1.76478 2.76157 2.11818 2.76157 2.5526V7.54214C2.76157 8.34393 2.94224 9.128 3.29312 9.84583C1.95443 8.56035 1.19017 6.79308 1.19017 4.91607Z' fill='%23FDD643'/%3E%3Cpath d='M15.857 4.91607C15.857 4.27314 15.857 2.92747 15.857 2.5526C15.857 1.53905 15.0346 0.714355 14.0237 0.714355C13.0979 0.714355 12.3363 1.40421 12.2094 2.29C11.7004 2.29 8.51241 2.29 8 2.29V12.7943C12.3001 12.7943 15.857 9.31183 15.857 4.91607ZM12.7064 9.84583C13.057 9.12874 13.238 8.34477 13.238 7.54214C13.238 7.13296 13.238 3.18657 13.238 2.5526C13.238 2.11822 13.5904 1.76478 14.0237 1.76478C14.4569 1.76478 14.8094 2.11818 14.8094 2.5526V4.91607C14.8094 6.78961 14.0476 8.55794 12.7064 9.84583Z' fill='%23FDD643'/%3E%3Cpath d='M2.76172 15.4199V17.5208L5.38071 18.046L7.9997 17.5208L8.5235 16.4703L7.9997 15.4199C7.64603 15.4199 3.11542 15.4199 2.76172 15.4199Z' fill='%23FDD643'/%3E%3Cpath d='M13.238 15.4199C12.8843 15.4199 8.3537 15.4199 8 15.4199V17.5208L10.619 18.046L13.238 17.5208C13.238 17.2666 13.238 15.6758 13.238 15.4199Z' fill='%23FDD643'/%3E%3Cpath d='M1.71484 17.521V18.5714H8.00042L8.52422 18.0462L8.00042 17.521C7.65122 17.521 2.06404 17.521 1.71484 17.521Z' fill='%23F7BC2B'/%3E%3Cpath d='M14.2856 17.521C13.9364 17.521 8.3492 17.521 8 17.521V18.5714H14.2856C14.2856 18.2041 14.2856 17.8884 14.2856 17.521Z' fill='%23F7BC2B'/%3E%3Cpath d='M8.69141 6.67676C9.20623 6.75177 9.72053 6.82733 10.2354 6.90234C9.86283 7.26643 9.49069 7.63002 9.11816 7.99414C9.20611 8.50832 9.29389 9.02192 9.38184 9.53613C8.92124 9.29334 8.46059 9.05138 8 8.80859V8.80762L6.61914 9.53613C6.70709 9.02194 6.79486 8.50833 6.88281 7.99414C6.5103 7.63007 6.13814 7.26645 5.76562 6.90234C6.28051 6.82732 6.79468 6.75178 7.30957 6.67676C7.53986 6.20892 7.76971 5.74128 8 5.27344L8.69141 6.67676Z' fill='%23F7BC2B'/%3E%3C/svg%3E");
          }
          &.total-challenge {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='18' viewBox='0 0 17 18' fill='none'%3E%3Cpath d='M0.973781 11.2555L15.2186 11.2555V2.23291L0.973781 2.23291C0.745296 2.23281 0.54123 2.37245 0.463413 2.58216C0.385596 2.79186 0.450706 3.02669 0.626254 3.16945L4.52113 6.33727C4.64421 6.4379 4.7153 6.58657 4.7153 6.74329C4.7153 6.9 4.64421 7.04867 4.52113 7.1493L0.626254 10.3171C0.449198 10.4595 0.383056 10.6953 0.461062 10.9059C0.539067 11.1165 0.744355 11.2565 0.973781 11.2555Z' fill='%23FFD32C'/%3E%3Cpath d='M15.2182 17.5716C14.7078 17.5716 14.2939 17.1676 14.2939 16.6693V1.33097C14.2939 0.832664 14.7078 0.428711 15.2182 0.428711C15.7287 0.428711 16.1425 0.832664 16.1425 1.33097V16.6693C16.1425 17.1676 15.7287 17.5716 15.2182 17.5716Z' fill='%23FD9246'/%3E%3C/svg%3E");
          }
          &.total-rank {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='15' viewBox='0 0 18 15' fill='none'%3E%3Cg clip-path='url(%23clip0_15469_9127)'%3E%3Cpath d='M15.2162 11.0633H2.78389C2.5034 11.0633 2.25838 10.8783 2.1862 10.6124L0.449635 4.22196C0.386937 3.99123 0.467784 3.74593 0.656702 3.59494C0.84562 3.44395 1.10672 3.41562 1.3241 3.52248L6.07262 5.85246L8.44647 1.19251C8.55124 0.986872 8.76574 0.856934 9.00003 0.856934C9.23432 0.856934 9.44881 0.986872 9.55358 1.19251L11.9278 5.85246L16.6764 3.52248C16.8942 3.41562 17.1553 3.44395 17.3438 3.59494C17.5323 3.74593 17.6135 3.99123 17.5508 4.22196L15.8143 10.6124C15.7421 10.8783 15.4967 11.0633 15.2166 11.0633H15.2162Z' fill='%23FDD643'/%3E%3Cpath d='M14.302 14.4283H3.69869C3.4182 14.4283 3.17319 14.2433 3.101 13.9773L2.18652 10.6123H15.8146L14.9001 13.9773C14.8279 14.2433 14.5821 14.4283 14.302 14.4283Z' fill='%23F7BC2B'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_15469_9127'%3E%3Crect width='17.1429' height='13.5714' fill='white' transform='translate(0.428711 0.856934)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
          }
          &.total-steps {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='17' viewBox='0 0 18 17' fill='none'%3E%3Cpath d='M17.5711 13.2444V13.5238H11.5541C11.177 13.5238 10.817 13.4016 10.5256 13.1746L1.23438 6.07763L4.1743 1.38996C4.88571 0.324981 5.85426 0.359898 5.88854 0.499568C6.20568 1.63438 6.66852 4.62855 10.6541 3.98258C10.8427 3.94766 11.0398 4.04369 11.117 4.227L13.1741 8.89721C13.2426 9.05434 13.3969 9.15909 13.5598 9.15909C15.7797 9.15909 17.5711 10.9835 17.5711 13.2444Z' fill='%23FFE687'/%3E%3Cpath d='M17.5713 13.5238V14.8333C17.5713 15.5578 16.997 16.1427 16.2856 16.1427H10.6971C10.3286 16.1427 9.96859 16.0204 9.66859 15.7935L1.11452 9.25519C0.394543 8.71397 0.214547 7.69264 0.703106 6.92445L1.23452 6.0777L10.5257 13.1747C10.8171 13.4016 11.1771 13.5238 11.5543 13.5238H17.5713ZM11.5628 5.23096H9.00004C8.64862 5.23096 8.3572 5.52776 8.3572 5.88566C8.3572 6.24356 8.64862 6.54036 9.00004 6.54036H12.1371L11.5628 5.23096ZM12.5228 7.4133H9.85716C9.50574 7.4133 9.21432 7.71009 9.21432 8.068C9.21432 8.4259 9.50574 8.7227 9.85716 8.7227H13.0971L12.5228 7.4133Z' fill='%23FD9246'/%3E%3C/svg%3E");
          }
          &.average-steps {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='17' viewBox='0 0 18 17' fill='none'%3E%3Cpath d='M17.5711 13.2444V13.5238H11.5541C11.177 13.5238 10.817 13.4016 10.5256 13.1746L1.23438 6.07763L4.1743 1.38996C4.88571 0.324981 5.85426 0.359898 5.88854 0.499568C6.20568 1.63438 6.66852 4.62855 10.6541 3.98258C10.8427 3.94766 11.0398 4.04369 11.117 4.227L13.1741 8.89721C13.2426 9.05434 13.3969 9.15909 13.5598 9.15909C15.7797 9.15909 17.5711 10.9835 17.5711 13.2444Z' fill='%23F9E3FB'/%3E%3Cpath d='M17.5713 13.5238V14.8333C17.5713 15.5578 16.997 16.1427 16.2856 16.1427H10.6971C10.3286 16.1427 9.96859 16.0204 9.6686 15.7935L1.11452 9.25519C0.394543 8.71397 0.214547 7.69264 0.703106 6.92445L1.23452 6.0777L10.5257 13.1747C10.8171 13.4016 11.1771 13.5238 11.5543 13.5238H17.5713ZM11.5628 5.23096H9.00004C8.64862 5.23096 8.3572 5.52776 8.3572 5.88566C8.3572 6.24356 8.64862 6.54036 9.00004 6.54036H12.1371L11.5628 5.23096ZM12.5228 7.4133H9.85716C9.50574 7.4133 9.21432 7.71009 9.21432 8.068C9.21432 8.4259 9.50574 8.7227 9.85716 8.7227H13.0971L12.5228 7.4133Z' fill='%23A663F1'/%3E%3C/svg%3E");
          }
        }

        .box-txt {
          display: flex;
          color: white;
          flex-direction: column;
          gap: 0.4rem 0;

          .tit {
            font-size: 1.4rem;
            font-weight: 400;
            line-height: 1.2;
          }

          .txt {
            font-size: 1.6rem;
            font-weight: 700;
            line-height: 1.2;
          }
        }
      }
    }
  }
}
</style>
