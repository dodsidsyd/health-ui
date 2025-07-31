<template>
  <section class="topic-community-tab">
    <div class="community-banner">
      <strong class="tit">건강한 이야기 <br />여기에 다 모여있어요!</strong>
      <div class="img">
        <img src="~/assets/images/community/ico-heart.svg" alt="" />
      </div>
    </div>
    <StickyTabsContainer>
      <BoxedTabs
        :tabs="boxTabs"
        :active-key="activeBoxTab"
        variant="fill-type"
        @tab-change="onBoxTabChange"
        class="mb-20"
      />
    </StickyTabsContainer>
    <div class="community-list">
      <CommunityLink
        v-for="community in dummyData"
        :key="community.id"
        :url="community.url"
        :member="true"
        :has-new-posts="community.hasNewPosts"
        :community-img="community.communityImg"
        :community-title="community.communityTitle"
        :community-text="community.communityText"
        :community-member="community.communityMember"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import CommunityLink from '~/components/publishing/community/home/CommunityLink.vue'

const activeBoxTab = ref('all')
const boxTabs = ref<BoxTab[]>([
  { title: '전체', key: 'all' },
  { title: '건강의신', key: 'option1' },
  { title: '건강/운동', key: 'option2' },
  { title: '질병/병원', key: 'option3' }
])

const dummyData = [
  {
    id: 1,
    url: '#',
    communityImg: 'community/home/img-community-01.svg',
    communityTitle: '걷기왕 챌린지',
    communityText: '챌린지 함께하면 리워드가 팡팡!',
    communityMember: 23,
    hasNewPosts: true
  },
  {
    id: 2,
    url: '#',
    communityImg: 'community/home/img-community-02.svg',
    communityTitle: '스마트링',
    communityText: '스마트한 건강관리의 시작!',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 3,
    url: '#',
    communityImg: 'community/home/img-community-03.svg',
    communityTitle: '실손청구 노하우',
    communityText: '실손청구의 모든것.',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 4,
    url: '#',
    communityImg: 'community/home/img-community-01.svg',
    communityTitle: '걷기왕 챌린지',
    communityText: '챌린지 함께하면 리워드가 팡팡!',
    communityMember: 23,

    hasNewPosts: true
  },
  {
    id: 5,
    url: '#',
    communityImg: 'community/home/img-community-02.svg',
    communityTitle: '스마트링',
    communityText: '스마트한 건강관리의 시작!',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 6,
    url: '#',
    communityImg: 'community/home/img-community-03.svg',
    communityTitle: '실손청구 노하우',
    communityText: '실손청구의 모든것.',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 7,
    url: '#',
    communityImg: 'community/home/img-community-01.svg',
    communityTitle: '걷기왕 챌린지',
    communityText: '챌린지 함께하면 리워드가 팡팡!',
    communityMember: 23,

    hasNewPosts: true
  },
  {
    id: 8,
    url: '#',
    communityImg: 'community/home/img-community-02.svg',
    communityTitle: '스마트링',
    communityText: '스마트한 건강관리의 시작!',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 9,
    url: '#',
    communityImg: 'community/home/img-community-03.svg',
    communityTitle: '실손청구 노하우',
    communityText: '실손청구의 모든것.',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 10,
    url: '#',
    communityImg: 'community/home/img-community-01.svg',
    communityTitle: '걷기왕 챌린지',
    communityText: '챌린지 함께하면 리워드가 팡팡!',
    communityMember: 23,

    hasNewPosts: true
  },
  {
    id: 11,
    url: '#',
    communityImg: 'community/home/img-community-02.svg',
    communityTitle: '스마트링',
    communityText: '스마트한 건강관리의 시작!',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 12,
    url: '#',
    communityImg: 'community/home/img-community-03.svg',
    communityTitle: '실손청구 노하우',
    communityText: '실손청구의 모든것.',
    communityMember: 23,
    hasNewPosts: false
  }
]
</script>
<style lang="scss" scoped>
.community-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 16rem;
  .tit {
    font-size: 2rem;
    line-height: 2.6rem;
  }
  .img {
    width: 12rem;
    height: 12rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.community-list {
  display: flex;
  flex-direction: column;
  & > div:has(.community-link) {
    border-bottom: 1px solid #eee;
  }
}
:deep(.community-link) {
  gap: 2rem;
  padding: 1.6rem 0;
  .community-info {
    .txt {
      font-size: 1.6rem;
      line-height: 2.2rem;
      color: #555;
    }
  }
}
</style>
