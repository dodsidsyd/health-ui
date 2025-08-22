<template>
  <div class="health-week-graph">
    <div class="week-chart">
      <div class="week-chart-bar">
        <div
          v-for="(dayData, index) in weekData"
          :key="index"
          class="item"
          :class="{ sunday: dayData.isWeekend === 'sunday', saturday: dayData.isWeekend === 'saturday' }"
        >
          <div class="bar-wrapper">
            <i class="bar-chart">
              <span
                class="process-bar"
                :class="dayData.score === '-'"
                :style="{ height: dayData.heightPercent }"
              ></span>
            </i>
            <div class="tooltip" :class="{ show: tooltipStates[index] }" v-if="dayData.score !== '-'">
              {{ dayData.formattedScore }}
            </div>
          </div>
          <strong class="tit">{{ dayData.dayName }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'

interface DailyVitalData {
  score: number
  status?: string
}

interface Props {
  selectedDate?: Date
  vitalData?: Record<string, DailyVitalData>
  maxScore?: number
}

interface Emits {
  (e: 'day-click', date: Date): void
}

const props = withDefaults(defineProps<Props>(), {
  selectedDate: () => new Date(),
  vitalData: () => ({}),
  maxScore: 10000
})

const emit = defineEmits<Emits>()

// 각 요일별 툴팁 표시 상태 (7개의 요일)
const tooltipStates = ref([false, false, false, false, false, false, false])

// timeout ID 관리 (중복 실행 방지)
let timeoutIds: number[] = []

// selectedDate가 변경될 때 툴팁 순차적으로 표시
watch(
  () => props.selectedDate,
  (newDate, oldDate) => {
    if (newDate && oldDate && newDate.getTime() !== oldDate.getTime()) {
      // 기존 timeout들 정리
      timeoutIds.forEach(id => clearTimeout(id))
      timeoutIds = []
      
      // 모든 툴팁 상태 초기화
      tooltipStates.value = [false, false, false, false, false, false, false]

      // 순차적으로 툴팁 표시
      for (let i = 0; i < 7; i++) {
        const showTimeoutId = setTimeout(() => {
          tooltipStates.value[i] = true
          
          // 500ms 후 사라지게 함
          const hideTimeoutId = setTimeout(() => {
            tooltipStates.value[i] = false
          }, 500)
          
          timeoutIds.push(hideTimeoutId)
        }, i * 600) // 각 툴팁은 600ms 간격으로 시작 (500ms 표시 + 100ms 간격)
        
        timeoutIds.push(showTimeoutId)
      }
    }
  }
)

// 요일 이름
const dayNames = ['일', '월', '화', '수', '목', '금', '토']

// 숫자 포맷팅 함수 (천단위 콤마)
const formatNumber = (num: number): string => {
  return num.toLocaleString('ko-KR')
}

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

    // 바 차트 높이 계산 (maxScore 기준)
    const heightPercent = score > 0 ? `${(score / props.maxScore) * 100}%` : '0%'

    // 주말 확인
    let isWeekend = null
    if (i === 0) isWeekend = 'sunday'
    if (i === 6) isWeekend = 'saturday'

    weekDays.push({
      date: new Date(currentDay),
      dateKey,
      dayName: dayNames[i],
      score: score > 0 ? score.toString() : '-',
      formattedScore: score > 0 ? formatNumber(score) : '-',
      heightPercent,
      isWeekend
    })
  }

  return weekDays
})
</script>
<style lang="scss" scoped>
.health-week-graph {
  .week-chart {
    padding: 2rem 0 0;
  }

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

      .bar-wrapper {
        position: relative;

        &:hover .tooltip {
          opacity: 1;
          visibility: visible;
        }

        .tooltip.show {
          opacity: 1;
          visibility: visible;
        }
      }

      .bar-chart {
        display: flex;
        align-items: flex-end;
        width: 1.2rem;
        height: 17rem;
        border-radius: 6rem;
        background-color: #e4e4e4;
        overflow: hidden;
        .process-bar {
          display: block;
          width: 100%;
          background-color: #4c7ff7;
          border-radius: 6rem;
          // padding-bottom: 0.8rem;
          transition: height 0.3s ease;
        }
      }

      .tooltip {
        position: absolute;
        bottom: calc(100% + 0.8rem);
        left: 50%;
        transform: translateX(-50%);
        background-color: #4f5561;
        color: #fff;
        padding: 1.2rem;
        border-radius: 0.8rem;
        font-size: 1.2rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
        pointer-events: none;

        &::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 0.4rem solid transparent;
          border-top-color: #4f5561;
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
    }
  }
}
</style>
