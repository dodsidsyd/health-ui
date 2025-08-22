<template>
  <div class="weekly-picker">
    <!-- 요일 헤더 -->
    <div class="week-header">
      <div class="day-name sunday">일</div>
      <div class="day-name">월</div>
      <div class="day-name">화</div>
      <div class="day-name">수</div>
      <div class="day-name">목</div>
      <div class="day-name">금</div>
      <div class="day-name saturday">토</div>
    </div>

    <!-- 날짜 그리드 -->
    <div class="week-dates">
      <div
        v-for="date in weekDates"
        :key="date.date"
        :class="{
          'date-item': true,
          selected: isSelectedDate(date.date),
          today: isToday(date.date),
          disabled: isDisabledDate(date.date),
          sunday: date.dayOfWeek === 0,
          saturday: date.dayOfWeek === 6,
          'heart-diary': true,
          'no-data': isNoDataDate(date.date)
        }"
        @click="handleDateClick(date.date)"
      >
        <span class="date-cell">{{ date.day }}</span>
        <span class="emoji" :class="getEmojiClass(date.date)" @click.stop="handleEmojiClick(date.date, $event)"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  selectedDate: Date
  diaryData: Record<string, any>
  disabledDates?: string[]
}

interface Emits {
  (e: 'date-click', date: string): void
  (e: 'emoji-click', date: string, event: Event): void
  (e: 'no-data-click', date: string): void
}

const props = withDefaults(defineProps<Props>(), {
  disabledDates: () => []
})

const emit = defineEmits<Emits>()

// 한주 날짜들 계산
const weekDates = computed(() => {
  const today = new Date()
  const currentDay = today.getDay() // 0: 일요일, 6: 토요일
  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - currentDay) // 이번 주 일요일

  const dates = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)
    dates.push({
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      dayOfWeek: date.getDay()
    })
  }
  return dates
})

// 날짜 상태 확인 함수들
const isSelectedDate = (dateStr: string) => {
  return props.selectedDate.toISOString().split('T')[0] === dateStr
}

const isToday = (dateStr: string) => {
  const today = new Date().toISOString().split('T')[0]
  return dateStr === today
}

const isDisabledDate = (dateStr: string) => {
  const today = new Date().toISOString().split('T')[0]
  return dateStr > today || props.disabledDates.includes(dateStr)
}

const isNoDataDate = (dateStr: string) => {
  const today = new Date().toISOString().split('T')[0]
  return dateStr <= today && !props.diaryData[dateStr]
}

// 이모지 클래스 가져오기
const getEmojiClass = (dateStr: string) => {
  // 미래 날짜는 이모지 표시 안함 (DatePicker와 동일)
  if (isDisabledDate(dateStr)) {
    return ''
  }

  if (props.diaryData[dateStr]) {
    // list.vue와 동일하게 이모지 파일명 사용
    return `emoji-${props.diaryData[dateStr].status}`
  }
  return 'emoji-diary'
}

// 날짜 클릭 핸들러
const handleDateClick = (dateStr: string) => {
  if (!isDisabledDate(dateStr)) {
    if (isNoDataDate(dateStr)) {
      // no-data 날짜 클릭 시 emojiPicker로 이동
      emit('no-data-click', dateStr)
    } else {
      emit('date-click', dateStr)
    }
  }
}

