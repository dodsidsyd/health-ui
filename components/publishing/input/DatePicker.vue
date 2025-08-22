<template>
  <div class="calendar-sheet">
    <div class="calendar-wrapper">
      <!-- 기본 달력 모드 -->
      <h2
        v-if="props.showHeader"
        class="year"
        :class="{ clickable: props.enableMonthPicker }"
        @click="handleHeaderClick"
      >
        <template v-if="props.weekMode">
          {{ currentYear }}년 {{ currentMonth }}월 <span class="week-number">{{ getWeekOfMonth }}번째 주</span>
        </template>
        <template v-else> {{ currentYear }}년 {{ currentMonth }}월 </template>
      </h2>

      <!-- 월 네비게이션 (조건부) -->
      <div v-if="props.showNavigation" class="calendar-navigation">
        <button type="button" class="btn-prev" @click="previousMonth"></button>
        <button type="button" class="btn-next" @click="nextMonth"></button>
      </div>

      <div v-if="props.showCalendar" class="calendar-content">
        <ol class="calendar-week">
          <li class="sunday">일</li>
          <li>월</li>
          <li>화</li>
          <li>수</li>
          <li>목</li>
          <li>금</li>
          <li class="saturday">토</li>
        </ol>

        <div class="calendar-dates" :class="{ 'week-mode': props.weekMode }">
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
              'vital-record': props.vitalRecord,
              'heart-diary': props.heartDiary,
              'vital-homework': props.vitalHomework,
              'homework-start-date': isHomeworkStartDate(date),
              'homework-end-date': isHomeworkEndDate(date),
              'homework-period': isInHomeworkPeriod(date),
              'no-data': isNoDataDate(date),
              scheduled: isScheduledDate(date),
              sunday: isSunday(date),
              saturday: isSaturday(date),
              'debt-price-mode': props.isShowDebtPrice,
              'no-price': props.isShowDebtPrice && isNoPrice(date)
            }"
            @click="handleDateClick(date)"
          >
            <span class="date-cell">
              {{ date }}
              <!-- 스케줄 마커 (점 스타일) -->
              <span v-if="isScheduledDate(date)" class="schedule-dot"></span>
            </span>
            <!-- vital-record 모드일 때만 아이콘 표시 -->
            <span
              v-if="props.vitalRecord || props.heartDiary"
              class="emoji"
              :class="getVitalIconClass(date)"
              @click.stop="handleEmojiClick(date, $event)"
            ></span>
            <!-- 건강 숙제 모드 -->
            <span
              v-if="props.vitalHomework"
              class="homework-status"
              :class="getHomeworkStatusClass(date)"
              @click.stop="handleHomeworkClick(date, $event)"
            >
              <span v-if="getHomeworkStatus(date) === 'completed'" class="check-icon"></span>
            </span>
            <!-- 건강 부채 모드 -->
            <span v-if="props.isShowDebtPrice && getDebtPrice(date)" class="debt-price">{{ getDebtPrice(date) }}</span>
          </div>
        </div>
      </div>

      <!-- 시간 선택 영역 (showTimePicker가 true일 때만 표시) -->
      <div v-if="props.showTimePicker" class="time-picker-section">
        <HourMinRollSelecter
          v-model="timeValue"
          :minute-step="props.minuteStep"
          :default-hour="props.defaultHour"
          :default-minute="props.defaultMinute"
          @change="handleTimeChange"
        />
      </div>
    </div>

    <!-- 월별 선택 BottomModal -->
    <BottomModal
      :is-visible="isPickerMode"
      title="월 선택"
      :is-show-cancel-button="false"
      :is-show-confirm-button="true"
      :auto-close="true"
      confirm-button-text="확인"
      @close="closeMonthPicker"
      @cancel="closeMonthPicker"
      @confirm="confirmMonthSelection"
    >
      <template #content>
        <div class="month-picker-content">
          <!-- 년도 선택 영역 -->
          <div class="year-picker">
            <div class="year-navigation">
              <button type="button" class="btn-prev" @click="previousYear"></button>
              <h3 class="year-display">{{ currentYear }}년</h3>
              <button type="button" class="btn-next" @click="nextYear"></button>
            </div>
          </div>

          <!-- 월별 그리드 네비게이션 -->
          <div class="month-grid">
            <button
              v-for="(month, index) in monthList"
              :key="index"
              type="button"
              class="month-item"
              :class="{ active: tempSelectedMonth === index + 1 }"
              @click="handleMonthSelection(index + 1)"
            >
              {{ month.name }}
            </button>
          </div>
        </div>
      </template>
    </BottomModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'

import HourMinRollSelecter from '~/components/publishing/input/HourMinRollSelecter.vue'

