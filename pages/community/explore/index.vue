<template>
  <BaseBody page-title="커뮤니티 둘러보기" :show-back-button="true">
    <StickyTabsContainer>
      <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

      <template v-if="activeLineTab === 'subject'">
        <TopicCommunityTab />
      </template>

      <template v-else-if="activeLineTab === 'my'">
        <MyCommunityTab />
      </template>
    </StickyTabsContainer>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import TopicCommunityTab from '~/components/publishing/community/explore/TopicCommunityTab.vue'
import MyCommunityTab from '~/components/publishing/community/explore/MyCommunityTab.vue'

const activeLineTab = ref('subject')
const lineTabs = ref<Tab[]>([
  { title: '주제별 커뮤니티', key: 'subject' },
  { title: '내 커뮤니티', key: 'my' }
])

// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}
</script>
