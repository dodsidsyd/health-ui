<template>
  <BaseBody
    :show-back-button="true"
    page-title="알림"
    logo-type="text"
    :has-add-text="true"
    add-text="<span style='color:#555;font-size:1.4rem'>모두읽음</span>"
    :has-setting="true"
  >
    <!-- 고정될 탭 영역 -->
    <div class="sticky-tabs-container">
      <BoxedTabs :tabs="boxTabs" :active-key="activeBoxTab" variant="fill-type" @tab-change="onBoxTabChange" />
    </div>

    <!-- 스크롤 가능한 알림 목록 영역 -->
    <div class="scrollable-content">
      <FlexSection>
        <AlarmItem />
        <AlarmItem />
        <AlarmItem />
        <AlarmItem />
        <AlarmItem />
        <AlarmItem />
        <AlarmItem />
        <AlarmItem />
        <AlarmItem />
      </FlexSection>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import FlexSection from '~/components/page/FlexSection'

import AlarmItem from '~/components/publishing/wholeMenu/AlarmItem.vue'

// RoundTabs 상태 관리
const activeBoxTab = ref('all')

const boxTabs = ref<BoxTab[]>([
  { title: '전체', key: 'all' },
  { title: '건강', key: 'option2' },
  { title: '걷기왕', key: 'option3' },
  { title: '커뮤니티', key: 'option4' },
  { title: '청구의신', key: 'option5' },
  { title: '건강 2', key: 'option6' },
  { title: '걷기왕 2', key: 'option7' },
  { title: '커뮤니티 2', key: 'option8' },
  { title: '청구의신 2', key: 'option9' }
])

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
}
</script>

<style lang="scss" scoped>
// 고정 탭 컨테이너 - c-header 높이만큼 떨어진 위치에 고정
.sticky-tabs-container {
  position: sticky;
  top: 5.6rem; // c-header 높이만큼 떨어진 위치에 고정
  z-index: 90; // header보다 낮은 z-index
  background-color: rgba(255, 255, 255, 0.8);
}

// 스크롤 가능한 컨텐츠 영역
.scrollable-content {
  flex: 1;
  overflow-y: auto;

  // 부드러운 스크롤
  scroll-behavior: smooth;
}

// 기존 알림 박스 스타일 유지
.alarm-box {
  padding: 2rem 0.4rem;
  word-break: break-all;
  gap: 0.6rem;

  & + .alarm-box {
    border-top: 0.1rem solid #eee;
  }
}
</style>
