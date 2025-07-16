<template>
  <FlexColDiv class="gap-16">
    <CardCommInfo
      card-custom-class="card-hospital"
      badge="분류명"
      title="세브란스병원 커뮤니티"
      text="세브란스 환자, 보호자들의<br/>의료, 건강 정보교환 목적으로<br/> 활동되고 있어요"
      :member-num="5678"
      src="community/ico-hospital.svg"
    />
    <FlexRowDiv class="gap-12">
      <CardLink href="teststs" text="병원 <br/>홈페이지" type="guide" card-link-class="hospital-link" />
      <CardLink href="teststs" text="챗봇 <br/>상담받기" type="guide" card-link-class="chatbot-link" />
    </FlexRowDiv>
    <FlexColDiv class="notice-list gap-20">
      <NoticeItem v-for="item in noticeList" :key="item.id" :text="item.text" :type="item.type" :label="item.label" />
    </FlexColDiv>
    <Button v-if="patient" aria-label="환자 인증하기" />
    <Button v-else aria-label="가입승인 요청하기" />
  </FlexColDiv>
  <div class="we-hospital-info-section mt-32 mb-32">
    <TitleBox title="우리 병원 정보" />
    <CommonSwiper
      :slides="hospitalInfoList"
      :slides-per-view="2.5"
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
          <CardLink :href="slide.href" :text="slide.text" type="info" :card-link-class="slide.cardLinkClass" />
        </div>
      </template>
    </CommonSwiper>
  </div>
  <hr class="hr-section ml-n20 mr-n20 mb-10" />
  <StickyTabsContainer>
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

    <!-- 소통하기 탭 컨텐츠 -->
    <div v-if="activeLineTab === 'comm'">
      <CommContent />
    </div>

    <!-- 같이쓰기 탭 컨텐츠 -->
    <div v-else-if="activeLineTab === 'together'">
      <TogetherContent />
    </div>

    <!-- 함께하기 탭 컨텐츠 -->
    <div v-else-if="activeLineTab === 'with'">
      <WithContent />
    </div>
  </StickyTabsContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import Button from '~/components/publishing/button/Button.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import CardCommInfo from '~/components/publishing/community/common/CardCommInfo.vue'
import NoticeItem from '~/components/publishing/community/common/NoticeItem.vue'
import CardLink from '~/components/publishing/community/common/CardLink.vue'
import TitleBox from '~/components/common/TitleBox.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import CommContent from '~/components/publishing/community/hospital/CommContent.vue'
import TogetherContent from '~/components/publishing/community/hospital/TogetherContent.vue'
import WithContent from '~/components/publishing/community/hospital/WithContent.vue'

const activeLineTab = ref('comm')
const patient = ref(false)

const lineTabs = ref<Tab[]>([
  { title: '소통하기', key: 'comm' },
  { title: '같이쓰기', key: 'together' },
  { title: '함께하기', key: 'with' }
])
const noticeList = [{ id: 1, label: '안내', type: 'info', text: '공지 내용이 들어가요. 공지 내용이 들어가요' }]
// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

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
    { id: 1, href: '#', type: 'info', cardLinkClass: 'reservation', text: '편리한<br/>진료예약' },
    { id: 2, href: '#', type: 'info', cardLinkClass: 'tip', text: '병원생활<br/> 정보 팁' },
    { id: 3, href: '#', type: 'info', cardLinkClass: 'claim', text: '간편한<br/> 실손청구' },
    { id: 4, href: '#', type: 'info', cardLinkClass: 'news', text: '가장 빠른<br/> 병원 뉴스' }
  ]
})

// 슬라이드 데이터
const hospitalInfoList = ref<infoSlide[]>(props.slides)

// 이벤트 정의
const emit = defineEmits<{
  slideClick: [slide: infoSlide, index: number]
}>()
</script>
<style scoped lang="scss">
.notice-list {
  padding: 1.6rem 2rem;
  background: #f4f4f4;
  border-radius: 1.2rem;
}

.card-hospital {
  background: #4f5561;
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
