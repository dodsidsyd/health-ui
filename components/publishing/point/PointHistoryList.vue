<template>
  <div class="point-history-list">
    <PointHistoryItem
      :item-name="'운동 완료'"
      :sub-title="'30분 조깅 완주'"
      :amount="500"
      :time-text="'1분전'"
      :type="'minus'"
    />
    <PointHistoryItem
      :item-name="'건강미션 목표걸음 도달'"
      :sub-title="'목표걸음수 10,000걸음'"
      :amount="5000"
      :time-text="'30초 전'"
    />
    <PointHistoryItem :item-name="'운동 완료'" :sub-title="'30분 조깅 완주'" :amount="50000" :time-text="'1분전'" />
    <PointHistoryItem :item-name="'운동 완료'" :sub-title="'30분 조깅 완주'" :amount="500" :time-text="'1분전'" />
    <PointHistoryItem
      :item-name="'운동 완료'"
      :sub-title="'프리썸머 챌린지 / 2025. 06. 07 ~ 2025. 06. 30'"
      :amount="5000"
      :time-text="'1분전'"
    />
    <PointHistoryItem :item-name="'운동 완료'" :sub-title="'30분 조깅 완주'" :amount="50000" :time-text="'16분 전'" />
    <PointHistoryItem
      :item-name="'포인트 충전'"
      :sub-title="'30분 조깅 완주'"
      :amount="50000"
      :time-text="'3일 전 '"
      :type="'minus'"
    />

    <!-- 포인트 없을때 -->
    <!-- <PointEmpty /> -->
  </div>
</template>

<script setup lang="ts">
import PointHistoryItem from '~/components/publishing/point/PointHistoryItem.vue'
import PointEmpty from '~/components/publishing/point/PointEmpty.vue'
</script>

<style scoped lang="scss">
.point-main-history {
  margin: 0 -2rem;
  padding: 0 2rem;
  border-top: 0.1rem solid #eee;
}
</style>
