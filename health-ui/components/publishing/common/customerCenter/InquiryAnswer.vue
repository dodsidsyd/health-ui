<template>
  <div class="answer-wrap">
    <div class="qna-mark answer">A</div>
    <div class="answer-box">
      <div class="flex space-between">
        <div class="name">운영자</div>
        <span class="date">2025.06.01</span>
      </div>
      <p class="answer-contents">
        <slot name="answer"></slot>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.answer-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 3.2rem;
}
.answer-box {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.4rem;
  .name {
    font-weight: 600;
  }
  .date {
    color: var(--gray-11);
    font-weight: 400;
  }
}
.qna-mark {
  flex-shrink: 0;
  width: 3.2rem;
  height: 3.2rem;
  margin-right: 1.2rem;
  border-radius: 50%;
  border: 0.1rem solid #e2e2e2;
  font-size: 1.6rem;
  color: var(--gray-11);
  font-weight: 600;
  text-align: center;
  line-height: 3.2rem;
  &.answer {
    background-color: var(--blue-primary);
    color: #fff;
    border: none;
  }
}
</style>
