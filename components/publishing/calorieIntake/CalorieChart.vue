<template>
  <div style="position: relative; display: inline-block">
    <canvas ref="canvasRef" :width="size" :height="size"></canvas>
    <div
      v-if="tooltipPos"
      class="calorie-tooltip"
      :style="{
        position: 'absolute',
        left: tooltipPos.x + 50 + 'px',
        top: tooltipPos.y - 20 + 'px',
        transform: 'translate(-50%, -50%)',
        background: '#444',
        color: '#fff',
        padding: '0.6rem 1rem',
        fontSize: '1.2rem',
        textAlign: 'center',
        borderRadius: '0.8rem 0.8rem 0.8rem 0',
        boxShadow: '0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.03)',
        whiteSpace: 'nowrap'
      }"
    >
      목표 구간<br />
      {{ props.targetMin.toLocaleString() }} ~ {{ props.targetMax.toLocaleString() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'

const props = defineProps({
  addCalories: { type: Number, default: 0 },
  totalValue: { type: Number, default: 3000 },
  targetMin: { type: Number, default: 2000 },
  targetMax: { type: Number, default: 2300 },
  goalGap: { type: Number, default: 0.5 },
  size: { type: Number, default: 240 },
  strokeWidth: { type: Number, default: 30 },
  duration: { type: Number, default: 500 }
})

const canvasRef = ref(null)
const animatedValue = ref(0)
const tooltipPos = ref(null)

const percentValue = computed(() => (props.addCalories / props.totalValue) * 100)
const computedTargetRange = computed(() => [
  (props.targetMin / props.totalValue) * 100,
  (props.targetMax / props.totalValue) * 100
])

const arcAngle = Math.PI * 2 * 0.6
const arcStart = (Math.PI / 180) * (-90 - (arcAngle * 180) / Math.PI / 2)

const drawDonutSegment = (ctx, center, innerR, outerR, startAngle, endAngle, fillStyle) => {
  const path = new Path2D()
  path.moveTo(center + Math.cos(startAngle) * outerR, center + Math.sin(startAngle) * outerR)
  path.arc(center, center, outerR, startAngle, endAngle)
  path.lineTo(center + Math.cos(endAngle) * innerR, center + Math.sin(endAngle) * innerR)
  path.arc(center, center, innerR, endAngle, startAngle, true)
  path.closePath()

  ctx.fillStyle = fillStyle
  ctx.fill(path)
}

const drawTargetRangeSegment = (ctx, center, innerR, outerR, startAngle, endAngle) => {
  const path = new Path2D()
  path.moveTo(center + Math.cos(startAngle) * outerR, center + Math.sin(startAngle) * outerR)
  path.arc(center, center, outerR, startAngle, endAngle)
  path.lineTo(center + Math.cos(endAngle) * innerR, center + Math.sin(endAngle) * innerR)
  path.arc(center, center, innerR, endAngle, startAngle, true)
  path.closePath()

  ctx.save()
  ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
  ctx.shadowBlur = 10
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.fill(path)
  ctx.restore()

  ctx.fillStyle = 'rgba(255,255,255,1)'
  ctx.lineWidth = 4
  ctx.strokeStyle = 'rgba(255,255,255,1)'
  ctx.stroke(path)
  ctx.fill(path)
}

const drawArc = (ctx, percent) => {
  percent = Math.min(percent, 100)

  const center = props.size / 2
  const radius = center - props.strokeWidth / 2
  const innerR = radius - props.strokeWidth / 2
  const outerR = radius + props.strokeWidth / 2

  ctx.clearRect(0, 0, props.size, props.size)

  const [targetStartPct, targetEndPct] = computedTargetRange.value
  const gap = props.goalGap
  const innerTargetStart = targetStartPct + gap
  const innerTargetEnd = targetEndPct - gap

  const arcTargetStart = arcStart + arcAngle * (innerTargetStart / 100)
  const arcTargetEnd = arcStart + arcAngle * (innerTargetEnd / 100)
  const arcGapStart1 = arcStart + arcAngle * (targetStartPct / 100)
  const arcGapEnd1 = arcStart + arcAngle * ((targetStartPct + gap) / 100)
  const arcGapStart2 = arcStart + arcAngle * ((targetEndPct - gap) / 100)
  const arcGapEnd2 = arcStart + arcAngle * (targetEndPct / 100)

  const progressEnd = arcStart + arcAngle * (percent / 100)

  const drawBackgroundArc = (fromPct, toPct) => {
    const from = arcStart + arcAngle * (fromPct / 100)
    const to = arcStart + arcAngle * (toPct / 100)

    const gradient = ctx.createRadialGradient(center, center, innerR, center, center, outerR)
    gradient.addColorStop(0, 'rgba(255,255,255,0.6)')
    gradient.addColorStop(1, 'rgba(255,255,255,0.6)')

    ctx.beginPath()
    ctx.arc(center, center, radius, from, to)
    ctx.strokeStyle = gradient
    ctx.lineWidth = props.strokeWidth
    ctx.lineCap = 'round'
    ctx.stroke()
  }

  drawBackgroundArc(0, targetStartPct)
  drawBackgroundArc(targetEndPct, 100)

  const targetMaxPct = (props.targetMax / props.totalValue) * 100
  let strokeColor = '#4C7FF7' // 30% 전에 다른 색상으로도 셋팅 가능
  if (percent > 30 && percent <= targetMaxPct) strokeColor = '#4C7FF7'
  else if (percent > targetMaxPct) strokeColor = '#C92F2F'

  ctx.strokeStyle = strokeColor
  ctx.lineWidth = props.strokeWidth
  ctx.lineCap = 'round'

  if (percent <= innerTargetStart) {
    ctx.beginPath()
    ctx.arc(center, center, radius, arcStart, progressEnd)
    ctx.stroke()
  } else if (percent >= innerTargetEnd) {
    ctx.beginPath()
    ctx.arc(center, center, radius, arcStart, arcStart + arcAngle * (targetStartPct / 100))
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(center, center, radius, arcStart + arcAngle * (targetEndPct / 100), progressEnd)
    ctx.stroke()
  } else {
    ctx.beginPath()
    ctx.arc(center, center, radius, arcStart, arcStart + arcAngle * (targetStartPct / 100))
    ctx.stroke()
  }

  drawTargetRangeSegment(ctx, center, innerR, outerR, arcTargetStart, arcTargetEnd)
}

const updateTooltip = () => {
  const center = props.size / 2
  const radius = center - props.strokeWidth / 2
  const [targetStartPct, targetEndPct] = computedTargetRange.value
  const midPct = (targetStartPct + targetEndPct) / 2
  const angle = arcStart + arcAngle * (midPct / 100)
  const x = center + Math.cos(angle) * (radius + 12)
  const y = center + Math.sin(angle) * (radius + 12)
  tooltipPos.value = { x, y }
}

const animate = (from, to, duration) => {
  const start = performance.now()
  const step = now => {
    const progress = Math.min((now - start) / duration, 1)
    const current = from + (to - from) * progress
    animatedValue.value = current
    const ctx = canvasRef.value.getContext('2d')
    drawArc(ctx, current)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

watch(
  () => [props.addCalories, props.targetMin, props.targetMax],
  () => {
    updateTooltip()
    animate(0, percentValue.value, props.duration)
  },
  { immediate: true }
)

onMounted(() => {
  updateTooltip()
  animate(0, percentValue.value, props.duration)
})
</script>

<style lang="scss" scoped>
@media (max-width: 400px) {
  .calorie-tooltip {
    transform: translate(-120%, -70%) !important;
    background: rgba(0, 0, 0, 0.5) !important;
    border-radius: 0.8rem !important;
  }
}
</style>
