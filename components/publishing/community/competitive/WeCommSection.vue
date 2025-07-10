<template>
  <div class="weCommu-section">
    <TitleBox class="mt-32" title="우리 커뮤니티는?" />
    <StickyTabsContainer>
      <BoxedTabs
        :tabs="boxTabs"
        :active-key="activeBoxTab"
        variant="fill-type"
        @tab-change="onBoxTabChange"
        class="mb-20"
      />
    </StickyTabsContainer>
    <WeCommSlideCard />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TitleBox from '~/components/common/TitleBox.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import WeCommSlideCard from '~/components/publishing/community/competitive/WeCommSlideCard.vue'
const boxTabs = ref<BoxTab[]>([
  { title: '공감', key: 'option0' },
  { title: '게시글', key: 'option1' },
  { title: '댓글', key: 'option2' }
])
const activeBoxTab = ref('option0')

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
  console.log('B 탭 선택됨:', key)
}
</script>
