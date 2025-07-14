<template>
  <div class="steps-wrap">
    <div class="title-box">
      <p>걷기 통계</p>
      <div class="flex align-center">
        <span class="date">운동시작일 2024. 05. 08</span>
        <span class="time">16:15 기준</span>
      </div>
    </div>
    <div class="boxes-wrap">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.steps-wrap {
  margin: 2.4rem 0;
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
    p {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
    }
    span {
      font-size: 1.1rem;
      line-height: 1.5rem;
      color: #555;
      &.time {
        margin-left: 0.8rem;
        color: #959595;
      }
    }
  }
}
.boxes-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
}
</style>