// Props 정의
const props = defineProps({
  modelValue: {
    type: Date,
    default: null
  },
  // 스케줄된 날짜들 (새로운 props)
  scheduled: {
    type: [String, Array],
    default: () => [],
    validator: value => {
      // 문자열 형태: "1, 13, 15" 또는 "1,13,15"
      // 배열 형태: [1, 13, 15] 또는 ["1", "13", "15"]
      // 날짜 객체 배열: [new Date(), ...]
      // 날짜 문자열 배열: ["2024-01-15", ...]
      if (typeof value === 'string') {
        return true
      }
      if (Array.isArray(value)) {
        return true
      }
      return false
    }
  },
  // 선택 불가 날짜
  disabledDates: {
    type: Array,
    default: () => []
  },
  // 상단 년/월 표시 여부
  showHeader: {
    type: Boolean,
    default: true
  },
  // 월 네비게이션 버튼 표시 여부
  showNavigation: {
    type: Boolean,
    default: true
  },
  // 년/월 클릭으로 월 선택 모드 전환 여부
  enableMonthPicker: {
    type: Boolean,
    default: true
  },
  // 읽기 전용 모드 (날짜 선택 불가)
  vitalRecord: {
    type: Boolean,
    default: false
  },
  // 건강 숙제 모드
  vitalHomework: {
    type: Boolean,
    default: false
  },
  // 건강 숙제 데이터
  vitalHomeworkData: {
    type: Object,
    default: () => ({})
  },
  // 건강 숙제 시작 날짜
  homeworkStartDate: {
    type: [String, Date],
    default: null
  },
  // 건강 숙제 종료 날짜
  homeworkEndDate: {
    type: [String, Date],
    default: null
  },
  // 하트 다이어리 모드
  heartDiary: {
    type: Boolean,
    default: false
  },
  // 활력 데이터
  vitalData: {
    type: Object,
    default: () => ({})
  },
  // 하트 다이어리 데이터
  heartDiaryData: {
    type: Object,
    default: () => ({})
  },
  // 달력 표시 여부
  showCalendar: {
    type: Boolean,
    default: true
  },
  // 시간 선택기 표시 여부 (새로운 prop)
  showTimePicker: {
    type: Boolean,
    default: false
  },
  // 주간 선택 모드 (새로운 prop)
  weekMode: {
    type: Boolean,
    default: false
  },
  // 주간 모드에서 표시할 기준 날짜 (기본값: 오늘)
  weekBaseDate: {
    type: [Date, String],
    default: null
  },
  // 건강 부채 가격 표시 여부
  isShowDebtPrice: {
    type: Boolean,
    default: false
  },
  // 건강 부채 데이터 (날짜별 가격)
  debtPriceData: {
    type: Object,
    default: () => ({})
  },
  // 기본 시간 설정 (시)
  defaultHour: {
    type: Number,
    default: 0,
    validator: value => value >= 0 && value <= 23
  },
  // 기본 분 설정 (분)
  defaultMinute: {
    type: Number,
    default: 0,
    validator: value => value >= 0 && value <= 59
  },
  // 분 단위 간격 (5분, 10분, 15분 등)
  minuteStep: {
    type: Number,
    default: 1,
    validator: value => value > 0 && value <= 60
  }
})

// Emits 정의
const emit = defineEmits([
  'update:modelValue',
  'emoji-click',
  'date-status-change',
  'diary-click',
  'time-change',
  'scheduled-date-click',
  'homework-click'
])

// 반응형 상태
const currentDate = ref(new Date())
const selectedDate = ref(props.modelValue)
const isPickerMode = ref(false)
const tempSelectedMonth = ref(null) // 임시 선택된 월

// 시간 관련 반응형 상태
const timeValue = ref({
  hour: props.defaultHour,
  minute: props.defaultMinute
})

// scheduled 날짜들을 파싱하여 배열로 변환
const scheduledDates = computed(() => {
  const scheduled = props.scheduled

  if (!scheduled || scheduled.length === 0) {
    return []
  }

  // 문자열 형태인 경우: "1, 13, 15"
  if (typeof scheduled === 'string') {
    return scheduled
      .split(',')
      .map(d => d.trim())
      .filter(d => d)
      .map(d => {
        const num = parseInt(d)
        return isNaN(num) ? null : num
      })
      .filter(d => d !== null)
  }

  // 배열 형태인 경우
  if (Array.isArray(scheduled)) {
    return scheduled
      .map(item => {
        // 숫자인 경우
        if (typeof item === 'number') {
          return item
        }
        // 문자열 숫자인 경우
        if (typeof item === 'string' && !item.includes('-')) {
          const num = parseInt(item)
          return isNaN(num) ? null : num
        }
        // 날짜 문자열인 경우 (YYYY-MM-DD)
        if (typeof item === 'string' && item.includes('-')) {
          const date = new Date(item)
          // 현재 표시 중인 년월과 같은 경우만 날짜 추출
          if (
            date.getFullYear() === currentDate.value.getFullYear() &&
            date.getMonth() === currentDate.value.getMonth()
          ) {
            return date.getDate()
          }
          return null
        }
        // Date 객체인 경우
        if (item instanceof Date) {
          // 현재 표시 중인 년월과 같은 경우만 날짜 추출
          if (
            item.getFullYear() === currentDate.value.getFullYear() &&
            item.getMonth() === currentDate.value.getMonth()
          ) {
            return item.getDate()
          }
          return null
        }
        return null
      })
      .filter(d => d !== null && d >= 1 && d <= 31)
  }

  return []
})

// 특정 날짜가 스케줄된 날짜인지 확인
const isScheduledDate = date => {
  return scheduledDates.value.includes(date)
}

// props.modelValue 변경 감지하여 currentDate(표시 월)와 selectedDate 동기화
watch(
  () => props.modelValue,
  newValue => {
    if (newValue) {
      selectedDate.value = new Date(newValue)
      // modelValue 변경 시 해당 월로 달력 표시 이동
      currentDate.value = new Date(newValue.getFullYear(), newValue.getMonth(), 1)
    }
  },
  { immediate: true }
)

// 현재 월에 따른 탭 인덱스
const activePickerTab = computed(() => currentMonth.value - 1)

// 월 데이터 (12개월)
const monthList = [
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

// 주간 모드용 계산된 속성들
const weekStartDate = computed(() => {
  if (!props.weekMode) return null

  // currentDate를 기준으로 주의 시작 날짜 계산
  const baseDate = new Date(currentDate.value)
  const day = baseDate.getDay()
  const diff = baseDate.getDate() - day

  return new Date(baseDate.getFullYear(), baseDate.getMonth(), diff)
})

const weekEndDate = computed(() => {
  if (!props.weekMode || !weekStartDate.value) return null

  const endDate = new Date(weekStartDate.value)
  endDate.setDate(weekStartDate.value.getDate() + 6)

  return endDate
})

// 현재 월의 일수 계산 (주간 모드 고려)
const daysInCurrentMonth = computed(() => {
  if (props.weekMode && weekStartDate.value && weekEndDate.value) {
    // 주간 모드: 해당 주의 모든 날짜를 반환 (7일)
    const dates = []

    // 주의 7일을 모두 추가
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(weekStartDate.value)
      currentDay.setDate(weekStartDate.value.getDate() + i)
      dates.push(currentDay.getDate())
    }

    return dates
  }

  // 기본 모드: 전체 월의 날짜
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const lastDay = new Date(year, month + 1, 0).getDate()

  return Array.from({ length: lastDay }, (_, i) => i + 1)
})

// 월의 첫째 날이 무슨 요일인지 계산 (일요일 = 0)
const firstDayOfMonth = computed(() => {
  if (props.weekMode && weekStartDate.value) {
    // 주간 모드: 첫 날이 항상 일요일이므로 padding 없음
    return 0
  }

  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month, 1).getDay()
})

