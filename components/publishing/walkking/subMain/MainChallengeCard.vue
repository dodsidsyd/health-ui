<template>
  <div class="walking-challenge-item">
    <div
      class="challenge-date-limit"
      :style="{
        backgroundColor: props.limitFlagColor,
        '--tail-color': props.limitFlagColor
      }"
    >
      <strong class="limit-date"
        >{{ cardData?.daysLeft || '0' }}{{ shouldAddDayText(cardData?.daysLeft) ? '일' : '' }}</strong
      >
      <span>{{ props.limitFlagText }}</span>
      <!-- 꼬리 부분을 별도 요소로 분리 -->
      <div
        class="date-limit-tail"
        :style="{
          backgroundImage: generateDateLimitSVG(props.limitFlagColor)
        }"
      ></div>
    </div>
    <div class="flex flex-row gap-4">
      <CommonBadge color="blue">개인전</CommonBadge>
      <CommonBadge color="yellow">3,000P</CommonBadge>
      <CommonBadge color="orange">FREE</CommonBadge>
    </div>
    <div class="challenge-tit mt-12">
      <div class="challenge-info">
        <strong class="tit">{{ cardData?.title || '출퇴근 러닝 챌린지' }}</strong>
        <span class="during-date">{{ cardData?.schedule || '2025. 06. 15 ~ 2025. 06. 30' }}</span>
      </div>
    </div>
    <div class="challenge-detail">
      <dl class="reward-info">
        <dt>총 상금</dt>
        <dd>
          {{ formatPrize(cardData?.totalPrize) }}P
          <span class="increase-amount">{{ cardData?.increaseAmount || '0' }}</span>
        </dd>
      </dl>
      <dl class="recruit-number">
        <dt>참가자</dt>
        <dd>{{ cardData?.totalJoinMember || '224' }}명</dd>
      </dl>
      <i
        class="img-wrap"
        :style="{
          backgroundImage: getBackgroundImage()
        }"
      >
        <img :src="cardData?.image || ''" :alt="cardData?.imageAlt || ''" />
      </i>
    </div>
    <!-- 조건부 렌더링: rankBar가 true일 때만 표시 -->
    <div v-if="rankBar" class="current-rank">
      <div class="rank-info-wrap">
        <dl class="ranking-info">
          <dt>현재순위</dt>
          <dd>
            {{ cardData?.currentRank || 46 }}
            <span :class="['rank-number', cardData?.rankDirection || 'up']">
              {{ cardData?.rankChange || 23 }}
            </span>
          </dd>
        </dl>
        <div class="total-steps">
          <i class="icon ico-shoe" aria-label="hidden"></i>
          <span class="counting">{{ formattedSteps }}</span>
        </div>
      </div>
      <div class="steps-graph">
        <i class="current-bar" :style="{ width: progressWidth + '%' }"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps, watch } from 'vue'
import CommonBadge from '~/components/common/badge/CommonBadge.vue'

// Props 인터페이스 정의
interface CardData {
  id: number
  title: string
  schedule: string
  totalPrize?: string
  increaseAmount?: string // 상금 증가량 추가
  buttonLink?: string
  totalJoinMember?: string
  image: string
  imageAlt?: string
  limitFlagText?: string
  limitFlagColor?: string
  backgroundColorHex?: string
  eventText?: string
  daysLeft?: string | number
  currentRank?: number
  rankChange?: number
  rankDirection?: 'up' | 'down'
  currentSteps?: number
}

interface Props {
  cardData: CardData
  isActive?: boolean // 활성 상태 추가
  rankBar?: boolean // 순위 바 표시 여부 추가
  limitFlagColor?: string // 날짜 제한 플래그 색상 추가
  limitFlagText?: string // 날짜 제한 플래그 텍스트 추가
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  rankBar: false, // 기본값 false로 설정
  limitFlagColor: '#FDDD66', // 기본값 노란색
  limitFlagText: '남음' // 기본값 "남음"
})

// 상금 포맷팅 함수
const formatPrize = (prize?: string): string => {
  if (!prize) return '6,224,500'

  // 이미 포맷팅된 경우 그대로 반환
  if (prize.includes(',')) return prize

  // 숫자인 경우 콤마 추가
  return parseInt(prize).toLocaleString()
}

