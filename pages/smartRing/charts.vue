<template>
  <BaseBody page-title="스마트링 공통 차트 모음" :show-back-button="true">
    <CircleLineVitalChart :percentage="91" />
    <CircleLineVitalChart :percentage="30" />
    <CircleLineVitalChart :no-data="true" />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import CircleLineVitalChart from '~/components/smartRing/CircleLineVitalChart.vue'
</script>

<style scoped lang="scss"></style>
