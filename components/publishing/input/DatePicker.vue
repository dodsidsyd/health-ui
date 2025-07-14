<template>
  <div class="calendar-sheet">
    <div class="calendar-wrapper">
      <!-- 기본 달력 모드 -->
      <template v-if="!isPickerMode">
        <!-- 동적 월/년 표시 -->
        <h2 class="year" @click="togglePickerMode">{{ currentYear }}년 {{ currentMonth }}월</h2>

        <!-- 월 네비게이션 -->
        <div class="calendar-navigation">
          <button type="button" class="btn-prev" @click="previousMonth"></button>
          <button type="button" class="btn-next" @click="nextMonth"></button>
        </div>

        <ol class="calendar-week">
          <li class="sunday">일</li>
          <li>월</li>
          <li>화</li>
          <li>수</li>
          <li>목</li>
          <li>금</li>
          <li class="saturday">토</li>
        </ol>

        <div class="calendar-dates">
          <!-- 이전 달의 빈 날짜들 -->
          <div v-for="emptyDay in startPadding" :key="'empty-' + emptyDay" class="empty-date"></div>

          <!-- 현재 달의 날짜들 -->
          <div
            v-for="date in daysInCurrentMonth"
            :key="date"
            :class="{
              selected: isSelected(date),
              today: isToday(date),
              'disabled-day': isDisabled(date),
              sunday: isSunday(date),
              saturday: isSaturday(date)
            }"
            @click="selectDate(date)"
          >
            <span class="date-cell">{{ date }}</span>
          </div>
        </div>
      </template>

      <!-- 월별 선택 모드 -->
      <template v-else>
        <!-- 년도 선택 영역 -->
        <div class="year-picker">
          <div class="year-navigation">
            <button type="button" class="btn-prev" @click="previousYear"></button>
            <h3 class="year-display">{{ currentYear }}년</h3>
            <button type="button" class="btn-next" @click="nextYear"></button>
          </div>
        </div>

        <!-- 월별 탭 네비게이션 -->
        <div class="picker-container">
          <div class="picker-tabs">
            <BoxedTabsFill :tabs="pickerTabs" :active-index="activePickerTab" @tab-click="handleMonthTabClick" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BoxedTabsFill from '~/components/common/tab/BoxedTabsFill.vue'

// Props 정의
const props = defineProps({
  modelValue: {
    type: Date,
    default: null
  },
  // 선택 불가 날짜
  disabledDates: {
    type: Array,
    default: () => [1, 3, 5, 30]
  }
})

// Emits 정의
const emit = defineEmits(['update:modelValue'])

// 반응형 상태
const currentDate = ref(new Date())
const selectedDate = ref(props.modelValue)
const isPickerMode = ref(false)

// 현재 월에 따른 탭 인덱스
const activePickerTab = computed(() => currentMonth.value - 1)

// 탭 데이터 (월별 탭)
const pickerTabs = [
  { name: '1월', code: 'month-1' },
  { name: '2월', code: 'month-2' },
  { name: '3월', code: 'month-3' },
  { name: '4월', code: 'month-4' },
  { name: '5월', code: 'month-5' },
  { name: '6월', code: 'month-6' },
  { name: '7월', code: 'month-7' },
  { name: '8월', code: 'month-8' },
  { name: '9월', code: 'month-9' },
  { name: '10월', code: 'month-10' },
  { name: '11월', code: 'month-11' },
  { name: '12월', code: 'month-12' }
]

// 계산된 속성들
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth() + 1)

// 현재 월의 일수 계산
const daysInCurrentMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month + 1, 0).getDate()
})

// 월의 첫째 날이 무슨 요일인지 계산 (일요일 = 0)
const firstDayOfMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month, 1).getDay()
})

// 달력 시작 부분의 빈 칸 수
const startPadding = computed(() => firstDayOfMonth.value)

// 메소드들
const previousMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

const nextMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

