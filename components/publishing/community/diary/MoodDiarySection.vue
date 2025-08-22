<template>
  <section class="mood-diary-section">
    <!-- TitleBox with link to calendar view -->
    <TitleBox
      title="마음일기"
      titleClass=""
      element-type="a"
      aria-label="달력전체보기"
      icon="arrow-type-black"
      :link-href="'/community/diary/list'"
      :is-show-link="true"
    />

    <!-- Weekly Calendar -->
    <WeeklyPicker
      :selected-date="selectedDate"
      :diary-data="diaryData"
      :disabled-dates="disabledDates"
      @date-click="handleDateClick"
      @emoji-click="handleEmojiClick"
      @no-data-click="handleNoDataClick"
    />
    <!-- 선택된 날짜 표시 -->
    <div class="selected-date-header mt-32">
      {{ selectedDateFormatted }}
    </div>
    <!-- Daily Diary List -->
    <div v-if="selectedDateDiaries.length > 0" class="daily-diary-list">
      <div v-for="diary in selectedDateDiaries" :key="diary.id" class="diary-item" @click="goToDiaryDetail(diary.id)">
        <!-- 이모지 -->
        <div class="emoji-box">
          <img :src="diary.emoji.src" :alt="diary.emoji.label" />
        </div>
        <!-- 내용 -->
        <div v-if="hasContent(diary)" class="content-box">
          <!-- 오늘 한마디 모드일 때 특별한 형식 -->
          <div v-if="diary.isDailyQuote" class="daily-quote-content">
            <div class="daily-quote-label">오늘 한마디</div>
            <div class="daily-quote-question" v-html="getCleanQuestion(diary.dailyQuoteQuestion)"></div>
            <p v-if="diary.content" class="diary-text">{{ diary.content }}</p>
          </div>

          <!-- 일반 모드일 때 기존 형식 -->
          <p v-else-if="diary.content" class="diary-text">{{ diary.content }}</p>
        </div>

        <!-- 이미지 표시 -->
        <div v-if="diary.images && diary.images.length > 0" class="diary-images">
          <CommonSwiper
            :slides="diary.images"
            slide-type="image"
            v-bind="SWIPER_PRESETS.moodSection"
            class="diary-image-swiper"
          />
        </div>
      </div>
    </div>
    <div v-else class="no-diary">
      <div class="no-diary-icon">
        <img src="~/assets/images/diary/ico-diary-empty.svg" alt="일기 없음" />
      </div>
      <p>작성된 일기가 없습니다. <br />오늘 하루 어떠셨나요?</p>
      <!-- <button type="button" class="write-diary-btn" @click="goToCreate">일기 작성하기</button> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TitleBox from '~/components/common/TitleBox.vue'
import WeeklyPicker from '~/components/publishing/community/diary/WeeklyPicker.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
// CommonSwiper 프리셋 설정
const SWIPER_PRESETS = {
  moodSection: {
    slidesPerView: 1,
    spaceBetween: 8,
    pagination: false,
    navigation: false,
    loop: false,
    showSlideLength: true,
    showPlayPauseButton: false
  }
} as const

const router = useRouter()

// 선택된 날짜 (오늘 날짜로 초기화)
const selectedDate = ref(new Date())

// 다이어리 데이터
const diaryData = ref<Record<string, any>>({})

// 오늘 날짜 기준으로 미래 날짜 비활성화
const disabledDates = computed(() => {
  const today = new Date()
  const disabled = []

  // 오늘 이후 날짜들을 비활성화
  for (let i = 1; i <= 30; i++) {
    const futureDate = new Date(today)
    futureDate.setDate(today.getDate() + i)
    disabled.push(futureDate.toISOString().split('T')[0])
  }

  return disabled
})

// 선택된 날짜의 월일요일
const selectedDateFormatted = computed(() => {
  const month = selectedDate.value.getMonth() + 1
  const day = selectedDate.value.getDate()
  const dayOfWeek = selectedDate.value.getDay()
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']

  return `${month}월 ${day}일 ${dayNames[dayOfWeek]}요일`
})

// 선택된 날짜의 다이어리 목록
const selectedDateDiaries = computed(() => {
  const dateStr = selectedDate.value.toISOString().split('T')[0]
  const allDiaries = JSON.parse(localStorage.getItem('diaryList') || '[]')
  return allDiaries.filter((diary: any) => diary.date === dateStr)
})

