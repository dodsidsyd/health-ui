<template>
  <div class="attendance-status-wrap">
    <div class="attendance-status">
      <div class="item">
        <span class="tit">출석 현황</span>
        <strong class="result">연속 3일</strong>
      </div>
      <div class="item">
        <span class="tit">받은 포인트</span>
        <strong class="result">150P</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
// @import '@/assets/scss/fonts/jalnan2';

.attendance-status-wrap {
  position: relative;
  height: 0;
  z-index: 2;
}
.attendance-status {
  display: flex;
  flex-direction: row;
  border-radius: 1.2rem;
  background: vars.$white;
  padding: 2rem 2.4rem;
  position: relative;
  top: -8rem;
  width: 100%;
  gap: 0 2.4rem;
  @media (max-width: 375px) {
    padding: 2rem 1.6rem;
  }
  .item {
    display: flex;
    flex: 1;
    justify-content: space-between;
    flex-direction: row;
    position: relative;
    color: #2b2b2b;
    &::before {
      content: '';
      position: absolute;
      width: 0.1rem;
      height: 1.3rem;
      background: #e2e2e2;
      left: -1.2rem;
      top: 50%;
      transform: translateY(-50%);
    }
    &:first-child {
      &::before {
        content: none;
      }
    }
    .tit {
      width: auto;
      font-size: 1.4rem;
      font-weight: 400;
    }
    .result {
      width: auto;
      font-size: 1.4rem;
      font-weight: 600;
    }
  }
}
</style>
