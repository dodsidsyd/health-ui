<template>
  <div class="challenge-statistics">
    <div class="steps-dashboard">
      <div class="box">
        <strong class="box-tit">챌린지 참가</strong>
        <div class="box-figure">
          <span class="steps">10 회</span>
        </div>
      </div>
      <div class="box">
        <strong class="box-tit">총 걸음</strong>
        <div class="box-figure">
          <span class="steps">264,004 걸음</span>
        </div>
      </div>
      <div class="box">
        <strong class="box-tit">최고순위</strong>
        <div class="box-figure">
          <span class="steps">86 회</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
</script>

<style lang="scss" scoped>
.challenge-statistics {
  .steps-dashboard {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    .box {
      width: calc(33.333% - 1.2rem);
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
      }
    }
  }
}
</style>
