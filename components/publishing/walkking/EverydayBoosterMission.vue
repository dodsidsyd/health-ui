<template>
  <div class="booster-wrap">
    <div :class="['everyday-booster-box', { hidden: isHidden }]" @click="showBooster">
      <div class="mission-box">
        <div class="circle-progressbar-box">
          <svg>
            <circle cx="24" cy="24" r="21" />
            <circle cx="24" cy="24" r="21" :style="{ '--percent': percentValue }" />
          </svg>
          <div class="number">
            <p>
              <strong>{{ currentMission }}</strong
              >/{{ totalMission }}
            </p>
          </div>
        </div>
        <h5>매일 부스터 미션!!</h5>
      </div>
    </div>
    <button :class="['booster-box', { visible: isVisible }]" @click="hideBooster">
      <LottieAnimation
        src="/animations/booster.json"
        width="100%"
        height="100%"
        :speed="1.5"
        :loop="true"
        class="booster-icon"
      />
      <p class="booster-tit">부스터 ON!!</p>
      <span class="booster-time">59:47</span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from 'vue'

const currentMission = ref(0) // 달성 미션 수
const totalMission = ref(8) // 전체 미션 수

// --percent CSS 변수에 연결될 백분율 값 (computed 속성)
const percentValue = computed(() => {
  if (totalMission.value <= 0) {
    return 0
  }
  const percent = (currentMission.value / totalMission.value) * 100
  // 0% 미만 100% 초과 방지
  return Math.max(0, Math.min(100, percent))
})

onMounted(() => {
  setTimeout(() => {
    currentMission.value = 5 // 예: 8개 중 5개 미션 완료
  }, 300) // 300ms 지연 후 애니메이션 시작
})

const isHidden = ref(false) // everyday-booster-box의 'hidden' 클래스 상태
const isVisible = ref(false) // booster-box의 'visible' 클래스 상태

const emit = defineEmits<{
  (e: 'show-modal' | 'hide-modal'): void
}>()

const showBooster = () => {
  isHidden.value = false
  isVisible.value = false
  emit('show-modal')
}

const hideBooster = () => {
  isHidden.value = true
  isVisible.value = true
  emit('hide-modal')
}
</script>

<style lang="scss" scoped>
.booster-wrap {
  z-index: 100;
  display: flex;
  justify-content: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0.8rem;
  gap: 1.6rem;
}
.everyday-booster-box {
  width: 20rem;
  position: relative;
  flex-shrink: 0;
  transition: width 0.5s ease-in-out;
  &.hidden {
    width: 6rem;
    h5 {
      display: none;
    }
  }
}
.mission-box {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  padding: 0.6rem 2.4rem 0.6rem 0.6rem;
  background: #fff;
  border-radius: 4.8rem;
  overflow: hidden;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.12);
  &:before {
    content: '';
    position: absolute;
    top: -0.2rem;
    left: -0.2rem;
    right: -0.2rem;
    bottom: -0.2rem;
    background: linear-gradient(90deg, #4c7ff7 0%, #00f7c5 100%); /* 그라데이션 배경 */
    z-index: -1;
    border-radius: 4.8rem;
  }
  .circle-progressbar-box {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
    flex-shrink: 0;
    svg {
      position: relative;
      width: 4.8rem;
      height: 4.8rem;
      transform: rotate(-90deg);
      circle {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: #e2e2e2;
        stroke-width: 6;
        stroke-linecap: round;
        &:last-of-type {
          stroke-dasharray: 13.2rem;
          stroke-dashoffset: calc(13.2rem - (13.2rem * var(--percent)) / 100);
          stroke: var(--blue-primary);
          transition: stroke-dashoffset 1s ease-in-out;
        }
      }
    }
    .number {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  p {
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.6rem;
    color: #555;
    strong {
      color: var(--blue-primary);
    }
  }
  h5 {
    flex-shrink: 0;
    font-size: 1.6rem;
    font-weight: 700;
  }
}
.booster-box {
  display: flex;
  align-items: center;
  position: relative;
  width: 6rem;
  height: 6rem;
  padding: 0.8rem;
  flex-shrink: 0;
  border-radius: 8rem;
  border: 0.2rem solid #00f7c5;
  background: linear-gradient(135deg, #0c5654 0%, #2ebeb0 100%);
  transition: all 0.5s ease-in-out;
  font-weight: 700;
  line-height: 2.2rem;
  &.visible {
    width: 100%;
    padding: 0.8rem 3.2rem 0.8rem 1.6rem;
    border: 6px solid #00f7c5;
    background: #283940;
    animation: blink-border 1.5s ease-in-out infinite;
    .booster-tit,
    .booster-time {
      opacity: 1;
      visibility: visible;
    }
  }
  .booster-icon {
    display: block;
    flex-shrink: 0;
    width: 4.4rem;
    height: 4.4rem;
  }
  .booster-tit {
    flex-shrink: 0;
    color: #fff;
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }
  .booster-time {
    margin-left: auto;
    color: #00f7c5;
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }
}
@keyframes blink-border {
  0%,
  100% {
    border-color: #00f7c5;
  }
  50% {
    border-color: transparent;
  }
}
</style>
