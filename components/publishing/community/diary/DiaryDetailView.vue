<template>
  <section class="diary-detail-view">
    <FlexColDiv>
      <div class="date-display mt-20">
        <span class="date-label">{{ pageTitle }}</span>
      </div>
    </FlexColDiv>

    <FlexColDiv class="pt-24 pb-24">
      <div v-if="diary?.emoji?.src" class="emoji-box">
        <p v-if="diary?.isDailyQuote" class="daily-quote-label">오늘 한마디</p>
        <img :src="diary.emoji.src" :alt="diary.emoji.label" />
        <!-- Daily-quote 모드일 때 특별한 형식 -->
        <p
          v-if="diary?.isDailyQuote"
          class="daily-quote-question"
          v-html="getCleanQuestion(diary.dailyQuoteQuestion || '')"
        ></p>
        <!-- 일반 모드일 때 기존 형식 -->
        <p v-else>오늘 마음은 {{ diary.emoji.label }}!</p>
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
        <div class="images-scroll">
          <div v-for="(image, index) in diary.images" :key="index" class="diary-image">
            <img :src="image" alt="다이어리 이미지" />
          </div>
        </div>
      </div>
    </FlexColDiv>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FieldSet from '~/components/publishing/input/FieldSet.vue'

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
  justify-content: center;
  align-items: center;
  padding: 0 0.4rem;
  font-weight: 700;

  .date-label {
    font-size: 2rem;
    line-height: 2.6rem;
    font-weight: 700;
  }
}

.diary-fieldset {
  margin-top: 2.4rem;
  padding-top: 2.4rem;
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

  .daily-quote-label {
    display: inline-block;
    margin: 0 auto;
    font-size: 1.4rem;
    font-weight: 600;
    color: #4776e5;
    line-height: 2rem;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.33317 7.33317C1.33317 3.65127 4.31794 0.666504 7.99984 0.666504C11.6817 0.666504 14.6665 3.65127 14.6665 7.33317C14.6665 11.0151 11.6817 13.9998 7.99984 13.9998C4.31794 13.9998 1.33317 11.0151 1.33317 7.33317Z' fill='%234C7FF7'/%3E%3Cpath d='M12.6665 12.0938L14.6665 14.0004H7.99984V12.6671L12.6665 12.0938Z' fill='%234C7FF7'/%3E%3Cpath d='M6.3335 8H11.0002C11.1843 8 11.3335 8.14924 11.3335 8.33333V9C11.3335 9.18409 11.1843 9.33333 11.0002 9.33333H6.3335C6.1494 9.33333 6.00016 9.18409 6.00016 9V8.33333C6.00016 8.14924 6.1494 8 6.3335 8Z' fill='white'/%3E%3Cpath d='M5.00016 5.3335H11.0002C11.1843 5.3335 11.3335 5.48273 11.3335 5.66683V6.3335C11.3335 6.51759 11.1843 6.66683 11.0002 6.66683H5.00016C4.81607 6.66683 4.66683 6.51759 4.66683 6.3335V5.66683C4.66683 5.48273 4.81607 5.3335 5.00016 5.3335Z' fill='white'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: left center;
    padding-left: 2rem;
  }
}

.daily-quote-question {
  line-height: 2.2rem;
  font-weight: 700;
  font-size: 1.6rem;
}

.diary-images {
  margin-top: 2.4rem;

  .images-scroll {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding: 0.5rem 0;

    &::-webkit-scrollbar {
      height: 0.4rem;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 0.2rem;
    }

    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 0.2rem;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  }

  .diary-image {
    flex-shrink: 0;
    width: 20rem;
    height: 15rem;
    border-radius: 1.2rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style> 