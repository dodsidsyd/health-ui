<template>
  <div class="graph-wrap">
    <div class="walking-length">
      <span class="tit">일 평균 걸음수</span>
      <strong class="steps-amount">15,876</strong>
      <span class="sub-tit">일평균 <span class="average-txt">36.45 km / 549 kcal</span></span>
    </div>
    <div class="average-detail">
      <div class="item">
        <strong class="amount">250,584</strong>
        <span class="detail-txt">총 걸음</span>
      </div>
      <div class="item">
        <strong class="amount">36.45 km</strong>
        <span class="detail-txt">총 이동거리</span>
      </div>
      <div class="item">
        <strong class="amount">7 / 15</strong>
        <span class="detail-txt">목표달성</span>
      </div>
    </div>

    <WalkingGraph title="일별 걸음수 현황" :goalSteps="15000" />
  </div>
</template>

<script setup lang="ts">
import WalkingGraph from '~/components/publishing/dashboard/WalkingGraph.vue'
</script>

<style scoped lang="scss">
.graph-wrap {
  background: #e7f4ff;
  border-radius: 1.2rem;
  padding-bottom: 2rem;
  .walking-length {
    padding-top: 3.2rem;
    display: flex;
    flex-direction: column;
    .tit {
      font-size: 1.3rem;
      font-weight: 500;
      color: #555;
      text-align: center;
    }
    .steps-amount {
      text-align: center;
      font-size: 2.8rem;
      font-weight: 700;
      color: #2b2b2b;
      line-height: 3.3rem;
    }
    .sub-tit {
      font-size: 1.2rem;
      margin-top: 0.9rem;
      font-weight: 500;
      color: #2b2b2b;
      text-align: center;
      display: flex;
      justify-content: center;
      gap: 0 0.6rem;
      color: #555;
      .average-txt {
        color: #2b2b2b;
      }
    }
  }
  .average-detail {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2.4rem;
    margin-bottom: 2.4rem;
    .item {
      display: flex;
      flex: 1;
      align-items: center;
      flex-direction: column;
      gap: 0 0.2rem;
      position: relative;
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        width: 0.1rem;
        height: 3.6rem;
        background: #3e68cb;
        opacity: 0.1;
      }
      .amount {
        color: #2b2b2b;
        font-size: 1.4rem;
        font-weight: 500;
      }
      .detail-txt {
        color: #555;
        font-size: 1.3rem;
        font-weight: 500;
      }
      &:first-child {
        &::before {
          content: none;
        }
      }
    }
  }
}
</style>
