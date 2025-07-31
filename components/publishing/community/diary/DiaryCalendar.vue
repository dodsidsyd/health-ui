<template>
  <div class="diary-Calendar">
    <DatePicker
      v-model="currentDate"
      @update:modelValue="handleDateChange"
      @date-status-change="handleDateStatusChange"
      @emoji-click="handleEmojiClick"
      @diary-click="handleDiaryClick"
      :disabled-dates="disabledDates"
      :show-header="showHeader"
      :show-navigation="showNavigation"
      :enable-month-picker="enableMonthPicker"
      :heart-diary="heartDiary"
      :heartDiaryData="heartDiaryData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import DatePicker from '~/components/publishing/input/DatePicker.vue'

interface Props {
  selectedDate?: Date
  disabledDates?: Array<number | string | Date>
  // DatePicker UI 제어 props
  showHeader?: boolean
  showNavigation?: boolean
  enableMonthPicker?: boolean
  heartDiary?: boolean
  // 하트 다이어리 데이터
  heartDiaryData?: Record<string, { status: string }>
}

interface Emits {
  (e: 'date-change', value: Date): void
  (e: 'date-status-change', value: { date: Date; status: string }): void
  (e: 'emoji-click', value: { date: Date; dateKey: string; vitalInfo: any; originalEvent: Event }): void
  (e: 'diary-click', value: { date: Date; dateKey: string; diaryInfo: any; originalEvent: Event }): void
}

const props = withDefaults(defineProps<Props>(), {
  selectedDate: () => new Date(),
  showHeader: true,
  showNavigation: true,
  enableMonthPicker: true,
  heartDiary: false,
  heartDiaryData: () => ({})
})

const emit = defineEmits<Emits>()

// 내부 날짜 상태
const currentDate = ref(new Date(props.selectedDate))

// props.selectedDate 변경 감지
watch(
  () => props.selectedDate,
  newDate => {
    if (newDate) {
      currentDate.value = new Date(newDate)
    }
  },
  { immediate: true }
)

// DatePicker에서 날짜 변경 처리
const handleDateChange = (newDate: Date) => {
  currentDate.value = newDate
  emit('date-change', newDate)
}

// DatePicker에서 날짜 상태 변경 처리 (heartDiary 모드에서)
const handleDateStatusChange = (dateInfo: { date: Date; status: string }) => {
  console.log('📅 DiaryCalendar - 날짜 상태 변경:', dateInfo)
  currentDate.value = dateInfo.date
  emit('date-change', dateInfo.date)
  emit('date-status-change', dateInfo)
}

// DatePicker에서 이모지 클릭 처리 (vital-record 모드)
const handleEmojiClick = (emojiData: any) => {
  emit('emoji-click', emojiData)
}

// DatePicker에서 다이어리 클릭 처리 (heart-diary 모드)
const handleDiaryClick = (diaryData: any) => {
  console.log('📅 DiaryCalendar - 다이어리 클릭:', diaryData)
  emit('diary-click', diaryData)
}
</script>
