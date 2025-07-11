<template>
  <div class="main-private-card">
    <div class="card-contents">
      <span class="cate-txt">프라이빗 걷기 게임</span>
      <strong class="tit">친구들과 함께<br />목표 달성을 해보세요</strong>
    </div>
    <nuxt-link to="javascript:void(0)" class="cbtn btn-green">게임 만들기</nuxt-link>
    <i class="img-wrap">
      <img src="~/assets/images/home/img-private-game.svg" alt="" />
    </i>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main-private-card {
  border-radius: 2rem;
  padding: 2.8rem;
  border: 0.1rem solid #eee;
  background: #fff;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  height: 26rem;
  position: relative;
  overflow: hidden;
  justify-content: space-between;
  align-items: flex-start; // 버튼을 왼쪽 정렬로 제한
  .card-contents {
    display: flex;
    flex-direction: column;
    gap: 0.4rem 0;
    .cate-txt {
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 140%;
      color: #666;
    }
    .tit {
      font-size: 2.4rem;
      font-weight: 700;
      color: #099382;
      line-height: 130%;
    }
  }
  .cbtn {
    display: inline-block;
    flex: 0 0 auto;
    width: auto; // 강제로 auto 설정
    align-self: flex-start; // flex 컨테이너 내에서 자체 크기 유지
    font-size: 1.6rem;
    line-height: 2.2rem;
    font-weight: 500;
    border-radius: 0.6rem;
    padding: 0.9rem 1.6rem;
    position: relative;
    @include mixin.rippleEffectWhite;
    &.btn-green {
      background: #099382;
      color: vars.$white;
    }
  }
  .img-wrap {
    position: absolute;
    right: 0;
    bottom: 0;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='247' height='257' viewBox='0 0 247 257' fill='none'%3E%3Cg opacity='0.2' filter='url(%23filter0_f_14558_8976)'%3E%3Cellipse cx='184.706' cy='148.712' rx='123.4' ry='63.1021' transform='rotate(-25.7411 184.706 148.712)' fill='%2349FF79'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_14558_8976' x='0.196777' y='0.589844' width='369.019' height='296.244' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='35' result='effect1_foregroundBlur_14558_8976'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E");
  }
}

@media (max-width: 375px) {
  .main-private-card {
    padding: 2rem;
    padding-bottom: 3.2rem;
    .cbtn {
      padding: 0.4rem 1.2rem;
      font-size: 1.4rem;
    }
    .img-wrap {
      width: 15rem;
    }
  }
}
</style>
