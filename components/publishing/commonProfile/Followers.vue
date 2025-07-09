<template>
  <div class="flowing-wrap">
    <div class="flow-item">
      <span class="tit">팔로워</span>
      <strong class="unit">10</strong>
    </div>
    <div class="flow-item">
      <span class="tit">팔로잉</span>
      <strong class="unit">999999</strong>
    </div>
    <div class="flow-item">
      <span class="tit">MY친구</span>
      <strong class="unit">10</strong>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.flowing-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.6rem 1rem;
  background: #f9f9f9;
  justify-content: space-between;
  border-radius: 1.2rem;
  .flow-item {
    display: flex;
    flex: 1;
    padding: 0 1rem;
    justify-content: space-between;
    position: relative;
    align-content: center;
    .tit {
      color: #555;
      font-size: 1.2rem;
      font-weight: 500;
      position: relative;
      top: 0.2rem;
    }
    .unit {
      color: #2b2b2b;
      font-weight: 700;
      font-size: 1.6rem;
    }
    &::before {
      content: '';
      display: block;
      width: 0.1rem;
      height: 2rem;
      background: #eee;
      position: absolute;
      left: 0;
    }
    &:first-child {
      &::before {
        content: none;
      }
    }
  }
}
</style>
