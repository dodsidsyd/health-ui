<template>
  <BaseBody page-title="자주 묻는 질문" :show-back-button="true">
    <InputText inp-type="search" placeholder="키워드를 입력해주세요."></InputText>

    <!-- 고정될 탭 영역 -->
    <div class="sticky-tabs-container mt-16">
      <BoxedTabs :tabs="boxTabs" :active-key="activeBoxTab" variant="fill-type" @tab-change="onBoxTabChange" />
    </div>
    <TotalCountBtnType :count="6" class="mt-32" />
    <hr />
    <!-- 스크롤 가능한 알림 목록 영역 -->
    <div class="scrollable-content">
      <FlexSection>
        <FaqAccordion />
        <FaqAccordion />
        <FaqAccordion />
        <FaqAccordion />
        <FaqAccordion />
        <FaqAccordion />
        <FaqAccordion />
      </FlexSection>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FaqAccordion from '~/components/publishing/common/customerCenter/FaqAccordion.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import TotalCountBtnType from '~/components/publishing/common/temp/TotalCountBtnType.vue'
// RoundTabs 상태 관리
const activeBoxTab = ref('all')

const boxTabs = ref<BoxTab[]>([
  { title: '전체', key: 'all' },
  { title: '건강', key: 'option2' },
  { title: '청구의신', key: 'option5' },
  { title: '커뮤니티', key: 'option4' },
  { title: '걷기왕', key: 'option3' },
  { title: '건강 2', key: 'option6' },
  { title: '걷기왕 2', key: 'option7' },
  { title: '커뮤니티 2', key: 'option8' },
  { title: '청구의신 2', key: 'option9' }
])

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
}
</script>

<style scoped lang="scss">
// 고정 탭 컨테이너 - c-header 높이만큼 떨어진 위치에 고정
.sticky-tabs-container {
  position: sticky;
  top: 5.6rem; // c-header 높이만큼 떨어진 위치에 고정
  z-index: 90; // header보다 낮은 z-index
  background-color: rgba(255, 255, 255, 0.8);
}

.scrollable-content {
  position: relative;
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  margin: 0 -2rem;
}

hr {
  width: auto;
  height: 0.1rem;
  margin: 2rem -2rem 0;
  background-color: var(--gray-light);
  border: none;
}
</style>
