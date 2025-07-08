<template>
  <BaseBody :show-back-button="true" page-title="친환경캠페인" :is-transparent="true" class="">
    <FlexColDiv class="ml-n20 mr-n20">
      <CampaignTitle />
      <TreeprojectCard />
    </FlexColDiv>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'

import CampaignTitle from '~/components/publishing/campaign/CampaignTitle.vue'
import TreeprojectCard from '~/components/publishing/campaign/TreeprojectCard.vue'
</script>

<style scoped lang="scss"></style>
