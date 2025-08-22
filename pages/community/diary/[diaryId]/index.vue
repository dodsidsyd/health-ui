<template>
  <BaseBody
    :page-title="pageTitle"
    :show-back-button="true"
    :has-menu="true"
    :add-text-click-enabled="true"
    add-text=""
    add-text-icon="ico-menu"
    :title-center="true"
  >
    <!-- 다이어리 상세 보기 컴포넌트 -->
    <DiaryDetailView :diary="currentDiary" />

    <!-- 액션 모달 -->
    <DiaryActions
      :is-show-bottom-modal="isShowBottomModal"
      :is-show-confirm-modal="isShowConfirmModal"
      :selected-diary="selectedDiary"
      @close="toggleBottomModal"
      @edit="editDiary"
      @show-delete-confirm="clickConfirmModal"
      @confirm-delete="confirmDelete"
      @cancel-delete="clickCancelConfirm"
    />
  </BaseBody>

  <!-- 토스트 메시지 -->
  <BottomToast v-model="showToastMessage" type="success" :duration="3000">
    <template #default>
      <p>{{ toastMessage }}</p>
    </template>
  </BottomToast>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import DiaryDetailView from '~/components/publishing/community/diary/DiaryDetailView.vue'
import DiaryActions from '~/components/publishing/community/diary/DiaryActions.vue'
import BottomToast from '~/components/common/bottomToast.vue'

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

const router = useRouter()
const route = useRoute()

// Daily-quote 질문에서 <br/> 태그 제거
const getCleanQuestion = (question: string) => {
  if (question) {
    return question.replace(/<br\s*\/?>/gi, ' ')
  }
  return ''
}

// 다이어리 데이터
const selectedDate = ref<Date>(new Date())
const selectedEmoji = ref<{ src: string; label: string }>({ src: '', label: '' })
const diaryContent = ref<string>('')
const currentDiary = ref<Diary | null>(null)

// 모달 상태
const isShowBottomModal = ref<boolean>(false)
const selectedDiary = ref<Diary | null>(null)
const isShowConfirmModal = ref<boolean>(false)

// 토스트 상태
const showToastMessage = ref<boolean>(false)
const toastMessage = ref<string>('')

// 페이지 제목
const pageTitle = computed((): string => {
  return '마음일기'
})

// localStorage에서 다이어리 데이터 로드
const loadDiaryData = (): void => {
  try {
    const diaryId = Number(route.params.diaryId)
    const stored = localStorage.getItem('diaryList')

    if (stored) {
      const diaryList: Diary[] = JSON.parse(stored)
      const diary = diaryList.find(d => d.id === diaryId)

      if (diary) {
        currentDiary.value = diary
        selectedDate.value = new Date(diary.date)
        selectedEmoji.value = diary.emoji
        diaryContent.value = diary.content
        selectedDiary.value = diary
      } else {
        // 다이어리를 찾을 수 없는 경우
        alert('다이어리를 찾을 수 없습니다.')
        router.push('/community/diary/list')
      }
    }
  } catch (error) {
    console.error('다이어리 데이터 로드 실패:', error)
    alert('다이어리 데이터를 불러오는데 실패했습니다.')
    router.push('/community/diary/list')
  }
}

// BottomModal 관련 함수들
const toggleBottomModal = (): void => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickConfirmModal = (): void => {
  isShowBottomModal.value = false
  isShowConfirmModal.value = true
}

const clickCancelConfirm = (): void => {
  isShowConfirmModal.value = false
  selectedDiary.value = null
}

const confirmDelete = (): void => {
  if (selectedDiary.value) {
    // localStorage에서 삭제
    const stored = localStorage.getItem('diaryList')
    if (stored) {
      const diaryList: Diary[] = JSON.parse(stored)
      const updatedList = diaryList.filter(diary => diary.id !== selectedDiary.value!.id)
      localStorage.setItem('diaryList', JSON.stringify(updatedList))

      console.log('다이어리 삭제:', selectedDiary.value.id)

      isShowConfirmModal.value = false
      selectedDiary.value = null

      // 토스트 메시지 표시
      showToast('일기가 삭제되었습니다.')

      // 목록 페이지로 이동
      setTimeout(() => {
        router.push('/community/diary/list')
      }, 1000)
    }
  }
}

// 토스트 메시지 표시 함수
const showToast = (message: string): void => {
  toastMessage.value = message
  showToastMessage.value = true
}

// 다이어리 수정
function editDiary(diary: Diary): void {
  router.push({
    path: `/community/diary/${diary.id}/edit`
  })
}

// 레이아웃에서 addTextClick 핸들러 등록
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadDiaryData()

  // BaseBody의 "더보기" 버튼 핸들러 등록
  if (setAddTextClickHandler) {
    setAddTextClickHandler(toggleBottomModal)
  }
})
</script>

<style lang="scss" scoped></style>
