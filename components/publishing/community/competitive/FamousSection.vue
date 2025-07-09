<template>
  <div class="famous-section">
    <TitleBox class="mt-32" title="인기 게시글" />
    <StickyTabsContainer>
      <BoxedTabs
        :tabs="boxTabs"
        :active-key="activeBoxTab"
        variant="fill-type"
        @tab-change="onBoxTabChange"
        class="mb-20"
      />
    </StickyTabsContainer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TitleBox from '~/components/common/TitleBox.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
const boxTabs = ref<BoxTab[]>([
  { title: '공감', key: 'option0' },
  { title: '조회', key: 'option1' },
  { title: '스크랩', key: 'option2' },
  { title: '댓글', key: 'option3' }
])
const activeBoxTab = ref('option0')

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
  console.log('B 탭 선택됨:', key)
}
</script>
