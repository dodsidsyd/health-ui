<template>
  <BaseBody :page-title="isEditMode ? '마음일기 수정하기' : '마음일기 등록하기 '" :show-back-button="true">
    <section>
      <FlexColDiv>
        <div class="date-display mt-20 mb-24" @click="openDatePicker">
          <DatePicker
            v-model="selectedDate"
            :show-header="false"
            :show-navigation="false"
            :show-calendar="true"
            :show-time-picker="false"
            class="date-picker-display"
            @update:model-value="handleDateChange"
          />
          <span class="date-label">{{ formatDate(selectedDate) }}</span>
        </div>

        <div v-if="isDailyQuoteMode" class="daily-quote-title">
          <span>오늘 한마디</span>
          <p v-html="dailyQuoteQuestion"></p>
        </div>

        <div v-if="selectedEmoji || isDailyQuoteMode" class="emoji-box">
          <img v-if="selectedEmoji" :src="selectedEmoji.src" :alt="selectedEmoji.label" />
          <p v-if="selectedEmoji">오늘 마음은 {{ selectedEmoji.label }}!</p>

          <button v-if="!isDailyQuoteMode" @click="showEmojiPickerModal = true" class="chage-btn">
            <span>기분 바꾸기</span>
            <i class="icon arrow-down-type"></i>
          </button>
        </div>
      </FlexColDiv>

      <FlexColDiv class="pb-24">
        <DiaryFieldset v-model="diaryContent" @focus="handleFieldsetFocus" @blur="handleFieldsetBlur" />

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
      </FlexColDiv>

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
        <Button btn-type="primary" element-type="button" class="lg w-full medium btn-sticky" @click="showSaveConfirm">
          등록하기
        </Button>
      </ButtonGroup>
    </section>

    <!-- 이모지 선택 모달 -->
    <EmojiPickerModal
      :is-visible="showEmojiPickerModal"
      :return-path="'/community/diary/create'"
      @close="showEmojiPickerModal = false"
      @emoji-selected="handleEmojiSelected"
    />

    <!-- 등록 확인 모달 -->
    <ConfirmModal
      :is-visible="showConfirmModal"
      title="일기 등록"
      content="일기를 등록하시겠습니까?"
      :confirm-button-text="'등록'"
      :cancel-button-text="'취소'"
      @confirm="saveDiary"
      @cancel="showConfirmModal = false"
      @close="showConfirmModal = false"
      class="modal-confirm-modal"
    />

    <!-- 토스트 메시지 -->
    <BottomToastSlot v-model="showToast" type="success">
      {{ toastMessage }}
    </BottomToastSlot>

    <!-- 날짜 선택 모달 -->
    <BottomModal
      :is-visible="showDatePickerModal"
      title="날짜 선택"
      @close="showDatePickerModal = false"
      @confirm="handleDateChange(selectedDate)"
      :is-show-confirm-button="false"
      :is-show-cancel-button="false"
    >
      <template #content>
        <DatePicker
          v-model="selectedDate"
          :show-header="true"
          :show-navigation="true"
          :show-calendar="true"
          :show-time-picker="false"
          :disabled-dates="getDisabledDates()"
          @update:model-value="handleDateChange"
        />
      </template>
    </BottomModal>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import DatePicker from '~/components/publishing/input/DatePicker.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import DiaryFieldset from '~/components/publishing/community/diary/DiaryFieldset.vue'
import DiaryImageUploader from '~/components/publishing/community/diary/DiaryImageUploader.vue'
import EmojiPickerModal from '~/components/publishing/community/diary/EmojiPickerModal.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import BottomToastSlot from '~/components/common/bottomToastSlot.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

const router = useRouter()
const route = useRoute()

