<template>
  <!-- 청구의신 활용방법 -->
  <FlexColDiv class="claim-section claim-help-section gap-24">
    <TitleBox
      title="청구의신 200% 활용 비법"
      text="청구의신과 함께하는 현명하고 지혜로운 보험생활"
      :center="true"
      class="flex-col gap-8 mb-0"
    />
    <CommonSwiper
      :slides="claimHelpSlides"
      :slides-per-view="2.1"
      :space-between="12"
      :navigation="false"
      :pagination="false"
      :scrollbar="false"
      :loop="true"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
      class="claim-help-swiper"
    >
      <template #default="{ slide }">
        <div class="link-slide flex-1">
          <CardClaimLink :href="slide.href" :text="slide.text" :card-link-class="slide.cardLinkClass" />
        </div>
      </template>
    </CommonSwiper>
    <FlexColDiv class="gap-12">
      <LinkItemIcon
        v-for="item in linkList"
        :key="item.id"
        :text="item.text"
        :to="item.href"
        :icon-class="item.iconClass"
      />
    </FlexColDiv>
  </FlexColDiv>

  <hr class="hr-section ml-n20 mr-n20 mt-0 mb-0" />

  <!-- 건강꿀팁 -->
  <FlexColDiv class="claim-section ml-n20 mr-n20">
    <TitleBox class="mb-0 pl-20 pr-20" title="건강꿀팁" :is-show-link="true" aria-label="모든 팁 살펴보기" />
    <CommonSwiper
      :slides="healthTipSlides"
      :slides-per-view="1"
      :space-between="20"
      :navigation="false"
      :pagination="{ clickable: true }"
      :scrollbar="false"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
      class="health-tip-swiper"
    >
      <template #default="{ slide }">
        <TipSlide :hashtags="slide.hashtags" :title="slide.title" :links="slide.links" />
      </template>
    </CommonSwiper>
  </FlexColDiv>

  <hr class="hr-section ml-n20 mr-n20 mt-0 mb-0" />

  <!-- 데이터로 보는 실손청구 -->
  <FlexColDiv class="claim-section gap-16">
    <TitleBox class="" title="데이터로 보는 실손청구" />
  </FlexColDiv>

  <!-- 청구의신 베스트 후기 -->
  <FlexColDiv class="claim-section claim-best-section gap-24">
    <TitleBox class="" title="청구의신 Best 후기" center />
    <CommonSwiper
      :slides="healthTipSlides"
      :slides-per-view="1"
      :space-between="20"
      :navigation="false"
      :pagination="{ clickable: true }"
      :scrollbar="false"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
      class="health-tip-swiper"
    >
      <template #default="{ slide }">
        <TipSlide :hashtags="slide.hashtags" :title="slide.title" :links="slide.links" />
      </template>
    </CommonSwiper>
    <Button :aria-label="ariaLabel + '명의 후기 보러가기'" class="br-8 mt-20" />
  </FlexColDiv>

  <!-- 인기 게시글 -->
  <FlexColDiv class="claim-section">
    <TitleBox class="" title="인기 게시글" />
    <div>
      <StickyTabsContainer>
        <BoxedTabs
          :tabs="boxTabs"
          :active-key="activeBoxTab"
          variant="fill-type"
          @tab-change="onBoxTabChange"
          class="pt-20 mb-20"
        />
      </StickyTabsContainer>
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
  </FlexColDiv>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import TitleBox from '~/components/common/TitleBox.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import CardClaimLink from '~/components/publishing/community/hospital/CardClaimLink.vue'
import TipSlide from '~/components/publishing/community/hospital/TipSlide.vue'
import LinkItemIcon from '~/components/publishing/community/common/LinkItemIcon.vue'

import Button from '~/components/publishing/button/Button.vue'

import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import ScrollableContents from '~/components/common/ScrollableContents.vue'
import CommItem from '~/components/publishing/community/common/CommItem.vue'
import commNoPermission from '~/components/publishing/community/common/commNoPermission.vue'
import commNoItem from '~/components/publishing/community/common/commNoItem.vue'

