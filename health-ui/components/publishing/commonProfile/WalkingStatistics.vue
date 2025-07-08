<template>
  <div class="steps-statistics">
    <div class="flex flex-row mb-8">
      <strong class="tit">걷기 통계</strong>
      <span class="date ml-auto">16:15 기준</span>
    </div>
    <div class="steps-dashboard">
      <div class="box">
        <strong class="box-tit">오늘 걸음</strong>
        <div class="box-figure">
          <span class="steps">4,532 걸음</span>
          <span class="distance">4.84 km</span>
        </div>
      </div>
      <div class="box">
        <strong class="box-tit">총 걸음</strong>
        <div class="box-figure">
          <span class="steps">4,532 걸음</span>
          <span class="distance">4.84 km</span>
        </div>
      </div>
      <div class="box">
        <strong class="box-tit">최고 걸음수(일 기준)</strong>
        <div class="box-figure">
          <span class="steps">4,532 걸음</span>
          <span class="distance">4.84 km</span>
        </div>
      </div>
      <div class="box">
        <strong class="box-tit">일 평균</strong>
        <div class="box-figure">
          <span class="steps">4,532 걸음</span>
          <span class="distance">4.84 km</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
</script>

<style lang="scss" scoped>
.steps-statistics {
  .tit {
    font-size: 1.4rem;
    font-weight: 600;
  }
  .date {
    font-size: 1.1rem;
    font-weight: 400;
    color: #959595;
  }
  .steps-dashboard {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    .box {
      width: calc(50% - 0.6rem);
      background: #f9f9f9;
      border-radius: 0.8rem;
      padding: 1.2rem 1.6rem;
      .box-tit {
        font-size: 1.2rem;
        font-weight: 500;
        color: #555;
      }
      .box-figure {
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
        color: #2b2b2b;
        text-align: right;
        line-height: 130%;
        .steps {
          font-size: 1.4rem;
          line-height: 140%;
          font-weight: 600;
        }
        .distance {
          font-size: 1.2rem;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
