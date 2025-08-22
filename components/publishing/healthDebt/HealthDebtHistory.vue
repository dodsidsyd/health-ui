<template>
  <div class="health-debt-history">
    <div class="tit-wrap">
      <h5 class="tit">건강부채 증감내역</h5>
    </div>
    <div class="history-wrap">
      <div class="history-range-wrap">
        <DateRangeSelect v-model="selectedDate" :navigation-mode="navigationMode" @change="handleDateChange" />
        <RoundTabs :tabs="roundTabs" :active-key="activeRoundTab" @tab-change="onRoundTabChange" />
      </div>
      <div class="graph-tit">
        <strong class="tit">일별 건강부채</strong>
        <span>부채/원</span>
      </div>
      <div class="graph-wrap">
        <HealthWeekGraph
          v-if="activeRoundTab === 'weekHistory'"
          :selected-date="selectedDate"
          :vital-data="sampleVitalData"
          :max-score="10000"
        />
        <DatePicker
          v-if="activeRoundTab === 'monthHistory'"
          v-model="selectedDate"
          :show-navigation="false"
          :show-header="false"
          :disabled-dates="disabledDates"
          :is-show-debt-price="true"
          :debt-price-data="debtPriceData"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

import DateRangeSelect from '~/components/smartRing/DateRangeSelect.vue'
import RoundTabs, { type RoundTab } from '~/components/tabbar/RoundTabs.vue'
import HealthWeekGraph from '~/components/publishing/healthDebt/HealthWeekGraph.vue'
import HealthMonthGraph from '~/components/publishing/healthDebt/HealthMonthGraph.vue'
import DatePicker from '~/components/publishing/input/DatePicker.vue'

interface DailyVitalData {
  score: number
  status?: string
}

interface MonthlyData {
  score: number
  status?: string
}

const selectedDate = ref(new Date(2025, 7, 18)) // 2025년 8월 18일 (월은 0부터 시작하므로 7 = 8월)
const currentDate = ref(new Date(2025, 7, 18)) // DatePicker용 날짜

// RoundTabs 상태 관리
const activeRoundTab = ref('weekHistory')

// navigationMode는 activeRoundTab에 따라 결정
const navigationMode = computed(() => {
  return activeRoundTab.value === 'weekHistory' ? 'week' : 'month'
})

// 샘플 데이터 - 이 컴포넌트에서 관리
const sampleVitalData: Record<string, DailyVitalData> = {
  // 8월 1째주 (7/27 ~ 8/2)
  '2025-07-27': { score: 7500 }, // 일요일
  '2025-07-28': { score: 8200 }, // 월요일
  '2025-07-29': { score: 6800 }, // 화요일
  '2025-07-30': { score: 9000 }, // 수요일
  '2025-07-31': { score: 5500 }, // 목요일
  '2025-08-01': { score: 7300 }, // 금요일
  '2025-08-02': { score: 8800 }, // 토요일

  // 8월 2째주 (8/3 ~ 8/9)
  '2025-08-03': { score: 0 }, // 일요일
  '2025-08-04': { score: 8500 }, // 월요일
  '2025-08-05': { score: 2000 }, // 화요일
  '2025-08-06': { score: 7800 }, // 수요일
  '2025-08-07': { score: 8800 }, // 목요일
  '2025-08-08': { score: 6500 }, // 금요일
  '2025-08-09': { score: 10000 }, // 토요일

  // 8월 3째주 (8/10 ~ 8/16)
  '2025-08-10': { score: 4500 }, // 일요일
  '2025-08-11': { score: 9200 }, // 월요일
  '2025-08-12': { score: 7700 }, // 화요일
  '2025-08-13': { score: 8300 }, // 수요일
  '2025-08-14': { score: 6900 }, // 목요일
  '2025-08-15': { score: 9500 }, // 금요일
  '2025-08-16': { score: 5800 }, // 토요일

  // 8월 4째주 (8/17 ~ 8/23)
  '2025-08-17': { score: 0 }, // 일요일
  '2025-08-18': { score: 8500 }, // 월요일 (오늘)
  '2025-08-19': { score: 2000 }, // 화요일
  '2025-08-20': { score: 7800 }, // 수요일
  '2025-08-21': { score: 8800 }, // 목요일
  '2025-08-22': { score: 6500 }, // 금요일
  '2025-08-23': { score: 10000 } // 토요일
}

// 월별 샘플 데이터 (2025년 1월~12월)
const sampleMonthlyData: Record<string, MonthlyData> = {
  '2025-01': { score: 85 }, // 1월
  '2025-02': { score: 92 }, // 2월
  '2025-03': { score: 78 }, // 3월
  '2025-04': { score: 67 }, // 4월
  '2025-05': { score: 89 }, // 5월
  '2025-06': { score: 95 }, // 6월
  '2025-07': { score: 73 }, // 7월
  '2025-08': { score: 86 }, // 8월 (현재월)
  '2025-09': { score: 91 }, // 9월
  '2025-10': { score: 82 }, // 10월
  '2025-11': { score: 76 }, // 11월
  '2025-12': { score: 88 }  // 12월
}

// DatePicker용 부채 가격 데이터 (score 값을 직접 사용)
const debtPriceData = computed(() => {
  const result: Record<string, number> = {}
  for (const [key, value] of Object.entries(sampleVitalData)) {
    result[key] = value.score
  }
  return result
})

const handleDateChange = (newDate: Date) => {
  selectedDate.value = newDate
}

// RoundTabs 데이터
const roundTabs = ref<RoundTab[]>([
  { title: '주간 내역', key: 'weekHistory' },
  { title: '월간 내역', key: 'monthHistory' }
])
// RoundTabs 이벤트 핸들러
const onRoundTabChange = (key: string) => {
  activeRoundTab.value = key
}
</script>
<style lang="scss" scoped>
.health-debt-history {
  margin-top: 1.2rem;
  .tit-wrap {
    margin-bottom: 1.6rem;
    .tit {
      font-size: 1.8rem;
      font-weight: 700;
      color: #2b2b2b;
    }
  }
  .history-wrap {
    padding: 2rem 2rem 0;
    background-color: vars.$white;
    border-radius: 1.2rem;
    box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
    .history-range-wrap {
      display: flex;
      flex-direction: column;
      gap: 2.5rem 0;
    }
  }
  .graph-tit {
    margin-top: 2.4rem;
    padding: 0 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #959595;
    font-weight: 400;
    font-size: 1.1rem;
    .tit {
      font-size: 1.4rem;
      font-weight: 600;
      color: #2b2b2b;
    }
  }
  .graph-wrap {
    padding-top: 2.6rem;
    padding-bottom: 2.4rem;
    position: relative;
  }
}
</style>
