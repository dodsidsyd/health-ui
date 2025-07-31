<template>
  <BaseBody
    :page-title="isEditMode ? '마음 일기 수정' : '마음 일기'"
    :show-back-button="true"
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
        <button 
          v-if="!isDailyQuoteMode"
          @click="showEmojiPickerModal = true"
          class="chage-btn"
        >
          <span>기분 바꾸기</span>
          <i class="icon arrow-down-type"></i>
        </button>
        <div v-else class="daily-quote-title">
          <span>오늘 한마디</span>
        </div>
      </FlexColDiv>
      
      <FlexColDiv class="pt-24 pb-24">
        <div v-if="selectedEmoji || isDailyQuoteMode" class="emoji-box">
          <img v-if="selectedEmoji" :src="selectedEmoji.src" :alt="selectedEmoji.label" />
          <p v-if="!isDailyQuoteMode && selectedEmoji">오늘 마음은 {{ selectedEmoji.label }}!</p>
          <p v-else-if="isDailyQuoteMode" v-html="dailyQuoteQuestion"></p>
        </div>
        
        <hr class="mt-24 mb-24" />
        
        <DiaryFieldset
          v-model="diaryContent"
          @focus="handleFieldsetFocus"
          @blur="handleFieldsetBlur"
        />
        
        <!-- 이미지 업로더 컴포넌트 -->
        <DiaryImageUploader
          v-model="selectedImages"
          :class="{ 'is-focused': isFieldsetFocused }"
          :register-button-text="isFieldsetFocused ? '완료' : ''"
          @image-limit-exceeded="() => showToastMessage('사진은 최대 3장만 가능합니다.')"
          @register="handleCompleteClick"
        />
      </FlexColDiv>

    </section>
    
          <!-- 하단 고정 영역 -->
        <ButtonGroup v-if="!isFieldsetFocused" class="is-fixed">
          <Button 
          btn-type="primary" 
          element-type="button" 
          :aria-label="isEditMode ? '수정하기' : '등록하기'"
          class="lg w-full medium btn-sticky"
          @click="showSaveConfirm"
        >
          {{ isEditMode ? '수정하기' : '등록하기' }}
        </Button>
      </ButtonGroup>  
    
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
    />
    
    <!-- 토스트 메시지 -->
    <BottomToastSlot
      v-model="showToast"
      type="success"
    >
      {{ toastMessage }}
    </BottomToastSlot>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import DateRangeSelect from '~/components/smartRing/DateRangeSelect.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import DiaryFieldset from '~/components/publishing/community/diary/DiaryFieldset.vue'
import DiaryImageUploader from '~/components/publishing/community/diary/DiaryImageUploader.vue'
import EmojiPickerModal from '~/components/publishing/community/diary/EmojiPickerModal.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import BottomToastSlot from '~/components/common/bottomToastSlot.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

const router = useRouter()
const route = useRoute()

// 선택된 날짜 (URL 파라미터에서 가져오거나 오늘 날짜)
const selectedDate = ref(new Date(route.query.date as string || new Date()))
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
          console.log('비교:', { fileNameWithoutExt, emojiFileWithoutExt, matches: fileNameWithoutExt === emojiFileWithoutExt })
          return fileNameWithoutExt === emojiFileWithoutExt
        })
        
        if (foundEmoji) {
          selectedEmoji.value = foundEmoji
          console.log('daily-quote 모드에서 이모지 설정 완료:', foundEmoji)
        } else {
          console.log('daily-quote 모드에서 이모지를 찾을 수 없음:', emojiFile)
          console.log('사용 가능한 이모지:', emojiList.map(e => e.src.split('/').pop()?.replace('.svg', '')))
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
        console.log('사용 가능한 이모지:', emojiList.map(e => ({ file: e.src.split('/').pop()?.replace('.svg', ''), label: e.label })))
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
  const existingDiaries = JSON.parse(localStorage.getItem('diaryList') || '[]')
  
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
  localStorage.setItem('diaryList', JSON.stringify(existingDiaries))
  
  console.log('다이어리 저장 완료:', diaryData)
  
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
      reader.onload = (e) => {
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
</script>

<style lang="scss" scoped>
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
.diary-image-uploader {
  position:fixed;
  bottom:5.6rem;
  left:0;  
  z-index: 100;
  padding:0 2rem;
  transition: bottom 0.3s ease;
  
  &.is-focused {
    bottom: 0;
  }
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

</style>
