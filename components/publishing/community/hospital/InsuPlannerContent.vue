<template>
  <section class="insu-general-section">
    <TitleBox
      :is-title="true"
      title-box-class="planner-title-box"
      :html-title="`<strong class='planner-title' style='color: #4c7ff7;'> ${planner}</strong> 님<br/>고객을 추천드려요`"
    />

    <FlexRowDiv class="multi-select-container">
      <Select
        :model-value="area[0]?.value"
        :modal-title="'게시글 카테고리'"
        :cancel-button-text="'선택'"
        :is-show-cancel-btn="false"
        :custom-opts="area"
        class="custom"
      />
      <Select
        :model-value="age[0]?.value"
        :modal-title="'게시글 카테고리'"
        :cancel-button-text="'선택'"
        :is-show-cancel-btn="false"
        :custom-opts="age"
      />
      <Select
        :model-value="gender[0]?.value"
        :modal-title="'게시글 카테고리'"
        :cancel-button-text="'선택'"
        :is-show-cancel-btn="false"
        :custom-opts="gender"
      />
    </FlexRowDiv>
    <FlexColDiv class="general-list">
      <ProfileItem
        v-for="item in firstHalfItems"
        :key="item.id"
        :id="item.id"
        :is-talking="true"
        :name="item.name"
        :data="item.data"
        :flow="item.flow"
        @talk-click="handleTalkClick"
      />
      <div v-if="showBanner" class="general-banner">
        <NuxtLink to="#" class="">
          <div class="banner-txt">
            <p class="txt">
              보험에 관심 있는 고객을<br />
              만나고 싶다면?
            </p>
            <strong>구독 서비스 연결해보세요</strong>
          </div>
          <img src="~/assets/images/community/img-general-banner.png" alt="" />
        </NuxtLink>
      </div>
      <ProfileItem
        v-for="item in secondHalfItems"
        :key="item.id"
        :id="item.id"
        :is-talking="true"
        :name="item.name"
        :data="item.data"
        :flow="item.flow"
        @talk-click="handleTalkClick"
      />
    </FlexColDiv>
    <FlexRowDiv
      ><Button
        btn-type="line"
        class="btn-more"
        icon="icon icon-more-general"
        aria-label="다른 고객 보기"
        @click="onMoreClick"
    /></FlexRowDiv>
  </section>
  <hr class="hr-section mt-32 mb-10 ml-n20 mr-n20" />
  <section class="pl pt-0">
    <TitleBox title="실시간 질문" :is-showLink="true" aria-label="전체 질문보기" />
    <StickyTabsContainer>
      <BoxedTabs
        :tabs="boxTabs"
        :active-key="activeBoxTab"
        variant="fill-type"
        @tab-change="onBoxTabChange"
        class="pt-20 mb-20"
      />
    </StickyTabsContainer>
    <div class="list">
      <CommItem v-for="item in commList" :key="item.id" :item="item" :type-format="item.type" />
    </div>
  </section>
</template>
<script setup lang="ts">
import TitleBox from '~/components/common/TitleBox.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import Select from '~/components/publishing/input/Select.vue'
import Button from '~/components/publishing/Button/Button.vue'
import ProfileItem from '~/components/publishing/community/hospital/ProfileItem.vue'
import CommItem from '~/components/publishing/community/common/CommItem.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'

import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import { useRouter } from 'vue-router'

const boxTabs = ref<BoxTab[]>([
  { title: '추천 질문', key: 'option0' },
  { title: '답변이 없는 질문', key: 'option1' },
  { title: '최신 질문', key: 'option2' }
])
const activeBoxTab = ref('option0')

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
}

const props = withDefaults(
  defineProps<{
    planner?: string
  }>(),
  {
    planner: '전문 설계사'
  }
)

const area = [
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '대구', label: '대구' },
  { value: '인천', label: '인천' },
  { value: '광주', label: '광주' },
  { value: '대전', label: '대전' },
  { value: '울산', label: '울산' },
  { value: '세종', label: '세종' },
  { value: '경기도', label: '경기도' },
  { value: '강원도', label: '강원도' },
  { value: '충청북도', label: '충청북도' },
  { value: '충청남도', label: '충청남도' },
  { value: '전라북도', label: '전라북도' },
  { value: '전라남도', label: '전라남도' },
  { value: '경상북도', label: '경상북도' },
  { value: '경상남도', label: '경상남도' },
  { value: '제주도', label: '제주도' }
]
const age = [
  { value: '10대', label: '10대' },
  { value: '20대', label: '20대' },
  { value: '30대', label: '30대' },
  { value: '40대', label: '40대' },
  { value: '50대', label: '50대' },
  { value: '60대', label: '60대' },
  { value: '70대 이상', label: '70대 이상' }
]
const gender = [
  { value: '여성', label: '여성' },
  { value: '님상', label: '님상' }
]

