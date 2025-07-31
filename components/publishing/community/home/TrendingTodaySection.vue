<template>
  <section class="trendingToday-section">
    <TitleIconBox
      title="오늘 급상승"
      pointText="TOP3"
      point-class="blue"
      :is-img="true"
      src="/community/home/ico-fire.svg"
    />
    <StickyTabsContainer>
      <BoxedTabs :tabs="boxTabs" :active-key="activeBoxTab" variant="fill-type" @tab-change="onBoxTabChange" />
    </StickyTabsContainer>
    <TrendingToday
      :items="trendingData"
      :isLoggedIn="isLoggedIn"
      @itemClick="handleItemClick"
      @loginRequired="showLoginModal"
    />
  </section>
</template>
<script setup lang="ts">
import TitleIconBox from '~/components/common/TitleIconBox.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import TrendingToday from '~/components/publishing/community/home/TrendingToday.vue'

const activeBoxTab = ref('all')
const boxTabs = ref<BoxTab[]>([
  { title: '전체', key: 'all' },
  { title: '응원', key: 'option1' },
  { title: '축하', key: 'option2' },
  { title: '위로', key: 'option3' },
  { title: '감사', key: 'option4' },
  { title: '슬픔', key: 'option5' }
])

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
  console.log('B 탭 선택됨:', key)
}
// 로그인 상태 관리
const isLoggedIn = ref(false)

// 컴포넌트 마운트 시 로그인 상태 확인
onMounted(() => {
  // 쿠키나 로컬스토리지에서 로그인 상태 확인
  const token = useCookie('auth-token')
  isLoggedIn.value = !!token.value

  // 또는 간단하게 테스트용으로
  // isLoggedIn.value = true // 로그인된 상태로 테스트
})

// 샘플 데이터
const trendingData = ref([
  {
    id: 1,
    writer: '작성자1',
    writerImageUrl: 'community/img-rank-profile.png',
    tit: '게시글 제목입니다',
    text: '이것은 1위 게시글의 내용입니다. 오늘 가장 인기있는 글이에요.',
    images: ['community/img-community-02.png', 'community/img-community-01.png', 'community/img-community-02.png'], // 1위용 다중 이미지
    cate: [{ label: '커뮤니티명', type: 'blue' }],
    likeNum: 128,
    viewNum: 1520,
    replyNum: 45
  },
  {
    id: 2,
    writer: '작성자2',
    writerImageUrl: 'community/img-rank-profile.png',
    tit: '게시글 제목입니다',
    text: '이것은 2위 게시글의 내용입니다.',
    src: 'community/img-community-02.png',
    images: ['community/img-community-01.png', 'community/img-community-01.png', 'community/img-community-01.png'],
    cate: [
      { label: '건강의신', type: 'blue' },
      { label: '게시판명', type: '' }
    ],
    likeNum: 89,
    viewNum: 980,
    replyNum: 32
  },
  {
    id: 3,
    writer: '작성자3',
    writerImageUrl: 'community/img-rank-profile.png',
    tit: '게시글 제목입니다',
    text: '이것은 3위 게시글의 내용입니다.',
    images: ['community/img-community-01.png', 'community/img-community-01.png'],
    length: 2,
    cate: [{ label: '질문게시판', type: 'blue' }],
    likeNum: 67,
    viewNum: 756,
    replyNum: 28
  }
])

// 이벤트 핸들러
const handleItemClick = (item: any) => {
  console.log('게시글 클릭:', item)
}

const showLoginModal = () => {
  console.log('로그인이 필요합니다')
  // 로그인 모달 표시 로직
}

// 메타 데이터 설정
useHead({
  title: '오늘 급상승 TOP3'
})
</script>
<style scoped lang="scss">
.trendingToday-section {
  padding-top: 3.2rem;
  &:before {
    display: none;
  }
}
</style>
