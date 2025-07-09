<template>
  <div class="date-range-wrap">
    <div class="date-range">
      <button type="button" disabled class="c-btn icon btn-prev" aria-label="이전 날짜로"></button>
      <div class="date-text">
        <div class="main-date">2025년 4월</div>
        <span class="detail-range">04월 1일 ~ 04월 30일</span>
      </div>
      <button type="button" class="c-btn icon btn-next" aria-label="다음 날짜로"></button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.date-range-wrap {
  margin-top: 0.8rem;
  padding: 2.4rem 0;
  .date-range {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 3.2rem;
    position: relative;
    .c-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 3.2rem;
      height: 3.2rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      border-radius: 50%;
      @include mixin.rippleEffectPrimary;

      &.btn-prev {
        left: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M20 22.667L13.3333 16.0003L20 9.33366' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
      &.btn-next {
        right: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M13.3333 9.33301L20 15.9997L13.3333 22.6663' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
      &:disabled {
        opacity: 0.4;
      }
    }
  }
  .date-text {
    text-align: center;
    .main-date {
      font-size: 2rem;
      font-weight: 700;
      color: #2b2b2b;
      line-height: 130%;
    }
    .detail-range {
      font-size: 1.4rem;
      font-weight: 500;
      color: #555;
    }
  }
}
</style>
