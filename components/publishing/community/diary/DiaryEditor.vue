<template>
  <BaseBody
    :page-title="pageTitle"
    :show-back-button="showBackButton"
    :has-close-btn="hasCloseBtn"
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
          <button @click="showEmojiPickerModal = true" class="chage-btn">
            <span>기분 바꾸기</span>
            <i class="icon arrow-down-type"></i>
          </button>
        </template>
      </FlexColDiv>

      <FlexColDiv class="pb-24">
        <!-- 오늘 한마디 모드일 때 상세 화면과 동일한 레이아웃 -->
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

        <!-- 다이어리 입력 필드 -->
        <DiaryFieldset
          v-model="diaryContent"
          class="diary-fieldset"
          @focus="isFieldsetFocused = true"
          @blur="isFieldsetFocused = false"
        />

        <!-- 이미지 미리보기 영역 -->
        <div v-if="selectedImages.length > 0" class="image-preview-section">
          <div class="image-preview-container">
            <div v-for="(image, index) in selectedImages" :key="index" class="image-preview-item">
              <img :src="image" :alt="`미리보기 이미지 ${index + 1}`" />
              <button type="button" class="remove-image-btn" @click="removeImage(index)" aria-label="이미지 제거">
                <i class="icon ico-close"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- 이미지 업로더 컴포넌트 (하단 고정) -->
        <DiaryImageUploader
          v-model="selectedImages"
          class="diary-image-uploader-fixed"
          :class="{ 'is-focused': isFieldsetFocused }"
          :register-button-text="isFieldsetFocused ? '완료' : ''"
          @image-limit-exceeded="() => showToastMessage('사진은 최대 3장만 가능합니다.')"
          @register="handleCompleteClick"
        />

        <!-- 하단 고정 영역 -->
        <ButtonGroup v-if="!isFieldsetFocused" class="is-fixed">
          <Button btn-type="primary" element-type="button" class="lg w-full medium btn-sticky" @click="handleSave">
            {{ isEditMode ? '수정하기' : '등록하기' }}
          </Button>
        </ButtonGroup>
      </FlexColDiv>
    </section>

    <!-- 이모지 선택 모달 -->
    <EmojiPickerModal
      :is-visible="showEmojiPickerModal"
      :return-path="returnPath"
      :selected-date="selectedDate.toISOString().split('T')[0]"
      @close="showEmojiPickerModal = false"
      @emoji-selected="handleEmojiSelected"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import DateRangeSelect from '~/components/smartRing/DateRangeSelect.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import DiaryFieldset from '~/components/publishing/community/diary/DiaryFieldset.vue'
import DiaryImageUploader from '~/components/publishing/community/diary/DiaryImageUploader.vue'
import EmojiPickerModal from '~/components/publishing/community/diary/EmojiPickerModal.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

const router = useRouter()
const route = useRoute()

