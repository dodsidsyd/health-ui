<template>
  <div class="week-sleep-chart">
    <div class="week-chart-bar-sleep">
      <div v-for="(week, index) in weeklySleepData" :key="index" class="item" :style="{ '--bar-color': week.color }">
        <i class="bar-chart">
          <span class="process-bar" :style="{ height: animatedHeight(week.label) }">
            <span class="value">{{ week.avgSleepMinutes }}분</span>
          </span>
        </i>
        <strong class="tit">{{ week.label }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue' // onMounted 임포트

interface SleepData {
  score: number
  status: string
  remSleep: number
  deepSleep: number
  lightSleep: number
}
type SleepType = 'remSleep' | 'deepSleep' | 'lightSleep'

interface Props {
  vitalData: Record<string, SleepData>
  sleepType?: SleepType
}
const props = withDefaults(defineProps<Props>(), {
  sleepType: 'remSleep'
})

const sleepTypeColors: Record<SleepType, string> = {
  remSleep: '#9B48FF',
  deepSleep: '#243E8E',
  lightSleep: '#41BCF5'
}

const MAX_SLEEP_MINUTES: Record<SleepType, number> = {
  remSleep: 100,
  deepSleep: 100,
  lightSleep: 100
}

// 1. 각 바의 애니메이션 높이를 저장할 ref (초기값은 0%)
const animatedHeights = ref<Record<string, string>>({})

// 2. 실제 계산된 데이터
const calculatedWeeklyData = computed(() => {
  const data: { [key: string]: { totalMinutes: number; count: number } } = {}

  for (const dateKey in props.vitalData) {
    if (Object.prototype.hasOwnProperty.call(props.vitalData, dateKey)) {
      const date = new Date(dateKey)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()

      let weekLabel = ''
      if (year === 2025 && month === 6) {
        // 7월
        if (day >= 1 && day <= 5) weekLabel = '1주'
        else if (day >= 6 && day <= 12) weekLabel = '2주'
        else if (day >= 13 && day <= 19) weekLabel = '3주'
        else if (day >= 20 && day <= 26) weekLabel = '4주'
        else if (day >= 27 && day <= 31) weekLabel = '5주'
      } else if (year === 2025 && month === 5 && day >= 29) {
        // 6월 29일, 30일
        weekLabel = '1주'
      }

      if (weekLabel) {
        if (!data[weekLabel]) {
          data[weekLabel] = { totalMinutes: 0, count: 0 }
        }
        const sleepMinutes = props.vitalData[dateKey]?.[props.sleepType] // 옵셔널 체이닝 추가
        if (typeof sleepMinutes === 'number') {
          // number 타입인지 확인
          data[weekLabel].totalMinutes += sleepMinutes
          data[weekLabel].count++
        }
      }
    }
  }

  const result: any[] = []
  const orderedWeeks = ['1주', '2주', '3주', '4주', '5주']

  orderedWeeks.forEach(label => {
    const weekData = data[label]
    let avgSleepMinutes = 0
    let heightPercent = '0%'

    if (weekData && weekData.count > 0) {
      avgSleepMinutes = Math.round(weekData.totalMinutes / weekData.count)
      const maxMinutes = MAX_SLEEP_MINUTES[props.sleepType]
      heightPercent = `${Math.min((avgSleepMinutes / maxMinutes) * 100, 100)}%`
    }

    result.push({
      label: label,
      avgSleepMinutes: avgSleepMinutes > 0 ? avgSleepMinutes : '',
      heightPercent: heightPercent, // 계산된 최종 높이
      color: sleepTypeColors[props.sleepType]
    })
  })

  return result
})

const weeklySleepData = computed(() => {
  return calculatedWeeklyData.value.map(item => ({
    ...item
  }))
})

const animatedHeight = (label: string) => {
  return animatedHeights.value[label] || '0%' // 기본값은 0%
}

onMounted(() => {
  setTimeout(() => {
    const newAnimatedHeights: Record<string, string> = {}
    calculatedWeeklyData.value.forEach(item => {
      newAnimatedHeights[item.label] = item.heightPercent
    })
    animatedHeights.value = newAnimatedHeights
  }, 900)
})
</script>

<style scoped lang="scss">
.week-chart-bar-sleep {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-weight: 500;
  text-align: center;
  height: 15rem;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    width: 4rem;
    height: 15rem;
    .bar-chart {
      display: flex;
      align-items: flex-end;
      width: 0.8rem; // 바 두께
      height: 10rem;
      border-radius: 0.6rem;
      margin-bottom: 0.8rem;
      .process-bar {
        position: relative;
        display: block;
        width: 100%;
        background-color: var(--bar-color); // CSS 변수로 색상 지정
        border-radius: 0.6rem;
        transition: height 0.6s ease;
        min-height: 0.2rem; // 데이터가 0일 때도 작은 막대 보이도록
        .value {
          bottom: calc(100% + 0.8rem);
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
          width: 4rem;
          white-space: nowrap;
          text-align: center;
          font-size: 1.4rem;
          line-height: 2rem;
          color: #555;
        }
      }
    }

    .tit {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
      color: #959595;
    }
  }
}
</style>
