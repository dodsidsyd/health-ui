<template>
  <div class="diary-calendar-section">
    <div class="calendar-section">
      <DatePicker
        :heartDiary="true"
        :heartDiaryData="diaryData"
        :showHeader="true"
        :showNavigation="true"
        :disabled-dates="disabledDates"
        :showCalendar="showCalendar"
        @diary-click="handleDiaryClick"
        @date-change="handleDateChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DatePicker from '~/components/publishing/input/DatePicker.vue'

// 타입 정의
interface DiaryData {
  status: string
  count?: number
}

interface Props {
  diaryData: Record<string, DiaryData>
  disabledDates: Date[]
  showCalendar: boolean
}

interface Emits {
  (e: 'diary-click', data: { diaryInfo: any; dateKey: string }): void
  (e: 'date-change', newDate: Date): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 다이어리 클릭 핸들러
const handleDiaryClick = (data: { diaryInfo: any; dateKey: string }) => {
  emit('diary-click', data)
}

// 날짜 변경 핸들러
const handleDateChange = (newDate: Date) => {
  emit('date-change', newDate)
}
</script>

<style lang="scss" scoped>
.diary-calendar-section {
  width: 100%;
}

.calendar-section {
  margin-bottom: 2rem;
}
</style> 