// Props
const props = defineProps({
  isEditMode: {
    type: Boolean,
    default: false
  },
  diaryId: {
    type: String,
    default: ''
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
})

// Emits
const emit = defineEmits(['save', 'close'])

// 선택된 날짜
const selectedDate = ref(new Date())
const selectedEmoji = ref<{ src: string; label: string } | null>(null)
const diaryContent = ref('')
const isDailyQuoteMode = ref(false)
const dailyQuoteQuestion = ref('')
const showEmojiPickerModal = ref(false)
const isFieldsetFocused = ref(false)
const selectedImages = ref<string[]>([])

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

// Computed
const pageTitle = computed(() => (props.isEditMode ? '마음일기 수정하기' : '마음일기'))
const showBackButton = computed(() => !props.isEditMode)
const hasCloseBtn = computed(() => props.isEditMode)
const returnPath = computed(() =>
  props.isEditMode ? `/community/diary/${props.diaryId}/edit` : '/community/diary/create'
)
const showImageUploader = computed(() => !isDailyQuoteMode.value)

// Daily-quote 질문에서 <br/> 태그 제거
const getCleanQuestion = (question: string) => {
  if (question) {
    return question.replace(/<br\s*\/?>/gi, ' ')
  }
  return ''
}

// 초기 데이터 로드
const loadInitialData = () => {
  if (props.initialData && Object.keys(props.initialData).length > 0) {
    selectedDate.value = new Date(props.initialData.date || new Date())
    selectedEmoji.value = props.initialData.emoji || null
    diaryContent.value = props.initialData.content || ''
    selectedImages.value = props.initialData.images || []
    isDailyQuoteMode.value = props.initialData.isDailyQuote || false
    dailyQuoteQuestion.value = props.initialData.dailyQuoteQuestion || ''
  }
}

// DateRangeSelect에서 날짜 변경 시 호출되는 함수
const handleDateChange = (newDate: Date) => {
  selectedDate.value = new Date(newDate)
  console.log('날짜 변경:', selectedDate.value.toISOString().split('T')[0])
}

// 이모지 선택 처리
const handleEmojiSelected = (selectedEmojiData: { file: string; name: string }) => {
  console.log('이모지 선택됨:', selectedEmojiData)
  showEmojiPickerModal.value = false
}

// 저장 처리
const handleSave = () => {
  // if (!selectedEmoji.value || !diaryContent.value.trim()) {
  //   alert('이모지를 선택하고 내용을 입력해주세요.')
  //   return
  // }

  // 이미지 개수 확인 (3개 초과 시 토스트 메시지 표시)
  if (selectedImages.value.length > 3) {
    showToastMessage('사진은 최대 3장만 가능합니다.')
    return
  }

  const diaryData = {
    id: props.isEditMode ? Number(props.diaryId) : undefined,
    date: selectedDate.value.toISOString().split('T')[0],
    emoji: selectedEmoji.value,
    content: diaryContent.value.trim(),
    images: selectedImages.value,
    isDailyQuote: isDailyQuoteMode.value,
    dailyQuoteQuestion: isDailyQuoteMode.value ? dailyQuoteQuestion.value : undefined,
    createdAt: new Date().toISOString()
  }

  emit('save', diaryData)
}

// 완료 버튼 클릭 핸들러
const handleCompleteClick = () => {
  // 이미지 개수 제한 체크
  if (selectedImages.value.length >= 3) {
    showToastMessage('사진은 최대 3장만 가능합니다.')
    return
  }

  handleSave()
}

// 뒤로가기 함수
const handleClose = () => {
  emit('close')
}

// 토스트 메시지 표시 함수
const showToastMessage = (message: string) => {
  alert(message)
}

// 이미지 제거 함수
const removeImage = (index: number) => {
  selectedImages.value.splice(index, 1)
}

// 컴포넌트 마운트 시 초기 데이터 로드
onMounted(() => {
  if (props.initialData && Object.keys(props.initialData).length > 0) {
    loadInitialData()
  }
})

// props.initialData 변경 감지
watch(
  () => props.initialData,
  newData => {
    if (newData && Object.keys(newData).length > 0) {
      loadInitialData()
    }
  },
  { immediate: false, deep: true }
)

// 초기 데이터 로드 후 watch 활성화
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
  { immediate: false, deep: true }
)
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
  margin-bottom: 1.6rem;
  padding-bottom: 1.6rem;
  border-bottom: 0.1rem solid #e2e2e2;
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

.diary-image-uploader-fixed {
  position: fixed;
  bottom: 5.6rem;
  left: 0;
  right: 0;
  z-index: 10;
  background: #fff;
  padding: 0 2rem;
  transition: bottom 0.3s ease;

  &.is-focused {
    bottom: 0;
  }
}

.image-preview-section {
  margin-top: 1.6rem;
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;

  margin: 0 -2rem;
  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  /* Firefox 스크롤바 숨김 */
  scrollbar-width: none;

  /* IE/Edge 스크롤바 숨김 */
  -ms-overflow-style: none;
}

.image-preview-container {
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 0.5rem;
  padding: 0.6rem 2rem 0;

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    height: 0;
  }

  /* Firefox 스크롤바 숨김 */
  scrollbar-width: none;

  /* IE/Edge 스크롤바 숨김 */
  -ms-overflow-style: none;
}

.image-preview-item {
  display: inline-block;
  position: relative;
  width: 8rem;
  height: 8rem;
  & + .image-preview-item {
    margin-left: 1.2rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.8rem;
    overflow: hidden;
    border: 0.1rem solid #eee;
  }

  .remove-image-btn {
    position: absolute;
    top: -0.6rem;
    right: -0.6rem;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6)
      url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 6L6 12M12 12L6 6' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A")
      no-repeat center center / cover;

    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;

    &:hover {
      background: rgba(0, 0, 0, 0.8);
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
