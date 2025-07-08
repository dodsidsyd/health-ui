<template>
  <BaseBody
    :show-back-button="true"
    page-title="걸음수 통계"
    logo-type="text"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span style='color:#555;font-size:1.4rem;font-weight:600'>목표걸음수 설정</span>"
  >
    <RoundTabs :tabs="roundTabs" :active-index="roundActiveIndex" class="mt-8" @tab-click="handleRoundTabClick" />

    <!-- 날짜 선택 -->
    <WalkingDateRange />
    <!-- 날짜 별 걸음수 현황판 -->
    <WalkingDashboard />

    <!-- 목표걸음수 설정 -->
    <StepGoalModal ref="stepGoalModalRef" />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'

import RoundTabs, { type RoundTab } from '~/components/common/tab/RoundTabs.vue'

import WalkingDateRange from '~/components/publishing/dashboard/WalkingDateRange.vue'
import WalkingDashboard from '~/components/publishing/dashboard/WalkingDashboard.vue'

import StepGoalModal from '~/components/publishing/dashboard/StepGoalModal.vue'

// StepGoalModal ref
const stepGoalModalRef = ref<InstanceType<typeof StepGoalModal> | null>(null)

// 레이아웃에서 addTextClick 핸들러 등록 기능 가져오기
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')

// 목표걸음수 설정 모달 열기
const openStepGoalModal = () => {
  stepGoalModalRef.value.openModal()
}

// 컴포넌트 마운트 시 addTextClick 핸들러 등록
onMounted(() => {
  if (setAddTextClickHandler) {
    setAddTextClickHandler(openStepGoalModal)
  }
})

// RoundTabs 데이터
const roundTabs: RoundTab[] = [
  { name: '일일 걸음수', code: 'dayWalkLength' },
  { name: '월간 걸음수', code: 'monthWalkLength' }
]
const roundActiveIndex = ref(0)
const handleRoundTabClick = (index: number) => {
  roundActiveIndex.value = index
  console.log('Round 탭 클릭:', roundTabs[index])
}
</script>

<style lang="scss" scoped></style>
