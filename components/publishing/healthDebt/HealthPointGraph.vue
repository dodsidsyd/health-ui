<template>
  <section class="health-point-graph">
    <h2 class="tit">김건강님의 레몬건강지수</h2>
    <div class="graph-container">
      <canvas ref="canvasRef" :width="size" :height="size"></canvas>
      <div class="center-text">
        <div class="label">정밀</div>
        <div class="score">{{ currentScore }}점</div>
        <div class="score-text">나의 건강 지수</div>
      </div>
    </div>

    <div class="health-item-wrap">
      <HealthPointItem
        v-for="(item, index) in healthItems"
        :key="index"
        :icon="item.icon"
        :item-tit="item.title"
        :item-value="item.value"
      />
    </div>
    <button type="button" class="btn-line-gray">정밀분석 더하기</button>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import HealthPointItem from '~/components/publishing/healthDebt/HealthPointItem.vue'

const props = defineProps({
  score: { type: Number, default: 72 },
  maxScore: { type: Number, default: 100 },
  size: { type: Number, default: 280 },
  strokeWidth: { type: Number, default: 20 },
  duration: { type: Number, default: 5000 },
  // 아이템 더미 데이터
  healthItems: {
    type: Array,
    default: () => [
      { icon: 'ico-heart', title: '기대수명', value: '82세(17,882일)' },
      { icon: 'ico-greenCross', title: '예상 연간 의료비', value: 1566335 },
      { icon: 'ico-price', title: '내 건강부채', value: 73288785 }
    ]
  }
})

const canvasRef = ref(null)
const animatedValue = ref(0)
const waveOffset = ref(0)
const animationFrameId = ref(null)
const currentScore = computed(() => Math.round(animatedValue.value))

const percentValue = computed(() => (animatedValue.value / props.maxScore) * 100)

const drawHealthGraph = ctx => {
  const center = props.size / 2
  const radius = center - props.strokeWidth
  const percent = percentValue.value

  ctx.clearRect(0, 0, props.size, props.size)

  const arcAngle = Math.PI * 2 * 0.6 // 60% 정도 원
  const startAngle = (Math.PI / 180) * (-90 - (arcAngle * 180) / Math.PI / 2)
  const endAngleMax = startAngle + arcAngle

  // 배경 호 그리기 - 일렁이는 그라디언트 애니메이션
  const gradient = ctx.createLinearGradient(0, center, props.size, center)

  // 웨이브 효과를 위한 오프셋 적용
  const wave = Math.sin(waveOffset.value) * 0.1
  gradient.addColorStop(Math.max(0, Math.min(1, 0.0927 + wave)), '#FFD42E')
  gradient.addColorStop(Math.max(0, Math.min(1, 0.3457 + wave * 0.8)), '#60D871')
  gradient.addColorStop(Math.max(0, Math.min(1, 0.7041 + wave * 0.6)), '#02CCF4')
  gradient.addColorStop(Math.max(0, Math.min(1, 0.9152 + wave * 0.4)), '#4C7FF7')

  ctx.beginPath()
  ctx.arc(center, center, radius, startAngle, endAngleMax)
  ctx.strokeStyle = gradient
  ctx.lineWidth = props.strokeWidth
  ctx.lineCap = 'round'
  ctx.stroke()

  // center-text 외곽선 따라 이동하는 화살표
  const centerCircleRadius = 90 // center-text의 반경 (17.2rem / 2)
  const arrowAngle = startAngle + (arcAngle * percent) / 100
  const arrowX = center + Math.cos(arrowAngle) * centerCircleRadius
  const arrowY = center + Math.sin(arrowAngle) * centerCircleRadius

  // 화살표 그리기
  ctx.save()
  ctx.translate(arrowX, arrowY)
  ctx.rotate(arrowAngle + Math.PI / 2) // 화살표가 원 중심을 향하도록 회전

  // 화살표 모양 그리기 (넓고 낮은 형태)
  ctx.fillStyle = '#F14960'
  ctx.beginPath()
  ctx.moveTo(0, -10) // 화살표 끝 (높이 16px의 절반)
  ctx.lineTo(-18, 10) // 왼쪽 모서리 (너비 36px의 절반)
  ctx.lineTo(0, 3) // 중앙 들어간 부분
  ctx.lineTo(18, 10) // 오른쪽 모서리 (너비 36px의 절반)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

const animate = (from, to, duration) => {
  const start = performance.now()
  const step = now => {
    const progress = Math.min((now - start) / duration, 1)
    const easeProgress = 1 - Math.pow(1 - progress, 3) // easeOutCubic
    const current = from + (to - from) * easeProgress
    animatedValue.value = current

    const ctx = canvasRef.value?.getContext('2d')
    if (ctx) {
      drawHealthGraph(ctx)
    }

    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

watch(
  () => props.score,
  newScore => {
    animate(0, newScore, props.duration)
  }
)

const startWaveAnimation = () => {
  const animateWave = () => {
    waveOffset.value += 0.05 // 속도 조절

    const ctx = canvasRef.value?.getContext('2d')
    if (ctx) {
      drawHealthGraph(ctx)
    }

    animationFrameId.value = requestAnimationFrame(animateWave)
  }
  animateWave()
}

onMounted(() => {
  animate(0, props.score, props.duration)
  // 일렁이는 애니메이션 시작
  setTimeout(() => {
    startWaveAnimation()
  }, props.duration) // 초기 애니메이션 완료 후 시작
})

// 컴포넌트 언마운트 시 애니메이션 정리
onUnmounted(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
})
</script>

<style lang="scss" scoped>
.health-point-graph {
  text-align: center;
  margin-top: 2.4rem;
  margin-bottom: 3.2rem;
  .tit {
    font-size: 2.4rem;
    font-weight: 700;
    color: #2b2b2b;
    margin-bottom: 2rem;
  }

  .graph-container {
    position: relative;
    display: block;
    width: 26rem;
    height: 26rem;
    margin: auto;
  }

  .center-text {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.6rem 0;
    align-items: center;
    justify-content: center;
    width: 16.2rem;
    height: 16.2rem;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    box-shadow: 0 -0.8rem 1.2rem 0 rgba(0, 0, 0, 0.08);
    background: #fff;
    z-index: 10;
    .score {
      font-size: 2.7rem;
      font-weight: bold;
      color: #333;
      line-height: 1;
    }

    .label {
      font-size: 1.2rem;
      line-height: 2.2rem;
      color: #5d4a00;
      background-color: #faeaa9;
      text-align: center;
      padding: 0 0.8rem;
      border-radius: 1.1rem;
    }
    .score-text {
      font-size: 1.6rem;
      font-weight: 500;
      color: #555;
    }
  }
}
.health-item-wrap {
  position: relative;
  margin-top: -4rem;
}
.btn-line-gray {
  margin-top: 1.6rem;
  text-align: center;
  font-size: 1.6rem;
  border: 0.1rem solid #e2e2e2;
  background-color: #fff;
  line-height: 4rem;
  border-radius: 0.8rem;
  width: 100%;
  position: relative;
  @include mixin.rippleEffectPrimary;
}
</style>
