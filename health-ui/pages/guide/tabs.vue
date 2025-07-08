<template>
  <div>
    <h2>LineTabs</h2>
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

    <h2>RoundTabs - 기본 스타일</h2>
    <RoundTabs :tabs="roundTabs" :active-key="activeRoundTab" @tab-change="onRoundTabChange" />

    <h2>BoxTabs - Fill Type</h2>
    <BoxedTabs :tabs="boxTabs" :active-key="activeBoxTab" variant="fill-type" @tab-change="onBoxTabChange" />

    <h2>BoxTabs - Line Type</h2>
    <BoxedTabs :tabs="boxTabs2" :active-key="activeBoxTab2" variant="line-type" @tab-change="onBoxTabChange2" />

    <h2>SegmentedTabs</h2>
    <SegmentedTabs :tabs="segmentedTabs" :active-key="activeSegmentedTab" @tab-change="onSegmentedTabChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import RoundTabs, { type RoundTab } from '~/components/tabbar/RoundTabs.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'

// LineTabs 상태 관리
const activeLineTab = ref('all')

// RoundTabs 상태 관리
const activeRoundTab = ref('option1')

// BoxedTabs 상태 관리
const activeBoxTab = ref('tab1')
const activeBoxTab2 = ref('option1')

// SegmentedTabs 상태 관리
const activeSegmentedTab = ref('segment1')

// LineTabs 데이터 (라우팅 테스트용)
const lineTabs = ref<Tab[]>([
  { title: '전체', key: 'all' },
  { title: 'cate 1', key: 'cate1' },
  { title: 'cate 2', key: 'cate2' },
  { title: 'cate 3', key: 'cate3' },
  { title: 'cate 4', key: 'cate4' },
  { title: 'cate 5', key: 'cate5' }
])

// RoundTabs 데이터
const roundTabs = ref<RoundTab[]>([
  { title: 'Tab 1', key: 'option1' },
  { title: 'Tab 2', key: 'option2' },
  { title: 'Tab 3', key: 'option3' },
  { title: 'Tab 4', key: 'option4' }
])

// fill 타입 BoxTabs 데이터
const boxTabs = ref<BoxTab[]>([
  { title: '탭 1', key: 'tab1' },
  { title: '탭 2', key: 'tab2' },
  { title: '탭 3', key: 'tab3' }
])
// line 타입 BoxTabs 데이터
const boxTabs2 = ref<BoxTab[]>([
  { title: 'Tab 1', key: 'option1' },
  { title: 'Tab 2', key: 'option2' },
  { title: 'Tab 3', key: 'option3' },
  { title: 'Tab 4', key: 'option4' },
  { title: 'Tab 5', key: 'option5' },
  { title: 'Tab 6', key: 'option6' },
  { title: 'Tab 7', key: 'option7' },
  { title: '긴 Tab 텍스트', key: 'option8' },
  { title: 'Tab 8', key: 'option9' },
  { title: 'Tab 9', key: 'option10' },
  { title: 'Tab 10', key: 'option11' },
  { title: '긴 Tab 텍스트', key: 'option12' },
  { title: 'Tab 11', key: 'option13' },
  { title: 'Tab 12', key: 'option14' },
  { title: 'Tab 13', key: 'option15' },
  { title: 'Tab 14', key: 'option16' },
  { title: '긴 Tab 텍스트', key: 'option17' }
])

// SegmentedTabs 데이터
const segmentedTabs = ref<SegmentTab[]>([
  { title: '세그먼트 1', key: 'segment1' },
  { title: '세그먼트 2', key: 'segment2' },
  { title: '세그먼트 3', key: 'segment3' },
  { title: '세그먼트 4', key: 'segment4' }
])

// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
  console.log('Category tab changed to:', key)
}

// RoundTabs 이벤트 핸들러
const onRoundTabChange = (key: string) => {
  activeRoundTab.value = key
  console.log('Round tab 1 changed to:', key)
}

// BoxTabs 이벤트 핸들러
const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
  console.log('Box tab (fill) changed to:', key)
}

// BoxTabs2 이벤트 핸들러
const onBoxTabChange2 = (key: string) => {
  activeBoxTab2.value = key
  console.log('Box tab (line) changed to:', key)
}

//SegmentedTabs 이벤트 핸들러
const onSegmentedTabChange = (key: string) => {
  activeSegmentedTab.value = key
  console.log('Segmented tab changed to:', key)
}
</script>

<style scoped lang="scss">
h2 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  width: 100%;
}
</style>