// 배경 패턴 생성 함수
const generateBackgroundPattern = (colorHex: string): string => {
  // hex 색상 코드 유효성 검사
  if (!colorHex || !/^[0-9A-Fa-f]{6}$/.test(colorHex)) {
    console.warn(`Invalid hex color: ${colorHex}. Using default color.`)
    colorHex = 'FFC249' // 기본 색상
  }

  const encodedColor = `%23${colorHex}` // # 인코딩
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='247' height='237' viewBox='0 0 247 237' fill='none'%3E%3Cg opacity='0.2' filter='url(%23filter0_f_14558_6565)'%3E%3Cellipse cx='184.706' cy='148.712' rx='123.4' ry='63.1021' transform='rotate(-25.7411 184.706 148.712)' fill='${encodedColor}'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_14558_6565' x='0.196289' y='0.589844' width='369.02' height='296.244' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='35' result='effect1_foregroundBlur_14558_6565'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E")`
}

// 동적 SVG 생성 함수 추가
const generateDateLimitSVG = (color: string): string => {
  // hex 색상 코드에서 # 제거
  const cleanColor = color.replace('#', '')
  const encodedColor = `%23${cleanColor}`

  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='18' viewBox='0 0 48 18' fill='none'%3E%3Cpath d='M25.5606 17.6276C24.6288 18.1241 23.3711 18.1241 22.4394 17.6276L1.07785e-06 5.67085L1.2619e-06 3.5656C1.37995e-06 2.21521 1.41123 -2.58222e-07 3.99894 -3.19979e-08L44.6679 3.5234e-06C47.2556 3.74962e-06 47.3333 1.72297 47.9988 3.5656L48 5.67085L25.5606 17.6276Z' fill='${encodedColor}'/%3E%3C/svg%3E")`
}

// 배경 이미지 계산 함수
const getBackgroundImage = (): string => {
  if (!props.cardData) return ''

  if (props.cardData.backgroundColorHex) {
    return generateBackgroundPattern(props.cardData.backgroundColorHex)
  } else if (props.cardData.backgroundPattern) {
    return props.cardData.backgroundPattern
  }

  return ''
}

// 남은 일수 형태에 따른 변경 함수
const shouldAddDayText = (daysLeft?: string | number): boolean => {
  if (!daysLeft) return true

  const text = String(daysLeft)

  // 이미 완성된 텍스트인 경우 "일"을 붙이지 않음
  const completedTextPatterns = [
    /^D-\d+$/, // D-34, D-65 형태
    /일$/ // 이미 "일"로 끝나는 경우
  ]

  return !completedTextPatterns.some(pattern => pattern.test(text))
}

// 프로그레스 바 애니메이션을 위한 반응형 데이터
const progressWidth = ref(0)
const targetWidth = 90 // 최종 %

// 최대 100%로 제한하는 계산된 값
const clampedWidth = computed(() => Math.min(targetWidth, 100))

// 카운팅 애니메이션을 위한 반응형 데이터
const animatedSteps = ref(0)

// 목표 걸음수 계산 (props에서 받거나 기본값 사용)
const targetSteps = computed(() => props.cardData?.currentSteps || 324521)

// 숫자를 콤마로 구분하여 포맷팅
const formattedSteps = computed(() => {
  return animatedSteps.value.toLocaleString()
})

// 컴포넌트가 마운트된 후 초기 설정
onMounted(() => {
  // rankBar가 true이고 첫 번째 슬라이드인 경우 즉시 애니메이션 시작
  if (props.isActive && props.rankBar) {
    console.log('Starting initial animation for:', props.cardData?.title)
    setTimeout(() => {
      startAnimations()
    }, 0)
  }
})

// isActive 상태 변경 감지
watch(
  () => props.isActive,
  (newIsActive, oldIsActive) => {
    // rankBar가 true일 때만 애니메이션 처리
    if (props.rankBar) {
      if (newIsActive) {
        // 새로운 슬라이드가 활성되면 애니메이션 시작
        resetAnimations()
        setTimeout(() => {
          startAnimations()
        }, 10) // 약간의 지연
      } else {
        resetAnimations()
      }
    }
  }
)

// rankBar 변경 감지
watch(
  () => props.rankBar,
  newRankBar => {
    if (newRankBar && props.isActive) {
      // rankBar가 true로 변경되고 활성 상태라면 애니메이션 시작
      setTimeout(() => {
        startAnimations()
      }, 10)
    } else if (!newRankBar) {
      // rankBar가 false로 변경되면 애니메이션 리셋
      resetAnimations()
    }
  }
)

// 애니메이션 시작 함수
const startAnimations = () => {
  // rankBar가 true일 때만 애니메이션 실행
  if (!props.rankBar) return

  // 프로그레스 바 애니메이션
  progressWidth.value = clampedWidth.value

  // 카운팅 애니메이션
  startCountingAnimation()
}