const profilelist = [
  { id: 1, name: '고갱님', data: '서울/30대/여성', flow: 1111 },
  { id: 2, name: '고갱님', data: '서울/30대/여성', flow: 1111 },
  { id: 3, name: '고갱님', data: '서울/30대/여성', flow: 1111 },
  { id: 4, name: '고갱님', data: '서울/30대/여성', flow: 1111 },
  { id: 5, name: '고갱님', data: '서울/30대/여성', flow: 1111 },
  { id: 6, name: '고갱님', data: '서울/30대/여성', flow: 1111 },
  { id: 7, name: '고갱님', data: '서울/30대/여성', flow: 1111 },
  { id: 8, name: '고갱님', data: '서울/30대/여성', flow: 1111 }
]

const commList = [
  {
    id: 1,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    comments: [
      {
        id: 101,
        authorImageUrl: '/community/img-rank-profile.png',
        author: '황재근 설계사',
        text: '저도 궁금해요',
        level: 6,
        dateNum: '2시간',
        isExpert: true
      }
    ]
  },
  {
    id: 2,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 3,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 4,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 5,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 6,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 7,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  }
]

const clickCount = ref(0)
const visibleCount = ref(6)
const profileItems = computed(() => profilelist.slice(0, visibleCount.value))
const router = useRouter()

const bannerPosition = 3

const firstHalfItems = computed(() => profileItems.value.slice(0, bannerPosition))

const secondHalfItems = computed(() => profileItems.value.slice(bannerPosition))

const showBanner = computed(() => profileItems.value.length > bannerPosition)

const handleTalkClick = profileData => {
  router.push('#') // 원하는 경로
}
const onMoreClick = () => {
  clickCount.value++
  if (clickCount.value < 3) {
    visibleCount.value += 2
  } else {
    handleTalkClick()
  }
}
</script>
<style scoped lang="scss">
.planner-title-box {
  margin-top: 3.2rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.6rem;
  .planner-title {
    color: #4c7ff7;
  }
}

.insu-general-section {
  .c-btn {
    &.btn-more {
      width: auto;
      height: 4rem;
      margin: 0 auto;
      padding: 0.7rem 1.6rem 0.7rem 2rem;
      border-radius: 3.2rem;
    }
    ::v-deep(.text) {
      font-size: 1.4rem;
    }
  }
}

.planner-list {
  .profile-box {
    padding: 2.4rem 0.8rem;
    &:first-child {
      padding-top: 1.2rem;
    }
    & + .profile-box {
      border-top: 1px solid #eee;
    }
  }
}

.multi-select-container {
  margin: 3.2rem 0 2rem;
  gap: 0.6rem;
  .custom {
    width: auto;
  }
}

.general-banner {
  a {
    display: flex;
    justify-content: space-between;
    background: #ddf2ff;
    border-radius: 1.2rem;
    padding: 1.7rem 2rem 1.7rem 2.4rem;
    .banner-txt {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.8rem;
      .txt {
        font-weight: 500;
        line-height: 2.2rem;
        color: #275d9b;
      }
      strong {
        display: block;
        font-size: 1.8rem;
        line-height: 2.5rem;
      }
    }
    img {
      width: 10.2rem;
    }
  }
}

::v-deep(.c-modal-body) {
  max-height: 40rem;
  overflow-y: auto;
}
::v-deep(.c-input) {
  width: auto;
  .c-inp-el {
    height: 3.6rem;
    padding: 0.8rem 1.2rem 0.8rem 2rem;
    border-radius: 9rem;
    background: #e8e8e8;
    .custom-select {
      width: auto;
      .select-display {
        color: #555;
        padding-right: 3rem;
      }
    }
    &:active,
    &:focus,
    &:hover {
      background: #4f5561;
      border-color: #4f5561;
      .select-display {
        color: #fff;
      }
      .custom-select {
        .custom-arrow {
          background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17 10L12 15L7 10' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
        }
      }
    }
  }
}
</style>