// 선택 모드 토글
const togglePickerMode = () => {
  isPickerMode.value = !isPickerMode.value
}

// 월 탭 클릭 핸들러 (기본 모드로 변경)
const handleMonthTabClick = index => {
  const selectedMonth = index + 1
  selectMonth(selectedMonth)
}

// 년도 네비게이션
const previousYear = () => {
  const newDate = new Date(currentDate.value)
  newDate.setFullYear(newDate.getFullYear() - 1)
  currentDate.value = newDate
}

const nextYear = () => {
  const newDate = new Date(currentDate.value)
  newDate.setFullYear(newDate.getFullYear() + 1)
  currentDate.value = newDate
}

// 월 선택 (기본 모드로 복귀)
const selectMonth = month => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(month - 1)
  currentDate.value = newDate
  isPickerMode.value = false // 월 선택 후 기본 모드로 복귀

  console.log(`📅 ${currentYear.value}년 ${month}월로 이동`)
}

const selectDate = date => {
  // disabled 날짜인지 확인
  if (isDisabled(date)) {
    console.log(`❌ 비활성화된 날짜입니다: ${currentYear.value}년 ${currentMonth.value}월 ${date}일`)
    return
  }

  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const newSelectedDate = new Date(year, month, date)

  selectedDate.value = newSelectedDate
  emit('update:modelValue', newSelectedDate)

  console.log(
    `📅 선택된 날짜: ${newSelectedDate.getFullYear()}년 ${newSelectedDate.getMonth() + 1}월 ${newSelectedDate.getDate()}일`
  )
}

const isSelected = date => {
  if (!selectedDate.value) return false

  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const checkDate = new Date(year, month, date)

  return selectedDate.value.toDateString() === checkDate.toDateString()
}

const isToday = date => {
  const today = new Date()
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const checkDate = new Date(year, month, date)

  return today.toDateString() === checkDate.toDateString()
}

const isDisabled = date => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const checkDate = new Date(year, month, date)

  return props.disabledDates.some(disabledDate => {
    // Date 객체 형태
    if (disabledDate instanceof Date) {
      return disabledDate.toDateString() === checkDate.toDateString()
    }
    // 문자열 형태 지원 (YYYY-MM-DD)
    if (typeof disabledDate === 'string') {
      const [disYear, disMonth, disDay] = disabledDate.split('-').map(Number)
      return disYear === year && disMonth === month + 1 && disDay === date
    }
    // 숫자 형태 (날짜만)
    if (typeof disabledDate === 'number') {
      return disabledDate === date
    }
    return false
  })
}

// 요일별 색상을 위한 헬퍼 함수
const getDayOfWeek = date => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const checkDate = new Date(year, month, date)
  return checkDate.getDay() // 일요일 = 0, 토요일 = 6
}

const isSunday = date => getDayOfWeek(date) === 0
const isSaturday = date => getDayOfWeek(date) === 6

// 컴포넌트 마운트 시 오늘 날짜로 초기화
onMounted(() => {
  if (!props.modelValue) {
    currentDate.value = new Date()
  } else {
    currentDate.value = new Date(props.modelValue)
    selectedDate.value = new Date(props.modelValue)
  }
})
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  max-width: 48rem;
  margin: 0 auto;
  position: relative;

  .year {
    text-align: center;
    margin-bottom: 0;
    font-size: 2rem;
    font-weight: 700;
    color: #26282c;
    position: absolute;
    top: 0;
    left: 3.2rem;
    line-height: 3.2rem;
    text-align: center;
    right: 3.2rem;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #4c7ff7;
    }
  }
}