// 달력 시작 부분의 빈 칸 수
const startPadding = computed(() => {
  if (props.weekMode && weekStartDate.value) {
    // 주간 모드에서는 주의 시작부터 현재 표시 월의 첫 번째 날짜까지의 빈 칸 수 계산
    const currentMonth = currentDate.value.getMonth()
    const currentYear = currentDate.value.getFullYear()

    // 주간 모드에서는 빈 칸 없음 (7일 모두 표시)
    return 0
  }

  return firstDayOfMonth.value
})

// 시간 관련 메소드들
const handleTimeChange = timeInfo => {
  timeValue.value = timeInfo

  if (selectedDate.value) {
    const newDateTime = new Date(selectedDate.value)
    newDateTime.setHours(timeInfo.hour, timeInfo.minute, 0, 0)

    selectedDate.value = newDateTime
    emit('update:modelValue', newDateTime)
    emit('time-change', {
      hour: timeInfo.hour,
      minute: timeInfo.minute,
      dateTime: newDateTime
    })

    console.log(`⏰ 시간 변경: ${timeInfo.hour}:${String(timeInfo.minute).padStart(2, '0')}`)
  }
}

// 메소드들
const previousMonth = () => {
  if (props.weekMode) {
    // 주간 모드: 이전 주로 이동
    const newDate = new Date(currentDate.value)
    newDate.setDate(newDate.getDate() - 7)
    currentDate.value = newDate
  } else {
    // 기본 모드: 이전 월로 이동
    const newDate = new Date(currentDate.value)
    newDate.setMonth(newDate.getMonth() - 1)
    currentDate.value = newDate
  }
}

const nextMonth = () => {
  if (props.weekMode) {
    // 주간 모드: 다음 주로 이동
    const newDate = new Date(currentDate.value)
    newDate.setDate(newDate.getDate() + 7)
    currentDate.value = newDate
  } else {
    // 기본 모드: 다음 월로 이동
    const newDate = new Date(currentDate.value)
    newDate.setMonth(newDate.getMonth() + 1)
    currentDate.value = newDate
  }
}

// 주간 모드 헤더 포맷팅
const formatWeekHeader = () => {
  if (!weekStartDate.value || !weekEndDate.value) return ''

  const startMonth = weekStartDate.value.getMonth() + 1
  const startDate = weekStartDate.value.getDate()
  const endMonth = weekEndDate.value.getMonth() + 1
  const endDate = weekEndDate.value.getDate()
  const year = weekStartDate.value.getFullYear()

  if (startMonth === endMonth) {
    return `${year}년 ${startMonth}월 ${startDate}일 - ${endDate}일`
  } else {
    return `${year}년 ${startMonth}월 ${startDate}일 - ${endMonth}월 ${endDate}일`
  }
}

// 헤더 클릭 핸들러 (enableMonthPicker가 true일 때 동작)
const handleHeaderClick = () => {
  if (props.enableMonthPicker) {
    openMonthPicker()
  }
}

// 월 선택 모달 열기
const openMonthPicker = () => {
  tempSelectedMonth.value = currentMonth.value // 현재 월을 임시 선택으로 설정
  isPickerMode.value = true
}

// 월 선택 모달 닫기
const closeMonthPicker = () => {
  tempSelectedMonth.value = null // 임시 선택 초기화
  isPickerMode.value = false
}

// 월 선택 핸들러 (임시 선택)
const handleMonthSelection = month => {
  tempSelectedMonth.value = month
  console.log(`📅 임시 선택: ${currentYear.value}년 ${month}월`)
}

// 월 선택 확인
const confirmMonthSelection = () => {
  if (tempSelectedMonth.value) {
    selectMonth(tempSelectedMonth.value)
  } else {
    closeMonthPicker()
  }
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

// 월 선택 (모달 닫고 해당 월로 이동)
const selectMonth = month => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(month - 1)

  // 주간 모드에서는 선택한 월의 1일이 포함된 주로 이동
  if (props.weekMode) {
    // 단순히 해당 월의 1일로 설정 - weekStartDate에서 주의 시작을 계산할 것임
    newDate.setDate(1)
  }

  currentDate.value = newDate
  tempSelectedMonth.value = null // 임시 선택 초기화
  closeMonthPicker() // 월 선택 후 모달 닫기

  console.log(`📅 ${currentYear.value}년 ${month}월로 이동`)
}

// 날짜 클릭 핸들러 (vitalRecord 모드에서는 동작하지 않음)
const handleDateClick = date => {
  // disabled 날짜인지 먼저 확인
  if (isDisabled(date)) {
    console.log(`❌ 비활성화된 날짜입니다: ${currentYear.value}년 ${currentMonth.value}월 ${date}일`)
    return
  }

  // 건강 숙제 모드에서는 homework-click 이벤트 발생
  if (props.vitalHomework) {
    const year = currentDate.value.getFullYear()
    const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
    const day = String(date).padStart(2, '0')
    const dateKey = `${year}-${month}-${day}`

    const homeworkInfo = props.vitalHomeworkData[dateKey]
    const clickInfo = {
      date: new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), date),
      dateKey: dateKey,
      hasHomework: !!homeworkInfo,
      homeworkInfo: homeworkInfo,
      status: getHomeworkStatus(date)
    }

    emit('homework-click', clickInfo)
    return
  }

  // 스케줄된 날짜 클릭 시 이벤트 발생
  if (isScheduledDate(date)) {
    const scheduleInfo = {
      date: new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), date),
      year: currentYear.value,
      month: currentMonth.value,
      day: date
    }
    emit('scheduled-date-click', scheduleInfo)
    console.log(`📌 스케줄된 날짜 클릭: ${currentYear.value}년 ${currentMonth.value}월 ${date}일`)
  }

  if (props.vitalRecord) {
    // vitalRecord 모드에서는 날짜 선택 대신 status 정보를 emit
    const status = getDateStatus(date)
    const dateInfo = {
      date: new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), date),
      status: status
    }

    emit('date-status-change', dateInfo)
    return
  }

  if (props.heartDiary) {
    // heartDiary 모드에서는 diary-click 이벤트 emit
    const year = currentDate.value.getFullYear()
    const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
    const day = String(date).padStart(2, '0')
    const dateKey = `${year}-${month}-${day}`

    const diaryInfo = props.heartDiaryData[dateKey]
    const clickInfo = {
      date: new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), date),
      dateKey: dateKey,
      hasDiary: !!diaryInfo,
      diaryInfo: diaryInfo
    }

    emit('diary-click', clickInfo)
    return
  }

  selectDate(date)
}

