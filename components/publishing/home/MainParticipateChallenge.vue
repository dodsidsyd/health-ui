<template>
  <CommonSwiper
    :slides="mainChallengeSlides"
    slide-type="custom"
    :slides-per-view="1"
    :space-between="30"
    :navigation="false"
    :pagination="true"
    :scrollbar="false"
    :autoplay="false"
    :show-slide-length="false"
    :show-play-pause-button="false"
  >
    <template #default="{ slide, index }">
      <div class="main-challenge-card in-challenge">
        <div class="challenge-date-limit">
          <strong class="limit-date">{{ slide.daysLeft }}일</strong>
          <span>남음</span>
        </div>
        <div class="card-contents">
          <span class="cate-txt">{{ slide.category }}</span>
          <strong class="tit" v-html="slide.title"></strong>
          <span class="challenge-schedule">{{ slide.schedule }}</span>
        </div>
        <div class="btn-wrap">
          <!-- 이벤트 문구가 있다면 -->
          <i v-if="slide.showEvent && slide.eventText" class="event-balloon">{{ slide.eventText }}</i>
          <nuxt-link :to="slide.buttonLink || 'javascript:void(0)'" :class="['cbtn', slide.buttonClass || 'btn-blue']">
            {{ slide.buttonText }}
          </nuxt-link>
        </div>

        <i
          class="img-wrap"
          :style="{
            backgroundImage: slide.backgroundColorHex
              ? generateBackgroundPattern(slide.backgroundColorHex)
              : slide.backgroundPattern
          }"
        >
          <img :src="slide.image" :alt="slide.imageAlt || ''" />
        </i>
      </div>
    </template>
  </CommonSwiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'

// 슬라이드 데이터 타입 정의
interface ChallengeSlide {
  id: number
  category: string
  title: string
  schedule: string
  buttonText: string
  buttonLink?: string
  buttonClass?: string
  image: string
  imageAlt?: string
  backgroundPattern?: string
  backgroundColorHex?: string // 배경 색상 hex 코드 (예: 'FFC249')
  eventText?: string // 이벤트 말풍선 텍스트 추가
  showEvent?: boolean // 이벤트 말풍선 표시 여부
  daysLeft?: number // 남은 일수
}

// Props 정의
interface Props {
  slides?: ChallengeSlide[]
}
import dummyImage1 from '~/assets/images/home/img-challenge-main.svg'
import dummyImage2 from '~/assets/images/home/img-private-game.svg'

// 배경 패턴 생성 공통 함수
const generateBackgroundPattern = (colorHex: string): string => {
  const encodedColor = `%23${colorHex}` // # 인코딩
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='247' height='237' viewBox='0 0 247 237' fill='none'%3E%3Cg opacity='0.2' filter='url(%23filter0_f_14558_6565)'%3E%3Cellipse cx='184.706' cy='148.712' rx='123.4' ry='63.1021' transform='rotate(-25.7411 184.706 148.712)' fill='${encodedColor}'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_14558_6565' x='0.196289' y='0.589844' width='369.02' height='296.244' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='35' result='effect1_foregroundBlur_14558_6565'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E")`
}

const props = withDefaults(defineProps<Props>(), {
  slides: () => [
    {
      id: 1,
      category: '여름에는 걸어야지',
      title: '프리썸머 챌린지',
      schedule: '2025. 06. 15 ~ 2025. 06. 30',
      buttonText: '참가신청하기',
      buttonLink: 'javascript:void(0)',
      buttonClass: 'btn-blue',
      image: dummyImage1,
      imageAlt: '이미지 설명 없으면 빈칸',
      backgroundColorHex: 'FFC249', // 노란색
      eventText: '1등 하고 보라카이 호핑투어 가자',
      showEvent: true,
      daysLeft: 34
    },
    {
      id: 2,
      category: '여름에는 걸어야지',
      title: '프리썸머 챌린지 <br /> 프리썸머 챌린지',
      schedule: '2025. 06. 15 ~ 2025. 06. 30',
      buttonText: '챌린지 참가참가',
      buttonLink: 'javascript:void(0)',
      buttonClass: 'btn-green',
      image: dummyImage2,
      imageAlt: '이미지 설명 없으면 빈칸',
      backgroundColorHex: '49FF79', // 초록색
      eventText: '2등 하고 집에 가자',
      showEvent: true,
      daysLeft: 21
    },
    {
      id: 3,
      category: '여름에는 걸어야지 여름에는 걸어야지',
      title: '프리썸머 챌린지 1234',
      schedule: '2025. 06. 15 ~ 2025. 06. 30',
      buttonText: '참가참가 챌린지',
      buttonLink: 'javascript:void(0)',
      buttonClass: 'btn-purple',
      image: dummyImage1,
      imageAlt: '이미지 설명 없으면 빈칸',
      backgroundColorHex: 'B649FF', // 보라색
      eventText: '',
      showEvent: false,
      daysLeft: 0
    }
  ]
})

