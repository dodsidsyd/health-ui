<template>
  <BaseBody :show-back-button="true" page-title="섭취음식">
    <FoodIntakeDashboard />
    <FoodIntakeInfo />
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FoodIntakeDashboard from '~/components/publishing/calorieIntake/FoodIntakeDashboard.vue'
import FoodIntakeInfo from '~/components/publishing/calorieIntake/FoodIntakeInfo.vue'
</script>
<style lang="scss" scoped></style>