// 선택된 날짜 (URL 파라미터에서 가져오거나 오늘 날짜)
const selectedDate = ref(new Date((route.query.date as string) || new Date()))
const selectedEmoji = ref<{ src: string; label: string } | null>(null)
const diaryContent = ref('')
const selectedImages = ref<string[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
const showEmojiPickerModal = ref(false)
const isEditMode = ref(false)
const editDiaryId = ref<number | null>(null)
const isDailyQuoteMode = ref(false)
const dailyQuoteQuestion = ref('')
const showConfirmModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

// 가상 키패드 감지
const isVirtualKeyboardOpen = ref(false)
const initialViewportHeight = ref(0)

// 포커스 상태 관리
const isFieldsetFocused = ref(false)

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

// 수정 모드인지 확인하고 기존 다이어리 로드
const loadExistingDiary = () => {
  if (route.query.edit === 'true' && route.query.id) {
    isEditMode.value = true
    editDiaryId.value = Number(route.query.id)

    // localStorage에서 기존 다이어리 찾기
    const existingDiaries = JSON.parse(localStorage.getItem('diaryList') || '[]')
    const existingDiary = existingDiaries.find((diary: any) => diary.id === editDiaryId.value)

    if (existingDiary) {
      selectedDate.value = new Date(existingDiary.date)
      selectedEmoji.value = existingDiary.emoji
      diaryContent.value = existingDiary.content
      selectedImages.value = existingDiary.images || []
    }
  }
}

// route.query 변경 감지하여 이모지 업데이트
watch(
  () => route.query,
  (newQuery, oldQuery) => {
    console.log('받은 쿼리:', newQuery)
    console.log('이전 쿼리:', oldQuery)

    // daily-quote 모드 처리
    if (newQuery.type === 'daily-quote') {
      isDailyQuoteMode.value = true
      dailyQuoteQuestion.value = newQuery.question as string

      // 이모지 설정
      if (newQuery.emoji) {
        const emojiFile = newQuery.emoji as string
        console.log('daily-quote 모드에서 찾을 이모지:', emojiFile)

        const foundEmoji = emojiList.find(emoji => {
          const fileName = emoji.src.split('/').pop()
          const fileNameWithoutExt = fileName?.replace('.svg', '')
          const emojiFileWithoutExt = emojiFile.replace('.svg', '')
          console.log('비교:', {
            fileNameWithoutExt,
            emojiFileWithoutExt,
            matches: fileNameWithoutExt === emojiFileWithoutExt
          })
          return fileNameWithoutExt === emojiFileWithoutExt
        })

        if (foundEmoji) {
          selectedEmoji.value = foundEmoji
          console.log('daily-quote 모드에서 이모지 설정 완료:', foundEmoji)
        } else {
          console.log('daily-quote 모드에서 이모지를 찾을 수 없음:', emojiFile)
          console.log(
            '사용 가능한 이모지:',
            emojiList.map(e => e.src.split('/').pop()?.replace('.svg', ''))
          )
          // 이모지를 찾지 못해도 daily-quote 모드는 계속 유지
        }
      }
      return
    }

    // 일반 이모지 선택 모드
    isDailyQuoteMode.value = false

    // 이모지 정보가 있을 때만 처리
    if (newQuery.emoji && newQuery.name) {
      const emojiFile = newQuery.emoji as string
      const emojiName = newQuery.name as string

      console.log('찾을 이모지:', { emojiFile, emojiName })

      // emojiList에서 해당 이모지 찾기
      const foundEmoji = emojiList.find(emoji => {
        const fileName = emoji.src.split('/').pop()?.replace('.svg', '')
        const emojiFileWithoutExt = emojiFile.replace('.svg', '')
        const matches = fileName === emojiFileWithoutExt || emoji.label === emojiName
        console.log('매칭 확인:', { fileName, emojiFileWithoutExt, emojiLabel: emoji.label, matches })
        return matches
      })

      if (foundEmoji) {
        // 이모지 변경인지 확인 (oldQuery가 있고, 이모지가 실제로 변경된 경우)
        const isEmojiChange = oldQuery && (oldQuery.emoji !== newQuery.emoji || oldQuery.name !== newQuery.name)

        if (isEmojiChange) {
          console.log('이모지 변경 감지: 기존 내용과 이미지 보존')
          console.log('기존 내용:', diaryContent.value)
          console.log('기존 이미지 개수:', selectedImages.value.length)
        }

        // 이모지만 업데이트 (기존 내용과 이미지는 그대로 유지)
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

// 날짜 변경 시 다이어리 업데이트
const handleDateChange = (newDate: Date) => {
  selectedDate.value = newDate
  // 날짜 선택 시 모달 닫기
  showDatePickerModal.value = false
  // 여기에 다이어리 데이터를 새로운 날짜로 업데이트하는 로직을 추가합니다.
  // 예: diary.value = fetchDiaryByDate(newDate.toISOString().split('T')[0])
}

// 등록 확인 모달 표시
const showSaveConfirm = () => {
  console.log('=== showSaveConfirm 호출됨 ===')
  console.log('현재 showConfirmModal.value:', showConfirmModal.value)
  showConfirmModal.value = true
  console.log('변경 후 showConfirmModal.value:', showConfirmModal.value)
  console.log('=== showSaveConfirm 완료 ===')
}

// 다이어리 저장 (ConfirmModal에서 확인 클릭 시)
const saveDiary = () => {
  // 이미지 개수 확인 (3개 초과 시 토스트 메시지 표시)
  if (selectedImages.value.length > 3) {
    showToastMessage('사진은 최대 3장만 가능합니다.')
    return
  }

  const diaryData = {
    id: isEditMode.value ? editDiaryId.value! : Date.now(), // 수정 모드면 기존 ID, 새로 작성이면 새 ID
    date: selectedDate.value.toISOString().split('T')[0], // YYYY-MM-DD
    emoji: selectedEmoji.value,
    content: diaryContent.value.trim(),
    images: selectedImages.value, // 이미지 정보 추가
    isDailyQuote: isDailyQuoteMode.value, // daily-quote 모드 여부
    dailyQuoteQuestion: isDailyQuoteMode.value ? dailyQuoteQuestion.value : undefined, // daily-quote 질문
    createdAt: isEditMode.value ? new Date().toISOString() : new Date().toISOString() // 수정 시에는 업데이트 시간
  }

  console.log('저장할 다이어리 데이터:', diaryData)

  // localStorage에서 기존 다이어리 목록 가져오기
  let existingDiaries = []
  try {
    const storedData = localStorage.getItem('diaryList')
    existingDiaries = storedData ? JSON.parse(storedData) : []
  } catch (error) {
    console.error('localStorage에서 데이터를 가져오는 중 오류:', error)
    existingDiaries = []
  }

  if (isEditMode.value) {
    // 수정 모드: 기존 다이어리 업데이트
    const existingIndex = existingDiaries.findIndex((diary: any) => diary.id === editDiaryId.value)
    if (existingIndex !== -1) {
      existingDiaries[existingIndex] = diaryData
    }
  } else {
    // 새로 작성: 항상 새로운 다이어리로 추가 (같은 날짜에도 여러 개 가능)
    existingDiaries.push(diaryData)
  }

  // localStorage에 저장
  try {
    // 저장할 데이터의 크기 확인
    const dataToStore = JSON.stringify(existingDiaries)
    const dataSizeInMB = new Blob([dataToStore]).size / (1024 * 1024)

    // 4MB 이상이면 경고 메시지 표시
    if (dataSizeInMB > 4) {
      console.warn(`localStorage 데이터 크기가 ${dataSizeInMB.toFixed(2)}MB입니다. 용량 제한에 근접했습니다.`)
      showToastMessage('저장 공간이 부족할 수 있습니다. 일부 이미지를 제거해주세요.')
    }

    localStorage.setItem('diaryList', dataToStore)
    console.log('다이어리 저장 완료:', diaryData)
  } catch (error) {
    console.error('localStorage에 저장하는 중 오류:', error)

    if (error instanceof Error && error.name === 'QuotaExceededError') {
      showToastMessage('저장 공간이 부족합니다. 일부 이미지를 제거하고 다시 시도해주세요.')
    } else {
      showToastMessage('저장 중 오류가 발생했습니다.')
    }
    return
  }

  // 토스트 메시지 표시
  showToastMessage('일기가 기록되었습니다.')

  // 저장 후 상세 페이지로 이동
  router.push(`/community/diary/list`)
}

// 사진 관련 함수들
const addPhoto = () => {
  console.log('현재 이미지 개수:', selectedImages.value.length)
  if (selectedImages.value.length >= 3) {
    console.log('이미지 3장 제한 도달')
    showToastMessage('사진은 최대 3장만 가능합니다.')
    return
  }
  fileInput.value?.click()
}

// Toast 메시지 표시 함수
const showToastMessage = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files) {
    const remainingSlots = 3 - selectedImages.value.length
    const filesToProcess = Array.from(files).slice(0, remainingSlots)

    filesToProcess.forEach(file => {
      const reader = new FileReader()
      reader.onload = e => {
        selectedImages.value.push(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    })

    // 3장 초과 시 토스트 메시지
    if (Array.from(files).length > remainingSlots) {
      showToastMessage('사진은 최대 3장만 가능합니다.')
    }
  }
}

const removeImage = (index: number) => {
  selectedImages.value.splice(index, 1)
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleEmojiSelected = (selectedEmoji: { file: string; name: string }) => {
  // EmojiPickerModal에서 이모지 선택된 경우
  console.log('이모지 선택됨:', selectedEmoji)
  // EmojiPickerModal에서 자동으로 라우팅 처리하므로 여기서는 모달만 닫기
  showEmojiPickerModal.value = false
}

// DiaryFieldset 포커스/블러 핸들러
const handleFieldsetFocus = () => {
  console.log('🎯 DiaryFieldset 포커스됨 - 가상 키패드가 열릴 수 있음')
  console.log('📱 포커스 상태 변경:', isFieldsetFocused.value, '→', true)
  isFieldsetFocused.value = true
}

const handleFieldsetBlur = () => {
  console.log('🔚 DiaryFieldset 블러됨 - 가상 키패드가 닫힐 수 있음')
  console.log('📱 포커스 상태 변경:', isFieldsetFocused.value, '→', false)
  isFieldsetFocused.value = false
}

// 완료 버튼 핸들러
const handleCompleteClick = () => {
  console.log('완료 버튼 클릭됨 - 포커스 아웃 처리')
  isFieldsetFocused.value = false
  if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

// 레이아웃에서 addTextClick 핸들러 등록
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')

// 가상 키패드 감지 함수
const detectVirtualKeyboard = () => {
  if (typeof window !== 'undefined' && 'visualViewport' in window) {
    const viewport = (window as any).visualViewport

    // 초기 뷰포트 높이 설정
    if (initialViewportHeight.value === 0) {
      initialViewportHeight.value = viewport.height
    }

    // 키패드가 열렸는지 감지 (높이가 20% 이상 줄어들면)
    const heightDifference = initialViewportHeight.value - viewport.height
    const threshold = initialViewportHeight.value * 0.2

    isVirtualKeyboardOpen.value = heightDifference > threshold

    console.log('가상 키패드 상태:', {
      isOpen: isVirtualKeyboardOpen.value,
      initialHeight: initialViewportHeight.value,
      currentHeight: viewport.height,
      difference: heightDifference,
      threshold
    })
  }
}

// 컴포넌트 마운트 시 addTextClick 핸들러 등록 및 기존 다이어리 로드
onMounted(() => {
  // daily-quote 모드가 아닐 때만 기본 이모지 설정
  if (!route.query.type && !route.query.emoji && !route.query.name && !selectedEmoji.value) {
    selectedEmoji.value = { src: '/_nuxt/assets/images/emoji/happy.svg', label: '행복' }
  }

  // 수정 모드인 경우에만 기존 다이어리 로드
  if (route.query.edit === 'true' && route.query.id) {
    loadExistingDiary()
  }

  if (setAddTextClickHandler) {
    console.log('setAddTextClickHandler 설정:', showSaveConfirm)
    setAddTextClickHandler(showSaveConfirm)
  } else {
    console.error('setAddTextClickHandler가 없습니다!')
  }

  // 가상 키패드 감지 이벤트 리스너 등록
  if (typeof window !== 'undefined' && 'visualViewport' in window) {
    const viewport = (window as any).visualViewport
    viewport.addEventListener('resize', detectVirtualKeyboard)

    // 초기 상태 설정
    initialViewportHeight.value = viewport.height
  }
})

// 날짜 포맷 함수
const formatDate = (date: Date) => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  const weekday = weekdays[date.getDay()]
  return `${month}월 ${day}일 ${weekday}요일`
}

// 오늘 날짜 이후 날짜들을 비활성화하기 위한 함수
const getDisabledDates = () => {
  const today = new Date()
  const disabledDates = []

  // 오늘부터 1년 후까지의 모든 날짜를 비활성화
  for (let i = 0; i < 365; i++) {
    const futureDate = new Date(today)
    futureDate.setDate(today.getDate() + i + 1) // 오늘 다음날부터
    disabledDates.push(futureDate)
  }

  return disabledDates
}

// 날짜 선택 모달 상태
const showDatePickerModal = ref(false)

// 바텀시트 열기
const openDatePicker = () => {
  showDatePickerModal.value = true
}
</script>

<style lang="scss" scoped>
:deep(.date-range-select) {
  min-height: auto;
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
  font-size: 1.2rem;
  .icon {
    width: 1.8rem;
    height: 1.8rem;
    background-position: center;
  }
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
  padding: 2.4rem 2rem;

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
.daily-quote-title {
  display: flex;
  width: calc(100% - 0.8rem);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1.6rem 2rem;
  margin: 0 auto 2.4rem;
  border-radius: 2rem;
  background: #fcf1e9;
  gap: 0.6rem;
  span {
    font-size: 1.4rem;
    font-weight: 600;
    padding-left: 2.4rem;
    color: #4776e5;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.33317 7.33341C1.33317 3.65152 4.31794 0.666748 7.99984 0.666748C11.6817 0.666748 14.6665 3.65152 14.6665 7.33341C14.6665 11.0153 11.6817 14.0001 7.99984 14.0001C4.31794 14.0001 1.33317 11.0153 1.33317 7.33341Z' fill='%234776E5'/%3E%3Cpath d='M12.6665 12.0938L14.6665 14.0004H7.99984V12.6671L12.6665 12.0938Z' fill='%234776E5'/%3E%3Cpath d='M6.3335 8H11.0002C11.1843 8 11.3335 8.14924 11.3335 8.33333V9C11.3335 9.18409 11.1843 9.33333 11.0002 9.33333H6.3335C6.1494 9.33333 6.00016 9.18409 6.00016 9V8.33333C6.00016 8.14924 6.1494 8 6.3335 8Z' fill='white'/%3E%3Cpath d='M5.00016 5.33325H11.0002C11.1843 5.33325 11.3335 5.48249 11.3335 5.66659V6.33325C11.3335 6.51735 11.1843 6.66658 11.0002 6.66658H5.00016C4.81607 6.66658 4.66683 6.51735 4.66683 6.33325V5.66659C4.66683 5.48249 4.81607 5.33325 5.00016 5.33325Z' fill='white'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: left center;
  }
}

.sticky-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: white;
  padding: 1.6rem 2rem;
  border-top: 0.1rem solid #e9ecef;
  box-shadow: 0 -0.2rem 1rem rgba(0, 0, 0, 0.1);
}

.keyboard-status {
  margin: 1.6rem 0;
  padding: 1.2rem;
  background: #f8f9fa;
  border: 0.1rem solid #e9ecef;
  border-radius: 0.8rem;

  p {
    margin: 0.4rem 0;
    font-size: 1.2rem;
    color: #6c757d;
  }
}

.modal-confirm-modal {
  width: calc(100% - 7.3rem);
  :deep(.c-modal-inner) {
    max-width: 100%;
    width: 100%;
    padding: 0;
  }
  :deep(.c-modal-header) {
    padding: 3.2rem 2rem 2.4rem;
  }
  :deep(.c-modal-body) {
    text-align: left;
    padding: 0 2rem;
  }
}

.date-display {
  display: flex;
  align-items: center;
  justify-content: center;

  .date-picker-display {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .date-label {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.8335 8.33325L10.0008 12.1499L14.1668 8.33325' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 1.8rem;
    padding-right: 2rem;
  }
}

.date-picker-sheet {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;

  .date-picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem 2rem;
    border-bottom: 0.1rem solid #e2e2e2;

    .close-button {
      background: none;
      border: none;
      font-size: 1.4rem;
      color: #6c757d;
      cursor: pointer;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      color: #333;
    }
  }

  .date-picker-body {
    background-color: #fff;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    padding: 2rem;
    width: 100%;
    box-shadow: 0 -0.2rem 1rem rgba(0, 0, 0, 0.1);
  }
}
</style>