const selectDate = date => {
  // disabled 날짜인지 확인
  if (isDisabled(date)) {
    console.log(`❌ 비활성화된 날짜입니다: ${currentYear.value}년 ${currentMonth.value}월 ${date}일`)
    return
  }

  let year, month

  // week-mode에서는 실제 날짜의 월을 계산해야 함
  if (props.weekMode && weekStartDate.value) {
    // 주간 모드: 주의 시작일 기준으로 날짜 계산
    const dayIndex = daysInCurrentMonth.value.indexOf(date)
    if (dayIndex !== -1) {
      const actualDate = new Date(weekStartDate.value)
      actualDate.setDate(weekStartDate.value.getDate() + dayIndex)
      year = actualDate.getFullYear()
      month = actualDate.getMonth()
    } else {
      // fallback to currentDate
      year = currentDate.value.getFullYear()
      month = currentDate.value.getMonth()
    }
  } else {
    // 일반 모드: currentDate 사용
    year = currentDate.value.getFullYear()
    month = currentDate.value.getMonth()
  }

  // 시간 선택기가 활성화된 경우 시간 정보 포함
  const newSelectedDate = props.showTimePicker
    ? new Date(year, month, date, timeValue.value.hour, timeValue.value.minute)
    : new Date(year, month, date)

  selectedDate.value = newSelectedDate
  emit('update:modelValue', newSelectedDate)

  if (props.showTimePicker) {
    console.log(
      `📅 선택된 날짜/시간: ${newSelectedDate.getFullYear()}년 ${newSelectedDate.getMonth() + 1}월 ${newSelectedDate.getDate()}일 ${String(timeValue.value.hour).padStart(2, '0')}:${String(timeValue.value.minute).padStart(2, '0')}`
    )
  } else {
    console.log(
      `📅 선택된 날짜: ${newSelectedDate.getFullYear()}년 ${newSelectedDate.getMonth() + 1}월 ${newSelectedDate.getDate()}일`
    )
  }
}

const isSelected = date => {
  if (!selectedDate.value) return false

  let year, month

  // week-mode에서는 실제 날짜의 월을 계산해야 함
  if (props.weekMode && weekStartDate.value) {
    // 주간 모드: 주의 시작일 기준으로 날짜 계산
    const dayIndex = daysInCurrentMonth.value.indexOf(date)
    if (dayIndex !== -1) {
      const actualDate = new Date(weekStartDate.value)
      actualDate.setDate(weekStartDate.value.getDate() + dayIndex)
      year = actualDate.getFullYear()
      month = actualDate.getMonth()
    } else {
      // fallback to currentDate
      year = currentDate.value.getFullYear()
      month = currentDate.value.getMonth()
    }
  } else {
    // 일반 모드: currentDate 사용
    year = currentDate.value.getFullYear()
    month = currentDate.value.getMonth()
  }

  const checkDate = new Date(year, month, date)

  return selectedDate.value.toDateString() === checkDate.toDateString()
}

const isToday = date => {
  const today = new Date()

  let year, month

  // week-mode에서는 실제 날짜의 월을 계산해야 함
  if (props.weekMode && weekStartDate.value) {
    // 주간 모드: 주의 시작일 기준으로 날짜 계산
    const dayIndex = daysInCurrentMonth.value.indexOf(date)
    if (dayIndex !== -1) {
      const actualDate = new Date(weekStartDate.value)
      actualDate.setDate(weekStartDate.value.getDate() + dayIndex)
      year = actualDate.getFullYear()
      month = actualDate.getMonth()
    } else {
      // fallback to currentDate
      year = currentDate.value.getFullYear()
      month = currentDate.value.getMonth()
    }
  } else {
    // 일반 모드: currentDate 사용
    year = currentDate.value.getFullYear()
    month = currentDate.value.getMonth()
  }

  const checkDate = new Date(year, month, date)

  return today.toDateString() === checkDate.toDateString()
}

