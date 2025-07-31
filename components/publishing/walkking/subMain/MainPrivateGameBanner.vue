<template>
  <div class="main-challenge-banner">
    <div class="tit-wrap">
      <strong class="tit">프라이빗 게임</strong>
      <nuxt-link to="javascript:void(0)" class="arrow-link">자세히보기</nuxt-link>
    </div>
    <div class="banner-wrap">
      <strong class="banner-tit"
        >친구들과 함께<br />
        목표달성을 해보세요</strong
      >
      <button type="button" class="cbtn btn-green">게임만들기</button>
      <i class="banner-img">
        <img src="~/assets/images/walkingking/main/img-privateGame-banner.png" alt="" />
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
    height: 16rem;
    position: relative;
    .banner-img {
      position: absolute;
      right: -1rem;
      bottom: -3rem;
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
      color: #099382;
      font-weight: 700;
    }
    .cbtn {
      width: 10.4rem;
      line-height: 4rem;
      font-size: 1.6rem;
      font-weight: 500;
      padding: 0 1.6rem;
      margin-top: 1.6rem;
      border-radius: 0.6rem;
      position: relative;
      @include mixin.rippleEffectWhite;
      &.btn-green {
        background: #099382;
        color: vars.$white;
      }
    }
  }
}
</style>
