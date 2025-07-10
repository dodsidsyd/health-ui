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
    <StarRating />
    <TotalCountTextType :count="6" class="pt-20 pb-20" />
    <ScrollableContents>
      <FlexSection class="flex flex-col pl-20 pr-20 community-list">
        <CommItem v-for="item in commList" :key="item.id" :item="item" :type="item.type" />
      </FlexSection>
    </ScrollableContents>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TotalCountTextType from '~/components/publishing/common/temp/TotalCountTextType.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'

import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'

import FlexSection from '~/components/page/FlexSection.vue'
import CommItem from '~/components/publishing/community/competitive/CommItem.vue'
import ScrollableContents from '~/components/common/ScrollableContents.vue'

import StarRating from '~/components/publishing/community/competitive/StarRating.vue'
// RoundTabs 상태 관리
const activeBoxTab = ref('all')

const boxTabs = ref<BoxTab[]>([
  { title: '전체', key: 'all' },
  { title: '알림', key: 'option1' },
  { title: '인증이벤트', key: 'option2' },
  { title: '후기', key: 'option3' },
  { title: '활용법', key: 'option4' },
  { title: '질문', key: 'option5' },
  { title: '자유', key: 'option6' }
])

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
}

const commList = [
  {
    id: 1,
    cate: '자유게시판',
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간',
    src: 'community/img-community-01.png',
    length: 3,
    type: ''
  },
  {
    id: 2,
    cate: '자유게시판',
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 48,
    viewNum: 1240,
    replyNum: 13,
    dateNum: '1일',
    length: 10,
    type: 'blue'
  },
  {
    id: 3,
    cate: '자유게시판',
    tit: '',
    text: '',
    likeNum: 0,
    viewNum: 0,
    replyNum: 0,
    dateNum: '',
    length: 0,
    type: '',
    isBlind: true
  },
  {
    id: 4,
    cate: '자유게시판',
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    dateNum: '1일',
    type: 'blue'
  }
]
</script>
<style scoped lang="scss">
.community-list {
  border-top: 1px solid #eee;
}
</style>
