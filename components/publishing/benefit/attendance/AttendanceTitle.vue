<template>
  <div class="attendance-title">
    <h2 class="tit-wrap">
      <span class="sub-tit">연속 출석 시 추가 포인트 지급</span>
      <strong class="title"> 매일 출석하고 <br />포인트 받아가세요! </strong>
    </h2>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.attendance-title {
  font-family: 'Jalnan2', sans-serif;
  color: #00829f;
  padding-top: 4.8rem;
  background-color: #c5f2f7;
  position: relative;
  min-height: 41.6rem;
  height: 55vh;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -2rem;
    right: -2rem;
    top: 0;
    bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('~/assets/images/benefit/bg-attendance.svg');
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0rem;
    left: -2rem;
    right: -2rem;
    background: linear-gradient(to bottom, rgba(148, 207, 123, 0), /* #94CF7B의 완전 투명 */ #94cf7b /* 완전 불투명 */);
    height: 5rem;
  }
  .tit-wrap {
    gap: 1.6rem 0;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sub-tit {
    font-size: 1.4rem;
    font-weight: 400;
    background: #8ee5f3;
    border-radius: 2rem;
    line-height: 1;
    padding: 1.4rem 1.6rem 1rem;
  }
  .title {
    font-size: 3.2rem;
    line-height: 130%;
    font-weight: 400;
  }
}
</style>
