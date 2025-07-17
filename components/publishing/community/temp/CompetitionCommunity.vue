<template>
  <FlexColDiv class="gap-16">
    <CardFlip />
    <FlexColDiv class="notice-list gap-20">
      <NoticeItem v-for="item in noticeList" :key="item.id" :text="item.text" :type="item.type" :label="item.label" />
    </FlexColDiv>
    <Button aria-label="커뮤니티 가입하고 100P 받기" />
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardFlip from '~/components/publishing/community/competitive/CardFlip.vue'
import Button from '~/components/publishing/button/Button.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import NoticeItem from '~/components/publishing/community/common/LinkItemBadge.vue'
import CommContent from '~/components/publishing/community/competitive/CommContent.vue'
import LookContent from '~/components/publishing/community/competitive/LookContent.vue'

const activeLineTab = ref('comm')

const lineTabs = ref<Tab[]>([
  { title: '소통하기', key: 'comm' },
  { title: '둘러보기', key: 'look' }
])
const noticeList = [
  { id: 1, label: '안내', type: 'info', text: '스마트링 관련 Q&A는 질문하기 게시판을' },
  { id: 2, label: '중요', type: 'import', text: '규정을 지키지 않은 게시글은 언제든지 삭제' }
]
// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}
</script>
<style scoped lang="scss">
.notice-list {
  padding: 1.6rem 2rem;
  background: #f4f4f4;
  border-radius: 1.2rem;
}
</style>