// Daily-quote 질문에서 <br/> 태그 제거
const getCleanQuestion = (question: string) => {
  if (question) {
    return question.replace(/<br\s*\/?>/gi, ' ')
  }
  return ''
}

// 다이어리에 내용이 있는지 확인
const hasContent = (diary: any) => {
  if (diary.isDailyQuote) {
    return diary.dailyQuoteQuestion || diary.content
  }
  return diary.content
}

// 날짜 클릭 핸들러
const handleDateClick = (dateStr: string) => {
  selectedDate.value = new Date(dateStr)
}

// 이모지 클릭 핸들러
const handleEmojiClick = (dateStr: string, event: Event) => {
  // 이모지 클릭 시 해당 날짜로 이동
  selectedDate.value = new Date(dateStr)
}

// no-data 클릭 핸들러
const handleNoDataClick = (dateStr: string) => {
  // no-data 클릭 시 해당 날짜로 이동하고 emojiPicker로 이동
  selectedDate.value = new Date(dateStr)
  goToEmojiPicker()
}

// 다이어리 클릭 핸들러
const handleDiaryClick = (diaryInfo: any) => {
  if (diaryInfo.date) {
    selectedDate.value = new Date(diaryInfo.date)
  }
}

// 다이어리 상세 페이지로 이동
const goToDiaryDetail = (diaryId: number) => {
  router.push(`/community/diary/${diaryId}`)
}

// 일기 작성 페이지로 이동
const goToCreate = () => {
  router.push({
    path: '/community/diary/create',
    query: { date: selectedDate.value.toISOString().split('T')[0] }
  })
}

// 이모지 피커 페이지로 이동
const goToEmojiPicker = () => {
  router.push({
    path: '/community/diary/emojiPicker',
    query: {
      date: selectedDate.value.toISOString().split('T')[0],
      returnTo: 'mood-diary'
    }
  })
}

// 다이어리 데이터 로드
const loadDiaryData = () => {
  const allDiaries = JSON.parse(localStorage.getItem('diaryList') || '[]')
  const diaryDataMap: Record<string, any> = {}

  allDiaries.forEach((diary: any) => {
    const date = diary.date
    if (!diaryDataMap[date]) {
      diaryDataMap[date] = []
    }
    diaryDataMap[date].push(diary)
  })

  // DatePicker용 데이터 형식으로 변환
  const formattedData: Record<string, any> = {}
  Object.keys(diaryDataMap).forEach(date => {
    const diaries = diaryDataMap[date]
    if (diaries.length > 0) {
      // 첫 번째 다이어리의 이모지를 사용
      formattedData[date] = {
        status: diaries[0].emoji.src.split('/').pop()?.replace('.svg', '') || 'happy'
      }
    }
  })

  diaryData.value = formattedData
}

onMounted(() => {
  loadDiaryData()
})
</script>

<style lang="scss" scoped>
.mood-diary-section {
  padding: 3.2rem 0 2rem;
}

.daily-diary-list {
  margin-top: 2rem;
}

.selected-date-header {
  font-size: 1.8rem;
  font-weight: 700;
}

.diary-item {
  display: flex;
  flex-direction: column;
  padding: 2.4rem 0;
  background: #fff;
  border-bottom: 0.1rem solid #eee;
}

.emoji-box {
  img {
    width: 3.2rem;
    height: 3.2rem;
  }
}

.content-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;
}

.diary-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #4c7ff7;
  background: rgba(76, 127, 247, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 0.6rem;
  display: inline-block;
  width: fit-content;
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
  line-height: 2.2rem;
  font-weight: 700;
}

.diary-text {
  line-height: 2.2rem;
  color: #555;
  @include mixin.multi-ellipsis($clamp: 2);
}

.diary-images {
  margin-top: 1.6rem;

  .diary-image-swiper {
    :deep(swiper-slide) {
      padding-bottom: 100%;
      border-radius: 0.8rem;
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

    :deep(.swiper-pagination) {
      bottom: -2rem;
    }
  }
}

.no-diary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 8rem 0;

  .no-diary-content {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  p {
    font-size: 1.8rem;
    color: #555;
    line-height: 2.5rem;
  }
}
</style>
