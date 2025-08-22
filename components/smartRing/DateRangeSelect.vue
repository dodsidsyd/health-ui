<template>
  <div class="date-range-select">
    <div class="calendar-navigation">
      <button v-if="prevBtn" type="button" class="btn-prev" @click="previousMonth"></button>
      <button v-if="nextBtn" type="button" class="btn-next" @click="nextMonth"></button>
    </div>
    <div class="date-range-txt">
      <strong class="range-tit">{{ formatCurrentDate }}</strong>
      <span v-if="props.navigationMode === 'week'" class="detail-range">{{ formatWeekRange }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  modelValue?: Date
  navigationMode?: 'week' | 'month' | 'day' | 'notyear' | 'year'
  prevBtn?: boolean
  nextBtn?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: Date): void
  (e: 'change', value: Date): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => new Date(),
  navigationMode: 'week',
  prevBtn: true,
  nextBtn: true
})

const emit = defineEmits<Emits>()

// 현재 선택된 날짜
const currentDate = ref(new Date(props.modelValue))

// props.modelValue 변경 감지
watch(
  () => props.modelValue,
  newValue => {
    if (newValue) {
      currentDate.value = new Date(newValue)
    }
  },
  { immediate: true }
)

// 이전 기간으로 이동
const previousMonth = () => {
  const newDate = new Date(currentDate.value)

  switch (props.navigationMode) {
    case 'day':
      newDate.setDate(newDate.getDate() - 1)
      break
    case 'week':
      newDate.setDate(newDate.getDate() - 7)
      break
    case 'month':
      newDate.setMonth(newDate.getMonth() - 1)
      break
    case 'year':
      newDate.setFullYear(newDate.getFullYear() - 1)
      break
    case 'notyear':
      newDate.setDate(newDate.getDate() - 1)
      break
  }

  currentDate.value = newDate
  emit('update:modelValue', newDate)
  emit('change', newDate)
}

// 다음 기간으로 이동
const nextMonth = () => {
  const newDate = new Date(currentDate.value)

  switch (props.navigationMode) {
    case 'day':
      newDate.setDate(newDate.getDate() + 1)
      break
    case 'week':
      newDate.setDate(newDate.getDate() + 7)
      break
    case 'month':
      newDate.setMonth(newDate.getMonth() + 1)
      break
    case 'year':
      newDate.setFullYear(newDate.getFullYear() + 1)
      break
    case 'notyear':
      newDate.setDate(newDate.getDate() + 1)
      break
  }

  currentDate.value = newDate
  emit('update:modelValue', newDate)
  emit('change', newDate)
}

// 현재 날짜 포맷 (navigationMode에 따라 다르게 표시)
const formatCurrentDate = computed(() => {
  const date = currentDate.value
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  const weekday = weekdays[date.getDay()]

  switch (props.navigationMode) {
    case 'week': {
      // 해당 월의 몇 번째 주인지 계산
      const firstDayOfMonth = new Date(year, month - 1, 1)
      const firstWeekStart = new Date(firstDayOfMonth)
      firstWeekStart.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay())

      const currentWeekStart = new Date(date)
      currentWeekStart.setDate(date.getDate() - date.getDay())

      const weekNumber =
        Math.floor((currentWeekStart.getTime() - firstWeekStart.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1

      return `${year}년 ${month}월 ${weekNumber}주`
    }

    case 'month':
      return `${year}년 ${month}월`

    case 'year':
      return `${year}년`

    case 'notyear':
      return `${month}월 ${day}일 ${weekday}`

    case 'day':
    default:
      return `${year}년 ${month}월 ${day}일 ${weekday}`
  }
})

// 범위 포맷 (navigationMode에 따라 다르게 표시)
const formatWeekRange = computed(() => {
  const date = new Date(currentDate.value)

  const formatDate = (d: Date) => {
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${month}월 ${day}일`
  }

  switch (props.navigationMode) {
    case 'day':
      return formatDate(date)

    case 'week': {
      // 해당 주의 일요일 찾기
      const startOfWeek = new Date(date)
      startOfWeek.setDate(date.getDate() - date.getDay())

      // 해당 주의 토요일 찾기
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      return `${formatDate(startOfWeek)} ~ ${formatDate(endOfWeek)}`
    }

    case 'month': {
      // 해당 월의 첫날과 마지막날
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      return `${formatDate(startOfMonth)} ~ ${formatDate(endOfMonth)}`
    }

    default:
      return formatDate(date)
  }
})
</script>

<style scoped lang="scss">
.date-range-select {
  max-width: 48rem;
  margin: 0 auto;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 4.6rem;
  .date-range-txt {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    .range-tit {
      font-size: 2rem;
      line-height: 2.6rem;
      font-weight: 700;
      color: #2b2b2b;
    }
    .detail-range {
      font-size: 1.4rem;
      line-height: 2rem;
      color: #555;
      font-weight: 500;
    }
  }
  .calendar-navigation {
    position: absolute;
    top: 50%;
    width: 100%;
    left: 0;
    transform: translateY(-50%);
  }
}

.calendar-navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.6rem;

  .btn-prev,
  .btn-next {
    width: 3.2rem;
    height: 3.2rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
}
// 좌우 화살표 공통
.btn-prev {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M20 22.6666L13.3334 16L20 9.33329' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}

.btn-next {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M12 9.33337L18.6666 16L12 22.6667' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
</style>
