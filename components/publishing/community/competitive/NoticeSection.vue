<template>
  <FlexColDiv class="notice-list gap-20">
    <NoticeItem v-for="item in noticeList" :key="item.id" :text="item.text" :type="item.type" :label="item.label" />
  </FlexColDiv>
</template>
<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import NoticeItem from '~/components/publishing/community/competitive/NoticeItem.vue'

const noticeList = [
  { id: 1, label: '안내', type: 'info', text: '스마트링 관련 Q&A는 질문하기 게시판을' },
  { id: 2, label: '중요', type: 'import', text: '규정을 지키지 않은 게시글은 언제든지 삭제' }
]
</script>
<style scoped lang="scss">
.notice-list {
  padding: 1.6rem 2rem;
  background: #f4f4f4;
  border-radius: 1.2rem;
}
</style>
