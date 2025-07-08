<template>
  <div style="position: relative; display: inline-block">
    <img
      v-if="signatureSrc"
      :src="signatureSrc"
      alt="signature"
      style="height: 200px; width: 100%; border: 1px solid gainsboro; touch-action: none"
    />
    <template v-else-if="!signatureSrc">
      <canvas
        ref="canvas"
        style="height: 200px; border: 1px solid gainsboro; touch-action: none"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @touchcancel="touchCancel"
      ></canvas>
      <div
        id="placeholder"
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: gray;
          pointer-events: none;
          text-align: center;
        "
      >
        <span>손가락으로 직접<br />여기에 서명해 주세요</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
interface SignatureProps {
  isLoading?: boolean
  src?: string
}

const props = withDefaults(defineProps<SignatureProps>(), {
  isLoading: false,
  src: ''
})

const canvas = ref()
const ctx = ref()
const startX = ref(0)
const startY = ref(0)
const drawing = ref(false)

const placeholderElement = computed(() => document.getElementById('placeholder') as HTMLElement)

// placeholder 부분 보이지 않게 처리
const hidePlaceholder = () => {
  placeholderElement.value.style.display = 'none'
}

const getTouchPos = (e: TouchEvent) => {
  const touch = e.touches[0] || e.changedTouches[0]
  const rect = canvas.value.getBoundingClientRect()
  const scaleX = canvas.value.width / rect.width
  const scaleY = canvas.value.height / rect.height

  return {
    x: (touch.clientX - rect.left) * scaleX,
    y: (touch.clientY - rect.top) * scaleY
  }
}

const touchStart = (e: TouchEvent) => {
  e.preventDefault()
  const pos = getTouchPos(e)
  startX.value = pos.x
  startY.value = pos.y
  drawing.value = true
}

const touchMove = (e: TouchEvent) => {
  if (!drawing.value) return

  hidePlaceholder()

  const pos = getTouchPos(e)
  draw(pos.x, pos.y)

  startX.value = pos.x
  startY.value = pos.y
}

const touchEnd = async (e: TouchEvent) => {
  drawing.value = false

  // 이미지로 만들기
  const img = await getCanvasBlob()
  console.log('이미지', img)
  // emit('get-signature', e)
}

const touchCancel = (e: TouchEvent) => {
  drawing.value = false
}

// 선그리기: startX, startY부터 입력받은 curX, curY 까지로 선을 그린다.
const draw = (curX: number, curY: number) => {
  ctx.value.beginPath()
  ctx.value.moveTo(startX.value, startY.value)
  ctx.value.lineTo(curX, curY)
  ctx.value.stroke()
}

const getCanvasBlob = async (): Promise<Blob> => {
  return new Promise(resolve => {
    canvas.value.toBlob((blob: any) => {
      if (blob) resolve(blob)
    }, 'image/png') // 'image/jpeg' 도 가능
  })
}

// canvas 초기값 설정
const setCanvasInitial = () => {
  if (!canvas.value) {
    return
  }
  ctx.value = canvas.value.getContext('2d')
  ctx.value.fillStyle = 'white'
  ctx.value.lineWidth = 2
  ctx.value.fillRect(0, 0, 500, 500)
}

onMounted(() => {
  setCanvasInitial()
})

const signatureSrc = computed(() => {
  return props.src
})
</script>

<style scoped lang="scss"></style>
