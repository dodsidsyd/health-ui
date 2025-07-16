<template>
  <BaseBody :show-back-button="true" :has-search="true" :page-title="pageTitle" @search="handleSearch">
    <!-- <DevOnly>커뮤니티-상세(경쟁형/병원형/청구의신형)</DevOnly> -->
    <CompetitionCommunity v-if="type === COMMUNITY_TYPE.COMPETITION" :community="communityData" />
    <HospitalCommunity v-else-if="type === COMMUNITY_TYPE.HOSPITAL" :community="communityData" />
    <InsuCommunity v-else-if="type === COMMUNITY_TYPE.INSU" :community="communityData">
      v-else-if="type === COMMUNITY_TYPE.INSU" :community="communityData" />
    </InsuCommunity>
  </BaseBody>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import HospitalCommunity from '~/components/publishing/community/temp/HospitalCommunity.vue'
import CompetitionCommunity from '~/components/publishing/community/temp/CompetitionCommunity.vue'
import InsuCommunity from '~/components/publishing/community/temp/InsuCommunity.vue'
import BaseBody from '~/components/layout/BaseBody.vue'

const route = useRoute()
const type = route.params.type as CommunityType

type CommunityType = 'hospital' | 'competition' | 'insu'

const COMMUNITY_TYPE = {
  COMPETITION: 'competition',
  HOSPITAL: 'hospital',
  INSU: 'insu'
}

const communityData = ref<any>({})

const pageTitle = computed(() => {
  switch (type) {
    case COMMUNITY_TYPE.COMPETITION:
      return '커뮤니티 명'
    case COMMUNITY_TYPE.HOSPITAL:
      return '세브란스 병원'
    case COMMUNITY_TYPE.INSU:
      return '청구의 신'
    default:
      return '커뮤니티'
  }
})
</script>
