<template>
  <div class="daily-mission">
    <DailyMissionInfo />
    <DailyMissionCheck />
  </div>
</template>
<script setup lang="ts">
import DailyMissionInfo from '~/components/publishing/benefit/DailyMissionInfo.vue'
import DailyMissionCheck from '~/components/publishing/benefit/DailyMissionCheck.vue'
</script>
<style scoped lang="scss">
.daily-mission {
  overflow: hidden;
  border-radius: 1.2rem;
  box-shadow: 0 0 2.177rem 0 rgba(0, 0, 0, 0.1);
}
</style>
