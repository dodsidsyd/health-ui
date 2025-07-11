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
      <div class="main-challenge-card">
        <div class="challenge-date-limit">
          <strong class="limit-date">{{ slide.daysLeft }}일</strong>
          <span>남음</span>
        </div>
        <div class="card-contents">
          <span class="cate-txt">{{ slide.category }}</span>
          <strong class="tit" v-html="slide.title"></strong>
          <span class="challenge-schedule">{{ slide.schedule }}</span>
        </div>
        <div class="btn-wrap my-rank">
          <span class="my-rank-txt"
            >현재 순위 <em :class="['rank-change', slide.rankUp || 'up']">{{ slide.rankChangeNum }}</em></span
          >
          <nuxt-link :to="slide.buttonLink || 'javascript:void(0)'" class="cbtn btn-rank">
            <span class="text-wrap">{{ slide.rankNum }}<em>등</em></span>
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
  rankNum: number
  rankChangeNum: number
  rankUp: string
  buttonLink?: string
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
      rankNum: 135,
      rankChangeNum: 20,
      rankUp: 'down',
      buttonLink: 'javascript:void(0)',
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
      rankNum: 99,
      rankChangeNum: 10,
      rankUp: 'up',
      buttonLink: 'javascript:void(0)',
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
      rankNum: 3,
      rankChangeNum: 100,
      rankUp: 'down',
      buttonLink: 'javascript:void(0)',
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
    &.my-rank {
      display: flex;
      flex-direction: column;
      gap: 0.4rem 0;
      .my-rank-txt {
        font-size: 1.2rem;
        color: #222;
        font-weight: 400;
        display: inline-flex;
        gap: 0 0.6rem;
        .rank-change {
          font-size: 1.2rem;
          font-weight: 500;
          display: inline-flex;
          align-content: center;
          gap: 0 0.4rem;
          &::before {
            content: '';
            display: inline-block;
            width: 1.4rem;
            height: 1.4rem;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          }
          &.up {
            color: #ee3739;
            &::before {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M7.15482 4.7619C7.7527 3.74603 9.24737 3.74603 9.84524 4.7619L13.4325 10.8571C14.0303 11.873 13.283 13.1429 12.0873 13.1429H4.91281C3.71707 13.1429 2.96973 11.873 3.5676 10.8571L7.15482 4.7619Z' fill='%23F14960'/%3E%3C/svg%3E");
            }
          }
          &.down {
            color: #4c7ff7;
            &::before {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M6.65482 12.3807C7.2527 13.3965 8.74737 13.3965 9.34524 12.3807L12.9325 6.28543C13.5303 5.26956 12.783 3.99972 11.5873 3.99972H4.41281C3.21707 3.99972 2.46973 5.26956 3.0676 6.28543L6.65482 12.3807Z' fill='%234C7FF7'/%3E%3C/svg%3E");
            }
          }
        }
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

    &.btn-rank {
      background: rgba(228, 228, 228, 0.5);
      color: #222;
      font-size: 1.8rem;
      padding: 0.8rem 1.2rem;
      font-weight: 700;
      @include mixin.rippleEffectPrimary;
      .text-wrap {
        display: inline-flex;
        align-items: center;
        em {
          font-size: 1.6rem;
          font-weight: 500;
        }
        &::before {
          content: '';
          display: inline-block;
          width: 2.1rem;
          height: 2.4rem;
          margin-right: 0.4rem;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          background-image: url('~/assets/images/home/ico-challenge-rank.svg');
        }

        &:after {
          content: '';
          width: 2rem;
          height: 2rem;
          display: inline-block;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7.49984 5.83301L11.6665 9.99967L7.49984 14.1663' stroke='%232b2b2b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        }
      }
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