const isDisabled = date => {
  let year, month

  // week-mode에서는 실제 날짜의 월을 계산해야 함
  if (props.weekMode && weekStartDate.value) {
    // 주간 모드: 주의 시작일 기준으로 날짜 계산
    const dayIndex = daysInCurrentMonth.value.indexOf(date)
    if (dayIndex !== -1) {
      const actualDate = new Date(weekStartDate.value)
      actualDate.setDate(weekStartDate.value.getDate() + dayIndex)
      year = actualDate.getFullYear()
      month = actualDate.getMonth()
    } else {
      // fallback to currentDate
      year = currentDate.value.getFullYear()
      month = currentDate.value.getMonth()
    }
  } else {
    // 일반 모드: currentDate 사용
    year = currentDate.value.getFullYear()
    month = currentDate.value.getMonth()
  }

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

// 숙제 기간 내의 날짜인지 확인
const isInHomeworkPeriod = date => {
  if (!props.vitalHomework || !props.homeworkStartDate || !props.homeworkEndDate) return false

  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const checkDate = new Date(year, month, date)
  checkDate.setHours(0, 0, 0, 0)

  let startDate, endDate

  if (typeof props.homeworkStartDate === 'string') {
    startDate = new Date(props.homeworkStartDate)
  } else {
    startDate = new Date(props.homeworkStartDate)
  }
  startDate.setHours(0, 0, 0, 0)

  if (typeof props.homeworkEndDate === 'string') {
    endDate = new Date(props.homeworkEndDate)
  } else {
    endDate = new Date(props.homeworkEndDate)
  }
  endDate.setHours(0, 0, 0, 0)

  return checkDate >= startDate && checkDate <= endDate
}

// 숙제 시작 날짜인지 확인
const isHomeworkStartDate = date => {
  if (!props.vitalHomework || !props.homeworkStartDate) return false

  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const checkDate = new Date(year, month, date)

  let startDate
  if (typeof props.homeworkStartDate === 'string') {
    startDate = new Date(props.homeworkStartDate)
  } else {
    startDate = props.homeworkStartDate
  }

  return checkDate.toDateString() === startDate.toDateString()
}

// 숙제 종료 날짜인지 확인
const isHomeworkEndDate = date => {
  if (!props.vitalHomework || !props.homeworkEndDate) return false

  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const checkDate = new Date(year, month, date)

  let endDate
  if (typeof props.homeworkEndDate === 'string') {
    endDate = new Date(props.homeworkEndDate)
  } else {
    endDate = props.homeworkEndDate
  }

  return checkDate.toDateString() === endDate.toDateString()
}

// 건강 숙제 상태 클래스 계산
const getHomeworkStatusClass = date => {
  const status = getHomeworkStatus(date)
  return status ? `homework-${status}` : ''
}

// 건강 숙제 상태 가져오기
const getHomeworkStatus = date => {
  if (!props.vitalHomework) return null

  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  const day = String(date).padStart(2, '0')
  const dateKey = `${year}-${month}-${day}`

  const homeworkInfo = props.vitalHomeworkData[dateKey]
  if (!homeworkInfo) return null

  // status는 'pending', 'in-progress', 'completed', 'missed' 등이 될 수 있음
  return homeworkInfo.status || null
}

// 건강 숙제 클릭 핸들러
const handleHomeworkClick = (date, event) => {
  event.preventDefault()

  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  const day = String(date).padStart(2, '0')
  const dateKey = `${year}-${month}-${day}`

  const clickedDate = new Date(year, currentDate.value.getMonth(), date)
  const homeworkInfo = props.vitalHomeworkData[dateKey]

  emit('homework-click', {
    date: clickedDate,
    dateKey: dateKey,
    homeworkInfo: homeworkInfo || null,
    status: getHomeworkStatus(date),
    originalEvent: event
  })

  console.log(`📋 건강 숙제 클릭: ${dateKey}`, homeworkInfo)
}

// 건강 부채 가격 가져오기
const getDebtPrice = date => {
  if (!date || typeof date !== 'number') return ''

  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  const day = String(date).padStart(2, '0')
  const dateKey = `${year}-${month}-${day}`

  const price = props.debtPriceData[dateKey]
  if (!price || price === 0) return ''

  // 천단위 콤마 추가
  return price.toLocaleString('ko-KR')
}

// 부채 가격이 0인지 확인
const isNoPrice = date => {
  if (!date || typeof date !== 'number') return false

  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  const day = String(date).padStart(2, '0')
  const dateKey = `${year}-${month}-${day}`

  const price = props.debtPriceData[dateKey]
  return price === 0 || price === undefined || price === null
}

// 활력 아이콘 클래스 계산
const getVitalIconClass = date => {
  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  const day = String(date).padStart(2, '0')
  const dateKey = `${year}-${month}-${day}`

  if (props.heartDiary) {
    const diaryInfo = props.heartDiaryData[dateKey]
    if (!diaryInfo) return ''
    return diaryInfo.status || 'emoji-diary'
  } else {
    const vitalInfo = props.vitalData[dateKey]
    if (!vitalInfo) return ''
    return vitalInfo.status
  }
}

// 날짜의 status 값 가져오기
const getDateStatus = date => {
  if (!props.vitalRecord && !props.heartDiary) {
    return 'no-data'
  }

  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  const day = String(date).padStart(2, '0')
  const dateKey = `${year}-${month}-${day}`

  if (props.heartDiary) {
    const diaryInfo = props.heartDiaryData[dateKey]
    if (!diaryInfo) {
      return isNoDataDate(date) ? 'no-data' : null
    }
    return diaryInfo.status || 'no-data'
  } else {
    const vitalInfo = props.vitalData[dateKey]
    if (!vitalInfo) {
      return isNoDataDate(date) ? 'no-data' : null
    }
    return vitalInfo.status || 'no-data'
  }
}

// vitalData에 있는 마지막 날짜 이전 날짜 중 emoji 클래스만 있는 경우 판단
const isNoDataDate = date => {
  if (!props.vitalRecord && !props.heartDiary) return false

  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const checkDate = new Date(year, month, date)
  const today = new Date()
  today.setHours(0, 0, 0, 0) // 시간을 00:00:00으로 설정하여 날짜만 비교

  if (props.heartDiary) {
    // heart-diary 모드일 때 heartDiaryData 사용
    const monthStr = String(month + 1).padStart(2, '0')
    const dayStr = String(date).padStart(2, '0')
    const dateKey = `${year}-${monthStr}-${dayStr}`

    const diaryInfo = props.heartDiaryData[dateKey]

    // 데이터가 없고 오늘 또는 과거 날짜인 경우 diary.svg 사용 (no-data)
    if (!diaryInfo && checkDate <= today) {
      return true
    }

    // 데이터가 없고 미래 날짜인 경우 기본값 사용 (no-data 아님)
    if (!diaryInfo && checkDate > today) {
      return false
    }

    return false
  } else {
    // vital-record 모드일 때 vitalData 사용 (기존 로직 유지)
    const vitalDates = Object.keys(props.vitalData)
      .filter(dateKey => props.vitalData[dateKey])
      .sort()

    if (vitalDates.length === 0) return false

    const lastVitalDateStr = vitalDates[vitalDates.length - 1]
    const lastVitalDate = new Date(lastVitalDateStr)

    if (checkDate >= lastVitalDate) return false

    const monthStr = String(month + 1).padStart(2, '0')
    const dayStr = String(date).padStart(2, '0')
    const dateKey = `${year}-${monthStr}-${dayStr}`

    const vitalInfo = props.vitalData[dateKey]
    return !vitalInfo
  }
}

// 이모지 클릭 핸들러
const handleEmojiClick = (date, event) => {
  event.preventDefault()

  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  const day = String(date).padStart(2, '0')
  const dateKey = `${year}-${month}-${day}`

  const clickedDate = new Date(year, currentDate.value.getMonth(), date)

  if (props.heartDiary) {
    // heart-diary 모드일 때 다이어리 관련 이벤트 발생
    const diaryInfo = props.heartDiaryData[dateKey]
    emit('diary-click', {
      date: clickedDate,
      dateKey: dateKey,
      diaryInfo: diaryInfo || null,
      originalEvent: event
    })
  } else {
    // vital-record 모드일 때 기존 이벤트 발생
    const vitalInfo = props.vitalData[dateKey]
    emit('emoji-click', {
      date: clickedDate,
      dateKey: dateKey,
      vitalInfo: vitalInfo || null,
      originalEvent: event
    })
  }
}

// 주간 모드에서 날짜가 현재 주에 속하는지 확인
const isInCurrentWeek = date => {
  if (!props.weekMode || !weekStartDate.value || !weekEndDate.value) return true

  const checkDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), date)
  return checkDate >= weekStartDate.value && checkDate <= weekEndDate.value
}

