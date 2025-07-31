<template>
  <BaseBody
    :page-title="'마음 일기'"
    :show-back-button="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    :add-text="showCalendar ? '목록보기' : '달력보기'"
  >
    <section>
      <!-- 달력 섹션 컴포넌트 -->
      <DiaryCalendarSection
        :diary-data="diaryData"
        :disabled-dates="disabledDates"
        :show-calendar="showCalendar"
        @diary-click="handleDiaryClick"
        @date-change="handleDateChange"
      />

      <DiaryList
        :diary-list="diaryList"
        :show-calendar="showCalendar"
        :current-month="currentMonth"
        :current-year="currentYear"
        :highlighted-date="highlightedDate"
        @edit="editDiary"
        @delete="clickBottomModal"
      />
    </section>

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
  <BottomToast
    v-model="showToastMessage"
    type="success"
    :duration="3000"
  >
    <template #default>
      <p>{{ toastMessage }}</p>
    </template>
  </BottomToast>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, inject, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import DiaryCalendarSection from '~/components/publishing/community/diary/DiaryCalendarSection.vue'
import DiaryList from '~/components/publishing/community/diary/DiaryList.vue'
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
  createdAt: string
}

interface DiaryData {
  status: string
  count?: number
}

const router = useRouter()
const route = useRoute()

// 달력 표시 여부
const showCalendar = ref<boolean>(true)

// 다이어리 목록 (localStorage에서 가져옴)
const diaryList = ref<Diary[]>([])

// 현재 선택된 월 (달력에서 선택된 월)
const currentMonth = ref<number>(new Date().getMonth() + 1)
const currentYear = ref<number>(new Date().getFullYear())

// 다이어리 데이터를 DatePicker용으로 변환
const diaryData = computed((): Record<string, DiaryData> => {
  const data: Record<string, DiaryData> = {}

  // 날짜별로 다이어리 개수 세기
  const dateCounts: Record<string, number> = {}
  diaryList.value.forEach(diary => {
    dateCounts[diary.date] = (dateCounts[diary.date] || 0) + 1
  })

  // 날짜별로 첫 번째 다이어리의 이모지를 저장
  const firstDiaryByDate: Record<string, Diary> = {}
  diaryList.value.forEach(diary => {
    if (!firstDiaryByDate[diary.date]) {
      firstDiaryByDate[diary.date] = diary
    }
  })

  // 각 날짜에 대해 첫 번째 다이어리의 이모지와 개수 정보 저장
  Object.keys(firstDiaryByDate).forEach(date => {
    const firstDiary = firstDiaryByDate[date]
    const emojiFileName = firstDiary.emoji.src.split('/').pop()?.replace('.svg', '') || 'happy'
    const count = dateCounts[date]
    
    data[date] = { 
      status: emojiFileName,
      count: count
    }
  })

  return data
})

const highlightedDate = ref<string | null>(null)

// 모달 상태
const isShowBottomModal = ref<boolean>(false)
const selectedDiary = ref<Diary | null>(null)
const isShowConfirmModal = ref<boolean>(false)

// 토스트 상태
const showToastMessage = ref<boolean>(false)
const toastMessage = ref<string>('')

// BottomModal 관련 함수들
const clickBottomModal = (diary: Diary): void => {
  selectedDiary.value = diary
  isShowBottomModal.value = true
}

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
    diaryList.value = diaryList.value.filter(diary => diary.id !== selectedDiary.value!.id)
    localStorage.setItem('diaryList', JSON.stringify(diaryList.value))
    console.log('다이어리 삭제:', selectedDiary.value.id)
    
    isShowConfirmModal.value = false
    selectedDiary.value = null
    
    // 토스트 메시지 표시
    showToast('일기가 삭제되었습니다.')
  }
}

// 토스트 메시지 표시 함수
const showToast = (message: string): void => {
  toastMessage.value = message
  showToastMessage.value = true
}

// localStorage에서 다이어리 데이터 로드
const loadDiaryData = (): void => {
  try {
    const stored = localStorage.getItem('diaryList')
    if (stored) {
      diaryList.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('다이어리 데이터 로드 실패:', error)
    diaryList.value = []
  }
}

// 다이어리 클릭 핸들러
function handleDiaryClick(data: { diaryInfo: any; dateKey: string }): void {
  if (!data.diaryInfo) {
    // no-data 날짜 클릭 시 작성 페이지로 이동
    router.push({
      path: '/community/diary/create',
      query: { date: data.dateKey }
    })
  } else {
    // 이모지가 있는 날짜 클릭 시 해당 날짜로 스크롤
    scrollToDate(data.dateKey)
  }
}

// DatePicker에서 날짜 변경 시 호출되는 함수
function handleDateChange(newDate: Date): void {
  currentMonth.value = newDate.getMonth() + 1
  currentYear.value = newDate.getFullYear()
}

// 특정 날짜로 스크롤
function scrollToDate(dateKey: string): void {
  if (!dateKey) return

  highlightedDate.value = dateKey

  nextTick(() => {
    const element = document.getElementById(`diary-${dateKey}`)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // center 대신 start로 변경
      })

      // 하이라이트 효과 제거
      setTimeout(() => {
        highlightedDate.value = null
      }, 2000)
    }
  })
}

// 다이어리 수정
function editDiary(diary: Diary): void {
  router.push({
    path: `/community/diary/${diary.id}/edit`
  })
}

// 페이지 제목 클릭 시 달력 토글
const toggleCalendar = (): void => {
  showCalendar.value = !showCalendar.value
}

// 레이아웃에서 addTextClick 핸들러 등록
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')

// 오늘 날짜 이후의 날짜를 비활성화
const disabledDates = computed(() => {
  const today = new Date()
  const disabledDatesArray: Date[] = []

  // 오늘부터 1년 후까지의 모든 날짜를 비활성화
  for (let i = 1; i <= 365; i++) {
    const futureDate = new Date(today)
    futureDate.setDate(today.getDate() + i)
    disabledDatesArray.push(futureDate)
  }

  console.log('🚫 비활성화된 날짜들:', disabledDatesArray.length, '개')
  console.log('🚫 첫 번째 비활성화 날짜:', disabledDatesArray[0])
  console.log('🚫 마지막 비활성화 날짜:', disabledDatesArray[disabledDatesArray.length - 1])

  return disabledDatesArray
})

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadDiaryData()

  // BaseBody의 "작성하기" 버튼 핸들러 등록
  if (setAddTextClickHandler) {
    setAddTextClickHandler(toggleCalendar)
  }
})

// route.query 변경 감지하여 스크롤 처리
watch(
  () => route.query.scrollTo,
  (newScrollTo, oldScrollTo) => {
    // 새로고침 시에는 스크롤하지 않음 (oldScrollTo가 undefined인 경우)
    if (newScrollTo && typeof newScrollTo === 'string' && oldScrollTo !== undefined) {
      // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 스크롤
      setTimeout(() => {
        scrollToDate(newScrollTo)
      }, 100)
    }
  }
)
</script>


