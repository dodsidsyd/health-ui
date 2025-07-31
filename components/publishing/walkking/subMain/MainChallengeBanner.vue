<template>
  <div class="main-challenge-banner">
    <div class="tit-wrap">
      <strong class="tit">걷기왕 챌린지</strong>
      <nuxt-link to="javascript:void(0)" class="arrow-link">전체일정</nuxt-link>
    </div>
    <div class="banner-wrap">
      <strong class="banner-tit">실시간 랭킹 경쟁 <br />걸음 UP! 혜택 UP!</strong>
      <span class="banner-txt">미션 & 아이템 사용으로 걸음수 UP! <br />걷는 동안 행운 복권 팡팡!</span>
      <i class="banner-img">
        <img src="~/assets/images/walkingking/main/img-banner.png" alt="" />
      </i>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main-challenge-banner {
  .tit-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3.2rem;
    position: relative;
    z-index: 2;
    .tit {
      font-size: 2rem;
      font-weight: 700;
      color: #2b2b2b;
    }
    .arrow-link {
      color: #2b2b2b;
      font-size: 1.4rem;
      font-weight: 400;
      display: inline-flex;
      align-items: center;
      &::after {
        content: '';
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M5.99967 4.6665L9.33301 7.99984L5.99967 11.3332' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
    }
  }
  .banner-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.8rem 0;
    height: 18rem;
    position: relative;
    .banner-img {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 30rem;
      height: 30rem;
      overflow: hidden;
      img {
        position: relative;
        top: 1rem;
        right: -1rem;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .banner-tit {
      font-size: 2.2rem;
      color: vars.$blue-primary;
      font-weight: 700;
    }
    .banner-txt {
      font-size: 1.6rem;
      color: #555;
      font-weight: 500;
    }
  }
}
</style>