/* 월/년 선택 컨테이너 */
.picker-container {
  margin-top: 0;

  .picker-tabs {
    margin-bottom: 2.4rem;
    display: flex;
    justify-content: center;

    :deep(.boxed-tabs) {
      width: 100%;

      .tabs-container {
        justify-content: flex-start;
        overflow-x: auto;
        scrollbar-width: thin;
        gap: 1.2rem;

        .tab-link {
          flex-shrink: 0;
          min-width: auto;
          padding: 0.6rem 1.2rem;
          border-radius: 50%;
          width: 3.6rem;
          height: 3.6rem;
          font-size: 1.6rem;
          font-weight: 500;
          color: #2b2b2b;
          background: vars.$white;
          transition: all 0.2s;

          &.active {
            background-color: #4c7ff7;
            color: white;
            font-weight: 600;
          }
        }
      }
    }
  }
}

/* 연도 선택 모드 스타일 */
.year-picker {
  .year-navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.6rem;

    .year-display {
      font-size: 2rem;
      font-weight: 700;
      color: #4c7ff7;
      margin: 0;
    }

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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M20 22.6666L13.3334 16L20 9.33329' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}

.btn-next {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M12 9.33337L18.6666 16L12 22.6667' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}

/* 요일 행 스타일 */
.calendar-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: 500;
  text-align: center;
  margin-bottom: 1.6rem;

  li {
    padding: 0;
    font-size: 1.4rem;
    color: #959595;

    &.sunday {
      color: #f14960;
    }

    &.saturday {
      color: #4c7ff7;
    }
  }
}

/* 날짜 셀 스타일 */
.calendar-dates {
  display: grid;
  text-align: center;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.8rem;

  .empty-date {
    height: 3.6rem;
  }

  .date-cell {
    cursor: pointer;
    height: 3.6rem;
    width: 3.6rem;
    line-height: 3.4rem;
    display: flex;
    align-items: center;
    font-weight: 500;
    justify-content: center;
    border-radius: 50%;
    position: relative;
    transition: background-color 0.2s;
  }

  .disabled-day {
    .date-cell {
      cursor: not-allowed;
      color: #d5d5d5;
      background-color: transparent;

      &:hover {
        background-color: transparent;
      }
    }
  }

  // 일요일 날짜 스타일
  .sunday {
    .date-cell {
      color: #f14960;
    }

    &.selected .date-cell {
      background-color: #f14960;
      color: white;
    }

    &.today .date-cell {
      background-color: #fce8ec;
      color: #f14960;
    }

    &.selected.today .date-cell {
      background-color: #f14960;
      color: white;
      &::before {
        border-color: #f14960;
      }
    }
  }

  // 토요일 날짜 스타일
  .saturday {
    .date-cell {
      color: #4c7ff7;
    }

    &.selected .date-cell {
      background-color: #4c7ff7;
      color: white;
    }

    &.today .date-cell {
      background-color: #dbe5fd;
      color: #4c7ff7;
    }

    &.selected.today .date-cell {
      background-color: #4c7ff7;
      color: white;
      &::before {
        border-color: #4c7ff7;
      }
    }
  }

  .selected .date-cell {
    background-color: #4c7ff7;
    color: white;
  }

  .today .date-cell {
    background-color: #dbe5fd;
    color: #4c7ff7;
  }

  .selected.today .date-cell {
    background-color: #4c7ff7;
    color: white;
    &::before {
      content: '';
      position: absolute;
      left: -0.3rem;
      right: -0.3rem;
      bottom: -0.3rem;
      top: -0.3rem;
      border: 0.1rem #4c7ff7 solid;
      border-radius: 50%;
    }
  }

  // 호버 효과 (disabled가 아닌 경우에만)
  div:not(.disabled-day):not(.selected) {
    .date-cell:hover {
      background-color: #f6f9ff;
    }
  }
}

@media (max-width: 375px) {
  .calendar-dates {
    .date-cell {
      width: 2.8rem;
      height: 2.8rem;
      line-height: 3rem;
      font-size: 1.3rem;
    }
  }

  .picker-container {
    .picker-tabs {
      :deep(.boxed-tabs .tabs-container .tab-link) {
        width: 3.2rem;
        height: 3.2rem;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
