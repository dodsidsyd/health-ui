<template>
  <BaseBody
    page-title="마음일기 수정하기"
    :show-back-button="false"
    :has-close-btn="true"
    :add-text-click-enabled="false"
    @close="handleClose"
  >
    <section>
      <FlexColDiv>
        <DateRangeSelect
          v-model="selectedDate"
          class="mt-23 mb-10"
          navigation-mode="notyear"
          :prev-btn="false"
          :next-btn="false"
          @update:model-value="handleDateChange"
        />
        <!-- 일반 모드일 때만 기분 바꾸기 버튼 표시 -->
         <template v-if="!isDailyQuoteMode">
          <NuxtLink
          
          :to="{
            path: '../emojiPicker',
            query: {
              date: selectedDate.toISOString().split('T')[0],
              returnPath: '/community/diary/edit'
            }
          }"
          class="chage-btn"
        >
          <span>기분 바꾸기</span>
          <i class="icon arrow-down-type"></i>
        </NuxtLink>
         </template>
      </FlexColDiv>

      <FlexColDiv class="pt-24 pb-24">
        <!-- Daily-quote 모드일 때 상세 화면과 동일한 레이아웃 -->
        <div v-if="isDailyQuoteMode && selectedEmoji" class="emoji-box">
          <p class="daily-quote-label">오늘 한마디</p>
          <img :src="selectedEmoji.src" :alt="selectedEmoji.label" />
          <p class="daily-quote-question" v-html="getCleanQuestion(dailyQuoteQuestion)"></p>
        </div>
        
        <!-- 일반 모드일 때 기존 레이아웃 -->
        <div v-else-if="selectedEmoji" class="emoji-box">
          <img :src="selectedEmoji.src" :alt="selectedEmoji.label" />
          <p>오늘 마음은 {{ selectedEmoji.label }}!</p>
        </div>

        <hr class="mt-24 mb-24" />

        <!-- Daily-quote 모드일 때는 하단 텍스트만 수정 가능 -->
        <FieldSet
          v-model="diaryContent"
          class="diary-fieldset"
          :placeholder="isDailyQuoteMode ? '편하게 마음속 이야기를 남겨보세요. 마음일기는 나만 볼 수 있어요.' : '편하게 마음속 이야기를 남겨보세요. 마음일기는 나만 볼 수 있어요.'"
          :max-length="999"
        />

        <!-- 일반 모드일 때만 이미지 업로드 버튼 표시 -->
        <div v-if="!isDailyQuoteMode" class="bottom-actions">
          <button type="button" class="add-photo-btn" @click="addPhoto">
            <i class="icon ico-image"></i>
            <span>사진 추가</span>
          </button>
          <button type="button" class="register-btn" @click="saveDiary">수정하기</button>
        </div>
        
        <!-- Daily-quote 모드일 때는 수정하기 버튼만 표시 -->
        <div v-else class="bottom-actions">
          <button type="button" class="register-btn" @click="saveDiary">수정하기</button>
        </div>
      </FlexColDiv>
    </section>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import DateRangeSelect from '~/components/smartRing/DateRangeSelect.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FieldSet from '~/components/publishing/input/FieldSet.vue'

const router = useRouter()
const route = useRoute()

// Daily-quote 질문에서 <br/> 태그 제거
const getCleanQuestion = (question: string) => {
  if (question) {
    return question.replace(/<br\s*\/?>/gi, ' ')
  }
  return ''
}

// 다이어리 ID
const diaryId = route.params.diaryId as string

// 선택된 날짜
const selectedDate = ref(new Date())
const selectedEmoji = ref<{ src: string; label: string } | null>(null)
const diaryContent = ref('')
const isDailyQuoteMode = ref(false)
const dailyQuoteQuestion = ref('')

