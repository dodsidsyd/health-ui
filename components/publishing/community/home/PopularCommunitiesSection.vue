<template>
  <section class="popularCommunities-section">
    <TitleIconBox
      title="인기 커뮤니티"
      link-href="/community/explore"
      icon="ico-link"
      element-type="a"
      :is-show-link="true"
      :is-img="true"
      aria-label=""
      src="/community/home/ico-popular.svg"
      class="space-between"
    />
    <div class="community-list">
      <CommunityLink
        v-for="(item, index) in maxCommunityItems"
        :key="item.id"
        :url="item.url"
        :community-img="item.communityImg"
        :community-title="item.communityTitle"
        :community-text="item.communityText"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import TitleIconBox from '~/components/common/TitleIconBox.vue'
import CommunityLink from '~/components/publishing/community/home/CommunityLink.vue'

const communityList = ref([
  {
    id: 1,
    url: '#',
    communityImg: 'community/home/img-community-01.svg',
    communityTitle: '걷기왕 챌린지',
    communityText: '챌린지 함께하면 리워드가 팡팡!'
  },
  {
    id: 2,
    url: 'test',
    communityImg: 'community/home/img-community-02.svg',
    communityTitle: '스마트링',
    communityText: '스마트한 건강관리의 시작!'
  },
  {
    id: 3,
    url: 'test',
    communityImg: 'community/home/img-community-03.svg',
    communityTitle: '실손청구 노하우',
    communityText: '실손청구의 모든것.'
  }
])
const maxCommunityItems = computed(() => communityList.value.slice(0, 3))
</script>
<style scoped lang="scss">
.popularCommunities-section {
  padding-top: 3.2rem;
  &:before {
    display: none;
  }
}
:deep(.title-box) {
  .icon {
    width: 2.8rem;
    height: 2.8rem;
  }
}
.community-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