const hasPermission = ref(true) // 권한 상태
const activeBoxTab = ref('all')

const boxTabs = ref<BoxTab[]>([
  { title: '전체', key: 'all' },
  { title: '추천', key: 'option1' },
  { title: '운동', key: 'option2' },
  { title: '건강', key: 'option3' },
  { title: '질문', key: 'option4' },
  { title: '자유', key: 'option5' },
  { title: '기타', key: 'option6' }
])

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
}
// 청구생활 슬라이드 인터페이스
interface ClaimHelpData {
  id: number
  href: string
  text: string
  type: string
  cardLinkClass: string
}

// 청구의신 best후기 슬라이드 인터페이스
interface HealthTipData {
  id: number
  hashtags: string[]
  title?: string
  links?: Array<{
    text: string
    href?: string
  }>
}

// 통합된 props 인터페이스
interface Props {
  claimHelpSlides?: ClaimHelpData[]
  healthTipSlides?: HealthTipData[]
}

const props = withDefaults(defineProps<Props>(), {
  claimHelpSlides: () => [
    {
      id: 1,
      href: '#',
      cardLinkClass: 'claim-step-link',
      text: '실손청구<br/> 단계별 따라하기'
    },
    {
      id: 2,
      href: '#',
      cardLinkClass: 'deductible-link',
      text: '자기부담금이란?'
    },
    {
      id: 3,
      href: '#',
      cardLinkClass: 'hospital-info-link',
      text: '청구의신 제휴병원이<br/> 뭔가요?'
    },
    {
      id: 4,
      href: '#',
      cardLinkClass: 'document-link',
      text: '실손 청구<br/>준비 서류는?'
    }
  ],
  healthTipSlides: () => [
    {
      id: 1,
      hashtags: ['소아'],
      title: '소중한 우리 아이를 지키는<br/>도움되는 건강 정보',
      links: [
        { text: '1형당뇨 합병증 검사 언제 받아야 할까?', href: '' },
        { text: '8시간 금식했는데 공복혈당이 왜 높죠?', href: '' },
        { text: '로타텍 VS 로타릭스 우리 아이 백신은?', href: '' }
      ]
    },
    {
      id: 2,
      hashtags: ['운동'],
      title: '건강한 운동 습관 만들기',
      links: [
        { text: '미세먼지 가득한 하루의 피부 관리법', href: '/exercise/family' },
        { text: '사춘기 다~ 지나서 생가니느 여드름 왜...', href: '/exercise/indoor' },
        { text: '두피도 피부라고요! 두피 관리법 알아보기', href: '/exercise/stretching' }
      ]
    }
  ]
})
const linkList = [
  { id: 1, href: '#', text: '병원 방문없이 의료 영상데이터 받기', iconClass: 'ico-video' },
  { id: 2, href: '#', text: 'AI로 내 숨은 보상금 찾아보기', iconClass: 'ico-ai-search' }
]

const number = '1234'

const numFormat = computed(() => {
  const num = Number(number)
  return isNaN(num) ? '0' : num.toLocaleString()
})
const ariaLabel = numFormat

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
.claim-section {
  padding: 3.2rem 0;
  ::v-deep(.post-detail-hashtag-wrap) {
    margin: 0;
  }
  &.claim-help-section {
    ::v-deep(.title-box) {
      .title {
        font-size: 2.4rem;
        line-height: 3.1rem;
      }
    }
  }
  .claim-help-swiper {
    width: calc(100% + 4rem);
    margin: 0 -2rem;
    padding-left: 2rem;
  }
  .health-tip-swiper {
    ::v-deep(.swiper) {
      padding-bottom: 1.6rem !important;
    }
  }

  &.claim-best-section {
    padding: 3.2rem 0;
    margin: 0 -2rem;
    background: #dbe5fd;
  }
}
</style>
