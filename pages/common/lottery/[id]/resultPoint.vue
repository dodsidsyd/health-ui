<template>
  <BaseBody page-title="행운복권 확인" :show-back-button="false" :has-close-btn="true" class="pb-56">
    <RewardResultDetail :have-reward="true" :reward-item="'건강의신 10P'" :reward-type="'point'" :point="'10'" />
    <RewardGuide :reward-type="'point'" />
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="친구에게 자랑하기"
        class="lg w-full medium btn-sticky"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import RewardResultDetail from '~/components/publishing/common/lottery/RewardResultDetail.vue'
import RewardGuide from '~/components/publishing/common/lottery/RewardGuide.vue'
</script>