// 이모지 목록
const emojiList = [
  { src: '/_nuxt/assets/images/emoji/happy.svg', label: '행복' },
  { src: '/_nuxt/assets/images/emoji/peaceful.svg', label: '평온' },
  { src: '/_nuxt/assets/images/emoji/excited.svg', label: '설렘' },
  { src: '/_nuxt/assets/images/emoji/sad.svg', label: '슬픔' },
  { src: '/_nuxt/assets/images/emoji/angry.svg', label: '화남' },
  { src: '/_nuxt/assets/images/emoji/upset.svg', label: '속상' },
  { src: '/_nuxt/assets/images/emoji/indifferent.svg', label: '덤덤' },
  { src: '/_nuxt/assets/images/emoji/fun.svg', label: '재미' },
  { src: '/_nuxt/assets/images/emoji/surprise.svg', label: '놀람' },
  { src: '/_nuxt/assets/images/emoji/worry.svg', label: '걱정' },
  { src: '/_nuxt/assets/images/emoji/hurt.svg', label: '아파' },
  { src: '/_nuxt/assets/images/emoji/embarrassed.svg', label: '창피' },
  { src: '/_nuxt/assets/images/emoji/flustered.svg', label: '당황' },
  { src: '/_nuxt/assets/images/emoji/frustrated.svg', label: '답답' },
  { src: '/_nuxt/assets/images/emoji/annoyed.svg', label: '짜증' },
  { src: '/_nuxt/assets/images/emoji/ruined.svg', label: '망함' },
  { src: '/_nuxt/assets/images/emoji/shocked.svg', label: '헐' },
  { src: '/_nuxt/assets/images/emoji/thrilled.svg', label: '신남' },
  { src: '/_nuxt/assets/images/emoji/cheer.svg', label: '응원' },
  { src: '/_nuxt/assets/images/emoji/congrats.svg', label: '축하' },
  { src: '/_nuxt/assets/images/emoji/touched.svg', label: '감동' }
]

// 기존 다이어리 데이터 로드
const loadExistingDiary = () => {
  try {
    const existingDiaries = JSON.parse(localStorage.getItem('diaryList') || '[]')
    const existingDiary = existingDiaries.find((diary: any) => diary.id === Number(diaryId))

    if (existingDiary) {
      selectedDate.value = new Date(existingDiary.date)
      selectedEmoji.value = existingDiary.emoji
      diaryContent.value = existingDiary.content
      isDailyQuoteMode.value = existingDiary.isDailyQuote || false
      dailyQuoteQuestion.value = existingDiary.dailyQuoteQuestion || ''
      console.log('기존 다이어리 로드:', existingDiary)
    } else {
      console.error('다이어리를 찾을 수 없음:', diaryId)
      router.push('/community/diary/list')
    }
  } catch (error) {
    console.error('다이어리 로드 실패:', error)
    router.push('/community/diary/list')
  }
}

// route.query 변경 감지하여 이모지 업데이트
watch(
  () => route.query,
  newQuery => {
    console.log('받은 쿼리:', newQuery)

    if (newQuery.emoji && newQuery.name) {
      const emojiFile = newQuery.emoji as string
      const emojiName = newQuery.name as string

      console.log('찾을 이모지:', { emojiFile, emojiName })

      // emojiList에서 해당 이모지 찾기
      const foundEmoji = emojiList.find(emoji => {
        const fileName = emoji.src.split('/').pop()?.replace('.svg', '')
        const matches = fileName === emojiFile || emoji.label === emojiName
        console.log('매칭 확인:', { fileName, emojiLabel: emoji.label, matches })
        return matches
      })

      if (foundEmoji) {
        selectedEmoji.value = foundEmoji
        console.log('이모지 업데이트:', foundEmoji)
      } else {
        console.log('이모지를 찾을 수 없음:', { emojiFile, emojiName })
        console.log(
          '사용 가능한 이모지:',
          emojiList.map(e => ({ file: e.src.split('/').pop()?.replace('.svg', ''), label: e.label }))
        )
      }
    }
  },
  { immediate: true, deep: true }
)

// DateRangeSelect에서 날짜 변경 시 호출되는 함수
const handleDateChange = (newDate: Date) => {
  selectedDate.value = new Date(newDate)
  console.log('날짜 변경:', selectedDate.value.toISOString().split('T')[0])
}

