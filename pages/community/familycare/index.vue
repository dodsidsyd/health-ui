<template>
  <BaseBody
    :has-search="true"
    page-title="건신 커뮤니티"
    :has-my-info="true"
    @search="handleSearch"
    @my-info-click="handleMyInfo"
  >
    <LineTabs :active-key="activeLineTab" :tabs="tabs" />

    <!-- 그룹 등록 전 -->
    <!-- <AddFamilyGroupBefore /> -->

    <!-- 그룹 등록 후 -->
    <FamilyGroup />

    <!-- 이번달 랭킹 -->
    <MontlyRanking />

    <hr class="hr-section ml-n20 mr-n20" />

    <!-- 패밀리 대화 -->
    <FamilyTalk />

    <hr class="hr-section ml-n20 mr-n20" />

    <!-- 패밀리 숙제 -->
    <FamilyHomeWork />

    <hr class="hr-section ml-n20 mr-n20" />

    <!-- 패밀리 일정 -->
    <FamilySchedules />

    <hr class="hr-section ml-n20 mr-n20" />

    <!-- 건강 위시리스트 -->
    <HealthWishList />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from '#app'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

import AddFamilyGroupBefore from '~/components/publishing/community/familyCare/AddFamilyGroupBefore.vue'
import FamilyGroup from '~/components/publishing/community/familyCare/FamilyGroup.vue'

import MontlyRanking from '~/components/publishing/community/familyCare/MontlyRanking.vue'
import FamilyHomeWork from '~/components/publishing/community/familyCare/FamilyHomeWork.vue'
import FamilyTalk from '~/components/publishing/community/familyCare/FamilyTalk.vue'
import FamilySchedules from '~/components/publishing/community/familyCare/FamilySchedules.vue'
import HealthWishList from '~/components/publishing/community/familyCare/HealthWishList.vue'

const route = useRoute()
const activeLineTab = ref('familycare')
const tabs = ref<Tab[]>([
  { title: '홈', to: '/community', key: 'home' },
  { title: '마음일기', to: '/community/diary', key: 'diary' },
  { title: '패밀리케어', to: '/community/familycare', key: 'familycare' }
])

// LineTabs를 표시할 조건을 정의(뒤로가기 버튼도 같은 경로에는 조건부 보이게)
const shouldShowLineTabs = computed(() => {
  const currentPath = route.path

  // tabs에 정의된 경로들만 LineTabs를 표시
  const allowedPaths = tabs.value.map(tab => tab.to)
  return allowedPaths.includes(currentPath)
})

// 검색 버튼 클릭 처리 함수
const handleSearch = () => {
  console.log('검색페이지 이동')
}

// 마이 프로필 버튼 클릭 처리 함수
const handleMyInfo = () => {
  console.log('마이페이지 이동')
}
</script>

<style scoped></style>