// 애니메이션 리셋 함수
const resetAnimations = () => {
  progressWidth.value = 0
  animatedSteps.value = 0
}

// 카운팅 애니메이션 함수
function startCountingAnimation() {
  // rankBar가 false라면 애니메이션 중단
  if (!props.rankBar) return

  const duration = 1500 // 1.5초 동안 애니메이션
  const startTime = Date.now()
  const startValue = 0
  const finalSteps = targetSteps.value

  function animate() {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // ease-out 효과를 위한 이징 함수
    const easeOut = 1 - Math.pow(1 - progress, 3)

    animatedSteps.value = Math.floor(startValue + (finalSteps - startValue) * easeOut)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      animatedSteps.value = finalSteps // 최종값 보장
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
  width: 100%;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  min-height: 21.6rem;
}

.challenge-tit {
  display: flex;
  flex-direction: row;
  gap: 0 1.2rem;

  .challenge-info {
    display: flex;
    flex-direction: column;
    gap: 0.6rem 0;

    .tit {
      font-size: 2rem;
      line-height: 2.6rem;
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

.challenge-detail {
  margin-top: 1.6rem;
  display: flex;
  gap: 0 2rem;
  position: relative;

  .reward-info,
  .recruit-number {
    display: flex;
    flex-direction: column;
    gap: 0.6rem 0;

    dt {
      font-size: 1.3rem;
      font-weight: 400;
      color: #555;
    }

    dd {
      font-size: 1.4rem;
      font-weight: 600;
      color: #2b2b2b;
      display: inline-flex;
      flex-direction: column;
      gap: 0.4rem 0;

      .increase-amount {
        font-size: 1.1rem;
        color: #f14960;
        font-weight: 700;
        position: relative;
        top: 0.1rem;
      }
    }
  }

  .img-wrap {
    position: absolute;
    right: -2rem;
    bottom: -4rem;
    width: 18rem;
    height: 18rem;
    background-position: right -2rem;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 1.2rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.challenge-date-limit {
  position: absolute;
  width: 4.8rem;
  // height: 4.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  right: 2.4rem;
  top: -0.1rem;
  padding-top: 0.8rem;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
  /* background 색상은 인라인 스타일로 처리 */

  .limit-date {
    font-size: 1.3rem;
    font-weight: 700;
  }

  .date-limit-tail {
    position: absolute;
    left: 0;
    bottom: -1.5rem;
    width: 4.8rem;
    height: 1.8rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
}

.current-rank {
  margin-top: 2rem;
  border-top: 0.1rem solid #e3e3e3;
  padding-top: 2rem;

  .rank-info-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .ranking-info {
      display: flex;
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
        color: #2b2b2b;

        .rank-number {
          font-size: 1.3rem;
          font-weight: 700;
          display: inline-flex;
          align-content: center;
          position: relative;
          top: 0.2rem;
          margin-left: 0.4rem;

          &:before {
            content: '';
            display: inline-block;
            width: 1.4rem;
            height: 1.4rem;
            position: relative;
            top: 0.2rem;
            margin-right: 0.2rem;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
          }

          &.up {
            color: #f14960;
            &:before {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M5.82294 4.16667C6.34608 3.27778 7.65392 3.27778 8.17706 4.16667L11.3159 9.5C11.839 10.3889 11.1851 11.5 10.1388 11.5H3.86118C2.8149 11.5 2.16098 10.3889 2.68412 9.5L5.82294 4.16667Z' fill='%23F14960'/%3E%3C/svg%3E");
            }
          }

          &.down {
            color: #4c7ff7;
            &:before {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cg transform='rotate(180 7 7)'%3E%3Cpath d='M5.82294 4.16667C6.34608 3.27778 7.65392 3.27778 8.17706 4.16667L11.3159 9.5C11.839 10.3889 11.1851 11.5 10.1388 11.5H3.86118C2.8149 11.5 2.16098 10.3889 2.68412 9.5L5.82294 4.16667Z' fill='%234C7FF7'/%3E%3C/g%3E%3C/svg%3E%0A");
            }
          }
        }
      }
    }

    .total-steps {
      font-size: 2rem;
      font-weight: 700;
      color: #4c7ff7;

      .icon {
        width: 2.4rem;
        height: 2.4rem;
        display: inline-block;
        margin-right: 0.4rem;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        vertical-align: middle;
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
      background: linear-gradient(90deg, #4c7ff7 0%, #6b9cff 100%);
      transition: width 1.5s ease-out;
      will-change: width;
    }
  }
}
</style>
