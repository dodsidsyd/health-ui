<template>
  <div class="lottie-animation" ref="lottieContainer"></div>
</template>

<script setup lang="ts">
interface Props {
  src: string // JSON 파일 경로
  loop?: boolean
  autoplay?: boolean
  speed?: number // 재생 속도 추가
  width?: string
  height?: string
  loadingText?: string
}

const props = withDefaults(defineProps<Props>(), {
  loop: true,
  autoplay: true,
  speed: 1, // 기본 속도 1x
  width: '',
  height: '',
  loadingText: '로딩 중...'
})

// 상태 관리
const lottieContainer = ref<HTMLElement>()
const isLoading = ref(true)
const error = ref('')
let animation: any = null

// Lottie 애니메이션 로드
const loadAnimation = async () => {
  try {
    isLoading.value = true
    error.value = ''

    // lottie-web 로드
    const lottie = await import('lottie-web')

    // JSON 파일 로드
    const response = await fetch(props.src)
    if (!response.ok) {
      throw new Error(`파일을 불러올 수 없습니다: ${props.src}`)
    }
    const animationData = await response.json()

    // 기존 애니메이션 정리
    if (animation) {
      animation.destroy()
    }

    // 새 애니메이션 생성
    if (lottieContainer.value) {
      animation = lottie.default.loadAnimation({
        container: lottieContainer.value,
        renderer: 'svg',
        loop: props.loop,
        autoplay: props.autoplay,
        animationData: animationData
      })

      animation.addEventListener('DOMLoaded', () => {
        isLoading.value = false
        // 속도 설정
        animation.setSpeed(props.speed)
      })
    }
  } catch (err) {
    error.value = err.message
    isLoading.value = false
    console.error('Lottie 로드 실패:', err)
  }
}

// 컨트롤 메서드들 (외부에서 사용 가능)
const play = () => animation?.play()
const pause = () => animation?.pause()
const stop = () => animation?.stop()
const setSpeed = (speed: number) => animation?.setSpeed(speed)

// 외부에서 사용할 수 있도록 expose
defineExpose({
  play,
  pause,
  stop,
  setSpeed
})

// 컴포넌트 마운트 시 로드
onMounted(() => {
  loadAnimation()
})

// src 변경 감지
watch(
  () => props.src,
  () => {
    loadAnimation()
  }
)

// speed 변경 감지
watch(
  () => props.speed,
  newSpeed => {
    if (animation) {
      animation.setSpeed(newSpeed)
    }
  }
)

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  if (animation) {
    animation.destroy()
  }
})
</script>
