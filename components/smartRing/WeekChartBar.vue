<template>
  <div class="week-chart">
    <div class="week-chart-bar">
      <div
        v-for="(dayData, index) in weekData"
        :key="index"
        class="item"
        :class="{ sunday: dayData.isWeekend === 'sunday', saturday: dayData.isWeekend === 'saturday' }"
        @click="handleDayClick(dayData.date)"
      >
        <strong class="tit">{{ dayData.dayName }}</strong>
        <i class="bar-chart">
          <span
            class="process-bar"
            :class="{ 'no-data': dayData.status === 'sleep' || dayData.score === '-' }"
            :style="{ height: dayData.heightPercent }"
          ></span>
        </i>
        <span class="score">{{ dayData.score }}</span>
        <span class="emoji" :class="dayData.status"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  selectedDate?: Date
  vitalData?: Record<string, { score: number; status: string }>
}

interface Emits {
  (e: 'day-click', date: Date): void
}

const props = withDefaults(defineProps<Props>(), {
  selectedDate: () => new Date(),
  vitalData: () => ({})
})

const emit = defineEmits<Emits>()

// 요일 이름
const dayNames = ['일', '월', '화', '수', '목', '금', '토']

// 선택된 날짜가 속한 주의 데이터 계산
const weekData = computed(() => {
  const selectedDate = new Date(props.selectedDate)

  // 주의 시작 날짜 (일요일) 찾기
  const startOfWeek = new Date(selectedDate)
  const day = startOfWeek.getDay() // 0 = 일요일, 6 = 토요일
  startOfWeek.setDate(startOfWeek.getDate() - day)

  const weekDays = []

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startOfWeek)
    currentDay.setDate(startOfWeek.getDate() + i)

    // 날짜 키 생성
    const year = currentDay.getFullYear()
    const month = String(currentDay.getMonth() + 1).padStart(2, '0')
    const day = String(currentDay.getDate()).padStart(2, '0')
    const dateKey = `${year}-${month}-${day}`

    // 해당 날짜의 활력 데이터
    const vitalInfo = props.vitalData[dateKey]
    const score = vitalInfo?.score || 0
    const status = vitalInfo?.status || 'no-data'

    // 바 차트 높이 계산 (0-100점 기준)
    const heightPercent = score > 0 ? `${score}%` : '0%'

    // 주말 확인
    let isWeekend = null
    if (i === 0) isWeekend = 'sunday'
    if (i === 6) isWeekend = 'saturday'

    weekDays.push({
      date: new Date(currentDay),
      dateKey,
      dayName: dayNames[i],
      score: score > 0 ? score.toString() : '-',
      status: score > 0 ? status : 'sleep', // 데이터 없으면 sleep 상태
      heightPercent,
      isWeekend
    })
  }

  return weekDays
})

// 날짜 클릭 핸들러
const handleDayClick = (date: Date) => {
  console.log('📅 WeekChartBar 날짜 클릭:', date)
  emit('day-click', date)
}
</script>

<style scoped lang="scss">
.week-chart-bar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: 500;
  text-align: center;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem 0;

    .bar-chart {
      display: flex;
      align-items: flex-end;
      width: 0.8rem;
      height: 10rem;
      border-radius: 5rem;

      .process-bar {
        display: block;
        width: 100%;
        background-color: #4c7ff7;
        border-radius: 5rem;
        padding-bottom: 0.8rem;
        transition: height 0.3s ease;

        &.no-data {
          background-color: #d5d5d5;
          opacity: 0.5;
        }
      }
    }

    .score {
      font-size: 1.6rem;
      font-weight: 700;
      color: #2b2b2b;
    }

    .tit {
      font-size: 1.4rem;
      font-weight: 500;
      color: #959595;
    }

    &.sunday {
      .tit {
        color: #f14960;
      }
    }

    &.saturday {
      .tit {
        color: #4c7ff7;
      }
    }

    .emoji {
      width: 3.2rem;
      height: 3.2rem;
      display: block;
      flex: 0 0 auto;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      animation: none;

      &::after {
        content: none;
      }
    }
  }
}
</style>
