<template>
  <BaseBody page-title="스마트링" :show-back-button="true" :is-transparent="true" :has-setting="true">
    <SmartRingTopSTatus />
    <!-- 스마트링 배터리 컨디션 -->
    <SmartRingBatteryCondition class="mt-32" />
    <FlexRowDiv class="col-2">
      <CommonStatusCard
        title="수면"
        main-data="7시간 20분"
        card-type="sleep"
        emoji-type="good"
        smart-ring-status="충분해요"
      />
    </FlexRowDiv>
  </BaseBody>
</template>

<script setup lang="ts">
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import SmartRingTopSTatus from '~/components/smartRing/SmartRingTopSTatus.vue'
import SmartRingBatteryCondition from '~/components/smartRing/SmartRingBatteryCondition.vue'
import CommonStatusCard from '~/components/common/statusCard/CommonStatusCard.vue'
</script>

<style scoped lang="scss"></style>