// 다이어리 수정 (BaseBody의 "수정하기" 버튼 클릭 시)
const updateDiary = () => {
  if (!selectedEmoji.value || !diaryContent.value.trim()) {
    alert('이모지를 선택하고 내용을 입력해주세요.')
    return
  }

  const diaryData = {
    id: Number(diaryId),
    date: selectedDate.value.toISOString().split('T')[0], // YYYY-MM-DD
    emoji: selectedEmoji.value,
    content: diaryContent.value.trim(),
    isDailyQuote: isDailyQuoteMode.value, // daily-quote 모드 여부
    dailyQuoteQuestion: isDailyQuoteMode.value ? dailyQuoteQuestion.value : undefined, // daily-quote 질문
    createdAt: new Date().toISOString() // 수정 시간
  }

  console.log('수정할 다이어리 데이터:', diaryData)

  // localStorage에서 기존 다이어리 목록 가져오기
  const existingDiaries = JSON.parse(localStorage.getItem('diaryList') || '[]')

  // 기존 다이어리 업데이트
  const existingIndex = existingDiaries.findIndex((diary: any) => diary.id === Number(diaryId))
  if (existingIndex !== -1) {
    existingDiaries[existingIndex] = diaryData
  } else {
    console.error('수정할 다이어리를 찾을 수 없음')
    return
  }

  // localStorage에 저장
  localStorage.setItem('diaryList', JSON.stringify(existingDiaries))

  console.log('다이어리 수정 완료:', diaryData)

  // 수정 후 목록 페이지로 이동
  router.push({
    path: '/community/diary/list',
    query: {
      scrollTo: diaryData.date,
      updatedDiary: 'true'
    }
  })
}

// 사진 추가 함수 (임시로 빈 함수 추가)
const addPhoto = () => {
  // 사진 추가 기능은 edit.vue에서는 구현하지 않음
  console.log('사진 추가 기능은 edit.vue에서 지원하지 않습니다.')
}

// 다이어리 저장 함수 (updateDiary와 동일)
const saveDiary = () => {
  updateDiary()
}

// 뒤로가기 함수
const handleClose = () => {
  router.go(-1) // 히스토리백
}

// 레이아웃에서 addTextClick 핸들러 등록
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')

// 컴포넌트 마운트 시 addTextClick 핸들러 등록 및 기존 다이어리 로드
onMounted(() => {
  loadExistingDiary()

  if (setAddTextClickHandler) {
    setAddTextClickHandler(updateDiary)
  }
})
</script>
<style lang="scss" scoped>
.diary-fieldset {
  :deep(.c-texttype) {
    padding: 0;
    border: none;
    height: auto;
    min-height: 5.8rem;
    &:hover {
      background: #fff;
    }
    .group_feedback {
      display: none;
    }
    .textarea {
    }
  }
}
.chage-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0.7rem 1.2rem 0.7rem 1.6rem;
  overflow: hidden;
  border-radius: 1.8rem;
  border: 0.1rem solid #e2e2e2;
  gap: 0.2rem;
  .icon {
    width: 1.8rem;
    height: 1.8rem;
    background-position: center;
  }
}
.emoji-box {
  gap: 1.6rem;
  display: flex;
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

.daily-quote-question {
  line-height: 2.2rem;
  font-weight: 700;
  font-size: 1.6rem;
}

.daily-quote-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0.7rem 1.2rem 0.7rem 1.6rem;
  border-radius: 1.8rem;
  border: 0.1rem solid #e2e2e2;
  
  span {
    font-size: 1.4rem;
    font-weight: 600;
    color: #4776e5;
  }
}

.bottom-actions {
  display: flex;
  gap: 1.2rem;
  margin-top: 2.4rem;
  padding: 0 2rem;
  
  .add-photo-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    padding: 1.2rem;
    border: 0.1rem solid #e2e2e2;
    border-radius: 1.2rem;
    background: white;
    color: #666;
    font-size: 1.4rem;
    cursor: pointer;
    
    .icon {
      width: 2rem;
      height: 2rem;
    }
  }
  
  .register-btn {
    flex: 1;
    padding: 1.2rem;
    border: none;
    border-radius: 1.2rem;
    background: #007bff;
    color: white;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      background: #0056b3;
    }
  }
}
</style>