// 이모지 클릭 핸들러
const handleEmojiClick = (dateStr: string, event: Event) => {
  if (!isDisabledDate(dateStr)) {
    if (isNoDataDate(dateStr)) {
      // no-data 날짜의 이모지 클릭 시 emojiPicker로 이동
      emit('no-data-click', dateStr)
    } else {
      emit('emoji-click', dateStr, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.weekly-picker {
  padding: 0 0.4rem;
}
.week-header {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.2rem;

  .day-name {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #959595;

    &.sunday {
      color: #ff4757;
    }

    &.saturday {
      color: #3742fa;
    }
  }
}

.week-dates {
  display: flex;
  justify-content: space-around;
}

.date-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  position: relative;

  &.selected {
  }

  &.today {
    &:after {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: -0.5rem;
      width: 100%;
      height: 100%;
      border-radius: 0.8rem;
      border: 0.1rem solid #d2d2d2;
      padding: 0 0.4rem;
      box-shadow: 4px 4px 12px 0 rgba(0, 0, 0, 0.04);
      box-sizing: content-box;
    }
  }

  &.disabled {
    cursor: not-allowed;
    .emoji {
      background: url('/_nuxt/assets/images/emoji/blank.svg') no-repeat center center / contain;
      pointer-events: none;
    }
  }

  &.no-data {
    cursor: pointer;
    .emoji {
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &.sunday .date-cell {
    color: #ff4757;
  }

  &.saturday .date-cell {
    color: #3742fa;
  }
}

.date-cell {
  padding-top: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.8rem;
  color: #555;
}

.emoji {
  width: 3.2rem;
  height: 3.2rem;
  margin-bottom: 0.8rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  cursor: pointer;

  &.emoji-diary {
    background-image: url('/_nuxt/assets/images/emoji/diary.svg');
  }

  &.emoji-happy {
    background-image: url('/_nuxt/assets/images/emoji/happy.svg');
  }

  &.emoji-sad {
    background-image: url('/_nuxt/assets/images/emoji/sad.svg');
  }

  &.emoji-angry {
    background-image: url('/_nuxt/assets/images/emoji/angry.svg');
  }

  &.emoji-excited {
    background-image: url('/_nuxt/assets/images/emoji/excited.svg');
  }

  &.emoji-peaceful {
    background-image: url('/_nuxt/assets/images/emoji/peaceful.svg');
  }

  &.emoji-thrilled {
    background-image: url('/_nuxt/assets/images/emoji/thrilled.svg');
  }

  &.emoji-upset {
    background-image: url('/_nuxt/assets/images/emoji/upset.svg');
  }

  &.emoji-indifferent {
    background-image: url('/_nuxt/assets/images/emoji/indifferent.svg');
  }

  &.emoji-fun {
    background-image: url('/_nuxt/assets/images/emoji/fun.svg');
  }

  &.emoji-surprise {
    background-image: url('/_nuxt/assets/images/emoji/surprise.svg');
  }

  &.emoji-worry {
    background-image: url('/_nuxt/assets/images/emoji/worry.svg');
  }

  &.emoji-hurt {
    background-image: url('/_nuxt/assets/images/emoji/hurt.svg');
  }

  &.emoji-embarrassed {
    background-image: url('/_nuxt/assets/images/emoji/embarrassed.svg');
  }

  &.emoji-flustered {
    background-image: url('/_nuxt/assets/images/emoji/flustered.svg');
  }

  &.emoji-frustrated {
    background-image: url('/_nuxt/assets/images/emoji/frustrated.svg');
  }

  &.emoji-annoyed {
    background-image: url('/_nuxt/assets/images/emoji/annoyed.svg');
  }

  &.emoji-ruined {
    background-image: url('/_nuxt/assets/images/emoji/ruined.svg');
  }

  &.emoji-shocked {
    background-image: url('/_nuxt/assets/images/emoji/shocked.svg');
  }

  &.emoji-cheer {
    background-image: url('/_nuxt/assets/images/emoji/cheer.svg');
  }

  &.emoji-congrats {
    background-image: url('/_nuxt/assets/images/emoji/congrats.svg');
  }

  &.emoji-touched {
    background-image: url('/_nuxt/assets/images/emoji/touched.svg');
  }
}

@media (max-width: 320px) {
  .weekly-picker {
    padding: 0;
  }
}

@media (min-width: 375px) {
  .date-item {
    &.today {
      &:after {
        padding: 0 0.9rem;
        left: -1rem;
      }
    }
  }
}
</style>
