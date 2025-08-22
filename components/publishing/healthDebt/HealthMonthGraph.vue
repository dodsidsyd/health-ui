<template>
  <div class="health-month-graph">
    <div class="month-chart">
      <div class="month-chart-bar">
        <div v-for="(monthData, index) in monthsData" :key="index" class="item">
          <div class="bar-wrapper">
            <i class="bar-chart">
              <span
                class="process-bar"
                :class="monthData.score === '-'"
                :style="{ height: monthData.heightPercent }"
              ></span>
            </i>
            <div class="tooltip" :class="{ show: tooltipStates[index] }" v-if="monthData.score !== '-'">
              {{ monthData.formattedScore }}
            </div>
          </div>
          <strong class="tit">{{ monthData.monthName }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface MonthlyData {
  score: number
  status?: string
}

interface Props {
  selectedYear?: Date
  monthlyData?: Record<string, MonthlyData>
  maxScore?: number
}

interface Emits {
  (e: 'month-click', month: number): void
}

const props = withDefaults(defineProps<Props>(), {
  selectedYear: () => new Date(),
  monthlyData: () => ({}),
  maxScore: 100
})

const emit = defineEmits<Emits>()

// 각 월별 툴팁 표시 상태 (12개의 월)
const tooltipStates = ref([false, false, false, false, false, false, false, false, false, false, false, false])

// timeout ID 관리 (중복 실행 방지)
let timeoutIds: number[] = []

// selectedYear가 변경될 때 툴팁 순차적으로 표시
watch(
  () => props.selectedYear,
  (newDate, oldDate) => {
    if (newDate && oldDate && newDate.getTime() !== oldDate.getTime()) {
      // 기존 timeout들 정리
      timeoutIds.forEach(id => clearTimeout(id))
      timeoutIds = []

      // 모든 툴팁 상태 초기화
      tooltipStates.value = [false, false, false, false, false, false, false, false, false, false, false, false]

      // 순차적으로 툴팁 표시
      for (let i = 0; i < 12; i++) {
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

// 월 이름
const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

// 숫자 포맷팅 함수 (천단위 콤마)
const formatNumber = (num: number): string => {
  return num.toLocaleString('ko-KR')
}

// 선택된 연도의 월별 데이터 계산
const monthsData = computed(() => {
  const selectedYear = new Date(props.selectedYear)
  const year = selectedYear.getFullYear()
  const months = []

  for (let i = 0; i < 12; i++) {
    // 월 키 생성 (1월은 01, 2월은 02...)
    const month = String(i + 1).padStart(2, '0')
    const monthKey = `${year}-${month}`

    // 해당 월의 데이터
    const monthInfo = props.monthlyData[monthKey]
    const score = monthInfo?.score || 0

    // 바 차트 높이 계산 (maxScore 기준)
    const heightPercent = score > 0 ? `${(score / props.maxScore) * 100}%` : '0%'

    months.push({
      month: i + 1,
      monthKey,
      monthName: monthNames[i],
      score: score > 0 ? score.toString() : '-',
      formattedScore: score > 0 ? formatNumber(score) : '-',
      heightPercent
    })
  }

  return months
})
</script>
<style lang="scss" scoped>
.health-month-graph {
  .month-chart {
    padding: 2rem 0 0;
  }

  .month-chart-bar {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 0.8rem;
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
        width: 1rem;
        height: 17rem;
        border-radius: 6rem;
        background-color: #e4e4e4;
        .process-bar {
          display: block;
          width: 100%;
          background-color: #4c7ff7;
          border-radius: 6rem;
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

      .tit {
        font-size: 1.2rem;
        font-weight: 500;
        color: #959595;
      }
    }
  }
}
</style>
