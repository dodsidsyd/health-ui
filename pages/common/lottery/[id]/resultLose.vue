<template>
  <BaseBody page-title="행운복권 확인" :show-back-button="false" :has-close-btn="true" class="pb-56">
    <RewardResultDetail :have-reward="false" />

    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="친구에게 공유하기" class="lg w-full btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import RewardResultDetail from '~/components/publishing/common/lottery/RewardResultDetail.vue'
</script>
