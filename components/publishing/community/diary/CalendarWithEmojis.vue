<template>
  <div class="calendar-guide">
    <div class="calendar-navigation">
      <button type="button" class="btn-prev" @click="prevPeriod"></button>
      <div class="calendar-range-txt">
        <strong class="range-tit">{{ formatCurrentRange }}</strong>
        <span v-if="viewMode === 'week'" class="detail-range">{{ formatWeekRange }}</span>
      </div>
      <button type="button" class="btn-next" @click="nextPeriod"></button>
      <div class="calendar-toggle">
        <button :class="{active: viewMode==='month'}" @click="viewMode='month'">월별</button>
        <button :class="{active: viewMode==='week'}" @click="viewMode='week'">주별</button>
      </div>
    </div>
    <div class="calendar-grid">
      <div class="calendar-day" v-for="(day, i) in days" :key="day" :class="['calendar-day', dayClass(i)]">{{ day }}</div>
      <template v-if="viewMode === 'month'">
        <div
          v-for="(date, idx) in calendar"
          :key="'m'+idx"
          class="calendar-cell"
          :class="{ today: isToday(date), selected: isSelected(date) }"
        >
          <template v-if="date">
            <div v-if="emojis[dateKey(date)]" class="cell-content">
              <span class="emoji">{{ emojis[dateKey(date)] }}</span>
              <span class="edit-icon" @click.stop="openEmojiPicker(date, $event)">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M14.7 2.29a1 1 0 0 1 1.42 0l1.59 1.59a1 1 0 0 1 0 1.42l-9.17 9.17-2.12.53.53-2.12 9.17-9.17zM3 17h14v2H3v-2z" fill="#bdbdbd"/></svg>
              </span>
            </div>
            <div v-else class="cell-content">
              <span class="add-btn" @click="openEmojiPicker(date, $event)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#bdbdbd" stroke-width="2" stroke-dasharray="4 3" fill="none"/>
                  <path d="M12 9v6M9 12h6" stroke="#bdbdbd" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </span>
            </div>
            <span class="date-label">{{ date }}</span>
          </template>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(date, idx) in weekDates"
          :key="'w'+idx"
          class="calendar-cell"
          :class="{ today: isToday(date), selected: isSelected(date) }"
        >
          <template v-if="date">
            <div v-if="emojis[dateKey(date)]" class="cell-content">
              <span class="emoji">{{ emojis[dateKey(date)] }}</span>
              <span class="edit-icon" @click.stop="openEmojiPicker(date, $event)">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M14.7 2.29a1 1 0 0 1 1.42 0l1.59 1.59a1 1 0 0 1 0 1.42l-9.17 9.17-2.12.53.53-2.12 9.17-9.17zM3 17h14v2H3v-2z" fill="#bdbdbd"/></svg>
              </span>
            </div>
            <div v-else class="cell-content">
              <span class="add-btn" @click="openEmojiPicker(date, $event)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#bdbdbd" stroke-width="2" stroke-dasharray="4 3" fill="none"/>
                  <path d="M12 9v6M9 12h6" stroke="#bdbdbd" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </span>
            </div>
            <span class="date-label">{{ date }}</span>
          </template>
        </div>
      </template>
    </div>
    <div v-if="showEmojiPicker" class="emoji-picker" :style="emojiPickerStyle">
      <span v-for="emoji in emojiList" :key="emoji" @click="selectEmoji(emoji)">{{ emoji }}</span>
      <button @click="closeEmojiPicker">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth());
const days = ['일', '월', '화', '수', '목', '금', '토'];
const emojis = ref({});
const showEmojiPicker = ref(false);
const selectedDate = ref(today.getDate());
const emojiList = ['😀', '🥳', '😢', '😡', '😍', '👍', '👎'];
const emojiPickerStyle = ref({});
const viewMode = ref('month'); // 'month' or 'week'

