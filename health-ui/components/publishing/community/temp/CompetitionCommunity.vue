<template>
  <!-- <DevOnly>커뮤니티 상세 - 경쟁형 타입</DevOnly> -->
  <DevOnly>
    <section class="ml-n20 mr-n20">
      <FlexColDiv class="gap-16">
        <CardFlipGrid />
        <NoticeSection />
        <Button aria-label="커뮤니티 가입하고 100P 받기"></Button>
      </FlexColDiv>
      <hr class="hr-section ml-n20 mr-n20 mb-10" />
      <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

      <!-- 소통하기 탭 컨텐츠 -->
      <div v-if="activeLineTab === 'comm'">
        <CommContent />
      </div>

      <!-- 둘러보기 탭 컨텐츠 -->
      <div v-else-if="activeLineTab === 'look'">
        <LookContent />
      </div>
    </section>
  </DevOnly>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardFlipGrid from '~/components/publishing/community/competitive/CardFlipGrid.vue'
import NoticeSection from '~/components/publishing/community/competitive/NoticeSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

import CommContent from '~/components/publishing/community/competitive/CommContent.vue'
import LookContent from '~/components/publishing/community/competitive/LookContent.vue'

const activeLineTab = ref('comm')

const lineTabs = ref<Tab[]>([
  { title: '소통하기', key: 'comm' },
  { title: '둘러보기', key: 'look' }
])

// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}
</script>
<style scoped lang="scss"></style>
