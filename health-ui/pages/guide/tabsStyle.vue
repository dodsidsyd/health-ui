<template>
  <div class="">
    <h2>LineTabs</h2>
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" class="" />
    <p class="active-tab-info">활성 탭: {{ lineTabs[lineActiveIndex]?.name }}</p>

    <h2>RoundTabs - 기본 스타일</h2>
    <RoundTabsStyle :tabs="roundTabs" :active-index="roundActiveIndex" @tab-click="handleRoundTabClick" />
    <p class="active-tab-info">활성 탭: {{ roundTabs[roundActiveIndex]?.name }}</p>

    <h2>BoxTabs - fill type</h2>
    <BoxedTabsFillStyle :tabs="boxFillTabs" :active-index="boxFillActiveIndex" @tab-click="handleBoxFillTabClick" />
    <p class="active-tab-info">활성 탭: {{ boxFillTabs[boxFillActiveIndex]?.name }}</p>

    <h2>BoxTabs - line type</h2>
    <BoxedTabsLineStyle :tabs="boxLineTabs" :active-index="boxLineActiveIndex" @tab-click="handleBoxLineTabClick" />
    <p class="active-tab-info">활성 탭: {{ boxLineTabs[boxLineActiveIndex]?.name }}</p>

    <h2>SegmentedTabs</h2>
    <SegmentedTabsStyle
      :tabs="segmentedTabs"
      :active-index="segmentedActiveIndex"
      @tab-click="handleSegmentedTabClick"
    />
    <p class="active-tab-info">활성 탭: {{ segmentedTabs[segmentedActiveIndex]?.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'
import RoundTabsStyle, { type RoundTab } from '~/components/common/tab/RoundTabs.vue'
import BoxedTabsFillStyle, { type BoxTabFill } from '~/components/common/tab/BoxedTabsFill.vue'
import BoxedTabsLineStyle, { type BoxTabLine } from '~/components/common/tab/BoxedTabsLine.vue'
import SegmentedTabsStyle, { type SegmentTab } from '~/components/common/tab/SegmentedTabs.vue'

// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '홈', code: 'home' },
  { name: '서비스', code: 'service' },
  { name: '제품', code: 'product' },
  { name: '고객센터', code: 'support' }
]
const lineActiveIndex = ref(0)

// RoundTabs 데이터
const roundTabs: RoundTab[] = [
  { name: '대시보드', code: 'dashboard' },
  { name: '통계', code: 'statistics' },
  { name: '설정', code: 'settings' }
]
const roundActiveIndex = ref(0)

// BoxFillTabs 데이터
const boxFillTabs: BoxTabFill[] = [
  { name: '전체', code: 'all' },
  { name: '진행중', code: 'progress' },
  { name: '완료', code: 'completed' },
  { name: '보류', code: 'pending' }
]
const boxFillActiveIndex = ref(0)

// BoxLineTabs 데이터
const boxLineTabs: BoxTabLine[] = [
  { name: '일간', code: 'daily' },
  { name: '주간', code: 'weekly' },
  { name: '월간', code: 'monthly' },
  { name: '연간', code: 'yearly' }
]
const boxLineActiveIndex = ref(0)

// SegmentedTabs 데이터
const segmentedTabs: SegmentTab[] = [
  { name: '목록', code: 'list' },
  { name: '격자', code: 'grid' },
  { name: '카드', code: 'card' }
]
const segmentedActiveIndex = ref(0)

// 이벤트 핸들러들
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
  console.log('Line 탭 클릭:', lineTabs[index])
}

const handleRoundTabClick = (index: number) => {
  roundActiveIndex.value = index
  console.log('Round 탭 클릭:', roundTabs[index])
}

const handleBoxFillTabClick = (index: number) => {
  boxFillActiveIndex.value = index
  console.log('BoxFill 탭 클릭:', boxFillTabs[index])
}

const handleBoxLineTabClick = (index: number) => {
  boxLineActiveIndex.value = index
  console.log('BoxLine 탭 클릭:', boxLineTabs[index])
}

const handleSegmentedTabClick = (index: number) => {
  segmentedActiveIndex.value = index
  console.log('Segmented 탭 클릭:', segmentedTabs[index])
}

const handleDynamicTabClick = (index: number) => {
  dynamicActiveIndex.value = index
  console.log('Dynamic 탭 클릭:', dynamicTabs.value[index])
}
</script>

<style scoped lang="scss">
.tabs-demo {
  padding: 2rem;
  max-width: 120rem;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 4rem;
  padding: 2rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 0.8rem;
  background-color: #fafafa;
}

h2 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
}

.active-tab-info {
  margin-top: 1.6rem;
  padding: 1rem;
  background-color: #f0f7ff;
  border: 0.1rem solid #4c7ff7;
  border-radius: 0.4rem;
  color: #2c5aa0;
  font-weight: 500;
  text-align: center;
}

.tab-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.control-btn {
  padding: 0.8rem 1.6rem;
  border: 0.1rem solid #4c7ff7;
  background-color: #fff;
  color: #4c7ff7;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 1.4rem;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #4c7ff7;
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #ccc;
    color: #ccc;
  }
}
</style>
