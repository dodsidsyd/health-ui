<template>
  <div class="community-content">
    <StickyTabsContainer>
      <BoxedTabs
        :tabs="boxTabs"
        :active-key="activeBoxTab"
        variant="fill-type"
        @tab-change="onBoxTabChange"
        class="pt-20 mb-20"
      />
    </StickyTabsContainer>
    <TotalCountSelectType
      :count="6"
      class="pt-20 pb-20"
      v-model:selected-period="selectedPeriod"
      :select-options="periodOptions"
    />

    <!-- 게시글 없음 상태 -->
    <commNoItem v-if="commList.length === 0" />
    <!-- 게시글 있음 상태 -->
    <div v-else class="content-wrapper">
      <ScrollableContents>
        <FlexSection class="flex flex-col pl-20 pr-20 community-list">
          <CommItem v-for="item in commList" :key="item.id" :item="item" :type="item.type" />
        </FlexSection>
      </ScrollableContents>
      <commNoPermission v-if="!hasPermission" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TotalCountSelectType from '~/components/publishing/common/temp/TotalCountSelectType.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'

import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import ScrollableContents from '~/components/common/ScrollableContents.vue'

import CommItem from '~/components/publishing/community/common/CommItem.vue'
import commNoPermission from '~/components/publishing/community/common/commNoPermission.vue'
import commNoItem from '~/components/publishing/community/common/commNoItem.vue'

const activeBoxTab = ref('all')
const selectedPeriod = ref('new')

// 권한 및 데이터 상태
const hasPermission = ref(true) // 권한 상태

const boxTabs = ref<BoxTab[]>([
  { title: '전체', key: 'all' },
  { title: '산책', key: 'option1' },
  { title: '대화', key: 'option2' },
  { title: '식사', key: 'option3' },
  { title: '독서', key: 'option4' },
  { title: 'TV', key: 'option5' }
])

const periodOptions = [
  { value: 'new', label: '최신순' },
  { value: 'reaction', label: '반응순' },
  { value: 'comment', label: '댓글순' }
]

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
}

const commList = [
  {
    id: 1,
    cate: [{ label: '자유게시판', type: '' }],
    writer: '작성자',
    writerImageUrl: 'community/img-rank-profile.png',
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간',
    length: 3
  },
  {
    id: 2,
    cate: [{ label: '자유게시판', type: '' }],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간',
    src: 'community/img-community-01.png',
    length: 3
  },
  {
    id: 3,
    isBlind: true
  },
  {
    id: 4,
    cate: [{ label: '자유게시판', type: '' }],
    writer: '작성자',
    writerImageUrl: 'community/img-rank-profile.png',
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음 몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음 몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간',
    src: 'community/img-community-01.png',
    length: 0
  }
]
</script>
<style scoped lang="scss">
.content-wrapper {
  position: relative;
}
.community-list {
  border-top: 1px solid #eee;
}
</style>
