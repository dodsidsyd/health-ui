<template>
  <div class="points-balance">
    <dl class="item">
      <dt>보유포인트</dt>
      <dd class="my-point"><strong>98,400P</strong></dd>
    </dl>
    <dl class="item">
      <dt>30일 이내 소멸예정포인트</dt>
      <dd><strong>1,800P</strong></dd>
    </dl>
    <dl class="item">
      <dt>환전가능 포인트</dt>
      <dd><strong>16,200P</strong></dd>
    </dl>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.points-balance {
  background: #f4f4f4;
  border-radius: 1.2rem;
  overflow: hidden;
  padding: 0.4rem 1.6rem;
  .item {
    padding: 1.2rem 0;
    display: flex;
    flex-direction: row;
    border-top: 0.1rem solid #e2e2e2;
    justify-content: space-between;
    &:first-child {
      border-top: 0;
    }
    dt {
      font-size: 1.3rem;
      line-height: 2.2rem;
      font-weight: 500;
      color: #2b2b2b;
    }
    dd {
      font-size: 1.4rem;
      line-height: 2.2rem;
      font-weight: 600;
      color: #2b2b2b;
      &.my-point {
        font-size: 1.6rem;
      }
    }
  }
}
</style>
