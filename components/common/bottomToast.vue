<template>
  <Transition name="toast" appear>
    <div v-if="visible" class="bottom-toast" :class="toastClass">
      <div class="toast-content">
        <div class="toast-message">
          <slot>
            <p>
              {{ name }}님의 휴대폰({{ phone }})으로<br />
              인증번호가 전송되었습니다.
            </p>
            <p>문자메시지를 확인해주세요.</p>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  name?: string
  phone?: string
  type?: 'success' | 'error'
  duration?: number // 자동 사라지는 시간 (ms), 0이면 자동으로 안 사라짐
  modelValue?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  name: '홍길동',
  phone: '010-1234-5678',
  type: 'success',
  duration: 3000, // 3초 뒤에 사라짐
  modelValue: true
})

const emit = defineEmits<Emits>()

const visible = ref(props.modelValue)
let timer: NodeJS.Timeout | null = null

// 타입별 CSS 클래스
const toastClass = computed(() => {
  return `toast-${props.type}`
})

// 토스트 닫기 함수
const close = () => {
  visible.value = false
  emit('update:modelValue', false)
  emit('close')
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

// 토스트 자동 닫기 타이머
const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
}

// modelValue 변경 감지
watch(
  () => props.modelValue,
  newValue => {
    visible.value = newValue
    if (newValue) {
      startTimer()
    }
  }
)

onMounted(() => {
  if (visible.value) {
    startTimer()
  }
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<style scoped lang="scss">
.bottom-toast {
  position: fixed;
  bottom: 7.2rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: calc(100vw - 4rem);
  width: auto;
  min-width: 28rem;
  z-index: 9999;

  @media (min-width: 768px) {
    max-width: 48rem;
  }
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.6rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 1.2rem;
  position: relative;
}

.toast-message {
  flex: 1;
  p {
    margin: 0;
    font-size: 1.4rem;
    line-height: 140%;
    color: vars.$white;
    text-align: center;
  }
}

// 애니메이션
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(100%);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
