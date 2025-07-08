<template>
  <BaseBody :show-back-button="true" :show-search="true" page-title="전체메뉴 검색" logo-type="text">
    <FlexSection>
      <div class="fz-14 semibold pt-16 mb-12">추천키워드</div>
      <BoxedTabs :tabs="keywordTabs" :active-key="activeKeywordTab" variant="fill-type" class="green" />
      <div class="fz-14 semibold pt-32 mb-12">최근검색</div>
      <BoxedTabs :tabs="recentSearchTabs" variant="closable-type" @tab-close="onTabClose" />
    </FlexSection>

    <FlexSection>
      <div class="fz-18 bold">서비스</div>
      <KeywordList />
    </FlexSection>

    <hr class="hr-section ml-n20 mr-n20" />
    <FlexSection>
      <div class="fz-18 bold mb-16">커뮤니티</div>
      <CommunityListResult />
    </FlexSection>

    <hr class="hr-section ml-n20 mr-n20" />
    <FlexSection>
      <div class="fz-18 bold mb-16">커뮤니티 게시글</div>
      <CommunityDetailResult />
    </FlexSection>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'

import FlexSection from '~/components/page/FlexSection'

import KeywordList from '~/components/publishing/wholeMenu/KeywordList.vue'
import CommunityListResult from '~/components/publishing/wholeMenu/CommunityListResult.vue'
import CommunityDetailResult from '~/components/publishing/wholeMenu/CommunityDetailResult.vue'

const keywordTabs = ref<BoxTab[]>([
  { title: '걷기왕', key: 'all', to: '/common/wholeMenu/searchWholeMenu?keyword=걷기왕' },
  { title: '진료예약', key: 'option2', to: '/common/wholeMenu/searchWholeMenu?keyword=걷기왕' }
])

const recentSearchTabs = ref<BoxTab[]>([
  { title: '걷기왕', key: 'option1', to: '/common/wholeMenu/searchWholeMenu?keyword=걷기왕' },
  { title: '진료예약', key: 'option2', to: '/common/wholeMenu/searchWholeMenu?keyword=진료예약' },
  { title: '서류발급', key: 'option3', to: '/common/wholeMenu/searchWholeMenu?keyword=서류발급' },
  { title: '커뮤니티', key: 'option4', to: '/common/wholeMenu/searchWholeMenu?keyword=커뮤니티' },
  { title: '청구의신', key: 'option5', to: '/common/wholeMenu/searchWholeMenu?keyword=청구의신' }
])

const onTabClose = (key: string, tab: BoxTab, index: number) => {
  // 최근 검색 탭 삭제 로직
  recentSearchTabs.value = recentSearchTabs.value.filter(t => t.key !== key)
  console.log('최근 검색 삭제:', key, tab)
}
</script>
