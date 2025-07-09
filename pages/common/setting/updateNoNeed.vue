<template>
  <BaseBody
    :show-back-button="true"
    page-title="버전정보"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    class="h100vh mt-n56 mb-n20"
  >
    <div class="flex flex-col h-full text-center justify-center align-center">
      <div class="flex flex-col align-center">
        <div class="fz-18 bold lineH-140">최신 버전을 사용중입니다.</div>
        <div class="fz-14 medium lineH-140 curver mt-16">현재버전 ver1.1.001</div>
      </div>
    </div>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="확인" class="lg w-full medium btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
</script>
<style scoped lang="scss">
.prever {
  color: #4c7ff7;
}
.curver {
  color: #959595;
}
</style>
