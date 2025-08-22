<template>
  <div class="health-debt-change">
    <div class="tit-wrap">
      <h5 class="tit">레몬 건강지수 변경내역</h5>
    </div>
    <div class="change-wrap">
      <div class="history-range-wrap">
        <DateRangeSelect v-model="selectedDate" :navigation-mode="navigationMode" @change="handleDateChange" />
      </div>
      <div class="graph-tit">
        <strong class="tit">월별 레몬지수</strong>
        <span>지수/점</span>
      </div>
      <div class="graph-wrap">
        <HealthMonthGraph :selected-year="selectedDate" :monthly-data="sampleMonthlyData" :max-score="100" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import DateRangeSelect from '~/components/smartRing/DateRangeSelect.vue'
import HealthMonthGraph from '~/components/publishing/healthDebt/HealthMonthGraph.vue'

interface MonthlyData {
  score: number
  status?: string
}

const selectedDate = ref(new Date(2025, 7, 18)) // 2025년 8월 18일 (월은 0부터 시작하므로 7 = 8월)
const navigationMode = ref('year') // 연도 단위 네비게이션

// 샘플 데이터 - 이 컴포넌트에서 관리
const sampleMonthlyData: Record<string, MonthlyData> = {
  '2025-01': { score: 50 }, // 1월
  '2025-02': { score: 75 }, // 2월
  '2025-03': { score: 10 }, // 3월
  '2025-04': { score: 22 }, // 4월
  '2025-05': { score: 55 }, // 5월
  '2025-06': { score: 100 }, // 6월
  '2025-07': { score: 98 }, // 7월
  '2025-08': { score: 30 }, // 8월
  '2025-09': { score: 45 }, // 9월
  '2025-10': { score: 21 }, // 10월
  '2025-11': { score: 12 }, // 11월
  '2025-12': { score: 30 } // 12월
}

const handleDateChange = (newDate: Date) => {
  selectedDate.value = newDate
}
</script>
<style lang="scss" scoped>
.health-debt-change {
  margin-top: 3.2rem;
  .tit-wrap {
    margin-bottom: 1.6rem;
    .tit {
      font-size: 1.8rem;
      font-weight: 700;
      color: #2b2b2b;
    }
  }
  .change-wrap {
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
    padding-bottom: 2.4rem;
  }
}
</style>