// 슬라이드 데이터
const mainChallengeSlides = ref<ChallengeSlide[]>(props.slides)

// 이벤트 정의
const emit = defineEmits<{
  slideClick: [slide: ChallengeSlide, index: number]
}>()
</script>

<style lang="scss" scoped>
.main-challenge-card {
  border-radius: 2rem;
  padding: 2.8rem;
  padding-bottom: 4.2rem;
  border: 0.1rem solid #eee;
  background: #fff;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 26rem;
  position: relative;
  overflow: hidden;
  justify-content: space-between;
  align-items: flex-start; // 버튼을 왼쪽 정렬로 제한
  .card-contents {
    display: flex;
    flex-direction: column;
    gap: 0.4rem 0;
    padding-right: 5rem;
    .cate-txt {
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 140%;
      color: #666;
    }
    .tit {
      font-size: 2.4rem;
      font-weight: 700;
      color: #f15219;
      line-height: 105%;
    }
    .challenge-schedule {
      font-size: 1.4rem;
      color: #555;
      font-weight: 500;
    }
  }
  .btn-wrap {
    position: relative;
    color: #fff;
    .event-balloon {
      background: #2b2b2b;
      display: block;
      padding: 0.5rem 1rem 0.4rem;
      border-radius: 2rem;
      width: auto;
      white-space: nowrap;
      position: absolute;
      top: -3.2rem;
      font-size: 1.2rem;
      font-weight: 400;
      z-index: 2;
      &::before {
        content: '';
        width: 1.2rem;
        height: 0.8rem;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        bottom: -0.8rem;
        left: 1.2rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cg clip-path='url(%23clip0_14558_8956)'%3E%3Cpath d='M2 -1H10C10.824 -1 11.2944 -0.0592363 10.8 0.6L6.8 5.93333C6.4 6.46667 5.6 6.46667 5.2 5.93333L1.2 0.6C0.705572 -0.0592362 1.17595 -1 2 -1Z' fill='%232B2B2B'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_14558_8956'%3E%3Crect width='12' height='8' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
      }
    }
  }
  .cbtn {
    display: inline-block;
    flex: 0 0 auto;
    width: auto; // 강제로 auto 설정
    align-self: flex-start; // flex 컨테이너 내에서 자체 크기 유지
    font-size: 1.6rem;
    line-height: 2.2rem;
    font-weight: 500;
    border-radius: 0.6rem;
    padding: 0.9rem 1.6rem;
    position: relative;
    transition: all 0.2s ease;
    text-decoration: none;
    @include mixin.rippleEffectWhite;

    &.btn-blue {
      background: #4c7ff7;
      color: #fff;
    }

    &.btn-green {
      background: #099382;
      color: #fff;
    }

    &.btn-purple {
      background: #8e44ad;
      color: #fff;
    }
  }
  .img-wrap {
    position: absolute;
    right: 0;
    bottom: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    img {
      display: block;
      max-width: 100%;
      height: auto;
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
  background: #fddd66;
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
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='18' viewBox='0 0 48 18' fill='none'%3E%3Cpath d='M25.5606 17.6276C24.6288 18.1241 23.3711 18.1241 22.4394 17.6276L1.07785e-06 5.67085L1.2619e-06 3.5656C1.37995e-06 2.21521 1.41123 -2.58222e-07 3.99894 -3.19979e-08L44.6679 3.5234e-06C47.2556 3.74962e-06 47.3333 1.72297 47.9988 3.5656L48 5.67085L25.5606 17.6276Z' fill='%23FDDD66'/%3E%3C/svg%3E");
  }
}
@media (max-width: 375px) {
  .main-able-card {
    padding: 2rem;
    padding-bottom: 3.2rem;
    .cbtn {
      padding: 0.4rem 1.2rem;
      font-size: 1.4rem;
    }
    .img-wrap {
      width: 15rem;
    }
  }
}
</style>
