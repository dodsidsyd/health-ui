<template>
  <div :id="`diary-${diary.date}`" class="diary-item" @click="handleItemClick">
    <!-- 이모지 -->
    <div class="emoji-section">
      <img :src="diary.emoji.src" :alt="diary.emoji.label" />
    </div>

    <!-- 수정/삭제 버튼 -->
    <div class="action-section">
      <Button btnType="icon" class="action-btn" :width="2" :height="2" @click.stop="$emit('showActions', diary)">
        <i class="icon ico-menu"></i>
      </Button>
    </div>

    <!-- 타이틀과 텍스트 -->
    <div v-if="hasContent(diary)" class="content-section">
      <!-- Daily-quote 모드일 때 특별한 형식 -->
      <div v-if="diary.isDailyQuote" class="daily-quote-content">
        <div class="daily-quote-label">오늘 한마디</div>
        <div class="daily-quote-question" v-html="getCleanQuestion"></div>
        <p class="diary-text">{{ diary.content }}</p>
      </div>

      <!-- 일반 모드일 때 기존 형식 -->
      <div v-else>
        <div class="diary-text">{{ diary.content }}</div>
      </div>

      <!-- 이미지 표시 -->
      <div v-if="diary.images && diary.images.length > 0" class="diary-images">
        <CommonSwiper
          :slides="diary.images"
          slide-type="image"
          v-bind="SWIPER_PRESETS.diaryList"
          class="diary-image-swiper"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
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
  diaryList: {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: false,
    navigation: false,
    loop: false,
    showSlideLength: false,
    showPlayPauseButton: false
  }
} as const

interface Props {
  diary: Diary
  variant?: 'list' | 'detail' | 'mood'
  showActions?: boolean
}

interface Emits {
  showActions: [diary: Diary]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'list',
  showActions: true
})
const emit = defineEmits<Emits>()
const router = useRouter()

// Daily-quote 질문에서 <br/> 태그 제거
const getCleanQuestion = computed(() => {
  if (props.diary.dailyQuoteQuestion) {
    return props.diary.dailyQuoteQuestion.replace(/<br\s*\/?>/gi, ' ')
  }
  return ''
})

// 다이어리에 내용이 있는지 확인
const hasContent = (diary: any) => {
  if (diary.isDailyQuote) {
    return diary.dailyQuoteQuestion || diary.content
  }
  return diary.content
}

// 다이어리 아이템 클릭 핸들러
const handleItemClick = (): void => {
  router.push(`/community/diary/${props.diary.id}`)
}
</script>

<style lang="scss" scoped>
.diary-item {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2rem;
  background: #fff;
  border-radius: 2rem;
  box-shadow: 4px 4px 12px 0 rgba(0, 0, 0, 0.04);
  position: relative;
}

.emoji-section {
  width: 3.2rem;
  height: 3.2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.diary-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #4c7ff7;
  background: rgba(76, 127, 247, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
  display: inline-block;
  width: fit-content;
}

.diary-text {
  line-height: 2.2rem;
  color: #555;
  @include mixin.multi-ellipsis($clamp: 2);
}

.daily-quote-content {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.daily-quote-label {
  font-size: 1.4rem;
  font-weight: 600;
  color: #4776e5;
  line-height: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.33317 7.33317C1.33317 3.65127 4.31794 0.666504 7.99984 0.666504C11.6817 0.666504 14.6665 3.65127 14.6665 7.33317C14.6665 11.0151 11.6817 13.9998 7.99984 13.9998C4.31794 13.9998 1.33317 11.0151 1.33317 7.33317Z' fill='%234C7FF7'/%3E%3Cpath d='M12.6665 12.0938L14.6665 14.0004H7.99984V12.6671L12.6665 12.0938Z' fill='%234C7FF7'/%3E%3Cpath d='M6.3335 8H11.0002C11.1843 8 11.3335 8.14924 11.3335 8.33333V9C11.3335 9.18409 11.1843 9.33333 11.0002 9.33333H6.3335C6.1494 9.33333 6.00016 9.18409 6.00016 9V8.33333C6.00016 8.14924 6.1494 8 6.3335 8Z' fill='white'/%3E%3Cpath d='M5.00016 5.3335H11.0002C11.1843 5.3335 11.3335 5.48273 11.3335 5.66683V6.3335C11.3335 6.51759 11.1843 6.66683 11.0002 6.66683H5.00016C4.81607 6.66683 4.66683 6.51759 4.66683 6.3335V5.66683C4.66683 5.48273 4.81607 5.3335 5.00016 5.3335Z' fill='white'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 2rem;
}

.daily-quote-question {
  font-weight: 700;
  line-height: 2.2rem;
}

.diary-images {
  .diary-image-swiper {
    :deep(swiper-slide) {
      width: 100%;
    }
    :deep(.slide-image) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    :deep(.swiper-pagination) {
      bottom: -2rem;
    }

    :deep(.swiper-pagination-bullet) {
      width: 0.6rem;
      height: 0.6rem;
      background: #c1c1c1;
      opacity: 0.5;
    }

    :deep(.swiper-pagination-bullet-active) {
      background: #4c7ff7;
      opacity: 1;
    }
    :deep(.slide-info) {
      position: absolute;
      top: 0.8rem;
      right: 0.8rem;
      z-index: 10;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      padding: 0.4rem 0.8rem;
      border-radius: 2rem;
      font-size: 1.2rem;
      margin-top: 0;
    }
  }
}

.action-section {
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  flex-shrink: 0;

  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.8rem;
  }

  .icon {
    display: block;
    width: 2rem;
    height: 2rem;
    background-size: cover;
    color: #666;
  }
}
</style>
