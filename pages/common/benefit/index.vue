<template>
  <BaseBody :show-back-button="true" :is-transparent="true" page-title="레몬포인트 존">
    <FlexColDiv class="gap-16">
      <PointZoneBanner />
      <DailyMissionSection />
      <PointMissionSection />
      <LinkSection />
    </FlexColDiv>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import PointZoneBanner from '~/components/publishing/benefit/PointZoneBanner.vue'
import DailyMissionSection from '~/components/publishing/benefit/DailyMissionSection.vue'
import PointMissionSection from '~/components/publishing/benefit/PointMissionSection.vue'
import LinkSection from '~/components/publishing/benefit/LinkSection.vue'
</script>
