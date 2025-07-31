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
        {{ currentYear }}년 {{ currentMonth }}월
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
              'vital-record': props.vitalRecord,
              'heart-diary': props.heartDiary,
              'no-data': isNoDataDate(date),
              sunday: isSunday(date),
              saturday: isSaturday(date)
            }"
            @click="handleDateClick(date)"
          >
            <span class="date-cell">{{ date }}</span>
            <!-- vital-record 모드일 때만 아이콘 표시 -->
            <span
              v-if="props.vitalRecord || props.heartDiary"
              class="emoji"
              :class="getVitalIconClass(date)"
              @click.stop="handleEmojiClick(date, $event)"
            ></span>
          </div>
        </div>
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

// Props 정의
const props = defineProps({
  modelValue: {
    type: Date,
    default: null
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
  }
})

// Emits 정의
const emit = defineEmits(['update:modelValue', 'emoji-click', 'date-status-change', 'diary-click'])

// 반응형 상태
const currentDate = ref(new Date())
const selectedDate = ref(props.modelValue)
const isPickerMode = ref(false)
const tempSelectedMonth = ref(null) // 임시 선택된 월

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

// 헤더 클릭 핸들러 (enableMonthPicker가 true일 때만 동작)
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
    transition: color 0.2s;

    &.clickable {
      cursor: pointer;

      &:hover {
        color: #4c7ff7;
      }
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

    // heart-diary 모드에서도 disabled 스타일 적용
    &.heart-diary {
      .date-cell {
        color: #d5d5d5;
      }
      
      .emoji {        
        background:url('/_nuxt/assets/images/emoji/blank.svg') no-repeat center center;
        background-size: contain;        
        pointer-events: none;
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
        border:.3rem solid #4C7FF7;
        background-color: #4C7FF7;
      }
    }
    .date-cell {
      width:auto;
      line-height: 1.8rem;
      margin-top: 2rem;
      font-size: 1.3rem;
      font-weight: 500;
      color: #555;
      display: flex;
      height: auto;
      flex-direction: column;
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
        background-image: url("/_nuxt/assets/images/emoji/diary.svg");
      }
      &.today {
        .emoji {
          background-color: #4C7FF7;
          border: .3rem solid #4C7FF7;
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
  .calendar-dates {
    .date-cell {
      width: 2.8rem;
      height: 2.8rem;
      line-height: 3rem;
      font-size: 1.3rem;
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
