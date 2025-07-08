<template>
  <BaseBody
    page-title="리워드 보관함"
    :show-back-button="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span style='color:#555;font-size:1.4rem;font-weight:600'>미확인 복권<span style='font-weight: 700'>2</span></span>"
    style="background-color: #f4f4f4"
  >
    <TotalCountCheckType :count="0" :label="'미사용 내역 보기'" class="mg-21y" />
    <RewardItemWrap />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TotalCountCheckType from '~/components/publishing/common/temp/TotalCountCheckType.vue'
import RewardItemWrap from '~/components/publishing/common/lottery/RewardItemWrap.vue'
</script>