// 네비게이션/범위 포맷
const formatCurrentRange = computed(() => {
  if (viewMode.value === 'month') {
    return `${year.value}년 ${month.value + 1}월`;
  } else {
    // 몇 주차인지 계산
    const baseDate = new Date(year.value, month.value, selectedDate.value || 1);
    const firstDayOfMonth = new Date(year.value, month.value, 1);
    const firstWeekStart = new Date(firstDayOfMonth);
    firstWeekStart.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
    const currentWeekStart = new Date(baseDate);
    currentWeekStart.setDate(baseDate.getDate() - baseDate.getDay());
    const weekNumber = Math.floor((currentWeekStart.getTime() - firstWeekStart.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
    return `${year.value}년 ${month.value + 1}월 ${weekNumber}주`;
  }
});

const formatWeekRange = computed(() => {
  if (viewMode.value !== 'week') return '';
  const baseDate = new Date(year.value, month.value, selectedDate.value || 1);
  const startOfWeek = new Date(baseDate);
  startOfWeek.setDate(baseDate.getDate() - baseDate.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const formatDate = d => `${String(d.getMonth() + 1).padStart(2, '0')}월 ${String(d.getDate()).padStart(2, '0')}일`;
  return `${formatDate(startOfWeek)} ~ ${formatDate(endOfWeek)}`;
});

const calendar = computed(() => {
  const firstDay = new Date(year.value, month.value, 1).getDay();
  const lastDate = new Date(year.value, month.value + 1, 0).getDate();
  const arr = [];
  for (let i = 0; i < firstDay; i++) arr.push('');
  for (let d = 1; d <= lastDate; d++) arr.push(d);
  while (arr.length % 7 !== 0) arr.push('');
  return arr;
});

function dateKey(date) {
  if (!date) return '';
  return `${year.value}-${month.value + 1}-${date}`;
}

function isToday(date) {
  return (
    date &&
    year.value === today.getFullYear() &&
    month.value === today.getMonth() &&
    date === today.getDate()
  );
}

function isSelected(date) {
  return date && date === selectedDate.value;
}

function openEmojiPicker(date, event) {
  if (!date) return;
  selectedDate.value = date;
  showEmojiPicker.value = true;
  const rect = event.target.getBoundingClientRect();
  emojiPickerStyle.value = {
    position: 'fixed',
    top: rect.bottom + 5 + 'px',
    left: rect.left + 'px',
    zIndex: 1000,
  };
}

function selectEmoji(emoji) {
  emojis.value[dateKey(selectedDate.value)] = emoji;
  showEmojiPicker.value = false;
}

function closeEmojiPicker() {
  showEmojiPicker.value = false;
}

function selectDate(date) {
  if (date) selectedDate.value = date;
}

function prevMonth() {
  if (month.value === 0) {
    year.value -= 1;
    month.value = 11;
  } else {
    month.value -= 1;
  }
}
function nextMonth() {
  if (month.value === 11) {
    year.value += 1;
    month.value = 0;
  } else {
    month.value += 1;
  }
}

// 주별 보기 관련
const weekDates = computed(() => {
  // 현재 선택된 날짜가 포함된 주의 일~토 날짜 배열 반환
  const baseDate = new Date(year.value, month.value, selectedDate.value || 1);
  const dayOfWeek = baseDate.getDay(); // 0:일 ~ 6:토
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - dayOfWeek + i);
    if (d.getMonth() === month.value && d.getFullYear() === year.value) {
      week.push(d.getDate());
    } else {
      week.push('');
    }
  }
  return week;
});

function prevWeek() {
  const baseDate = new Date(year.value, month.value, selectedDate.value || 1);
  baseDate.setDate(baseDate.getDate() - 7);
  year.value = baseDate.getFullYear();
  month.value = baseDate.getMonth();
  selectedDate.value = baseDate.getDate();
}
function nextWeek() {
  const baseDate = new Date(year.value, month.value, selectedDate.value || 1);
  baseDate.setDate(baseDate.getDate() + 7);
  year.value = baseDate.getFullYear();
  month.value = baseDate.getMonth();
  selectedDate.value = baseDate.getDate();
}

function prevPeriod() {
  if (viewMode.value === 'month') prevMonth();
  else prevWeek();
}
function nextPeriod() {
  if (viewMode.value === 'month') nextMonth();
  else nextWeek();
}

function dayClass(idx) {
  if (idx === 0) return 'sunday';
  if (idx === 6) return 'saturday';
  return '';
}
</script>

<style lang="scss" scoped>
.calendar-guide {
  max-width: 48rem;
  margin: 0 auto;
  padding: 32px 16px;
  .calendar-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
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
    }
    .btn-prev {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M20 22.6666L13.3334 16L20 9.33329' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
    .btn-next {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M12 9.33337L18.6666 16L12 22.6667' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
    .calendar-range-txt {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      margin: 0 1.2rem;
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
    .calendar-toggle {
      margin-left: 10px;
      button {
        background: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-left: 2px;
        padding: 2px 8px;
        cursor: pointer;
        &.active {
          background: #ffe066;
          border-color: #ffe066;
        }
      }
    }
  }
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    .calendar-day {
      font-weight: bold;
      text-align: center;
      padding: 5px 0;
      &.sunday {
        color: #ff5a5a;
      }
      &.saturday {
        color: #3b82f6;
      }
    }
    .calendar-cell {
      height: 60px;
      text-align: center;
      vertical-align: middle;
      border: 1px solid #eee;
      cursor: pointer;
      position: relative;
      background: #fff;
      &.today {
        background: #ffe06633;
      }
      &.selected {
        outline: 2px solid #ffe066;
      }
      .cell-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        margin-top: 6px;
      }
      .emoji {
        font-size: 1.6em;
        line-height: 1;
      }
      .edit-icon {
        display: flex;
        align-items: center;
        margin-left: 2px;
        cursor: pointer;
        svg {
          vertical-align: middle;
        }
      }
      .add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        svg {
          vertical-align: middle;
        }
      }
      .date-label {
        display: block;
        font-size: 0.9em;
        color: #888;
        margin-top: 2px;
      }
    }
  }
  .emoji-picker {
    background: #fff;
    border: 1px solid #ddd;
    padding: 10px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    button {
      margin-left: 10px;
      background: #eee;
      border: none;
      cursor: pointer;
    }
  }
}
</style> 