<template>
  <div class="health-debt-info">
    <div class="debt-item">
      <div class="tit"><i class="icon ico-heart"></i>차감된 건강부채</div>
      <strong class="item-value">-5,000원</strong>
    </div>
    <div class="debt-item">
      <div class="tit"><i class="icon ico-gauge"></i>레몬지수</div>
      <strong class="item-value">변경없음</strong>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.health-debt-info {
  background-color: #f4f4f4;
  border-radius: 1.2rem;
  padding: 0.4rem 2rem;
  margin-bottom: 2.4rem;
  .debt-item {
    padding: 1.6rem 0;
    display: flex;
    gap: 0 0.4rem;
    align-items: center;
    & + .debt-item {
      border-top: 0.1rem solid #e2e2e2;
    }
    .tit {
      display: flex;
      align-items: center;
      gap: 0 0.6rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: #2b2b2b;
    }
    .icon {
      display: inline-block;
      width: 2.8rem;
      height: 2.8rem;
      background-size: 2.4rem auto;
      background-position: center;
      background-repeat: no-repeat;
      &.ico-heart {
        background-image: url('~/assets/images/healthDebt/ico-heart.svg');
      }
      &.ico-gauge {
        background-image: url('~/assets/images/healthDebt/ico-gauge.svg');
      }
    }
    .item-value {
      font-size: 1.4rem;
      font-weight: 600;
      color: #2b2b2b;
      margin-left: auto;
    }
  }
}
</style>
