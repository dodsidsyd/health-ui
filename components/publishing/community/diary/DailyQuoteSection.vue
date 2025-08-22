<template>
  <section class="daily-quote-section">
    <div class="title-box">
      <div>
        <strong class="blue">오늘 한마디</strong>
        <p>할 말이 떠오르지 않는다면 질문에 답해보세요</p>
      </div>
      <i class="icon"></i>
    </div>
    <CommonSwiper
      :slides="slideList"
      slide-type="custom"
      :slides-per-view="'auto'"
      :space-between="12"
      :slides-offset-before="20"
      :slides-offset-after="20"
      :navigation="false"
      :pagination="false"
      :loop="false"
      :scrollbar="false"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
      class="question-swiper"
    >
      <template #default="{ slide }">
        <QuestionCard 
          :custom-class="(slide as Slide).customClass" 
          :emoji="(slide as Slide).emoji" 
          :questions="(slide as Slide).questions" 
        />
      </template>
    </CommonSwiper>
  </section>
</template>
<script setup lang="ts">
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import QuestionCard from './QuestionCard.vue'

interface Slide {
  id: number
  customClass: string
  emoji: string
  questions: string[]
}
const slideList = [
  { 
    id: 1, 
    customClass: 'type1', 
    emoji: 'thrilled.svg', 
    questions: [
      '오늘 나를 웃게 만든 순간은 언제였나요?',
      '요즘 내가 잘하고 있다고 느낀 부분은 언제였나요?',
      '지금 기분을 색으로 표현한다면 어떤 색일까요?',
    ]
  },
  { 
    id: 2, 
    customClass: 'type2', 
    emoji: 'sad.svg', 
    questions: [
      '오늘 하루 중 가장 힘들었던 순간은 언제였나요?',
      '지금 마음이 무거운 이유는 무엇인가요?',
      '나를 지치게 만든 일이 있으셨나요?',
    ]
  },
  { 
    id: 3, 
    customClass: 'type3', 
    emoji: 'peaceful.svg', 
    questions: [
      '오늘 지나간 하루 중 기억에 남는 장면이 있으셨나요?',
      '오늘이 평범하게 느껴졌던 이유는 무엇인가요?',
      '마음이 조용하다고 느낀 순간은 언제였나요?',
    ]
  }
]
</script>
<style scoped lang="scss">
.daily-quote-section {
  margin: 0 -2rem;

  :deep(swiper-slide) {
    width: 24rem;
  }
}
.title-box {
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2rem 1.6rem;
  .blue {
    font-size: 1.8rem;
    color: #4776e5;
  }
  p {
    display: block;
    font-size: 1.6rem;
    font-weight: 500;
    color:#555;
  }
  .icon {
    display:block;
    width: 3.2rem;
    height: 3.2rem;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='33' viewBox='0 0 32 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.66683 15.1666C2.66683 7.80279 8.63637 1.83325 16.0002 1.83325C23.364 1.83325 29.3335 7.80279 29.3335 15.1666C29.3335 22.5304 23.364 28.4999 16.0002 28.4999C8.63637 28.4999 2.66683 22.5304 2.66683 15.1666Z' fill='%234776E5'/%3E%3Cpath d='M25.3335 24.6875L29.3335 28.5009H16.0002V25.8342L25.3335 24.6875Z' fill='%234776E5'/%3E%3Cpath d='M12.6665 16.5H21.9998C22.368 16.5 22.6665 16.7985 22.6665 17.1667V18.5C22.6665 18.8682 22.368 19.1667 21.9998 19.1667H12.6665C12.2983 19.1667 11.9998 18.8682 11.9998 18.5V17.1667C11.9998 16.7985 12.2983 16.5 12.6665 16.5Z' fill='white'/%3E%3Cpath d='M9.99984 11.1667H21.9998C22.368 11.1667 22.6665 11.4652 22.6665 11.8334V13.1667C22.6665 13.5349 22.368 13.8334 21.9998 13.8334H9.99984C9.63165 13.8334 9.33317 13.5349 9.33317 13.1667V11.8334C9.33317 11.4652 9.63165 11.1667 9.99984 11.1667Z' fill='white'/%3E%3C/svg%3E%0A");
  }
}

@media (min-width: 768px) {
  .daily-quote-section {
    :deep(swiper-slide) {
    width: 30rem;
  }
  }
}

</style>
