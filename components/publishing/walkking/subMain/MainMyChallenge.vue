<template>
  <div class="main-my-challenge">
    <CommonSwiper
      :slides="hospitalInfoList"
      :space-between="12"
      :navigation="false"
      :pagination="true"
      :custom-pagination="false"
      :scrollbar="false"
      :loop="false"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
      slide-type="custom"
      @slide-change="onSlideChange"
    >
      <template #default="{ slide, index }">
        <!-- cardData props로 전달하고 date-limit-color 추가 -->
        <MainChallengeCard
          :card-data="slide"
          :is-active="currentSlideIndex === index"
          :rank-bar="true"
          :limit-flag-color="slide.limitFlagColor ? `#${slide.limitFlagColor}` : '#FDDD66'"
        />
      </template>
    </CommonSwiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import MainChallengeCard from '~/components/publishing/walkking/subMain/MainChallengeCard.vue'
import dummyImage1 from '~/assets/images/home/img-challenge-main.svg'
import dummyImage2 from '~/assets/images/home/img-private-game.svg'
import dummyImage3 from '~/assets/images/home/img-before-challenge.svg'

// CardData 타입 정의
interface CardData {
  id: number
  title: string
  schedule: string
  totalPrize: string
  increaseAmount: string
  buttonLink: string
  totalJoinMember: string
  image: string
  imageAlt: string
  backgroundColorHex: string
  limitFlagColor: string
  daysLeft: number
  currentRank: number
  rankChange: number
  rankDirection: 'up' | 'down'
  currentSteps: number
}

interface Props {
  slides?: CardData[]
}

const props = withDefaults(defineProps<Props>(), {
  slides: () => [
    {
      id: 1,
      title: '프리썸머 챌린지',
      schedule: '2025. 06. 15 ~ 2025. 06. 30',
      totalPrize: '6,224,500',
      increaseAmount: '+45,000',
      buttonLink: 'javascript:void(0)',
      totalJoinMember: '224',
      image: dummyImage1,
      imageAlt: '프리썸머 챌린지 이미지',
      backgroundColorHex: 'FFC249', // 노란색
      limitFlagColor: 'FDDD66', // 노란색
      daysLeft: 34,
      currentRank: 46,
      rankChange: 23,
      rankDirection: 'up',
      currentSteps: 324521
    },
    {
      id: 2,
      title: '여름 다이어트 챌린지',
      schedule: '2025. 07. 01 ~ 2025. 07. 31',
      totalPrize: '5,150,000',
      increaseAmount: '+32,000',
      buttonLink: 'javascript:void(0)',
      totalJoinMember: '189',
      image: dummyImage2,
      imageAlt: '여름 다이어트 챌린지 이미지',
      backgroundColorHex: '4C7FF7', // 파란색
      limitFlagColor: '4C7FF7',
      daysLeft: 65,
      currentRank: 32,
      rankChange: 12,
      rankDirection: 'down',
      currentSteps: 298743
    },
    {
      id: 3,
      title: '건강한 출퇴근 챌린지',
      schedule: '2025. 08. 01 ~ 2025. 08. 31',
      totalPrize: '3,890,000',
      increaseAmount: '+18,500',
      buttonLink: 'javascript:void(0)',
      totalJoinMember: '156',
      image: dummyImage3,
      imageAlt: '건강한 출퇴근 챌린지 이미지',
      backgroundColorHex: 'F14960', // 분홍색
      limitFlagColor: 'F14960',
      daysLeft: 95,
      currentRank: 18,
      rankChange: 5,
      rankDirection: 'up',
      currentSteps: 412896
    }
  ]
})

// 슬라이드 데이터 - 타입을 CardData[]로 수정
const hospitalInfoList = ref<CardData[]>(props.slides)
const currentSlideIndex = ref(0)

// 슬라이드 변경 이벤트 핸들러
const onSlideChange = (swiperInstance: any) => {
  console.log('MainMyChallenge - onSlideChange called:', swiperInstance)
  const newIndex = swiperInstance.realIndex !== undefined ? swiperInstance.realIndex : swiperInstance.activeIndex
  console.log('MainMyChallenge - Setting currentSlideIndex to:', newIndex)
  currentSlideIndex.value = newIndex
}
</script>

<style scoped lang="scss">
// ::part() 선택자를 사용한 pagination 스타일링
:deep(swiper-container::part(pagination)) {
  position: relative;
  margin-top: 1rem;
}

:deep(swiper-container::part(bullet)) {
  background-color: #e8e8e8 !important;
  opacity: 1;
}

// 활성 bullet 스타일링
:deep(swiper-container::part(bullet-active)) {
  background-color: #4f5561 !important;
}
</style>
