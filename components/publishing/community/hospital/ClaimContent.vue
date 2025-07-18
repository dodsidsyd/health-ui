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
      :space-between="0"
      :navigation="false"
      :pagination="{ clickable: true }"
      :scrollbar="false"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
      class="health-tip-swiper"
    >
      <template #default="{ slide }">
        <ClaimTipSlide :hashtags="slide.hashtags" :title="slide.title" :links="slide.links" />
      </template>
    </CommonSwiper>
  </FlexColDiv>

  <hr class="hr-section ml-n20 mr-n20 mt-0 mb-0" />

  <!-- 데이터로 보는 실손청구 -->
  <FlexColDiv class="claim-section gap-16">
    <TitleBox class="" title="데이터로 보는 실손청구" />
    <FlexRowDiv class="claimData-list">
      <CommonClaimDataCard
        class="claimData-card"
        title="월 평균 청구금"
        main-data="143,400원"
        :heartRateBoolean="false"
        text="또래 멤버 평균"
        my-data="1회"
        :chart="true"
        ><AverageCurve :heart-rate-data="heartRateData" :height="50" style="height: 120px"
      /></CommonClaimDataCard>
      <CommonClaimDataCard
        class="claimData-card"
        title="월 평균 청구금"
        main-data="2회"
        text="또래 멤버 평균"
        my-data="1회"
      />
      <CommonClaimDataCard
        class="claimData-card"
        title="지난달 청구 1위"
        main-data="내과"
        text="2,310회"
        my-data="1회"
      />
      <CommonClaimDataCard title="스트레스" main-data="73.2" card-type="stress" :chart="true">
        <div class="bar-wrap">
          <div class="box my-box">
            <div class="bar-area">
              <div class="bar" style="height: 73.2%"></div>
            </div>
            <span>나</span>
          </div>
          <div class="box average-box">
            <div class="bar-area">
              <div class="bar" style="height: 62.5%">
                <div class="tooltip">
                  <p>62.5%</p>
                </div>
              </div>
            </div>
            <span>또래평균</span>
          </div>
        </div>
      </CommonClaimDataCard>
    </FlexRowDiv>
    <ClaimBanner
      banner-text="월 평균 청구 횟수가 적네요!"
      :banner-title="`${userName}에게<br/>대리 청구는 어떠세요?`"
    />
  </FlexColDiv>

  <!-- 청구의신 베스트 후기 -->
  <FlexColDiv class="claim-section claim-best-section">
    <TitleBox class="mb-0" title="청구의신 Best 후기" :center="true" />
    <CommonSwiper
      :slides="claimBestSlides"
      :slides-per-view="1.2"
      :space-between="16"
      :navigation="false"
      :pagination="false"
      :scrollbar="false"
      :loop="true"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
      class="claim-best-swiper"
    >
      <template #default="{ slide }">
        <ClaimBestSlide :nickname="slide.nickname" :scope="slide.scope" :title="slide.title" :text="slide.text" />
      </template>
    </CommonSwiper>
    <Button element-type="a" href="#" :aria-label="ariaLabel + '명의 후기 보러가기'" class="btn-best-more br-8" />
  </FlexColDiv>

  <!-- 인기 게시글 -->
  <FlexColDiv class="claim-section">
    <TitleBox class="" title="인기 게시글" />
    <div>
      <StickyTabsContainer>
        <BoxedTabs :tabs="boxTabs" :active-key="activeBoxTab" variant="fill-type" @tab-change="onBoxTabChange" />
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
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import TitleBox from '~/components/common/TitleBox.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import CardClaimLink from '~/components/publishing/community/hospital/CardClaimLink.vue'
import ClaimTipSlide from '~/components/publishing/community/hospital/ClaimTipSlide.vue'
import ClaimBestSlide from '~/components/publishing/community/hospital/ClaimBestSlide.vue'
import ClaimBanner from '~/components/publishing/community/hospital/ClaimBanner.vue'
import LinkItemIcon from '~/components/publishing/community/common/LinkItemIcon.vue'

import Button from '~/components/publishing/button/Button.vue'
import CommonClaimDataCard from '~/components/common/statusCard/CommonClaimDataCard.vue'
import AverageCurve from '~/components/publishing/community/competitive/AverageCurve.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import ScrollableContents from '~/components/common/ScrollableContents.vue'
import CommItem from '~/components/publishing/community/common/CommItem.vue'
import commNoPermission from '~/components/publishing/community/common/commNoPermission.vue'
import commNoItem from '~/components/publishing/community/common/commNoItem.vue'

const hasPermission = ref(true) // 권한 상태
const activeBoxTab = ref('all')
const userName = ref('김철수')
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

//청구의신 활용방법 링크 리스트
interface LinkList {
  id: number
  href: string
  text: string
  iconClass: string
}

// 청구생활 슬라이드 인터페이스
interface ClaimHelpData {
  id: number
  href: string
  text: string
  cardLinkClass: string
}

// 건강꿀팁 슬라이드 인터페이스
interface HealthTipData {
  id: number
  hashtags: string[]
  title?: string
  links?: Array<{
    text: string
    href?: string
  }>
}

// 청구의신 Best 슬라이드 인터페이스
interface ClaimBestData {
  id: number
  nickname?: string
  title?: string
  text?: string
}

interface LabelItem {
  label: string
  type?: 'blue' | ''
}

interface CommList {
  id: number
  cate?: LabelItem[]
  badge?: LabelItem[]
  writer: string
  writerImageUrl?: string
  tit: string
  text: string
  src?: string
  likeNum?: number
  viewNum?: number
  replyNum?: number
  dateNum?: string
  length?: number
  type?: '' | 'blue'
  isBlind?: boolean
  nickname?: string
  profileImageUrl?: string
  rating?: number
}

