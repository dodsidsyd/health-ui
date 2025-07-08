<template>
  <div class="c-card">
    <div class="c-card-inner">
      <div class="c-card-header"></div>
      <div class="c-card-body">
        <SkeletonBlock effect="wave" height="200px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SkeletonAvatar, SkeletonBlock, SkeletonText, SkeletonImage } from 'skeleton-elements/vue'
</script>

<style scoped lang="scss">
.c-card-body {
  display: flex;
  flex-direction: column; /* 세로로 쌓기 */
  gap: 0.5rem; /* 하위 엘리먼트 간 간격 */
}

.c-card-body-row {
  display: flex;
  flex-direction: row;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 0.5rem; /* 엘리먼트 사이 간격 */
  width: 100%;
}
.c-card-body-row-column {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem; /* 엘리먼트 사이 간격 */
}
</style>
