<template>
  <div class="main-insu">
    <nuxt-link to="javascript:void(0)" class="main-insu-banner">
      <div class="banner-txt">
        <strong class="tit">
          실손 청구의 원조<br />
          청구의신이 가장 빨라요!
        </strong>
        <span class="arrow-txt">실손보험 청구하기</span>
      </div>

      <img src="~/assets/images/home/img-insu.svg" alt="" />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main-insu {
  margin-top: 1.2rem;
  padding-bottom: 3.2rem;
  .main-insu-banner {
    display: flex;
    justify-content: space-between;
    background: #e8eefa;
    border-radius: 1.6rem;
    padding: 3.2rem 2.8rem;
    height: 16rem;
    position: relative;
    @include mixin.rippleEffectPrimary;
    .banner-txt {
      display: flex;
      flex-direction: column;
      .tit {
        font-size: 1.8rem;
        font-weight: 700;
        color: vars.$blue-primary;
        display: block;
        margin-bottom: 2.4rem;
      }
      .arrow-txt {
        font-size: 1.6rem;
        font-weight: 700;
        color: #222;
        display: inline-flex;
        align-content: center;
        &:after {
          content: '';
          width: 2rem;
          height: 2rem;
          display: inline-block;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7.49984 5.83301L11.6665 9.99967L7.49984 14.1663' stroke='%232b2b2b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        }
      }
    }
    img {
      width: 10.9rem;
    }
  }
}
@media (max-width: 375px) {
  .main-insu {
    .main-insu-banner {
      padding: 2rem;
      height: auto;
      .banner-txt {
        .tit {
          margin-bottom: 1.2rem;
        }
      }
      img {
        width: 8rem;
      }
    }
  }
}
</style>
