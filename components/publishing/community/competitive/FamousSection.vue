<template>
  <div class="famous-section">
    <TitleBox class="mt-32" title="인기 게시글" />
    <StickyTabsContainer>
      <BoxedTabs :tabs="boxTabs" :active-key="activeBoxTab" variant="fill-type" @tab-change="onBoxTabChange" />
    </StickyTabsContainer>
    <div class="list">
      <CommItem v-for="item in visibleItems" :key="item.id" :item="item" :type="item.type" />
    </div>
    <Button btn-type="line" class="btn-more" aria-label="더보기 +" @click="onMoreClick" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TitleBox from '~/components/common/TitleBox.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import Button from '~/components/publishing/Button/Button.vue'
import CommItem from '~/components/publishing/community/competitive/CommItem.vue'

const router = useRouter()

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

const commList = [
  {
    id: 1,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 2,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 3,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 4,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 5,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 6,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 7,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  }
]

const visibleCount = ref(2)
const clickCount = ref(0)

const visibleItems = computed(() => commList.slice(0, visibleCount.value))

const onMoreClick = () => {
  clickCount.value++
  if (clickCount.value < 3) {
    visibleCount.value += 2
  } else {
    router.push('#') // 이동 경로는 상황에 맞게 변경
  }
}

// const showBanner = computed(() => clickCount.value >= 2)
</script>
<style lang="scss" scoped>
.c-btn {
  &.btn-more {
    ::v-deep(.text) {
      color: #959595;
    }
  }
}
</style>
