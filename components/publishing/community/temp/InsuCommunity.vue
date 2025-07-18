<template>
  <div v-if="activeLineTab === 'comm'">
    <FlexColDiv class="gap-16">
      <CardCommInfo
        card-custom-class="card-insu"
        badge="분류명"
        title="관리자에서 설정된<br/> 커뮤니티명이 들어갑니다."
        text="커뮤니티 한 줄 설명이 들어갑니다"
        :member-num="5678"
        src="community/ico-paper.svg"
      />
      <CommonSwiper
        :slides="hospitalInfoList"
        :slides-per-view="2.1"
        :space-between="12"
        :navigation="false"
        :pagination="false"
        :scrollbar="false"
        :loop="true"
        :show-slide-info="false"
        :show-slide-length="false"
        :show-play-pause-button="false"
        class="infoList-swiper"
      >
        <template #default="{ slide }">
          <div class="link-slide">
            <CardLink
              :href="slide.href"
              :text="slide.text"
              :sub-text="slide.subText"
              :sub-text-type="slide.subTextType"
              :card-link-class="slide.cardLinkClass"
            />
          </div>
        </template>
      </CommonSwiper>
      <FlexColDiv class="notice-list gap-20">
        <NoticeItem v-for="item in noticeList" :key="item.id" :text="item.text" :type="item.type" :label="item.label" />
      </FlexColDiv>
      <Button v-if="patient" aria-label="환자 인증하기" />
      <Button v-else aria-label="커뮤니티 가입하고 100P 받기" />
    </FlexColDiv>
    <hr class="hr-section mt-32 ml-n20 mr-n20 mb-10" />
  </div>
  <StickyTabsContainer>
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

    <!-- 소통하기 탭 컨텐츠 -->
    <div v-if="activeLineTab === 'comm'">
      <CommContent />
    </div>

    <!-- 똑똑한 청구생활 탭 컨텐츠 -->
    <div v-else-if="activeLineTab === 'claim'">
      <ClaimContent />
    </div>

    <!-- 현명한 보험정보 탭 컨텐츠 -->
    <div v-else-if="activeLineTab === 'insu'">
      <!-- 일반 사용자용 컨텐츠 -->
      <InsuGeneralContent v-if="userType === 'general'" />

      <!-- 설계자용 컨텐츠 -->
      <InsuPlannerContent v-else-if="userType === 'Planner'" />
    </div>
  </StickyTabsContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import Button from '~/components/publishing/button/Button.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import CardCommInfo from '~/components/publishing/community/common/CardCommInfo.vue'
import NoticeItem from '~/components/publishing/community/common/LinkItemBadge.vue'
import CardLink from '~/components/publishing/community/hospital/CardLink.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import CommContent from '~/components/publishing/community/hospital/CommContent.vue'
import ClaimContent from '~/components/publishing/community/hospital/ClaimContent.vue'
import InsuGeneralContent from '~/components/publishing/community/hospital/InsuGeneralContent.vue'
import InsuPlannerContent from '~/components/publishing/community/hospital/InsuPlannerContent.vue'

const activeLineTab = ref('comm')
const patient = ref(false)
const userType = ref('Planner')
interface infoSlide {
  id: number
  href: string
  text: string
  cardLinkClass: string
}

interface Props {
  slides?: infoSlide[]
}

const props = withDefaults(defineProps<Props>(), {
  slides: () => [
    { id: 1, href: '#', type: 'guide', cardLinkClass: 'ai-link', text: 'AI 분석<br/> 실손 보험금 예측' },
    { id: 2, href: '#', type: 'guide', cardLinkClass: 'search-link', text: 'AI 분석<br/> 휴면보험금 찾기' },
    {
      id: 3,
      href: '#',
      type: 'guide',
      cardLinkClass: 'claim-link',
      text: '빠른청구',
      subText: '신청하기',
      subTextType: true
    }
  ]
})

// 슬라이드 데이터
const hospitalInfoList = ref<infoSlide[]>(props.slides)

// 이벤트 정의
const emit = defineEmits<{
  slideClick: [slide: infoSlide, index: number]
}>()

const lineTabs = ref<Tab[]>([
  { title: '소통하기', key: 'comm', to: '' },
  { title: '똑똑한 청구생활', key: 'claim' },
  { title: '현명한 보험정보', key: 'insu' }
])
const noticeList = [{ id: 1, label: '안내', type: 'info', text: '공지 내용이 들어가요. 공지 내용이 들어가요' }]
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

.card-insu {
  background: #31519e;
}

.infoList-swiper {
  width: calc(100% + 4rem);
  margin: 0 -2rem;
  padding-left: 2rem;
  overflow: hidden;

  ::v-deep(swiper-container) {
    overflow: visible;
  }
  ::v-deep(swiper-slide) {
    overflow: visible;
  }
  .link-slide {
    width: 100%;
  }
}
</style>
