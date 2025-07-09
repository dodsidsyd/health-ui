<template>
  <BaseBody
    :show-back-button="true"
    page-title="회원가입"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    add-text-left="<span style='color:#999;font-size:1.4rem'>신체정보 입력</span>"
    class="pb-36"
  >
    <div class="flex flex-col gap-12 mt-24">
      <div class="sub-tit fz-16 bold">신체정보</div>
      <InputText
        type="number"
        label="키*  Height / cm"
        :is-valid="false"
        max-length="4"
        unit-r="cm"
        valid-text=""
        placeholder="키를 입력해주세요"
        class="flex-1 t-left"
      />
      <InputText
        type="number"
        label="몸무게*  Weight / kg"
        :is-valid="false"
        max-length="4"
        unit-r="kg"
        valid-text=""
        placeholder="몸무게를 입력해주세요."
        class="flex-1 t-left"
      />
    </div>

    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 이전 </Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky"> 다음 </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

import InputText from '~/components/publishing/input/InputText.vue'
</script>
