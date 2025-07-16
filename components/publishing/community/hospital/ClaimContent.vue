<template>
  <FlexColDiv class="claim-section gap-24">
    <div class="text-center">
      <strong>청구의신 200% 활용 비법</strong>
      <p>청구의신과 함께하는 현명하고 지혜로운 보험생활</p>
    </div>
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
      class="infoList-swiper mb-24 mt-24"
    >
      <template #default="{ slide }">
        <div class="link-slide">
          <CardLink
            :href="slide.href"
            :text="slide.text"
            :sub-text="slide.subText"
            :sub-text-type="slide.subTextType"
            :type="slide.type"
            :card-link-class="slide.cardLinkClass"
          />
        </div>
      </template>
    </CommonSwiper>
  </FlexColDiv>
  <hr class="hr-section ml-n20 mr-n20 mt-0 mb-0" />
  <FlexColDiv class="claim-section ml-n20 mr-n20">
    <TitleBox class="mb-0 pl-20 pr-20" title="건강꿀팁" :is-show-link="true" aria-label="모든 팁 살펴보기" />
    <CommonSwiper
      :slides="tipSlideInfo"
      :slides-per-view="1"
      :space-between="20"
      :navigation="false"
      :pagination="{ clickable: true }"
      :scrollbar="false"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
      class="tip-swiper"
    >
      <template #default="{ slide }">
        <TipSlide :hashtags="slide.hashtags" :title="slide.title" :links="slide.links" />
      </template>
    </CommonSwiper>
  </FlexColDiv>

  <FlexColDiv class="claim-section gap-16"></FlexColDiv>
  <FlexColDiv class="claim-section gap-24"></FlexColDiv>
  <section class="claim-section"></section>
</template>

<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import TitleBox from '~/components/common/TitleBox.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import CardLink from '~/components/publishing/community/common/CardLink.vue'
import TipSlide from '~/components/publishing/community/hospital/TipSlide.vue'

// 병원 정보 슬라이드 인터페이스
interface InfoSlide {
  id: number
  href: string
  text: string
  subText?: string
  subTextType?: boolean
  type: string
  cardLinkClass: string
}

// 건강 팁 슬라이드 인터페이스 (이름 변경으로 충돌 해결)
interface TipSlideData {
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
  hospitalSlides?: InfoSlide[]
  tipSlides?: TipSlideData[]
}

const props = withDefaults(defineProps<Props>(), {
  hospitalSlides: () => [
    {
      id: 1,
      href: '#',
      type: 'guide',
      cardLinkClass: 'ai-link',
      text: 'AI 분석<br/> 실손 보험금 예측'
    },
    {
      id: 2,
      href: '#',
      type: 'guide',
      cardLinkClass: 'search-link',
      text: 'AI 분석<br/> 휴면보험금 찾기'
    },
    {
      id: 3,
      href: '#',
      type: 'guide',
      cardLinkClass: 'claim-link',
      text: '빠른청구',
      subText: '신청하기',
      subTextType: true
    }
  ],
  tipSlides: () => [
    {
      id: 1,
      hashtags: ['소아'],
      title: '소아 건강 관리 가이드',
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

// 슬라이드 데이터
const hospitalInfoList = ref<InfoSlide[]>(props.hospitalSlides)
const tipSlideInfo = ref<TipSlideData[]>(props.tipSlides)
</script>
<style scoped lang="scss">
.claim-section {
  padding: 3.2rem 0;
  ::v-deep(.post-detail-hashtag-wrap) {
    margin: 0;
  }
}
.tip-swiper {
}
</style>
