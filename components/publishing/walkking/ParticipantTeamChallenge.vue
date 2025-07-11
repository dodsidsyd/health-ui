<template>
  <div class="participant-team-wrap">
    <div class="title-box">
      <p>팀 참가자</p>
      <div class="flex align-center gap-2">
        <strong>{{ 3 }}</strong
        ><em>/</em><span>{{ 4 }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  haveRank: { type: Boolean, default: true }
})
</script>
<style lang="scss" scoped>
.participant-team-wrap {
}
</style>
