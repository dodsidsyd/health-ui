<template>
  <BaseBody page-title="행운복권 확인" :show-back-button="false" :has-close-btn="true">
    <Scratch />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="한번에 긁기"
      class="lg w-full medium btn-sticky"
      @click="scratchAll"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Scratch from '~/components/publishing/common/lottery/scratch.vue'

const isScratched = ref(false)

const scratchAll = () => {
  isScratched.value = true
}
</script>
