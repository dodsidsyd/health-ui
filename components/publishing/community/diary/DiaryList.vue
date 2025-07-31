<template>
  <div class="diary-list-wrap">
    <div v-for="dateGroup in groupedDiaryList" :key="dateGroup.date" class="date-group">
      <div class="date-header" :class="{ today: isToday(dateGroup.date) }">
        {{ formatDateWithToday(dateGroup.date) }}
      </div>

      <div class="diary-entries">
        <DiaryItem
          v-for="diary in dateGroup.diaries"
          :key="diary.id"
          :diary="diary"
          :highlighted="highlightedDate === diary.date"
          @edit="$emit('edit', diary)"
          @show-actions="$emit('delete', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DiaryItem from '~/components/publishing/community/diary/DiaryItem.vue'

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

interface DateGroup {
  date: string
  diaries: Diary[]
}

interface Props {
  diaryList: Diary[]
  showCalendar: boolean
  currentMonth: number
  currentYear: number
  highlightedDate: string | null
}

interface Emits {
  edit: [diary: Diary]
  delete: [diary: Diary]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 현재 월의 다이어리만 필터링
const filteredDiaryList = computed((): Diary[] => {
  if (props.showCalendar) {
    return props.diaryList
  } else {
    return props.diaryList.filter(diary => {
      const diaryDate = new Date(diary.date)
      return diaryDate.getMonth() + 1 === props.currentMonth && diaryDate.getFullYear() === props.currentYear
    })
  }
})

// 날짜별로 그룹화된 다이어리 목록
const groupedDiaryList = computed((): DateGroup[] => {
  const grouped: DateGroup[] = []
  const diaryMap: Record<string, Diary[]> = {}

  filteredDiaryList.value.forEach(diary => {
    const dateKey = diary.date
    if (!diaryMap[dateKey]) {
      diaryMap[dateKey] = []
    }
    diaryMap[dateKey].push(diary)
  })

  Object.keys(diaryMap).forEach(date => {
    grouped.push({
      date: date,
      diaries: diaryMap[date]
    })
  })

  // 오늘 날짜 기준으로 가까운 날짜가 먼저 보이도록 정렬
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return grouped.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    // 오늘 날짜와의 차이 계산
    const diffA = Math.abs(dateA.getTime() - today.getTime())
    const diffB = Math.abs(dateB.getTime() - today.getTime())

    return diffA - diffB
  })
})

// 요일 가져오기
function getWeekday(dateStr: string): string {
  const date = new Date(dateStr)
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  return weekdays[date.getDay()]
}

// 오늘 날짜인지 체크
function isToday(dateStr: string): boolean {
  const today = new Date()
  const checkDate = new Date(dateStr)

  return today.toDateString() === checkDate.toDateString()
}

// 날짜 포맷 (오늘인 경우 "오늘" 표시)
function formatDateWithToday(dateStr: string): string {
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekday = getWeekday(dateStr)

  if (isToday(dateStr)) {
    return `오늘 (${month}월 ${day}일 ${weekday}요일)`
  }

  return `${month}월 ${day}일 ${weekday}요일`
}
</script>

<style lang="scss" scoped>
.diary-list-wrap {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 3.2rem 2rem;
  margin: 0 -2rem;
  background: #f4f4f4;

  .date-header {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.2rem;
    margin-bottom: 1.6rem;
  }

  .diary-entries {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
}
</style>
