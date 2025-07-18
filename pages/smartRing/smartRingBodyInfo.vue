<template>
  <BaseBody page-title="신체 정보 입력" :show-back-button="true">
    <FlexColDiv class="gap-12 mt-24">
      <InputText placeholder="" label="키" class="require" unit-r="cm" model-value="170" />
      <InputText placeholder="" label="몸무게" class="require" unit-r="Kg" model-value="60" />
    </FlexColDiv>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="입력 완료" class="lg w-full medium btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
</script>

<style scoped lang="scss"></style>
