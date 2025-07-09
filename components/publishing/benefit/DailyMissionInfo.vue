<template>
  <FlexColDiv class="dailyMission-info">
    <p>
      <span class="name">{{ userName }}</span
      >님은<strong class="day">{{ day }}</strong
      >일연속
    </p>
    <p>
      <strong class="count">{{ formattedCount }}</strong
      >걸음 걷기중
    </p>
  </FlexColDiv>
</template>
<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'

const userName = '곰탱이'
const day = 2
const count = 8000
const formattedCount = count.toLocaleString()
</script>
<style scoped lang="scss">
.dailyMission-info {
  justify-content: center;
  align-items: center;
  padding: 2.4rem 0 2rem;
  background: #4c7ff7;
  font-size: var(--num-18);
  font-weight: vars.$bold;
  line-height: 3.1rem;
  color: #fff;
  .day {
    margin: 0 0.2rem 0 0.5rem;
    font-size: var(--num-26);
  }
  .count {
    margin-right: 0.2rem;
    font-size: var(--num-26);
  }
}
</style>
