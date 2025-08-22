<template>
  <BaseBody page-title="레몬건강지수 다이어리" :show-back-button="true">
    <DatePicker
      class="mt-30"
      :show-header="true"
      :show-navigation="true"
      :show-calendar="true"
      :show-time-picker="false"
      :week-mode="isWeekMode"
      :disabled-dates="getDisabledDates()"
      @update:model-value="handleDateChange"
    />
    <button
      type="button"
      class="btn-toggleMode"
      :title="isWeekMode ? '월간 보기' : '주간 보기'"
      @click="toggleWeekMode"
    >
      <i :class="['icon arrow-down-type', isWeekMode ? 'week' : '']"></i>
    </button>

    <hr class="hr-section mt-18 mb-32 ml-n20 mr-n20" />

    <DiaryHealthMission />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import DatePicker from '~/components/publishing/input/DatePicker.vue'
import DiaryHealthMission from '~/components/publishing/healthDebt/DiaryHealthMission.vue'

// 주간/월간 모드 상태
const isWeekMode = ref(false)

// 선택된 날짜 상태 관리
const selectedDate = ref<Date | null>(null)

// 주간/월간 모드 토글
const toggleWeekMode = () => {
  isWeekMode.value = !isWeekMode.value
}

// 비활성화할 날짜
const getDisabledDates = () => {
  const disabledDates = [2, 5, 14, 21, 29]
  return disabledDates
}

// 날짜 변경 핸들러
const handleDateChange = (date: Date) => {
  selectedDate.value = date
}
</script>

<style scoped lang="scss">
.btn-toggleMode {
  background: vars.$white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.6rem;
  cursor: pointer;
  .icon {
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
    transform: rotate(180deg);
    &.week {
      transform: rotate(0deg);
    }
  }
}
</style>
