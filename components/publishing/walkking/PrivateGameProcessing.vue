<template>
  <div class="walking-challenge-item">
    <div class="challenge-date-limit" :class="{ before: state === 'before', ing: state === 'ing' }">
      <strong class="limit-date">{{ day }}</strong>
      <span>{{ label }}</span>
    </div>
    <div class="flex flex-row gap-4">
      <CommonBadge color="purple">무조건많이걷기</CommonBadge>
      <CommonBadge color="orange">주말영화쏘기</CommonBadge>
    </div>
    <div class="challenge-tit mt-16">
      <span class="img-wrap">
        <img src="../../../assets/images/walkingking/img-challenge-02.png" alt="" />
      </span>
      <div class="challenge-info">
        <strong class="tit">사내 걷기왕 뽑기</strong>
        <span class="during-date">2025. 06. 15 ~ 2025. 06. 30</span>
      </div>
    </div>
    <div class="current-rank">
      <div class="rank-info-wrap">
        <dl v-if="state === 'before'" class="ranking-info">
          <dt>참가자</dt>
          <dd>3<span class="total"> / 5</span></dd>
        </dl>
        <dl v-if="state === 'ing'" class="ranking-info">
          <dt>현재순위</dt>
          <dd>3<span class="total"> / 5</span></dd>
        </dl>
        <div class="total-steps">
          <i class="icon ico-shoe-green" aria-label="hidden"></i> <span class="counting">{{ formattedSteps }}</span>
        </div>
      </div>
      <div class="steps-graph">
        <i class="current-bar" :style="{ width: progressWidth + '%' }"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue'
const props = defineProps({
  state: { type: String, default: '' },
  label: { type: String, default: '' },
  day: { type: String, default: '' }
})
// 프로그레스 바 애니메이션을 위한 반응형 데이터
const progressWidth = ref(0)
const targetWidth = 90 // 최종 %

// 최대 100%로 제한하는 계산된 값
const clampedWidth = computed(() => Math.min(targetWidth, 100))

// 카운팅 애니메이션을 위한 반응형 데이터
const animatedSteps = ref(0)
const targetSteps = 324521 // 최종 도달할 숫자

// 숫자를 콤마로 구분하여 포맷팅
const formattedSteps = computed(() => {
  return animatedSteps.value.toLocaleString()
})

// 컴포넌트가 마운트된 후 애니메이션 실행
onMounted(() => {
  // 약간의 지연 후 애니메이션 시작
  setTimeout(() => {
    // 프로그레스 바 애니메이션
    progressWidth.value = clampedWidth.value

    // 카운팅 애니메이션
    startCountingAnimation()
  }, 300)
})

// 카운팅 애니메이션 함수
function startCountingAnimation() {
  const duration = 2500 // 2초 동안 애니메이션
  const startTime = Date.now()
  const startValue = 0

  function animate() {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // ease-out 효과를 위한 이징 함수
    const easeOut = 1 - Math.pow(1 - progress, 3)

    animatedSteps.value = Math.floor(startValue + (targetSteps - startValue) * easeOut)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      animatedSteps.value = targetSteps // 최종값 보장
    }
  }

  requestAnimationFrame(animate)
}
</script>

<style lang="scss" scoped>
.walking-challenge-item {
  background-color: #fff;
  border: 0.1rem solid #eee;
  border-radius: 2rem;
  padding: 2.4rem 2rem;
  position: relative;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
}
.challenge-tit {
  display: flex;
  flex-direction: row;
  gap: 0 1.2rem;
  .img-wrap {
    display: flex;
    width: 4.8rem;
    height: 4.8rem;
    background-color: #fde6bc;
    border-radius: 1.2rem;
    overflow: hidden;
    position: relative;
    flex: 0 0 auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .challenge-info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem 0;
    .tit {
      font-size: 1.6rem;
      font-weight: 700;
      color: #2b2b2b;
    }
    .during-date {
      font-size: 1.4rem;
      font-weight: 400;
      color: #555;
    }
  }
}
.challenge-date-limit {
  position: absolute;
  width: 4.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  right: 2.4rem;
  top: 0;
  padding-top: 0.8rem;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
  background: #bcdc85;
  &.before {
    background: #b7ccfc;
    &:after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='18' viewBox='0 0 48 18' fill='none'%3E%3Cpath d='M25.5606 17.6276C24.6288 18.1241 23.3711 18.1241 22.4394 17.6276L1.07785e-06 5.67085L1.2619e-06 3.5656C1.37995e-06 2.21521 1.41123 -2.58222e-07 3.99894 -3.19979e-08L44.6679 3.5234e-06C47.2556 3.74962e-06 47.3333 1.72297 47.9988 3.5656L48 5.67085L25.5606 17.6276Z' fill='%23b7ccfc'/%3E%3C/svg%3E");
    }
  }
  &.ing {
    background: #fddd66;
    &:after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='18' viewBox='0 0 48 18' fill='none'%3E%3Cpath d='M25.5606 17.6276C24.6288 18.1241 23.3711 18.1241 22.4394 17.6276L1.07785e-06 5.67085L1.2619e-06 3.5656C1.37995e-06 2.21521 1.41123 -2.58222e-07 3.99894 -3.19979e-08L44.6679 3.5234e-06C47.2556 3.74962e-06 47.3333 1.72297 47.9988 3.5656L48 5.67085L25.5606 17.6276Z' fill='%23FDDD66'/%3E%3C/svg%3E");
    }
  }
  .limit-date {
    font-size: 1.3rem;
    font-weight: 700;
  }
  &:after {
    content: '';
    display: block;
    width: 4.8rem;
    height: 1.8rem;
    position: absolute;
    left: 0;
    bottom: -1.5rem;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='18' viewBox='0 0 48 18' fill='none'%3E%3Cpath d='M25.5606 17.6276C24.6288 18.1241 23.3711 18.1241 22.4394 17.6276L1.07785e-06 5.67085L1.2619e-06 3.5656C1.37995e-06 2.21521 1.41123 -2.58222e-07 3.99894 -3.19979e-08L44.6679 3.5234e-06C47.2556 3.74962e-06 47.3333 1.72297 47.9988 3.5656L48 5.67085L25.5606 17.6276Z' fill='%23BCDC85'/%3E%3C/svg%3E");
  }
}

.current-rank {
  margin-top: 1.6rem;
  border-top: 0.1rem solid #e3e3e3;
  padding-top: 2rem;
  .rank-info-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .ranking-info {
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 0 0.4rem;
      dt {
        font-size: 1.4rem;
        color: #555;
        font-weight: 400;
      }
      dd {
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 2.2rem;
        color: #2b2b2b;
        .total {
          font-weight: 400;
          color: #959595;
        }
      }
    }
    .total-steps {
      font-size: 2rem;
      font-weight: 700;
      color: #099382;
      .icon {
        width: 2.4rem;
        height: 2.4rem;
        display: inline-block;
        margin-right: 0.4rem;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
  .steps-graph {
    width: 100%;
    position: relative;
    border-radius: 0.9rem;
    background: #eee;
    margin-top: 1.2rem;
    height: 0.6rem;
    overflow: hidden;
    .current-bar {
      border-radius: 0.9rem;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: #099382;
      transition: width 1.5s ease-out;
      will-change: width;
    }
  }
}
</style>
