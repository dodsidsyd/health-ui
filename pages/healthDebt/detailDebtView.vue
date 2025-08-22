<template>
  <BaseBody page-title="레몬건강지수 자세히보기" :show-back-button="true">
    <!-- 상단 건강지수 점수 -->
    <HealthPointGraph />
    <!-- 내 건강 프로필 & 건강부채 증감내역 & 레몬 건강지수 변경내역  -->
    <HealthDebtMyLog />
    <!-- 하단 텍스트 정보 -->
    <HealthInfoText />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import HealthPointGraph from '~/components/publishing/healthDebt/HealthPointGraph.vue'
import HealthDebtMyLog from '~/components/publishing/healthDebt/HealthDebtMyLog.vue'
import HealthInfoText from '~/components/publishing/healthDebt/HealthInfoText.vue'
</script>
