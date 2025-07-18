<template>
  <div class="circle-vital-chart">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 260 260">
      <!-- 배경 아치 -->
      <path
        d="M 45 190 A 100 100 0 1 1 215 190"
        fill="none"
        stroke="#F4F4F4"
        stroke-width="17"
        stroke-linecap="round"
      />

      <!-- 진행률 아치 -->
      <path
        v-if="percentage > 0 && !noData"
        d="M 45 190 A 100 100 0 1 1 215 190"
        fill="none"
        :stroke="progressColor"
        stroke-width="17"
        stroke-linecap="round"
        :stroke-dasharray="archLength"
        :stroke-dashoffset="dashOffset"
        class="progress-arch"
        ref="progressPathRef"
      />
    </svg>
    <div class="center-score-info" v-if="showEmoji">
      <div class="emoji" :class="emojiClass"></div>
      <strong class="score">{{ noData ? '-' : percentage }}점</strong>
      <button type="button" class="vital-tooltip">활력 점수</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

interface Props {
  percentage: number
  progressColor?: string
  showEmoji?: boolean
  noData?: boolean // no data 상태
}

const props = withDefaults(defineProps<Props>(), {
  percentage: 0,
  progressColor: '#4C7FF7',
  showEmoji: true,
  noData: false
})

// 아치의 길이 계산 (실제 SVG path 길이 사용)
const archLength = ref(0)
const progressPathRef = ref<SVGPathElement | null>(null)

// mounted에서 실제 path 길이를 측정
onMounted(() => {
  nextTick(() => {
    if (progressPathRef.value && typeof progressPathRef.value.getTotalLength === 'function') {
      archLength.value = progressPathRef.value.getTotalLength()
    } else {
      const radius = 100
      const startAngle = Math.atan2(190 - 130, 45 - 130)
      const endAngle = Math.atan2(190 - 130, 215 - 130)
      let totalAngle = endAngle - startAngle
      if (totalAngle < 0) totalAngle += 2 * Math.PI
      totalAngle = 2 * Math.PI - totalAngle
      archLength.value = radius * totalAngle
    }
  })
})

// emoji 상태 계산 (5단계 + no data)
const emojiClass = computed(() => {
  if (props.noData) return 'sleep' // no data 상태

  const score = props.percentage
  if (score >= 91) return 'excellent'
  if (score >= 81) return 'good'
  if (score >= 71) return 'normal'
  if (score >= 61) return 'dislike'
  return 'bad'
})

// stroke-dashoffset 계산
const dashOffset = computed(() => {
  const progress = Math.max(0, Math.min(100, props.percentage))
  // 시작점부터 진행률에 따라 채워지도록 수정
  return archLength.value - (archLength.value * progress) / 100
})
</script>

<style scoped lang="scss">
.circle-vital-chart {
  position: relative;
  width: 26rem;
  .center-score-info {
    position: absolute;
    left: 0;
    top: 5rem;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem 0;
    flex-direction: column;
    .emoji {
      display: block;
      width: 6rem;
      height: 6rem;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .score {
      font-size: 2.4rem;
      font-weight: 700;
      text-align: center;
      line-height: 3.1rem;
    }
    .vital-tooltip {
      font-size: 1.6rem;
      font-size: 500;
      color: #555;
      display: flex;
      gap: 0 0.2rem;
      align-items: center;
      &:after {
        content: '';
        display: block;
        width: 2rem;
        height: 2rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none'%3E%3Cpath d='M10.4992 13.75V13.783M8.625 7.69166C8.625 6.63657 9.46447 5.78125 10.5 5.78125C11.5355 5.78125 12.375 6.63657 12.375 7.69166C12.375 8.74675 11.5355 9.60207 10.5 9.60207C10.5 9.60207 10.4992 10.1723 10.4992 10.8757M18 10C18 14.1421 14.6421 17.5 10.5 17.5C6.35786 17.5 3 14.1421 3 10C3 5.85786 6.35786 2.5 10.5 2.5C14.6421 2.5 18 5.85786 18 10Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
  // 진행률 변화 애니메이션
  .progress-arch {
    transition: stroke-dashoffset 0.5s ease-in-out;
  }
}
</style>
