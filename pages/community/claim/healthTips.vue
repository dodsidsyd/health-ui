<template>
  <BaseBody :page-title="'건강꿀팁'" :show-back-button="true">
    <section class="health-tip-section">
      <StickyTabsContainer>
        <BoxedTabs
          :tabs="boxTabs"
          :active-key="activeBoxTab"
          variant="fill-type"
          @tab-change="onBoxTabChange"
          class="pt-20 mb-20"
        />
      </StickyTabsContainer>

      <div class="tip-list">
        <HealthTipItem v-for="(tip, index) in healthTips" :key="index" :tip="tip" />
      </div>
    </section>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import HealthTipItem from '~/components/publishing/community/hospital/HealthTipItem.vue'

const boxTabs = ref<BoxTab[]>([
  { title: '전체', key: 'all' },
  { title: '#피부·미용', key: 'option0' },
  { title: '#운동', key: 'option1' },
  { title: '#건강음식', key: 'option2' }
])
const activeBoxTab = ref('all')

// 건강 팁 데이터
const healthTips = ref([
  {
    id: 1,
    url: '/community/claim/healthTip',
    image: 'https://picsum.photos/200/300',
    description: '1형당뇨 합병증 검사 언제 받아야 할까?'
  },
  {
    id: 2,
    description: '규칙적인 운동은 면역력 향상에 효과적입니다.'
  },
  {
    id: 3,
    url: '/community/claim/healthTip',
    image: 'https://picsum.photos/200/300',
    description:
      '비타민 C가 풍부한 과일을 섭취하면 피부 미백에 도움이 됩니다. 비타민 C가 풍부한 과일을 섭취하면 피부 미백에 도움이 됩니다.'
  },
  {
    id: 4,
    description: '충분한 수면은 피부 재생에 중요한 역할을 합니다.'
  },
  {
    id: 5,
    description: '스트레스 관리는 전반적인 건강에 필수적입니다.'
  },
  {
    id: 6,
    url: '/community/claim/healthTip',
    image: 'https://picsum.photos/id/182/200/300',
    description: '스트레스 관리는 전반적인 건강에 필수적입니다.'
  }
])

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
}
</script>

<style lang="scss" scoped>
.tip-list {
  display: flex;
  flex-direction: column;
  .tip-item {
    &:first-child {
      padding-top: 0;
    }
  }
}
</style>
