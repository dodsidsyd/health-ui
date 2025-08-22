<template>
  <div class="health-my-profile">
    <HealthMyProfle />
    <HealthDebtHistory />
    <HealthDebtChange />
  </div>
</template>
<script setup lang="ts">
import HealthMyProfle from '~/components/publishing/healthDebt/HealthMyProfle.vue'
import HealthDebtHistory from '~/components/publishing/healthDebt/HealthDebtHistory.vue'
import HealthDebtChange from '~/components/publishing/healthDebt/HealthDebtChange.vue'
</script>
<style lang="scss" scoped>
.health-my-profile {
  background-color: #f4f4f4;
  padding: 2rem;
  margin: 0 -2rem;
}
</style>
