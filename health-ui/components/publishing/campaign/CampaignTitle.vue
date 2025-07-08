<template>
  <div class="campaign-wrap">
    <h2 class="campaign-tit">친환경 캠페인</h2>
    <div class="campaign-txt">
      회원님의 걷기운동으로<br />우리의 지구 탄소가<br />
      <p class="how-decrease">
        <strong v-for="(digit, index) in digits" :key="index">{{ digit }}</strong>
      </p>
      kg<br />감소하였습니다.
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// Props로 목표값을 받을 수 있도록 개선 (선택사항)
interface Props {
  targetNumber?: number
}

const props = withDefaults(defineProps<Props>(), {
  targetNumber: 468 // 지구 탄소 감소 숫자
})

// 카운팅 애니메이션을 위한 반응형 데이터
const animatedValue = ref(0)
const targetValue = computed(() => props.targetNumber)

// 동적으로 자릿수 배열 생성
const digits = computed(() => {
  const valueStr = animatedValue.value.toString()
  return valueStr.split('').map(Number)
})

// 컴포넌트가 마운트된 후 애니메이션 실행
onMounted(() => {
  // 약간의 지연 후 애니메이션 시작
  setTimeout(() => {
    startCountingAnimation()
  }, 500)
})

// 카운팅 애니메이션 함수
function startCountingAnimation() {
  const duration = 2000 // 2초 동안 애니메이션
  const startTime = Date.now()
  const startValue = 0
  const target = targetValue.value // computed 값을 가져옴

  function animate() {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // ease-out 효과를 위한 이징 함수
    const easeOut = 1 - Math.pow(1 - progress, 3)

    animatedValue.value = Math.floor(startValue + (target - startValue) * easeOut)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      animatedValue.value = target // 최종값 보장
    }
  }

  requestAnimationFrame(animate)
}
</script>
<style scoped lang="scss">
.campaign-wrap {
  position: relative;
  padding-top: 2rem;
  height: 46rem;
  background: #c5f2f7;
  &::before {
    content: '';
    display: block;
    position: absolute;
    height: 32.6rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('~/assets/images/benefit/bg-attendance.svg');
  }
  .campaign-tit,
  .campaign-txt {
    position: relative;
  }
}
.campaign-tit {
  font-size: var(--num-24);
  text-align: center;
  color: #009f3a;
}
.campaign-txt {
  margin-top: 0.4rem;
  font-weight: vars.$bold;
  font-size: var(--num-28);
  line-height: 130%;
  text-align: center;
  .how-decrease {
    display: inline-flex;
    margin-right: 0.5rem;
    border-radius: 0.8rem;
    border: 0.1rem solid rgba(255, 255, 255, 0.7);
    font-size: var(--num-24);
    strong {
      display: inline-block;
      padding: 0.3rem 0.7rem;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.3) 25%,
        rgba(255, 255, 255, 0.3) 75%,
        rgba(255, 255, 255, 0.15) 100%
      );

      & + strong {
        border-left: 0.1rem solid rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>