// 주간 모드에서 몇 번째 주인지 계산 (계산된 속성으로 변경)
const getWeekOfMonth = computed(() => {
  if (!props.weekMode || !weekStartDate.value) return 1

  const currentMonth = currentDate.value.getMonth()
  const currentYear = currentDate.value.getFullYear()

  // 현재 표시 중인 월의 첫째 날
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)

  // 현재 주에서 표시 월에 해당하는 모든 날짜 찾기
  const datesInCurrentMonth = []
  for (let i = 0; i < 7; i++) {
    const dayInWeek = new Date(weekStartDate.value)
    dayInWeek.setDate(weekStartDate.value.getDate() + i)

    if (dayInWeek.getMonth() === currentMonth && dayInWeek.getFullYear() === currentYear) {
      datesInCurrentMonth.push(dayInWeek.getDate())
    }
  }

  // 현재 월에 해당하는 날짜가 없으면 1 반환
  if (datesInCurrentMonth.length === 0) return 1

  // 현재 월에서 가장 작은 날짜를 기준으로 주차 계산
  const smallestDate = Math.min(...datesInCurrentMonth)

  // 해당 월의 몇 번째 주인지 계산
  return Math.ceil((smallestDate + firstDayOfMonth.getDay()) / 7)
})

// 컴포넌트 마운트 시 오늘 날짜로 초기화
onMounted(() => {
  if (props.weekMode) {
    // 주간 모드: 기준 날짜 또는 오늘 날짜 기준으로 초기화
    const baseDate = props.weekBaseDate ? new Date(props.weekBaseDate) : new Date()
    currentDate.value = baseDate

    if (props.modelValue) {
      selectedDate.value = new Date(props.modelValue)
    }
  } else {
    // 기본 모드
    if (!props.modelValue) {
      currentDate.value = new Date()
    } else {
      currentDate.value = new Date(props.modelValue)
      selectedDate.value = new Date(props.modelValue)
    }
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
    gap: 0 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 3.2rem;

    transition: color 0.2s;
    &::after {
      content: '';
      width: 2rem;
      height: 2rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none'%3E%3Cpath d='M6.33301 8.33325L10.5004 12.1499L14.6663 8.33325' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
    &:not(.clickable) {
      cursor: default;
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
    position: relative;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
    &.btn-prev {
      left: 0rem;
    }
    &.btn-next {
      right: 0rem;
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
  gap: 0.8rem;
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

  > div {
    display: flex;
    justify-content: center;
  }
  .empty-date {
    height: 3.6rem;
  }

  .date-cell {
    cursor: pointer;
    height: 3.4rem;
    width: 3.4rem;
    line-height: 3.4rem;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    font-weight: 500;
    justify-content: center;
    border-radius: 50%;
    position: relative;
    transition: background-color 0.2s;

    // 스케줄 점(Dot) 마커 스타일
    .schedule-dot {
      position: absolute;
      bottom: -0.4rem;
      left: 50%;
      transform: translateX(-50%);
      width: 0.5rem;
      height: 0.5rem;
      background-color: #4c7ff7;
      border-radius: 50%;
      transition: all 0.2s ease;
      animation: schedulePulse 2s ease-in-out infinite;
    }
  }

  // 스케줄된 날짜 스타일
  .scheduled {
    .date-cell {
      // font-weight: 600;

      .schedule-dot {
        opacity: 0.9;
        border: 1px vars.$white solid;
      }
    }

    // 선택된 날짜의 점 색상
    &.selected .date-cell .schedule-dot {
      opacity: 1;
    }

    // 오늘 날짜의 점 강조
    &.today .date-cell .schedule-dot {
      background-color: #4c7ff7;
      opacity: 1;
      width: 0.7rem;
      height: 0.7rem;
    }

    // 일요일 스케줄 점 색상
    &.sunday .date-cell .schedule-dot {
      background-color: #f14960;
    }

    // 토요일 스케줄 점 색상
    &.saturday .date-cell .schedule-dot {
      background-color: #4c7ff7;
    }

    // 호버 시 점 강조
    &:hover .date-cell {
      transform: scale(1.05);

      .schedule-dot {
        width: 0.6rem;
        height: 0.6rem;
        opacity: 1;
        animation: schedulePulse 0.5s ease-in-out infinite;
      }
    }
  }

  // 펄스 애니메이션
  @keyframes schedulePulse {
    0%,
    100% {
      transform: translateX(-50%) scale(1);
      opacity: 0.8;
    }
    50% {
      transform: translateX(-50%) scale(1.2);
      opacity: 1;
    }
  }

  .disabled-day {
    .date-cell {
      cursor: not-allowed;
      color: #d5d5d5;
      background-color: transparent;

      &:hover {
        background-color: transparent;
      }

      // disabled 날짜의 스케줄 점도 흐리게
      .schedule-dot {
        background-color: #d5d5d5;
        animation: none;
        opacity: 0.3;
      }
    }

    // heart-diary 모드에서도 disabled 스타일 적용
    &.heart-diary {
      .date-cell {
        color: #d5d5d5;
      }

      .emoji {
        background: url('/_nuxt/assets/images/emoji/blank.svg') no-repeat center center;
        background-size: contain;
        pointer-events: none;
      }
    }
  }

  // 일요일 날짜 스타일
  .sunday {
    &.disabled-day {
      .date-cell {
        color: #d5d5d5;
      }
    }
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
    &.disabled-day {
      .date-cell {
        color: #d5d5d5;
      }
    }
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

  // vitalRecord 모드 스타일(스마트링 활력 기록)
  .vital-record {
    display: flex;
    flex-direction: column;
    align-items: center;

    .date-cell {
      cursor: default;
      line-height: 1.8rem;
      margin-top: 2rem;
      font-size: 1.3rem;
      font-weight: 500;
      color: #555;
      display: flex;
      height: auto;
      flex-direction: column;

      // vital-record 모드에서도 스케줄 점 표시
      .schedule-dot {
        position: relative;
        bottom: auto;
        margin-top: 0.4rem;
      }
    }

    .emoji {
      width: 3.2rem;
      height: 3.2rem;
      display: block;
      flex: 0 0 auto;
      border: 0.1rem dashed #d2d2d2;
      box-sizing: border-box;
      border-radius: 50%;
      background-color: #f9f9f9;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      animation: none;
      margin-top: 0.4rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &.excellent,
      &.good,
      &.normal,
      &.bad {
        border: none;
        background-color: transparent;
      }
    }

    &.no-data {
      .emoji {
        border: none;
        background-color: transparent;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='61' viewBox='0 0 60 61' fill='none'%3E%3Ccircle cx='29.9986' cy='30.1807' r='30' fill='url(%23paint0_radial_6395_44383)'/%3E%3Cpath d='M30.3917 47.0757C33.7497 47.0757 36.5267 50.2077 35.0297 52.0757C34.1647 53.1547 26.6187 53.1547 25.7547 52.0757C24.2567 50.2067 27.2637 47.0757 30.3917 47.0757Z' fill='black'/%3E%3Cpath d='M15.0455 42.6292C13.0225 42.6292 11.3775 40.8942 11.3775 38.7622C11.3775 38.3482 11.7135 38.0122 12.1275 38.0122C12.5415 38.0122 12.8775 38.3482 12.8775 38.7622C12.8775 40.0672 13.8505 41.1292 15.0455 41.1292C16.2385 41.1292 17.2115 40.0672 17.2115 38.7622C17.2115 38.3482 17.5475 38.0122 17.9615 38.0122C18.3755 38.0122 18.7115 38.3482 18.7115 38.7622C18.7115 40.8942 17.0665 42.6292 15.0455 42.6292Z' fill='black'/%3E%3Cpath d='M46.8971 42.6292C44.8741 42.6292 43.2291 40.8942 43.2291 38.7622C43.2291 38.3482 43.5651 38.0122 43.9791 38.0122C44.3931 38.0122 44.7291 38.3482 44.7291 38.7622C44.7291 40.0672 45.7021 41.1292 46.8971 41.1292C48.0901 41.1292 49.0631 40.0672 49.0631 38.7622C49.0631 38.3482 49.3991 38.0122 49.8131 38.0122C50.2271 38.0122 50.5631 38.3482 50.5631 38.7622C50.5631 40.8942 48.9191 42.6292 46.8971 42.6292Z' fill='black'/%3E%3Cg filter='url(%23filter0_f_6395_44383)'%3E%3Cpath d='M50.738 46.407C50.279 48.737 49.549 50.967 48.578 53.067C47.568 53.387 46.398 53.477 45.189 53.277C41.939 52.737 39.6279 50.277 40.0479 47.797C40.4579 45.317 43.427 43.747 46.689 44.287C48.379 44.567 49.808 45.367 50.738 46.407Z' fill='%23E0CBC0' fill-opacity='0.5'/%3E%3C/g%3E%3Cg filter='url(%23filter1_f_6395_44383)'%3E%3Cpath d='M20.5186 47.797C20.9386 50.277 18.6286 52.737 15.3786 53.277C14.2586 53.467 13.1786 53.397 12.2186 53.137C11.2086 50.967 10.4586 48.657 9.99863 46.237C10.9186 45.277 12.2886 44.557 13.8786 44.287C17.1386 43.747 20.1076 45.317 20.5186 47.797Z' fill='%23E0CBC0' fill-opacity='0.5'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_6395_44383' x='35.9987' y='40.1807' width='18.7393' height='17.2024' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='2' result='effect1_foregroundBlur_6395_44383'/%3E%3C/filter%3E%3Cfilter id='filter1_f_6395_44383' x='5.99863' y='40.1807' width='18.5693' height='17.2041' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='2' result='effect1_foregroundBlur_6395_44383'/%3E%3C/filter%3E%3CradialGradient id='paint0_radial_6395_44383' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(16.9986 6.18066) rotate(60.9454) scale(61.7738)'%3E%3Cstop stop-color='%23EAE7E2'/%3E%3Cstop offset='1' stop-color='%23E2DCD0'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E");
      }
    }

    &.today .date-cell,
    &.selected .date-cell {
      color: #555;
      background-color: transparent;
      &::before {
        content: none;
      }
    }

    // 요일별 색상도 유지
    &.sunday {
      .date-cell {
        color: #f14960;
      }
    }

    &.saturday {
      .date-cell {
        color: #4c7ff7;
      }
    }
  }

  // heart-diary 모드 스타일(하트 다이어리 기록)
  .heart-diary {
    display: flex;
    flex-direction: column;
    align-items: center;
    &.today {
      .emoji {
        border: 0.3rem solid #4c7ff7;
        background-color: #4c7ff7;
      }
    }
    .date-cell {
      width: auto;
      line-height: 1.8rem;
      margin-top: 2rem;
      font-size: 1.3rem;
      font-weight: 500;
      color: #555;
      display: flex;
      height: auto;
      flex-direction: column;

      // heart-diary 모드에서도 스케줄 점 표시
      .schedule-dot {
        position: relative;
        bottom: auto;
        margin-top: 0.4rem;
      }
    }

    .emoji {
      width: 3.2rem;
      height: 3.2rem;
      display: block;
      flex: 0 0 auto;
      box-sizing: border-box;
      border-radius: 50%;
      background-color: #f9f9f9;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      animation: none;
      margin-top: 0.4rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &.excellent,
      &.good,
      &.normal,
      &.bad,
      &.emoji-diary {
        border: none;
        background-color: transparent;
      }
    }

    &.no-data {
      .emoji {
        border: none;
        background-color: transparent;
        background-image: url('/_nuxt/assets/images/emoji/diary.svg');
      }
      &.today {
        .emoji {
          background-color: #4c7ff7;
          border: 0.3rem solid #4c7ff7;
        }
      }
    }

    &.today .date-cell,
    &.selected .date-cell {
      color: #555;
      background-color: transparent;
      &::before {
        content: none;
      }
    }

    // 요일별 색상도 유지
    &.sunday {
      .date-cell {
        color: #f14960;
      }
    }

    &.saturday {
      .date-cell {
        color: #4c7ff7;
      }
    }
  }

  // 호버 효과 (disabled가 아닌 경우에만)
  div:not(.disabled-day):not(.selected):not(.just-show) {
    .date-cell:hover {
      background-color: #f6f9ff;
    }
  }

  // 건강 숙제 모드
  .vital-homework {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    // 숙제 기간 내 날짜들의 연결 배경
    &.homework-period {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3.2rem;
        background: #dbe5fd;
        z-index: 0;
      }

      // 주의 첫 날이 아닌 경우 왼쪽 연결
      &:not(.sunday):not(:first-child)::before {
        left: -50%;
      }

      // 주의 마지막 날이 아닌 경우 오른쪽 연결
      &:not(.saturday):not(:last-child)::before {
        right: -50%;
      }

      .date-cell {
        position: relative;
        z-index: 1;
        font-weight: 600;
      }

      .homework-status {
        border: 0.1rem solid transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='18' viewBox='0 0 19 18' fill='none'%3E%3Cpath d='M9.50033 3.66699L9.50033 14.3337M14.8337 9.00033L4.16699 9.00033' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
        position: relative;
        background-color: vars.$blue-primary;
        z-index: 2;
        transition: 0.3s all ease;
      }
    }

    // 숙제 시작 날짜 스타일
    &.homework-start-date,
    &.sunday {
      &.homework-period::before {
        left: 2.6rem !important;
      }
    }

    // 숙제 종료 날짜 스타일
    &.homework-end-date,
    &.saturday {
      &.homework-period::before {
        right: 2.6rem !important;
      }
    }

    // 시작과 종료가 같은 날인 경우
    &.homework-start-date.homework-end-date {
      &.homework-period::before {
        left: 0;
        right: 0;
      }
    }

    .date-cell {
      cursor: pointer;
      line-height: 1.8rem;
      margin-top: 0.8rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: #555;
      display: flex;
      height: auto;
      flex-direction: column;
    }

    .homework-status {
      width: 3.2rem;
      height: 3.2rem;
      display: block;
      flex: 0 0 auto;
      box-sizing: border-box;
      border-radius: 50%;
      background-color: #eee;
      margin-top: 0.4rem;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      border: 0.2rem solid transparent;

      // 진행 중 상태
      &.homework-in-progress {
        background-color: #e3f2fd;
        border-color: #2196f3;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0.8rem;
          height: 0.8rem;
          background-color: #2196f3;
          border-radius: 50%;
        }
      }

      // 완료 상태
      &.homework-completed {
        border-color: vars.$blue-primary;
        background-color: vars.$white;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 26 26' fill='none'%3E%3Cpath d='M18.1199 9.16016L10.4831 16.8402L7.87988 14.2223' stroke='%234C7FF7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }

      // 놓친 상태
      &.homework-missed {
        background-color: #ffebee;
        border-color: #f44336;
        opacity: 0.7;

        &::before,
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1.4rem;
          height: 0.2rem;
          background-color: #f44336;
        }

        &::before {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        &::after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
    }

    &.today {
      .date-cell {
        background: none;
        font-weight: 600;
      }
      .homework-status {
        background-color: vars.$white;
        border: 0.2rem solid vars.$blue-primary;
        &::before {
          content: '';
          display: block;
          position: absolute;
          left: -0.4rem;
          right: -0.4rem;
          top: -0.4rem;
          bottom: -0.4rem;
          border: 0.1rem solid vars.$blue-primary;
          border-radius: 50%;
          opacity: 0.5;

          // scale 애니메이션 추가
          animation: pulse-scale 2s ease-in-out infinite;
        }
        @keyframes pulse-scale {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      }
    }

    &.selected .date-cell {
      color: #555;
      background-color: transparent;
      &::before {
        content: none;
      }
    }

    // 요일별 색상 유지
    &.sunday {
      .date-cell {
        color: #f14960;
      }
    }

    &.saturday {
      .date-cell {
        color: #4c7ff7;
      }
    }

    // 비활성화된 날짜
    &.disabled-day {
      .date-cell {
        color: #d5d5d5;
        cursor: not-allowed;
      }

      .homework-status {
        opacity: 0.3;
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }

  // 건강 부채 모드
  .debt-price-mode {
    flex-direction: column;
    align-items: center;
    .date-cell {
      line-height: 3rem;
      height: 3rem;
    }
    &.selected,
    &.today,
    &.saturday,
    &.sunday {
      .date-cell {
        color: #2b2b2b;
        background-color: transparent;
      }
    }
    &.no-price {
      .date-cell {
        color: #d5d5d5;
      }
    }
    .debt-price {
      font-size: 0.9rem;
      color: #555;
      font-weight: 400;
    }
  }
}

/* 시간 선택 영역 스타일 */
.time-picker-section {
  .time-picker-header {
    margin-bottom: 1.6rem;

    .time-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: #26282c;
      margin: 0;
      text-align: center;
    }
  }
}

/* 월 선택 모달 내용 스타일 */
.month-picker-content {
  .year-picker {
    margin-bottom: 2.4rem;

    .year-navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .year-display {
        font-size: 2rem;
        font-weight: 700;
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
        border: none;
        background-color: transparent;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  .month-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
    justify-items: center;
    .month-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.6rem;
      height: 3.6rem;
      line-height: 3.7rem;
      background-color: vars.$white;
      font-size: 1.6rem;
      border-radius: 50%;
      font-weight: 500;
      color: #2b2b2b;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: center;

      &.active {
        background-color: #4c7ff7;
        color: vars.$white;
        font-weight: 600;
      }
    }
  }
}

@media (max-width: 375px) {
  .calendar-wrapper {
    .year {
      font-size: 1.8rem;
    }
  }
  .calendar-dates {
    .date-cell {
      width: 2.8rem;
      height: 2.8rem;
      line-height: 3rem;
      font-size: 1.3rem;

      .schedule-dot {
        width: 0.4rem;
        height: 0.4rem;
        bottom: -0.2rem;
      }
    }
  }

  .month-picker-content {
    .month-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;

      .month-item {
        padding: 1.2rem;
        font-size: 1.4rem;
      }
    }
  }
}
</style>
