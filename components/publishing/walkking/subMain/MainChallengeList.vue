<template>
  <FlexColDiv class="main-challenge-list gap-12">
    <MainChallengeCard
      v-for="card in cards"
      :key="card.id"
      :card-data="card"
      :rank-bar="false"
      :limit-flag-color="card.limitFlagColor ? `#${card.limitFlagColor}` : '#FDDD66'"
      :limit-flag-text="card.limitFlagText || '남음'"
    />
    <div class="more-btn-wrap">
      <button type="button" class="btn-more">더보기 <i class="icon arrow-down-type"></i></button>
    </div>
  </FlexColDiv>
</template>

<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import MainChallengeCard from '~/components/publishing/walkking/subMain/MainChallengeCard.vue'
import Button from '~/components/publishing/Button/Button.vue'
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
  limitFlagColor?: string
  backgroundColorHex?: string
  limitFlagText?: string
  daysLeft?: string | number
  currentRank: number
  rankChange: number
  rankDirection: 'up' | 'down'
  currentSteps: number
}

interface Props {
  cards?: CardData[]
}

const props = withDefaults(defineProps<Props>(), {
  cards: () => [
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
      limitFlagColor: 'BCDC85',
      limitFlagText: '대기중',
      daysLeft: 'D-7',
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
      limitFlagColor: 'B7CCFC',
      limitFlagText: '모집중',
      daysLeft: 'D-34',
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
      limitFlagColor: 'B7CCFC',
      limitFlagText: '모집중',
      daysLeft: 'D-34',
      currentRank: 18,
      rankChange: 5,
      rankDirection: 'up',
      currentSteps: 412896
    }
  ]
})
</script>

<style scoped lang="scss">
.more-btn-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 1.2rem;
  .btn-more {
    width: 9.8rem;
    line-height: 4rem;
    font-size: 1.4rem;
    font-weight: 500;
    border-radius: 3.2rem;
    color: #555;
    border: 0.1rem solid #e2e2e2;
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
    @include mixin.rippleEffectPrimary;
    .icon {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
    }
  }
}
</style>
