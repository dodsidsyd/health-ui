<template>
  <div class="walking-challenge-item">
    <div
      class="challenge-date-limit"
      :style="{
        backgroundColor: props.limitFlagColor,
        '--tail-color': props.limitFlagColor
      }"
    >
      <strong class="limit-date">{{ daysLeft || '0' }}{{ shouldAddDayText(daysLeft) ? '일' : '' }}</strong>
      <span>{{ props.limitFlagText }}</span>
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
      <CommonBadge color="purple">많이걷기</CommonBadge>
    </div>
    <div class="challenge-tit mt-16">
      <div class="challenge-info">
        <strong class="tit">16th 하이워킹 챌린지</strong>
        <span class="during-date">2025.06.15 ~ 06.30</span>
      </div>
    </div>
    <div class="challenge-detail">
      <dl class="reward-info">
        <dt>총 상금</dt>
        <dd>6,224,500P</dd>
        <dd class="increase-amount">+45,000</dd>
      </dl>
      <dl class="recruit-number">
        <dt>참가자</dt>
        <dd>224명</dd>
        <dd class="increase-amount">+28</dd>
      </dl>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

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
  isActive?: boolean // 활성 상태 추가
  limitFlagColor?: string // 날짜 제한 플래그 색상 추가
  limitFlagText?: string // 날짜 제한 플래그 텍스트 추가
  daysLeft: string | number
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
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
</script>
<style lang="scss" scoped>
.walking-challenge-item {
  position: relative;
  padding: 3.2rem 2rem 2rem 2rem;
  background-color: #dae7f1;
  border: 0.1rem solid #eee;
  border-radius: 2rem;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  &::after {
    content: '';
    z-index: 0;
    position: absolute;
    width: 18rem;
    height: 22rem;
    top: 0;
    right: 0;
    background: url(~/assets/images/walkingking/img-walkingking-card.png) center / contain no-repeat;
  }
}
.challenge-tit {
  display: flex;
  flex-direction: row;
  gap: 0 1.2rem;
  .challenge-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem 0;
    .tit {
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 2.9rem;
    }
    .during-date {
      color: #555;
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
}
.challenge-detail {
  position: relative;
  z-index: 1;
  display: flex;
  margin-top: 4.7rem;
  gap: 1.2rem;
  .reward-info,
  .recruit-number {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
    padding: 1.6rem 2rem 1.2rem;
    background-color: #fff;
    border-radius: 1.2rem;
    box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
    dt {
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 1.6rem;
      color: #555;
    }
    dd {
      font-weight: 700;
      line-height: 2.2rem;
      &.increase-amount {
        font-size: 1.2rem;
        font-weight: 600;
        color: #f14960;
        line-height: 1.6rem;
      }
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
  background: #b7ccfc;
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
</style>
