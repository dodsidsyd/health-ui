<template>
  <BaseBody page-title="행운복권 확인" :show-back-button="false" :has-close-btn="true">
    <Check />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="한번에 긁기" class="lg w-full medium btn-sticky" />
  </ButtonGroup>
</template>

<script setup lang="ts">
import Check from '~/components/publishing/common/lottery/check.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
</script>