// 통합된 props 인터페이스
interface Props {
  claimHelpSlides?: ClaimHelpData[]
  healthTipSlides?: HealthTipData[]
  claimBestSlides?: ClaimBestData[]
  linkList?: LinkList[]
  commList?: CommList[]
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
      hashtags: ['피부·미용'],
      title: '살펴보고 알아보면 <br/>더 아름다워지는 정보',
      links: [
        { text: '미세먼지 가득한 하루의 피부 관리법', href: '/exercise/family' },
        { text: '사춘기 다~ 지나서 생가니느 여드름 왜...', href: '/exercise/indoor' },
        { text: '두피도 피부라고요! 두피 관리법 알아보기', href: '/exercise/stretching' }
      ]
    }
  ],
  claimBestSlides: () => [
    {
      id: 1,
      nickname: '당근먹는다람쥐',
      scope: '4.0',
      title: '청구의신 덕분에 도움받았네요',
      text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋고 만족스러워요 맘에 드네요. 가족들한테도 하나씩 사줘야..'
    },
    {
      id: 2,
      nickname: '당근먹는다람쥐',
      title: '청구의신 덕분에 도움받았네요',
      text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋고 만족스러워요 맘에 드네요. 가족들한테도 하나씩 사줘야..'
    },
    {
      id: 3,
      nickname: '당근먹는다람쥐',
      title: '청구의신 덕분에 도움받았네요',
      text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋고 만족스러워요 맘에 드네요. 가족들한테도 하나씩 사줘야..'
    },
    {
      id: 4,
      nickname: '당근먹는다람쥐',
      title: '청구의신 덕분에 도움받았네요',
      text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋고 만족스러워요 맘에 드네요. 가족들한테도 하나씩 사줘야..'
    }
  ],
  linkList: () => [
    { id: 1, href: '#', text: '병원 방문없이 의료 영상데이터 받기', iconClass: 'ico-video' },
    { id: 2, href: '#', text: 'AI로 내 숨은 보상금 찾아보기', iconClass: 'ico-ai-search' }
  ],
  commList: () => [
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
})

//차트
const heartRateData = ref([
  { value: 50, timestamp: new Date('2024-01-01 09:00') },
  { value: 40, timestamp: new Date('2024-01-01 10:00') },
  { value: 10, timestamp: new Date('2024-01-01 11:00') },
  { value: 16, timestamp: new Date('2024-01-01 12:00') },
  { value: 10, timestamp: new Date('2024-01-01 15:00') }
])

// 심박수 범위 설정
const maxHeartRate = ref(100)
const minHeartRate = ref(60)

// 평균 심박수 계산
const averageHeartRate = computed(() => {
  if (!heartRateData.value || heartRateData.value.length === 0) return 0
  const sum = heartRateData.value.reduce((acc, data) => acc + data.value, 0)
  return Math.round(sum / heartRateData.value.length)
})

// 실시간 데이터 업데이트 함수 (필요시 사용)
function updateHeartRateData(newData) {
  heartRateData.value = newData
}

// 외부에서 사용할 수 있도록 expose
defineExpose({
  updateHeartRateData,
  heartRateData,
  averageHeartRate
})

const number = '1234'

const numFormat = computed(() => {
  const num = Number(number)
  return isNaN(num) ? '0' : num.toLocaleString()
})
const ariaLabel = numFormat
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

  .claimData-list {
    gap: 1.2rem;
    flex-wrap: wrap;
    .claimData-card {
      flex: 0 0 calc(50% - 0.6rem);
    }
  }

  &.claim-best-section {
    width: calc(100% + 4rem);
    padding: 3.2rem 0;
    margin: 0 -2rem;
    background: #dbe5fd;
    .claim-best-swiper {
      ::v-deep(swiper-container) {
        overflow: visible;
        swiper-slide.swiper-slide-active {
          margin-left: 2rem;
        }
      }
    }
    .btn-best-more {
      width: calc(100% - 4rem);
      margin: 0 auto;
    }
  }
  .bar-wrap {
    display: flex;
    justify-content: center;
    gap: 1.6rem;
    .bar-area {
      display: flex;
      align-items: flex-end;
      height: 5.6rem;
    }
    .box {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: flex-end;
      gap: 0.6rem;
    }
    span {
      display: block;
      font-size: 1.1rem;
      font-weight: 400;
      line-height: 1.5rem;
      color: #959595;
    }
    .bar {
      width: 4rem;
      height: 0%;
      border-radius: 0.8rem;
      height: 0.6rem;
    }
  }
  .my-box {
    .bar {
      background: #4c7ff7;
    }
  }
  .average-box {
    position: relative;
    .bar {
      position: relative;
      background: #ececec;
      .tooltip {
        position: absolute;
        bottom: 100%; // bar 상단 바로 위
        left: 50%;
        transform: translateX(-50%) translateY(-0.8rem); // 위로 띄우기
        background: #4f5561;
        border-radius: 1.2rem;
        padding: 0.4rem 0.8rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: #fff;
        white-space: nowrap;
        z-index: 10;

        &::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0.7rem;
          height: 0.4rem;
          background-image: url("data:image/svg+xml,%3Csvg width='7' height='4' viewBox='0 0 7 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.23228 3C4.46248 4.33333 2.53798 4.33333 1.76818 3L0.0361328 0H6.96433L5.23228 3Z' fill='%234F5561'/%3E%3C/svg%3E%0A");
        }
      }
    }
  }
}
</style>
