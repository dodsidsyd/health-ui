<template>
  <section class="diary-detail-view">
    <FlexColDiv>
      <div class="date-display mt-20 mb-24">
        <span class="date-label">{{ pageTitle }}</span>
      </div>
    </FlexColDiv>

    <FlexColDiv class="">
      <div v-if="diary?.emoji?.src" class="emoji-box">
        <!-- 오늘 한마디 모드일 때 특별한 형식 -->

        <template v-if="diary?.isDailyQuote">
          <div class="daily-quote-box">
            <p class="daily-quote-label">오늘 한마디</p>
            <p class="daily-quote-question" v-html="getCleanQuestion(diary.dailyQuoteQuestion || '')"></p>
          </div>
          <img :src="diary.emoji.src" :alt="diary.emoji.label" />
          <p>오늘 마음은 {{ diary.emoji.label }}!</p>
        </template>
        <template v-else>
          <img :src="diary.emoji.src" :alt="diary.emoji.label" />
          <p>오늘 마음은 {{ diary.emoji.label }}!</p>
        </template>
      </div>

      <FieldSet
        v-model="diaryContent"
        class="diary-fieldset"
        placeholder="편하게 마음속 이야기를 남겨보세요. 마음일기는 나만 볼 수 있어요."
        :max-length="999"
        :disabled="true"
      />

      <!-- 이미지 표시 -->
      <div v-if="diary?.images && diary.images.length > 0" class="diary-images">
        <CommonSwiper
          :slides="diary.images"
          slide-type="image"
          v-bind="SWIPER_PRESETS.diaryDetail"
          class="diary-image-swiper"
        />
      </div>

      <ButtonGroup class="is-fixed">
        <Button
          btn-type="primary"
          element-type="a"
          href="/community/diary/list"
          aria-label="확인"
          class="lg w-full medium btn-sticky"
        />
      </ButtonGroup>
    </FlexColDiv>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FieldSet from '~/components/publishing/input/FieldSet.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
// 타입 정의
interface Diary {
  id: number
  date: string
  emoji: {
    src: string
    label: string
  }
  content: string
  images?: string[]
  createdAt: string
  isDailyQuote?: boolean
  dailyQuoteQuestion?: string
}

// CommonSwiper 프리셋 설정
const SWIPER_PRESETS = {
  diaryDetail: {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: true,
    navigation: false,
    loop: false,
    showSlideLength: false,
    showPlayPauseButton: false
  }
} as const

interface Props {
  diary: Diary | null
}

const props = defineProps<Props>()

// Daily-quote 질문에서 <br/> 태그 제거
const getCleanQuestion = (question: string) => {
  if (question) {
    return question.replace(/<br\s*\/?>/gi, ' ')
  }
  return ''
}

// 페이지 제목 (날짜 포맷)
const pageTitle = computed((): string => {
  if (!props.diary?.date) return '마음 일기'

  const date = new Date(props.diary.date)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  const weekday = weekdays[date.getDay()]

  return `${month}월 ${day}일 ${weekday}요일`
})

// 다이어리 내용
const diaryContent = computed(() => props.diary?.content || '')
</script>

<style lang="scss" scoped>
.diary-detail-view {
  width: 100%;
}

.date-display {
  display: flex;
  align-items: center;
  justify-content: center;

  .date-label {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }
}

.diary-fieldset {
  margin: 1.6rem 0;
  padding-top: 1.6rem;
  border-top: 0.1rem solid #e2e2e2;
  :deep(.c-texttype) {
    &:has(.c-textarea:disabled) {
      background: none;
    }
    padding: 0;
    border: none;
    height: auto;
    min-height: 5.8rem;
    .group_feedback {
      display: none;
    }
  }
}

.emoji-box {
  gap: 1.6rem;
  display: inline-flex;
  flex-direction: column;
  img {
    width: 6rem;
    height: 6rem;
    margin: 0 auto;
  }
  p {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.5rem;
  }
}

.daily-quote-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  overflow: hidden;
  padding: 1.6rem 2rem;
  background: #fcf1e9;
  border-radius: 2rem;

  .daily-quote-label {
    display: inline-block;
    font-size: 1.4rem;
    font-weight: 600;
    color: #4776e5;
    line-height: 2rem;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.33317 7.33317C1.33317 3.65127 4.31794 0.666504 7.99984 0.666504C11.6817 0.666504 14.6665 3.65127 14.6665 7.33317C14.6665 11.0151 11.6817 13.9998 7.99984 13.9998C4.31794 13.9998 1.33317 11.0151 1.33317 7.33317Z' fill='%234C7FF7'/%3E%3Cpath d='M12.6665 12.0938L14.6665 14.0004H7.99984V12.6671L12.6665 12.0938Z' fill='%234C7FF7'/%3E%3Cpath d='M6.3335 8H11.0002C11.1843 8 11.3335 8.14924 11.3335 8.33333V9C11.3335 9.18409 11.1843 9.33333 11.0002 9.33333H6.3335C6.1494 9.33333 6.00016 9.18409 6.00016 9V8.33333C6.00016 8.14924 6.1494 8 6.3335 8Z' fill='white'/%3E%3Cpath d='M5.00016 5.3335H11.0002C11.1843 5.3335 11.3335 5.48273 11.3335 5.66683V6.3335C11.3335 6.51759 11.1843 6.66683 11.0002 6.66683H5.00016C4.81607 6.66683 4.66683 6.51759 4.66683 6.3335V5.66683C4.66683 5.48273 4.81607 5.3335 5.00016 5.3335Z' fill='white'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: left center;
    padding-left: 2rem;
  }

  p {
    text-align: left;
  }
}

.daily-quote-question {
  line-height: 2.2rem;
  font-weight: 700;
  font-size: 1.6rem;
}

.diary-images {
  margin: 0 -2rem;

  .diary-image-swiper {
    :deep(swiper-slide) {
      padding-bottom: 100%;
      border-radius: 0;
    }
    :deep(.slide-image) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-width: 100%;
      object-fit: cover;
    }

    :deep(swiper-container)::part(pagination) {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.2rem;
      bottom: 1.6rem;
    }

    :deep(swiper-container)::part(bullet) {
      width: 0.8rem;
      height: 0.8rem;
      margin: 0;
      background: #fff;
      opacity: 0.3;
    }

    :deep(swiper-container)::part(bullet-active) {
      background: #fff;
      opacity: 1;
      margin: 0;
    }
  }
}

// 하단 고정 버튼 스타일
.is-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-top: 0.1rem solid #e2e2e2;

  .btn-sticky {
    width: 100%;
    border-radius: 0.8rem;
    font-size: 1.6rem;
    font-weight: 600;
  }
}
</style>
