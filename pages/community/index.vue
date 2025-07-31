<template>
  <BaseBody :has-search="true" page-title="건신 커뮤니티" @search="handleSearch">
    <LineTabs :active-key="activeLineTab" :tabs="tabs" />

    <MyCommunitiesSection 
      :items="userCommunities"
      @card-click="handleCommunityClick"
    />
    
    <TrendingTodaySection />
    <HelpfulReviewsSection />
    <WeeklyKeywordsSection />
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <PopularCommunitiesSection />
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <SuggestedPostsSection />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

import MyCommunitiesSection from '~/components/publishing/community/home/MyCommunitiesSection.vue'
import TrendingTodaySection from '~/components/publishing/community/home/TrendingTodaySection.vue'
import HelpfulReviewsSection from '~/components/publishing/community/home/HelpfulReviewsSection.vue'
import WeeklyKeywordsSection from '~/components/publishing/community/home/WeeklyKeywordsSection.vue'
import PopularCommunitiesSection from '~/components/publishing/community/home/PopularCommunitiesSection.vue'
import SuggestedPostsSection from '~/components/publishing/community/home/SuggestedPostsSection.vue'

const route = useRoute()
const activeLineTab = ref('home')
const tabs = ref<Tab[]>([
  { title: '홈', to: '/community', key: 'home' },
  { title: '마음일기', to: '/community/diary', key: 'diary' },
  { title: '패밀리케어', to: '/community/familycare', key: 'familycare' }
])

// 사용자 커뮤니티 데이터
const userCommunities = ref([
  // { id: 1, text: '전체', src: '/community/home/ico-community-all.svg' },
  // { id: 2, text: '걷기왕', src: '/community/home/ico-community-all.svg', isNew: true },
  // { id: 3, text: '스마트링', src: '/community/home/ico-community-all.svg' },
  // { id: 4, text: '청구의신', src: '/community/home/ico-community-all.svg', isNew: true },
  // { id: 5, text: '레몬건강지수', src: '/community/home/ico-community-all.svg' },
  // { id: 6, text: '건강/운동', src: '/community/home/ico-community-all.svg' },
  // { id: 7, text: '체중관리', src: '/community/home/ico-community-all.svg' },
  // { id: 8, text: '식단', src: '/community/home/ico-community-all.svg' },
  // { id: 9, text: '마음건강', src: '/community/home/ico-community-all.svg' }
])

// 커뮤니티 클릭 핸들러
const handleCommunityClick = (item: any) => {
  console.log('커뮤니티 클릭:', item)
  // 여기서 해당 커뮤니티로 이동하는 로직 추가
}

// 검색 핸들러
const handleSearch = (searchTerm: string) => {
  console.log('검색:', searchTerm)
}

// 메타 정보
useHead({
  title: '메인 페이지',
  meta: [{ name: 'description', content: '메인 페이지입니다.' }]
})
</script>

<style lang="scss" scoped></style>
