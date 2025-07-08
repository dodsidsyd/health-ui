<template>
  <BaseBody page-title="행운복권 확인" :show-back-button="false" :has-close-btn="true" class="pb-56">
    <RewardResultDetail
      :have-reward="true"
      :reward-item="'상품교환권'"
      :reward-type="'gift'"
      :reward-image="RewardImage1"
    />
    <RewardGuide :reward-type="'gift'" />
    <ButtonGroup class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 자랑하기 </Button>
      <Button btn-type="primary" element-type="button" aria-label="선물받기" class="lg btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import RewardImage1 from '~/assets/images/lottery/img-reward-1.png'
import RewardResultDetail from '~/components/publishing/common/lottery/RewardResultDetail.vue'
import RewardGuide from '~/components/publishing/common/lottery/RewardGuide.vue'
</script>
