<template>
  <div class="expert-history">
    <div class="history-list">
      <span>2025.04 레몬대학교 졸업</span>
      <span>2025.06 삼성생명 입사 </span>
      <span>2025.06 삼성생명 보험 고객 수 500명 </span>
    </div>
    <div class="pre-wrap">
      <!-- prettier-ignore -->단 한명의 고객을 대하는 것처럼 성심성의껏 상담해드리겠습니다 
        단 한명의 고객을 대하는 것처럼 성심성의껏
         상담해드리겠습니다 
        단 한명의 고객을 대하는 것처럼 성심성의껏 상담해드리겠습니다
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.expert-history {
  font-size: 1.6rem;
  color: #2b2b2b;
  font-weight: 400;
  line-height: 140%;
  margin-top: 3.2rem;
  text-align: left;
  .history-list {
    display: flex;
    flex-direction: column;
    gap: 0.2rem 0;
    margin-bottom: 2rem;
  }
  .pre-wrap {
    white-space: pre-wrap;
  }
}
</style>
