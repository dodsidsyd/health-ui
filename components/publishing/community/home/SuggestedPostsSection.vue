<template>
  <section class="suggestedPosts-section">
    <TitleIconBox
      title="이런 글은 어때요?"
      :is-img="true"
      src="/community/home/ico-bullseye.svg"
      class="space-between"
    />
    <StickyTabsContainer>
      <BoxedTabs :tabs="boxTabs" :active-key="activeBoxTab" variant="fill-type" @tab-change="onBoxTabChange" />
    </StickyTabsContainer>
    <div class="list">
      <CommItem v-for="item in firstHalfItems" :key="item.id" :item="item" :type="item.type" />
      <div v-if="showBanner" class="event-banner">
        <NuxtLink to="#">
          <div class="banner-txt">
            <p class="tit">실손의료비 보상금 예측 서비스</p>
            <strong class="txt">내가 받을 수 있는<br />보상금은 얼마일까?</strong>
          </div>
          <div class="img">
            <img src="~/assets/images/community/home/ico-money.svg" alt="" />
          </div>
        </NuxtLink>
      </div>
      <CommItem v-for="item in secondHalfItems" :key="item.id" :item="item" :type="item.type" />
      <Button btn-type="line" class="btn-more mt-20 mb-20" aria-label="더보기 +" @click="onMoreClick">{{
        moreButtonText
      }}</Button>
    </div>
  </section>
</template>
<script setup lang="ts">
import Button from '~/components/publishing/Button/Button.vue'
import TitleIconBox from '~/components/common/TitleIconBox.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import CommItem from '~/components/publishing/community/common/CommItem.vue'
const activeBoxTab = ref('option0')
const boxTabs = ref<BoxTab[]>([
  { title: '40대가 많이봤어요', key: 'option0' },
  { title: '여성이 많이봤어요', key: 'option1' },
  { title: '우리동네에서 많이 봤어요', key: 'option2' }
])

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
  console.log('B 탭 선택됨:', key)
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
  }
]
const clickCount = ref(0)
const visibleCount = ref(3)
const isLoading = ref(false)
const commItems = computed(() => commList.slice(0, visibleCount.value))
const router = useRouter()

const bannerPosition = 3
const maxItems = 15
const maxClicks = 5

const firstHalfItems = computed(() => commItems.value.slice(0, bannerPosition))
const secondHalfItems = computed(() => commItems.value.slice(bannerPosition))
const showBanner = computed(() => commItems.value.length >= bannerPosition)

// 더보기 버튼 표시 여부
const showMoreButton = computed(() => {
  return visibleCount.value < maxItems && visibleCount.value < commList.length && clickCount.value < maxClicks
})

// 더보기 버튼 텍스트
const moreButtonText = computed(() => {
  if (isLoading.value) {
    return '로딩 중...'
  }

  // 초기에는 "더보기 +"
  if (clickCount.value === 0) {
    return '더보기 +'
  }

  // 클릭 후에는 "더보기 x/5" 형태
  return `더보기 ${clickCount.value} / ${maxClicks}`
})

const handleTalkClick = profileData => {
  router.push('#')
}

const onMoreClick = async () => {
  if (clickCount.value >= maxClicks) return

  isLoading.value = true

  // 로딩 시뮬레이션 (실제로는 API 호출 등)
  await new Promise(resolve => setTimeout(resolve, 1000))

  clickCount.value++

  if (clickCount.value < maxClicks && visibleCount.value < maxItems) {
    visibleCount.value = Math.min(visibleCount.value + 3, maxItems)
  }

  isLoading.value = false

  // 5번째 클릭 후에는 다른 동작 (선택사항)
  if (clickCount.value === maxClicks) {
    // handleTalkClick() 또는 다른 동작
  }
}
</script>
<style scoped lang="scss">
.suggestedPosts-section {
  padding-top: 3.2rem;
  &:before {
    display: none;
  }
}
:deep(.title-box) {
  .icon {
    width: 3rem;
    height: 3rem;
  }
}
.event-banner {
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 0.8rem 1.2rem 0.8rem 2.4rem;
    border-radius: 1.2rem;
    background: #ddf6f6;
  }
  .banner-txt {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    .tit {
      font-weight: 500;
      line-height: 2.2rem;
      color: #279b9b;
    }
    .txt {
      font-size: 1.8rem;
      line-height: 2.5rem;
    }
  }
  .img {
    width: 10.9rem;
    height: 9.6rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
:deep(.c-btn) {
  &.btn-line {
    .text {
      color: #959595;
    }
  }
}
</style>
